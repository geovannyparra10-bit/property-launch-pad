import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import type { Locale } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function OnboardingPage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  // Check if onboarding is already done
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("user_id", user.id)
    .single();

  if (profile?.onboarding_completed) {
    redirect(`/${locale}/dashboard`);
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
