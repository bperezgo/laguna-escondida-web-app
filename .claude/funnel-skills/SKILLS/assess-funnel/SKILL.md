---
name: assess-funnel
description: "Assess a funnel's analytics tracking, conversion events, and metrics completeness. Run after finishing a funnel to verify it follows best practices for Google Ads, Meta, and TikTok. Use for: 'assess funnel', 'check funnel tracking', 'is my funnel ready for ads', 'review analytics on the funnel'."
---

# Funnel Analytics Assessment

You are assessing a funnel in the Laguna Escondida web app for analytics completeness. The user has finished building or updating a funnel and wants to verify that all tracking is correctly implemented before running ads.

## Step 1: Identify the funnel

Ask the user which funnel to assess, or detect it from context (e.g., current file, recent changes). Funnels live under `funnels/` in the monorepo. Each funnel is an Astro project with its own `src/pages/`, `src/components/`, and `src/layouts/`.

## Step 2: Read the funnel's code

Read all relevant files:
- The layout file (e.g., `src/layouts/FunnelLayout.astro`) — check for pixel/tag initialization
- All page files (e.g., `src/pages/index.astro`, `src/pages/gracias.astro`)
- All component files that contain CTAs or sections
- The data file (e.g., `src/data/funnel.ts`) for WhatsApp links and CTA configuration
- Environment files (`.env`, `.env.local`, `.env.example`) for pixel IDs

## Step 3: Run the assessment checklist

Evaluate each item and report status: ✅ Pass, ⚠️ Partial, ❌ Missing

### A. Tag/Pixel Infrastructure

| Check | What to look for |
|-------|-----------------|
| GTM container loaded | `GTM-KQDH5BXV` script in `<head>` and noscript in `<body>` |
| GA4 configuration | Either via GTM tag or direct gtag.js with measurement ID |
| Meta Pixel initialized | `fbq('init', pixelId)` + `fbq('track', 'PageView')` |
| TikTok Pixel initialized | `ttq.load(pixelId)` + `ttq.page()` |
| Env vars configured | `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_META_PIXEL_ID`, `PUBLIC_TIKTOK_PIXEL_ID` present in `.env.example` |
| No hardcoded pixel IDs | All IDs should come from env vars, not hardcoded |

### B. Section View Tracking

For each section/component in the funnel page, check:

| Check | What to look for |
|-------|-----------------|
| `data-section` attribute | Every major section (`<section>`) has `data-section="{name}"` |
| Section names are descriptive | Names like `hero`, `problem`, `offer` — not generic like `section-1`. The funnel is identified via the `funnel_name` event parameter, not by prefixing section names. |
| IntersectionObserver script | Script that pushes `funnel_section_view` to dataLayer when sections enter viewport |

List all sections found and flag any that are missing `data-section`.

### C. CTA / Conversion Tracking

For every CTA button (especially WhatsApp links):

| Check | What to look for |
|-------|-----------------|
| `data-event` attribute | Every WhatsApp CTA has `data-event="funnel_whatsapp_click"` |
| `data-location` attribute | Every CTA has `data-location="{section-name}"` to distinguish which CTA was clicked |
| Click event listener | Script that captures `data-event` clicks and pushes to dataLayer |
| Meta Lead event | `fbq('track', 'Lead', {...})` fires on WhatsApp CTA click |
| TikTok Contact event | `ttq.track('Contact', {...})` fires on WhatsApp CTA click |
| GA4 generate_lead event | `generate_lead` event fires (via dataLayer → GTM) |

List all CTAs found and their tracking status.

### D. Thank You Page

| Check | What to look for |
|-------|-----------------|
| Thank you page exists | A `/gracias` or equivalent page |
| Meta Lead confirmation | `fbq('track', 'Lead')` on page load |
| TikTok SubmitForm event | `ttq.track('SubmitForm')` on page load |
| GA4 conversion event | `generate_lead` or custom event on page load |
| No duplicate pixel fires | Pixel should not re-initialize (PageView is OK, but Lead should not double-fire) |

### E. UTM Parameter Handling

| Check | What to look for |
|-------|-----------------|
| UTM params preserved | If user lands with UTMs, they should persist to WhatsApp link or be captured |
| UTM-to-WhatsApp pass-through | WhatsApp message includes source info (e.g., "Vengo de {utm_source}") — optional but recommended |
| GA4 reads UTMs automatically | No extra code needed — just verify UTMs work in test |

### F. Data Quality

| Check | What to look for |
|-------|-----------------|
| No duplicate events | Click events should not fire multiple times per action (check event bubbling) |
| Events have consistent naming | Use `funnel_` prefix for funnel-specific events |
| Event parameters populated | `event_location`, `section_name`, `funnel_name` should always have values, never "unknown" |
| Funnel identifier | Events must include `funnel_name` parameter (e.g., `funnel_name: 'celebraciones'`). This is the canonical way to identify the funnel — do NOT encode the funnel name into event names or section names. |

### G. Privacy & Compliance

| Check | What to look for |
|-------|-----------------|
| Privacy policy page | `/privacidad` or equivalent exists and is linked |
| Cookie consent consideration | Note if consent banner is needed (required for EU visitors, recommended for Colombia) |
| No PII in events | Event parameters should not contain names, emails, or phone numbers |

## Step 4: Generate the report

Output a structured report with:

1. **Overall Score**: X/7 categories passing (A through G)
2. **Summary**: 2-3 sentences on the funnel's tracking health
3. **Critical Issues**: Things that MUST be fixed before running ads (missing pixels, no conversion events)
4. **Recommendations**: Nice-to-haves and optimizations
5. **Event Map**: Table showing every user action → what events fire → on which platforms
6. **Code Changes Needed**: Specific files and what to add/modify, with code snippets

## Step 5: Offer to fix

After presenting the report, ask the user if they want you to implement the fixes. Prioritize:
1. Adding missing `data-event` and `data-section` attributes
2. Adding pixel initialization scripts
3. Adding conversion event firing on CTA clicks
4. Adding thank-you page conversion events

## Reference

Refer to `plan/metrics-playbook-funnels.md` for the full event mapping table and platform-specific requirements. Refer to `plan/metrics-playbook-site.md` for site-level tracking patterns to maintain consistency.
