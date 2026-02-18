// src/lib/usecases/analytics/trackConversion.ts

import type { ConversionEvent } from '@/types/analytics';
import { trackEvent } from './trackEvent';

export async function trackConversion(conversion: ConversionEvent): Promise<void> {
  // Map conversion type to event name
  const eventMap: Record<ConversionEvent['type'], string> = {
    reservation: 'reservation_created',
    newsletter: 'newsletter_subscribed',
    contact: 'contact_form_submitted',
  };

  const name = eventMap[conversion.type];

  await trackEvent(name, {
    conversion_type: conversion.type,
    value: conversion.value,
    currency: conversion.currency ?? 'COP',
    ...conversion.properties,
  });

  // GA4 purchase-style event for reservation conversions
  if (conversion.type === 'reservation' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      value: conversion.value,
      currency: conversion.currency ?? 'COP',
      ...conversion.properties,
    });
  }
}
