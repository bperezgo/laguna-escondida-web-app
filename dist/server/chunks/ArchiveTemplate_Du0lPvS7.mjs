import { e as createAstro, f as createComponent, m as maybeRenderHead, r as renderTemplate, h as addAttribute, k as renderComponent } from './astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$BlogPostList } from './BlogPostList_ChPJ97uD.mjs';
import { B as BLOG_CATEGORIES } from './constants_wmFtMecp.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$ArchiveTemplate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArchiveTemplate;
  const { posts, title, description, activeCategory } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="section"> <div class="container"> <!-- Header --> <div class="text-center mb-12"> <h1 class="font-heading text-4xl md:text-5xl text-gray-800 mb-4">${title}</h1> ${description && renderTemplate`<p class="text-lg text-gray-600 max-w-2xl mx-auto">${description}</p>`} </div> <!-- Category filter --> <nav aria-label="Categorías del blog" class="flex flex-wrap gap-2 justify-center mb-10"> <a href="/contenido"${addAttribute([
    "px-4 py-2 rounded-full text-sm font-medium transition-all",
    !activeCategory ? "bg-primary-500 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700"
  ].join(" "), "class")}>
Todos
</a> ${BLOG_CATEGORIES.map((cat) => renderTemplate`<a${addAttribute(`/contenido/categoria/${cat.slug}`, "href")}${addAttribute([
    "px-4 py-2 rounded-full text-sm font-medium transition-all",
    activeCategory === cat.slug ? "bg-primary-500 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700"
  ].join(" "), "class")}> ${cat.label} </a>`)} </nav> <!-- Posts grid --> ${renderComponent($$result, "BlogPostList", $$BlogPostList, { "posts": posts })} </div> </section>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/templates/blog/ArchiveTemplate.astro", void 0);

export { $$ArchiveTemplate as $ };
