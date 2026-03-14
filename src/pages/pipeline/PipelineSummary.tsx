import { DealCard, STAGE_CONFIG, PipelineStage } from './pipelineTypes'
import { useLanguage } from '../../contexts/LanguageContext'

interface Props {
  deals: DealCard[]
}

export function PipelineSummary({ deals }: Props) {
  const { language } = useLanguage()
  const t = (en: string, es: string) => (language === 'en' ? en : es)

  const total = deals.length
  const closedDeals = deals.filter((d) => d.stage === 'Closed')
  const portfolioValue = closedDeals.reduce((sum, d) => sum + (d.purchase_price || 0), 0)

  const stageCounts: Partial<Record<PipelineStage, number>> = {}
  for (const deal of deals) {
    stageCounts[deal.stage] = (stageCounts[deal.stage] ?? 0) + 1
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-5 mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{t('Total Deals', 'Negocios Totales')}</p>
          <p className="text-3xl font-bold text-white">{total}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{t('Portfolio Value', 'Valor del Portafolio')}</p>
          <p className="text-3xl font-bold text-green-400">
            ${portfolioValue >= 1_000_000
              ? (portfolioValue / 1_000_000).toFixed(1) + 'M'
              : portfolioValue >= 1_000
              ? (portfolioValue / 1_000).toFixed(0) + 'K'
              : portfolioValue.toLocaleString()}
          </p>
          <p className="text-gray-600 text-xs mt-0.5">{t('Closed deals only', 'Solo negocios cerrados')}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">{t('By Stage', 'Por Etapa')}</p>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(stageCounts) as [PipelineStage, number][]).map(([stage, count]) => {
              const cfg = STAGE_CONFIG[stage]
              return (
                <span key={stage} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.badge}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                  {language === 'en' ? cfg.label : cfg.labelEs}: {count}
                </span>
              )
            })}
            {total === 0 && <span className="text-gray-600 text-xs">{t('No deals yet', 'Sin negocios aún')}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
