import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import { Crown, FileText, ArrowRight } from 'lucide-react'

const templates = [
  {
    slug: 'owner-carry',
    titleEn: 'Owner Carry Agreement',
    titleEs: 'Contrato de Financiamiento por el Vendedor',
    descEn: 'A seller-financed purchase agreement with balloon payment terms, default clauses, and full legal language. Available in English and Spanish.',
    descEs: 'Un contrato de compra con financiamiento del vendedor, términos de pago globo, cláusulas de incumplimiento y lenguaje legal completo. Disponible en inglés y español.',
    path: '/templates/owner-carry',
  },
]

export function Templates() {
  const { user, profile } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  const isPremium = profile?.subscription_status === 'active'

  const handleTemplateClick = (_path: string, e: React.MouseEvent) => {
    if (!isPremium) {
      e.preventDefault()
      setShowPremiumModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-white">
              {language === 'en' ? 'Document Templates' : 'Plantillas de Documentos'}
            </h1>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown className="h-3 w-3" />
              {language === 'en' ? 'Premium' : 'Premium'}
            </span>
          </div>
          <p className="text-gray-400 max-w-2xl">
            {language === 'en'
              ? 'Professional real estate agreement templates. Fill in your deal details and download a complete, print-ready document.'
              : 'Plantillas profesionales de acuerdos inmobiliarios. Complete los detalles de su trato y descargue un documento completo listo para imprimir.'}
          </p>
          {!isPremium && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-amber-300 text-sm">
                {language === 'en'
                  ? 'Templates are a Premium feature. '
                  : 'Las plantillas son una función Premium. '}
                <Link to="/pricing" className="underline hover:text-amber-200 transition-colors">
                  {language === 'en' ? 'Upgrade to access.' : 'Actualizar para acceder.'}
                </Link>
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <Link
              key={tpl.slug}
              to={tpl.path}
              onClick={(e) => handleTemplateClick(tpl.path, e)}
              className={`group bg-gray-800 rounded-xl p-6 border transition-all ${
                isPremium
                  ? 'border-gray-700 hover:border-blue-500 cursor-pointer'
                  : 'border-gray-700 hover:border-amber-500/50 cursor-pointer'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                {!isPremium && <Crown className="h-4 w-4 text-amber-400 mt-1" />}
              </div>
              <h3 className={`text-lg font-bold mb-2 transition-colors ${
                isPremium ? 'text-white group-hover:text-blue-400' : 'text-white group-hover:text-amber-400'
              }`}>
                {language === 'en' ? tpl.titleEn : tpl.titleEs}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {language === 'en' ? tpl.descEn : tpl.descEs}
              </p>
              <div className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isPremium ? 'text-blue-400 group-hover:text-blue-300' : 'text-amber-400 group-hover:text-amber-300'
              }`}>
                {isPremium
                  ? (language === 'en' ? 'Open Template' : 'Abrir Plantilla')
                  : (language === 'en' ? 'Upgrade to Unlock' : 'Actualizar para Desbloquear')}
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        featureName="Document Templates"
      />
    </div>
  )
}
