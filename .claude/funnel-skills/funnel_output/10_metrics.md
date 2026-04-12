# Métricas y Optimización — Funnel de Eventos Especiales

> Adaptado a un funnel sin website: Instagram/Facebook → WhatsApp → Reserva con anticipo. Las herramientas de medición son Meta Ads Manager, Google Ads, WhatsApp Business e Instagram Insights.

---

## 1. KPIs por etapa del funnel

### TOFU — Tráfico y descubrimiento

#### Alcance orgánico (Instagram)

| Métrica | Cómo medir | Benchmark | Alarma | Éxito |
|---------|-----------|-----------|--------|-------|
| Alcance por post | Instagram Insights | 500-2,000 | <200 | >3,000 |
| Alcance por Reel | Instagram Insights | 1,000-5,000 | <500 | >10,000 |
| Tasa de alcance (alcance/seguidores) | Insights | 20-40% | <10% | >50% |
| Crecimiento de seguidores/semana | Insights | 10-30 | <5 | >50 |
| Visitas al perfil/semana | Insights | 50-200 | <30 | >300 |

#### Tráfico pagado (Meta Ads)

| Métrica | Cómo medir | Benchmark | Alarma | Éxito |
|---------|-----------|-----------|--------|-------|
| CTR (click-through rate) | Meta Ads Manager | 1-3% | <0.8% | >4% |
| CPC (costo por click) | Meta Ads Manager | $300-$800 COP | >$1,500 | <$200 |
| CPM (costo por mil) | Meta Ads Manager | $5,000-$15,000 COP | >$25,000 | <$5,000 |
| Frecuencia | Meta Ads Manager | 1.5-3.0 | >4.0 | 1.5-2.5 |
| Video views (50%+) | Meta Ads Manager | 15-30% de alcance | <10% | >40% |

#### Tráfico pagado (Google Ads)

| Métrica | Cómo medir | Benchmark | Alarma | Éxito |
|---------|-----------|-----------|--------|-------|
| CTR search | Google Ads | 3-8% | <2% | >10% |
| CPC | Google Ads | $500-$1,500 COP | >$2,500 | <$500 |
| Quality Score | Google Ads | 6-8 | <5 | >8 |
| Impression share | Google Ads | 40-70% | <20% | >80% |

---

### MOFU — Interés y conversación

| Métrica | Cómo medir | Benchmark | Alarma | Éxito |
|---------|-----------|-----------|--------|-------|
| Clicks en link de WhatsApp (bio) | Instagram Insights | 10-30/semana | <5 | >50 |
| Mensajes nuevos en WhatsApp/semana | WhatsApp Business stats | 5-15 | <3 | >20 |
| Costo por mensaje (ads) | Meta Ads Manager | $1,000-$3,000 COP | >$5,000 | <$1,000 |
| Tasa de respuesta (respondidos/recibidos) | Manual o WA Business | 90%+ | <80% | 100% |
| Tiempo de primera respuesta | Manual | <1 hora | >4 horas | <30 min |
| Tasa de conversación continuada | Manual | 50-70% | <30% | >80% |

**Nota:** "Conversación continuada" = el prospecto envió 2+ mensajes después del primero (señal de interés real).

---

### BOFU — Conversión y reserva

| Métrica | Cómo medir | Benchmark | Alarma | Éxito |
|---------|-----------|-----------|--------|-------|
| Tasa de conversión WhatsApp→Reserva | Manual (registro) | 15-30% | <10% | >35% |
| Tiempo promedio decisión (1er mensaje→anticipo) | Manual | 3-7 días | >14 días | <3 días |
| Ticket promedio por evento | Registro de ventas | $400K-$500K COP | <$300K | >$600K |
| # de eventos reservados/mes | Registro | 4-6 | <2 | >8 |
| Tasa de cancelación | Registro | <10% | >20% | <5% |
| Tasa de upgrade de paquete | Registro | 15-25% | <5% | >30% |

---

### Negocio — Métricas globales

| Métrica | Cómo medir | Benchmark | Alarma | Éxito |
|---------|-----------|-----------|--------|-------|
| Ingreso mensual por eventos | Registro | $1.5M-$3M COP | <$1M | >$4M |
| CAC (costo adquisición cliente) | Gasto ads ÷ eventos | $50K-$150K COP | >$200K | <$50K |
| ROAS (retorno sobre gasto en ads) | Ingresos ÷ gasto ads | 3-5x | <2x | >6x |
| LTV (valor de vida del cliente) | Ticket promedio × frecuencia | $500K-$1M COP | - | >$1.5M |
| LTV:CAC ratio | LTV ÷ CAC | >3:1 | <2:1 | >5:1 |
| Tasa de referidos | Registros de referidos | 10-20% | <5% | >25% |
| NPS / Satisfacción | Post-evento WhatsApp | 8-9/10 | <7 | >9 |
| Tasa de reviews en Google | # reviews ÷ # eventos | 30-50% | <20% | >60% |

