// ---------------------------------------------------------------------------
// Shared TypeScript types matching the Supabase v2 schema.
// These are NOT generated — update manually when schema changes.
// ---------------------------------------------------------------------------

/** profiles table */
export interface Profile {
  id: string; // PK uuid
  user_id: string; // FK → auth.users.id (unique)
  email: string;
  full_name: string | null;
  language: "en" | "es";
  subscription_status: "free" | "premium" | "past_due" | "canceled";
  is_admin: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

/** tools table */
export interface Tool {
  id: string; // PK uuid
  slug: string; // unique, snake_case e.g. "mortgage_calculator"
  access_level: "free" | "premium";
  is_active: boolean;
  category: string;
  icon: string;
  sort_order: number;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  created_at: string;
}

/** calculator_scenarios table */
export interface CalculatorScenario {
  id: string; // PK uuid
  user_id: string; // FK → auth.users.id
  tool_id: string; // FK → tools.id
  scenario_name: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown> | null;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

/** Locale type for consistency */
export type Locale = "en" | "es";
