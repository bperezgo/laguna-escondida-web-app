# Component Patterns Reference

Conversion-optimized HTML + Tailwind patterns for each funnel section.
These are structural templates — populate them with copy from `src/data/funnel.ts`.

Every component follows these rules:
- Imports copy from `../data/funnel` (never hardcoded strings)
- Uses CSS custom properties from `tokens.css` (never arbitrary Tailwind colors)
- Mobile-first responsive
- Single primary CTA per section

---

## ui/Button.astro

```astro
---
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const {
  href,
  variant = 'primary',
  size = 'lg',
  class: className = '',
} = Astro.props;

const Tag = href ? 'a' : 'button';

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variants = {
  primary: 'btn-primary text-white',
  secondary: 'border-2 font-semibold transition-colors hover:bg-neutral-50',
  ghost: 'font-medium underline-offset-4 hover:underline',
};
---

<Tag
  href={href}
  class={`inline-flex items-center justify-center gap-2 font-semibold rounded-full
          transition-all duration-200 cursor-pointer
          ${sizes[size]} ${variants[variant]} ${className}`}
>
  <slot />
</Tag>
```

---

## ui/SectionWrapper.astro

```astro
---
interface Props {
  id?: string;
  background?: 'default' | 'muted' | 'primary' | 'dark';
  class?: string;
}

const { id, background = 'default', class: className = '' } = Astro.props;

const backgrounds = {
  default:  'bg-[var(--color-neutral-50)]',
  muted:    'bg-[var(--color-neutral-100)]',
  primary:  'bg-[var(--color-primary-light)]',
  dark:     'bg-[var(--color-neutral-900)]',
};
---

<section
  id={id}
  class={`w-full ${backgrounds[background]} ${className}`}
>
  <div class="section-wrapper">
    <slot />
  </div>
</section>
```

---

## Hero.astro

The most critical component. Must communicate the full value proposition
above the fold on mobile. No heavy images — use CSS backgrounds or SVG.

```astro
---
import Button from './ui/Button.astro';
import { hero } from '../data/funnel';
---

<section class="relative w-full overflow-hidden"
  style="background-color: var(--color-neutral-50); padding: 5rem 0 6rem;">

  <!-- Optional: subtle background pattern -->
  <div class="absolute inset-0 opacity-[0.03]"
    style="background-image: radial-gradient(var(--color-primary) 1px, transparent 1px);
           background-size: 32px 32px;">
  </div>

  <div class="section-wrapper relative">
    <div class="max-w-3xl mx-auto text-center">

      <!-- Social proof bar / credibility pill -->
      {hero.credibilityPill && (
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
          style="background: var(--color-primary-light); color: var(--color-primary);">
          <span class="w-2 h-2 rounded-full inline-block"
            style="background: var(--color-primary);">
          </span>
          {hero.credibilityPill}
        </div>
      )}

      <!-- Main headline -->
      <h1 class="font-bold leading-tight mb-6"
        style="font-size: clamp(2rem, 5vw, var(--text-5xl));
               color: var(--color-neutral-900);">
        {hero.headline}
      </h1>

      <!-- Subheadline -->
      <p class="mb-8 max-w-2xl mx-auto"
        style="font-size: var(--text-xl); color: var(--color-neutral-700); line-height: 1.6;">
        {hero.subheadline}
      </p>

      <!-- CTA group -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button href="#offer" size="lg">
          {hero.ctaText}
        </Button>
        {hero.secondaryCta && (
          <Button href="#how-it-works" variant="ghost" size="lg">
            {hero.secondaryCta}
          </Button>
        )}
      </div>

      <!-- Trust micro-copy below CTA -->
      {hero.trustNote && (
        <p class="mt-4 text-sm" style="color: var(--color-neutral-500);">
          {hero.trustNote}
        </p>
      )}

    </div>

    <!-- Stats bar (if available) -->
    {hero.stats && hero.stats.length > 0 && (
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {hero.stats.map((stat) => (
          <div class="text-center">
            <div class="text-3xl font-bold mb-1"
              style="color: var(--color-primary);">
              {stat.value}
            </div>
            <div class="text-sm" style="color: var(--color-neutral-500);">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
</section>
```

