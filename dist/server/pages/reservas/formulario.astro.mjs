import { e as createAstro, f as createComponent, m as maybeRenderHead, k as renderComponent, o as Fragment, r as renderTemplate, n as renderSlot, h as addAttribute } from '../../chunks/astro/server_BBC2-64G.mjs';
import 'piccolore';
import { $ as $$ReservasLayout } from '../../chunks/ReservasLayout_D8hWYpkn.mjs';
import { jsxs, jsx, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { useState } from 'react';
import { E as EVENT_TYPES, P as PACKAGES, A as ADDONS } from '../../chunks/constants_wmFtMecp.mjs';
import { a as formatPrice } from '../../chunks/formatters_DESIZgzx.mjs';
import { c as calculatePricing, v as validateReservationForm } from '../../chunks/calculatePricing_DwUhHZG3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://lagunaescondida.com");
const $$FormTemplate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormTemplate;
  const {
    title = "Haz tu Reserva",
    description = "Completa el formulario y nos pondremos en contacto contigo a la brevedad."
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="section bg-neutral-100"> <div class="container max-w-3xl"> <!-- Page header --> <div class="text-center mb-10"> <p class="text-overline text-accent-500 mb-3">Paso a Paso</p> <h1 class="font-heading text-4xl text-gray-800 mb-4">${title}</h1> <p class="text-gray-600 max-w-xl mx-auto">${description}</p> </div> <!-- Funnel breadcrumb --> <nav aria-label="Pasos del proceso" class="mb-10"> <ol class="flex items-center justify-center gap-2 text-sm"> ${[
    { label: "Eventos", href: "/reservas" },
    { label: "Galer\xEDa", href: "/reservas/galeria" },
    { label: "Paquetes", href: "/reservas/paquetes" },
    { label: "Reserva", href: "/reservas/formulario" }
  ].map((step, i, arr) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <li> <a${addAttribute(step.href, "href")} class="text-gray-500 hover:text-primary-600 transition-colors"> ${step.label} </a> </li> ${i < arr.length - 1 && renderTemplate`<li aria-hidden="true" class="text-gray-300">›</li>`}` })}`)} </ol> </nav> <!-- Form content slot --> <div class="bg-white rounded-2xl shadow-md p-6 md:p-10"> ${renderSlot($$result, $$slots["default"])} </div> </div> </section>`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/components/templates/reservas/FormTemplate.astro", void 0);

function ProgressBar({ currentStep, totalSteps, labels }) {
  const percent = Math.round((currentStep - 1) / (totalSteps - 1) * 100);
  return /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
    labels && /* @__PURE__ */ jsx("div", { className: "flex justify-between mb-3", children: labels.map((label, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: `text-xs font-medium ${i + 1 <= currentStep ? "text-primary-600" : "text-gray-400"}`,
        children: label
      },
      label
    )) }),
    /* @__PURE__ */ jsx("div", { className: "h-2 bg-neutral-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-primary-500 rounded-full transition-all duration-500",
        style: { width: `${percent}%` },
        role: "progressbar",
        "aria-valuenow": currentStep,
        "aria-valuemin": 1,
        "aria-valuemax": totalSteps
      }
    ) }),
    /* @__PURE__ */ jsxs("p", { className: "text-right text-xs text-gray-500 mt-1", children: [
      "Paso ",
      currentStep,
      " de ",
      totalSteps
    ] })
  ] });
}

function EventInfoStep({ data, errors, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-semibold text-gray-800 mb-1", children: "Información del Evento" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Cuéntanos sobre tu celebración" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium text-gray-700", children: [
        "Tipo de Evento ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: EVENT_TYPES.map((et) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange("eventType", et.value),
          className: [
            "py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all text-center",
            data.eventType === et.value ? "border-primary-500 bg-primary-50 text-primary-700" : "border-neutral-200 bg-white text-gray-700 hover:border-primary-300"
          ].join(" "),
          children: et.label
        },
        et.value
      )) }),
      errors.eventType && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600", children: errors.eventType })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: "eventDate", className: "text-sm font-medium text-gray-700", children: [
        "Fecha del Evento ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "eventDate",
          type: "date",
          value: data.eventDate ?? "",
          min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          onChange: (e) => onChange("eventDate", e.target.value),
          className: [
            "w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500",
            errors.eventDate ? "border-red-500" : "border-neutral-300"
          ].join(" ")
        }
      ),
      errors.eventDate && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600", children: errors.eventDate })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: "guestCount", className: "text-sm font-medium text-gray-700", children: [
        "Número de Invitados ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "guestCount",
          type: "number",
          min: 20,
          max: 500,
          value: data.guestCount ?? "",
          onChange: (e) => onChange("guestCount", Number(e.target.value)),
          placeholder: "Ej: 100",
          className: [
            "w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500",
            errors.guestCount ? "border-red-500" : "border-neutral-300"
          ].join(" ")
        }
      ),
      errors.guestCount && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600", children: errors.guestCount })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium text-gray-700", children: [
        "Paquete ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: PACKAGES.map((pkg) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange("package", pkg.id),
          className: [
            "p-4 rounded-xl border-2 text-left transition-all",
            data.package === pkg.id ? "border-primary-500 bg-primary-50" : "border-neutral-200 bg-white hover:border-primary-300"
          ].join(" "),
          children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: pkg.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-0.5", children: [
              "Hasta ",
              pkg.maxGuests,
              " invitados"
            ] })
          ]
        },
        pkg.id
      )) }),
      errors.package && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600", children: errors.package })
    ] })
  ] });
}

function CustomizationStep({ data, errors, onChange }) {
  const selectedAddons = data.addons ?? [];
  function toggleAddon(addonId) {
    const next = selectedAddons.includes(addonId) ? selectedAddons.filter((id) => id !== addonId) : [...selectedAddons, addonId];
    onChange("addons", next);
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-semibold text-gray-800 mb-1", children: "Personaliza tu Evento" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Agrega servicios adicionales a tu paquete (opcional)" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: ADDONS.map((addon) => {
      const isSelected = selectedAddons.includes(addon.id);
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => toggleAddon(addon.id),
          className: [
            "flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all",
            isSelected ? "border-primary-500 bg-primary-50" : "border-neutral-200 bg-white hover:border-primary-300"
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-800 text-sm", children: addon.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-primary-600 font-semibold mt-0.5", children: [
                "+ ",
                formatPrice(addon.price)
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: [
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  isSelected ? "border-primary-500 bg-primary-500" : "border-neutral-300"
                ].join(" "),
                children: isSelected && /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-white", fill: "none", stroke: "currentColor", strokeWidth: 3, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) })
              }
            )
          ]
        },
        addon.id
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "specialRequests", className: "text-sm font-medium text-gray-700", children: "Solicitudes Especiales (opcional)" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "specialRequests",
          rows: 4,
          value: data.specialRequests ?? "",
          onChange: (e) => onChange("specialRequests", e.target.value),
          placeholder: "¿Tienes alguna solicitud especial para tu evento? Cuéntanos...",
          className: "w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-gray-800 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: [
      { field: "cateringNeeded", label: "Necesito servicio de catering" },
      { field: "decorationNeeded", label: "Necesito servicio de decoración" }
    ].map(({ field, label }) => {
      const key = field;
      return /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only",
              checked: data[key] ?? false,
              onChange: (e) => onChange(key, e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: [
                "w-10 h-6 rounded-full transition-colors",
                data[key] ? "bg-primary-500" : "bg-neutral-300"
              ].join(" ")
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: [
                "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform",
                data[key] ? "translate-x-5" : "translate-x-1"
              ].join(" ")
            }
          )
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: label })
      ] }, field);
    }) })
  ] });
}

function ContactStep({ data, errors, onChange, pricing }) {
  const fields = [
    { id: "fullName", label: "Nombre completo", type: "text", placeholder: "Tu nombre", required: true },
    { id: "email", label: "Correo electrónico", type: "email", placeholder: "tu@email.com", required: true },
    { id: "phone", label: "Teléfono / WhatsApp", type: "tel", placeholder: "+57 300 000 0000", required: true },
    { id: "city", label: "Ciudad", type: "text", placeholder: "Tu ciudad" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-semibold text-gray-800 mb-1", children: "Tus Datos de Contacto" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Nos comunicaremos contigo para confirmar tu reserva" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: fields.map((field) => /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-1.5 ${field.id === "fullName" ? "sm:col-span-2" : ""}`, children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: field.id, className: "text-sm font-medium text-gray-700", children: [
        field.label,
        field.required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: field.id,
          type: field.type,
          value: data[field.id] ?? "",
          onChange: (e) => onChange(field.id, e.target.value),
          placeholder: field.placeholder,
          className: [
            "w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500",
            errors[field.id] ? "border-red-500" : "border-neutral-300"
          ].join(" ")
        }
      ),
      errors[field.id] && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600", children: errors[field.id] })
    ] }, field.id)) }),
    pricing && /* @__PURE__ */ jsxs("div", { className: "mt-2 p-5 rounded-xl bg-neutral-50 border border-neutral-200", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-3", children: "Resumen de Cotización" }),
      /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-2 text-sm", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex justify-between text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { children: "Paquete base" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(pricing.basePrice) })
        ] }),
        pricing.guestSurcharge > 0 && /* @__PURE__ */ jsxs("li", { className: "flex justify-between text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { children: "Invitados adicionales" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(pricing.guestSurcharge) })
        ] }),
        pricing.addonsTotal > 0 && /* @__PURE__ */ jsxs("li", { className: "flex justify-between text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { children: "Servicios adicionales" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(pricing.addonsTotal) })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex justify-between font-semibold text-primary-700 pt-2 border-t border-neutral-200 mt-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Estimado" }),
          /* @__PURE__ */ jsxs("span", { children: [
            formatPrice(pricing.total),
            " ",
            pricing.currency
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-3", children: "* Precio referencial. El valor final se confirma tras revisión de disponibilidad." })
    ] })
  ] });
}

