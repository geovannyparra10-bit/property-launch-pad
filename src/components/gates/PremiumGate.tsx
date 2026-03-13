"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Locale, Tool } from "@/lib/types";

interface PremiumGateProps {
  locale: Locale;
  toolSlug?: string;
  children: React.ReactNode;
}

export default function PremiumGate({
  locale,
  toolSlug,
  children,
}: PremiumGateProps) {
  const t = useTranslations("gates.premium");
  const { user, profile } = useAuth();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(!!toolSlug);

  useEffect(() => {
    if (toolSlug) {
      const loadTool = async () => {
        const supabase = createClient();
        const { data } = await supabase
          .from("tools")
          .select("*")
          .eq("slug", toolSlug)
          .eq("is_active", true)
          .maybeSingle();
        setTool((data as Tool) || null);
        setLoading(false);
      };
      loadTool();
    }
  }, [toolSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (toolSlug && (!tool || tool.access_level === "free")) {
    return <>{children}</>;
  }

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
