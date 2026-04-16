# Playbook de Métricas — Funnels

## Visión general

Los funnels son landing pages de conversión directa, diseñadas para recibir tráfico de ads (Meta, Google, TikTok) y convertir en una acción específica (WhatsApp). A diferencia del site principal, cada funnel tiene un solo objetivo medible, y cada pixel/tag debe rastrear el journey completo desde el ad click hasta la conversión.

---

## 1. Arquitectura de tracking para funnels

### Plataformas de ads y sus pixels

| Plataforma | Pixel/Tag | Estado actual | Prioridad |
|-----------|-----------|---------------|-----------|
| **Google Ads** | GTM + GA4 (G-M3K8Y8YCXT) | Stub en código, env var vacía | **Alta** |
| **Meta (Facebook/Instagram)** | Meta Pixel | Stub en código, env var vacía | **Alta** |
| **TikTok** | TikTok Pixel | **No implementado** | Media |

### Lo que necesitas en cada funnel

```
┌─────────────────────────────────────────────┐
│  Funnel Page                                │
│                                             │
│  ┌─ GTM container ──────────────────────┐   │
│  │  → GA4 tag (page_view + events)      │   │
│  │  → Google Ads conversion tag         │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌─ Meta Pixel ─────────────────────────┐   │
│  │  → PageView (auto)                   │   │
│  │  → ViewContent (section views)       │   │
│  │  → Lead (WhatsApp click)             │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌─ TikTok Pixel ───────────────────────┐   │
│  │  → PageView (auto)                   │   │
│  │  → ViewContent (section views)       │   │
│  │  → SubmitForm / Contact (WA click)   │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌─ dataLayer events ───────────────────┐   │
│  │  → funnel_section_view               │   │
│  │  → funnel_cta_click                  │   │
│  │  → funnel_whatsapp_click             │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Recomendación**: Migrar el funnel de GA4 directo a GTM. Usar un solo GTM container (el que ya tienes: GTM-KQDH5BXV) para site y funnels. Esto centraliza toda la configuración de tags en un solo lugar.

---

## 2. Eventos estándar por plataforma

### Google Ads / GA4

| Evento GA4 | Cuándo disparar | Propósito |
|-----------|----------------|-----------|
| `page_view` | Al cargar la página | Automático con GA4 |
| `view_item` | Al ver sección de paquetes/oferta | Intención de compra |
| `generate_lead` | Al hacer clic en WhatsApp CTA | **Conversión principal** — usar como key event |
| `funnel_section_view` | Al ver cada sección del funnel | Optimización del funnel |
| `funnel_scroll_depth` | Al 25%, 50%, 75%, 100% | Engagement |

**Para Google Ads**: Configura `generate_lead` como conversión importada desde GA4. Google Ads optimizará la entrega de anuncios para maximizar esta acción.

### Meta (Facebook/Instagram)

| Evento Meta | Cuándo disparar | Propósito |
|------------|----------------|-----------|
| `PageView` | Al cargar | Automático con el pixel |
| `ViewContent` | Al ver sección de oferta/paquetes | Funnel de interés |
| `Lead` | Al hacer clic en WhatsApp CTA | **Conversión principal** |

**Importante para Meta Ads**: 
- Usa el **Conversions API (CAPI)** además del pixel del navegador. Meta penaliza los anunciantes que solo usan pixel (por iOS 14.5+).
- Para CAPI necesitas un backend — considera Cloudflare Workers dado que ya usas Cloudflare Pages.
- Configura el **dominio verificado** en Meta Business Manager.
- Usa `fbq('track', 'Lead', { content_name: 'celebraciones', content_category: 'eventos' })` para pasar metadata.

### TikTok

| Evento TikTok | Cuándo disparar | Propósito |
|--------------|----------------|-----------|
| `PageView` | Al cargar | Automático con el pixel |
| `ViewContent` | Al ver sección de oferta | Funnel de interés |
| `Contact` | Al hacer clic en WhatsApp | **Conversión principal** |
| `SubmitForm` | Al llegar a `/gracias` | Conversión secundaria |

**Para TikTok Ads**:
- TikTok Pixel se instala similar a Meta Pixel
- TikTok también tiene Events API (equivalente a CAPI)
- Los eventos estándar de TikTok son: `ViewContent`, `ClickButton`, `Contact`, `SubmitForm`, `CompleteRegistration`

---

## 3. Métricas del funnel de Celebraciones (`/f/celebraciones`)

### Estado actual del tracking: ❌ Sin eventos

El funnel actual no tiene **ningún** evento de tracking. Los CTAs de WhatsApp no tienen `data-event`, no hay `data-section` en las secciones, y no hay dataLayer pushes. Solo tiene stubs para GA4 y Meta Pixel con env vars vacías.

### Eventos que necesita este funnel

| Sección del funnel | Evento dataLayer | Evento Meta | Evento TikTok | Evento GA4 |
|-------------------|-----------------|-------------|---------------|------------|
| Hero (carga) | `funnel_page_view` | `PageView` (auto) | `PageView` (auto) | `page_view` (auto) |
| Hero → WhatsApp CTA | `funnel_whatsapp_click` location:hero | `Lead` | `Contact` | `generate_lead` |
| Hero → Ver paquetes | `funnel_scroll_to_packages` | — | — | `select_content` |
| Problem (vista) | `funnel_section_view` section:problem | — | — | custom event |
| Solution (vista) | `funnel_section_view` section:solution | — | — | custom event |
| HowItWorks (vista) | `funnel_section_view` section:how-it-works | — | — | custom event |
| SocialProof (vista) | `funnel_section_view` section:social-proof | `ViewContent` | `ViewContent` | custom event |
| Offer/Paquetes (vista) | `funnel_section_view` section:offer | `ViewContent` | `ViewContent` | `view_item` |
| Offer → WhatsApp CTA (por paquete) | `funnel_whatsapp_click` location:offer-{paquete} | `Lead` | `Contact` | `generate_lead` |
| ForWho (vista) | `funnel_section_view` section:for-who | — | — | custom event |
| Guarantee (vista) | `funnel_section_view` section:guarantee | — | — | custom event |
| FAQ (vista) | `funnel_section_view` section:faq | — | — | custom event |
| FinalCTA → WhatsApp | `funnel_whatsapp_click` location:final-cta | `Lead` | `Contact` | `generate_lead` |
| Página gracias (carga) | `funnel_thank_you` | `Lead` (confirmation) | `SubmitForm` | `generate_lead` (confirmation) |

### Métricas que debes monitorear

#### Métricas de adquisición (por fuente de ad)

| Métrica | Fuente | Qué te dice |
|---------|--------|-------------|
| CPC (costo por clic) | Dashboard de ads | Si el ad está bien segmentado |
| CTR del ad | Dashboard de ads | Si el creative funciona |
| Sesiones por campaña | GA4 con UTM | Si el tráfico llega |
| Tasa de rebote por fuente | GA4 | Si el ad promete lo que el funnel entrega |

#### Métricas de engagement del funnel

| Métrica | Cálculo | Benchmark |
|---------|---------|-----------|
| Scroll rate | % que ve cada sección | Hero: 100% → Offer: >40% → FinalCTA: >20% |
| Tiempo en página | GA4 engagement_time | > 2 min (funnel largo) |
| Sección de salida | Última `funnel_section_view` antes de salir | Si >60% sale antes de Offer, el Problem/Solution no convence |

#### Métricas de conversión

| Métrica | Cálculo | Benchmark |
|---------|---------|-----------|
| **Tasa de conversión del funnel** | WhatsApp clicks / sesiones | **> 5%** para tráfico frío, **> 15%** para tráfico tibio |
| CTA que más convierte | WhatsApp clicks por location | Identificar el CTA ganador |
| Conversión por paquete | Clicks en cada paquete / views de Offer | Qué paquete atrae más |
| Costo por lead (CPL) | Gasto en ads / WhatsApp clicks | **< $5 USD** para local services |
| Thank you page rate | Visitas a `/gracias` / WhatsApp clicks | % que realmente escribe por WhatsApp |

#### Métricas de ROI

| Métrica | Cálculo | Importancia |
|---------|---------|-------------|
| ROAS (Return on Ad Spend) | Ingresos de clientes del funnel / gasto en ads | **> 3x** para ser rentable |
| Tasa de cierre | Reservas confirmadas / leads por WhatsApp | Medir offline (CRM o manual) |
| Valor promedio del cliente | Ingreso promedio por reserva de evento | Para calcular cuánto puedes pagar por lead |

---

## 4. UTM Strategy

### Estructura de UTMs para cada plataforma

```
utm_source   = meta | google | tiktok | instagram | organic
utm_medium   = cpc | cpm | social | organic | referral
utm_campaign = {nombre-campana}
utm_content  = {variante-del-ad}
utm_term     = {keyword} (solo Google)
```

### Propósito de cada parámetro UTM

| Parámetro | Pregunta que responde | Qué puedes identificar |
|-----------|----------------------|------------------------|
| `utm_source` | ¿De qué plataforma vino? | "Meta me trajo 300 sesiones, Google 80" |
| `utm_medium` | ¿Qué tipo de canal es? | "El tráfico `cpc` convierte al 8%, el `social` al 2%" |
| `utm_campaign` | ¿Qué campaña específica? | "Cumpleaños CPL $3 USD, corporativos $12 USD — pausa la segunda" |
| `utm_content` | ¿Qué variante del ad? | "Video lago v2 convierte 2x más que el carousel — escala ese presupuesto" |
| `utm_term` | ¿Qué keyword activó el ad? (solo Google) | "Término `salon eventos marinilla` CPC $0.40 convierte bien" |

**Sin UTMs**: GA4 agrupa todo como "direct" sin saber qué ad, campaña o creative generó la conversión.

**Ejemplo real**: Un clic en Meta con esta URL permite responder las 5 preguntas simultáneamente:
```
/f/celebraciones?utm_source=meta&utm_medium=cpc
  &utm_campaign=celebraciones-cumpleanos-q2-2026
  &utm_content=video-lago-v2
