import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, s as spreadAttributes, k as renderComponent, l as renderScript, n as renderSlot, u as unescapeHTML } from '../../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$ContenidoLayout } from '../../chunks/ContenidoLayout_BfZvVQHV.mjs';
import { $ as $$Badge } from '../../chunks/Badge_DmiDjQWw.mjs';
import 'clsx';
import { $ as $$Button } from '../../chunks/Footer_DqrnOMUS.mjs';
import { f as formatDate } from '../../chunks/formatters_DESIZgzx.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$5 = createAstro("https://lagunaescondida.com");
const $$SocialShare = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SocialShare;
  const {
    url = Astro2.url.href,
    title = "Laguna Escondida",
    class: className = ""
  } = Astro2.props;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-green-500 hover:bg-green-600",
      icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-blue-600 hover:bg-blue-700",
      icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex items-center gap-2 ${className}`, "class")}> <span class="text-sm text-gray-500">Compartir:</span> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`Compartir en ${link.label}`, "aria-label")}${addAttribute(`inline-flex items-center justify-center w-8 h-8 rounded-full text-white transition-colors ${link.color}`, "class")}> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <path${addAttribute(link.icon, "d")}></path> </svg> </a>`)} </div>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/molecules/SocialShare.astro", void 0);

const $$Astro$4 = createAstro("https://lagunaescondida.com");
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Input;
  const {
    id,
    name,
    type = "text",
    value,
    placeholder,
    required = false,
    disabled = false,
    readonly = false,
    class: className = "",
    ...rest
  } = Astro2.props;
  const base = "w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-gray-800 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed";
  const classes = [base, className].filter(Boolean).join(" ");
  return renderTemplate`${maybeRenderHead()}<input${addAttribute(id, "id")}${addAttribute(name, "name")}${addAttribute(type, "type")}${addAttribute(value, "value")}${addAttribute(placeholder, "placeholder")}${addAttribute(required, "required")}${addAttribute(disabled, "disabled")}${addAttribute(readonly, "readonly")}${addAttribute(classes, "class")}${spreadAttributes(rest)}>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/atoms/Input.astro", void 0);

const $$Astro$3 = createAstro("https://lagunaescondida.com");
const $$Select = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Select;
  const {
    id,
    name,
    options,
    value,
    placeholder = "Selecciona una opci\xF3n",
    required = false,
    disabled = false,
    class: className = "",
    ...rest
  } = Astro2.props;
  const base = "w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-gray-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed appearance-none";
  const classes = [base, className].filter(Boolean).join(" ");
  return renderTemplate`${maybeRenderHead()}<div class="relative"> <select${addAttribute(id, "id")}${addAttribute(name, "name")}${addAttribute(required, "required")}${addAttribute(disabled, "disabled")}${addAttribute(classes, "class")}${spreadAttributes(rest)}> <option value="" disabled${addAttribute(!value, "selected")}>${placeholder}</option> ${options.map((opt) => renderTemplate`<option${addAttribute(opt.value, "value")}${addAttribute(opt.value === value, "selected")}> ${opt.label} </option>`)} </select> <!-- Chevron icon --> <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center"> <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </div> </div>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/atoms/Select.astro", void 0);

