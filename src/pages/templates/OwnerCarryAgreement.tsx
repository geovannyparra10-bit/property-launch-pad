import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { PremiumFeatureModal } from '../../components/PremiumFeatureModal'
import { OwnerCarryForm } from './OwnerCarryForm'
import { generateAgreementHTML } from './ownerCarryAgreementText'
import { defaultFormData } from './ownerCarryTypes'
import type { OwnerCarryFormData } from './ownerCarryTypes'
import { FileDown, Globe, TriangleAlert as AlertTriangle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const AGREEMENT_STYLES = `
  .agreement-body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13px;
    line-height: 1.7;
    color: #1a1a1a;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  .agreement-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .agreement-subtitle {
    text-align: center;
    font-size: 13px;
    margin-bottom: 6px;
    font-style: italic;
  }
  .agreement-date {
    text-align: center;
    margin-bottom: 20px;
    color: #555;
    font-size: 12px;
  }
  .parties-block {
    display: flex;
    gap: 24px;
    margin: 16px 0;
    padding: 16px;
    background: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .party { flex: 1; line-height: 1.8; }
  h2 {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 24px;
    margin-bottom: 8px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 4px;
    letter-spacing: 0.5px;
  }
  h3 { font-size: 13px; font-weight: bold; margin: 16px 0 8px; }
  p { margin: 8px 0; }
  ul { margin: 8px 0 8px 24px; }
  li { margin: 4px 0; }
  .indent-block { padding: 10px 16px; background: #f8f8f8; border-left: 3px solid #666; margin: 8px 0; }
  .warning-block {
    padding: 12px 16px;
    background: #fff8e1;
    border: 2px solid #f59e0b;
    border-radius: 4px;
    margin: 12px 0;
    font-weight: 500;
  }
  .signature-block { margin-top: 40px; }
  .sig-grid { display: flex; gap: 40px; margin: 24px 0; }
  .sig-col { flex: 1; }
  .sig-line { border-bottom: 1px solid #333; margin-bottom: 8px; height: 40px; }
  .notary-block {
    margin-top: 32px;
    padding: 16px;
    border: 1px solid #ccc;
    background: #f9f9f9;
  }
  .disclaimer-block {
    margin-top: 32px;
    padding: 12px 16px;
    background: #fef2f2;
    border: 1px solid #fca5a5;
    border-radius: 4px;
    font-size: 11px;
    color: #7f1d1d;
  }
  @media print {
    body * { visibility: hidden; }
    #agreement-print-area, #agreement-print-area * { visibility: visible; }
    #agreement-print-area {
      position: absolute; left: 0; top: 0; width: 100%;
    }
    @page { margin: 20mm; }
  }
`

export function OwnerCarryAgreement() {
  const { user, profile } = useAuth()
  const { language, setLanguage } = useLanguage()
  const navigate = useNavigate()
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [formData, setFormData] = useState<OwnerCarryFormData>(defaultFormData)

  const isPremium = profile?.subscription_status === 'active'

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (profile !== undefined && !isPremium) setShowPremiumModal(true)
  }, [user, profile, isPremium, navigate])

  const handleChange = (field: keyof OwnerCarryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const agreementHTML = generateAgreementHTML(formData, language)

  const handleDownload = () => {
    if (!isPremium) { setShowPremiumModal(true); return }

    const printArea = document.getElementById('agreement-print-area')
    if (!printArea) return

    const styleTag = document.createElement('style')
    styleTag.innerHTML = AGREEMENT_STYLES
    printArea.prepend(styleTag)

    window.print()

    setTimeout(() => {
      if (styleTag.parentNode) styleTag.parentNode.removeChild(styleTag)
    }, 200)
  }

  const L = language === 'en' ? {
    title: 'Owner Carry Agreement',
    subtitle: 'Fill in the form to generate your seller-financed purchase agreement',
    back: 'Back to Templates',
    form: 'Agreement Details',
    preview: 'Live Preview',
    download: 'Download Agreement PDF',
    langToggle: 'Ver en Español',
    disclaimer: 'This template is for educational purposes only. It is not a substitute for legal advice. Have all agreements reviewed by a licensed attorney in your state before signing.',
  } : {
    title: 'Contrato de Financiamiento por el Vendedor',
    subtitle: 'Complete el formulario para generar su acuerdo de compra con financiamiento del vendedor',
    back: 'Volver a Plantillas',
    form: 'Detalles del Acuerdo',
    preview: 'Vista Previa en Vivo',
    download: 'Descargar Acuerdo en PDF',
    langToggle: 'View in English',
    disclaimer: 'Esta plantilla es solo para fines educativos. No sustituye el asesoramiento legal. Haga que todos los acuerdos sean revisados por un abogado con licencia en su estado antes de firmarlos.',
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <style dangerouslySetInnerHTML={{ __html: AGREEMENT_STYLES }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Link to="/templates" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            {L.back}
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{L.title}</h1>
              <p className="text-gray-400 mt-1 text-sm">{L.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 border border-gray-600 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Globe className="h-4 w-4" />
                {L.langToggle}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-sm whitespace-nowrap"
              >
                <FileDown className="h-4 w-4" />
                {L.download}
              </button>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-4">{L.form}</h2>
            <OwnerCarryForm data={formData} onChange={handleChange} lang={language} />
          </div>

          <div className="xl:sticky xl:top-6 xl:self-start">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">{L.preview}</h2>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <FileDown className="h-3.5 w-3.5" />
                {language === 'en' ? 'Print / Save PDF' : 'Imprimir / Guardar PDF'}
              </button>
            </div>
            <div
              className="bg-white rounded-xl border border-gray-200 overflow-auto shadow-2xl"
              style={{ maxHeight: '80vh' }}
            >
              <div id="agreement-print-area">
                <div dangerouslySetInnerHTML={{ __html: agreementHTML }} />
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2.5 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-300 text-xs leading-relaxed">{L.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => { setShowPremiumModal(false); if (!isPremium) navigate('/templates') }}
        featureName="Document Templates"
      />
    </div>
  )
}
