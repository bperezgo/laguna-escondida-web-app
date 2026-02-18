import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, n as renderSlot, r as renderTemplate } from './astro/server_BBC2-64G.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Badge;
  const { variant = "primary", size = "md", class: className = "" } = Astro2.props;
  const variantClasses = {
    primary: "bg-primary-100 text-primary-700",
    secondary: "bg-secondary-100 text-secondary-700",
    accent: "bg-accent-100 text-accent-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    neutral: "bg-neutral-200 text-neutral-700"
  };
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  };
  const base = "inline-flex items-center gap-1 font-medium rounded-full";
  const classes = [base, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(" ");
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(classes, "class")}> ${renderSlot($$result, $$slots["default"])} </span>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/atoms/Badge.astro", void 0);

export { $$Badge as $ };
