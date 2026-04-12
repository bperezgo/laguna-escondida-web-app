# Astro Conventions Reference

Project structure conventions, config files, TypeScript types, and the data
layer schema for the funnel builder.

---

## package.json

```json
{
  "name": "funnel-[client-slug]",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev":     "astro dev",
    "build":   "astro build",
    "preview": "astro preview",
    "check":   "astro check"
  },
  "dependencies": {
    "astro": "^4.0.0"
  },
  "devDependencies": {
    "@astrojs/check":   "^0.5.0",
    "@astrojs/sitemap": "^3.0.0",
    "@types/node":      "^20.0.0",
    "tailwindcss":      "^3.4.0",
    "@astrojs/tailwind": "^5.0.0",
    "typescript":        "^5.0.0"
  }
}
```

---

## astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://your-domain.com',   // user updates this
  integrations: [
    tailwind({ applyBaseStyles: false }),  // we manage base styles ourselves
    sitemap(),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
```

---

## tailwind.config.mjs

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Mirror the CSS tokens — update both if changing fonts
        heading: ['var(--font-heading)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark:    'var(--color-primary-dark)',
          light:   'var(--color-primary-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
        },
        neutral: {
          50:  'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          500: 'var(--color-neutral-500)',
          700: 'var(--color-neutral-700)',
          900: 'var(--color-neutral-900)',
        },
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};
```

---

## tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@data":       ["src/data/funnel.ts"],
      "@components": ["src/components"],
      "@layouts":    ["src/layouts"]
    }
  }
}
```

---

## vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options",        "value": "DENY" },
        { "key": "X-XSS-Protection",       "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## netlify.toml

```toml
[build]
  command     = "npm run build"
  publish     = "dist"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## .env.example

```bash
# Form submission endpoint (Resend, ConvertKit, Mailchimp, etc.)
FORM_ENDPOINT=

# Analytics (optional)
PUBLIC_GA_MEASUREMENT_ID=
PUBLIC_META_PIXEL_ID=

# Site URL (used by sitemap)
SITE_URL=https://your-domain.com
```

---

## TypeScript types — `src/types/funnel.ts`

```typescript
// src/types/funnel.ts
// All data shapes for the funnel data layer.

export interface Stat {
  value: string;   // e.g. "1,200+"
  label: string;   // e.g. "students enrolled"
}

export interface HeroData {
  credibilityPill?:  string;
  headline:          string;
  subheadline:       string;
  ctaText:           string;
  secondaryCta?:     string;
  trustNote?:        string;   // e.g. "No credit card required"
  stats?:            Stat[];
}

export interface PainPoint {
  text: string;
}

export interface ProblemData {
  eyebrow:     string;
  headline:    string;
  intro:       string;
  painPoints:  string[];
  bridge?:     string;   // validation sentence before solution
}

export interface Step {
  title:       string;
  description: string;
  outcome?:    string;   // "→ result of completing this step"
}

export interface HowItWorksData {
  eyebrow:     string;
  headline:    string;
  subheadline: string;
  steps:       Step[];
}

export interface OfferItem {
  name:        string;
  description: string;
  value?:      number;   // perceived USD value
}

export interface OfferData {
  eyebrow:      string;
  headline:     string;
  subheadline:  string;
  items:        OfferItem[];
  totalValue?:  number;
  price:        string;   // formatted: "$297" or "$97/month"
  priceNote?:   string;   // "one-time payment, lifetime access"
  ctaText:      string;
  guarantee?:   string;
}

export interface FAQItem {
  question: string;
  answer:   string;
}

export interface FAQData {
  eyebrow:  string;
  headline: string;
  items:    FAQItem[];
}

export interface Testimonial {
  quote:  string;
  name:   string;
  role?:  string;
  result?: string;   // badge text: "Got 3 clients in 30 days"
}

export interface SocialProofData {
  eyebrow:      string;
  headline:     string;
  testimonials: Testimonial[];
}

export interface FinalCTAData {
  headline:    string;
  subheadline: string;
  ctaText:     string;
  guarantee?:  string;
}

export interface LeadFormData {
  headline:    string;
  subheadline: string;
  ctaText:     string;
  privacyNote?: string;
}

export interface FunnelData {
  meta: {
    title:       string;
    description: string;
    ogImage?:    string;
  };
  hero:         HeroData;
  problem:      ProblemData;
  howItWorks:   HowItWorksData;
  offer:        OfferData;
  faq:          FAQData;
  socialProof?: SocialProofData;
  finalCta:     FinalCTAData;
  leadForm?:    LeadFormData;
}
```

---

## Data layer — `src/data/funnel.ts`

This file is generated from `funnel_output/*.md` files.
All copy lives here. Components import from it — never hardcode strings.

