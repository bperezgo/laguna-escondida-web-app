import { i as isValidEmail } from '../../chunks/validators_CisXctbl.mjs';
export { renderers } from '../../renderers.mjs';

async function subscribeToNewsletter(email) {
  if (!isValidEmail(email)) {
    return { success: false, error: "Email inválido" };
  }
  {
    console.warn("[newsletter] ConvertKit credentials not configured");
    return { success: false, error: "Servicio de newsletter no configurado" };
  }
}

const POST = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email requerido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await subscribeToNewsletter(email);
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/newsletter] Error:", message);
    return new Response(JSON.stringify({ error: "Error del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
