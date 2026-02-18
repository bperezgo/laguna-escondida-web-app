import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, n as renderSlot } from './astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$Button } from './Footer_DqrnOMUS.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const {
    title,
    subtitle,
    description,
    primaryCta,
    secondaryCta,
    backgroundImage,
    backgroundVideo,
    overlay = true,
    class: className = "",
    size = "lg"
  } = Astro2.props;
  const sizeClasses = {
    sm: "min-h-[40vh]",
    md: "min-h-[60vh]",
    lg: "min-h-[80vh]",
    full: "min-h-screen"
  };
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([
    "relative flex items-center justify-center overflow-hidden",
    sizeClasses[size],
    className
  ].join(" "), "class")}> <!-- Background media --> ${backgroundVideo ? renderTemplate`<video class="absolute inset-0 w-full h-full object-cover"${addAttribute(backgroundVideo, "src")} autoplay muted loop playsinline></video>` : backgroundImage ? renderTemplate`<img${addAttribute(backgroundImage, "src")} alt="" class="absolute inset-0 w-full h-full object-cover" loading="eager">` : renderTemplate`<div class="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-secondary-800"></div>`} <!-- Overlay --> ${overlay && renderTemplate`<div class="absolute inset-0 bg-black/40"></div>`} <!-- Content --> <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"> ${subtitle && renderTemplate`<p class="text-overline text-accent-300 mb-4 animate-fade-in-down">${subtitle}</p>`} <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight"> ${title} </h1> ${description && renderTemplate`<p class="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in delay-200"> ${description} </p>`} ${(primaryCta || secondaryCta) && renderTemplate`<div class="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-300"> ${primaryCta && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": primaryCta.href, "variant": "accent", "size": "lg", "data-analytics-event": primaryCta.analyticsEvent }, { "default": ($$result2) => renderTemplate`${primaryCta.label}` })}`} ${secondaryCta && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": secondaryCta.href, "variant": "outline", "size": "lg", "class": "border-white text-white hover:bg-white/10" }, { "default": ($$result2) => renderTemplate`${secondaryCta.label}` })}`} </div>`} ${renderSlot($$result, $$slots["default"])} </div> <!-- Scroll indicator --> <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse"> <svg class="w-6 h-8 text-white/60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path> </svg> </div> </section>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/HeroSection.astro", void 0);

export { $$HeroSection as $ };
