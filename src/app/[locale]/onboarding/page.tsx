"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Locale } from "@/lib/types";

export default function OnboardingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const locale = (params?.locale as Locale) || "en";

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/${locale}/login`);
      } else if (profile?.onboarding_completed) {
        router.push(`/${locale}/dashboard`);
      }
    }
  }, [user, profile, loading, locale, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="ob-page">
      <style>{`
        .ob-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 32px 24px;
          background: var(--bg-base, #0a0e1a);
        }
        .ob-brand {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent, #6366f1);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .ob-heading {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 4px;
          text-align: center;
        }
        .ob-sub {
          font-size: 14px;
          color: var(--text-secondary, #94a3b8);
          margin: 0 0 40px;
          text-align: center;
        }
      `}</style>

      <div className="ob-brand">Property Launch Pad</div>
      <h1 className="ob-heading">Let&apos;s set up your account</h1>
      <p className="ob-sub">
        Answer a few quick questions so we can personalize your experience.
      </p>

      <OnboardingWizard locale={locale as Locale} />
    </div>
  );
}
