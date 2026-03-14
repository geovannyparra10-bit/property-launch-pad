import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Loader } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { createPost, triggerAIReply } from './useForum'
import { CATEGORIES } from './forumTypes'
import type { ForumCategory } from './forumTypes'

const L = {
  en: {
    back: 'Back to Forum',
    title: 'New Post',
    subtitle: 'Ask a question, share a deal, or start a discussion.',
    postTitle: 'Title',
    postTitlePlaceholder: 'Give your post a clear, descriptive title...',
    category: 'Category',
    body: 'Body',
    bodyPlaceholder: 'Share details, ask your question, or describe your situation...',
    submit: 'Post to Community',
    submitting: 'Posting...',
    aiNote: 'An AI assistant will reply to your post automatically with relevant advice.',
    titleRequired: 'Please enter a title.',
    bodyRequired: 'Please enter a body.',
  },
  es: {
    back: 'Volver al Foro',
    title: 'Nueva Publicación',
    subtitle: 'Haz una pregunta, comparte un trato o inicia una discusión.',
    postTitle: 'Título',
    postTitlePlaceholder: 'Dale a tu publicación un título claro y descriptivo...',
    category: 'Categoría',
    body: 'Contenido',
    bodyPlaceholder: 'Comparte detalles, haz tu pregunta o describe tu situación...',
    submit: 'Publicar en la Comunidad',
    submitting: 'Publicando...',
    aiNote: 'Un asistente de IA responderá a tu publicación automáticamente con consejos relevantes.',
    titleRequired: 'Por favor ingresa un título.',
    bodyRequired: 'Por favor ingresa un contenido.',
  },
}

export function NewPost() {
  const { user, profile, session } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const lang = language as 'en' | 'es'
  const l = L[lang]

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<ForumCategory>('deals')
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ title?: string; body?: string; general?: string }>({})

  const categoryOptions = CATEGORIES.filter((c) => c.value !== 'all')

  const validate = () => {
    const e: typeof errors = {}
    if (!title.trim()) e.title = l.titleRequired
    if (!body.trim()) e.body = l.bodyRequired
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    if (!user) return

    setSubmitting(true)
    setErrors({})

    const authorName = profile?.full_name || user.email?.split('@')[0] || 'Member'
    const { data, error } = await createPost(user.id, authorName, title.trim(), body.trim(), category)

    if (error || !data) {
      setErrors({ general: error || 'Something went wrong. Please try again.' })
      setSubmitting(false)
      return
    }

    const token = session?.access_token
    if (token) {
      triggerAIReply(data.id, data.title, data.body, data.category, lang, token)
    }

    navigate(`/community/${data.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/community" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            {l.back}
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">{l.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{l.subtitle}</p>
        </div>

        <div className="space-y-5">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">{l.postTitle}</label>
              <input
                value={title}
                onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: undefined })) }}
                placeholder={l.postTitlePlaceholder}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">{l.category}</label>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value as ForumCategory)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                      category === cat.value
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    {lang === 'en' ? cat.labelEn : cat.labelEs}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">{l.body}</label>
              <textarea
                value={body}
                onChange={(e) => { setBody(e.target.value); setErrors((prev) => ({ ...prev, body: undefined })) }}
                rows={8}
                placeholder={l.bodyPlaceholder}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500 resize-none"
              />
              {errors.body && <p className="text-red-400 text-xs mt-1">{errors.body}</p>}
            </div>
          </div>

          <div className="flex items-start gap-2.5 px-4 py-3 bg-indigo-900/20 border border-indigo-700/30 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
            <p className="text-xs text-indigo-300/80 leading-relaxed">{l.aiNote}</p>
          </div>

          {errors.general && (
            <p className="text-red-400 text-sm text-center">{errors.general}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors shadow-lg"
          >
            {submitting ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {submitting ? l.submitting : l.submit}
          </button>
        </div>
      </div>
    </div>
  )
}
