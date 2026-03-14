import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface ArticleLayoutProps {
  titleEn: string
  titleEs: string
  readTimeEn: string
  readTimeEs: string
  categoryEn: string
  categoryEs: string
  children: React.ReactNode
}

export function ArticleDisclaimer() {
  const { t } = useLanguage()
  return (
    <div className="mt-12 p-6 bg-gray-800 border border-gray-600 rounded-xl">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
        {t('Financial Disclaimer', 'Aviso Financiero')}
      </p>
      <p className="text-sm text-gray-400 leading-relaxed">
        {t(
          'The information in this article is for educational purposes only and does not constitute financial, investment, or legal advice. Real estate investing involves significant risk, including the possible loss of principal. Past performance is not indicative of future results. Always consult with a licensed financial advisor, accountant, and/or attorney before making any investment decisions. Property Launch Pad is not responsible for any investment outcomes based on the information provided herein.',
          'La información en este artículo es únicamente con fines educativos y no constituye asesoramiento financiero, de inversión ni legal. La inversión en bienes raíces conlleva riesgos significativos, incluida la posible pérdida del capital invertido. El rendimiento pasado no es indicativo de resultados futuros. Siempre consulte con un asesor financiero, contador y/o abogado con licencia antes de tomar cualquier decisión de inversión. Property Launch Pad no se hace responsable de los resultados de inversiones basados en la información aquí proporcionada.'
        )}
      </p>
    </div>
  )
}

export function ArticleLayout({ titleEn, titleEs, readTimeEn, readTimeEs, categoryEn, categoryEs, children }: ArticleLayoutProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {t('Back to Learn', 'Volver a Aprender')}
        </Link>

        <div className="mb-8">
          <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            {t(categoryEn, categoryEs)}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {t(titleEn, titleEs)}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {t(readTimeEn, readTimeEs)}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {t('Article', 'Artículo')}
            </span>
          </div>
        </div>

        <div className="h-px bg-gray-700 mb-10" />

        <div className="prose-article">
          {children}
        </div>
      </div>
    </div>
  )
}
