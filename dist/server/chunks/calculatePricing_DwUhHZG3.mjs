import { a as isRequired, i as isValidEmail, b as isValidPhone } from './validators_CisXctbl.mjs';
import { M as MIN_GUESTS, a as MAX_GUESTS, P as PACKAGES, A as ADDONS } from './constants_wmFtMecp.mjs';

function validateReservationForm(data) {
  const errors = {};
  if (!isRequired(data.eventType)) {
    errors.eventType = "Selecciona el tipo de evento";
  }
  if (!isRequired(data.eventDate)) {
    errors.eventDate = "Selecciona una fecha para el evento";
  } else {
    const date = new Date(data.eventDate);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (date <= today) {
      errors.eventDate = "La fecha debe ser futura";
    }
  }
  if (!data.guestCount || data.guestCount < MIN_GUESTS) {
    errors.guestCount = `Mínimo ${MIN_GUESTS} invitados`;
  }
  if (data.guestCount && data.guestCount > MAX_GUESTS) {
    errors.guestCount = `Máximo ${MAX_GUESTS} invitados`;
  }
  if (!isRequired(data.package)) {
    errors.package = "Selecciona un paquete";
  }
  if (!isRequired(data.fullName)) {
    errors.fullName = "Tu nombre es requerido";
  }
  if (!isRequired(data.email)) {
    errors.email = "Tu email es requerido";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Ingresa un email válido";
  }
  if (!isRequired(data.phone)) {
    errors.phone = "Tu teléfono es requerido";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Ingresa un teléfono válido";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function calculatePricing(input) {
  const packageDef = PACKAGES.find((p) => p.id === input.package);
  if (!packageDef) {
    throw new Error(`Unknown package: ${input.package}`);
  }
  const basePrice = packageDef.basePrice;
  const includedGuests = packageDef.maxGuests;
  const extraGuests = Math.max(0, input.guestCount - includedGuests);
  const guestSurcharge = extraGuests * 15e3;
  const addonsTotal = input.addons.reduce((sum, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    return sum + (addon?.price ?? 0);
  }, 0);
  const total = basePrice + guestSurcharge + addonsTotal;
  return {
    basePrice,
    guestSurcharge,
    addonsTotal,
    total,
    currency: "COP"
  };
}

export { calculatePricing as c, validateReservationForm as v };
