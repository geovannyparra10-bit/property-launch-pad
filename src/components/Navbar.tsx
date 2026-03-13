import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { Globe } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const { locale, setLocale, t } = useLocale();

  return (
    <nav className="border-b border-[var(--border-subtle)] bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-accent">
          Property Launch Pad
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/tools" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
            {t('nav.tools')}
          </Link>
          <Link to="/pricing" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
            {t('nav.pricing')}
          </Link>

          <button
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
            aria-label="Toggle language"
          >
            <Globe size={18} />
          </button>

          {user ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold hover:opacity-90 transition"
            >
              {t('nav.dashboard')}
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold hover:opacity-90 transition"
            >
              {t('nav.signin')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
