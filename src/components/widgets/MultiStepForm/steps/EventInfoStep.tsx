// src/components/widgets/MultiStepForm/steps/EventInfoStep.tsx

import { EVENT_TYPES, PACKAGES } from '@/lib/utils/constants';
import type { ReservationData } from '@/types/reserva';

interface EventInfoStepProps {
  data: Partial<ReservationData>;
  errors: Record<string, string>;
  onChange: (field: keyof ReservationData, value: unknown) => void;
}

export default function EventInfoStep({ data, errors, onChange }: EventInfoStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-gray-800 mb-1">
          Información del Evento
        </h2>
        <p className="text-gray-500 text-sm">Cuéntanos sobre tu celebración</p>
      </div>

      {/* Tipo de evento */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Tipo de Evento <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EVENT_TYPES.map((et) => (
            <button
              key={et.value}
              type="button"
              onClick={() => onChange('eventType', et.value)}
              className={[
                'py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all text-center',
                data.eventType === et.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-gray-700 hover:border-primary-300',
              ].join(' ')}
            >
              {et.label}
            </button>
          ))}
        </div>
        {errors.eventType && (
          <p className="text-xs text-red-600">{errors.eventType}</p>
        )}
      </div>

      {/* Fecha */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="eventDate" className="text-sm font-medium text-gray-700">
          Fecha del Evento <span className="text-red-500">*</span>
        </label>
        <input
          id="eventDate"
          type="date"
          value={data.eventDate ?? ''}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => onChange('eventDate', e.target.value)}
          className={[
            'w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500',
            errors.eventDate ? 'border-red-500' : 'border-neutral-300',
          ].join(' ')}
        />
        {errors.eventDate && (
          <p className="text-xs text-red-600">{errors.eventDate}</p>
        )}
      </div>

      {/* Número de invitados */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="guestCount" className="text-sm font-medium text-gray-700">
          Número de Invitados <span className="text-red-500">*</span>
        </label>
        <input
          id="guestCount"
          type="number"
          min={20}
          max={500}
          value={data.guestCount ?? ''}
          onChange={(e) => onChange('guestCount', Number(e.target.value))}
          placeholder="Ej: 100"
          className={[
            'w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500',
            errors.guestCount ? 'border-red-500' : 'border-neutral-300',
          ].join(' ')}
        />
        {errors.guestCount && (
          <p className="text-xs text-red-600">{errors.guestCount}</p>
        )}
      </div>

      {/* Paquete */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Paquete <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onChange('package', pkg.id)}
              className={[
                'p-4 rounded-xl border-2 text-left transition-all',
                data.package === pkg.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 bg-white hover:border-primary-300',
              ].join(' ')}
            >
              <p className="font-semibold text-gray-800">{pkg.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">Hasta {pkg.maxGuests} invitados</p>
            </button>
          ))}
        </div>
        {errors.package && (
          <p className="text-xs text-red-600">{errors.package}</p>
        )}
      </div>
    </div>
  );
}
