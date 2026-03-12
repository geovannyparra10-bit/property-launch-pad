import { notFound } from "next/navigation";
import { getToolBySlug, localizeToolMeta } from "@/lib/tools";
import { TOOL_COMPONENTS } from "@/config/tool-components";
import PremiumGate from "@/components/gates/PremiumGate";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ToolPage({ params }: Props) {
  const { locale, slug } = await params;

  // 1. Fetch tool from DB (must be active)
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  // 2. Resolve the React component for this tool
  const ToolComponent = TOOL_COMPONENTS[tool.slug];
  if (!ToolComponent) notFound(); // Tool exists in DB but no component built yet

  const meta = localizeToolMeta(tool, locale as Locale);

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
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>

        <ToolComponent locale={locale as Locale} />
      </div>
    </PremiumGate>
  );
}