---

## Problem.astro

Agitates the pain before presenting the solution. Tone: empathetic, not preachy.

```astro
---
import SectionWrapper from './ui/SectionWrapper.astro';
import { problem } from '../data/funnel';
---

<SectionWrapper id="problem" background="muted">
  <div class="max-w-3xl mx-auto">

    <p class="section-label text-center mb-3">{problem.eyebrow}</p>
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-6"
      style="color: var(--color-neutral-900);">
      {problem.headline}
    </h2>
    <p class="text-lg text-center mb-12"
      style="color: var(--color-neutral-700); max-width: 36rem; margin-left: auto; margin-right: auto;">
      {problem.intro}
    </p>

    <!-- Pain points list -->
    <div class="grid md:grid-cols-2 gap-4">
      {problem.painPoints.map((point) => (
        <div class="flex items-start gap-3 p-5 rounded-xl"
          style="background: white; border: 1px solid var(--color-neutral-200);">
          <span class="mt-0.5 text-xl flex-shrink-0">❌</span>
          <p style="color: var(--color-neutral-700);">{point}</p>
        </div>
      ))}
    </div>

    <!-- Validation / bridge to solution -->
    {problem.bridge && (
      <p class="mt-10 text-center text-lg italic"
        style="color: var(--color-neutral-600);">
        "{problem.bridge}"
      </p>
    )}

  </div>
</SectionWrapper>
```

---

## HowItWorks.astro

Numbered steps. Reduces uncertainty — shows the path is clear and achievable.

```astro
---
import SectionWrapper from './ui/SectionWrapper.astro';
import { howItWorks } from '../data/funnel';
---

<SectionWrapper id="how-it-works" background="default">
  <div class="max-w-4xl mx-auto">

    <p class="section-label text-center mb-3">{howItWorks.eyebrow}</p>
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      {howItWorks.headline}
    </h2>
    <p class="text-lg text-center mb-14 max-w-2xl mx-auto"
      style="color: var(--color-neutral-600);">
      {howItWorks.subheadline}
    </p>

    <div class="space-y-6">
      {howItWorks.steps.map((step, i) => (
        <div class="flex items-start gap-6 p-6 rounded-2xl"
          style="border: 1px solid var(--color-neutral-200); background: white;">

          <!-- Step number -->
          <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                      text-white font-bold text-lg"
            style="background: var(--color-primary);">
            {i + 1}
          </div>

          <!-- Content -->
          <div>
            <h3 class="text-xl font-semibold mb-2"
              style="color: var(--color-neutral-900);">
              {step.title}
            </h3>
            <p style="color: var(--color-neutral-600);">{step.description}</p>
            {step.outcome && (
              <p class="mt-2 text-sm font-medium"
                style="color: var(--color-primary);">
                → {step.outcome}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

  </div>
</SectionWrapper>
```

---

## Offer.astro

The value stack. Show everything included with perceived value. High visual impact.

