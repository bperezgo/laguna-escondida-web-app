const MIN_GUESTS = 20;
const MAX_GUESTS = 500;
const EVENT_TYPES = [
  { value: "boda", label: "Boda" },
  { value: "quinceanos", label: "Quinceaños" },
  { value: "cumpleanos", label: "Cumpleaños" },
  { value: "corporativo", label: "Evento Corporativo" },
  { value: "graduacion", label: "Graduación" },
  { value: "otro", label: "Otro" }
];
const PACKAGES = [
  {
    id: "basico",
    name: "Básico",
    basePrice: 25e5,
    maxGuests: 50,
    features: [
      "Acceso al área principal (8 horas)",
      "Zona de fogata",
      "Estacionamiento",
      "Mesas y sillas para 50 personas"
    ]
  },
  {
    id: "estandar",
    name: "Estándar",
    basePrice: 48e5,
    maxGuests: 100,
    features: [
      "Todo lo del paquete Básico",
      "Servicio de meseros",
      "Iluminación festiva",
      "Sonido ambiente",
      "Mesas y sillas para 100 personas"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    basePrice: 85e5,
    maxGuests: 200,
    features: [
      "Todo lo del paquete Estándar",
      "Decoración temática incluida",
      "DJ o banda (2 horas)",
      "Barra de bebidas (no alcohólicas)",
      "Coordinador de evento"
    ]
  },
  {
    id: "exclusivo",
    name: "Exclusivo",
    basePrice: 15e6,
    maxGuests: 400,
    features: [
      "Todo lo del paquete Premium",
      "Fotografía profesional",
      "Catering completo para 200 personas",
      "DJ toda la noche",
      "Flores y decoración premium",
      "Atención personalizada"
    ]
  }
];
const ADDONS = [
  { id: "fotografia", name: "Fotografía Profesional", price: 15e5 },
  { id: "video", name: "Video / Drone", price: 2e6 },
  { id: "catering", name: "Catering por persona (x100)", price: 8e5 },
  { id: "dj", name: "DJ (4 horas)", price: 12e5 },
  { id: "flores", name: "Arreglos Florales", price: 6e5 },
  { id: "transporte", name: "Transporte (bus x50 personas)", price: 5e5 },
  { id: "torta", name: "Torta Personalizada", price: 35e4 },
  { id: "tipi", name: "Carpa tipo Tipi", price: 9e5 }
];
const BLOG_CATEGORIES = [
  { slug: "pesca", label: "Pesca" },
  { slug: "recetas", label: "Recetas" },
  { slug: "naturaleza", label: "Naturaleza" },
  { slug: "eventos", label: "Eventos" },
  { slug: "consejos", label: "Consejos" }
];

export { ADDONS as A, BLOG_CATEGORIES as B, EVENT_TYPES as E, MIN_GUESTS as M, PACKAGES as P, MAX_GUESTS as a };
