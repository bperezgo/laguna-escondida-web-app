/**
 * Analytics event registry — the single source of truth for event names.
 *
 * Who consumes this:
 *  - Tracked components (`Button`, `LinkRule`) type their `event` prop against
 *    `AnalyticsEvent`, so a typo or unregistered name is a compile error.
 *  - The JS behavioral trackers in `BaseLayout.astro` / blog post push these names.
 *  - `scripts/validate-analytics.mjs` reads this file to reject any `data-event`
 *    in the built output that isn't listed here.
 *  - Whoever configures GTM/GA4 uses this as the list of events to wire up.
 *
 * Keep it flat and quoted (one string per line) — the validator extracts the
 * names by reading this file as text.
 */
export const ANALYTICS_EVENTS = [
  // ── Conversion / contact (attribute events) ──────────────────────────────
  'whatsapp_click',
  'maps_click',
  'instagram_click',
  'tiktok_click',

  // ── Navigation / engagement CTAs (attribute events) ──────────────────────
  'experience_card_click',
  'menu_category_view',
  'menu_click',
  'pesca_click',
  'especies_cta_click',
  'galeria_cta_click',
  'reservation_cta_click',
  'eventos_ver_paquetes',
  'blog_card_click',
  'blog_view_all',
  'blog_back_click',

  // ── Behavioral (pushed from JS in BaseLayout / blog post) ────────────────
  'page_scroll_depth',
  'outbound_link_click',
  'blog_article_read',
  'section_view',

  // ── Funnel (funnels/*) ───────────────────────────────────────────────────
  'funnel_whatsapp_click',
  'funnel_cta_click',
  'funnel_section_view',
  'generate_lead',
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];
