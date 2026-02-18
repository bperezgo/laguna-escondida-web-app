// src/components/widgets/MultiStepForm/ProgressBar.tsx

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  const percent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="mb-8">
      {/* Step labels */}
      {labels && (
        <div className="flex justify-between mb-3">
          {labels.map((label, i) => (
            <span
              key={label}
              className={`text-xs font-medium ${
                i + 1 <= currentStep ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Track */}
      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        />
      </div>

      {/* Step counter */}
      <p className="text-right text-xs text-gray-500 mt-1">
        Paso {currentStep} de {totalSteps}
      </p>
    </div>
  );
}
