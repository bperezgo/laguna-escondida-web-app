import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$ContenidoLayout } from '../../../chunks/ContenidoLayout_BfZvVQHV.mjs';
import { $ as $$ArchiveTemplate } from '../../../chunks/ArchiveTemplate_Du0lPvS7.mjs';
import { B as BLOG_CATEGORIES } from '../../../chunks/constants_wmFtMecp.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
async function getStaticPaths() {
  return BLOG_CATEGORIES.map((cat) => ({
    params: { slug: cat.slug },
    props: { category: cat }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { category } = Astro2.props;
  const posts = [];
  return renderTemplate`${renderComponent($$result, "ContenidoLayout", $$ContenidoLayout, { "title": `${category.label} | Blog`, "description": `Art\xEDculos sobre ${category.label.toLowerCase()} en Laguna Escondida.` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArchiveTemplate", $$ArchiveTemplate, { "posts": posts, "title": category.label, "description": `Todo sobre ${category.label.toLowerCase()} en Laguna Escondida.`, "activeCategory": slug })} ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/contenido/categoria/[slug].astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/contenido/categoria/[slug].astro";
const $$url = "/contenido/categoria/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
