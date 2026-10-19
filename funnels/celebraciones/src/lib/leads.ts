// src/lib/leads.ts
// Lead conversion flow for the funnel.
//
// A WhatsApp CTA click opens WhatsApp in a new tab (the link's own target=_blank)
// and sends this tab to /gracias with a one-time lead id. The conversion
// (GA4 generate_lead, Meta Lead, TikTok Contact) fires ONCE per lead id on
// /gracias — never on the click itself — so repeat clicks, reloads and direct
// visits to /gracias don't inflate lead counts. The lead id doubles as the
// Meta/TikTok event id, which a future server-side CAPI call must reuse to dedupe.

const FUNNEL_NAME = 'celebraciones';
const FIRED_KEY = 'funnel_leads_fired';
const MAX_FIRED = 20;
const LEAD_ID_RE = /^[a-z0-9-]{8,64}$/i;

type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (...args: unknown[]) => void };
  __consentGranted?: boolean;
  __afterConsent?: Array<() => void>;
};

const w = window as W;

export function newLeadId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** URL of the thank-you page for a lead, respecting the funnel's base path. */
export function thankYouUrl(leadId: string, location: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const params = new URLSearchParams({ lead: leadId, loc: location });
  return `${base}/gracias/?${params}`;
}

function readFired(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FIRED_KEY) || '[]');
  } catch {
    return [];
  }
}

function markFired(leadId: string) {
  try {
    const fired = [...readFired().filter((id) => id !== leadId), leadId].slice(-MAX_FIRED);
    localStorage.setItem(FIRED_KEY, JSON.stringify(fired));
  } catch { /* storage blocked — dedupe falls back to the URL cleanup below */ }
}

function firePixels(leadId: string, location: string) {
  const params = { content_name: FUNNEL_NAME, content_category: 'eventos', event_location: location };
  if (typeof w.fbq === 'function') w.fbq('track', 'Lead', params, { eventID: leadId });
  if (w.ttq) w.ttq.track('Contact', params, { event_id: leadId });
}

/**
 * Fire the lead conversion for the lead id in the current URL, at most once.
 * Returns false when there's no valid lead id (direct visit) or it already fired.
 */
export function fireLeadConversion(): boolean {
  const url = new URL(window.location.href);
  const leadId = url.searchParams.get('lead') ?? '';
  const location = url.searchParams.get('loc') || 'unknown';

  // Drop the params so a reload, bookmark or shared link can't re-fire.
  url.searchParams.delete('lead');
  url.searchParams.delete('loc');
  history.replaceState(null, '', url);

  if (!LEAD_ID_RE.test(leadId) || readFired().includes(leadId)) return false;
  markFired(leadId);

  const payload = { funnel_name: FUNNEL_NAME, event_location: location, lead_id: leadId };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'generate_lead', ...payload });
  // GA4 respects Consent Mode on its own (modeled pings while denied).
  if (typeof w.gtag === 'function') w.gtag('event', 'generate_lead', payload);

  // Meta/TikTok only boot after consent; if the visitor accepts on this page,
  // CookieConsent flushes __afterConsent once the pixels are up.
  if (w.__consentGranted) {
    firePixels(leadId, location);
  } else {
    (w.__afterConsent = w.__afterConsent || []).push(() => firePixels(leadId, location));
  }
  return true;
}
