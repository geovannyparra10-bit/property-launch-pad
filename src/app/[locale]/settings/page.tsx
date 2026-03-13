"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import SettingsForm from "@/components/settings/SettingsForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Locale } from "@/lib/types";

export default function SettingsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const locale = (params?.locale as Locale) || "en";

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/login`);
    }
  }, [user, loading, locale, router]);

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="settings-page">
      <style>{`
        .settings-page { max-width: 560px; margin: 0 auto; padding: 48px 24px 80px; }
        .settings-page h1 {
          font-size: 28px; font-weight: 800; color: var(--text-primary, #e2e8f0);
          margin: 0 0 8px;
        }
        .settings-page .sub {
          font-size: 14px; color: var(--text-secondary, #94a3b8); margin: 0 0 32px;
        }
      `}</style>

      <h1>Settings</h1>
      <p className="sub">Manage your account preferences.</p>

      <SettingsForm
        locale={locale}
        profile={{
          fullName: profile.full_name ?? "",
          email: profile.email,
          language: profile.language,
          subscriptionStatus: profile.subscription_status,
        }}
      />
    </div>
  );
}