```typescript
// src/data/funnel.ts
// Auto-generated from funnel_output/ by 11_astro_builder.
// To update copy: edit this file. No component code needs to change.

import type {
  HeroData, ProblemData, HowItWorksData, OfferData,
  FAQData, SocialProofData, FinalCTAData, FunnelData
} from '../types/funnel';

export const hero: HeroData = {
  credibilityPill:  '[extracted from 08_social_proof.md or business_context.md]',
  headline:         '[best headline from 02_headline.md]',
  subheadline:      '[best subheadline from 02_headline.md]',
  ctaText:          '[CTA text from 03_landing.md — first person benefit]',
  secondaryCta:     '[optional secondary CTA]',
  trustNote:        '[trust micro-copy: "No credit card required" or similar]',
  stats: [
    { value: '[number]', label: '[what it measures]' },
  ],
};

export const problem: ProblemData = {
  eyebrow:    'Does this sound familiar?',
  headline:   '[headline from problem section of 03_landing.md]',
  intro:      '[intro paragraph from problem section]',
  painPoints: [
    '[pain point 1 — first person, specific]',
    '[pain point 2]',
    '[pain point 3]',
    '[pain point 4]',
  ],
  bridge: '[validation/bridge sentence from 03_landing.md]',
};

export const howItWorks: HowItWorksData = {
  eyebrow:     'Simple. Clear. Proven.',
  headline:    '[how it works headline from 03_landing.md]',
  subheadline: '[subheadline]',
  steps: [
    {
      title:       '[Step 1 name]',
      description: '[Step 1 description]',
      outcome:     '[What the client achieves after this step]',
    },
    // ... remaining steps
  ],
};

export const offer: OfferData = {
  eyebrow:     "Here's everything you get",
  headline:    '[offer headline from 05_offer.md]',
  subheadline: '[offer subheadline]',
  items: [
    {
      name:        '[Component name]',
      description: '[Benefit in one sentence]',
      value:       000,  // perceived USD value
    },
    // ... remaining items and bonuses
  ],
  totalValue:  000,
  price:       '$[price]',
  priceNote:   '[payment terms]',
  ctaText:     '[CTA text — first person]',
  guarantee:   '[guarantee copy from 05_offer.md]',
};

export const faq: FAQData = {
  eyebrow:  'Frequently asked questions',
  headline: 'Got questions? We have answers.',
  items: [
    // Generated from 07_objeciones.md — each FAQ is a reframed objection
    {
      question: '[Objection reframed as a question]',
      answer:   '[Answer from 07_objeciones.md FAQ column]',
    },
  ],
};

export const socialProof: SocialProofData = {
  eyebrow:  'Real results from real people',
  headline: '[social proof headline from 08_social_proof.md or 03_landing.md]',
  testimonials: [
    // Generated from 08_social_proof.md
    {
      quote:  '[testimonial quote]',
      name:   '[First Last]',
      role:   '[occupation, city]',
      result: '[result badge text]',
    },
  ],
};

export const finalCta: FinalCTAData = {
  headline:    '[final CTA headline from 03_landing.md — transformation-focused]',
  subheadline: '[subheadline]',
  ctaText:     '[CTA text]',
  guarantee:   '[guarantee reminder]',
};

// Export combined object for meta tags
export const funnelData: FunnelData = {
  meta: {
    title:       '[Business name] — [headline]',
    description: '[Meta description from subheadline — 150 chars max]',
  },
  hero, problem, howItWorks, offer, faq, socialProof, finalCta,
};
```

---

## FunnelLayout.astro

```astro
---
// src/layouts/FunnelLayout.astro
import { funnelData } from '../data/funnel';

interface Props {
  title?:       string;
  description?: string;
}

const {
  title       = funnelData.meta.title,
  description = funnelData.meta.description,
} = Astro.props;

// Font URLs — update when changing font pairing in tokens.css
const fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />

  <title>{title}</title>

  <!-- Open Graph -->
  <meta property="og:title"       content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type"        content="website" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href={fontUrl} rel="stylesheet" />

  <!-- Styles -->
  <link rel="stylesheet" href="/src/styles/global.css" />
</head>
<body>
  <slot />

  <!-- Analytics (populated from .env) -->
  {import.meta.env.PUBLIC_GA_MEASUREMENT_ID && (
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.PUBLIC_GA_MEASUREMENT_ID}`}
    ></script>
    <script define:vars={{ gaId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID }}>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', gaId);
    </script>
  )}
</body>
</html>
```

---

## pages/index.astro

```astro
---
// src/pages/index.astro
import FunnelLayout from '../layouts/FunnelLayout.astro';
import Hero         from '../components/Hero.astro';
import Problem      from '../components/Problem.astro';
import Solution     from '../components/Solution.astro';
import HowItWorks   from '../components/HowItWorks.astro';
import SocialProof  from '../components/SocialProof.astro';
import Offer        from '../components/Offer.astro';
import ForWho       from '../components/ForWho.astro';
import FAQ          from '../components/FAQ.astro';
import Guarantee    from '../components/Guarantee.astro';
import FinalCTA     from '../components/FinalCTA.astro';
import { funnelData, socialProof } from '../data/funnel';
---

<FunnelLayout>
  <Hero />
  <Problem />
  <Solution />
  <HowItWorks />
  {socialProof && <SocialProof />}
  <Offer />
  <ForWho />
  <FAQ />
  <Guarantee />
  <FinalCTA />
</FunnelLayout>
```

---

## pages/thank-you.astro

```astro
---
import FunnelLayout from '../layouts/FunnelLayout.astro';
import { funnelData } from '../data/funnel';
---

<FunnelLayout
  title="You're in — next steps"
  description="Here's what happens next."
>
  <section class="min-h-screen flex items-center justify-center py-20">
    <div class="section-wrapper max-w-2xl text-center">
      <div class="text-5xl mb-6">🎉</div>
      <h1 class="text-4xl font-bold mb-4">You're in!</h1>
      <p class="text-lg mb-8" style="color: var(--color-neutral-600);">
        Check your inbox — we've sent you everything you need to get started.
      </p>
      <!-- Next steps or upsell can be added here from 09_upsell.md -->
    </div>
  </section>
</FunnelLayout>
```

---

## Naming conventions

- Components: `PascalCase.astro`
- Pages: `kebab-case.astro`
- Data / types: `camelCase.ts`
- CSS custom properties: `--color-[category]-[variant]`
- IDs on sections (for anchor links): `kebab-case` matching the component name
