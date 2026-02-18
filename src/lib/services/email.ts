// src/lib/services/email.ts
// Email service using Resend (https://resend.com)
// Set RESEND_API_KEY in .env to enable

import { SITE } from '@/config/site';
import type { ReservationData, PricingBreakdown } from '@/types/reserva';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY ?? '';
const EMAIL_FROM = import.meta.env.EMAIL_FROM ?? `reservas@lagunaescondida.com`;

interface ConfirmationEmailParams {
  to: string;
  reservationId: string;
  data: ReservationData & { pricing: PricingBreakdown };
}

export async function sendConfirmationEmail(params: ConfirmationEmailParams): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping confirmation email');
    return;
  }

  const { to, reservationId, data } = params;

  const html = buildConfirmationHtml(reservationId, data);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `${SITE.name} <${EMAIL_FROM}>`,
      to: [to],
      subject: `Confirmación de reserva #${reservationId} — ${SITE.name}`,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email send failed: ${error}`);
  }
}

function buildConfirmationHtml(
  reservationId: string,
  data: ReservationData & { pricing: PricingBreakdown }
): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #333;">
      <h1 style="color: #2D5016;">¡Reserva Confirmada!</h1>
      <p>Hola <strong>${data.fullName}</strong>,</p>
      <p>Tu reserva ha sido recibida. Aquí están los detalles:</p>
      <table style="width:100%; border-collapse:collapse; margin: 20px 0;">
        <tr>
          <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">ID de Reserva</td>
          <td style="padding:8px; border:1px solid #ddd;">#${reservationId}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Tipo de Evento</td>
          <td style="padding:8px; border:1px solid #ddd;">${data.eventType}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Fecha</td>
          <td style="padding:8px; border:1px solid #ddd;">${data.eventDate}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Invitados</td>
          <td style="padding:8px; border:1px solid #ddd;">${data.guestCount}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Paquete</td>
          <td style="padding:8px; border:1px solid #ddd;">${data.package}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Total Estimado</td>
          <td style="padding:8px; border:1px solid #ddd;">$${data.pricing.total.toLocaleString('es-CO')} ${data.pricing.currency}</td>
        </tr>
      </table>
      <p>Nos pondremos en contacto contigo a la brevedad para confirmar los detalles.</p>
      <p style="color: #666; font-size: 0.875em;">
        — El equipo de ${SITE.name}<br>
        ${SITE.phone} | ${SITE.email}
      </p>
    </div>
  `;
}
