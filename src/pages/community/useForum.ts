import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import type { ForumPost, ForumReply, ForumCategory } from './forumTypes'

export function usePosts(category: ForumCategory | 'all', sort: 'newest' | 'most-replies') {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    let q = supabase.from('forum_posts').select('*')
    if (category !== 'all') q = q.eq('category', category)
    if (sort === 'most-replies') {
      q = q.order('is_pinned', { ascending: false }).order('reply_count', { ascending: false })
    } else {
      q = q.order('is_pinned', { ascending: false }).order('created_at', { ascending: false })
    }
    const { data, error } = await q
    if (!error && data) setPosts(data as ForumPost[])
    setLoading(false)
  }, [category, sort])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return { posts, loading, refetch: fetchPosts }
}

export function usePost(postId: string) {
  const [post, setPost] = useState<ForumPost | null>(null)
  const [replies, setReplies] = useState<ForumReply[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPost = useCallback(async () => {
    setLoading(true)
    const [postRes, repliesRes] = await Promise.all([
      supabase.from('forum_posts').select('*').eq('id', postId).maybeSingle(),
      supabase.from('forum_replies').select('*').eq('post_id', postId).order('created_at', { ascending: true }),
    ])
    if (!postRes.error && postRes.data) setPost(postRes.data as ForumPost)
    if (!repliesRes.error && repliesRes.data) setReplies(repliesRes.data as ForumReply[])
    setLoading(false)
  }, [postId])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return { post, replies, loading, refetch: fetchPost }
}

export async function createPost(
  userId: string,
  authorName: string,
  title: string,
  body: string,
  category: ForumCategory
): Promise<{ data: ForumPost | null; error: string | null }> {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert({ user_id: userId, author_name: authorName, title, body, category })
    .select()
    .maybeSingle()
  if (error) return { data: null, error: error.message }
  return { data: data as ForumPost, error: null }
}

export async function createReply(
  postId: string,
  userId: string,
  authorName: string,
  body: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('forum_replies')
    .insert({ post_id: postId, user_id: userId, author_name: authorName, body, is_ai: false })
  if (error) return { error: error.message }
  await supabase.rpc('increment_reply_count', { post_id_arg: postId })
  return { error: null }
}

export async function pinPost(postId: string, pinned: boolean): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('forum_posts')
    .update({ is_pinned: pinned })
    .eq('id', postId)
  return { error: error?.message ?? null }
}

export async function adminDeletePost(postId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('forum_posts').delete().eq('id', postId)
  return { error: error?.message ?? null }
}

export async function adminDeleteReply(replyId: string, postId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('forum_replies').delete().eq('id', replyId)
  if (!error) await supabase.rpc('decrement_reply_count', { post_id_arg: postId })
  return { error: error?.message ?? null }
}

export async function triggerAIReply(
  postId: string,
  title: string,
  body: string,
  category: string,
  lang: 'en' | 'es',
  authToken: string
) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  try {
    await fetch(`${supabaseUrl}/functions/v1/forum-ai-reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ post_id: postId, title, body, category, lang }),
    })
  } catch {
  }
}
