// src/components/widgets/MultiStepForm/steps/CustomizationStep.tsx

import { ADDONS } from '@/lib/utils/constants';
import { formatPrice } from '@/lib/utils/formatters';
import type { ReservationData } from '@/types/reserva';

interface CustomizationStepProps {
  data: Partial<ReservationData>;
  errors: Record<string, string>;
  onChange: (field: keyof ReservationData, value: unknown) => void;
}

export default function CustomizationStep({ data, errors, onChange }: CustomizationStepProps) {
  const selectedAddons = data.addons ?? [];

  function toggleAddon(addonId: string) {
    const next = selectedAddons.includes(addonId)
      ? selectedAddons.filter((id) => id !== addonId)
      : [...selectedAddons, addonId];
    onChange('addons', next);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-gray-800 mb-1">
          Personaliza tu Evento
        </h2>
        <p className="text-gray-500 text-sm">Agrega servicios adicionales a tu paquete (opcional)</p>
      </div>

      {/* Addons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ADDONS.map((addon) => {
          const isSelected = selectedAddons.includes(addon.id);
          return (
            <button
              key={addon.id}
              type="button"
              onClick={() => toggleAddon(addon.id)}
              className={[
                'flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all',
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 bg-white hover:border-primary-300',
              ].join(' ')}
            >
              <div>
                <p className="font-medium text-gray-800 text-sm">{addon.name}</p>
                <p className="text-xs text-primary-600 font-semibold mt-0.5">
                  + {formatPrice(addon.price)}
                </p>
              </div>
              <div
                className={[
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  isSelected ? 'border-primary-500 bg-primary-500' : 'border-neutral-300',
                ].join(' ')}
              >
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Special requests */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">
          Solicitudes Especiales (opcional)
        </label>
        <textarea
          id="specialRequests"
          rows={4}
          value={data.specialRequests ?? ''}
          onChange={(e) => onChange('specialRequests', e.target.value)}
          placeholder="¿Tienes alguna solicitud especial para tu evento? Cuéntanos..."
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-gray-800 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
        />
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {[
          { field: 'cateringNeeded', label: 'Necesito servicio de catering' },
          { field: 'decorationNeeded', label: 'Necesito servicio de decoración' },
        ].map(({ field, label }) => {
          const key = field as 'cateringNeeded' | 'decorationNeeded';
          return (
            <label key={field} className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={data[key] ?? false}
                  onChange={(e) => onChange(key, e.target.checked)}
                />
                <div
                  className={[
                    'w-10 h-6 rounded-full transition-colors',
                    data[key] ? 'bg-primary-500' : 'bg-neutral-300',
                  ].join(' ')}
                />
                <div
                  className={[
                    'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform',
                    data[key] ? 'translate-x-5' : 'translate-x-1',
                  ].join(' ')}
                />
              </div>
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
