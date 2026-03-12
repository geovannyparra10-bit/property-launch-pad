"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CalculatorScenario, Locale } from "@/lib/types";

// ---------------------------------------------------------------------------
// Public return type (subset the UI needs)
// ---------------------------------------------------------------------------
export interface ScenarioDTO {
  id: string;
  scenario_name: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown> | null;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Get the authenticated user's id or throw. */
async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Not authenticated");
  return { userId: user.id, supabase };
}

/** Resolve tools.id from slug (must be active). */
async function resolveToolId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  toolSlug: string
): Promise<string> {
  const { data, error } = await supabase
    .from("tools")
    .select("id")
    .eq("slug", toolSlug)
    .eq("is_active", true)
    .single();

  if (error || !data) throw new Error(`Tool not found: ${toolSlug}`);
  return data.id;
}

/** Check if user is on free tier. */
async function isFreeUser(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("user_id", userId)
    .single();

  return data?.subscription_status !== "premium";
}

function toDTO(row: CalculatorScenario): ScenarioDTO {
  return {
    id: row.id,
    scenario_name: row.scenario_name,
    inputs: row.inputs,
    outputs: row.outputs,
    is_pinned: row.is_pinned,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// ---------------------------------------------------------------------------
// loadScenarios
// ---------------------------------------------------------------------------
export async function loadScenarios(
  toolSlug: string
): Promise<ScenarioDTO[]> {
  const { userId, supabase } = await requireUserId();
  const toolId = await resolveToolId(supabase, toolSlug);

  const { data, error } = await supabase
    .from("calculator_scenarios")
    .select("*")
    .eq("user_id", userId)
    .eq("tool_id", toolId)
    .order("is_pinned", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toDTO);
}

// ---------------------------------------------------------------------------
// saveScenario
// ---------------------------------------------------------------------------
export async function saveScenario(
  toolSlug: string,
  scenarioName: string,
  inputs: Record<string, unknown>,
  outputs: Record<string, unknown> | null,
  locale: Locale,
  scenarioId?: string
): Promise<ScenarioDTO> {
  const { userId, supabase } = await requireUserId();
  const toolId = await resolveToolId(supabase, toolSlug);

  // Trim name server-side
  const trimmedName = scenarioName.trim().slice(0, 60);
  if (!trimmedName) throw new Error("Scenario name is required");

  // --- Update existing ---
  if (scenarioId) {
    const { data, error } = await supabase
      .from("calculator_scenarios")
      .update({
        scenario_name: trimmedName,
        inputs,
        outputs,
        updated_at: new Date().toISOString(),
      })
      .eq("id", scenarioId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath(`/${locale}/tools/${toolSlug}`);
    return toDTO(data as CalculatorScenario);
  }

  // --- Create new: enforce free-tier limit ---
  const free = await isFreeUser(supabase, userId);
  if (free) {
    const { count } = await supabase
      .from("calculator_scenarios")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("tool_id", toolId);

    if ((count ?? 0) >= 1) {
      throw new Error(
        "Free accounts can save 1 scenario per tool. Upgrade to Premium for unlimited scenarios."
      );
    }
  }

  const { data, error } = await supabase
    .from("calculator_scenarios")
    .insert({
      user_id: userId,
      tool_id: toolId,
      scenario_name: trimmedName,
      inputs,
      outputs,
      is_pinned: false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/tools/${toolSlug}`);
  return toDTO(data as CalculatorScenario);
}

// ---------------------------------------------------------------------------
// togglePin
// ---------------------------------------------------------------------------
export async function togglePin(
  scenarioId: string,
  toolSlug: string,
  locale: Locale
): Promise<void> {
  const { userId, supabase } = await requireUserId();

  const { data: current, error: fetchErr } = await supabase
    .from("calculator_scenarios")
    .select("is_pinned")
    .eq("id", scenarioId)
    .eq("user_id", userId)
    .single();

  if (fetchErr || !current) throw new Error("Scenario not found");

  const { error } = await supabase
    .from("calculator_scenarios")
    .update({ is_pinned: !current.is_pinned })
    .eq("id", scenarioId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/tools/${toolSlug}`);
}

// ---------------------------------------------------------------------------
// deleteScenario (hard delete — v2 has no soft-delete column)
// ---------------------------------------------------------------------------
export async function deleteScenario(
  scenarioId: string,
  toolSlug: string,
  locale: Locale
): Promise<void> {
  const { userId, supabase } = await requireUserId();

  const { error } = await supabase
    .from("calculator_scenarios")
    .delete()
    .eq("id", scenarioId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/tools/${toolSlug}`);
}
