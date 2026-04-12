# Funnel Skills System

Sistema modular de skills para construir funnels de venta completos con Claude Code. Cada skill hace una cosa específica y todas comparten el mismo contexto de negocio.

---

## Cómo usar este sistema

### Paso 1 — Configura el contexto del negocio

Llena estos dos archivos antes de correr cualquier skill:

- **`business_context.md`** → Información permanente del negocio (audiencia, tono, competidores, métricas)
- **`funnel_product.md`** → Qué se vende en este funnel específico (puedes tener múltiples)

> La calidad del output de cada skill depende directamente de qué tan bien llenaste estos archivos. Dedica tiempo aquí.

### Paso 2 — Corre el orquestador

Abre Claude Code y di:
> "Revisa el estado del funnel y dime qué skill debo correr primero"

La skill `00_orchestrator` leerá el contexto y te dirá exactamente qué hacer.

### Paso 3 — Corre las skills en orden

El orden recomendado es:

```
01_avatar → 02_headline → 03_landing → 04_emails → 05_offer
                                    ↓
              06_ads_copy, 07_objeciones, 08_social_proof
                                    ↓
                        09_upsell, 10_metrics
```

Cada skill guarda su output en `funnel_output/`. Las skills posteriores leen los outputs de las anteriores para generar contenido más coherente.

### Paso 4 — Itera

Puedes correr la misma skill varias veces con instrucciones adicionales:
> "Corre 02_headline pero enfocado en el segmento de madres emprendedoras"
> "Actualiza 04_emails — el cliente quiere un tono más formal"

---

## Estructura del proyecto

```
mi-cliente/
├── business_context.md          ← llena esto primero
├── funnel_product.md            ← uno por funnel/campaña
│
├── SKILLS/
│   ├── 00_orchestrator/SKILL.md
│   ├── 01_avatar/SKILL.md
│   ├── 02_headline/SKILL.md
│   ├── 03_landing/SKILL.md
│   ├── 04_emails/SKILL.md
│   ├── 05_offer/SKILL.md
│   ├── 06_ads_copy/SKILL.md
│   ├── 07_objeciones/SKILL.md
│   ├── 08_social_proof/SKILL.md
│   ├── 09_upsell/SKILL.md
│   └── 10_metrics/SKILL.md
│
└── funnel_output/               ← aquí van los outputs generados
    ├── 01_avatar.md
    ├── 02_headline.md
    └── ...
```

---

## Skills disponibles

| Skill | Qué hace | Requiere |
|-------|----------|----------|
| `00_orchestrator` | Estado del funnel + recomendación de siguiente paso | — |
| `01_avatar` | Perfil profundo del cliente ideal (ICP) | contexto |
| `02_headline` | Headlines, propuesta de valor, hooks | 01_avatar |
| `03_landing` | Estructura completa y copy de landing page | 01, 02 |
| `04_emails` | Secuencia de nurturing (8–12 emails) | 01_avatar |
| `05_offer` | Stack de valor, precio, garantía, urgencia | 01, 03 |
| `06_ads_copy` | Copy para Google Ads y Meta Ads | 01, 02 |
| `07_objeciones` | Mapa de objeciones + respuestas por canal | 01_avatar |
| `08_social_proof` | Estructura de testimonios y credibilidad | 01_avatar |
| `09_upsell` | Post-venta, upsells, retención, referidos | 01, 05 |
| `10_metrics` | KPIs, diagnóstico, plan de A/B tests | todos |

---

## Tips de uso

- **Un funnel por cliente:** Copia toda la carpeta para cada cliente nuevo. Cambia solo `business_context.md` y `funnel_product.md`.
- **Múltiples productos:** Mantén el mismo `business_context.md` y crea un `funnel_product_nombreproducto.md` por cada producto.
- **Refinamiento:** Cuando una skill produce algo bueno pero no perfecto, dile a Claude: "Mejora la sección X de 03_landing enfocándote en Y".
- **Combinar outputs:** Al final puedes pedirle al orquestador que compile todos los outputs en un solo documento de brief completo del funnel.
