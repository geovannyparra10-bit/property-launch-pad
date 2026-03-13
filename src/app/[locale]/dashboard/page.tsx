"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowRight, Calculator, TrendingUp, Receipt, ChartBar as BarChart3 } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Locale, Tool } from "@/lib/types";

const ICONS: Record<string, React.ElementType> = {
  Calculator,
  TrendingUp,
  Receipt,
  BarChart3,
};

export default function DashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const locale = (params?.locale as Locale) || "en";
  const [tools, setTools] = useState<Tool[]>([]);
  const [loadingTools, setLoadingTools] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/login`);
    } else if (!loading && profile && !profile.onboarding_completed) {
      router.push(`/${locale}/onboarding`);
    }
  }, [user, profile, loading, locale, router]);

  useEffect(() => {
    const loadTools = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("tools")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      setTools((data as Tool[]) || []);
      setLoadingTools(false);
    };
    loadTools();
  }, []);

  if (loading || loadingTools || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const firstName = profile.full_name?.split(" ")[0] || "there";

  return (
    <div className="dash">
      <style>{`
        .dash {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .dash-welcome {
          margin-bottom: 40px;
        }
        .dash-welcome h1 {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 8px;
        }
        .dash-welcome p {
          font-size: 15px;
          color: var(--text-secondary, #94a3b8);
          margin: 0;
        }
        .dash-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 12px;
        }
        .dash-status.free {
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
        }
        .dash-status.premium {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15));
          color: #fbbf24;
        }
        .dash-section-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 16px;
        }
        .dash-tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 14px;
        }
        .dash-tool-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px;
          background: var(--surface-elevated, #1a1f2e);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 12px;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.15s;
        }
        .dash-tool-card:hover {
          border-color: var(--accent, #6366f1);
          transform: translateY(-1px);
        }
        .dash-tool-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.12);
          color: var(--accent, #6366f1);
          flex-shrink: 0;
        }
        .dash-tool-info h3 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 2px;
        }
        .dash-tool-info p {
          font-size: 12px;
          color: var(--text-muted, #4a5568);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dash-all-tools {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 18px;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent, #6366f1);
          text-decoration: none;
          transition: gap 0.15s;
        }
        .dash-all-tools:hover {
          gap: 10px;
        }
      `}</style>

      <div className="dash-welcome">
        <h1>Welcome back, {firstName}</h1>
        <p>Here&apos;s your Property Launch Pad dashboard.</p>
        <div
          className={`dash-status ${profile.subscription_status === "premium" ? "premium" : "free"}`}
        >
          {profile.subscription_status === "premium"
            ? "Premium Plan"
            : "Free Plan"}
        </div>
      </div>

      <h2 className="dash-section-title">Your Tools</h2>
      <div className="dash-tools-grid">
        {tools.map((tool) => {
          const title = locale === "es" ? tool.title_es : tool.title_en;
          const description = locale === "es" ? tool.description_es : tool.description_en;
          const Icon = ICONS[tool.icon] ?? Calculator;
          return (
            <Link
              key={tool.id}
              href={`/${locale}/tools/${tool.slug}`}
              className="dash-tool-card"
            >
              <div className="dash-tool-icon">
                <Icon size={20} />
              </div>
              <div className="dash-tool-info">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <Link href={`/${locale}/tools`} className="dash-all-tools">
        View all tools <ArrowRight size={14} />
      </Link>
    </div>
  );
}
