// src/config/navigation.ts

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Reservas',
    href: '/reservas',
    children: [
      { label: 'Eventos', href: '/reservas' },
      { label: 'Galería', href: '/reservas/galeria' },
      { label: 'Paquetes', href: '/reservas/paquetes' },
      { label: 'Reservar Ahora', href: '/reservas/formulario' },
    ],
  },
  {
    label: 'Blog',
    href: '/contenido',
  },
];

export const FOOTER_NAV = {
  reservas: [
    { label: 'Tipos de Eventos', href: '/reservas' },
    { label: 'Galería de Fotos', href: '/reservas/galeria' },
    { label: 'Paquetes y Precios', href: '/reservas/paquetes' },
    { label: 'Hacer una Reserva', href: '/reservas/formulario' },
  ],
  contenido: [
    { label: 'Blog', href: '/contenido' },
    { label: 'Tips de Pesca', href: '/contenido/categoria/pesca' },
    { label: 'Recetas', href: '/contenido/categoria/recetas' },
    { label: 'Naturaleza', href: '/contenido/categoria/naturaleza' },
  ],
  legal: [
    { label: 'Términos y Condiciones', href: '/terminos' },
    { label: 'Política de Privacidad', href: '/privacidad' },
    { label: 'Política de Cancelación', href: '/cancelacion' },
  ],
};
