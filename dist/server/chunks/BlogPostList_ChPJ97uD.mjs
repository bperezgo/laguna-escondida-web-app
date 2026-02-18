import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as renderSlot } from './astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$Badge } from './Badge_DmiDjQWw.mjs';
import { f as formatDate } from './formatters_DESIZgzx.mjs';

const $$Astro$1 = createAstro("https://lagunaescondida.com");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Card;
  const {
    title,
    description,
    image,
    imageAlt = title,
    href,
    badge,
    class: className = "",
    horizontal = false
  } = Astro2.props;
  const Tag = href ? "a" : "div";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "href": href, "class": [
    "group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-250",
    horizontal ? "flex flex-col sm:flex-row" : "flex flex-col",
    href ? "cursor-pointer" : "",
    className
  ].join(" ") }, { "default": ($$result2) => renderTemplate`${image && renderTemplate`${maybeRenderHead()}<div${addAttribute([
    "overflow-hidden",
    horizontal ? "sm:w-2/5 flex-shrink-0" : "aspect-video"
  ].join(" "), "class")}> <img${addAttribute(image, "src")}${addAttribute(imageAlt, "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> </div>`}<div class="flex flex-col gap-3 p-5 flex-1"> ${badge && renderTemplate`<div> ${renderComponent($$result2, "Badge", $$Badge, { "variant": "primary", "size": "sm" }, { "default": ($$result3) => renderTemplate`${badge}` })} </div>`} <h3 class="font-heading text-xl font-semibold text-gray-800 group-hover:text-primary-600 transition-colors"> ${title} </h3> ${description && renderTemplate`<p class="text-gray-600 text-sm leading-relaxed">${description}</p>`} ${renderSlot($$result2, $$slots["default"])} </div> ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/molecules/Card.astro", void 0);

const $$Astro = createAstro("https://lagunaescondida.com");
const $$BlogPostList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPostList;
  const { posts, class: className = "", columns = 3 } = Astro2.props;
  const gridClass = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return renderTemplate`${posts.length === 0 ? renderTemplate`${maybeRenderHead()}<div class="text-center py-16 text-gray-500"><p class="text-lg">No hay publicaciones en esta categoría todavía.</p><p class="text-sm mt-2">Vuelve pronto para nuevo contenido.</p></div>` : renderTemplate`<div${addAttribute(`grid ${gridClass} gap-6 ${className}`, "class")}>${posts.map((post) => renderTemplate`<article>${renderComponent($$result, "Card", $$Card, { "title": post.title, "description": post.excerpt, "image": post.coverImage, "imageAlt": post.title, "href": `/contenido/${post.slug}`, "badge": post.category.name }, { "default": ($$result2) => renderTemplate`<div class="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100 text-xs text-gray-500"><span>${formatDate(post.publishedAt, { month: "short", day: "numeric", year: "numeric" })}</span>${post.readingTime && renderTemplate`<span>${post.readingTime} min de lectura</span>`}</div>` })}</article>`)}</div>`}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/BlogPostList.astro", void 0);

export { $$BlogPostList as $ };
