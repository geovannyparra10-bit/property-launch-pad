import { createClient } from "@/lib/supabase/server";
import { getToolBySlug } from "@/lib/tools";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import type { Locale } from "@/lib/types";

interface PremiumGateProps {
  locale: Locale;
  toolSlug?: string;
  children: React.ReactNode;
}

/**
 * Server component that conditionally gates content based on tool access_level
 * and user subscription_status.
 *
 * Logic:
 * 1. If toolSlug provided → look up tools.access_level
 *    - tool not found or access_level="free" → render children (no gate)
 *    - access_level="premium" → continue to subscription check
 * 2. If no toolSlug → always perform subscription check
 * 3. Subscription check:
 *    - Not logged in → show upgrade prompt (not redirect, so free tools still work)
 *    - profiles.subscription_status === "premium" → render children
 *    - Otherwise → show upgrade prompt
 *
 * Schema: profiles.user_id = auth.users.id, profiles.subscription_status
 */
export default async function PremiumGate({
  locale,
  toolSlug,
  children,
}: PremiumGateProps) {
  const t = await getTranslations({ locale, namespace: "gates.premium" });

  // Step 1: If toolSlug provided, check tool access_level from DB
  if (toolSlug) {
    const tool = await getToolBySlug(toolSlug);

    // Tool not found or is free → no gate needed
    if (!tool || tool.access_level === "free") {
      return <>{children}</>;
    }
    // If we reach here, tool exists and access_level === "premium"
  }

  // Step 2: Check auth
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <UpgradePrompt
        locale={locale}
        title={t("loginRequired.title")}
        message={t("loginRequired.message")}
        ctaLabel={t("loginRequired.cta")}
        ctaHref={`/${locale}/login`}
      />
    );
  }

  // Step 3: Check subscription via profiles.user_id
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("user_id", user.id)
    .single();

  const isPremium = profile?.subscription_status === "premium";

  if (!isPremium) {
    return (
      <UpgradePrompt
        locale={locale}
        title={t("upgradeRequired.title")}
        message={t("upgradeRequired.message")}
        ctaLabel={t("upgradeRequired.cta")}
        ctaHref={`/${locale}/pricing`}
      />
    );
  }

  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// Upgrade prompt sub-component
// ---------------------------------------------------------------------------
function UpgradePrompt({
  locale,
  title,
  message,
  ctaLabel,
  ctaHref,
}: {
  locale: string;
  title: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div
      style={{
        maxWidth: 460,
        margin: "80px auto",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "var(--text-primary, #e2e8f0)",
          margin: "0 0 12px",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "var(--text-secondary, #94a3b8)",
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>
      <a
        href={ctaHref}
        style={{
          display: "inline-block",
          padding: "12px 32px",
          background: "var(--accent, #6366f1)",
          color: "#fff",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: "none",
        }}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
