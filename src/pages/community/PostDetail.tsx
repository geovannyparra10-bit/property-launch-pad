import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Pin, Trash2, Bot, TriangleAlert as AlertTriangle, Send, Loader } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePost, createReply, adminDeletePost, adminDeleteReply, pinPost } from './useForum'
import { CATEGORY_COLORS, categoryLabel, timeAgo } from './forumTypes'
import type { ForumCategory } from './forumTypes'

const L = {
  en: {
    back: 'Back to Forum',
    pinned: 'Pinned',
    pin: 'Pin',
    unpin: 'Unpin',
    deletePost: 'Delete Post',
    deleteReply: 'Delete Reply',
    aiLabel: 'Property Launch Pad AI',
    replyPlaceholder: 'Share your experience or advice...',
    submit: 'Post Reply',
    submitting: 'Posting...',
    replies: 'Replies',
    noReplies: 'No replies yet. Be the first to respond!',
    confirmDelete: 'Are you sure you want to delete this?',
    disclaimer: 'This forum is for informational purposes only and does not constitute financial or legal advice.',
    postNotFound: 'Post not found.',
  },
  es: {
    back: 'Volver al Foro',
    pinned: 'Fijado',
    pin: 'Fijar',
    unpin: 'Desfijar',
    deletePost: 'Eliminar Publicación',
    deleteReply: 'Eliminar Respuesta',
    aiLabel: 'IA de Property Launch Pad',
    replyPlaceholder: 'Comparte tu experiencia o consejo...',
    submit: 'Publicar Respuesta',
    submitting: 'Publicando...',
    replies: 'Respuestas',
    noReplies: '¡Sin respuestas aún. Sé el primero en responder!',
    confirmDelete: '¿Estás seguro de que quieres eliminar esto?',
    disclaimer: 'Este foro es solo para fines informativos y no constituye asesoramiento financiero ni legal.',
    postNotFound: 'Publicación no encontrada.',
  },
}

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const { user, profile } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const lang = language as 'en' | 'es'
  const l = L[lang]

  const { post, replies, loading, refetch } = usePost(postId!)
  const [replyBody, setReplyBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [replyError, setReplyError] = useState('')

  const isAdmin = profile?.is_admin === true
  const isOwn = (userId: string | null) => user?.id === userId

  const handleReply = async () => {
    if (!replyBody.trim() || !user) return
    setSubmitting(true)
    setReplyError('')
    const authorName = profile?.full_name || user.email?.split('@')[0] || 'Member'
    const { error } = await createReply(postId!, user.id, authorName, replyBody.trim())
    if (error) {
      setReplyError(error)
    } else {
      setReplyBody('')
      await refetch()
    }
    setSubmitting(false)
  }

  const handleDeletePost = async () => {
    if (!window.confirm(l.confirmDelete)) return
    await adminDeletePost(postId!)
    navigate('/community')
  }

  const handleDeleteReply = async (replyId: string) => {
    if (!window.confirm(l.confirmDelete)) return
    await adminDeleteReply(replyId, postId!)
    await refetch()
  }

  const handlePin = async () => {
    if (!post) return
    await pinPost(postId!, !post.is_pinned)
    await refetch()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader className="h-8 w-8 text-blue-400 animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">{l.postNotFound}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/community" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            {l.back}
          </Link>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {post.is_pinned && (
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  <Pin className="h-3 w-3" />
                  {l.pinned}
                </span>
              )}
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category as ForumCategory] ?? 'bg-gray-700 text-gray-400 border-gray-600'}`}>
                {categoryLabel(post.category, lang)}
              </span>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={handlePin}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-colors"
                >
                  <Pin className="h-3.5 w-3.5" />
                  {post.is_pinned ? l.unpin : l.pin}
                </button>
                <button
                  onClick={handleDeletePost}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {l.deletePost}
                </button>
              </div>
            )}
          </div>

          <h1 className="text-xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.body}</p>

          <div className="mt-5 pt-4 border-t border-gray-700 flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium text-gray-400">{post.author_name || 'Anonymous'}</span>
            <span>·</span>
            <span>{timeAgo(post.created_at, lang)}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            {l.replies} ({replies.length})
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {replies.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm">{l.noReplies}</p>
          ) : (
            replies.map((reply) => (
              <div
                key={reply.id}
                className={`border rounded-xl p-5 ${
                  reply.is_ai
                    ? 'bg-indigo-950/40 border-indigo-700/50'
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {reply.is_ai ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/40 px-2.5 py-1 rounded-full">
                        <Bot className="h-3.5 w-3.5" />
                        {l.aiLabel}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-gray-300">
                        {reply.author_name || 'Member'}
                      </span>
                    )}
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{timeAgo(reply.created_at, lang)}</span>
                  </div>
                  {(isAdmin || isOwn(reply.user_id)) && !reply.is_ai && (
                    <button
                      onClick={() => handleDeleteReply(reply.id)}
                      className="p-1 text-gray-600 hover:text-red-400 transition-colors rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {isAdmin && reply.is_ai && (
                    <button
                      onClick={() => handleDeleteReply(reply.id)}
                      className="p-1 text-gray-600 hover:text-red-400 transition-colors rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{reply.body}</p>
              </div>
            ))
          )}
        </div>

        {user && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <textarea
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              rows={4}
              placeholder={l.replyPlaceholder}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500 resize-none mb-3"
            />
            {replyError && <p className="text-red-400 text-xs mb-2">{replyError}</p>}
            <div className="flex justify-end">
              <button
                onClick={handleReply}
                disabled={!replyBody.trim() || submitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors"
              >
                {submitting ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? l.submitting : l.submit}
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">{l.disclaimer}</p>
        </div>
      </div>
    </div>
  )
}