```

> **Nota de implementación**: El funnel captura los 5 parámetros UTM y los añade como sufijo `[Ref: source / medium / campaign / content / term]` al mensaje de WhatsApp. Esto permite rastrear qué ad generó cada lead directamente en la conversación de WhatsApp, sin depender solo de GA4.

### Ejemplos

```
# Meta Ads - Campaña de celebraciones
?utm_source=meta&utm_medium=cpc&utm_campaign=celebraciones-q2-2026&utm_content=video-lago-v1

# Google Ads - Búsqueda de eventos
?utm_source=google&utm_medium=cpc&utm_campaign=eventos-marinilla&utm_term=salon+eventos+marinilla

# TikTok Ads
?utm_source=tiktok&utm_medium=cpc&utm_campaign=celebraciones-tiktok-q2&utm_content=trend-fiesta-lago

# Instagram orgánico (link en bio)
?utm_source=instagram&utm_medium=social&utm_campaign=link-bio
```

### Convención de nombres para campañas

```
{producto}-{segmento}-{trimestre}-{año}
```

Ejemplos:
- `celebraciones-cumpleanos-q2-2026`
- `pesca-familias-q3-2026`
- `restaurante-parejas-q2-2026`

---

## 5. Configuración de conversiones por plataforma

### Google Ads

1. **Importar conversiones desde GA4**: Google Ads → Tools → Conversions → Import → GA4 → seleccionar `generate_lead`
2. **Configurar valor de conversión**: Asignar un valor estimado por lead (ej: $50,000 COP basado en tu ticket promedio × tasa de cierre)
3. **Optimización de campaña**: Seleccionar "Maximize conversions" como bidding strategy

### Meta Ads

1. **Verificar dominio** en Meta Business Manager
2. **Configurar pixel** con env var `PUBLIC_META_PIXEL_ID`
3. **Agregar Aggregated Event Measurement**: Priorizar `Lead` como evento #1
4. **Crear Custom Conversion**: URL contains `/f/celebraciones/gracias` = Lead
5. **En la campaña**: Optimizar por evento `Lead`

### TikTok Ads

1. **Crear pixel** en TikTok Ads Manager → Assets → Events
2. **Instalar pixel** similar a Meta (script en head)
3. **Configurar eventos**: `Contact` como conversión principal
4. **En la campaña**: Optimizar por evento `Contact`

---

## 6. Funnel de futuros funnels

Cuando crees un nuevo funnel, asegúrate de que incluya:

### Checklist de tracking mínimo

- [ ] GTM container cargado (usar el mismo: GTM-KQDH5BXV)
- [ ] Meta Pixel inicializado con `PageView`
- [ ] TikTok Pixel inicializado con `PageView`
- [ ] Cada sección tiene `data-section="funnel-{nombre-seccion}"`
- [ ] Cada CTA de WhatsApp tiene `data-event="funnel_whatsapp_click"` y `data-location="{seccion}"`
- [ ] La página de gracias dispara eventos de conversión para cada plataforma
- [ ] Los links de los ads usan UTM parameters consistentes
- [ ] Las env vars de pixels están configuradas en producción

### Eventos de conversión mapeados

| Acción del usuario | dataLayer | Meta | TikTok | GA4 |
|-------------------|-----------|------|--------|-----|
| Llega al funnel | — | PageView | PageView | page_view |
| Ve la oferta | funnel_section_view | ViewContent | ViewContent | view_item |
| Clic en WhatsApp | funnel_whatsapp_click | Lead | Contact | generate_lead |
| Llega a /gracias | funnel_thank_you | Lead | SubmitForm | generate_lead |

---

## 7. Dashboard de funnels

### Métricas para revisar diariamente durante campaña activa

1. **Gasto del día** vs **leads del día** = CPL del día
2. **Tasa de conversión del funnel** (WhatsApp clicks / sesiones)
3. **Frecuencia del ad** (Meta) — si >3, el público se está cansando
4. **CTR del ad** — si cae, cambiar creative

### Métricas para revisar semanalmente

1. **CPL por plataforma** (Meta vs Google vs TikTok)
2. **ROAS por campaña**
3. **Funnel drop-off** — qué sección pierde más gente
4. **Tasa de cierre** — leads → reservas confirmadas
5. **CTA performance** — cuál de los CTAs del funnel convierte más

### Métricas para revisar mensualmente

1. **CAC (Customer Acquisition Cost)** = gasto total / clientes cerrados
2. **LTV vs CAC** — si CAC > LTV, las campañas no son rentables
3. **Best performing audience** — qué segmento convierte mejor
4. **Creative fatigue** — qué ads necesitan rotación
