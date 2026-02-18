// src/config/analytics.ts

export const ANALYTICS = {
  ga4MeasurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '',
  customEndpoint: '/api/analytics',
  enableInDev: false,
  funnelSteps: [
    { step: 1, name: 'eventos_landing', path: '/reservas' },
    { step: 2, name: 'galeria',         path: '/reservas/galeria' },
    { step: 3, name: 'paquetes',        path: '/reservas/paquetes' },
    { step: 4, name: 'formulario',      path: '/reservas/formulario' },
  ],
} as const;
