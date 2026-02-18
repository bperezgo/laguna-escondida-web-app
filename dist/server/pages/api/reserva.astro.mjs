import { v as validateReservationForm, c as calculatePricing } from '../../chunks/calculatePricing_DwUhHZG3.mjs';
import { A as ANALYTICS } from '../../chunks/analytics_CPiA-xAy.mjs';
export { renderers } from '../../renderers.mjs';

async function sendConfirmationEmail(params) {
  {
    console.warn("[email] RESEND_API_KEY not set — skipping confirmation email");
    return;
  }
}

const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "";
class StrapiClient {
  baseURL;
  token;
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/api/${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...this.token ? { Authorization: `Bearer ${this.token}` } : {},
        ...options.headers
      }
    });
    if (!response.ok) {
      throw new Error(`Strapi error [${response.status}]: ${response.statusText}`);
    }
    return response.json();
  }
  async getBlogPosts(options = {}) {
    const params = new URLSearchParams();
    if (options.populate) params.append("populate", options.populate);
    if (options.sort) params.append("sort", options.sort);
    if (options.pagination) {
      params.append("pagination[page]", String(options.pagination.page));
      params.append("pagination[pageSize]", String(options.pagination.pageSize));
    }
    if (options.filters) {
      for (const [key, value] of Object.entries(options.filters)) {
        params.append(`filters[${key}]`, value);
      }
    }
    return this.request(`posts?${params.toString()}`);
  }
  async getPostBySlug(slug) {
    const response = await this.request(
      `posts?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data[0] ?? null;
  }
  async create(collection, data) {
    return this.request(`${collection}`, {
      method: "POST",
      body: JSON.stringify({ data })
    });
  }
  async update(collection, id, data) {
    return this.request(`${collection}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data })
    });
  }
  async delete(collection, id) {
    await this.request(`${collection}/${id}`, { method: "DELETE" });
  }
}
const strapi = new StrapiClient(STRAPI_URL, STRAPI_TOKEN);
async function saveToStrapi(collection, data) {
  return strapi.create(collection, data);
}

async function trackEvent(name, properties = {}) {
  const event = {
    name,
    properties,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (typeof window !== "undefined") {
    if (window.gtag) {
      window.gtag("event", name, properties);
    }
    if (window.fbq) {
      window.fbq("trackCustom", name, properties);
    }
  }
  await sendToCustomEndpoint(event);
}
async function sendToCustomEndpoint(event) {
  try {
    const baseUrl = typeof window !== "undefined" ? "" : "https://lagunaescondida.com";
    await fetch(`${baseUrl}${ANALYTICS.customEndpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });
  } catch {
  }
}

async function createReservation(data) {
  try {
    const validation = validateReservationForm(data);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    const pricing = calculatePricing({
      package: data.package,
      guestCount: data.guestCount,
      addons: data.addons
    });
    const savedReservation = await saveToStrapi("reservations", {
      ...data,
      pricing,
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const reservationId = String(savedReservation.id);
    await sendConfirmationEmail({
      to: data.email,
      reservationId,
      data: { ...data, pricing }
    });
    await trackEvent("reservation_created", {
      package: data.package,
      guestCount: data.guestCount,
      value: pricing.total,
      currency: pricing.currency
    });
    return { success: true, reservationId, pricing };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[createReservation] Error:", message);
    await trackEvent("reservation_error", {
      error: message,
      step: "creation"
    }).catch(() => {
    });
    return {
      success: false,
      errors: { general: "Ocurrió un error al procesar la reserva. Intenta de nuevo." }
    };
  }
}

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const result = await createReservation(data);
    if (!result.success) {
      return new Response(JSON.stringify(result), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/reserva] Error:", message);
    return new Response(
      JSON.stringify({ success: false, errors: { general: "Error del servidor" } }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
