// src/lib/usecases/reservas/createReservation.ts

import type { ReservationData, ReservationResult } from '@/types/reserva';
import { validateReservationForm } from './validateReservationForm';
import { calculatePricing } from './calculatePricing';
import { sendConfirmationEmail } from '@/lib/services/email';
import { saveToStrapi } from '@/lib/services/strapi';
import { trackEvent } from '@/lib/usecases/analytics/trackEvent';

/**
 * Use Case: Crear una nueva reserva
 *
 * 1. Valida los datos del formulario
 * 2. Calcula el pricing
 * 3. Guarda en Strapi
 * 4. Envía email de confirmación
 * 5. Trackea evento en analytics
 */
export async function createReservation(data: ReservationData): Promise<ReservationResult> {
  try {
    // 1. Validación
    const validation = validateReservationForm(data);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // 2. Calcular pricing
    const pricing = calculatePricing({
      package: data.package,
      guestCount: data.guestCount,
      addons: data.addons,
    });

    // 3. Guardar en Strapi
    const savedReservation = await saveToStrapi('reservations', {
      ...data,
      pricing,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    const reservationId = String(savedReservation.id);

    // 4. Enviar email de confirmación
    await sendConfirmationEmail({
      to: data.email,
      reservationId,
      data: { ...data, pricing },
    });

    // 5. Track analytics
    await trackEvent('reservation_created', {
      package: data.package,
      guestCount: data.guestCount,
      value: pricing.total,
      currency: pricing.currency,
    });

    return { success: true, reservationId, pricing };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[createReservation] Error:', message);

    await trackEvent('reservation_error', {
      error: message,
      step: 'creation',
    }).catch(() => {});

    return {
      success: false,
      errors: { general: 'Ocurrió un error al procesar la reserva. Intenta de nuevo.' },
    };
  }
}
