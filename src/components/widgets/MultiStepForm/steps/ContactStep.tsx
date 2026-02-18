// src/components/widgets/MultiStepForm/steps/ContactStep.tsx

import type { ReservationData, PricingBreakdown } from '@/types/reserva';
import { formatPrice } from '@/lib/utils/formatters';

interface ContactStepProps {
  data: Partial<ReservationData>;
  errors: Record<string, string>;
  onChange: (field: keyof ReservationData, value: unknown) => void;
  pricing?: PricingBreakdown;
}

export default function ContactStep({ data, errors, onChange, pricing }: ContactStepProps) {
  const fields: Array<{
    id: keyof ReservationData;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
  }> = [
    { id: 'fullName', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre', required: true },
    { id: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@email.com', required: true },
    { id: 'phone', label: 'Teléfono / WhatsApp', type: 'tel', placeholder: '+57 300 000 0000', required: true },
    { id: 'city', label: 'Ciudad', type: 'text', placeholder: 'Tu ciudad' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-gray-800 mb-1">
          Tus Datos de Contacto
        </h2>
        <p className="text-gray-500 text-sm">Nos comunicaremos contigo para confirmar tu reserva</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.id} className={`flex flex-col gap-1.5 ${field.id === 'fullName' ? 'sm:col-span-2' : ''}`}>
            <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={(data[field.id] as string) ?? ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={[
                'w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500',
                errors[field.id] ? 'border-red-500' : 'border-neutral-300',
              ].join(' ')}
            />
            {errors[field.id] && (
              <p className="text-xs text-red-600">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Pricing summary */}
      {pricing && (
        <div className="mt-2 p-5 rounded-xl bg-neutral-50 border border-neutral-200">
          <h3 className="font-semibold text-gray-800 mb-3">Resumen de Cotización</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex justify-between text-gray-600">
              <span>Paquete base</span>
              <span>{formatPrice(pricing.basePrice)}</span>
            </li>
            {pricing.guestSurcharge > 0 && (
              <li className="flex justify-between text-gray-600">
                <span>Invitados adicionales</span>
                <span>{formatPrice(pricing.guestSurcharge)}</span>
              </li>
            )}
            {pricing.addonsTotal > 0 && (
              <li className="flex justify-between text-gray-600">
                <span>Servicios adicionales</span>
                <span>{formatPrice(pricing.addonsTotal)}</span>
              </li>
            )}
            <li className="flex justify-between font-semibold text-primary-700 pt-2 border-t border-neutral-200 mt-1">
              <span>Total Estimado</span>
              <span>{formatPrice(pricing.total)} {pricing.currency}</span>
            </li>
          </ul>
          <p className="text-xs text-gray-400 mt-3">
            * Precio referencial. El valor final se confirma tras revisión de disponibilidad.
          </p>
        </div>
      )}
    </div>
  );
}
