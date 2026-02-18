// src/components/widgets/MultiStepForm/FormWizard.tsx
// React island — 3-step reservation wizard

import { useState } from 'react';
import ProgressBar from './ProgressBar';
import EventInfoStep from './steps/EventInfoStep';
import CustomizationStep from './steps/CustomizationStep';
import ContactStep from './steps/ContactStep';
import { validateReservationForm } from '@/lib/usecases/reservas/validateReservationForm';
import { calculatePricing } from '@/lib/usecases/reservas/calculatePricing';
import type { ReservationData, PricingBreakdown } from '@/types/reserva';

const STEP_LABELS = ['Tu Evento', 'Personalizar', 'Contacto'];
const TOTAL_STEPS = 3;

const STEP_FIELDS: Record<number, (keyof ReservationData)[]> = {
  1: ['eventType', 'eventDate', 'guestCount', 'package'],
  2: [],
  3: ['fullName', 'email', 'phone'],
};

export default function FormWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<ReservationData>>({
    addons: [],
    cateringNeeded: false,
    decorationNeeded: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  function handleChange(field: keyof ReservationData, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateCurrentStep(): boolean {
    const stepFields = STEP_FIELDS[step] ?? [];
    if (stepFields.length === 0) return true;

    // Run validation on full data but only surface errors for this step's fields
    const result = validateReservationForm(data);
    const stepErrors: Record<string, string> = {};

    stepFields.forEach((field) => {
      if (result.errors[field]) {
        stepErrors[field] = result.errors[field]!;
      }
    });

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }
    return true;
  }

  function handleNext() {
    if (!validateCurrentStep()) return;

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        if (window.trackEvent) {
          await window.trackEvent('reservation_created', {
            package: data.package,
            guestCount: data.guestCount,
          });
        }
      } else {
        setErrors(result.errors ?? {});
        if (result.errors?.general) {
          setServerError(result.errors.general);
        }
      }
    } catch {
      setServerError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Compute pricing for step 3
  const pricing: PricingBreakdown | undefined =
    step === 3 && data.package && data.guestCount
      ? (() => {
          try {
            return calculatePricing({
              package: data.package!,
              guestCount: data.guestCount!,
              addons: data.addons ?? [],
            });
          } catch {
            return undefined;
          }
        })()
      : undefined;

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-heading text-3xl font-bold text-primary-700 mb-3">
          ¡Reserva Recibida!
        </h2>
        <p className="text-gray-600 mb-2">
          Gracias, <strong>{data.fullName}</strong>. Hemos recibido tu solicitud.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Te contactaremos en las próximas 24 horas a {data.email} o {data.phone}.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          Volver al Inicio
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} labels={STEP_LABELS} />

      {/* Steps */}
      {step === 1 && (
        <EventInfoStep data={data} errors={errors} onChange={handleChange} />
      )}
      {step === 2 && (
        <CustomizationStep data={data} errors={errors} onChange={handleChange} />
      )}
      {step === 3 && (
        <ContactStep data={data} errors={errors} onChange={handleChange} pricing={pricing} />
      )}

      {/* Server error */}
      {serverError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {serverError}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 1}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Atrás
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Continuar →
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </>
            ) : (
              'Enviar Reserva'
            )}
          </button>
        )}
      </div>
    </form>
  );
}
