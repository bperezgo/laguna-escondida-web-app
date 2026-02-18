# Arquitectura Técnica y Sistema de Diseño
## Proyecto Web Unificado - Laguna Escondida

**Fecha:** 17 de Febrero, 2026
**Stack:** Astro.js + Tailwind CSS + Strapi CMS
**Principios:** Clean Architecture, Atomic Design, Design System

---

## 1. Arquitectura del Proyecto

### Estructura de Directorios (Clean Architecture)

```
laguna-escondida-web/
│
├── src/
│   ├── pages/                             # Routing automático de Astro
│   │   ├── index.astro                    # Home/Landing principal
│   │   │
│   │   ├── reservas/
│   │   │   ├── index.astro                # Página 1: Landing eventos
│   │   │   ├── galeria.astro              # Página 2: Galería por categoría
│   │   │   ├── paquetes.astro             # Página 3: Pricing/Paquetes
│   │   │   └── formulario.astro           # Página 4: Multi-step form
│   │   │
│   │   ├── contenido/                     # Blog section
│   │   │   ├── index.astro                # Blog home/listado
│   │   │   ├── [categoria]/
│   │   │   │   └── index.astro            # Archive por categoría
│   │   │   └── [slug].astro               # Post individual
│   │   │
│   │   └── api/                           # API endpoints
│   │       ├── reserva.ts                 # POST: procesar reserva
│   │       ├── newsletter.ts              # POST: suscripción
│   │       └── analytics.ts               # POST: eventos custom analytics
│   │
│   ├── components/                        # Atomic Design Structure
│   │   ├── atoms/                         # Componentes más básicos
│   │   │   ├── Button.astro
│   │   │   ├── Input.astro
│   │   │   ├── Select.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Icon.astro
│   │   │   └── Image.astro
│   │   │
│   │   ├── molecules/                     # Combinación de atoms
│   │   │   ├── FormField.astro            # Input + Label + Error
│   │   │   ├── Card.astro                 # Image + Title + Description
│   │   │   ├── NavLink.astro
│   │   │   ├── PriceTag.astro
│   │   │   └── SocialShare.astro
│   │   │
│   │   ├── organisms/                     # Secciones completas
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── HeroSection.astro
│   │   │   ├── GalleryGrid.astro
│   │   │   ├── PricingTable.astro
│   │   │   ├── NewsletterBox.astro
│   │   │   └── BlogPostList.astro
│   │   │
│   │   ├── templates/                     # Page-level templates
│   │   │   ├── reservas/
│   │   │   │   ├── LandingTemplate.astro
│   │   │   │   └── FormTemplate.astro
│   │   │   └── blog/
│   │   │       ├── PostTemplate.astro
│   │   │       └── ArchiveTemplate.astro
│   │   │
│   │   └── widgets/                       # Features independientes
│   │       ├── MultiStepForm/
│   │       │   ├── FormWizard.astro
│   │       │   ├── ProgressBar.astro
│   │       │   └── steps/
│   │       │       ├── EventInfoStep.astro
│   │       │       ├── CustomizationStep.astro
│   │       │       └── ContactStep.astro
│   │       │
│   │       └── Analytics/
│   │           ├── GoogleAnalytics.astro
│   │           ├── CustomTracker.astro
│   │           └── EventTracker.ts
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro               # Layout raíz (HTML, head, body)
│   │   ├── ReservasLayout.astro           # Wrapper para funnel
│   │   └── ContenidoLayout.astro          # Wrapper para blog
│   │
│   ├── styles/
│   │   ├── design-system/                 # Sistema de diseño centralizado
│   │   │   ├── tokens.css                 # Design tokens (variables CSS)
│   │   │   ├── typography.css             # Estilos de texto
│   │   │   ├── colors.css                 # Paleta de colores
│   │   │   ├── spacing.css                # Sistema de espaciado
│   │   │   └── animations.css             # Transiciones y animaciones
│   │   │
│   │   ├── components/                    # Estilos por componente
│   │   │   ├── button.css
│   │   │   ├── card.css
│   │   │   └── form.css
│   │   │
│   │   └── global.css                     # Estilos globales + Tailwind imports
│   │
│   ├── lib/                               # Business Logic (Use Cases)
│   │   ├── usecases/
│   │   │   ├── reservas/
│   │   │   │   ├── createReservation.ts
│   │   │   │   ├── validateReservationForm.ts
│   │   │   │   └── calculatePricing.ts
│   │   │   │
│   │   │   ├── newsletter/
│   │   │   │   └── subscribeToNewsletter.ts
│   │   │   │
│   │   │   └── analytics/
│   │   │       ├── trackEvent.ts
│   │   │       ├── trackPageView.ts
│   │   │       └── trackConversion.ts
│   │   │
│   │   ├── services/                      # Servicios externos
│   │   │   ├── strapi.ts                  # Cliente Strapi
│   │   │   ├── email.ts                   # Envío de emails (Resend, etc)
│   │   │   └── payment.ts                 # Pasarelas pago (futuro)
│   │   │
│   │   └── utils/
│   │       ├── formatters.ts              # Formateo de datos
│   │       ├── validators.ts              # Validaciones
│   │       └── constants.ts               # Constantes de app
│   │
│   ├── types/                             # TypeScript types
│   │   ├── reserva.ts
│   │   ├── blog.ts
│   │   ├── strapi.ts
│   │   └── analytics.ts
│   │
│   └── config/
│       ├── site.ts                        # Config del sitio
│       ├── navigation.ts                  # Navegación
│       └── analytics.ts                   # Config analytics
│
├── public/
│   ├── images/
│   ├── videos/
│   └── fonts/
│
├── tailwind.config.mjs                    # Tailwind extendido con design tokens
├── astro.config.mjs
└── tsconfig.json
```

