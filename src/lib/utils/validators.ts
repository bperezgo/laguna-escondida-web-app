// src/lib/utils/validators.ts

export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  // Accepts Colombian and international formats: +57 300 000 0000, 3001234567, etc.
  const re = /^(\+?[0-9]{1,3})?[\s.-]?(\(?[0-9]{1,4}\)?[\s.-]?){2,4}[0-9]{1,4}$/;
  return re.test(phone.replace(/\s/g, ''));
}

export function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

export function isFutureDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
