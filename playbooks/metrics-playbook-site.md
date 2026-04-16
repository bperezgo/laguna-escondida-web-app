# Playbook de Métricas — Site, Experiencias y Contenido

## Visión general

Este playbook cubre las métricas que necesitas monitorear para las páginas del sitio principal: home, páginas de experiencias (restaurante, pesca deportiva, eventos), menú, y páginas de contenido/blog. El objetivo es saber si cada página está cumpliendo su función y dónde optimizar.

---

## 1. Métricas del Home (`/`)

### Métricas de adquisición (¿llegan personas?)

| Métrica | Qué mide | Dónde verla | Meta orientativa |
|---------|----------|-------------|------------------|
| Sesiones totales | Volumen de tráfico | GA4 → Reports → Acquisition | Crecimiento mes a mes |
| Usuarios nuevos vs recurrentes | Alcance vs fidelización | GA4 → Reports → Retention | 70/30 nuevos/recurrentes al inicio |
| Fuente/medio | De dónde vienen | GA4 → Acquisition → Traffic acquisition | Diversificación de fuentes |
| Tasa de rebote | % que se va sin interactuar | GA4 → Reports → Engagement | < 60% |
| Duración media de sesión | Engagement general | GA4 → Reports → Engagement | > 1:30 min |

### Métricas de comportamiento (¿qué hacen?)

| Métrica | Evento actual | Qué te dice |
|---------|--------------|-------------|
| Scroll depth por sección | `section_view` + `section_name` | Hasta dónde leen — si "reseñas" tiene 20% de views vs "hero" 100%, la gente no llega abajo |
| Clics en WhatsApp por ubicación | `whatsapp_click` + `event_location` | Qué CTA convierte más (hero, navbar, footer, floating) |
| Clics en mapa | `maps_click` + `event_location` | Intención de visitar físicamente |
| Clics en Instagram | `instagram_click` | Interés en redes sociales |
| Clics en TikTok | `tiktok_click` | Interés en redes sociales |
| Navegación a experiencias | Page views de `/experiencias/*` | Qué experiencia genera más interés |

### Métricas de conversión (¿actúan?)

| Conversión | Evento | Prioridad |
|-----------|--------|-----------|
| WhatsApp click (cualquier ubicación) | `whatsapp_click` — key event en GA4 | **Crítica** |
| Tasa de conversión del home | WhatsApp clicks / sesiones del home | **Crítica** |
| Maps click | `maps_click` — secundaria | Media |

### Qué NO existe hoy y necesitas agregar

