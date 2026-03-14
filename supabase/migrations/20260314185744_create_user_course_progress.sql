/*
  # Create user_course_progress table

  ## Summary
  Tracks which lessons each authenticated user has completed within each course.

  ## New Tables
  - `user_course_progress`
    - `id` (uuid, primary key)
    - `user_id` (uuid, foreign key → auth.users.id)
    - `course_slug` (text) — e.g. "house-hack-mastery"
    - `lesson_slug` (text) — e.g. "lesson-1"
    - `completed_at` (timestamptz) — when the lesson was marked complete
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Users can only read, insert, and delete their own progress rows

  ## Notes
  - Unique constraint on (user_id, course_slug, lesson_slug) prevents duplicate entries
  - No UPDATE policy needed — rows are inserted then deleted if reset; completed_at is set on insert
*/

CREATE TABLE IF NOT EXISTS user_course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug text NOT NULL,
  lesson_slug text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_slug, lesson_slug)
);

ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_ucp_user_id ON user_course_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_ucp_course ON user_course_progress (user_id, course_slug);

CREATE POLICY "Users can view own course progress"
  ON user_course_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own course progress"
  ON user_course_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own course progress"
  ON user_course_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
