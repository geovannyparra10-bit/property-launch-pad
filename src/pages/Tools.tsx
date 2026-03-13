import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
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

export default function Tools() {
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

  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t('tools.library.title')}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('tools.library.subtitle')}
          </p>
        </div>

        {categories.map((category) => {
          const categoryTools = tools.filter((t) => t.category === category);

          return (
            <div key={category} className="mb-10">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 pb-3 border-b border-[var(--border-subtle)] capitalize">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTools.map((tool) => {
                  const title = locale === 'es' ? tool.title_es : tool.title_en;
                  const description = locale === 'es' ? tool.description_es : tool.description_en;
                  const Icon = ICONS[tool.icon] || Calculator;

                  return (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.slug}`}
                      className="flex flex-col p-6 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl hover:border-accent hover:-translate-y-1 transition-all"
                    >
                      <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                        <Icon size={22} className="text-accent" />
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">
                        {description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
                        <span className={`text-xs font-bold uppercase tracking-wide ${
                          tool.access_level === 'premium'
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}>
                          {tool.access_level}
                        </span>
                        <ArrowRight size={16} className="text-[var(--text-muted)]" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
