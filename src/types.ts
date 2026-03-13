export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  language: 'en' | 'es';
  subscription_status: 'free' | 'premium' | 'past_due' | 'canceled';
  stripe_customer_id: string | null;
  is_admin: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tool {
  id: string;
  slug: string;
  access_level: 'free' | 'premium';
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

export interface CalculatorScenario {
  id: string;
  user_id: string;
  tool_id: string;
  scenario_name: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown> | null;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export type Locale = 'en' | 'es';
