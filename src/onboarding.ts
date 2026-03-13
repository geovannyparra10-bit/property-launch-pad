import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/types";

// ---------------------------------------------------------------------------
// Onboarding step definitions
// ---------------------------------------------------------------------------
export const ONBOARDING_STEPS = [
  "experience_level",
  "investment_goals",
  "property_types",
] as const;

export type StepKey = (typeof ONBOARDING_STEPS)[number];

export interface StepResponse {
  step_key: StepKey;
  response: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Load all existing onboarding responses for the current user
// ---------------------------------------------------------------------------
export async function loadOnboardingProgress(): Promise<StepResponse[]> {
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("onboarding_responses")
    .select("step_key, response")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as StepResponse[];
}

// ---------------------------------------------------------------------------
// Save a single step response (upsert)
// ---------------------------------------------------------------------------
export async function saveStepResponse(
  stepKey: StepKey,
  response: Record<string, unknown>,
  locale: Locale
): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) throw new Error("Not authenticated");

  const { error } = await supabase.from("onboarding_responses").upsert(
    {
      user_id: user.id,
      step_key: stepKey,
      response,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,step_key" }
  );

  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Complete onboarding — marks profiles.onboarding_completed = true
// ---------------------------------------------------------------------------
export async function completeOnboarding(locale: Locale): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) throw new Error("Not authenticated");

  // Verify all steps are present
  const { count } = await supabase
    .from("onboarding_responses")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((count ?? 0) < ONBOARDING_STEPS.length) {
    throw new Error("Please complete all onboarding steps before proceeding.");
  }

  // Mark profile as onboarded
  const { error } = await supabase
    .from("profiles")
    .update({
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}
