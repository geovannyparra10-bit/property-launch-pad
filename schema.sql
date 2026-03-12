-- ============================================================================
-- Property Launch Pad — Complete Supabase Schema (v2)
-- Run this ONCE in the Supabase SQL Editor BEFORE deploying the app.
-- ============================================================================

-- ==========================================================================
-- 1. PROFILES
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text NOT NULL DEFAULT '',
  full_name     text DEFAULT '',
  language      text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
  subscription_status text NOT NULL DEFAULT 'free'
    CHECK (subscription_status IN ('free', 'premium', 'past_due', 'canceled')),
  stripe_customer_id  text,
  is_admin      boolean NOT NULL DEFAULT false,
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================================================
-- 2. PROFILE AUTO-CREATION TRIGGER
-- ==========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, language, subscription_status, is_admin, onboarding_completed)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'language', 'en'),
    'free', false, false
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==========================================================================
-- 3. ONBOARDING RESPONSES
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.onboarding_responses (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  step_key    text NOT NULL,
  response    jsonb NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, step_key)
);

CREATE INDEX IF NOT EXISTS idx_onboarding_responses_user ON public.onboarding_responses(user_id);

ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own onboarding" ON public.onboarding_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own onboarding" ON public.onboarding_responses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own onboarding" ON public.onboarding_responses FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================================================
-- 4. TOOLS REGISTRY
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.tools (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text NOT NULL UNIQUE,
  access_level    text NOT NULL DEFAULT 'free' CHECK (access_level IN ('free', 'premium')),
  is_active       boolean NOT NULL DEFAULT false,
  category        text NOT NULL DEFAULT 'financial',
  icon            text NOT NULL DEFAULT 'Calculator',
  sort_order      integer NOT NULL DEFAULT 0,
  title_en        text NOT NULL DEFAULT '',
  title_es        text NOT NULL DEFAULT '',
  description_en  text NOT NULL DEFAULT '',
  description_es  text NOT NULL DEFAULT '',
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active tools" ON public.tools FOR SELECT USING (true);

-- ==========================================================================
-- 5. CALCULATOR SCENARIOS
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.calculator_scenarios (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id         uuid NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  scenario_name   text NOT NULL DEFAULT '',
  inputs          jsonb NOT NULL DEFAULT '{}',
  outputs         jsonb DEFAULT '{}',
  is_pinned       boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scenarios_user_tool ON public.calculator_scenarios(user_id, tool_id);

ALTER TABLE public.calculator_scenarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own scenarios" ON public.calculator_scenarios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scenarios" ON public.calculator_scenarios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scenarios" ON public.calculator_scenarios FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own scenarios" ON public.calculator_scenarios FOR DELETE USING (auth.uid() = user_id);

-- ==========================================================================
-- 6. SEED TOOLS
-- ==========================================================================
INSERT INTO public.tools (slug, access_level, is_active, category, icon, sort_order, title_en, title_es, description_en, description_es)
VALUES
  ('mortgage_calculator', 'free', true, 'financial', 'Calculator', 1,
   'Mortgage Calculator', 'Calculadora de Hipotecas',
   'Calculate monthly payments, total cost, and compare scenarios for any mortgage.',
   'Calcula pagos mensuales, costo total y compara escenarios para cualquier hipoteca.'),
  ('rental_yield', 'premium', false, 'financial', 'TrendingUp', 2,
   'Rental Yield Calculator', 'Calculadora de Rendimiento de Alquiler',
   'Estimate gross and net rental yield for investment properties.',
   'Estima el rendimiento bruto y neto del alquiler para propiedades de inversión.'),
  ('stamp_duty', 'free', false, 'financial', 'Receipt', 3,
   'Stamp Duty Calculator', 'Calculadora de Impuesto de Sellos',
   'Compute stamp duty and land tax for your region and property type.',
   'Calcula el impuesto de sellos y el impuesto territorial para tu región y tipo de propiedad.'),
  ('deal_analyzer', 'premium', false, 'analysis', 'BarChart3', 4,
   'Deal Analyzer', 'Analizador de Negocios',
   'Run full financial analysis on potential property deals with cash flow projections.',
   'Ejecuta un análisis financiero completo de posibles operaciones inmobiliarias con proyecciones de flujo de caja.')
ON CONFLICT (slug) DO UPDATE SET
  access_level = EXCLUDED.access_level, is_active = EXCLUDED.is_active, category = EXCLUDED.category,
  icon = EXCLUDED.icon, sort_order = EXCLUDED.sort_order, title_en = EXCLUDED.title_en, title_es = EXCLUDED.title_es,
  description_en = EXCLUDED.description_en, description_es = EXCLUDED.description_es;
