/**
 * WhatsApp business number, injected at build time from the environment so it
 * is never committed to the repository. Set PUBLIC_WHATSAPP_NUMBER in `.env`
 * (full number with country code, no spaces or symbols, e.g. 573001234567).
 */
export const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '';

/** Build a wa.me link with an optional prefilled message. */
export function whatsappHref(message = ''): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
