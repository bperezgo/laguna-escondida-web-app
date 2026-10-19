# Analytics & Tracking Conventions Reference

Every generated funnel must be **measurable by construction** and **pass the
static validator** before it's considered done. Tracking is business code: an
untracked WhatsApp click is invisible revenue, and if a pixel doesn't report a
conversion, the ad platform can't optimize — you pay more for less.

This is the contract the generator follows. The live reference implementation
lives in `funnels/celebraciones/` and `site/` of the laguna-escondida repo.

---

## 1. The event registry — single source of truth

Create `src/lib/tracking/events.ts`. Every event name in the funnel comes from
here; nothing hardcodes an event string anywhere else.

```ts
export const ANALYTICS_EVENTS = [
  // Conversion / contact
  'funnel_whatsapp_click',
  'generate_lead',
  // Engagement
  'funnel_cta_click',
  'funnel_section_view',
  // Behavioral
  'page_scroll_depth',
  'outbound_link_click',
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];
```

Why: typed components reference `AnalyticsEvent`, so a typo is a compile error;
the validator reads this file to reject any `data-event` not listed here; and
it's the exact list you hand to whoever configures GA4 / Meta / TikTok.

---

## 2. Attribute events — `data-event` + `data-location`

Every clickable CTA carries **both** attributes. `data-location` is never
optional — it's how you tell hero-CTA from final-CTA from floating-button.

```html
<a href={waHref} data-event="funnel_whatsapp_click" data-location="hero">…</a>
```

Type the primitive so this can't be gotten wrong:

```astro
---
// src/components/ui/Button.astro
import type { AnalyticsEvent } from '../../lib/tracking/events';
interface Props { event?: AnalyticsEvent; location?: string; /* … */ }
---
<a data-event={event} data-location={location}>…</a>
```

A single global listener (in `FunnelLayout.astro`) turns these into dataLayer
pushes, and also captures outbound links that don't have their own event:

```js
document.addEventListener('click', function (e) {
  window.dataLayer = window.dataLayer || [];
  var t = e.target.closest('[data-event]');
  if (t) {
    window.dataLayer.push({
      event: t.getAttribute('data-event'),
      funnel_name: 'CLIENT_SLUG',
      event_location: t.getAttribute('data-location') || 'unknown',
    });
    return;
  }
  var link = e.target.closest('a[href]');
  if (link && link.hostname && link.hostname !== window.location.hostname) {
    window.dataLayer.push({ event: 'outbound_link_click', outbound_url: link.href });
  }
});
```

---

## 3. Section + scroll tracking

- Every major `<section>` gets `data-section="kebab-name"`. An IntersectionObserver
  fires `funnel_section_view` (once per section) — this is the funnel step funnel.
- A scroll-depth tracker fires `page_scroll_depth` at 25 / 50 / 75 / 100 (once each).

Both live in `FunnelLayout.astro` as `is:inline` scripts so they render into the
HTML (the validator can see them) and run without a bundle round-trip.

---

## 4. Providers — standalone funnels use direct, env-swappable pixels

A generated funnel is a **standalone site pointed at one business's ad accounts**.
Use direct pixels keyed by env vars — NOT a shared GTM container (GTM would need
per-business dashboard config, which fights reproducibility).

Load each only when its ID is set, and **only after consent** (section 5):

- **GA4** via `gtag` — `PUBLIC_GA_MEASUREMENT_ID`
- **Meta Pixel** — `PUBLIC_META_PIXEL_ID` → `PageView`, `Lead` (on `/gracias`, once per lead)
- **TikTok Pixel** — `PUBLIC_TIKTOK_PIXEL_ID` → `PageView`, `Contact` (on `/gracias`, once per lead)

> The laguna-escondida **site** uses GTM because it's one long-lived property with
> many tags. Generated **funnels** are short-lived, single-purpose, one-per-client
> → direct pixels are simpler to reproduce. Keep the two models distinct.

