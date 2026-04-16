# Estrategia de Testing para Analytics Events

## ¿Es necesario testear los eventos de analytics?

**Sí, pero de forma pragmática.** Aquí está el razonamiento:

### Por qué sí

1. **Fallos silenciosos**: Si un refactor elimina un `data-event` de un botón, no hay error — simplemente dejas de recibir datos. Podrías pasar semanas corriendo ads sin medir conversiones y no enterarte hasta revisar GA4.

2. **Tracking es código de negocio**: Para Laguna Escondida, un WhatsApp click no rastreado es dinero invisible. Si gastas en Meta Ads y el pixel no reporta la conversión, Meta no puede optimizar el ad — pagas más por menos.

3. **Los data attributes son frágiles**: Tu sistema de tracking depende de `data-event`, `data-location`, y `data-section` en el HTML. Estos atributos no tienen protección del compilador (TypeScript no los valida). Un copy-paste mal hecho o un component refactor puede eliminarlos.

### Por qué no over-enginear

1. No necesitas tests E2E que verifiquen que GA4 recibe el evento — eso es responsabilidad de GTM/GA4.
2. No necesitas mockear `window.dataLayer` y simular clicks en Playwright — es testing frágil que rompe cuando cambias copy.
3. Lo que necesitas es **verificar que los data attributes correctos existen en los elementos correctos**, y que las **páginas de conversión (gracias) disparan los eventos esperados**.

---

## Enfoque recomendado: 3 capas de testing

### Capa 1: Tests estáticos (build time) — **Recomendado**

Estos tests se ejecutan en el build y verifican la estructura del HTML generado. Son baratos, rápidos, y previenen el 80% de los problemas.

#### Qué testear

1. **Cada página que tiene CTAs de WhatsApp debe tener al menos un elemento con `data-event="whatsapp_click"` o `data-event="funnel_whatsapp_click"`**
2. **Cada sección principal debe tener `data-section`**
3. **Cada elemento con `data-event` debe tener `data-location`** (nunca debería faltar)
4. **Las páginas de funnel deben tener los scripts de pixel** (Meta, TikTok)

#### Cómo implementarlo

Opción A: **Script de validación post-build** (recomendada para empezar)

```js
// scripts/validate-analytics.mjs
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { JSDOM } from 'jsdom';

const DEPLOY_DIR = 'deploy';

// Pages that MUST have WhatsApp tracking
const PAGES_WITH_WA_CTA = [
  'index.html',
  'experiencias/restaurante/index.html',
  'experiencias/pesca-deportiva/index.html',
  'experiencias/eventos/index.html',
  'menu/index.html',
  'f/celebraciones/index.html',
];

// Pages that MUST have conversion events on load
const CONVERSION_PAGES = [
  'f/celebraciones/gracias/index.html',
];

const errors = [];

for (const page of PAGES_WITH_WA_CTA) {
  const filePath = join(DEPLOY_DIR, page);
  try {
    const html = await readFile(filePath, 'utf-8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Check: at least one WhatsApp CTA with data-event
    const waCtas = doc.querySelectorAll(
      '[data-event="whatsapp_click"], [data-event="funnel_whatsapp_click"]'
    );
    if (waCtas.length === 0) {
      errors.push(`${page}: No WhatsApp CTA with data-event found`);
    }

    // Check: every data-event has a data-location
    const eventsWithoutLocation = doc.querySelectorAll(
      '[data-event]:not([data-location])'
    );
    if (eventsWithoutLocation.length > 0) {
      errors.push(
        `${page}: ${eventsWithoutLocation.length} element(s) with data-event but missing data-location`
      );
    }

    // Check: sections have data-section
    const sections = doc.querySelectorAll('section');
    const trackedSections = doc.querySelectorAll('section[data-section]');
    if (sections.length > 0 && trackedSections.length === 0) {
      errors.push(`${page}: Has ${sections.length} sections but none have data-section`);
    }
  } catch (e) {
    errors.push(`${page}: File not found — page may have been moved or removed`);
  }
}

if (errors.length > 0) {
  console.error('❌ Analytics validation failed:\n');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('✅ Analytics validation passed');
}
```

**Cómo correrlo**: Agregar al build script o como paso post-build:

```json
{
  "scripts": {
    "validate:analytics": "node scripts/validate-analytics.mjs",
    "build": "node build.mjs && npm run validate:analytics"
  }
}
```

Opción B: **Tests con Vitest** (cuando el proyecto madure)

