import { useState, useEffect, useRef } from 'react'
import { Plus, TrendingUp } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useToast } from '../../contexts/ToastContext'
import { usePipeline } from './usePipeline'
import { STAGES, STAGE_CONFIG, PipelineStage } from './pipelineTypes'
import { DealCardItem } from './DealCardItem'
import { AddDealModal } from './AddDealModal'
import { PipelineSummary } from './PipelineSummary'
import { Confetti } from './Confetti'

export function Pipeline() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const { showToast } = useToast()
  const { deals, loading, error, addDeal, updateStage, deleteDeal } = usePipeline(user!.id)
  const [showModal, setShowModal] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const prevStagesRef = useRef<Record<string, PipelineStage>>({})

  const t = (en: string, es: string) => (language === 'en' ? en : es)

  useEffect(() => {
    deals.forEach((deal) => {
      const prev = prevStagesRef.current[deal.id]
      if (prev && prev !== 'Closed' && deal.stage === 'Closed') {
        setConfetti(true)
        showToast(
          t('Congratulations! Deal closed!', '¡Felicidades! ¡Negocio cerrado!'),
          'success'
        )
        setTimeout(() => setConfetti(false), 4000)
      }
      prevStagesRef.current[deal.id] = deal.stage
    })
  }, [deals, showToast, t])

  useEffect(() => {
    const map: Record<string, PipelineStage> = {}
    deals.forEach((d) => { map[d.id] = d.stage })
    if (Object.keys(prevStagesRef.current).length === 0) {
      prevStagesRef.current = map
    }
  }, [deals])

  const dealsByStage = (stage: PipelineStage) => deals.filter((d) => d.stage === stage)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Confetti active={confetti} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-xl">
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{t('Deal Pipeline', 'Pipeline de Negocios')}</h1>
              <p className="text-gray-500 text-sm">{t('Track your deals from lead to close', 'Rastrea tus negocios desde prospecto hasta cierre')}</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t('Add Deal', 'Agregar Negocio')}</span>
            <span className="sm:hidden">{t('Add', 'Agregar')}</span>
          </button>
        </div>

        <PipelineSummary deals={deals} />

        {error && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-xl px-4 py-3 text-red-300 text-sm mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const cfg = STAGE_CONFIG[stage]
            const stageDeals = dealsByStage(stage)
            return (
              <div key={stage} className="flex-shrink-0 w-full lg:w-64 xl:w-72">
                <div className={`flex items-center gap-2 px-4 py-3 rounded-t-xl ${cfg.headerBg} border ${cfg.border} border-b-0`}>
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                  <span className={`font-bold text-sm ${cfg.color}`}>
                    {language === 'en' ? cfg.label : cfg.labelEs}
                  </span>
                  <span className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded-md ${cfg.badge}`}>
                    {stageDeals.length}
                  </span>
                </div>
                <div className={`border ${cfg.border} border-t-0 rounded-b-xl bg-gray-900/50 min-h-[200px] p-3 space-y-3`}>
                  {stageDeals.length === 0 ? (
                    <div className="flex items-center justify-center h-24">
                      <p className="text-gray-700 text-xs text-center">
                        {t('No deals here', 'Sin negocios aquí')}
                      </p>
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <DealCardItem
                        key={deal.id}
                        deal={deal}
                        onStageChange={updateStage}
                        onDelete={deleteDeal}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showModal && (
        <AddDealModal
          onClose={() => setShowModal(false)}
          onAdd={addDeal}
        />
      )}
    </div>
  )
}
