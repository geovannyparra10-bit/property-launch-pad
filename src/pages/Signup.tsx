import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLocale } from '@/contexts/LocaleContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLocale();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg-base)]">
      <div className="w-full max-w-md p-8 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-center">
          {t('auth.signup')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6 text-center">
          Get started with Property Launch Pad — it's free
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
              {t('auth.fullName')}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                {t('auth.signingUp')}
              </>
            ) : (
              t('auth.signup')
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
