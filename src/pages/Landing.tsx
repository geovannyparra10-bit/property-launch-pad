import { Link } from 'react-router-dom';
import { useLocale } from '@/contexts/LocaleContext';
import Navbar from '@/components/Navbar';
import { Calculator, TrendingUp, Receipt, BarChart3 } from 'lucide-react';

export default function Landing() {
  const { t } = useLocale();

  const features = [
    {
      icon: Calculator,
      title: t('landing.features.mortgage'),
      description: t('landing.features.mortgageDesc'),
    },
    {
      icon: TrendingUp,
      title: t('landing.features.rental'),
      description: t('landing.features.rentalDesc'),
    },
    {
      icon: Receipt,
      title: t('landing.features.stamp'),
      description: t('landing.features.stampDesc'),
    },
    {
      icon: BarChart3,
      title: t('landing.features.deal'),
      description: t('landing.features.dealDesc'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] mb-6 max-w-4xl leading-tight">
          {t('landing.hero.title')}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl">
          {t('landing.hero.subtitle')}
        </p>
        <Link
          to="/signup"
          className="px-8 py-4 bg-accent text-white rounded-xl text-lg font-bold hover:opacity-90 transition shadow-lg"
        >
          {t('landing.hero.cta')}
        </Link>
      </section>

      <section className="px-6 py-20 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            {t('landing.features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl hover:border-accent transition"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
