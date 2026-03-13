import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import Navbar from '@/components/Navbar';
import { Check } from 'lucide-react';

export default function Pricing() {
  const { profile } = useAuth();
  const { t } = useLocale();

  const plans = [
    {
      name: t('pricing.free'),
      price: '$0',
      features: [
        'Access to all calculators',
        'Save 1 scenario per tool',
        'Basic property analysis',
        'Email support',
      ],
      isCurrent: profile?.subscription_status === 'free',
      cta: profile ? t('pricing.currentPlan') : 'Get Started',
      href: profile ? null : '/signup',
    },
    {
      name: t('pricing.premium'),
      price: '$29',
      period: t('pricing.perMonth'),
      features: [
        'Everything in Free',
        'Unlimited saved scenarios',
        'Advanced analytics',
        'Export reports (PDF)',
        'Priority support',
        'Early access to new tools',
      ],
      isCurrent: profile?.subscription_status === 'premium',
      isPremium: true,
      cta: profile?.subscription_status === 'premium'
        ? t('pricing.currentPlan')
        : t('pricing.upgrade'),
      href: null,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t('pricing.title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border-2 ${
                plan.isPremium
                  ? 'bg-gradient-to-br from-accent/5 to-accent/10 border-accent'
                  : 'bg-[var(--surface-elevated)] border-[var(--border-subtle)]'
              }`}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                {plan.name}
              </h2>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[var(--text-primary)]">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-[var(--text-secondary)] ml-2">
                    {plan.period}
                  </span>
                )}
              </div>

              <div className="mb-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--text-secondary)]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {plan.href ? (
                <Link
                  to={plan.href}
                  className={`block w-full px-6 py-3 rounded-xl text-center font-bold transition ${
                    plan.isPremium
                      ? 'bg-accent text-white hover:opacity-90'
                      : 'bg-[var(--bg-base)] border-2 border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent'
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  disabled={plan.isCurrent}
                  className={`w-full px-6 py-3 rounded-xl font-bold transition ${
                    plan.isCurrent
                      ? 'bg-[var(--bg-base)] border-2 border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed'
                      : plan.isPremium
                      ? 'bg-accent text-white hover:opacity-90'
                      : 'bg-[var(--bg-base)] border-2 border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-accent'
                  }`}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
