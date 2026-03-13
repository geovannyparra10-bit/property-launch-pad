"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Calculator, TrendingUp, Receipt, ChartBar as BarChart3, ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Tool, Locale } from "@/lib/types";

const ICONS: Record<string, React.ElementType> = {
  Calculator,
  TrendingUp,
  Receipt,
  BarChart3,
};

export default function ToolsLibraryPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const t = useTranslations("tools");
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTools = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("tools")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      setTools((data as Tool[]) || []);
      setLoading(false);
    };
    loadTools();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <div className="tools-library">
      <style>{`
        .tools-library { max-width: 1080px; margin: 0 auto; padding: 48px 24px 80px; }
        .tl-hero { text-align: center; margin-bottom: 48px; }
        .tl-hero h1 { font-size: 36px; font-weight: 800; color: var(--text-primary, #e2e8f0); margin: 0 0 12px; letter-spacing: -0.5px; }
        .tl-hero p { font-size: 16px; color: var(--text-secondary, #94a3b8); max-width: 520px; margin: 0 auto; line-height: 1.6; }
        .tl-cat { margin-bottom: 40px; }
        .tl-cat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle, #2a3042); }
        .tl-cat-header h2 { font-size: 18px; font-weight: 700; color: var(--text-primary, #e2e8f0); margin: 0; text-transform: capitalize; }
        .tl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .tl-card {
          position: relative; display: flex; flex-direction: column; padding: 24px;
          background: var(--surface-elevated, #1a1f2e); border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 14px; text-decoration: none; transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .tl-card:hover { border-color: var(--accent, #6366f1); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
        .tl-card-icon {
          display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;
          border-radius: 12px; background: rgba(99,102,241,0.12); color: var(--accent, #6366f1); margin-bottom: 16px;
        }
        .tl-card h3 { font-size: 16px; font-weight: 700; color: var(--text-primary, #e2e8f0); margin: 0 0 8px; }
        .tl-card p { font-size: 13px; color: var(--text-secondary, #94a3b8); line-height: 1.5; margin: 0; flex: 1; }
        .tl-card-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(42,48,66,0.5);
        }
        .badge-premium { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 6px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; text-transform: uppercase; letter-spacing: 0.5px; }
        .badge-free { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 6px; background: rgba(34,197,94,0.15); color: #4ade80; text-transform: uppercase; letter-spacing: 0.5px; }
        .tl-arrow { color: var(--text-muted, #4a5568); transition: transform 0.15s, color 0.15s; }
        .tl-card:hover .tl-arrow { transform: translateX(3px); color: var(--accent, #6366f1); }
      `}</style>

      <div className="tl-hero">
        <h1>{t("library.title")}</h1>
        <p>{t("library.subtitle")}</p>
      </div>

      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat);
        return (
          <div key={cat} className="tl-cat">
            <div className="tl-cat-header">
              <h2>{cat}</h2>
            </div>
            <div className="tl-grid">
              {catTools.map((tool) => {
                const title = locale === "es" ? tool.title_es : tool.title_en;
                const description = locale === "es" ? tool.description_es : tool.description_en;
                const Icon = ICONS[tool.icon] ?? Calculator;

                return (
                  <Link
                    key={tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="tl-card"
                  >
                    <div className="tl-card-icon">
                      <Icon size={22} />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className="tl-card-foot">
                      {tool.access_level === "premium" ? (
                        <span className="badge-premium">Premium</span>
                      ) : (
                        <span className="badge-free">Free</span>
                      )}
                      <ArrowRight size={16} className="tl-arrow" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