```astro
---
import Button from './ui/Button.astro';
import SectionWrapper from './ui/SectionWrapper.astro';
import { offer } from '../data/funnel';
---

<SectionWrapper id="offer" background="primary">
  <div class="max-w-4xl mx-auto">

    <p class="section-label text-center mb-3">{offer.eyebrow}</p>
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      {offer.headline}
    </h2>
    <p class="text-lg text-center mb-14 max-w-2xl mx-auto"
      style="color: var(--color-neutral-700);">
      {offer.subheadline}
    </p>

    <!-- What's included -->
    <div class="rounded-2xl overflow-hidden mb-8"
      style="border: 2px solid var(--color-primary); background: white;">

      <div class="p-4 text-center text-sm font-semibold text-white"
        style="background: var(--color-primary);">
        Everything included
      </div>

      <div class="divide-y" style="border-color: var(--color-neutral-100);">
        {offer.items.map((item) => (
          <div class="flex items-center justify-between p-5 gap-4">
            <div class="flex items-start gap-3">
              <span class="text-lg mt-0.5 flex-shrink-0">✓</span>
              <div>
                <p class="font-semibold" style="color: var(--color-neutral-900);">
                  {item.name}
                </p>
                <p class="text-sm mt-0.5" style="color: var(--color-neutral-600);">
                  {item.description}
                </p>
              </div>
            </div>
            {item.value && (
              <div class="text-right flex-shrink-0">
                <span class="text-sm font-medium line-through"
                  style="color: var(--color-neutral-400);">
                  ${item.value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <!-- Price summary -->
      <div class="p-6" style="background: var(--color-neutral-50);">
        {offer.totalValue && (
          <p class="text-center text-sm mb-1" style="color: var(--color-neutral-500);">
            Total value: <span class="line-through">${offer.totalValue}</span>
          </p>
        )}
        <p class="text-center text-4xl font-bold mb-1"
          style="color: var(--color-neutral-900);">
          {offer.price}
        </p>
        {offer.priceNote && (
          <p class="text-center text-sm" style="color: var(--color-neutral-500);">
            {offer.priceNote}
          </p>
        )}
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center">
      <Button href="#checkout" size="lg" class="w-full sm:w-auto">
        {offer.ctaText}
      </Button>
      {offer.guarantee && (
        <p class="mt-4 text-sm" style="color: var(--color-neutral-500);">
          🛡️ {offer.guarantee}
        </p>
      )}
    </div>

  </div>
</SectionWrapper>
```

---

## FAQ.astro

Accordion-style FAQ. Each question is an objection from `07_objeciones.md`.

```astro
---
import SectionWrapper from './ui/SectionWrapper.astro';
import { faq } from '../data/funnel';
---

<SectionWrapper id="faq" background="muted">
  <div class="max-w-3xl mx-auto">

    <p class="section-label text-center mb-3">{faq.eyebrow}</p>
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      {faq.headline}
    </h2>

    <div class="space-y-3" id="faq-list">
      {faq.items.map((item, i) => (
        <details
          class="group rounded-xl overflow-hidden"
          style="border: 1px solid var(--color-neutral-200); background: white;">
          <summary
            class="flex items-center justify-between p-5 cursor-pointer font-semibold
                   list-none select-none"
            style="color: var(--color-neutral-900);">
            {item.question}
            <span class="ml-4 flex-shrink-0 transition-transform duration-200
                         group-open:rotate-45"
              style="color: var(--color-primary);">
              +
            </span>
          </summary>
          <div class="px-5 pb-5" style="color: var(--color-neutral-700); line-height: 1.7;">
            {item.answer}
          </div>
        </details>
      ))}
    </div>

  </div>
</SectionWrapper>
```

---

## SocialProof.astro

Testimonials. Only generated when `08_social_proof.md` exists and has real testimonials.

