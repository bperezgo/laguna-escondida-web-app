// src/types/reserva.ts

export type EventType =
  | 'boda'
  | 'quinceanos'
  | 'cumpleanos'
  | 'corporativo'
  | 'graduacion'
  | 'otro';

export type PackageId = 'basico' | 'estandar' | 'premium' | 'exclusivo';

export interface Addon {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Package {
  id: PackageId;
  name: string;
  basePrice: number;
  maxGuests: number;
  features: string[];
  addons?: Addon[];
}

export interface PricingBreakdown {
  basePrice: number;
  addonsTotal: number;
  guestSurcharge: number;
  total: number;
  currency: string;
}

export interface ReservationData {
  // Step 1: Event info
  eventType: EventType;
  eventDate: string;         // ISO date string
  guestCount: number;
  package: PackageId;

  // Step 2: Customization
  addons: string[];          // Addon IDs
  specialRequests?: string;
  cateringNeeded: boolean;
  decorationNeeded: boolean;

  // Step 3: Contact info
  fullName: string;
  email: string;
  phone: string;
  city?: string;
}

export interface ReservationResult {
  success: boolean;
  reservationId?: string;
  pricing?: PricingBreakdown;
  errors?: Record<string, string>;
}

export interface SavedReservation extends ReservationData {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  pricing: PricingBreakdown;
  createdAt: string;
  updatedAt: string;
}
