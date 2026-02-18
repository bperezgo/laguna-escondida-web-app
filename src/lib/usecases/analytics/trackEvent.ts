// src/lib/usecases/analytics/trackEvent.ts

import type { AnalyticsEvent, EventName, TrackingProperties } from '@/types/analytics';
import { ANALYTICS } from '@/config/analytics';

/**
 * Track an event across all configured analytics providers.
 * Safe to call in both server and client contexts.
 */
export async function trackEvent(
  name: EventName,
  properties: TrackingProperties = {}
): Promise<void> {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
  };

  // Client-side providers
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', name, properties);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', name, properties);
    }
  }

  // Custom analytics endpoint
  await sendToCustomEndpoint(event);

  // Development logging
  if (import.meta.env.DEV && ANALYTICS.enableInDev) {
    console.log('[Analytics]', event);
  }
}

async function sendToCustomEndpoint(event: AnalyticsEvent): Promise<void> {
  try {
    // In SSR context we can call our endpoint relative path — handled by the API route
    const baseUrl =
      typeof window !== 'undefined' ? '' : (import.meta.env.SITE ?? 'http://localhost:4321');

    await fetch(`${baseUrl}${ANALYTICS.customEndpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch {
    // Analytics failures must never crash the app
  }
}
