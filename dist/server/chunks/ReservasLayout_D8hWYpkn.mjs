import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as renderSlot } from './astro/server_BBC2-64G.mjs';
import 'piccolore';
import { a as $$BaseLayout, b as $$Navbar, c as $$Footer } from './Footer_DqrnOMUS.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$ReservasLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReservasLayout;
  const { title, description, image } = Astro2.props;
  const funnelSteps = [
    { label: "Eventos", href: "/reservas" },
    { label: "Galer\xEDa", href: "/reservas/galeria" },
    { label: "Paquetes", href: "/reservas/paquetes" },
    { label: "Reservar", href: "/reservas/formulario" }
  ];
  const currentPath = Astro2.url.pathname;
  const currentIndex = funnelSteps.findIndex((s) => s.href === currentPath);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})}  ${maybeRenderHead()}<div class="bg-white border-b border-neutral-200 sticky top-16 z-[1020]"> <div class="container"> <nav aria-label="Progreso de reserva" class="flex items-center gap-0 overflow-x-auto scrollbar-hide"> ${funnelSteps.map((step, i) => {
    const isActive = currentPath === step.href;
    const isPast = i < currentIndex;
    return renderTemplate`<a${addAttribute(step.href, "href")}${addAttribute([
      "flex-1 text-center py-3 text-xs font-medium border-b-2 transition-all whitespace-nowrap px-2",
      isActive ? "border-primary-500 text-primary-600" : isPast ? "border-primary-200 text-primary-400" : "border-transparent text-gray-400"
    ].join(" "), "class")}${addAttribute(isActive ? "step" : void 0, "aria-current")}> <span class="font-bold mr-1">${i + 1}.</span> ${step.label} </a>`;
  })} </nav> </div> </div> <main> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/layouts/ReservasLayout.astro", void 0);

export { $$ReservasLayout as $ };
