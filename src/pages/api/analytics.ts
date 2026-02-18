// src/pages/api/analytics.ts

import type { APIRoute } from 'astro';
import type { AnalyticsEvent } from '@/types/analytics';

export const POST: APIRoute = async ({ request }) => {
  try {
    const event = await request.json() as AnalyticsEvent;

    // Log in development
    if (import.meta.env.DEV) {
      console.log('[Custom Analytics]', event);
    }

    // TODO: Persist to your analytics store
    // Options:
    // - Save to Strapi: await strapi.create('analytics-events', event);
    // - Push to ClickHouse / BigQuery / Plausible
    // - Log to CloudWatch / Datadog

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
