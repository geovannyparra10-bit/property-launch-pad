import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import Navbar from '@/components/Navbar';
import { Tool } from '@/types';
import { Calculator, TrendingUp, Receipt, BarChart3, ArrowRight } from 'lucide-react';

const ICONS: Record<string, any> = {
  Calculator,
  TrendingUp,
  Receipt,
  BarChart3,
};

export default function Dashboard() {
  const { profile } = useAuth();
  const { locale, t } = useLocale();
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    const { data } = await supabase
      .from('tools')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    setTools((data as Tool[]) || []);
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
            {t('dashboard.welcome')}, {firstName}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {t('dashboard.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wide">
            {profile?.subscription_status === 'premium' ? 'Premium Plan' : 'Free Plan'}
          </div>
        </div>

        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
          {t('dashboard.yourTools')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {tools.map((tool) => {
            const title = locale === 'es' ? tool.title_es : tool.title_en;
            const description = locale === 'es' ? tool.description_es : tool.description_en;
            const Icon = ICONS[tool.icon] || Calculator;

            return (
              <Link
                key={tool.id}
                to={`/tools/${tool.slug}`}
                className="flex items-center gap-4 p-5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl hover:border-accent transition"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    {description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
        >
          {t('dashboard.viewAll')} <ArrowRight size={16} />
        </Link>
      </main>
    </div>
  );
}