const STEP_LABELS = ["Tu Evento", "Personalizar", "Contacto"];
const TOTAL_STEPS = 3;
const STEP_FIELDS = {
  1: ["eventType", "eventDate", "guestCount", "package"],
  2: [],
  3: ["fullName", "email", "phone"]
};
function FormWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    addons: [],
    cateringNeeded: false,
    decorationNeeded: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  function handleChange(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }
  function validateCurrentStep() {
    const stepFields = STEP_FIELDS[step] ?? [];
    if (stepFields.length === 0) return true;
    const result = validateReservationForm(data);
    const stepErrors = {};
    stepFields.forEach((field) => {
      if (result.errors[field]) {
        stepErrors[field] = result.errors[field];
      }
    });
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }
    return true;
  }
  function handleNext() {
    if (!validateCurrentStep()) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    setServerError("");
    try {
      const response = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        if (window.trackEvent) {
          await window.trackEvent("reservation_created", {
            package: data.package,
            guestCount: data.guestCount
          });
        }
      } else {
        setErrors(result.errors ?? {});
        if (result.errors?.general) {
          setServerError(result.errors.general);
        }
      }
    } catch {
      setServerError("Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }
  const pricing = step === 3 && data.package && data.guestCount ? (() => {
    try {
      return calculatePricing({
        package: data.package,
        guestCount: data.guestCount,
        addons: data.addons ?? []
      });
    } catch {
      return void 0;
    }
  })() : void 0;
  if (submitted) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-10", children: [
      /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4", children: "🎉" }),
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl font-bold text-primary-700 mb-3", children: "¡Reserva Recibida!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mb-2", children: [
        "Gracias, ",
        /* @__PURE__ */ jsx("strong", { children: data.fullName }),
        ". Hemos recibido tu solicitud."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm mb-8", children: [
        "Te contactaremos en las próximas 24 horas a ",
        data.email,
        " o ",
        data.phone,
        "."
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors",
          children: "Volver al Inicio"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
    /* @__PURE__ */ jsx(ProgressBar, { currentStep: step, totalSteps: TOTAL_STEPS, labels: STEP_LABELS }),
    step === 1 && /* @__PURE__ */ jsx(EventInfoStep, { data, errors, onChange: handleChange }),
    step === 2 && /* @__PURE__ */ jsx(CustomizationStep, { data, errors, onChange: handleChange }),
    step === 3 && /* @__PURE__ */ jsx(ContactStep, { data, errors, onChange: handleChange, pricing }),
    serverError && /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm", children: serverError }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-8 pt-6 border-t border-neutral-200", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleBack,
          disabled: step === 1,
          className: "px-5 py-2.5 text-sm font-medium text-gray-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
          children: "← Atrás"
        }
      ),
      step < TOTAL_STEPS ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleNext,
          className: "px-6 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors",
          children: "Continuar →"
        }
      ) : /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: "px-6 py-2.5 text-sm font-medium text-white bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2",
          children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 animate-spin", viewBox: "0 0 24 24", fill: "none", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
            ] }),
            "Enviando..."
          ] }) : "Enviar Reserva"
        }
      )
    ] })
  ] });
}

const $$Formulario = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ReservasLayout", $$ReservasLayout, { "title": "Formulario de Reserva", "description": "Haz tu reserva en Laguna Escondida. Formulario simple, 3 pasos, sin compromiso." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "FormTemplate", $$FormTemplate, {}, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "FormWizard", FormWizard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/widgets/MultiStepForm/FormWizard", "client:component-export": "default" })} ` })} ` })}`;
}, "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/formulario.astro", void 0);

const $$file = "/Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/src/pages/reservas/formulario.astro";
const $$url = "/reservas/formulario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Formulario,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
