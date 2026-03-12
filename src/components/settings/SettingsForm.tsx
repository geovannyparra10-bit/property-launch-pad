"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateProfile } from "@/profile";
import type { Locale } from "@/lib/types";
import { Loader as Loader2, Save, LogOut, CircleAlert as AlertCircle, Check } from "lucide-react";

interface Props {
  locale: Locale;
  profile: {
    fullName: string;
    email: string;
    language: Locale;
    subscriptionStatus: string;
  };
}

export default function SettingsForm({ locale, profile }: Props) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile.fullName);
  const [language, setLanguage] = useState<Locale>(profile.language);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await updateProfile({ fullName: fullName.trim(), language }, locale);
        setSuccess(true);
        if (language !== locale) {
          router.push(`/${language}/settings`);
          router.refresh();
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save");
      }
    });
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
    router.refresh();
  };

  return (
    <div className="sf-root">
      <style jsx>{`
        .sf-root { display: flex; flex-direction: column; gap: 24px; }
        .sf-card {
          background: var(--surface-elevated, #1a1f2e); border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 14px; padding: 24px;
        }
        .sf-card h2 { font-size: 15px; font-weight: 700; color: var(--text-primary, #e2e8f0); margin: 0 0 18px; }
        .sf-field { margin-bottom: 16px; }
        .sf-field:last-child { margin-bottom: 0; }
        .sf-label {
          display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary, #94a3b8);
          text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;
        }
        .sf-input {
          width: 100%; padding: 10px 12px; background: var(--input-bg, #0f1320);
          border: 1px solid var(--border-subtle, #2a3042); border-radius: 8px;
          color: var(--text-primary, #e2e8f0); font-size: 14px; outline: none;
          transition: border-color 0.15s; box-sizing: border-box;
        }
        .sf-input:focus { border-color: var(--accent, #6366f1); }
        .sf-input:disabled { opacity: 0.5; }
        .sf-select {
          width: 100%; padding: 10px 12px; background: var(--input-bg, #0f1320);
          border: 1px solid var(--border-subtle, #2a3042); border-radius: 8px;
          color: var(--text-primary, #e2e8f0); font-size: 14px; outline: none;
          box-sizing: border-box;
        }
        .sf-status-badge {
          display: inline-block; font-size: 12px; font-weight: 600; text-transform: capitalize;
          padding: 4px 12px; border-radius: 6px;
        }
        .sf-status-badge.free { background: rgba(34,197,94,0.1); color: #4ade80; }
        .sf-status-badge.premium { background: rgba(245,158,11,0.15); color: #fbbf24; }
        .sf-actions { display: flex; gap: 12px; }
        .sf-btn {
          display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px;
          border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;
          transition: opacity 0.15s;
        }
        .sf-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .sf-btn-primary { background: var(--accent, #6366f1); color: #fff; }
        .sf-btn-danger {
          background: transparent; color: var(--error, #f87171);
          border: 1px solid rgba(239,68,68,0.3);
        }
        .sf-btn-danger:hover { background: rgba(239,68,68,0.08); }
        .sf-error {
          display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--error, #f87171);
        }
        .sf-success {
          display: flex; align-items: center; gap: 6px; font-size: 13px; color: #4ade80;
        }
      `}</style>

      {/* Profile Card */}
      <div className="sf-card">
        <h2>Profile</h2>

        <div className="sf-field">
          <label className="sf-label">Email</label>
          <input className="sf-input" type="email" value={profile.email} disabled />
        </div>

        <div className="sf-field">
          <label className="sf-label">Full Name</label>
          <input
            className="sf-input" type="text" value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="sf-field">
          <label className="sf-label">Language</label>
          <select
            className="sf-select" value={language}
            onChange={(e) => setLanguage(e.target.value as Locale)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="sf-card">
        <h2>Subscription</h2>
        <div className="sf-field">
          <label className="sf-label">Current Plan</label>
          <span
            className={`sf-status-badge ${profile.subscriptionStatus === "premium" ? "premium" : "free"}`}
          >
            {profile.subscriptionStatus}
          </span>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="sf-error"><AlertCircle size={14} />{error}</div>
      )}
      {success && (
        <div className="sf-success"><Check size={14} />Settings saved successfully.</div>
      )}

      {/* Actions */}
      <div className="sf-actions">
        <button className="sf-btn sf-btn-primary" onClick={handleSave} disabled={isPending}>
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save Changes
        </button>
        <button className="sf-btn sf-btn-danger" onClick={handleLogout}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}
