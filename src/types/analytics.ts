// src/types/analytics.ts

export type EventName =
  | 'page_view'
  | 'cta_click'
  | 'reservation_started'
  | 'reservation_step_completed'
  | 'reservation_created'
  | 'reservation_error'
  | 'newsletter_subscribe'
  | 'newsletter_subscribed'
  | 'gallery_filter_changed'
  | 'package_viewed'
  | 'contact_form_submitted'
  | string; // allow custom events

export interface TrackingProperties {
  [key: string]: string | number | boolean | null | undefined;
}

export interface AnalyticsEvent {
  name: EventName;
  properties: TrackingProperties;
  timestamp: string;
}

export interface PageViewEvent {
  path: string;
  title: string;
  referrer?: string;
}

export interface ConversionEvent {
  type: 'reservation' | 'newsletter' | 'contact';
  value?: number;
  currency?: string;
  properties?: TrackingProperties;
}

// Window augmentation for client-side analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    trackEvent?: (name: EventName, properties?: TrackingProperties) => Promise<void>;
    trackPageView?: (data: PageViewEvent) => void;
  }
}
