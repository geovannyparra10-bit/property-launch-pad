import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Settings() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { locale, setLocale, t } = useLocale();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [selectedLanguage, setSelectedLanguage] = useState(profile?.language || locale);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setLoading(true);
    setSuccess(false);

    await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        language: selectedLanguage,
      })
      .eq('user_id', user.id);

    setLocale(selectedLanguage);
    await refreshProfile();
    setLoading(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
          {t('settings.title')}
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          {t('settings.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              {t('settings.profile')}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-muted)] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {t('auth.fullName')}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {t('settings.language')}
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'es')}
                  className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              {t('settings.subscription')}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--text-secondary)]">Current Plan:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                profile?.subscription_status === 'premium'
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : 'bg-green-500/10 text-green-500'
              }`}>
                {profile?.subscription_status === 'premium' ? 'Premium' : 'Free'}
              </span>
            </div>
          </div>

          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400">
              Settings saved successfully!
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  {t('settings.saving')}
                </>
              ) : (
                t('settings.save')
              )}
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="px-6 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg font-semibold hover:border-red-500 hover:text-red-500 transition"
            >
              {t('nav.signout')}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
