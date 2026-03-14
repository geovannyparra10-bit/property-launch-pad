/*
  # Create Community Forum Tables

  ## Overview
  Creates the forum infrastructure for the Property Launch Pad community feature.

  ## New Tables

  ### forum_posts
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `author_name` (text) — display name at time of posting
  - `title` (text)
  - `body` (text)
  - `category` (text) — one of: house-hack, brrr, flip, rental, owner-finance, deals, introductions
  - `is_pinned` (boolean, default false) — admin can pin posts
  - `reply_count` (integer, default 0) — cached count for performance
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### forum_replies
  - `id` (uuid, primary key)
  - `post_id` (uuid, references forum_posts)
  - `user_id` (uuid, references auth.users — NULL for AI replies)
  - `author_name` (text) — display name or "Property Launch Pad AI"
  - `body` (text)
  - `is_ai` (boolean, default false) — marks AI-generated replies
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Authenticated users can read all posts and replies
  - Users can only insert/update/delete their own posts and replies
  - AI replies (is_ai = true) are inserted via service role from edge function
  - Admin pin/delete handled at app level by checking is_admin profile field
*/

CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT '',
  title text NOT NULL,
  body text NOT NULL,
  category text NOT NULL DEFAULT 'deals',
  is_pinned boolean NOT NULL DEFAULT false,
  reply_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS forum_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name text NOT NULL DEFAULT '',
  body text NOT NULL,
  is_ai boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS forum_posts_user_id_idx ON forum_posts(user_id);
CREATE INDEX IF NOT EXISTS forum_posts_category_idx ON forum_posts(category);
CREATE INDEX IF NOT EXISTS forum_posts_created_at_idx ON forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS forum_replies_post_id_idx ON forum_replies(post_id);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all posts"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON forum_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can read all replies"
  ON forum_replies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own replies"
  ON forum_replies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies"
  ON forum_replies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert AI replies"
  ON forum_replies FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update posts"
  ON forum_posts FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete posts"
  ON forum_posts FOR DELETE
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete replies"
  ON forum_replies FOR DELETE
  TO service_role
  USING (true);

CREATE OR REPLACE FUNCTION increment_reply_count(post_id_arg uuid)
RETURNS void AS $$
  UPDATE forum_posts SET reply_count = reply_count + 1, updated_at = now()
  WHERE id = post_id_arg;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_reply_count(post_id_arg uuid)
RETURNS void AS $$
  UPDATE forum_posts SET reply_count = GREATEST(reply_count - 1, 0), updated_at = now()
  WHERE id = post_id_arg;
$$ LANGUAGE sql SECURITY DEFINER;
