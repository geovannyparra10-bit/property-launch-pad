import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Globe, Crown, FileText } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getPaymentLink } from '../../lib/paymentLink'
import { useLanguage } from '../../contexts/LanguageContext'
import { PremiumFeatureModal } from '../../components/PremiumFeatureModal'
import { OfferLetterForm } from './OfferLetterForm'
import { defaultOfferLetterData } from './offerLetterTypes'
import type { OfferLetterFormData } from './offerLetterTypes'
import { generateOfferLetterHTML, printOfferLetter } from './offerLetterText'

export function OfferLetter() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const [docLang, setDocLang] = useState<'en' | 'es'>(language as 'en' | 'es')
  const [data, setData] = useState<OfferLetterFormData>(defaultOfferLetterData)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const isPremium = profile?.subscription_status === 'active'
  const t = (en: string, es: string) => (language === 'en' ? en : es)

  useEffect(() => {
    if (data.offerPrice) {
      const price = parseFloat(data.offerPrice.replace(/,/g, ''))
      if (!isNaN(price) && !data.earnestMoney) {
        const earnest = Math.round(price * 0.01)
        setData((prev) => ({ ...prev, earnestMoney: earnest.toLocaleString() }))
      }
    }
  }, [data.offerPrice])

  const handleChange = (field: keyof OfferLetterFormData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDownload = () => {
    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }
    printOfferLetter(data, docLang)
  }

  const previewHTML = useMemo(() => generateOfferLetterHTML(data, docLang), [data, docLang])

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link to="/templates" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {t('Offer Letter Generator', 'Generador de Carta de Oferta')}
                </h1>
                <p className="text-gray-500 text-xs">
                  {t('Letter of Intent — Real Estate', 'Carta de Intención — Bienes Raíces')}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDocLang(docLang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors"
            >
              <Globe className="h-4 w-4" />
              {docLang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={handleDownload}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                isPremium
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300'
              }`}
            >
              {!isPremium && <Crown className="h-4 w-4" />}
              <Download className="h-4 w-4" />
              {t('Download PDF', 'Descargar PDF')}
            </button>
          </div>
        </div>

        {!isPremium && (
          <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <Crown className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-amber-300 text-sm">
              {t('This is a Premium template. ', 'Esta es una plantilla Premium. ')}
              <a href={getPaymentLink()} className="underline hover:text-amber-200 transition-colors">
                {t('Upgrade to download.', 'Actualiza para descargar.')}
              </a>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {t('Form Fields', 'Campos del Formulario')}
            </h2>
            <OfferLetterForm data={data} onChange={handleChange} lang={docLang} />
          </div>

          <div>
            <div className="sticky top-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {t('Live Preview', 'Vista Previa')}
              </h2>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-700 bg-gray-800/80">
                  <span className="text-gray-400 text-xs font-medium">
                    {t('Letter of Intent', 'Carta de Intención')}
                  </span>
                  <span className="text-gray-600 text-xs">
                    {docLang === 'en' ? 'English' : 'Español'}
                  </span>
                </div>
                <div
                  className="w-full bg-white"
                  style={{ height: '680px', overflowY: 'auto' }}
                >
                  <iframe
                    srcDoc={previewHTML}
                    title="Offer Letter Preview"
                    className="w-full h-full border-0"
                    style={{ minHeight: '680px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        featureName="Offer Letter Generator"
      />
    </div>
  )
}