```ts
// tests/analytics.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

function loadPage(path: string) {
  const html = readFileSync(`deploy/${path}`, 'utf-8');
  return new JSDOM(html).window.document;
}

describe('Analytics tracking attributes', () => {
  describe('Home page', () => {
    const doc = loadPage('index.html');

    it('has WhatsApp CTAs with tracking', () => {
      const ctas = doc.querySelectorAll('[data-event="whatsapp_click"]');
      expect(ctas.length).toBeGreaterThan(0);
    });

    it('all data-event elements have data-location', () => {
      const orphans = doc.querySelectorAll('[data-event]:not([data-location])');
      expect(orphans.length).toBe(0);
    });

    it('key sections have data-section', () => {
      const requiredSections = ['hero', 'experiencias', 'especies', 'galeria', 'resenas', 'ubicacion'];
      for (const name of requiredSections) {
        const el = doc.querySelector(`[data-section="${name}"]`);
        expect(el, `Missing data-section="${name}"`).not.toBeNull();
      }
    });
  });

  describe('Celebraciones funnel', () => {
    const doc = loadPage('f/celebraciones/index.html');

    it('has funnel WhatsApp CTAs with tracking', () => {
      const ctas = doc.querySelectorAll(
        '[data-event="funnel_whatsapp_click"], [data-event="whatsapp_click"]'
      );
      expect(ctas.length).toBeGreaterThan(0);
    });

    it('has GTM or pixel scripts', () => {
      const scripts = doc.querySelectorAll('script');
      const hasTracking = Array.from(scripts).some(s =>
        s.textContent?.includes('gtm.js') ||
        s.textContent?.includes('gtag') ||
        s.textContent?.includes('fbq') ||
        s.textContent?.includes('ttq')
      );
      expect(hasTracking).toBe(true);
    });

    it('funnel sections have data-section', () => {
      const sections = doc.querySelectorAll('section[data-section]');
      expect(sections.length).toBeGreaterThanOrEqual(5); // at least hero, problem, solution, offer, final-cta
    });
  });
});
```

### Capa 2: Manual validation con GTM Preview (pre-launch)

Antes de lanzar ads o publicar cambios importantes:

1. **GTM Preview mode**: GTM → Preview → abrir el funnel → verificar que cada evento aparece en el panel de debug
2. **Meta Pixel Helper**: Extensión de Chrome → abrir el funnel → verificar que PageView y Lead disparan correctamente
3. **TikTok Pixel Helper**: Extensión de Chrome → verificar PageView y Contact
4. **GA4 DebugView**: GA4 → Admin → DebugView → navegar el funnel → verificar eventos en tiempo real

**Checklist de validación manual:**

- [ ] Abrir la página — ¿PageView aparece en GTM Preview, Meta Pixel Helper, TikTok Pixel Helper?
- [ ] Scrollear hasta Offer — ¿`funnel_section_view` aparece para cada sección intermedia?
- [ ] Hacer clic en WhatsApp CTA — ¿`funnel_whatsapp_click` aparece en GTM? ¿Lead en Meta? ¿Contact en TikTok?
- [ ] Llegar a /gracias — ¿eventos de conversión disparan?
- [ ] Verificar en GA4 DebugView que los parámetros (`event_location`, `section_name`, `funnel_name`) tienen valores correctos

### Capa 3: Monitoreo continuo (post-launch)

Una vez corriendo ads:

1. **Alerta en GA4**: Crear insight personalizado si `generate_lead` cae a 0 en 24 horas
2. **Revisión semanal**: Comparar eventos enviados vs eventos recibidos en cada plataforma
3. **Smoke test post-deploy**: Después de cada deploy, abrir la página y verificar en GTM Preview que los eventos siguen disparando

---

## Resumen de la recomendación

| Capa | Cuándo | Esfuerzo | Impacto |
|------|--------|----------|---------|
| **Script post-build** | Cada build | Bajo — 1-2 horas setup | Previene 80% de los problemas |
| **GTM Preview manual** | Antes de lanzar ads | Medio — 30 min por funnel | Valida la cadena completa |
| **Monitoreo GA4** | Continuo | Bajo — 1 hora setup | Detecta regresiones en producción |

**Mi recomendación**: Empieza con la Capa 1 (script post-build). Es la que más valor te da por el menor esfuerzo. La Capa 2 la haces tú manualmente antes de activar cada campaña. La Capa 3 la configuras cuando ya tengas ads corriendo.

No implementes Playwright E2E tests para analytics — el ROI es bajo para el tamaño de este proyecto. Si algún día tienes 10+ funnels y un equipo, reconsidéralo.
