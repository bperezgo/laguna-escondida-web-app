// src/config/site.ts

export const SITE = {
  name: 'Laguna Escondida',
  tagline: 'El lugar perfecto para tus momentos especiales',
  description:
    'Laguna Escondida es el destino ideal para eventos sociales y corporativos en contacto con la naturaleza. Bodas, quinceaños, cumpleaños y más.',
  url: 'https://lagunaescondida.com',
  email: 'info@lagunaescondida.com',
  phone: '+57 300 000 0000',
  whatsapp: '+573000000000',
  address: 'Vereda La Laguna, Colombia',
  social: {
    instagram: 'https://instagram.com/lagunaescondida',
    facebook: 'https://facebook.com/lagunaescondida',
    tiktok: 'https://tiktok.com/@lagunaescondida',
    youtube: 'https://youtube.com/@lagunaescondida',
  },
  openGraph: {
    image: '/images/og-image.jpg',
    type: 'website',
    locale: 'es_CO',
  },
} as const;
