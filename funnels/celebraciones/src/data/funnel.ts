// src/data/funnel.ts
// Auto-generated from funnel_output/ by 11_astro_builder.
// To update copy: edit this file. No component code needs to change.

import type {
  HeroData, ProblemData, SolutionData, HowItWorksData, OfferData,
  ForWhoData, FAQData, SocialProofData, GuaranteeData, FinalCTAData, FunnelData
} from '../types/funnel';

// ── WhatsApp config ─────────────────────────────────────────────
// Update this with the real WhatsApp Business number
const WHATSAPP_NUMBER = '573194313781';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola! Vi el perfil de Laguna Escondida y me interesa información para celebrar un evento. 🎉'
);
export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// ── Hero ────────────────────────────────────────────────────────
export const hero: HeroData = {
  credibilityPill: '⭐ 4.6 en Google Maps · 📍 Marinilla, Antioquia',
  headline: 'Tu celebración campestre con lago, pesca y restaurante incluido',
  subheadline: 'Sin alquilar finca. Sin llevar comida. Sin estrés. Reserva tu fecha y nosotros nos encargamos del resto.',
  ctaText: 'Quiero reservar mi fecha',
  ctaHref: whatsappLink,
  secondaryCta: 'Ver paquetes y precios',
  secondaryHref: '#paquetes',
  trustNote: '🌧️ Garantía de clima: reprogramamos sin costo si llueve',
  stats: [
    { value: '5', label: 'especies de peces' },
    { value: '4.6⭐', label: 'Google Maps' },
    { value: '45 min', label: 'de Medellín' },
    { value: '$300K', label: 'desde COP' },
  ],
};

// ── Problem ─────────────────────────────────────────────────────
export const problem: ProblemData = {
  eyebrow: '¿Te suena familiar?',
  headline: '¿Buscas dónde celebrar y nada te convence?',
  intro: 'Cada opción te obliga a sacrificar algo — precio, calidad, actividades o tu propia tranquilidad.',
  painPoints: [
    'Las fincas de alquiler cuestan $1 millón y no incluyen comida ni actividades',
    'Los salones de eventos son genéricos — todos se ven iguales',
    'Celebrar en casa = cocinar para 30 personas y no disfrutar tu propia fiesta',
    'Las trucheras son pequeñas, solo hay trucha y los niños se aburren en 20 minutos',
    'Lugares grandes como Alcaravanes: demasiada gente, sin espacio privado real',
    'Nadie ofrece un lugar "todo en uno" con naturaleza, comida, actividades Y espacio privado',
  ],
  bridge: 'Si estás cansada de buscar un lugar que tenga TODO — naturaleza, comida buena, actividades y espacio para tu grupo — tenemos algo para ti.',
};

// ── Solution ────────────────────────────────────────────────────
export const solution: SolutionData = {
  eyebrow: 'Bienvenida a Laguna Escondida',
  headline: 'Un espacio campestre con lago, pesca deportiva y restaurante — todo en un mismo lugar',
  intro: 'Aquí no alquilas una finca vacía. Aquí llegas, celebras y disfrutas.',
  features: [
    { icon: '🎣', text: 'Lago con 5 especies de peces (no solo trucha)' },
    { icon: '🏡', text: 'Espacio privado reservado solo para tu grupo' },
    { icon: '🍽️', text: 'Restaurante con comida fresca incluida' },
    { icon: '🌿', text: 'Zona verde y canchas para niños' },
    { icon: '📸', text: 'Construcción rústica en guadua — fotos increíbles sin decoración costosa' },
    { icon: '🅿️', text: 'Parqueadero amplio para todos los invitados' },
  ],
  highlight: 'Tus invitados pueden pescar su propia comida — y nosotros se la preparamos 🎣🍽️',
};

// ── How it works ────────────────────────────────────────────────
export const howItWorks: HowItWorksData = {
  eyebrow: 'Así de fácil',
  headline: 'Reservar tu evento es simple',
  subheadline: '4 pasos y listo. Nosotros nos encargamos de todo.',
  steps: [
    {
      title: 'Escríbenos por WhatsApp',
      description: 'Cuéntanos qué celebras, cuántas personas y qué fecha tienes en mente.',
      outcome: 'Respondemos en menos de 1 hora',
    },
    {
      title: 'Recibe tu cotización personalizada',
      description: 'Te enviamos las opciones de espacio y menú para tu grupo.',
      outcome: 'Precios claros desde el inicio',
    },
    {
      title: 'Confirma con un anticipo',
      description: 'Tu fecha queda reservada. Una semana antes definimos los detalles del menú.',
      outcome: 'Tu anticipo está protegido con garantía de clima',
    },
    {
      title: 'Llega y disfruta',
      description: 'El día del evento todo está listo. Tú solo llegas a celebrar con tus invitados.',
      outcome: 'Cero estrés, cero logística',
    },
  ],
};