---

## 2. Sistema de Diseño (Design System)

### Design Tokens (`src/styles/design-system/tokens.css`)

**Concepto:** Valores centralizados que controlan todo el diseño

```css
/* src/styles/design-system/tokens.css */

:root {
  /* ========================================
     COLORES - Basados en paleta "Naturaleza Elegante"
     ======================================== */
  
  /* Colores Primarios */
  --color-primary-50: #f0f7f0;
  --color-primary-100: #d9edd9;
  --color-primary-200: #b3dbb3;
  --color-primary-300: #8cc98c;
  --color-primary-400: #66b866;
  --color-primary-500: #2D5016;  /* Forest Green - Principal */
  --color-primary-600: #244013;
  --color-primary-700: #1b3010;
  --color-primary-800: #12200a;
  --color-primary-900: #091005;

  /* Colores Secundarios */
  --color-secondary-50: #f0f8fa;
  --color-secondary-100: #d6eef3;
  --color-secondary-200: #addee7;
  --color-secondary-300: #84cddb;
  --color-secondary-400: #5bbdcf;
  --color-secondary-500: #4A90A4;  /* Lake Blue - Secundario */
  --color-secondary-600: #3b7383;
  --color-secondary-700: #2c5662;
  --color-secondary-800: #1d3a41;
  --color-secondary-900: #0e1d21;

  /* Colores de Acento */
  --color-accent-50: #fef5f0;
  --color-accent-100: #fce5d6;
  --color-accent-200: #f9cbad;
  --color-accent-300: #f5b184;
  --color-accent-400: #f2975b;
  --color-accent-500: #D97941;  /* Sunset Orange - Acento */
  --color-accent-600: #ae6134;
  --color-accent-700: #824927;
  --color-accent-800: #57311a;
  --color-accent-900: #2b180d;

  /* Neutros */
  --color-neutral-50: #fcfbf9;
  --color-neutral-100: #F5F1E8;  /* Cream - Neutro */
  --color-neutral-200: #e8dfc9;
  --color-neutral-300: #d4c5a1;
  --color-neutral-400: #c0ab79;
  --color-neutral-500: #a48e5a;
  --color-neutral-600: #83724b;
  --color-neutral-700: #62553b;
  --color-neutral-800: #423828;
  --color-neutral-900: #211c14;

  /* Grises */
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #333333;  /* Charcoal - Texto */
  --color-gray-900: #1a1a1a;

  /* Colores Semánticos */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* ========================================
     TIPOGRAFÍA
     ======================================== */
  
  /* Font Families */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Lato', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes - Escala modular 1.25 (Major Third) */
  --font-size-xs: 0.64rem;      /* 10.24px */
  --font-size-sm: 0.8rem;       /* 12.8px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.25rem;      /* 20px */
  --font-size-xl: 1.563rem;     /* 25px */
  --font-size-2xl: 1.953rem;    /* 31.25px */
  --font-size-3xl: 2.441rem;    /* 39px */
  --font-size-4xl: 3.052rem;    /* 48.83px */
  --font-size-5xl: 3.815rem;    /* 61.04px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;

  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;

  /* ========================================
     ESPACIADO - Sistema 8px
     ======================================== */
  
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* ========================================
     RADIOS (Border Radius)
     ======================================== */
  
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;

  /* ========================================
     SOMBRAS
     ======================================== */
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* ========================================
     TRANSICIONES
     ======================================== */
  
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  --transition-slower: 500ms ease;

  /* Easings personalizados */
  --ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ========================================
     Z-INDEX - Capas definidas
     ======================================== */
  
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;

  /* ========================================
     BREAKPOINTS (para referencia en JS)
     ======================================== */
  
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* ========================================
     CONTENEDORES
     ======================================== */
  
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1400px;
}

/* Dark mode tokens (futuro) */
@media (prefers-color-scheme: dark) {
  :root {
    /* Aquí irían los tokens para dark mode */
  }
}
```

