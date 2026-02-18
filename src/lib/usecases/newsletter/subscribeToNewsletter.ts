// src/lib/usecases/newsletter/subscribeToNewsletter.ts

import { isValidEmail } from '@/lib/utils/validators';

const CONVERTKIT_API_KEY = import.meta.env.CONVERTKIT_API_KEY ?? '';
const CONVERTKIT_FORM_ID = import.meta.env.CONVERTKIT_FORM_ID ?? '';

export interface NewsletterResult {
  success: boolean;
  error?: string;
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterResult> {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Email inválido' };
  }

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    console.warn('[newsletter] ConvertKit credentials not configured');
    return { success: false, error: 'Servicio de newsletter no configurado' };
  }

  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email,
        tags: ['blog-subscriber', 'laguna-escondida'],
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    console.error('[newsletter] ConvertKit error:', body);
    return { success: false, error: 'Error al procesar la suscripción' };
  }

  return { success: true };
}