```astro
---
import SectionWrapper from './ui/SectionWrapper.astro';
import { socialProof } from '../data/funnel';
---

<SectionWrapper id="social-proof" background="default">
  <div class="max-w-5xl mx-auto">

    <p class="section-label text-center mb-3">{socialProof.eyebrow}</p>
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-14">
      {socialProof.headline}
    </h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {socialProof.testimonials.map((t) => (
        <div class="flex flex-col p-6 rounded-2xl"
          style="border: 1px solid var(--color-neutral-200); background: white;">

          <!-- Stars -->
          <div class="flex gap-1 mb-4" style="color: var(--color-accent);">
            {'★'.repeat(5)}
          </div>

          <!-- Quote -->
          <blockquote class="flex-1 text-base leading-relaxed mb-6"
            style="color: var(--color-neutral-700);">
            "{t.quote}"
          </blockquote>

          <!-- Attribution -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center
                        text-sm font-bold text-white flex-shrink-0"
              style="background: var(--color-primary);">
              {t.name.charAt(0)}
            </div>
            <div>
              <p class="font-semibold text-sm"
                style="color: var(--color-neutral-900);">
                {t.name}
              </p>
              {t.role && (
                <p class="text-xs" style="color: var(--color-neutral-500);">
                  {t.role}
                </p>
              )}
            </div>
          </div>

          <!-- Result badge -->
          {t.result && (
            <div class="mt-4 px-3 py-1.5 rounded-full text-xs font-semibold text-center"
              style="background: var(--color-primary-light); color: var(--color-primary);">
              {t.result}
            </div>
          )}
        </div>
      ))}
    </div>

  </div>
</SectionWrapper>
```

---

## FinalCTA.astro

Last conversion push. Restate the transformation, not the product.

```astro
---
import Button from './ui/Button.astro';
import SectionWrapper from './ui/SectionWrapper.astro';
import { finalCta } from '../data/funnel';
---

<SectionWrapper id="final-cta" background="dark">
  <div class="max-w-3xl mx-auto text-center">

    <h2 class="text-3xl md:text-5xl font-bold mb-6"
      style="color: white; line-height: 1.1;">
      {finalCta.headline}
    </h2>

    <p class="text-lg mb-10" style="color: rgb(255 255 255 / 0.75);">
      {finalCta.subheadline}
    </p>

    <Button href="#offer" size="lg">
      {finalCta.ctaText}
    </Button>

    {finalCta.guarantee && (
      <p class="mt-6 text-sm" style="color: rgb(255 255 255 / 0.5);">
        🛡️ {finalCta.guarantee}
      </p>
    )}

  </div>
</SectionWrapper>
```

---

## LeadForm.astro

For squeeze pages or lead magnet funnels. Integrates with any form provider
via a `FORM_ENDPOINT` environment variable.

```astro
---
import Button from './ui/Button.astro';
import { leadForm } from '../data/funnel';
---

<section id="lead-form" class="w-full py-20"
  style="background: var(--color-primary);">
  <div class="section-wrapper">
    <div class="max-w-lg mx-auto">

      <h2 class="text-3xl md:text-4xl font-bold text-center mb-3 text-white">
        {leadForm.headline}
      </h2>
      <p class="text-center mb-8" style="color: rgb(255 255 255 / 0.8);">
        {leadForm.subheadline}
      </p>

      <form
        id="capture-form"
        action={import.meta.env.FORM_ENDPOINT}
        method="POST"
        class="space-y-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Your first name"
          required
          class="w-full px-5 py-4 rounded-xl text-base outline-none
                 focus:ring-2 focus:ring-white/50"
          style="background: rgb(255 255 255 / 0.15); color: white;
                 border: 1px solid rgb(255 255 255 / 0.25);
                 placeholder-color: rgb(255 255 255 / 0.6);"
        />
        <input
          type="email"
          name="email"
          placeholder="Your best email"
          required
          class="w-full px-5 py-4 rounded-xl text-base outline-none
                 focus:ring-2 focus:ring-white/50"
          style="background: rgb(255 255 255 / 0.15); color: white;
                 border: 1px solid rgb(255 255 255 / 0.25);"
        />
        <Button type="submit" size="lg" variant="secondary" class="w-full
          !bg-white !text-[var(--color-primary)] hover:!bg-neutral-50">
          {leadForm.ctaText}
        </Button>
      </form>

      {leadForm.privacyNote && (
        <p class="mt-4 text-xs text-center"
          style="color: rgb(255 255 255 / 0.5);">
          🔒 {leadForm.privacyNote}
        </p>
      )}

    </div>
  </div>
</section>
```
