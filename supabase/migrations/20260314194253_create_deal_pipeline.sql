/*
  # Create deal_pipeline table

  ## Summary
  Creates a Kanban-style deal pipeline for real estate investors to track deals
  through multiple stages from Lead to Closed or Dead.

  ## New Tables
  - `deal_pipeline`
    - `id` (uuid, primary key)
    - `user_id` (uuid, references auth.users) — owner of the deal
    - `address` (text) — property address
    - `purchase_price` (numeric) — asking/listing price
    - `offer_price` (numeric, nullable) — user's offer price
    - `stage` (text) — one of: Lead, Analyzing, Offer Made, Under Contract, Closed, Dead
    - `notes` (text, nullable) — free-form notes
    - `scenario_id` (uuid, nullable) — optional link to a saved scenario
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security
  - RLS enabled: users can only access their own deals
  - Policies: SELECT, INSERT, UPDATE, DELETE scoped to auth.uid()
*/

CREATE TABLE IF NOT EXISTS deal_pipeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address text NOT NULL,
  purchase_price numeric NOT NULL DEFAULT 0,
  offer_price numeric,
  stage text NOT NULL DEFAULT 'Lead',
  notes text,
  scenario_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE deal_pipeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own deals"
  ON deal_pipeline FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own deals"
  ON deal_pipeline FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own deals"
  ON deal_pipeline FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own deals"
  ON deal_pipeline FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_deal_pipeline_user_id ON deal_pipeline(user_id);
CREATE INDEX IF NOT EXISTS idx_deal_pipeline_stage ON deal_pipeline(stage);
