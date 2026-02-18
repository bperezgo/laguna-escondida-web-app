import { f as createComponent, r as renderTemplate, e as createAstro, l as renderScript, h as addAttribute, k as renderComponent, p as renderHead, n as renderSlot, m as maybeRenderHead } from './astro/server_BBC2-64G.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';
import { A as ANALYTICS } from './analytics_CPiA-xAy.mjs';

const SITE = {
  name: "Laguna Escondida",
  tagline: "El lugar perfecto para tus momentos especiales",
  description: "Laguna Escondida es el destino ideal para eventos sociales y corporativos en contacto con la naturaleza. Bodas, quinceaños, cumpleaños y más.",
  url: "https://lagunaescondida.com",
  email: "info@lagunaescondida.com",
  phone: "+57 300 000 0000",
  whatsapp: "+573000000000",
  address: "Vereda La Laguna, Colombia",
  social: {
    instagram: "https://instagram.com/lagunaescondida",
    facebook: "https://facebook.com/lagunaescondida"},
  openGraph: {
    image: "/images/og-image.jpg",
    type: "website",
    locale: "es_CO"
  }
};

const $$GoogleAnalytics = createComponent(($$result, $$props, $$slots) => {
  const { ga4MeasurementId } = ANALYTICS;
  const enabled = ga4MeasurementId;
  return renderTemplate`${enabled}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/widgets/Analytics/GoogleAnalytics.astro", void 0);

const $$Astro$4 = createAstro("https://lagunaescondida.com");
const $$CustomTracker = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CustomTracker;
  return renderTemplate`${renderScript($$result, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/widgets/Analytics/CustomTracker.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/widgets/Analytics/CustomTracker.astro", void 0);

const $$Astro$3 = createAstro("https://lagunaescondida.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = SITE.description,
    image = SITE.openGraph.image,
    noindex = false,
    class: className = ""
  } = Astro2.props;
  const pageTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const canonicalUrl = new URL(Astro2.url.pathname, SITE.url).toString();
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- SEO --><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}>${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<!-- Open Graph --><meta property="og:type"${addAttribute(SITE.openGraph.type, "content")}><meta property="og:locale"${addAttribute(SITE.openGraph.locale, "content")}><meta property="og:site_name"${addAttribute(SITE.name, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(new URL(image, SITE.url).toString(), "content")}><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(new URL(image, SITE.url).toString(), "content")}><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- Preconnect for Google Fonts (loaded in typography.css) --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Analytics (GA4 — only in production) -->${renderComponent($$result, "GoogleAnalytics", $$GoogleAnalytics, {})}${renderHead()}</head> <body${addAttribute(className, "class")}> ${renderSlot($$result, $$slots["default"])} <!-- Custom tracker (exposes window.trackEvent) --> ${renderComponent($$result, "CustomTracker", $$CustomTracker, {})} </body></html>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/layouts/BaseLayout.astro", void 0);

const $$Astro$2 = createAstro("https://lagunaescondida.com");
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href, class: className = "", active } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const isActive = active ?? (currentPath === href || href !== "/" && currentPath.startsWith(href));
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    "text-sm font-medium transition-colors duration-150 px-3 py-2 rounded-md",
    isActive ? "text-primary-600 bg-primary-50" : "text-gray-700 hover:text-primary-600 hover:bg-primary-50",
    className
  ].join(" "), "class")}${addAttribute(isActive ? "page" : void 0, "aria-current")}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/molecules/NavLink.astro", void 0);

