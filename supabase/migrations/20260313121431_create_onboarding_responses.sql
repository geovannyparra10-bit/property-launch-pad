/*
  # Create onboarding_responses table

  1. New Tables
    - `onboarding_responses`
      - `id` (uuid, primary key) - Unique identifier for each response
      - `user_id` (uuid, foreign key) - References auth.users
      - `step_key` (text) - Identifies which onboarding step (e.g., 'experience', 'goals', 'property_types')
      - `response` (jsonb) - Stores the user's response(s) for the step
      - `created_at` (timestamptz) - When the response was created
      - `updated_at` (timestamptz) - When the response was last updated
  
  2. Security
    - Enable RLS on `onboarding_responses` table
    - Add policy for authenticated users to read their own responses
    - Add policy for authenticated users to insert their own responses
    - Add policy for authenticated users to update their own responses
  
  3. Indexes
    - Create unique index on (user_id, step_key) to ensure one response per step per user
*/

CREATE TABLE IF NOT EXISTS onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  step_key text NOT NULL,
  response jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS onboarding_responses_user_step_idx 
  ON onboarding_responses(user_id, step_key);

ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own onboarding responses"
  ON onboarding_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding responses"
  ON onboarding_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding responses"
  ON onboarding_responses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
