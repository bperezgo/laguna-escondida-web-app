import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, l as renderScript, k as renderComponent } from '../../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$ReservasLayout } from '../../chunks/ReservasLayout_D8hWYpkn.mjs';
import 'clsx';
/* empty css                                      */
import { $ as $$Button } from '../../chunks/Footer_DqrnOMUS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$GalleryGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GalleryGrid;
  const { images, categories = [], class: className = "" } = Astro2.props;
  const allCategories = categories.length > 0 ? categories : [...new Set(images.map((img) => img.category))];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(className, "class")} data-astro-cid-nhovxpgi> <!-- Category filter tabs --> ${allCategories.length > 1 && renderTemplate`<div class="flex flex-wrap gap-2 mb-8" id="gallery-filters" role="tablist" data-astro-cid-nhovxpgi> <button class="gallery-filter-btn active px-4 py-2 rounded-full text-sm font-medium transition-all" data-filter="all" role="tab" aria-selected="true" data-astro-cid-nhovxpgi>
Todos
</button> ${allCategories.map((cat) => renderTemplate`<button class="gallery-filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all"${addAttribute(cat, "data-filter")} role="tab" aria-selected="false" data-astro-cid-nhovxpgi> ${cat} </button>`)} </div>`} <!-- Grid --> <div id="gallery-grid" class="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3" data-astro-cid-nhovxpgi> ${images.map((img) => renderTemplate`<div class="gallery-item break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"${addAttribute(img.category, "data-category")} data-astro-cid-nhovxpgi> <img${addAttribute(img.src, "src")}${addAttribute(img.alt, "alt")} loading="lazy" class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" data-astro-cid-nhovxpgi> </div>`)} </div> <!-- Empty state --> <p id="gallery-empty" class="hidden text-center text-gray-500 py-16" data-astro-cid-nhovxpgi>
No hay imágenes en esta categoría todavía.
</p> </div>  ${renderScript($$result, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/GalleryGrid.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/GalleryGrid.astro", void 0);

const $$Galeria = createComponent(($$result, $$props, $$slots) => {
  const images = [
    { src: "/images/gallery/boda-01.jpg", alt: "Boda en el jard\xEDn de la laguna", category: "Bodas" },
    { src: "/images/gallery/boda-02.jpg", alt: "Ceremonia junto al agua", category: "Bodas" },
    { src: "/images/gallery/quince-01.jpg", alt: "Quincea\xF1os tem\xE1tico", category: "Quincea\xF1os" },
    { src: "/images/gallery/cumple-01.jpg", alt: "Cumplea\xF1os en la naturaleza", category: "Cumplea\xF1os" },
    { src: "/images/gallery/corp-01.jpg", alt: "Evento corporativo", category: "Corporativo" },
    { src: "/images/gallery/lago-01.jpg", alt: "Vista del lago al atardecer", category: "Lugar" },
    { src: "/images/gallery/lago-02.jpg", alt: "\xC1rea de fogata", category: "Lugar" },
    { src: "/images/gallery/lago-03.jpg", alt: "Muelle de madera", category: "Lugar" }
  ];
  return renderTemplate`${renderComponent($$result, "ReservasLayout", $$ReservasLayout, { "title": "Galer\xEDa de Eventos", "description": "Insp\xEDrate con nuestras fotos de bodas, quincea\xF1os, cumplea\xF1os y m\xE1s eventos realizados en Laguna Escondida." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container"> <div class="text-center mb-12"> <p class="text-overline text-accent-500 mb-3">Momentos Únicos</p> <h1 class="font-heading text-4xl md:text-5xl text-gray-800 mb-4">Galería de Eventos</h1> <p class="text-lg text-gray-600 max-w-2xl mx-auto">
Cada foto cuenta una historia. Inspírate y empieza a imaginar tu evento perfecto aquí.
</p> </div> ${renderComponent($$result2, "GalleryGrid", $$GalleryGrid, { "images": images, "class": "mb-12" })} <div class="text-center"> ${renderComponent($$result2, "Button", $$Button, { "href": "/reservas/paquetes", "variant": "primary", "size": "lg", "data-analytics-event": "gallery_cta_click" }, { "default": ($$result3) => renderTemplate`
Ver Paquetes y Precios →
` })} </div> </div> </section> ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/galeria.astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/galeria.astro";
const $$url = "/reservas/galeria";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galeria,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
