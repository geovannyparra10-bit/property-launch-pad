import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import LoadingSpinner from '@/components/LoadingSpinner';

const STEPS = ['experience_level', 'investment_goals', 'property_types'] as const;

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { user, refreshProfile } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();

  const steps = [
    {
      key: 'experience_level',
      title: t('onboarding.experience.title'),
      options: [
        { value: 'beginner', label: t('onboarding.experience.beginner') },
        { value: 'intermediate', label: t('onboarding.experience.intermediate') },
        { value: 'advanced', label: t('onboarding.experience.advanced') },
      ],
    },
    {
      key: 'investment_goals',
      title: t('onboarding.goals.title'),
      options: [
        { value: 'cashflow', label: t('onboarding.goals.cashflow') },
        { value: 'appreciation', label: t('onboarding.goals.appreciation') },
        { value: 'both', label: t('onboarding.goals.both') },
        { value: 'flip', label: t('onboarding.goals.flip') },
      ],
    },
    {
      key: 'property_types',
      title: t('onboarding.properties.title'),
      options: [
        { value: 'residential', label: t('onboarding.properties.residential') },
        { value: 'multifamily', label: t('onboarding.properties.multifamily') },
        { value: 'commercial', label: t('onboarding.properties.commercial') },
        { value: 'land', label: t('onboarding.properties.land') },
      ],
    },
  ];

  const currentStepData = steps[currentStep];

  const handleSelect = (value: string) => {
    setResponses({ ...responses, [currentStepData.key]: value });
  };

  const handleNext = async () => {
    if (!user) return;

    const stepKey = STEPS[currentStep];
    const response = { value: responses[currentStepData.key] };

    await supabase.from('onboarding_responses').upsert({
      user_id: user.id,
      step_key: stepKey,
      response,
    });

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setLoading(true);

    await supabase
      .from('profiles')
      .update({ onboarding_completed: true })
      .eq('user_id', user.id);

    await refreshProfile();
    navigate('/dashboard');
  };

  const canProceed = responses[currentStepData.key];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg-base)]">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <p className="text-sm font-bold text-accent uppercase tracking-wide mb-2">
            Property Launch Pad
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            {t('onboarding.welcome')}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {t('onboarding.subtitle')}
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition ${
                index <= currentStep ? 'bg-accent' : 'bg-[var(--border-subtle)]'
              }`}
            />
          ))}
        </div>

        <div className="p-8 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            {currentStepData.title}
          </h2>

          <div className="space-y-3 mb-8">
            {currentStepData.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-4 text-left rounded-xl border-2 transition ${
                  responses[currentStepData.key] === option.value
                    ? 'border-accent bg-accent/10'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-hover)]'
                }`}
              >
                <span className="text-[var(--text-primary)] font-semibold">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg font-semibold hover:border-[var(--border-hover)] transition"
              >
                {t('onboarding.back')}
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed || loading}
              className="flex-1 px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Processing...
                </>
              ) : currentStep < steps.length - 1 ? (
                t('onboarding.next')
              ) : (
                t('onboarding.complete')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