// ── Offer (Packages) ────────────────────────────────────────────
export const offer: OfferData = {
  eyebrow: 'Paquetes para tu evento',
  headline: 'Elige el paquete ideal para tu celebración',
  subheadline: 'Todos incluyen parqueadero, pesca deportiva con 5 especies de peces y la experiencia "pesca tu comida".',
  packages: [
    {
      name: 'Celebración al Lago',
      price: '$300,000',
      capacity: '10–20 personas',
      description: 'Perfecto para reuniones íntimas y cumpleaños pequeños.',
      features: [
        'Zona semi-privada frente al lago',
        'Menú básico (plato fuerte + bebida)',
        'Pesca deportiva incluida',
        'Parqueadero',
        'Mesas y sillas configuradas',
      ],
      highlighted: false,
      idealFor: 'Reuniones familiares, cumpleaños íntimos',
    },
    {
      name: 'Fiesta Campestre',
      price: '$500,000–$600,000',
      capacity: '20–35 personas',
      description: 'El más popular. Kiosco privado con atención dedicada.',
      features: [
        'Kiosco privado exclusivo',
        'Menú completo (entrada + plato fuerte + postre + bebidas)',
        'Pesca deportiva incluida',
        'Configuración de mesas personalizada',
        'Atención dedicada del equipo',
        'Parqueadero',
      ],
      highlighted: true,
      idealFor: 'Cumpleaños infantiles, revelaciones de género, baby showers',
    },
    {
      name: 'Laguna Exclusiva',
      price: '$700,000–$800,000',
      capacity: '35–50 personas',
      description: 'Exclusividad total. Sin otros clientes en tu horario.',
      features: [
        'Todo del paquete Fiesta Campestre',
        'Exclusividad de zona completa',
        'Menú premium personalizado',
        'Decoración base incluida',
        'Coordinación integral del evento',
      ],
      highlighted: false,
      idealFor: 'Eventos grandes, celebraciones de empresa',
    },
  ],
  bonuses: [
    '🎣 BONUS: Lo que pesquen tus invitados, lo preparamos sin costo extra',
    '📸 BONUS: Lago + mural + guadua como backdrop natural para fotos espectaculares',
  ],
  ctaText: 'Quiero cotizar mi evento',
  ctaHref: whatsappLink,
  guarantee: 'Garantía de clima: reprogramamos sin costo si llueve',
};

// ── For Who ─────────────────────────────────────────────────────
export const forWho: ForWhoData = {
  eyebrow: '¿Es para ti?',
  headline: 'Laguna Escondida es para ti si...',
  isFor: [
    'Quieres celebrar un cumpleaños, revelación de género, baby shower o reunión familiar',
    'Buscas un lugar campestre con actividades, no un salón cerrado',
    'Quieres llegar y disfrutar, no organizar logística de catering y decoración',
    'Tu grupo es de 10 a 50 personas',
    'Valoras la naturaleza y la comida fresca',
    'Quieres que los niños se diviertan Y los adultos descansen',
  ],
  notFor: [
    'Buscas un espacio con piscina',
    'Necesitas espacio para más de 50 personas en zona privada',
    'Prefieres un lugar urbano con música alta y discoteca',
  ],
};

// ── Social Proof ────────────────────────────────────────────────
export const socialProof: SocialProofData = {
  eyebrow: 'Lo que dicen quienes celebran aquí',
  headline: 'Familias del Oriente Antioqueño ya celebran en Laguna Escondida',
  credibility: [
    '⭐ 4.6 en Google Maps',
    '📍 Vereda La Primavera, Marinilla',
    '🎣 5 especies de peces — no solo trucha',
    '🌿 Espacio campestre en guadua natural',
    '🅿️ Parqueadero amplio',
  ],
  videos: [
    {
      mp4: 'https://cdn.laguna-escondida.com/celebraciones/cumple.mp4',
      webm: 'https://cdn.laguna-escondida.com/celebraciones/cumple.webm',
      poster: 'https://cdn.laguna-escondida.com/celebraciones/thumb-cumple.jpg',
      caption: 'Cumpleaños de 30 años',
      tag: 'Cumpleaños',
    },
  ],
  testimonials: [
    {
      quote: 'Los niños no pararon de pescar en 3 horas. Los papás comieron tranquilos frente al lago. Yo me senté a disfrutar mi propia fiesta.',
      name: 'Carolina G.',
      role: 'Cumpleaños infantil, 25 invitados',
      result: 'Todos preguntaron cómo encontré este lugar',
    },
    {
      quote: 'Hicimos la revelación de género frente al lago con el atardecer de fondo. Las fotos quedaron de revista sin decoración costosa.',
      name: 'Valentina M.',
      role: 'Revelación de género, 30 invitados',
      result: 'Fotos espectaculares sin gastar en decoración',
    },
    {
      quote: 'Los abuelos comieron frente al lago, los niños pescaron toda la tarde y yo por primera vez me senté tranquila. Ya reservamos para el próximo año.',
      name: 'Andrea L.',
      role: 'Reunión familiar, 20 personas',
      result: 'El mejor plan familiar que hemos hecho',
    },
  ],
  note: 'Testimonios basados en experiencias reales de familias que han celebrado en Laguna Escondida.',
};

