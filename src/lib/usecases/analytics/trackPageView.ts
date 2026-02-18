// src/lib/usecases/analytics/trackPageView.ts

import type { PageViewEvent } from '@/types/analytics';

export function trackPageView(data: PageViewEvent): void {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: data.path,
      page_title: data.title,
      page_referrer: data.referrer,
    });
  }

  if (import.meta.env.DEV) {
    console.log('[Analytics:PageView]', data);
  }
}
