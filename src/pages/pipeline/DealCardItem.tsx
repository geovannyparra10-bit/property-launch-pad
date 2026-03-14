import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronDown, ChartBar as BarChart2, MapPin, Calendar, DollarSign } from 'lucide-react'
import { DealCard, PipelineStage, STAGES, STAGE_CONFIG } from './pipelineTypes'
import { useLanguage } from '../../contexts/LanguageContext'

interface Props {
  deal: DealCard
  onStageChange: (id: string, stage: PipelineStage) => void
  onDelete: (id: string) => void
}

function formatCurrency(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function DealCardItem({ deal, onStageChange, onDelete }: Props) {
  const { language } = useLanguage()
  const [stageOpen, setStageOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const cfg = STAGE_CONFIG[deal.stage]

  const t = (en: string, es: string) => (language === 'en' ? en : es)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(deal.id)
    } finally {
      setDeleting(false)
    }
  }

  const handleStage = (stage: PipelineStage) => {
    setStageOpen(false)
    if (stage !== deal.stage) onStageChange(deal.id, stage)
  }

  return (
    <div className={`bg-gray-800 border ${cfg.border} rounded-xl p-4 group hover:border-gray-500 transition-all duration-200 relative`}>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="absolute top-3 right-3 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
        title={t('Delete deal', 'Eliminar negocio')}
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-2 pr-6 mb-3">
        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
        <p className="text-white font-semibold text-sm leading-snug">{deal.address}</p>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <DollarSign className="h-3 w-3" />
          <span>{t('Asking', 'Precio')}:</span>
          <span className="text-gray-200 font-medium">{formatCurrency(deal.purchase_price)}</span>
        </div>
        {deal.offer_price && (
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <DollarSign className="h-3 w-3" />
            <span>{t('Offer', 'Oferta')}:</span>
            <span className="text-green-400 font-medium">{formatCurrency(deal.offer_price)}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(deal.created_at)}</span>
        </div>
      </div>

      {deal.notes && (
        <p className="text-gray-500 text-xs leading-relaxed mb-3 border-t border-gray-700 pt-2 line-clamp-2">{deal.notes}</p>
      )}

      <div className="flex flex-col gap-2">
        {deal.stage === 'Analyzing' && (
          <Link
            to={`/tools/deal_analyzer?purchase_price=${deal.purchase_price}`}
            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-700/40 text-blue-400 text-xs font-semibold rounded-lg transition-colors"
          >
            <BarChart2 className="h-3.5 w-3.5" />
            {t('Run Analysis', 'Analizar Negocio')}
          </Link>
        )}

        <div className="relative">
          <button
            onClick={() => setStageOpen((v) => !v)}
            className={`flex items-center justify-between w-full px-3 py-1.5 ${cfg.badge} text-xs font-semibold rounded-lg transition-colors hover:opacity-80`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {language === 'en' ? cfg.label : cfg.labelEs}
            </div>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${stageOpen ? 'rotate-180' : ''}`} />
          </button>
          {stageOpen && (
            <div className="absolute bottom-full mb-1 left-0 right-0 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-20 overflow-hidden">
              {STAGES.map((s) => {
                const sc = STAGE_CONFIG[s]
                return (
                  <button
                    key={s}
                    onClick={() => handleStage(s)}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold transition-colors hover:bg-gray-800 ${s === deal.stage ? sc.color + ' bg-gray-800' : 'text-gray-400'}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                    {language === 'en' ? sc.label : sc.labelEs}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