---

## 5. Consent Mode v2 (Ley 1581 / GDPR)

Non-negotiable for anything running ads in LATAM/EU:

1. Before any tag loads, set consent defaults to `denied`
   (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`).
2. Show a cookie banner (`src/components/CookieConsent.astro`).
3. On **Accept**: `gtag('consent','update', {...'granted'})` **and** boot the
   Meta/TikTok pixels (hold their init behind consent — don't fire on load).
4. On **Reject**: stay denied; the site still works.

Copy the pattern from `site/src/components/CookieConsent.astro` +
`site/src/layouts/BaseLayout.astro` (the consent-default script sits *before* the
first tag; pixels expose `window.__initXxxPixel()` called on grant).

---

## 6. Standard event → platform mapping

| dataLayer event | GA4 | Meta | TikTok | When |
|---|---|---|---|---|
| `funnel_section_view` | `funnel_section_view` | ViewContent | ViewContent | section enters viewport |
| `funnel_cta_click` | `funnel_cta_click` | — | — | any non-WA CTA |
| `funnel_whatsapp_click` | `funnel_whatsapp_click` | — | — | WhatsApp CTA click (engagement only) |
| `generate_lead` | `generate_lead` (key event) | Lead | Contact | `/gracias` load with a fresh lead id |

### Lead flow — one conversion per lead

Fire the conversion **once, on `/gracias`**, never on the click (reference:
`funnels/celebraciones/src/lib/leads.ts`):

1. WhatsApp CTAs keep `target="_blank"`. The click handler pushes
   `funnel_whatsapp_click`, then sends the funnel tab to
   `<base>/gracias/?lead=<uuid>&loc=<data-location>` after ~300ms.
2. `/gracias` calls `fireLeadConversion()`: strips `lead`/`loc` from the URL,
   skips ids already fired (localStorage) and direct visits (no id), then sends
   GA4 `generate_lead` (`event_location`, `lead_id`), Meta `Lead` with
   `eventID = lead id`, TikTok `Contact` with `event_id = lead id`.
3. If consent isn't granted yet, pixel calls wait in `window.__afterConsent`;
   `CookieConsent` flushes them on Accept.

Why: firing on the click counts every repeat click as a lead, and a `/gracias`
nothing links to never fires. The lead id is the dedupe key a server-side
CAPI / Events API call must reuse.

---

## 7. Env vars (`.env.example`)

```bash
PUBLIC_WHATSAPP_NUMBER=       # full number, country code, no symbols
PUBLIC_GA_MEASUREMENT_ID=     # G-XXXXXXXXXX (optional)
PUBLIC_META_PIXEL_ID=         # optional
PUBLIC_TIKTOK_PIXEL_ID=       # optional
SITE_URL=https://your-domain.com
```

Never hardcode the WhatsApp number or any ID in source — read from env
(`import.meta.env.PUBLIC_*`). A helper (`src/lib/whatsapp.ts`) builds `wa.me`
links from `PUBLIC_WHATSAPP_NUMBER`.

---

## 8. Acceptance gate — the funnel isn't done until this passes

Ship `scripts/validate-analytics.mjs` (dependency-free) and run it after build.
It fails the deploy if:

- any `[data-event]` is missing `data-location`;
- any `data-event` value isn't in the registry (typo guard);
- a page in the expected-events manifest is missing an event it must have
  (e.g. the funnel index must have `funnel_whatsapp_click` + `funnel_section_view`;
  `/gracias` must fire `generate_lead`);
- the funnel index doesn't route WhatsApp clicks to `/gracias/`;
- the funnel ships no tracking script or fewer than 5 tracked sections.

Wire it into the deploy gate (git `pre-push` hook or CI) alongside `astro check`:

```
astro check   →   build   →   node scripts/validate-analytics.mjs
```

The generated funnel is "done" only when all three pass.
