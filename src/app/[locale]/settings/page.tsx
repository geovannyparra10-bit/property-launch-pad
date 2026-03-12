import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/settings/SettingsForm";
import type { Locale } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function SettingsPage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, language, subscription_status")
    .eq("user_id", user.id)
    .single();

  if (!profile) redirect(`/${locale}/login`);

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
        locale={locale as Locale}
        profile={{
          fullName: profile.full_name ?? "",
          email: profile.email,
          language: profile.language as Locale,
          subscriptionStatus: profile.subscription_status,
        }}
      />
    </div>
  );
}
