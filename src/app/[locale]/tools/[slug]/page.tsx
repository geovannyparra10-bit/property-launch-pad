"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TOOL_COMPONENTS } from "@/config/tool-components";
import PremiumGate from "@/components/gates/PremiumGate";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Locale, Tool } from "@/lib/types";

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as Locale) || "en";
  const slug = params?.slug as string;
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTool = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("tools")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (!data) {
        router.push("/404");
        return;
      }

      setTool(data as Tool);
      setLoading(false);
    };
    loadTool();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!tool) return null;

  const ToolComponent = TOOL_COMPONENTS[tool.slug];
  if (!ToolComponent) {
    router.push("/404");
    return null;
  }

  const title = locale === "es" ? tool.title_es : tool.title_en;
  const description = locale === "es" ? tool.description_es : tool.description_en;

  // 3. Render — PremiumGate handles access_level check + subscription gating
  return (
    <PremiumGate locale={locale as Locale} toolSlug={tool.slug}>
      <div className="tool-page">
        <style>{`
          .tool-page { max-width: 900px; margin: 0 auto; padding: 32px 24px 80px; }
          .tp-back {
            display: inline-flex; align-items: center; gap: 6px;
            font-size: 13px; font-weight: 500; color: var(--text-secondary, #94a3b8);
            text-decoration: none; margin-bottom: 24px; transition: color 0.15s;
          }
          .tp-back:hover { color: var(--accent, #6366f1); }
          .tp-header { margin-bottom: 32px; }
          .tp-header h1 { font-size: 28px; font-weight: 800; color: var(--text-primary, #e2e8f0); margin: 0 0 8px; letter-spacing: -0.3px; }
          .tp-header p { font-size: 15px; color: var(--text-secondary, #94a3b8); margin: 0; line-height: 1.5; }
        `}</style>

        <Link href={`/${locale}/tools`} className="tp-back">
          <ArrowLeft size={14} />
          All Tools
        </Link>

        <div className="tp-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <ToolComponent locale={locale} />
      </div>
    </PremiumGate>
  );
}