---

## 2. Árbol de diagnóstico — "¿Dónde está el problema?"

```
¿El funnel no está generando reservas?
│
├── ¿Hay tráfico suficiente? (alcance + visitas al perfil)
│   ├── NO → Problema de TRÁFICO
│   │   ├── Orgánico bajo → Revisar: frecuencia de posts, calidad de Reels,
│   │   │                   hashtags, horarios de publicación
│   │   └── Ads bajo → Revisar: presupuesto, segmentación, creativos,
│   │                  frecuencia de anuncios
│   │
│   └── SÍ → ¿Están llegando mensajes a WhatsApp?
│       │
│       ├── NO → Problema de CTA / CONVERSIÓN A CHAT
│       │   ├── Revisar: link en bio funciona?
│       │   ├── Revisar: CTA en ads claro? (Send WhatsApp Message)
│       │   ├── Revisar: copy del ad genera urgencia de escribir?
│       │   └── Revisar: destacados de Instagram son claros?
│       │
│       └── SÍ → ¿Se están convirtiendo en reservas?
│           │
│           ├── NO → Problema de CIERRE EN WHATSAPP
│           │   ├── Tiempo de respuesta >1 hora → Responder más rápido
│           │   ├── Respuestas vagas sin precios → Usar respuestas rápidas con paquetes
│           │   ├── No responde objeciones → Usar mapa de objeciones (07)
│           │   ├── No genera urgencia → Mencionar fechas limitadas
│           │   └── No ofrece visita previa → Activar downsell "ven a conocer"
│           │
│           └── SÍ → Problema de VOLUMEN
│               ├── Necesita más tráfico → Aumentar presupuesto de ads
│               ├── Necesita mejor conversión → Optimizar creativos
│               └── Necesita más canales → Activar Google Ads, TikTok
```

---

## 3. Plan de A/B testing

### Prioridad 1 — Alto impacto (primeras 4 semanas)

| Test | Elemento | Variante A | Variante B | Duración | Muestra mín. |
|------|----------|-----------|-----------|----------|-------------|
| 1 | Ángulo de ad | Dolor (Ángulo 1) | Aspiración (Ángulo 2) | 2 semanas | 1,000 alcance c/u |
| 2 | Hook de video | "¿Nada te convence?" | "La fiesta que no van a olvidar" | 2 semanas | 500 views c/u |
| 3 | CTA del ad | "Escríbenos por WhatsApp" | "Reserva tu fecha" | 2 semanas | 1,000 alcance c/u |
| 4 | Primera respuesta WA | Paquetes inmediato | Pregunta "¿qué celebras?" primero | 2 semanas | 20 conversaciones c/u |

### Prioridad 2 — Optimización (semanas 5-8)

| Test | Elemento | Variante A | Variante B | Duración | Muestra mín. |
|------|----------|-----------|-----------|----------|-------------|
| 5 | Formato de ad | Imagen estática | Video 15-20s | 2 semanas | 1,000 alcance c/u |
| 6 | Segmentación | Solo mujeres 28-45 | Todos 25-50 | 2 semanas | 1,000 alcance c/u |
| 7 | Horario de ads | 8pm-10pm | Todo el día | 1 semana | 1,000 alcance c/u |
| 8 | Presentación de precio | 3 paquetes | "Desde $300K" sin paquetes | 2 semanas | 20 conversaciones c/u |

### Prioridad 3 — Refinamiento (semanas 9-12)

| Test | Elemento | Variante A | Variante B | Duración | Muestra mín. |
|------|----------|-----------|-----------|----------|-------------|
| 9 | Story de urgencia | Disponibilidad semanal | Countdown a fecha | 2 semanas | 500 views c/u |
| 10 | Garantía | Solo clima | Clima + visita primero | 2 semanas | 20 conversaciones c/u |
| 11 | Seguimiento post-WA | Mensaje día siguiente | Sin seguimiento | 2 semanas | 15 leads c/u |
| 12 | Incentivo referidos | Almuerzo gratis | Descuento en evento | 1 mes | 10 referidos c/u |

**Regla de oro:** Un solo test por canal a la vez. Nunca cambiar 2 variables simultáneamente.

---

## 4. Setup de tracking recomendado

### Instagram Business (ya disponible)

**Métricas a revisar semanalmente:**
- [ ] Alcance total (posts + stories + reels)
- [ ] Visitas al perfil
- [ ] Clicks en link de bio (WhatsApp)
- [ ] Mejores posts por alcance y engagement
- [ ] Crecimiento de seguidores

### Meta Ads Manager

**Eventos a monitorear:**
- [ ] Mensajes iniciados (objetivo principal)
- [ ] CTR por anuncio
- [ ] CPC y CPM por audiencia
- [ ] Frecuencia (no pasar de 3-4)
- [ ] Desglose por edad, género, ubicación

