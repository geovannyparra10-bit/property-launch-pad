import { createClient } from "@/lib/supabase/server";
import type { Tool, Locale } from "@/lib/types";

// ---------------------------------------------------------------------------
// Tool queries — all tools come from the DB `tools` table, never hardcoded.
// ---------------------------------------------------------------------------

/**
 * Fetch a single active tool by slug.
 * Returns null if slug not found or tool is inactive.
 */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data as Tool;
}

/**
 * Fetch all active tools, ordered by sort_order.
 */
export async function getActiveTools(): Promise<Tool[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []) as Tool[];
}

/**
 * Resolve a tool's localized title and description.
 */
export function localizeToolMeta(
  tool: Tool,
  locale: Locale
): { title: string; description: string } {
  return {
    title: locale === "es" ? tool.title_es : tool.title_en,
    description: locale === "es" ? tool.description_es : tool.description_en,
  };
}