const $$Astro$1 = createAstro("https://lagunaescondida.com");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "primary",
    size = "md",
    href,
    type = "button",
    class: className = "",
    disabled = false,
    "data-analytics-event": analyticsEvent,
    ...rest
  } = Astro2.props;
  const variantClasses = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-md hover:shadow-lg",
    secondary: "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-md",
    accent: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-md hover:shadow-lg",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
    ghost: "text-primary-500 hover:bg-primary-50 active:bg-primary-100"
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-base gap-2",
    lg: "px-7 py-3.5 text-lg gap-2.5"
  };
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-250 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const classes = [base, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(" ");
  const Tag = href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "href": href, "type": !href ? type : void 0, "class": classes, "disabled": disabled || void 0, "data-analytics-event": analyticsEvent, ...rest }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} ${renderScript($$result, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/atoms/Button.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/atoms/Button.astro", void 0);

const MAIN_NAV = [
  {
    label: "Inicio",
    href: "/"
  },
  {
    label: "Reservas",
    href: "/reservas",
    children: [
      { label: "Eventos", href: "/reservas" },
      { label: "Galería", href: "/reservas/galeria" },
      { label: "Paquetes", href: "/reservas/paquetes" },
      { label: "Reservar Ahora", href: "/reservas/formulario" }
    ]
  },
  {
    label: "Blog",
    href: "/contenido"
  }
];
const FOOTER_NAV = {
  reservas: [
    { label: "Tipos de Eventos", href: "/reservas" },
    { label: "Galería de Fotos", href: "/reservas/galeria" },
    { label: "Paquetes y Precios", href: "/reservas/paquetes" },
    { label: "Hacer una Reserva", href: "/reservas/formulario" }
  ],
  contenido: [
    { label: "Blog", href: "/contenido" },
    { label: "Tips de Pesca", href: "/contenido/categoria/pesca" },
    { label: "Recetas", href: "/contenido/categoria/recetas" },
    { label: "Naturaleza", href: "/contenido/categoria/naturaleza" }
  ],
  legal: [
    { label: "Términos y Condiciones", href: "/terminos" },
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Política de Cancelación", href: "/cancelacion" }
  ]
};

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 left-0 right-0 z-[1030] bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm" id="main-navbar"> <nav class="container flex items-center justify-between h-16"> <!-- Logo --> <a href="/" class="flex items-center gap-2 font-heading text-xl font-bold text-primary-600"> <span class="text-2xl">🌿</span> <span>${SITE.name}</span> </a> <!-- Desktop nav --> <ul class="hidden md:flex items-center gap-1"> ${MAIN_NAV.map((item) => renderTemplate`<li> ${renderComponent($$result, "NavLink", $$NavLink, { "href": item.href }, { "default": ($$result2) => renderTemplate`${item.label}` })} </li>`)} </ul> <!-- CTA + hamburger --> <div class="flex items-center gap-3"> ${renderComponent($$result, "Button", $$Button, { "href": "/reservas/formulario", "variant": "primary", "size": "sm", "class": "hidden sm:inline-flex", "data-analytics-event": "navbar_cta_click" }, { "default": ($$result2) => renderTemplate`
Reservar
` })} <button id="nav-toggle" class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-neutral-100 transition-colors" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" id="icon-menu" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 hidden" id="icon-close" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </nav> <!-- Mobile menu --> <div id="mobile-menu" class="md:hidden hidden border-t border-neutral-200 bg-white"> <ul class="container py-4 flex flex-col gap-1"> ${MAIN_NAV.map((item) => renderTemplate`<li> ${renderComponent($$result, "NavLink", $$NavLink, { "href": item.href, "class": "block w-full" }, { "default": ($$result2) => renderTemplate`${item.label}` })} </li>`)} <li class="pt-2"> ${renderComponent($$result, "Button", $$Button, { "href": "/reservas/formulario", "variant": "primary", "size": "md", "class": "w-full" }, { "default": ($$result2) => renderTemplate`
Reservar Ahora
` })} </li> </ul> </div> </header> <!-- Spacer for fixed navbar --> <div class="h-16"></div> ${renderScript($$result, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/Navbar.astro", void 0);

const $$Astro = createAstro("https://lagunaescondida.com");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Icon;
  const { name, size = 24, class: className = "", "aria-hidden": ariaHidden = true } = Astro2.props;
  const paths = {
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "M6 18L18 6M6 6l12 12",
    check: "M5 13l4 4L19 7",
    "arrow-right": "M9 5l7 7-7 7",
    "arrow-left": "M15 19l-7-7 7-7",
    "chevron-down": "M19 9l-7 7-7-7",
    "chevron-up": "M5 15l7-7 7 7",
    instagram: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 20.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8",
    location: "M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 110 8 4 4 0 010-8z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    photo: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    share: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
  };
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${addAttribute(className, "class")}${addAttribute(ariaHidden, "aria-hidden")}> <path${addAttribute(paths[name], "d")}></path> </svg>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/atoms/Icon.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-primary-900 text-neutral-200"> <div class="container py-16"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"> <!-- Brand --> <div class="lg:col-span-1"> <a href="/" class="flex items-center gap-2 font-heading text-xl font-bold text-white mb-4"> <span class="text-2xl">🌿</span> <span>${SITE.name}</span> </a> <p class="text-sm text-neutral-400 leading-relaxed mb-6"> ${SITE.tagline} </p> <!-- Social icons --> <div class="flex items-center gap-3"> <a${addAttribute(SITE.social.instagram, "href")} target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"> ${renderComponent($$result, "Icon", $$Icon, { "name": "instagram", "size": 18 })} </a> <a${addAttribute(SITE.social.facebook, "href")} target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"> ${renderComponent($$result, "Icon", $$Icon, { "name": "facebook", "size": 18 })} </a> <a${addAttribute(`https://wa.me/${SITE.whatsapp}`, "href")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"> ${renderComponent($$result, "Icon", $$Icon, { "name": "whatsapp", "size": 18 })} </a> </div> </div> <!-- Reservas links --> <div> <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Reservas</h4> <ul class="space-y-2"> ${FOOTER_NAV.reservas.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-sm text-neutral-400 hover:text-white transition-colors"> ${link.label} </a> </li>`)} </ul> </div> <!-- Contenido links --> <div> <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contenido</h4> <ul class="space-y-2"> ${FOOTER_NAV.contenido.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-sm text-neutral-400 hover:text-white transition-colors"> ${link.label} </a> </li>`)} </ul> </div> <!-- Contact info --> <div> <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4> <ul class="space-y-3"> <li class="flex items-center gap-2 text-sm text-neutral-400"> ${renderComponent($$result, "Icon", $$Icon, { "name": "phone", "size": 16 })} <a${addAttribute(`tel:${SITE.phone}`, "href")} class="hover:text-white transition-colors">${SITE.phone}</a> </li> <li class="flex items-center gap-2 text-sm text-neutral-400"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mail", "size": 16 })} <a${addAttribute(`mailto:${SITE.email}`, "href")} class="hover:text-white transition-colors">${SITE.email}</a> </li> <li class="flex items-start gap-2 text-sm text-neutral-400"> ${renderComponent($$result, "Icon", $$Icon, { "name": "location", "size": 16, "class": "mt-0.5 flex-shrink-0" })} <span>${SITE.address}</span> </li> </ul> </div> </div> </div> <!-- Bottom bar --> <div class="border-t border-white/10"> <div class="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4"> <p class="text-xs text-neutral-500">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${SITE.name}. Todos los derechos reservados.
</p> <ul class="flex items-center gap-4"> ${FOOTER_NAV.legal.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"> ${link.label} </a> </li>`)} </ul> </div> </div> </footer>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/organisms/Footer.astro", void 0);

export { $$Button as $, SITE as S, $$BaseLayout as a, $$Navbar as b, $$Footer as c };
