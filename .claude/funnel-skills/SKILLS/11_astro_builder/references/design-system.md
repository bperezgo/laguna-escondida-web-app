# Design System Reference

Token schema, palette generation rules, and font pairings for the Astro funnel builder.

---

## Token schema — `src/styles/tokens.css`

Generate this file with all CSS custom properties. Every component uses only
these tokens — never hardcoded hex values or arbitrary Tailwind colors.

```css
/* src/styles/tokens.css */

:root {
  /* ── Brand colors ──────────────────────────────── */
  --color-primary:        [generated];   /* main CTA, key highlights */
  --color-primary-dark:   [generated];   /* CTA hover state */
  --color-primary-light:  [generated];   /* subtle backgrounds, badges */

  --color-accent:         [generated];   /* secondary highlights, badges */
  --color-accent-dark:    [generated];

  /* ── Neutral scale ─────────────────────────────── */
  --color-neutral-900:    [generated];   /* headings */
  --color-neutral-700:    [generated];   /* body text */
  --color-neutral-500:    [generated];   /* muted text, placeholders */
  --color-neutral-200:    [generated];   /* borders, dividers */
  --color-neutral-100:    [generated];   /* subtle section backgrounds */
  --color-neutral-50:     [generated];   /* page background */

  /* ── Semantic ───────────────────────────────────── */
  --color-success:        #16a34a;
  --color-warning:        #d97706;
  --color-error:          #dc2626;

  /* ── Typography ─────────────────────────────────── */
  --font-heading:  '[FontName]', sans-serif;
  --font-body:     '[FontName]', sans-serif;

  --text-xs:    0.75rem;    /* 12px — labels, badges */
  --text-sm:    0.875rem;   /* 14px — captions, fine print */
  --text-base:  1rem;       /* 16px — body */
  --text-lg:    1.125rem;   /* 18px — lead text */
  --text-xl:    1.25rem;    /* 20px — section subtitles */
  --text-2xl:   1.5rem;     /* 24px — card titles */
  --text-3xl:   1.875rem;   /* 30px — section headings */
  --text-4xl:   2.25rem;    /* 36px — major headings */
  --text-5xl:   3rem;       /* 48px — hero headline desktop */
  --text-6xl:   3.75rem;    /* 60px — hero headline large screens */

  /* ── Spacing ────────────────────────────────────── */
  --space-section:  6rem;   /* vertical padding between sections */
  --space-content:  2rem;   /* internal content padding */

  /* ── Radius ─────────────────────────────────────── */
  --radius-sm:  0.375rem;  /* 6px  — badges, chips */
  --radius-md:  0.75rem;   /* 12px — cards */
  --radius-lg:  1rem;      /* 16px — large cards */
  --radius-xl:  1.5rem;    /* 24px — hero sections */
  --radius-full: 9999px;   /* pills, CTA buttons */

  /* ── Shadows ────────────────────────────────────── */
  --shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.08);
  --shadow-md:  0 4px 16px 0 rgb(0 0 0 / 0.10);
  --shadow-lg:  0 8px 32px 0 rgb(0 0 0 / 0.12);
}
```

---

## Palette generation by industry

### Finance / Legal / B2B SaaS — "Trust"
```css
--color-primary:       #1e40af;   /* deep blue */
--color-primary-dark:  #1e3a8a;
--color-primary-light: #dbeafe;
--color-accent:        #0369a1;
--color-neutral-900:   #0f172a;
--color-neutral-700:   #334155;
--color-neutral-500:   #64748b;
--color-neutral-200:   #e2e8f0;
--color-neutral-100:   #f1f5f9;
--color-neutral-50:    #f8fafc;
```

### Health / Wellness / Coaching — "Energy"
```css
--color-primary:       #16a34a;   /* green */
--color-primary-dark:  #15803d;
--color-primary-light: #dcfce7;
--color-accent:        #d97706;   /* warm amber */
--color-neutral-900:   #1c1917;
--color-neutral-700:   #44403c;
--color-neutral-500:   #78716c;
--color-neutral-200:   #e7e5e4;
--color-neutral-100:   #f5f5f4;
--color-neutral-50:    #fafaf9;
```

### Education / Courses — "Clarity"
```css
--color-primary:       #4f46e5;   /* indigo */
--color-primary-dark:  #4338ca;
--color-primary-light: #eef2ff;
--color-accent:        #ea580c;   /* orange */
--color-neutral-900:   #111827;
--color-neutral-700:   #374151;
--color-neutral-500:   #6b7280;
--color-neutral-200:   #e5e7eb;
--color-neutral-100:   #f3f4f6;
--color-neutral-50:    #f9fafb;
```

### E-commerce / Products — "Bold"
```css
--color-primary:       #09090b;   /* near-black */
--color-primary-dark:  #000000;
--color-primary-light: #f4f4f5;
--color-accent:        #dc2626;   /* red — urgency */
--color-neutral-900:   #09090b;
--color-neutral-700:   #3f3f46;
--color-neutral-500:   #71717a;
--color-neutral-200:   #e4e4e7;
--color-neutral-100:   #f4f4f5;
--color-neutral-50:    #fafafa;
```

### Creative / Agency — "Expressive"
Read the brand tone description from `business_context.md` and generate
a custom palette. Start with a saturated primary extracted from any color
mentions, build the neutral scale around it.

---

## Font pairings

All fonts loaded from Google Fonts via `<link>` in the layout.
Use `display=swap` and `preconnect` to avoid layout shift.

### Professional / Corporate
```
--font-heading: 'Inter', sans-serif;
--font-body:    'Inter', sans-serif;
```
Weight contrast: headings at 700–800, body at 400–500.

### Warm / Personal (coaching, courses)
```
--font-heading: 'Plus Jakarta Sans', sans-serif;
--font-body:    'Plus Jakarta Sans', sans-serif;
```
Consider Lora for long-form body text if the funnel has substantial copy.

### Bold / Direct (high-ticket, SaaS)
```
--font-heading: 'Sora', sans-serif;
--font-body:    'Inter', sans-serif;
```

### Creative / Agency
```
--font-heading: 'Outfit', sans-serif;
--font-body:    'Inter', sans-serif;
```

---

## global.css

Always generate this alongside `tokens.css`:

```css
/* src/styles/global.css */
@import './tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: var(--font-body);
    color: var(--color-neutral-700);
    background-color: var(--color-neutral-50);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-neutral-900);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  p {
    line-height: 1.7;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-8 py-4 rounded-full
           font-semibold text-white transition-all duration-200
           hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg;
    background-color: var(--color-primary);
  }
  .btn-primary:hover {
    background-color: var(--color-primary-dark);
  }

  .section-wrapper {
    @apply w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
    padding-top: var(--space-section);
    padding-bottom: var(--space-section);
  }

  .section-label {
    @apply text-sm font-semibold tracking-widest uppercase;
    color: var(--color-primary);
  }
}
```
