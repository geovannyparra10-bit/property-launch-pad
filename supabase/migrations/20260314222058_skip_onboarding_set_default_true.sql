/*
  # Skip Onboarding — Set onboarding_completed Default to True

  ## Summary
  Removes the onboarding questionnaire from the signup flow by:
  1. Setting `onboarding_completed` column default to `true` for all new signups
  2. Backfilling all existing profiles where `onboarding_completed` is false to `true`

  ## Changes
  - `profiles` table: column `onboarding_completed` default changed from `false` to `true`
  - All existing rows with `onboarding_completed = false` are updated to `true`

  ## Notes
  - The `onboarding_responses` table is preserved as-is
  - No data is deleted
*/

ALTER TABLE profiles
  ALTER COLUMN onboarding_completed SET DEFAULT true;

UPDATE profiles
SET onboarding_completed = true
WHERE onboarding_completed = false OR onboarding_completed IS NULL;
