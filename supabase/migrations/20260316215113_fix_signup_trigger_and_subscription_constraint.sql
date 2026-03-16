/*
  # Fix signup trigger and subscription_status constraint

  ## Problems
  1. The handle_new_user trigger can throw an unhandled exception if a race condition
     or retry causes a duplicate insert, which Supabase Auth surfaces as
     "Database error saving new user". Adding ON CONFLICT DO NOTHING prevents this.

  2. The subscription_status CHECK constraint does not include 'active', but the
     Stripe webhook and existing app code use 'active' as a valid premium status.
     This causes Stripe webhook updates to fail silently or error.

  ## Changes
  - Adds 'active' to the profiles_subscription_status_check constraint
  - Updates handle_new_user() to use INSERT ... ON CONFLICT DO NOTHING so duplicate
    user_id inserts are silently ignored instead of throwing
*/

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_subscription_status_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_subscription_status_check
  CHECK (subscription_status = ANY (ARRAY['free'::text, 'premium'::text, 'active'::text, 'past_due'::text, 'canceled'::text]));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, language, subscription_status, is_admin, onboarding_completed)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'language', 'en'),
    'free', false, true
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
