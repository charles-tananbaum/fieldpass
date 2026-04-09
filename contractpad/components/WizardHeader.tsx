"use client";

interface WizardHeaderProps {
  step: number;
  totalSteps: number;
  label: string;
  onBack?: () => void;
}

export default function WizardHeader({
  step,
  totalSteps,
  label,
  onBack,
}: WizardHeaderProps) {
  const pct = (step / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="btn-ghost -ml-2"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Back
            </span>
          </button>
        ) : <div />}
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Step {step} of {totalSteps}
        </div>
      </div>
      <div className="h-1 w-full bg-rule rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mt-3">
        {label}
      </div>
    </div>
  );
}
