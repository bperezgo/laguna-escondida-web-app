import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, n as renderSlot, h as addAttribute } from './astro/server_BBC2-64G.mjs';
import 'piccolore';
import { a as $$BaseLayout, b as $$Navbar, c as $$Footer } from './Footer_DqrnOMUS.mjs';
import { B as BLOG_CATEGORIES } from './constants_wmFtMecp.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$ContenidoLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContenidoLayout;
  const { title, description, image, showSidebar = true } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "image": image }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="section"> <div class="container"> ${showSidebar ? renderTemplate`<div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10"> <!-- Main content --> <div> ${renderSlot($$result2, $$slots["default"])} </div> <!-- Sidebar --> <aside class="flex flex-col gap-8"> <!-- Categories --> <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"> <h3 class="font-heading text-lg font-semibold text-gray-800 mb-4">Categorías</h3> <ul class="flex flex-col gap-2"> <li> <a href="/contenido"${addAttribute([
    "block px-3 py-2 rounded-lg text-sm transition-colors",
    currentPath === "/contenido" ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:bg-neutral-50 hover:text-primary-600"
  ].join(" "), "class")}>
Todos los artículos
</a> </li> ${BLOG_CATEGORIES.map((cat) => {
    const href = `/contenido/categoria/${cat.slug}`;
    const isActive = currentPath.startsWith(href);
    return renderTemplate`<li> <a${addAttribute(href, "href")}${addAttribute([
      "block px-3 py-2 rounded-lg text-sm transition-colors",
      isActive ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:bg-neutral-50 hover:text-primary-600"
    ].join(" "), "class")}> ${cat.label} </a> </li>`;
  })} </ul> </div> <!-- Newsletter mini --> <div class="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"> <h3 class="font-heading text-lg font-semibold text-gray-800 mb-2">Newsletter</h3> <p class="text-sm text-gray-500 mb-4">
Recibe los mejores artículos cada semana.
</p> <form id="sidebar-newsletter" class="flex flex-col gap-3"> <input type="email" name="email" placeholder="tu@email.com" required class="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"> <button type="submit" class="w-full py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
Suscribirme
</button> </form> </div> <!-- Reservation CTA --> <div class="bg-primary-600 text-white rounded-2xl p-6"> <h3 class="font-heading text-lg font-semibold mb-2">¿Planeas un Evento?</h3> <p class="text-sm text-white/80 mb-4">
Consulta disponibilidad y precios sin compromiso.
</p> <a href="/reservas/formulario" class="block text-center py-2.5 px-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-neutral-100 transition-colors text-sm">
Hacer una Reserva
</a> </div> </aside> </div>` : renderTemplate`${renderSlot($$result2, $$slots["default"])}`} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} ${renderScript($$result, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/layouts/ContenidoLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/layouts/ContenidoLayout.astro", void 0);

export { $$ContenidoLayout as $ };
