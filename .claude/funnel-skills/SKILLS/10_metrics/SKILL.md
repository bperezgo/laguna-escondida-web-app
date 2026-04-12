---
name: 10_metrics
description: "Defines the funnel measurement system: KPIs by stage, reference benchmarks, optimization hypotheses, and A/B test plan. Use when the user wants to know what to measure, how to interpret funnel data, what to improve first, or says 'what metrics should I track', 'my funnel isn't converting, what do I check', 'help me optimize the funnel with data', 'build the metrics dashboard'."
---

# Skill: Funnel Metrics and Optimization (10_metrics)

Defines the complete measurement system and data-driven optimization plan.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

```
business_context.md
funnel_product.md
funnel_output/  ← read all outputs that exist
```

## Step 2 — KPI dashboard by stage

For each funnel stage, define:

```markdown
## Stage: [name]
**Main metric:** [the most important one]
**How to measure it:** [GA4 / ads platform / email tool]
**Reference benchmark:** [normal industry range]
**Alarm threshold:** [when there's a problem]
**Success threshold:** [when it's doing well]
```

### Minimum KPIs to cover

**Traffic and acquisition (TOFU)**
- Ad CTR (Google: 3–8% normal / Meta: 1–3%)
- CPC (cost per click)
- CPL (cost per lead)
- Landing → lead conversion rate (normal: 20–40% cold traffic, 40–60% warm)

**Nurturing (MOFU)**
- Email open rate (benchmark: 25–40%)
- Email click rate (benchmark: 2–5%)
- Unsubscribe rate (alarm if >0.5%)
- Engagement score (opens + clicks combined)

**Conversion (BOFU)**
- Sales page conversion rate (benchmark: 1–3% cold traffic, 5–10% warm)
- Checkout abandonment rate
- ROAS (return on ad spend — minimum 2× to be viable)
- CAC (customer acquisition cost)

**Business**
- LTV / CAC ratio (must be >3 to be sustainable)
- Repeat purchase rate
- NPS / satisfaction

## Step 3 — Broken funnel diagnosis tree

Generate a diagnosis tree:

```
Where is the problem?

Low traffic → check: ad budget, targeting, keywords
Low ad CTR → check: creatives, headlines, audiences
Landing doesn't convert → check: headline, offer, page speed, CTA
Leads don't open emails → check: subject lines, sender name, frequency
Leads don't buy → check: objections, price, social proof, urgency
High checkout abandonment → check: technical friction, payment methods, guarantee
```

## Step 4 — A/B test plan

Prioritize tests by potential impact:

| Test | Element | Variant A | Variant B | Duration | Minimum sample size |
|------|---------|-----------|-----------|----------|---------------------|
| 1 | Landing headline | [current] | [alternative] | 2 weeks | 500 visitors |
| 2 | CTA button | [current] | [alternative] | 2 weeks | 500 visitors |
| ... | | | | | |

**Golden rule:** One test per page at a time. Never change two things simultaneously.

## Step 5 — Recommended tracking setup

List the tools and events to configure:
- GA4: conversion events to set up
- Google Tag Manager: required triggers
- Search Console: what to monitor
- Email platform: metrics to export

## Step 6 — Save

```
funnel_output/10_metrics.md
```