**Columnas personalizadas recomendadas:**
Resultados | Costo por resultado | CTR | CPC | Frecuencia | Alcance | Video views 50%

### Google Ads (cuando se active)

**Métricas clave:**
- [ ] Clicks → llamadas o clicks en WhatsApp
- [ ] CTR por keyword
- [ ] Quality Score por keyword
- [ ] Search impression share

### WhatsApp Business

**Registro manual semanal (en Excel o Google Sheets):**

| Semana | Mensajes nuevos | Respondidos <1h | Pidieron precio | Reservaron | Tasa conversión |
|--------|----------------|----------------|----------------|-----------|----------------|
| Sem 1 | | | | | |
| Sem 2 | | | | | |

### Registro de eventos (Excel/Google Sheets)

| Fecha | Tipo evento | # personas | Paquete | Ingreso | Fuente (cómo nos encontró) | Review? | Referido? |
|-------|------------|-----------|---------|---------|---------------------------|---------|----------|
| | | | | | | | |

---

## 5. Dashboard semanal simplificado

> Para revisar cada lunes en 5 minutos. No necesita herramienta compleja — basta con una hoja de Excel o Google Sheets.

```
📊 DASHBOARD SEMANAL — Eventos Laguna Escondida

Semana: [fecha inicio] — [fecha fin]

TRÁFICO
├── Alcance Instagram: _____ (meta: >2,000)
├── Visitas al perfil: _____ (meta: >100)
├── Clicks WhatsApp (bio): _____ (meta: >15)
└── Gasto en ads: $_____ COP

CONVERSACIÓN
├── Mensajes nuevos WhatsApp: _____ (meta: >10)
├── Respondidos en <1 hora: _____% (meta: >90%)
├── Costo por mensaje (si ads): $_____ COP (meta: <$3,000)
└── Pidieron precio/paquetes: _____

CONVERSIÓN
├── Eventos reservados esta semana: _____ (meta: >1)
├── Ingreso por reservas: $_____ COP
├── Ticket promedio: $_____ COP (meta: >$400K)
└── ROAS: ___x (meta: >3x)

POST-VENTA
├── Reviews Google obtenidas: _____
├── Testimonios recopilados: _____
└── Referidos recibidos: _____

ACCIÓN PRINCIPAL ESTA SEMANA:
→ [escribir la 1 cosa más importante a mejorar]
```

---

## 6. Metas mensuales (primeros 3 meses)

### Mes 1 — Activación

| Meta | Target | Cómo medir |
|------|--------|-----------|
| Configurar Instagram bio + 5 destacados | Completado | Checklist |
| Configurar respuestas rápidas WhatsApp | Completado | Checklist |
| Publicar 3 Reels/semana | 12 Reels | Instagram Insights |
| Lanzar primer ad (Ángulo 1 o 2) | Activo | Meta Ads Manager |
| Recibir 20+ mensajes de WhatsApp | 20 | Registro |
| Cerrar 2-3 eventos | 2-3 | Registro |
| Recopilar 3 testimonios reales | 3 | WhatsApp |

### Mes 2 — Optimización

| Meta | Target | Cómo medir |
|------|--------|-----------|
| Completar A/B tests #1-#4 | 4 tests | Meta Ads Manager |
| Bajar costo por mensaje a <$2,000 | <$2,000 COP | Meta Ads Manager |
| Cerrar 4-6 eventos | 4-6 | Registro |
| Ingreso por eventos >$2M COP | >$2M | Registro |
| Obtener 5+ reviews nuevas en Google | 5 | Google Maps |
| Activar programa de referidos | Activo | Registro |

### Mes 3 — Escala

| Meta | Target | Cómo medir |
|------|--------|-----------|
| Cerrar 6-8 eventos | 6-8 | Registro |
| Ingreso por eventos >$3M COP | >$3M | Registro |
| ROAS >4x | >4x | Ads Manager + registro |
| 30%+ de eventos vienen de referidos u orgánico | 30% | Registro |
| Caso de estudio real publicado | 1 | Instagram |
| Evaluar activar Google Ads | Decisión | Análisis |

---

## Resumen de implementación

| Acción | Prioridad |
|--------|-----------|
| Crear hoja de Excel con registro de WhatsApp + eventos | 🔴 Inmediata |
| Configurar columnas personalizadas en Meta Ads Manager | 🔴 Al lanzar primer ad |
| Revisar dashboard semanal cada lunes (5 min) | 🔴 Recurrente |
| Ejecutar A/B tests en orden de prioridad | 🟡 Semana 2 en adelante |
| Crear registro de fuente de clientes ("¿cómo nos encontraste?") | 🟡 Inmediata |
| Evaluar Google Ads después del mes 2 | 🟢 Mes 3 |