1. **UTM tracking**: Cuando empieces con SEO y ads, necesitas que las URLs tengan UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`). GA4 los lee automáticamente pero necesitas disciplina en cómo los generas.
2. **Scroll depth granular**: El `section_view` actual solo dispara una vez por sección. Considera agregar un evento de `page_scroll_depth` al 25%, 50%, 75%, 100% (GTM tiene un trigger nativo para esto).

---

## 2. Métricas de Experiencias

### Restaurante (`/experiencias/restaurante`)

| Métrica | Evento/Fuente | Interpretación |
|---------|--------------|----------------|
| Page views | GA4 page_view | Demanda por la experiencia |
| Secciones vistas | `section_view`: restaurante-hero, restaurante-concepto, restaurante-platos, restaurante-pesca-almuerzo, restaurante-espacio, restaurante-info, restaurante-resenas, restaurante-cta-final | Qué secciones enganchan y cuáles se saltan |
| WhatsApp clicks | `whatsapp_click` con location: restaurante-hero, restaurante-info, restaurante-cta-final, restaurante-floating | Qué CTA del restaurante convierte |
| Maps clicks | `maps_click` con location: restaurante-info, restaurante-resenas | Intención de visita |
| Tasa de conversión | WhatsApp clicks / page views de esta página | **Benchmark: > 3%** |

**Métricas clave a responder:**
- ¿Cuántas personas ven la sección de platos vs cuántas llegan al CTA final?
- ¿El botón flotante de WhatsApp convierte más que los CTAs en sección?

### Pesca Deportiva (`/experiencias/pesca-deportiva`)

| Métrica | Evento/Fuente | Interpretación |
|---------|--------------|----------------|
| Page views | GA4 page_view | Demanda por pesca |
| Secciones vistas | `section_view`: pesca-hero, pesca-diferenciadores, pesca-especies, pesca-como-funciona, pesca-incluye, pesca-para-quien, pesca-consejos, pesca-cta-final | Funnel de información |
| WhatsApp clicks | `whatsapp_click` con location: pesca-hero, pesca-incluye, pesca-cta-final, floating | Intención de reserva |
| Tasa de conversión | WhatsApp clicks / page views | **Benchmark: > 3%** |

**Métricas clave a responder:**
- ¿La gente lee los consejos antes de hacer clic en WhatsApp? (si pesca-consejos tiene alto `section_view` y el CTA final convierte, el contenido está ayudando)
- ¿Cuál es la tasa de rebote de esta página vs las otras experiencias?

### Eventos (`/experiencias/eventos`)

| Métrica | Evento/Fuente | Interpretación |
|---------|--------------|----------------|
| Page views | GA4 page_view | Demanda por eventos |
| Secciones vistas | `section_view`: eventos-hero, eventos-tipos, eventos-espacio, eventos-como-funciona, eventos-testimonios, eventos-faq, eventos-cta | Engagement con la propuesta |
| Ver paquetes | `eventos_ver_paquetes` con location: hero, testimonios, cta-final | Interés en precios — **métrica de intención fuerte** |
| WhatsApp clicks | `whatsapp_click` con location: eventos-hero, faq, eventos-cta | Conversión directa |
| Tasa de conversión | WhatsApp clicks / page views | **Benchmark: > 5%** (tráfico más calificado) |

**Métricas clave a responder:**
- ¿Cuántos ven paquetes (`eventos_ver_paquetes`) vs cuántos hacen clic en WhatsApp? Si hay gap, el pricing o la oferta no convence.
- ¿Los testimonios ayudan? Comparar `section_view` de testimonios con conversión del CTA que está justo debajo.

---

## 3. Métricas de Contenido / Blog

### Páginas de contenido (`/contenido`, `/contenido/[slug]`, `/contenido/categoria/[slug]`)

| Métrica | Fuente | Interpretación |
|---------|--------|----------------|
| Page views por artículo | GA4 page_view | Qué temas interesan más |
| Sesiones orgánicas | GA4 → Acquisition → filtrar por organic | Impacto del SEO — **la métrica más importante del blog** |
| Tiempo en página | GA4 engagement_time | Si leen o solo escanean |
| Scroll depth | Agregar `section_view` o scroll tracking | Si leen el artículo completo |
| Navegación al home/experiencias | Page path explorations | Si el blog genera tráfico hacia páginas de conversión |
| WhatsApp clicks desde blog | `whatsapp_click` (navbar, footer, floating) | Blog → conversión directa |
| Tasa de conversión del blog | WhatsApp clicks / sesiones desde blog | Si el contenido atrae público que convierte |

### Métricas SEO específicas

| Métrica | Fuente | Interpretación |
|---------|--------|----------------|
| Impresiones en búsqueda | Google Search Console | Visibilidad en Google |
| CTR en búsqueda | Google Search Console | Si los títulos y descriptions atraen clicks |
| Posición promedio | Google Search Console | Ranking por keyword |
| Keywords que posicionan | Google Search Console | Qué busca la gente que te encuentra |
| Páginas indexadas | Google Search Console → Coverage | Si Google está viendo tu contenido |
| Core Web Vitals | Google Search Console → Experience | Performance que afecta ranking |

**Métricas clave a responder:**
- ¿Qué artículos traen tráfico orgánico y cuáles no?
- ¿Los lectores del blog navegan a las experiencias o se van?
- ¿Cuál es la tasa de conversión del tráfico orgánico vs redes sociales?

---

## 4. Métricas del Menú (`/menu`, `/menu/carta`)

| Métrica | Evento/Fuente | Interpretación |
|---------|--------------|----------------|
| Page views | GA4 page_view | Demanda por ver el menú |
| Secciones vistas | `section_view`: menu-{categoria} | Qué categorías interesan más |
| WhatsApp click | `whatsapp_click` con location: menu-cta | Intención de reservar después de ver el menú |
| Fuente de tráfico | GA4 acquisition | ¿Llegan por QR (directo), Google, o redes? |
| Tasa de rebote | GA4 engagement | Si solo ven el menú o navegan al resto del sitio |

**Nota especial:** La página `/menu/carta` no tiene navbar ni footer — está diseñada para QR. Diferencia el tráfico de QR (directo) del orgánico.

---

## 5. Dashboard recomendado en GA4

### Exploración personalizada: "Laguna Escondida — Site Performance"

**Dimensiones:**
- Page path
- Event name
- Event location (parámetro personalizado)
- Section name (parámetro personalizado)
- Source/medium

**Métricas:**
- Event count
- Sessions
- Engaged sessions
- Engagement rate
- Key events (conversiones)

### Reportes clave para revisar semanalmente

1. **Conversiones por página**: ¿Qué página genera más WhatsApp clicks?
2. **Funnel de secciones por experiencia**: Para cada experiencia, ¿hasta dónde leen?
3. **SEO performance**: Tráfico orgánico por artículo (conectar con Search Console)
4. **Fuentes de tráfico**: ¿De dónde viene el tráfico que convierte?

---

## 6. Eventos que necesitas agregar al código

### Eventos que ya existen ✅

- `whatsapp_click` + `event_location` — en todas las páginas
- `maps_click` + `event_location` — home, restaurante, footer
- `instagram_click` — footer
- `tiktok_click` — footer
- `section_view` + `section_name` — todas las secciones con `data-section`
- `eventos_ver_paquetes` + `event_location` — página de eventos

### Eventos que necesitas agregar ❌

| Evento | Dónde | Propósito |
|--------|-------|-----------|
| `phone_call_click` | Si agregas link tel: | Medir intención de llamar |
| `menu_category_view` | Menú, por categoría | Qué platos interesan más |
| `blog_article_read` | Blog, al scroll 75% | Si leen los artículos completos |
| `experience_card_click` | Home, sección experiencias | Qué experiencia atrae más desde el home |
| `outbound_link_click` | Cualquier link externo | Rastrear salidas del sitio |

---

## 7. Configuración pendiente en GTM

Referirse al archivo `plan/analytics-setup-guide.md` que ya tiene los pasos detallados para:
1. Crear variables DLV en GTM
2. Crear triggers para eventos personalizados
3. Crear tag GA4 para eventos personalizados
4. Marcar key events en GA4

**Estado**: Los pendientes 1-5 de ese documento siguen vigentes.
