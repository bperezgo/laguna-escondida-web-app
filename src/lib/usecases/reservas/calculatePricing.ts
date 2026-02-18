// src/lib/usecases/reservas/calculatePricing.ts

import type { PackageId, PricingBreakdown } from '@/types/reserva';
import { PACKAGES, ADDONS } from '@/lib/utils/constants';

interface PricingInput {
  package: PackageId;
  guestCount: number;
  addons: string[];
}

export function calculatePricing(input: PricingInput): PricingBreakdown {
  const packageDef = PACKAGES.find((p) => p.id === input.package);
  if (!packageDef) {
    throw new Error(`Unknown package: ${input.package}`);
  }

  const basePrice = packageDef.basePrice;

  // Guest surcharge: extra guests beyond the package's included count
  const includedGuests = packageDef.maxGuests;
  const extraGuests = Math.max(0, input.guestCount - includedGuests);
  const guestSurcharge = extraGuests * 15_000; // 15,000 COP per extra guest

  // Addons total
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
    currency: 'COP',
  };
}
