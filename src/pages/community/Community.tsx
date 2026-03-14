import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare, Plus, Pin, ArrowUpDown, Clock, TriangleAlert as AlertTriangle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePosts } from './useForum'
import { CATEGORIES, CATEGORY_COLORS, categoryLabel, timeAgo } from './forumTypes'
import type { ForumCategory } from './forumTypes'

const L = {
  en: {
    title: 'Community Forum',
    subtitle: 'Connect with fellow real estate investors. Share deals, ask questions, and learn together.',
    newPost: 'New Post',
    sortNewest: 'Newest',
    sortReplies: 'Most Replies',
    replies: 'replies',
    reply: 'reply',
    pinned: 'Pinned',
    noPosts: 'No posts yet in this category.',
    beFirst: 'Be the first to post!',
    disclaimer: 'Discussions on this forum are for informational and educational purposes only. Nothing shared here constitutes financial, legal, or investment advice. Always consult a licensed professional before making investment decisions.',
    loginRequired: 'Please log in to access the Community Forum.',
    login: 'Log In',
  },
  es: {
    title: 'Foro Comunitario',
    subtitle: 'Conéctate con otros inversores inmobiliarios. Comparte tratos, haz preguntas y aprende juntos.',
    newPost: 'Nueva Publicación',
    sortNewest: 'Más Recientes',
    sortReplies: 'Más Respuestas',
    replies: 'respuestas',
    reply: 'respuesta',
    pinned: 'Fijado',
    noPosts: 'No hay publicaciones en esta categoría.',
    beFirst: '¡Sé el primero en publicar!',
    disclaimer: 'Las discusiones en este foro son solo para fines informativos y educativos. Nada de lo compartido aquí constituye asesoramiento financiero, legal o de inversión. Siempre consulte a un profesional con licencia antes de tomar decisiones de inversión.',
    loginRequired: 'Inicia sesión para acceder al Foro Comunitario.',
    login: 'Iniciar Sesión',
  },
}

export function Community() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const l = L[language as 'en' | 'es'] ?? L.en
  const lang = language as 'en' | 'es'

  const [activeCategory, setActiveCategory] = useState<ForumCategory | 'all'>('all')
  const [sort, setSort] = useState<'newest' | 'most-replies'>('newest')

  const { posts, loading } = usePosts(activeCategory, sort)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <MessageSquare className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{l.title}</h1>
              <p className="text-gray-400 text-sm mt-0.5 max-w-md">{l.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/community/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg"
          >
            <Plus className="h-4 w-4" />
            {l.newPost}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as ForumCategory | 'all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                activeCategory === cat.value
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelEs}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6 justify-end">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <button
            onClick={() => setSort('newest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              sort === 'newest'
                ? 'bg-gray-700 text-white border-gray-600'
                : 'bg-gray-800 text-gray-500 border-gray-700 hover:text-gray-300'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            {l.sortNewest}
          </button>
          <button
            onClick={() => setSort('most-replies')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              sort === 'most-replies'
                ? 'bg-gray-700 text-white border-gray-600'
                : 'bg-gray-800 text-gray-500 border-gray-700 hover:text-gray-300'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            {l.sortReplies}
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-5 border border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-700 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-base">{l.noPosts}</p>
            <p className="text-sm mt-1">{l.beFirst}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/community/${post.id}`}
                className="block bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-xl p-5 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
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
                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors truncate pr-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{post.author_name || 'Anonymous'}</span>
                      <span>·</span>
                      <span>{timeAgo(post.created_at, lang)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.reply_count} {post.reply_count === 1 ? l.reply : l.replies}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">{l.disclaimer}</p>
        </div>
      </div>
    </div>
  )
}
