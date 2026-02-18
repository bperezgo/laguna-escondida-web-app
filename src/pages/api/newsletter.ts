// src/pages/api/newsletter.ts

import type { APIRoute } from 'astro';
import { subscribeToNewsletter } from '@/lib/usecases/newsletter/subscribeToNewsletter';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json() as { email: string };

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await subscribeToNewsletter(email);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[api/newsletter] Error:', message);

    return new Response(JSON.stringify({ error: 'Error del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
