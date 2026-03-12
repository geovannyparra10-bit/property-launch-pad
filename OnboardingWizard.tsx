"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  loadOnboardingProgress,
  saveStepResponse,
  completeOnboarding,
  ONBOARDING_STEPS,
  type StepKey,
  type StepResponse,
} from "@/actions/onboarding";
import type { Locale } from "@/lib/types";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Step config
// ---------------------------------------------------------------------------
interface StepConfig {
  key: StepKey;
  title: string;
  subtitle: string;
  options: { value: string; label: string; description: string }[];
  multi: boolean; // allow multiple selections?
}

const STEPS: StepConfig[] = [
  {
    key: "experience_level",
    title: "Your Experience",
    subtitle: "How much property investment experience do you have?",
    multi: false,
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "I'm just starting to research property investment",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "I own 1-3 investment properties",
      },
      {
        value: "advanced",
        label: "Advanced",
        description: "I have a portfolio of 4+ properties",
      },
    ],
  },
  {
    key: "investment_goals",
    title: "Your Goals",
    subtitle: "What are you looking to achieve? Select all that apply.",
    multi: true,
    options: [
      {
        value: "cash_flow",
        label: "Cash Flow",
        description: "Generate monthly rental income",
      },
      {
        value: "appreciation",
        label: "Appreciation",
        description: "Long-term property value growth",
      },
      {
        value: "tax_benefits",
        label: "Tax Benefits",
        description: "Optimize tax deductions and strategies",
      },
      {
        value: "portfolio_growth",
        label: "Portfolio Growth",
        description: "Scale to multiple properties over time",
      },
    ],
  },
  {
    key: "property_types",
    title: "Property Types",
    subtitle:
      "Which property types interest you most? Select all that apply.",
    multi: true,
    options: [
      {
        value: "single_family",
        label: "Single Family Homes",
        description: "Traditional houses and townhomes",
      },
      {
        value: "multi_family",
        label: "Multi-Family",
        description: "Duplexes, triplexes, apartment buildings",
      },
      {
        value: "commercial",
        label: "Commercial",
        description: "Office, retail, or industrial spaces",
      },
      {
        value: "vacation_rental",
        label: "Vacation Rentals",
        description: "Short-term / Airbnb properties",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface Props {
  locale: Locale;
}

export default function OnboardingWizard({ locale }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<StepKey, string[]>>(
    () => {
      const init: Record<string, string[]> = {};
      ONBOARDING_STEPS.forEach((k) => (init[k] = []));
      return init as Record<StepKey, string[]>;
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loaded, setLoaded] = useState(false);

  // Load existing progress on mount
  useEffect(() => {
    startTransition(async () => {
      try {
        const progress = await loadOnboardingProgress();
        const restored: Record<string, string[]> = {};
        ONBOARDING_STEPS.forEach((k) => (restored[k] = []));

        progress.forEach((p) => {
          if (p.response?.selected && Array.isArray(p.response.selected)) {
            restored[p.step_key] = p.response.selected;
          }
        });

        setSelections(restored as Record<StepKey, string[]>);

        // Jump to first incomplete step
        const firstIncomplete = ONBOARDING_STEPS.findIndex(
          (k) => !restored[k] || restored[k].length === 0
        );
        if (firstIncomplete >= 0) setCurrentStep(firstIncomplete);
        else setCurrentStep(ONBOARDING_STEPS.length - 1);
      } catch {
        // Couldn't load — start fresh
      }
      setLoaded(true);
    });
  }, []);

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;
  const selected = selections[step.key];

  const toggleOption = (value: string) => {
    setSelections((prev) => {
      const current = prev[step.key];
      if (step.multi) {
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [step.key]: next };
      }
      return { ...prev, [step.key]: [value] };
    });
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError("Please make a selection to continue.");
      return;
    }
    setError(null);

    startTransition(async () => {
      try {
        await saveStepResponse(step.key, { selected }, locale);

        if (isLastStep) {
          await completeOnboarding(locale);
          router.push(`/${locale}/dashboard`);
          router.refresh();
        } else {
          setCurrentStep((s) => s + 1);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save. Try again.");
      }
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setError(null);
      setCurrentStep((s) => s - 1);
    }
  };

  if (!loaded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
        <Loader2
          size={28}
          className="animate-spin"
          style={{ color: "var(--accent, #6366f1)" }}
        />
      </div>
    );
  }

  return (
    <div className="ob-wizard">
      <style jsx>{`
        .ob-wizard {
          max-width: 560px;
          width: 100%;
        }
        .ob-progress {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
        }
        .ob-progress-dot {
          flex: 1;
          height: 4px;
          border-radius: 2px;
          background: var(--border-subtle, #2a3042);
          transition: background 0.3s;
        }
        .ob-progress-dot.active {
          background: var(--accent, #6366f1);
        }
        .ob-progress-dot.done {
          background: #4ade80;
        }
        .ob-step-header {
          margin-bottom: 24px;
        }
        .ob-step-header h2 {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 8px;
        }
        .ob-step-header p {
          font-size: 14px;
          color: var(--text-secondary, #94a3b8);
          margin: 0;
          line-height: 1.5;
        }
        .ob-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .ob-option {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: var(--surface-elevated, #1a1f2e);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          user-select: none;
        }
        .ob-option:hover {
          border-color: var(--border-hover, #3a4562);
        }
        .ob-option.selected {
          border-color: var(--accent, #6366f1);
          background: rgba(99, 102, 241, 0.06);
        }
        .ob-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid var(--border-subtle, #2a3042);
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .ob-option.selected .ob-check {
          background: var(--accent, #6366f1);
          border-color: var(--accent, #6366f1);
        }
        .ob-option-text h3 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 2px;
        }
        .ob-option-text p {
          font-size: 12px;
          color: var(--text-muted, #4a5568);
          margin: 0;
        }
        .ob-error {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--error, #f87171);
          margin-bottom: 16px;
        }
        .ob-actions {
          display: flex;
          gap: 12px;
        }
        .ob-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .ob-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .ob-btn-primary {
          background: var(--accent, #6366f1);
          color: #fff;
          margin-left: auto;
        }
        .ob-btn-primary:hover:not(:disabled) {
          opacity: 0.9;
        }
        .ob-btn-secondary {
          background: var(--surface-elevated, #1a1f2e);
          color: var(--text-secondary, #94a3b8);
          border: 1px solid var(--border-subtle, #2a3042);
        }
        .ob-btn-secondary:hover:not(:disabled) {
          border-color: var(--border-hover, #3a4562);
        }
      `}</style>

      {/* Progress bar */}
      <div className="ob-progress">
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            className={`ob-progress-dot ${i === currentStep ? "active" : ""} ${i < currentStep ? "done" : ""}`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="ob-step-header">
        <h2>{step.title}</h2>
        <p>{step.subtitle}</p>
      </div>

      <div className="ob-options">
        {step.options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <div
              key={opt.value}
              className={`ob-option ${isSelected ? "selected" : ""}`}
              onClick={() => toggleOption(opt.value)}
            >
              <div className="ob-check">
                {isSelected && <Check size={14} color="#fff" />}
              </div>
              <div className="ob-option-text">
                <h3>{opt.label}</h3>
                <p>{opt.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="ob-error">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="ob-actions">
        {currentStep > 0 && (
          <button
            className="ob-btn ob-btn-secondary"
            onClick={handleBack}
            disabled={isPending}
          >
            <ChevronLeft size={16} />
            Back
          </button>
        )}
        <button
          className="ob-btn ob-btn-primary"
          onClick={handleNext}
          disabled={isPending || selected.length === 0}
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isLastStep ? "Complete Setup" : "Continue"}
          {!isLastStep && <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}
