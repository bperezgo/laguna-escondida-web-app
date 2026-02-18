import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$ReservasLayout } from '../../chunks/ReservasLayout_D8hWYpkn.mjs';
import { $ as $$Button } from '../../chunks/Footer_DqrnOMUS.mjs';
import { $ as $$Badge } from '../../chunks/Badge_DmiDjQWw.mjs';
import 'clsx';
import { a as formatPrice } from '../../chunks/formatters_DESIZgzx.mjs';
import { P as PACKAGES, A as ADDONS } from '../../chunks/constants_wmFtMecp.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://lagunaescondida.com");
const $$PriceTag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PriceTag;
  const {
    amount,
    currency = "COP",
    period,
    prefix = "Desde",
    class: className = "",
    size = "md"
  } = Astro2.props;
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col ${className}`, "class")}> ${prefix && renderTemplate`<span class="text-xs text-gray-500 uppercase tracking-wider">${prefix}</span>`} <div class="flex items-baseline gap-1"> <span${addAttribute(`font-heading font-bold text-primary-600 ${sizeClasses[size]}`, "class")}> ${formatPrice(amount, currency)} </span> ${period && renderTemplate`<span class="text-sm text-gray-500">/ ${period}</span>`} </div> </div>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/molecules/PriceTag.astro", void 0);

const $$Astro = createAstro("https://lagunaescondida.com");
const $$PricingTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PricingTable;
  const {
    packages = PACKAGES,
    highlightId = "premium",
    class: className = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${className}`, "class")}> ${packages.map((pkg) => {
    const isHighlighted = pkg.id === highlightId;
    return renderTemplate`<div${addAttribute([
      "flex flex-col rounded-2xl p-6 border-2 transition-all duration-250",
      isHighlighted ? "border-primary-500 bg-primary-50 shadow-xl scale-[1.02]" : "border-neutral-200 bg-white shadow-md hover:shadow-lg hover:border-primary-300"
    ].join(" "), "class")}> ${isHighlighted && renderTemplate`<div class="mb-4"> ${renderComponent($$result, "Badge", $$Badge, { "variant": "primary" }, { "default": ($$result2) => renderTemplate`Más Popular` })} </div>`} <h3 class="font-heading text-2xl font-bold text-gray-800 mb-2">${pkg.name}</h3> ${renderComponent($$result, "PriceTag", $$PriceTag, { "amount": pkg.basePrice, "class": "mb-4" })} <p class="text-sm text-gray-500 mb-6">
Hasta <strong>${pkg.maxGuests} invitados</strong> incluidos
</p> <ul class="flex flex-col gap-2.5 mb-8 flex-1"> ${pkg.features.map((feature) => renderTemplate`<li class="flex items-start gap-2 text-sm text-gray-700"> <svg class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path> </svg> ${feature} </li>`)} </ul> ${renderComponent($$result, "Button", $$Button, { "href": `/reservas/formulario?paquete=${pkg.id}`, "variant": isHighlighted ? "primary" : "outline", "size": "md", "class": "w-full", "data-analytics-event": `package_${pkg.id}_selected` }, { "default": ($$result2) => renderTemplate`
Elegir ${pkg.name}` })} </div>`;
  })} </div>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/PricingTable.astro", void 0);

const $$Paquetes = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      q: "\xBFEl precio incluye decoraci\xF3n?",
      a: "Los paquetes Est\xE1ndar en adelante incluyen iluminaci\xF3n festiva. La decoraci\xF3n tem\xE1tica personalizada est\xE1 disponible como complemento adicional."
    },
    {
      q: "\xBFPuedo agregar m\xE1s invitados despu\xE9s de la reserva?",
      a: "S\xED, puedes agregar invitados hasta 15 d\xEDas antes del evento, sujeto a disponibilidad. Se aplica un costo adicional por persona."
    },
    {
      q: "\xBFCu\xE1l es la pol\xEDtica de cancelaci\xF3n?",
      a: "Cancelaciones con m\xE1s de 30 d\xEDas de anticipaci\xF3n reciben el 80% del dep\xF3sito. Con menos de 30 d\xEDas, se retiene el dep\xF3sito completo."
    },
    {
      q: "\xBFHay estacionamiento disponible?",
      a: "S\xED, contamos con estacionamiento gratuito para todos los paquetes. Capacidad para m\xE1s de 100 veh\xEDculos."
    },
    {
      q: "\xBFPuedo traer mi propio catering?",
      a: "S\xED, en los paquetes B\xE1sico y Est\xE1ndar puedes traer tu proveedor de catering. Para los paquetes Premium y Exclusivo, se recomienda usar nuestros aliados certificados."
    }
  ];
  return renderTemplate`${renderComponent($$result, "ReservasLayout", $$ReservasLayout, { "title": "Paquetes y Precios", "description": "Encuentra el paquete perfecto para tu evento en Laguna Escondida. Precios claros, sin sorpresas." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section bg-neutral-50"> <div class="container"> <div class="text-center mb-12"> <p class="text-overline text-accent-500 mb-3">Elige el tuyo</p> <h1 class="font-heading text-4xl md:text-5xl text-gray-800 mb-4">Paquetes y Precios</h1> <p class="text-lg text-gray-600 max-w-2xl mx-auto">
Precios transparentes. Sin costos ocultos. Personaliza con nuestros complementos.
</p> </div> ${renderComponent($$result2, "PricingTable", $$PricingTable, { "highlightId": "premium" })} </div> </section>  <section class="section bg-white"> <div class="container"> <div class="text-center mb-10"> <h2 class="font-heading text-3xl text-gray-800 mb-3">Complementos Disponibles</h2> <p class="text-gray-600">Agrega servicios adicionales a cualquier paquete</p> </div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"> ${ADDONS.map((addon) => renderTemplate`<div class="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-center"> <p class="font-medium text-gray-800 text-sm mb-1">${addon.name}</p> <p class="text-primary-600 font-bold text-sm">${formatPrice(addon.price)}</p> </div>`)} </div> </div> </section>  <section class="section bg-neutral-50"> <div class="container max-w-3xl"> <div class="text-center mb-10"> <h2 class="font-heading text-3xl text-gray-800 mb-3">Preguntas Frecuentes</h2> </div> <div class="flex flex-col gap-4" id="faqs"> ${faqs.map((faq, i) => renderTemplate`<details class="bg-white rounded-xl border border-neutral-200 overflow-hidden group"> <summary class="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-gray-800 hover:text-primary-700 transition-colors list-none"> ${faq.q} <svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-neutral-100"> <p class="pt-4">${faq.a}</p> </div> </details>`)} </div> </div> </section>  <section class="section bg-primary-600 text-white"> <div class="container text-center"> <h2 class="font-heading text-3xl font-bold mb-4">¿Elegiste tu Paquete?</h2> <p class="text-white/80 mb-8">
Completa el formulario en menos de 5 minutos y recibe confirmación de disponibilidad.
</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/reservas/formulario", "variant": "accent", "size": "lg", "data-analytics-event": "pricing_cta_click" }, { "default": ($$result3) => renderTemplate`
Reservar Ahora →
` })} </div> </section> ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/paquetes.astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/paquetes.astro";
const $$url = "/reservas/paquetes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Paquetes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
