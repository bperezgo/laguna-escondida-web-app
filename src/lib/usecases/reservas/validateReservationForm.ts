// src/lib/usecases/reservas/validateReservationForm.ts

import type { ReservationData } from '@/types/reserva';
import { isValidEmail, isValidPhone, isRequired } from '@/lib/utils/validators';
import { MAX_GUESTS, MIN_GUESTS } from '@/lib/utils/constants';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateReservationForm(data: Partial<ReservationData>): ValidationResult {
  const errors: Record<string, string> = {};

  // Step 1: Event info
  if (!isRequired(data.eventType)) {
    errors.eventType = 'Selecciona el tipo de evento';
  }
  if (!isRequired(data.eventDate)) {
    errors.eventDate = 'Selecciona una fecha para el evento';
  } else {
    const date = new Date(data.eventDate!);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date <= today) {
      errors.eventDate = 'La fecha debe ser futura';
    }
  }
  if (!data.guestCount || data.guestCount < MIN_GUESTS) {
    errors.guestCount = `Mínimo ${MIN_GUESTS} invitados`;
  }
  if (data.guestCount && data.guestCount > MAX_GUESTS) {
    errors.guestCount = `Máximo ${MAX_GUESTS} invitados`;
  }
  if (!isRequired(data.package)) {
    errors.package = 'Selecciona un paquete';
  }

  // Step 3: Contact info
  if (!isRequired(data.fullName)) {
    errors.fullName = 'Tu nombre es requerido';
  }
  if (!isRequired(data.email)) {
    errors.email = 'Tu email es requerido';
  } else if (!isValidEmail(data.email!)) {
    errors.email = 'Ingresa un email válido';
  }
  if (!isRequired(data.phone)) {
    errors.phone = 'Tu teléfono es requerido';
  } else if (!isValidPhone(data.phone!)) {
    errors.phone = 'Ingresa un teléfono válido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
