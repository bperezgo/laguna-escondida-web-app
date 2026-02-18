import { f as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$ContenidoLayout } from '../chunks/ContenidoLayout_BfZvVQHV.mjs';
import { $ as $$ArchiveTemplate } from '../chunks/ArchiveTemplate_Du0lPvS7.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const posts = [
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
  return renderTemplate`${renderComponent($$result, "ContenidoLayout", $$ContenidoLayout, { "title": "Blog", "description": "Art\xEDculos sobre pesca, recetas, naturaleza y eventos en Laguna Escondida." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArchiveTemplate", $$ArchiveTemplate, { "posts": posts, "title": "Nuestro Blog", "description": "Historias, consejos y recetas desde el coraz\xF3n de la naturaleza." })} ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/contenido/index.astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/contenido/index.astro";
const $$url = "/contenido";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