const $$Astro$2 = createAstro("https://lagunaescondida.com");
const $$FormField = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FormField;
  const {
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    error,
    helpText,
    class: className = "",
    value,
    options,
    rows = 4
  } = Astro2.props;
  const id = `field-${name}`;
  const isSelect = type === "select";
  const isTextarea = type === "textarea";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-1.5 ${className}`, "class")}> <label${addAttribute(id, "for")} class="text-sm font-medium text-gray-700"> ${label} ${required && renderTemplate`<span class="text-red-500 ml-0.5">*</span>`} </label> ${isSelect && options ? renderTemplate`${renderComponent($$result, "Select", $$Select, { "id": id, "name": name, "options": options, "value": String(value ?? ""), "placeholder": placeholder, "required": required, "class": error ? "border-red-500 focus:ring-red-500" : "", "aria-invalid": error ? "true" : "false", "aria-describedby": error ? `${id}-error` : helpText ? `${id}-help` : void 0 })}` : isTextarea ? renderTemplate`<textarea${addAttribute(id, "id")}${addAttribute(name, "name")}${addAttribute(rows, "rows")}${addAttribute(placeholder, "placeholder")}${addAttribute(required, "required")}${addAttribute([
    "w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-gray-800 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y",
    error ? "border-red-500 focus:ring-red-500" : ""
  ].join(" "), "class")}${addAttribute(error ? "true" : "false", "aria-invalid")}${addAttribute(error ? `${id}-error` : helpText ? `${id}-help` : void 0, "aria-describedby")}>${value}</textarea>` : renderTemplate`${renderComponent($$result, "Input", $$Input, { "id": id, "name": name, "type": type, "value": value, "placeholder": placeholder, "required": required, "class": error ? "border-red-500 focus:ring-red-500" : "", "aria-invalid": error ? "true" : "false", "aria-describedby": error ? `${id}-error` : helpText ? `${id}-help` : void 0 })}`} ${helpText && !error && renderTemplate`<p${addAttribute(`${id}-help`, "id")} class="text-xs text-gray-500">${helpText}</p>`} ${error && renderTemplate`<p${addAttribute(`${id}-error`, "id")} class="text-xs text-red-600" role="alert">${error}</p>`} </div>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/molecules/FormField.astro", void 0);

const $$NewsletterBox = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-neutral-100 rounded-2xl p-8 border-2 border-neutral-200"> <div class="max-w-md mx-auto text-center"> <h3 class="font-heading text-2xl text-gray-800 mb-3">
Recibe Contenido Exclusivo
</h3> <p class="text-gray-600 mb-8">
Tips de pesca, recetas del lago y ofertas especiales directo a tu inbox.
      Sin spam, lo prometemos.
</p> <form id="newsletter-form" class="flex flex-col gap-4" novalidate> ${renderComponent($$result, "FormField", $$FormField, { "label": "Tu email", "name": "email", "type": "email", "placeholder": "tu@email.com", "required": true })} ${renderComponent($$result, "Button", $$Button, { "type": "submit", "variant": "primary", "size": "lg", "class": "w-full", "data-analytics-event": "newsletter_subscribe" }, { "default": async ($$result2) => renderTemplate`
Suscribirme Gratis
` })} <p class="text-xs text-gray-500">
Al suscribirte aceptas nuestra
<a href="/privacidad" class="underline hover:text-gray-700">política de privacidad</a>.
</p> </form> <div id="newsletter-success" class="hidden mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
¡Listo! Revisa tu email para confirmar la suscripción.
</div> <div id="newsletter-error" class="hidden mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
Algo salió mal. Intenta de nuevo o escríbenos directamente.
</div> </div> </div> ${renderScript($$result, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/NewsletterBox.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/NewsletterBox.astro", void 0);

const $$Astro$1 = createAstro("https://lagunaescondida.com");
const $$PostTemplate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostTemplate;
  const { post } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="section"> <div class="container max-w-3xl"> <!-- Header --> <header class="mb-10"> <div class="flex items-center gap-3 mb-6"> ${renderComponent($$result, "Badge", $$Badge, { "variant": "primary" }, { "default": ($$result2) => renderTemplate`${post.category.name}` })} ${post.readingTime && renderTemplate`<span class="text-sm text-gray-500">${post.readingTime} min de lectura</span>`} </div> <h1 class="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"> ${post.title} </h1> <p class="text-xl text-gray-600 leading-relaxed mb-8">${post.excerpt}</p> <!-- Author + date --> <div class="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-neutral-200"> <div class="flex items-center gap-3"> ${post.author.avatar ? renderTemplate`<img${addAttribute(post.author.avatar, "src")}${addAttribute(post.author.name, "alt")} class="w-10 h-10 rounded-full object-cover">` : renderTemplate`<div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold"> ${post.author.name[0]} </div>`} <div> <p class="text-sm font-medium text-gray-800">${post.author.name}</p> <p class="text-xs text-gray-500"> ${formatDate(post.publishedAt)} </p> </div> </div> ${renderComponent($$result, "SocialShare", $$SocialShare, { "title": post.title })} </div> </header> <!-- Cover image --> ${post.coverImage && renderTemplate`<div class="rounded-2xl overflow-hidden mb-10 aspect-video"> <img${addAttribute(post.coverImage, "src")}${addAttribute(post.title, "alt")} class="w-full h-full object-cover" loading="eager"> </div>`} <!-- Content --> <div class="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-primary-600"> ${renderSlot($$result, $$slots["default"])} </div> <!-- Footer tags --> ${post.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mt-10 pt-8 border-t border-neutral-200"> ${post.tags.map((tag) => renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": "neutral", "size": "sm" }, { "default": ($$result2) => renderTemplate`#${tag}` })}`)} </div>`} <!-- Share bottom --> <div class="mt-8"> ${renderComponent($$result, "SocialShare", $$SocialShare, { "title": post.title })} </div> </div> </article> <!-- Newsletter --> <section class="section-sm bg-neutral-100"> <div class="container max-w-2xl"> ${renderComponent($$result, "NewsletterBox", $$NewsletterBox, {})} </div> </section>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/templates/blog/PostTemplate.astro", void 0);

const $$Astro = createAstro("https://lagunaescondida.com");
async function getStaticPaths() {
  const placeholderPosts = [
    { slug: "mejores-spots-pesca" },
    { slug: "boda-perfecta-naturaleza" },
    { slug: "receta-trucha-ajillo" }
  ];
  return placeholderPosts.map((p) => ({ params: { slug: p.slug } }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = {
    id: "1",
    title: "Art\xEDculo de ejemplo",
    slug,
    excerpt: "Este art\xEDculo se cargar\xE1 desde Strapi CMS una vez que est\xE9 configurado.",
    content: "<p>Contenido del art\xEDculo aqu\xED...</p>",
    author: { id: "1", name: "Equipo Laguna Escondida" },
    category: { id: "1", name: "General", slug: "general" },
    tags: [],
    publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
    readingTime: 5
  };
  if (!post) {
    return Astro2.redirect("/contenido");
  }
  return renderTemplate`${renderComponent($$result, "ContenidoLayout", $$ContenidoLayout, { "title": post.title, "description": post.excerpt, "image": post.coverImage, "showSidebar": false }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PostTemplate", $$PostTemplate, { "post": post }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div>${unescapeHTML(post.content)}</div> ` })} ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/contenido/[slug].astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/contenido/[slug].astro";
const $$url = "/contenido/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