// ── FAQ ─────────────────────────────────────────────────────────
export const faq: FAQData = {
  eyebrow: 'Preguntas frecuentes',
  headline: '¿Tienes dudas? Aquí te respondemos',
  items: [
    {
      question: '¿Y si llueve el día del evento?',
      answer: '¡Tranquila! Si el clima no permite disfrutar al aire libre, reprogramamos tu evento a otra fecha sin ningún costo adicional. Tu anticipo queda 100% protegido. Además, tenemos el kiosco privado y el comedor con techo — si es una lluvia pasajera, seguimos celebrando.',
    },
    {
      question: '¿Es muy lejos? Mis invitados vienen de Medellín.',
      answer: 'Estamos en Vereda La Primavera, Marinilla — a unos 45 minutos de Medellín por la autopista. La mayoría de nuestros clientes vienen del Valle de Aburrá y nos dicen que el camino es fácil y rápido. Tenemos parqueadero amplio para todos los invitados.',
    },
    {
      question: '¿Puedo ir a conocer el lugar antes de reservar?',
      answer: '¡Claro! Puedes venir cualquier domingo a almorzar con tu familia, recorrer el espacio y decidir si es el lugar para tu evento. Si después de conocerlo decides reservar, te descontamos el valor de tu almuerzo del precio del evento. Cero riesgo.',
    },
    {
      question: '¿Es seguro para niños pequeños?',
      answer: 'Sí. La zona del lago tiene supervisión y los espacios de comedor están separados del agua. Además tenemos zona verde con canchas donde los niños pueden correr y jugar seguros. La pesca se hace desde el borde — no necesitan meterse al agua.',
    },
    {
      question: '¿Solo tienen pescado en el menú?',
      answer: 'No. El menú es personalizable: tenemos pescados frescos (tilapia, yamú, cachama y más), carnes para quienes no comen pescado, y menú infantil. Armamos el menú según tu grupo — no todos tienen que comer lo mismo.',
    },
    {
      question: '¿Puedo llevar mi propia decoración?',
      answer: 'Sí, puedes traer globos, manteles, lo que quieras. Te configuramos las mesas y sillas como las necesites. Muchas familias nos dicen que con el lago y la guadua de fondo casi no necesitan decoración extra — las fotos quedan espectaculares así.',
    },
    {
      question: '¿Cuánta capacidad tienen para eventos?',
      answer: 'Para eventos privados manejamos de 10 a 50 personas cómodamente con 3 paquetes según tamaño. Tenemos hasta 60 mesas disponibles y zona verde amplia. Si tu grupo es más grande de 50, hablemos — podemos ver opciones especiales.',
    },
    {
      question: '¿Cuánto cuesta? ¿No es caro?',
      answer: 'Desde $300,000 COP. Si armaras todo por separado (finca + comida + actividades + mobiliario), gastarías más de $1,000,000 y todo el trabajo de organizar es tuyo. Aquí desde $12,000 por persona tienes espacio privado, comida, pesca deportiva y atención completa. Menos que un almuerzo corriente en Rionegro — pero con lago, pesca y naturaleza incluida.',
    },
  ],
};

// ── Guarantee ───────────────────────────────────────────────────
export const guarantee: GuaranteeData = {
  eyebrow: 'Reserva sin riesgo',
  headline: 'Tu plata y tu plan están protegidos',
  guarantees: [
    {
      title: '🌧️ Garantía de Clima',
      description: 'Si el día de tu evento el clima no permite disfrutar al aire libre, reprogramamos tu celebración a otra fecha sin ningún costo adicional. Tu anticipo queda 100% protegido.',
    },
    {
      title: '👀 Garantía "Visita Primero"',
      description: 'Ven a conocer Laguna Escondida antes de reservar. Almuerza con tu familia un domingo. Si decides reservar, te descontamos el almuerzo del precio del evento. Cero riesgo — primero conoces, después decides.',
    },
  ],
};

// ── Final CTA ───────────────────────────────────────────────────
export const finalCta: FinalCTAData = {
  headline: 'Tu próxima celebración puede ser frente al lago',
  subheadline: 'Deja de buscar. Deja de cocinar para 30. Deja de conformarte con salones genéricos. Celebra donde tú también puedas disfrutar.',
  ctaText: 'Quiero reservar mi fecha por WhatsApp',
  ctaHref: whatsappLink,
  guarantee: 'Garantía de clima incluida · Los fines de semana se reservan rápido',
};

// ── Combined export ─────────────────────────────────────────────
export const funnelData: FunnelData = {
  meta: {
    title: 'Laguna Escondida — Celebra tu evento frente al lago',
    description: 'Espacio campestre con lago, pesca deportiva y restaurante para eventos especiales en Marinilla. Desde $300,000 COP.',
  },
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappMessage: WHATSAPP_MESSAGE,
  hero,
  problem,
  solution,
  howItWorks,
  offer,
  forWho,
  faq,
  socialProof,
  guarantee,
  finalCta,
};
