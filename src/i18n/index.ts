import es from './es.json';
import en from './en.json';

export const defaultLocale = 'es' as const;
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

const translations: Record<Locale, typeof es> = { es, en };

export function useTranslations(locale: Locale | undefined) {
  return translations[locale ?? defaultLocale];
}

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (locales.includes(lang as Locale)) return lang as Locale;
  return defaultLocale;
}

export function getDateLocale(locale: Locale): string {
  return translations[locale].meta.dateLocale;
}
