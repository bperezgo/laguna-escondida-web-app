import { e as createAstro, f as createComponent, k as renderComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from '../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$ReservasLayout } from '../chunks/ReservasLayout_D8hWYpkn.mjs';
import { $ as $$HeroSection } from '../chunks/HeroSection_CjaEu5VE.mjs';
import { $ as $$Button } from '../chunks/Footer_DqrnOMUS.mjs';
import { E as EVENT_TYPES } from '../chunks/constants_wmFtMecp.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$LandingTemplate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LandingTemplate;
  const {
    heroTitle = "Tu Evento Perfecto en la Naturaleza",
    heroSubtitle = "Laguna Escondida",
    heroDescription = "Celebra tus momentos m\xE1s especiales rodeado de naturaleza, agua cristalina y paisajes \xFAnicos.",
    heroImage
  } = Astro2.props;
  return renderTemplate`<!-- Hero -->${renderComponent($$result, "HeroSection", $$HeroSection, { "title": heroTitle, "subtitle": heroSubtitle, "description": heroDescription, "backgroundImage": heroImage, "primaryCta": { label: "Ver Paquetes", href: "/reservas/paquetes", analyticsEvent: "landing_hero_cta_primary" }, "secondaryCta": { label: "Ver Galer\xEDa", href: "/reservas/galeria" }, "size": "lg" })} <!-- Tipos de evento --> ${maybeRenderHead()}<section class="section bg-white"> <div class="container"> <div class="text-center mb-12"> <p class="text-overline text-accent-500 mb-3">¿Cuál es tu ocasión?</p> <h2 class="font-heading text-4xl text-gray-800">Tipos de Eventos</h2> </div> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"> ${EVENT_TYPES.slice(0, 6).map((event) => renderTemplate`<a${addAttribute(`/reservas/formulario?tipo=${event.value}`, "href")} class="group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-neutral-200 hover:border-primary-400 hover:bg-primary-50 transition-all text-center"${addAttribute(`event_type_${event.value}_selected`, "data-analytics-event")}> <span class="text-3xl"> ${event.value === "boda" && "\u{1F48D}"} ${event.value === "quinceanos" && "\u{1F380}"} ${event.value === "cumpleanos" && "\u{1F382}"} ${event.value === "corporativo" && "\u{1F4BC}"} ${event.value === "graduacion" && "\u{1F393}"} ${event.value === "otro" && "\u{1F31F}"} </span> <span class="font-medium text-gray-700 group-hover:text-primary-700 transition-colors"> ${event.label} </span> </a>`)} </div> </div> </section> <!-- Por qué elegirnos --> <section class="section bg-neutral-100"> <div class="container"> <div class="text-center mb-12"> <p class="text-overline text-accent-500 mb-3">Nuestras Ventajas</p> <h2 class="font-heading text-4xl text-gray-800">¿Por Qué Laguna Escondida?</h2> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${[
    { icon: "\u{1F33F}", title: "Naturaleza \xDAnica", desc: "Un entorno natural privilegiado, lejos del ruido de la ciudad, para crear momentos memorables." },
    { icon: "\u2728", title: "Experiencia Total", desc: "Coordinamos cada detalle de tu evento para que solo te preocupes por disfrutar." },
    { icon: "\u{1F91D}", title: "Atenci\xF3n Personalizada", desc: "Un equipo dedicado que trabaja contigo desde la planificaci\xF3n hasta el \xFAltimo momento." }
  ].map((item) => renderTemplate`<div class="text-center p-6"> <span class="text-5xl block mb-4">${item.icon}</span> <h3 class="font-heading text-xl font-semibold text-gray-800 mb-3">${item.title}</h3> <p class="text-gray-600 leading-relaxed">${item.desc}</p> </div>`)} </div> </div> </section> <!-- CTA Banner --> <section class="section bg-primary-600 text-white"> <div class="container text-center"> <h2 class="font-heading text-3xl md:text-4xl font-bold mb-4">
¿Listo para hacer tu evento realidad?
</h2> <p class="text-white/80 text-lg mb-8 max-w-xl mx-auto">
Consulta disponibilidad y recibe una cotización personalizada sin compromiso.
</p> <div class="flex flex-wrap gap-4 justify-center"> ${renderComponent($$result, "Button", $$Button, { "href": "/reservas/formulario", "variant": "accent", "size": "lg", "data-analytics-event": "landing_bottom_cta" }, { "default": ($$result2) => renderTemplate`
Hacer una Reserva
` })} ${renderComponent($$result, "Button", $$Button, { "href": "/reservas/galeria", "variant": "outline", "size": "lg", "class": "border-white text-white hover:bg-white/10" }, { "default": ($$result2) => renderTemplate`
Ver Galería
` })} </div> </div> </section>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/templates/reservas/LandingTemplate.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ReservasLayout", $$ReservasLayout, { "title": "Reserva tu Evento", "description": "Celebra tu evento especial en Laguna Escondida. Bodas, quincea\xF1os, cumplea\xF1os, eventos corporativos y m\xE1s." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LandingTemplate", $$LandingTemplate, { "heroTitle": "El Escenario Perfecto para tu Evento", "heroSubtitle": "Reservas", "heroDescription": "Descubre el lugar m\xE1s especial para tus celebraciones, rodeado de naturaleza y con atenci\xF3n personalizada." })} ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/index.astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/index.astro";
const $$url = "/reservas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
