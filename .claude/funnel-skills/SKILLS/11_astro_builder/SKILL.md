---
name: 11_astro_builder
description: "Generates a complete, deployable Astro + TypeScript + Tailwind funnel project from the funnel_output markdown files. Use when the user wants to turn their funnel copy into a real website, scaffold the Astro project, or says 'build the funnel', 'generate the Astro project', 'make it deployable', 'build the landing page'. Requires 01_avatar, 02_headline, and 03_landing."
---

# Skill: Astro Funnel Builder (11_astro_builder)

Turns all `funnel_output/*.md` files into a complete, standalone Astro project
ready to run locally and deploy to Vercel or Netlify in one command.

## Step 1 — Read all context

Read these files before doing anything else:

```
business_context.md
funnel_product.md
funnel_output/01_avatar.md       ← required
funnel_output/02_headline.md     ← required
funnel_output/03_landing.md      ← required
funnel_output/05_offer.md        ← if exists
funnel_output/07_objeciones.md   ← if exists
funnel_output/08_social_proof.md ← if exists
```

If `01_avatar`, `02_headline`, or `03_landing` are missing, stop and tell the
user which skills to run first.

Also read the reference files in this skill:
- `references/design-system.md` → token generation rules
- `references/component-patterns.md` → conversion-focused component patterns
- `references/astro-conventions.md` → project structure and conventions

## Step 2 — Extract design tokens from business context

From `business_context.md`, infer:

**Industry category** (determines default palette):
- Finance / Legal / B2B SaaS → trust palette (deep blue, slate, white)
- Health / Wellness / Coaching → energy palette (green, warm white, amber)
- Education / Courses → clarity palette (indigo, light gray, orange accent)
- E-commerce / Products → bold palette (black, white, strong accent)
- Creative / Agency → expressive palette (custom — use brand description)

**Tone** → maps to font pairing:
- Professional / Corporate → Inter + Inter (single family, weight contrast)
- Warm / Personal → Plus Jakarta Sans + Lora (sans headlines, serif body)
- Bold / Direct → Sora + Inter
- Creative → Outfit + Inter

Generate `src/styles/tokens.css` with CSS custom properties.
See `references/design-system.md` for the full token schema.

## Step 3 — Map funnel sections to components

Read `funnel_output/03_landing.md` and identify each section.
Map each to a component using this table:

| Section type          | Component file             | Template |
|-----------------------|---------------------------|----------|
| Hero / above the fold | `Hero.astro`              | hero     |
| Problem / pain        | `Problem.astro`           | problem  |
| Solution intro        | `Solution.astro`          | solution |
| How it works          | `HowItWorks.astro`        | steps    |
| Offer / what's inside | `Offer.astro`             | offer    |
| For who               | `ForWho.astro`            | forwho   |
| Social proof          | `SocialProof.astro`       | proof    |
| About / authority     | `About.astro`             | about    |
| FAQ                   | `FAQ.astro`               | faq      |
| Guarantee             | `Guarantee.astro`         | guarantee|
| Final CTA             | `FinalCTA.astro`          | cta      |
| Lead capture form     | `LeadForm.astro`          | form     |

Read `references/component-patterns.md` for each component's HTML structure
and Tailwind class patterns before generating code.

## Step 4 — Scaffold the project

Generate the following file tree. Use `scripts/scaffold.sh` as reference for
the exact commands, or generate the files directly.

```
funnel-[client-slug]/
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── .env.example
├── vercel.json
├── netlify.toml
├── README.md                    ← setup + deploy instructions
│
├── src/
│   ├── styles/
│   │   ├── tokens.css           ← generated from business context
│   │   └── global.css
│   │
│   ├── types/
│   │   └── funnel.ts            ← TypeScript types for funnel data
│   │
│   ├── data/
│   │   └── funnel.ts            ← all copy as typed TS constants
│   │
│   ├── layouts/
│   │   └── FunnelLayout.astro   ← base layout with meta, fonts, tokens
│   │
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Problem.astro
│   │   ├── Solution.astro
│   │   ├── HowItWorks.astro
│   │   ├── Offer.astro
│   │   ├── ForWho.astro
│   │   ├── SocialProof.astro
│   │   ├── About.astro
│   │   ├── FAQ.astro
│   │   ├── Guarantee.astro
│   │   ├── FinalCTA.astro
│   │   ├── LeadForm.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Badge.astro
│   │       └── SectionWrapper.astro
│   │
│   └── pages/
│       ├── index.astro          ← main landing page
│       ├── thank-you.astro      ← post-conversion page
│       └── privacy.astro        ← required for ads compliance
│
└── public/
    └── favicon.svg
```

