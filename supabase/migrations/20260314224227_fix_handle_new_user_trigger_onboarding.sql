/*
  # Fix handle_new_user trigger - set onboarding_completed to true

  ## Problem
  The handle_new_user trigger function hardcodes `onboarding_completed = false`,
  which contradicts a later migration that set the column default to true.
  New users get stuck on the dashboard because the code checks for profile existence
  and the onboarding flow may redirect them unexpectedly.

  ## Changes
  - Updates handle_new_user() to set onboarding_completed = true for all new users
  - This is consistent with the skip_onboarding migration intent
*/

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
  );
  RETURN NEW;
END;
$$;
