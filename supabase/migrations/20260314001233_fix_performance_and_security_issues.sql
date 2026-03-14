/*
  # Fix Performance and Security Issues

  ## Changes Made

  1. **Indexes**
     - Add missing index on calculator_scenarios.tool_id foreign key for better query performance
     - Remove duplicate unique index onboarding_responses_user_step_idx (keeping the constraint-based index)
     - Remove unused indexes that are not being utilized

  2. **RLS Policy Optimization**
     - Update all RLS policies to use (select auth.uid()) pattern instead of direct auth.uid() calls
     - This prevents re-evaluation of auth functions for each row, significantly improving performance at scale

  3. **Duplicate Policy Cleanup**
     - Remove duplicate permissive policies on onboarding_responses table
     - Keep only the newer, more clearly named policies

  ## Important Notes
     - Foreign key indexes improve JOIN performance
     - Optimized RLS policies reduce database load
     - Removing duplicate policies prevents confusion and potential security issues
*/

-- Add missing index for calculator_scenarios.tool_id foreign key
CREATE INDEX IF NOT EXISTS idx_calculator_scenarios_tool_id ON calculator_scenarios(tool_id);

-- Remove duplicate index (keeping the constraint-based one)
DROP INDEX IF EXISTS onboarding_responses_user_step_idx;

-- Remove unused indexes
DROP INDEX IF EXISTS idx_profiles_stripe_customer_id;
DROP INDEX IF EXISTS idx_onboarding_responses_user;
DROP INDEX IF EXISTS idx_stripe_events_event_id;
DROP INDEX IF EXISTS idx_stripe_events_customer_id;

-- Drop old duplicate policies on onboarding_responses
DROP POLICY IF EXISTS "Users can read own onboarding" ON onboarding_responses;
DROP POLICY IF EXISTS "Users can insert own onboarding" ON onboarding_responses;
DROP POLICY IF EXISTS "Users can update own onboarding" ON onboarding_responses;

-- Drop all existing policies to recreate them with optimized pattern
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own onboarding responses" ON onboarding_responses;
DROP POLICY IF EXISTS "Users can insert own onboarding responses" ON onboarding_responses;
DROP POLICY IF EXISTS "Users can update own onboarding responses" ON onboarding_responses;
DROP POLICY IF EXISTS "Users can read own scenarios" ON calculator_scenarios;
DROP POLICY IF EXISTS "Users can insert own scenarios" ON calculator_scenarios;
DROP POLICY IF EXISTS "Users can update own scenarios" ON calculator_scenarios;
DROP POLICY IF EXISTS "Users can delete own scenarios" ON calculator_scenarios;

-- Recreate profiles policies with optimized pattern
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Recreate onboarding_responses policies with optimized pattern
CREATE POLICY "Users can read own onboarding responses"
  ON onboarding_responses
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own onboarding responses"
  ON onboarding_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own onboarding responses"
  ON onboarding_responses
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Recreate calculator_scenarios policies with optimized pattern
CREATE POLICY "Users can read own scenarios"
  ON calculator_scenarios
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own scenarios"
  ON calculator_scenarios
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own scenarios"
  ON calculator_scenarios
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own scenarios"
  ON calculator_scenarios
  FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));