---

### Extensión de Tailwind con Design Tokens

**`tailwind.config.mjs`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Mapeo de design tokens a Tailwind
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
      },
      spacing: {
        // Extender con tokens de espaciado
        0: 'var(--space-0)',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        32: 'var(--space-32)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
        slower: 'var(--transition-slower)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

---

## 3. Componentes Atómicos (Ejemplos)

### Atom: Button (`src/components/atoms/Button.astro`)

```astro
---
export interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  disabled?: boolean;
  'data-analytics-event'?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  class: className = '',
  disabled = false,
  'data-analytics-event': analyticsEvent,
  ...rest
} = Astro.props;

// Variantes de diseño usando design tokens
const variantClasses = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-md hover:shadow-lg',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-md',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
  ghost: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

const Tag = href ? 'a' : 'button';
---

<Tag
  href={href}
  type={!href ? type : undefined}
  class={classes}
  disabled={disabled}
  data-analytics-event={analyticsEvent}
  {...rest}
>
  <slot />
</Tag>

<script>
  // Auto-tracking de clicks en botones con analytics
  document.querySelectorAll('[data-analytics-event]').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventName = (e.currentTarget as HTMLElement).dataset.analyticsEvent;
      if (eventName && window.trackEvent) {
        window.trackEvent(eventName, {
          element: 'button',
          text: (e.currentTarget as HTMLElement).textContent?.trim(),
        });
      }
    });
  });
</script>
```

**Uso del componente:**

```astro
<Button variant="primary" size="lg" data-analytics-event="cta_reservar_click">
  Reservar Ahora
</Button>

<Button variant="outline" href="/contenido">
  Ver Blog
</Button>
```

---

### Molecule: FormField (`src/components/molecules/FormField.astro`)

```astro
---
import Input from '../atoms/Input.astro';

export interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  class?: string;
}

const {
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  helpText,
  class: className = '',
} = Astro.props;

const id = `field-${name}`;
---

<div class={`form-field ${className}`}>
  <label
    for={id}
    class="block text-sm font-medium text-gray-700 mb-2"
  >
    {label}
    {required && <span class="text-error">*</span>}
  </label>

  <Input
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    required={required}
    class={error ? 'border-error' : ''}
    aria-invalid={error ? 'true' : 'false'}
    aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
  />

  {helpText && !error && (
    <p id={`${id}-help`} class="mt-1 text-sm text-gray-500">
      {helpText}
    </p>
  )}

  {error && (
    <p id={`${id}-error`} class="mt-1 text-sm text-error" role="alert">
      {error}
    </p>
  )}
</div>
```

---

## 4. Use Cases (Business Logic)

### Ejemplo: Crear Reserva (`src/lib/usecases/reservas/createReservation.ts`)

```typescript
// src/lib/usecases/reservas/createReservation.ts

import type { ReservationData, ReservationResult } from '@/types/reserva';
import { validateReservationForm } from './validateReservationForm';
import { calculatePricing } from './calculatePricing';
import { sendConfirmationEmail } from '@/lib/services/email';
import { saveToStrapi } from '@/lib/services/strapi';
import { trackEvent } from '@/lib/usecases/analytics/trackEvent';

/**
 * Use Case: Crear una nueva reserva
 * 
 * Este caso de uso orquesta el proceso completo:
 * 1. Valida los datos del formulario
 * 2. Calcula el pricing
 * 3. Guarda en Strapi
 * 4. Envía email de confirmación
 * 5. Trackea evento en analytics
 */
export async function createReservation(
  data: ReservationData
): Promise<ReservationResult> {
  try {
    // 1. Validación
    const validation = validateReservationForm(data);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    // 2. Calcular pricing
    const pricing = calculatePricing({
      package: data.package,
      guestCount: data.guestCount,
      addons: data.addons,
    });

    // 3. Guardar en Strapi
    const savedReservation = await saveToStrapi('reservations', {
      ...data,
      pricing,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    // 4. Enviar email
    await sendConfirmationEmail({
      to: data.email,
      reservationId: savedReservation.id,
      data: {
        ...data,
        pricing,
      },
    });

    // 5. Track analytics
    await trackEvent('reservation_created', {
      package: data.package,
      guestCount: data.guestCount,
      value: pricing.total,
    });

    return {
      success: true,
      reservationId: savedReservation.id,
      pricing,
    };

  } catch (error) {
    console.error('Error creating reservation:', error);
    
    // Track error
    await trackEvent('reservation_error', {
      error: error.message,
      step: 'creation',
    });

    return {
      success: false,
      errors: { general: 'Ocurrió un error al procesar la reserva' },
    };
  }
}
```

**Ventajas de este approach:**
- ✅ Lógica de negocio separada de UI
- ✅ Fácil de testear (unit tests)
- ✅ Reutilizable (puede usarse desde API route o form)
- ✅ Single Responsibility Principle
- ✅ Fácil agregar features (ej: integrar pasarela de pago)

---

## 5. Sistema de Analytics Modular

### Tracker Abstracto (`src/lib/usecases/analytics/trackEvent.ts`)

```typescript
// src/lib/usecases/analytics/trackEvent.ts

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

/**
 * Track event en múltiples plataformas
 * 
 * Arquitectura pluggable: fácil agregar/quitar providers
 */
export async function trackEvent(
  name: string,
  properties: Record<string, any> = {}
): Promise<void> {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
  };

  // Provider 1: Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, properties);
  }

  // Provider 2: Custom Analytics (futuro)
  await trackCustomAnalytics(event);

  // Provider 3: Facebook Pixel (si existe)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, properties);
  }

  // Log en development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', event);
  }
}

/**
 * Custom analytics: envía a tu propio endpoint
 */
async function trackCustomAnalytics(event: AnalyticsEvent): Promise<void> {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch (error) {
    console.error('Custom analytics error:', error);
  }
}

// Type augmentation para window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    trackEvent?: typeof trackEvent;
  }
}
```

### API Endpoint Custom Analytics (`src/pages/api/analytics.ts`)

```typescript
// src/pages/api/analytics.ts

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const event = await request.json();

    // Aquí puedes:
    // 1. Guardar en base de datos propia
    // 2. Enviar a servicio de analytics custom
    // 3. Procesamiento en tiempo real
    
    console.log('Custom analytics event:', event);

    // Ejemplo: Guardar en Strapi
    // await strapi.create('analytics-events', event);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

---

## 6. Integración con Strapi

### Cliente Strapi (`src/lib/services/strapi.ts`)

```typescript
// src/lib/services/strapi.ts

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

class StrapiClient {
  private baseURL: string;
  private token: string;

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api/${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Obtener posts del blog
   */
  async getBlogPosts(options: {
    populate?: string;
    sort?: string;
    filters?: any;
    pagination?: { page: number; pageSize: number };
  } = {}) {
    const params = new URLSearchParams();
    
    if (options.populate) params.append('populate', options.populate);
    if (options.sort) params.append('sort', options.sort);
    if (options.pagination) {
      params.append('pagination[page]', options.pagination.page.toString());
      params.append('pagination[pageSize]', options.pagination.pageSize.toString());
    }
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, String(value));
      });
    }

    return this.request<StrapiResponse<any[]>>(`posts?${params.toString()}`);
  }

  /**
   * Obtener un post por slug
   */
  async getPostBySlug(slug: string) {
    const response = await this.request<StrapiResponse<any[]>>(
      `posts?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data[0] || null;
  }

  /**
   * Crear una entrada (genérico)
   */
  async create(collection: string, data: any) {
    return this.request(`${collection}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  /**
   * Actualizar una entrada
   */
  async update(collection: string, id: string, data: any) {
    return this.request(`${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }
}

// Singleton instance
export const strapi = new StrapiClient(STRAPI_URL, STRAPI_TOKEN);
```

**Uso en páginas:**

```astro
---
// src/pages/contenido/[slug].astro
import { strapi } from '@/lib/services/strapi';

const { slug } = Astro.params;
const post = await strapi.getPostBySlug(slug);

if (!post) {
  return Astro.redirect('/404');
}
---

<h1>{post.attributes.title}</h1>
<div set:html={post.attributes.content} />
```

---

## 7. Pasarelas de Pago (Preparación)

### Service Abstracto (`src/lib/services/payment.ts`)

```typescript
// src/lib/services/payment.ts

export interface PaymentProvider {
  createPaymentIntent(amount: number, metadata: any): Promise<any>;
  confirmPayment(paymentIntentId: string): Promise<any>;
}

/**
 * Wompi Provider (ejemplo)
 */
class WompiProvider implements PaymentProvider {
  private publicKey: string;
  private privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  async createPaymentIntent(amount: number, metadata: any) {
    // Implementación de Wompi
    // https://docs.wompi.co/
    throw new Error('Not implemented');
  }

  async confirmPayment(paymentIntentId: string) {
    throw new Error('Not implemented');
  }
}

/**
 * Factory para elegir provider
 */
export function getPaymentProvider(): PaymentProvider {
  const provider = import.meta.env.PAYMENT_PROVIDER || 'wompi';
  
  switch (provider) {
    case 'wompi':
      return new WompiProvider(
        import.meta.env.WOMPI_PUBLIC_KEY,
        import.meta.env.WOMPI_PRIVATE_KEY
      );
    // Fácil agregar más providers
    case 'payu':
      // return new PayUProvider(...);
    default:
      throw new Error(`Unknown payment provider: ${provider}`);
  }
}
```

---

## 8. Plan de Diseño e Iteración

### Workflow Recomendado

#### FASE 1: Diseño en Figma (1-2 semanas)

**Paso 1: Setup de Figma**

1. Crear cuenta en Figma (gratis)
2. Crear nuevo proyecto "Laguna Escondida"
3. Importar Design System:
   - Variables de color (de tokens.css)
   - Tipografías
   - Componentes base

**Paso 2: Diseñar Sistema de Diseño en Figma**

```
Estructura de archivo Figma:

📄 Laguna Escondida Design System
├── 📁 Design Tokens
│   ├── 🎨 Colors (todas las escalas)
│   ├── 📝 Typography (scale + weights)
│   ├── 📏 Spacing
│   └── ✨ Effects (shadows, etc)
│
├── 📁 Components
│   ├── Atoms (Button, Input, Badge, etc)
│   ├── Molecules (FormField, Card, etc)
│   └── Organisms (Navbar, Footer, etc)
│
├── 📁 Reservas - Funnel
│   ├── 01 - Landing Page
│   ├── 02 - Galería
│   ├── 03 - Paquetes
│   └── 04 - Formulario (3 steps)
│
└── 📁 Contenido - Blog
    ├── Blog Home
    ├── Post Template
    └── Category Archive
```

**Paso 3: Diseño de Pantallas**

Para cada pantalla:
1. Versión Desktop (1440px width)
2. Versión Tablet (768px width)
3. Versión Mobile (375px width)

**Paso 4: Prototipo Interactivo**

- Conectar pantallas con flujos
- Simular multi-step form
- Agregar microinteracciones

---

#### FASE 2: Review e Iteración (3-5 días)

**Proceso:**

1. **Compartir link de Figma** (modo presentación)
2. **Feedback estructurado:**
   ```
   Revisar por pantalla:
   □ ¿Los colores comunican la marca?
   □ ¿La jerarquía visual es clara?
   □ ¿Los CTAs son obvios?
   □ ¿El spacing se siente balanceado?
   □ ¿Funciona en mobile?
   ```

3. **Iterar basado en feedback**
4. **Aprobar diseño final**

---

#### FASE 3: Desarrollo (3-4 semanas)

**Semana 1: Setup + Design System**
```
□ Init proyecto Astro
□ Setup Tailwind con design tokens
□ Crear componentes atómicos (Button, Input, etc)
□ Crear layout base
□ Setup Strapi connection
```

**Semana 2: Funnel de Reservas**
```
□ Página 1: Landing
□ Página 2: Galería
□ Página 3: Paquetes
□ Página 4: Formulario multi-step
□ API routes
□ Integración analytics
```

**Semana 3: Blog**
```
□ Blog home
□ Post template
□ Category archives
□ Newsletter box
□ Integración Strapi
```

**Semana 4: Polish + Testing**
```
□ Performance optimization
□ SEO optimization
□ Cross-browser testing
□ Mobile testing
□ Analytics verification
```

---

### Herramientas de Diseño Recomendadas

#### Opción 1: Figma (Recomendado) ⭐

**Por qué:**
- ✅ Gratis para uso personal
- ✅ Colaboración en tiempo real
- ✅ Componentes reutilizables
- ✅ Auto-layout (responsive design)
- ✅ Prototipado interactivo
- ✅ Plugins excelentes
- ✅ Dev mode (handoff a desarrolladores)

**Plugins útiles:**
- **Unsplash:** Fotos stock directamente
- **Iconify:** Miles de iconos
- **Stark:** Verificar contraste/accesibilidad
- **Design Lint:** Catch de errores de diseño

**Template gratuito de inicio:**
- Buscar "Restaurant Website" en Figma Community
- Adaptar a tu design system

---

#### Opción 2: Penpot (Open Source)

**Por qué considerarlo:**
- ✅ Completamente gratis
- ✅ Open source
- ✅ Similar a Figma
- ✅ Self-hosted si quieres

**Contra:**
- ⚠️ Menos plugins
- ⚠️ Comunidad más pequeña

---

#### Opción 3: Adobe XD

**Por qué NO recomiendo:**
- ❌ Adobe está descontinuando XD
- ❌ Migran usuarios a Figma

---

### Alternativa: Design Tokens + Componentes en Storybook

Si prefieres diseñar directamente en código:

**Storybook Setup:**

```bash
npx astro add storybook
```

**Ventajas:**
- Diseñas con componentes reales
- Lo que ves es lo que obtienes (WYSIWYG)
- Testing visual incluido
- Documentación viva

**Desventajas:**
- Más técnico (requiere código)
- Menos ágil para iteración rápida

---

## 9. Configuración de Astro

### `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react'; // Si necesitas interactividad

export default defineConfig({
  site: 'https://lagunaescondida.com',
  integrations: [
    tailwind({
      config: { applyBaseStyles: false }, // Usamos nuestro global.css
    }),
    sitemap(),
    react(), // Para componentes interactivos (multi-step form)
  ],
  
  output: 'hybrid', // Permite páginas estáticas + API routes
  
  vite: {
    optimizeDeps: {
      exclude: ['@astrojs/strapi'],
    },
  },
});
```

---

## 10. Newsletter con ConvertKit/Mailchimp

### Componente Newsletter (`src/components/organisms/NewsletterBox.astro`)

```astro
---
// src/components/organisms/NewsletterBox.astro
import Button from '@/components/atoms/Button.astro';
import FormField from '@/components/molecules/FormField.astro';
---

<div class="newsletter-box bg-neutral-50 rounded-2xl p-8 border-2 border-neutral-200">
  <div class="max-w-md mx-auto text-center">
    <h3 class="font-heading text-2xl text-gray-800 mb-3">
      📬 Recibe Contenido Exclusivo
    </h3>
    <p class="text-gray-600 mb-6">
      Tips de pesca, recetas, y ofertas especiales directo a tu inbox.
      Sin spam, lo prometemos.
    </p>

    <form
      id="newsletter-form"
      class="space-y-4"
      data-analytics-form="newsletter"
    >
      <FormField
        label="Tu Email"
        name="email"
        type="email"
        placeholder="tu@email.com"
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        class="w-full"
        data-analytics-event="newsletter_subscribe"
      >
        Suscribirme Gratis
      </Button>

      <p class="text-xs text-gray-500">
        Al suscribirte aceptas nuestra política de privacidad
      </p>
    </form>

    <div id="newsletter-success" class="hidden mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
      ✅ ¡Listo! Revisa tu email para confirmar.
    </div>

    <div id="newsletter-error" class="hidden mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
      ❌ Algo salió mal. Intenta de nuevo.
    </div>
  </div>
</div>

<script>
  const form = document.getElementById('newsletter-form') as HTMLFormElement;
  const successMsg = document.getElementById('newsletter-success');
  const errorMsg = document.getElementById('newsletter-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        form.classList.add('hidden');
        successMsg?.classList.remove('hidden');
        
        // Track conversion
        if (window.trackEvent) {
          window.trackEvent('newsletter_subscribed', { email });
        }
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      errorMsg?.classList.remove('hidden');
      setTimeout(() => errorMsg?.classList.add('hidden'), 5000);
    }
  });
</script>
```

### API Route Newsletter (`src/pages/api/newsletter.ts`)

```typescript
// src/pages/api/newsletter.ts

import type { APIRoute } from 'astro';

const CONVERTKIT_API_KEY = import.meta.env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = import.meta.env.CONVERTKIT_FORM_ID;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400 }
      );
    }

    // Suscribir a ConvertKit
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
          tags: ['blog-subscriber'], // Tag para segmentar
        }),
      }
    );

    if (!response.ok) {
      throw new Error('ConvertKit error');
    }

    // También guardar en Strapi (opcional)
    // await strapi.create('newsletter-subscribers', { email });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter error:', error);
    return new Response(
      JSON.stringify({ error: 'Error al suscribir' }),
      { status: 500 }
    );
  }
};
```

---

## 11. Checklist de Implementación

### Pre-Desarrollo

```
□ Decidir: ¿Figma o diseño directo en código?
□ Si Figma:
  □ Crear cuenta
  □ Importar design tokens
  □ Diseñar 4 páginas funnel (desktop/tablet/mobile)
  □ Diseñar templates blog
  □ Crear prototipo interactivo
  □ 2 rondas de feedback/iteración
  □ Aprobación final

