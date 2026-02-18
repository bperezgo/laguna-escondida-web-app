import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { a as $$BaseLayout, b as $$Navbar, S as SITE, $ as $$Button, c as $$Footer } from '../chunks/Footer_DqrnOMUS.mjs';
import { $ as $$HeroSection } from '../chunks/HeroSection_CjaEu5VE.mjs';
import { $ as $$BlogPostList } from '../chunks/BlogPostList_ChPJ97uD.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const featuredPosts = [
    {
      id: "1",
      title: "Los Mejores Spots de Pesca en la Laguna",
      slug: "mejores-spots-pesca",
      excerpt: "Descubre los rincones secretos donde los peces abundan en nuestra laguna encantada.",
      content: "",
      author: { id: "1", name: "Equipo Laguna Escondida" },
      category: { id: "1", name: "Pesca", slug: "pesca" },
      tags: ["pesca", "naturaleza"],
      publishedAt: "2026-02-01",
      readingTime: 5,
      coverImage: "/images/blog-pesca.jpg"
    },
    {
      id: "2",
      title: "C\xF3mo Organizar una Boda Perfecta en la Naturaleza",
      slug: "boda-perfecta-naturaleza",
      excerpt: "Gu\xEDa completa para planificar tu boda so\xF1ada rodeada de naturaleza y paisajes \xFAnicos.",
      content: "",
      author: { id: "1", name: "Equipo Laguna Escondida" },
      category: { id: "2", name: "Eventos", slug: "eventos" },
      tags: ["bodas", "eventos"],
      publishedAt: "2026-01-15",
      readingTime: 7,
      coverImage: "/images/blog-boda.jpg"
    },
    {
      id: "3",
      title: "Receta: Trucha al Ajillo con Hierbas del Campo",
      slug: "receta-trucha-ajillo",
      excerpt: "Una deliciosa receta con la trucha reci\xE9n pescada en nuestras aguas cristalinas.",
      content: "",
      author: { id: "1", name: "Equipo Laguna Escondida" },
      category: { id: "3", name: "Recetas", slug: "recetas" },
      tags: ["recetas", "trucha"],
      publishedAt: "2026-01-05",
      readingTime: 4,
      coverImage: "/images/blog-receta.jpg"
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "description": SITE.description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})}  ${renderComponent($$result2, "HeroSection", $$HeroSection, { "title": "Tu Escape en la Naturaleza", "subtitle": SITE.name, "description": "El lugar perfecto para celebrar bodas, quincea\xF1os, cumplea\xF1os y eventos corporativos rodeados de naturaleza \xFAnica.", "primaryCta": { label: "Planifica tu Evento", href: "/reservas", analyticsEvent: "home_hero_cta" }, "secondaryCta": { label: "Ver Blog", href: "/contenido" }, "size": "full" })}  ${maybeRenderHead()}<section class="section bg-white"> <div class="container"> <div class="text-center mb-14"> <p class="text-overline text-accent-500 mb-3">Nuestros Servicios</p> <h2 class="font-heading text-4xl text-gray-800 mb-4">Un Lugar, Mil Posibilidades</h2> <p class="text-lg text-gray-600 max-w-2xl mx-auto">
Laguna Escondida es el escenario ideal para los momentos que recordarás por siempre.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${[
    {
      icon: "\u{1F3AA}",
      title: "Eventos Sociales",
      desc: "Bodas, quincea\xF1os, cumplea\xF1os y reuniones familiares en un entorno m\xE1gico.",
      href: "/reservas"
    },
    {
      icon: "\u{1F3A3}",
      title: "Pesca Deportiva",
      desc: "Vive la experiencia de pescar en nuestras aguas ricas en trucha y otras especies.",
      href: "/contenido/pesca"
    },
    {
      icon: "\u{1F33F}",
      title: "Conexi\xF3n con la Naturaleza",
      desc: "Senderismo, observaci\xF3n de aves y actividades al aire libre en un ecosistema \xFAnico.",
      href: "/contenido/naturaleza"
    }
  ].map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="group flex flex-col items-center text-center p-8 rounded-2xl bg-neutral-50 hover:bg-primary-50 border-2 border-transparent hover:border-primary-200 transition-all"> <span class="text-5xl mb-5">${item.icon}</span> <h3 class="font-heading text-xl font-semibold text-gray-800 group-hover:text-primary-700 mb-3 transition-colors">${item.title}</h3> <p class="text-gray-600 text-sm leading-relaxed">${item.desc}</p> </a>`)} </div> </div> </section>  <section class="section bg-primary-600 text-white"> <div class="container"> <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"> ${[
    { value: "500+", label: "Eventos Realizados" },
    { value: "98%", label: "Clientes Satisfechos" },
    { value: "10+", label: "A\xF1os de Experiencia" },
    { value: "1.200", label: "Hect\xE1reas Naturales" }
  ].map((stat) => renderTemplate`<div> <p class="font-heading text-4xl font-bold text-white mb-2">${stat.value}</p> <p class="text-white/70 text-sm">${stat.label}</p> </div>`)} </div> </div> </section>  <section class="section bg-white"> <div class="container"> <div class="flex items-center justify-between mb-10"> <div> <p class="text-overline text-accent-500 mb-2">Del Blog</p> <h2 class="font-heading text-3xl text-gray-800">Últimos Artículos</h2> </div> ${renderComponent($$result2, "Button", $$Button, { "href": "/contenido", "variant": "outline", "size": "sm" }, { "default": ($$result3) => renderTemplate`
Ver todos
` })} </div> ${renderComponent($$result2, "BlogPostList", $$BlogPostList, { "posts": featuredPosts, "columns": 3 })} </div> </section>  <section class="section bg-neutral-100"> <div class="container max-w-3xl text-center"> <h2 class="font-heading text-4xl text-gray-800 mb-4">
¿Listo para Crear Recuerdos Inolvidables?
</h2> <p class="text-lg text-gray-600 mb-10">
Contacta con nosotros y empieza a planificar el evento de tus sueños.
</p> <div class="flex flex-wrap gap-4 justify-center"> ${renderComponent($$result2, "Button", $$Button, { "href": "/reservas/formulario", "variant": "primary", "size": "lg", "data-analytics-event": "home_bottom_cta" }, { "default": ($$result3) => renderTemplate`
Hacer una Reserva
` })} ${renderComponent($$result2, "Button", $$Button, { "href": `https://wa.me/${SITE.whatsapp}`, "variant": "outline", "size": "lg" }, { "default": ($$result3) => renderTemplate`
Contactar por WhatsApp
` })} </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/index.astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