## Step 5 — Generate the data layer first

Before writing any component, generate `src/data/funnel.ts`.
This file contains ALL copy as TypeScript constants — components import from
here, never hardcode strings inside `.astro` files.

This separation means the user can update copy by editing one file,
without touching component code.

See `references/astro-conventions.md` for the full type schema and data file pattern.

## Step 6 — Generate components

Generate each component using:
1. The HTML/Tailwind pattern from `references/component-patterns.md`
2. Copy pulled from `src/data/funnel.ts` imports
3. Tokens from `src/styles/tokens.css` via CSS custom properties

Conversion rules that apply to ALL components:
- Every section has exactly one primary CTA (no exceptions)
- CTA button text is always a first-person benefit ("I want to start today"),
  never a generic action ("Submit", "Click here")
- Mobile-first: all layouts stack vertically on small screens
- Above-the-fold hero must load under 100ms — no heavy images, no blocking JS
- Urgency/scarcity elements only generated if explicitly present in funnel_output

## Step 7 — Generate config files

Generate production-ready configs. See `references/astro-conventions.md` for
exact content of each config file.

Key requirements:
- `astro.config.mjs`: output = 'static', sitemap integration, compress HTML
- `tailwind.config.mjs`: extend theme with token values, purge unused classes
- `vercel.json`: static output, cache headers for assets
- `netlify.toml`: publish dir, build command, redirect rules for SPA behavior

## Step 8 — Generate the README

The README must include:
1. Project overview (business name, funnel purpose)
2. Local setup (3 commands max: clone → install → dev)
3. How to update copy (point to `src/data/funnel.ts`)
4. How to update design (point to `src/styles/tokens.css`)
5. Deploy instructions for both Vercel and Netlify
6. How to connect a form provider (Resend, ConvertKit, Mailchimp)

## Step 9 — Quality checklist before finishing

Run through these before declaring the project complete:

**Correctness**
- [ ] All copy comes from `funnel_output/*.md` — no placeholder text like "Lorem ipsum"
- [ ] All TypeScript types are satisfied (no `any` types)
- [ ] All imports resolve to files that actually exist in the project

**Performance**
- [ ] No render-blocking scripts in `<head>`
- [ ] Images use `loading="lazy"` except hero image
- [ ] Fonts loaded with `display=swap`

**Conversion**
- [ ] Hero section visible without scrolling on mobile (max 100vh)
- [ ] At least 3 CTAs total across the page (hero, mid-page, final)
- [ ] FAQ uses exact objection language from `funnel_output/07_objeciones.md` if available
- [ ] Social proof section present if `funnel_output/08_social_proof.md` exists

**Deploy readiness**
- [ ] `package.json` has `build`, `dev`, and `preview` scripts
- [ ] Both `vercel.json` and `netlify.toml` are present
- [ ] `.env.example` lists all required environment variables
- [ ] `privacy.astro` page exists (required for Meta/Google Ads)

## Step 10 — Output and next steps

Tell the user:
1. Where the project was generated (`funnel-[slug]/`)
2. The 3 commands to run it locally
3. What still needs manual work (images, form provider API key, analytics ID)
4. Recommended deploy target based on their context

---

## Reference files

Read these before generating code — they contain the actual patterns and schemas:

- `references/design-system.md` → token schema, palette generation, font pairs
- `references/component-patterns.md` → HTML structure for each component type
- `references/astro-conventions.md` → config files, data layer schema, TS types