□ Setup técnico:
  □ Instalar Astro
  □ Configurar Tailwind
  □ Crear design tokens CSS
  □ Setup repositorio Git
  □ Configurar Strapi local
```

### Desarrollo Fase 1: Core

```
□ Componentes atómicos (Button, Input, etc)
□ Layout base con Navbar + Footer
□ Sistema de routing (/reservas, /contenido)
□ Integración design tokens → Tailwind
□ Analytics wrapper (Google + custom)
```

### Desarrollo Fase 2: Funnel

```
□ Página 1: Landing con video hero
□ Página 2: Galería por categorías
□ Página 3: Tabla de paquetes
□ Página 4: Multi-step form
□ API route: /api/reserva
□ Email confirmación
□ Analytics tracking
```

### Desarrollo Fase 3: Blog

```
□ Blog home (listado de posts)
□ Post template con TOC
□ Category archives
□ Integración Strapi
□ Newsletter box
□ API route: /api/newsletter
□ Sitemaps
```

### Testing y Launch

```
□ Performance (Lighthouse >90)
□ SEO (meta tags, schema, sitemap)
□ Accesibilidad (WCAG AA)
□ Cross-browser (Chrome, Safari, Firefox)
□ Mobile responsive
□ Analytics verification
□ Deploy a producción
```

---

## 12. Próximos Pasos Inmediatos

### Decisión #1: ¿Figma o Código?

**Si eliges Figma:**
- Te creo template base con design system
- Diseñamos juntos las 4 páginas funnel
- Iteras hasta aprobar
- Luego desarrollo

**Si eliges Código Directo:**
- Inicio desarrollo con design tokens
- Uso Storybook para iterar visualmente
- Builds más rápidos pero menos flexibilidad

### Decisión #2: Newsletter Provider

**Opciones:**
- ConvertKit (recomendado para blogs) - $25/mes
- Mailchimp - Gratis hasta 500 suscriptores
- Resend - $20/mes, mejor para transaccionales
- Brevo (ex Sendinblue) - Gratis hasta 300/día

---

## ¿Qué hacemos primero?

1. **¿Empezamos el diseño en Figma?** → Te preparo template
2. **¿Quieres ver código de ejemplo?** → Te muestro componente completo
3. **¿Configuramos Astro ya?** → Te doy el setup exacto

¿Por dónde arrancamos? 🚀