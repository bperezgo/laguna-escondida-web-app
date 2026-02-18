// src/lib/utils/constants.ts

import type { Package, Addon, EventType } from '@/types/reserva';

export const MIN_GUESTS = 20;
export const MAX_GUESTS = 500;

export const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: 'boda', label: 'Boda' },
  { value: 'quinceanos', label: 'Quinceaños' },
  { value: 'cumpleanos', label: 'Cumpleaños' },
  { value: 'corporativo', label: 'Evento Corporativo' },
  { value: 'graduacion', label: 'Graduación' },
  { value: 'otro', label: 'Otro' },
];

export const PACKAGES: Package[] = [
  {
    id: 'basico',
    name: 'Básico',
    basePrice: 2_500_000,
    maxGuests: 50,
    features: [
      'Acceso al área principal (8 horas)',
      'Zona de fogata',
      'Estacionamiento',
      'Mesas y sillas para 50 personas',
    ],
  },
  {
    id: 'estandar',
    name: 'Estándar',
    basePrice: 4_800_000,
    maxGuests: 100,
    features: [
      'Todo lo del paquete Básico',
      'Servicio de meseros',
      'Iluminación festiva',
      'Sonido ambiente',
      'Mesas y sillas para 100 personas',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    basePrice: 8_500_000,
    maxGuests: 200,
    features: [
      'Todo lo del paquete Estándar',
      'Decoración temática incluida',
      'DJ o banda (2 horas)',
      'Barra de bebidas (no alcohólicas)',
      'Coordinador de evento',
    ],
  },
  {
    id: 'exclusivo',
    name: 'Exclusivo',
    basePrice: 15_000_000,
    maxGuests: 400,
    features: [
      'Todo lo del paquete Premium',
      'Fotografía profesional',
      'Catering completo para 200 personas',
      'DJ toda la noche',
      'Flores y decoración premium',
      'Atención personalizada',
    ],
  },
];

export const ADDONS: Addon[] = [
  { id: 'fotografia', name: 'Fotografía Profesional', price: 1_500_000 },
  { id: 'video', name: 'Video / Drone', price: 2_000_000 },
  { id: 'catering', name: 'Catering por persona (x100)', price: 800_000 },
  { id: 'dj', name: 'DJ (4 horas)', price: 1_200_000 },
  { id: 'flores', name: 'Arreglos Florales', price: 600_000 },
  { id: 'transporte', name: 'Transporte (bus x50 personas)', price: 500_000 },
  { id: 'torta', name: 'Torta Personalizada', price: 350_000 },
  { id: 'tipi', name: 'Carpa tipo Tipi', price: 900_000 },
];

export const BLOG_CATEGORIES = [
  { slug: 'pesca', label: 'Pesca' },
  { slug: 'recetas', label: 'Recetas' },
  { slug: 'naturaleza', label: 'Naturaleza' },
  { slug: 'eventos', label: 'Eventos' },
  { slug: 'consejos', label: 'Consejos' },
] as const;
