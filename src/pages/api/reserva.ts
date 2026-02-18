// src/pages/api/reserva.ts

import type { APIRoute } from 'astro';
import { createReservation } from '@/lib/usecases/reservas/createReservation';
import type { ReservationData } from '@/types/reserva';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as ReservationData;

    const result = await createReservation(data);

    if (!result.success) {
      return new Response(JSON.stringify(result), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[api/reserva] Error:', message);

    return new Response(
      JSON.stringify({ success: false, errors: { general: 'Error del servidor' } }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
