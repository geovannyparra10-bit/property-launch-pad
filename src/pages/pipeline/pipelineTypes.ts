export type PipelineStage = 'Lead' | 'Analyzing' | 'Offer Made' | 'Under Contract' | 'Closed' | 'Dead'

export const STAGES: PipelineStage[] = [
  'Lead',
  'Analyzing',
  'Offer Made',
  'Under Contract',
  'Closed',
  'Dead',
]

export interface StageConfig {
  label: string
  labelEs: string
  color: string
  headerBg: string
  border: string
  badge: string
  dot: string
}

export const STAGE_CONFIG: Record<PipelineStage, StageConfig> = {
  Lead: {
    label: 'Lead',
    labelEs: 'Prospecto',
    color: 'text-gray-300',
    headerBg: 'bg-gray-700',
    border: 'border-gray-600',
    badge: 'bg-gray-700 text-gray-300',
    dot: 'bg-gray-400',
  },
  Analyzing: {
    label: 'Analyzing',
    labelEs: 'Analizando',
    color: 'text-blue-400',
    headerBg: 'bg-blue-900/60',
    border: 'border-blue-700/50',
    badge: 'bg-blue-900/60 text-blue-300',
    dot: 'bg-blue-400',
  },
  'Offer Made': {
    label: 'Offer Made',
    labelEs: 'Oferta Realizada',
    color: 'text-yellow-400',
    headerBg: 'bg-yellow-900/40',
    border: 'border-yellow-700/40',
    badge: 'bg-yellow-900/40 text-yellow-300',
    dot: 'bg-yellow-400',
  },
  'Under Contract': {
    label: 'Under Contract',
    labelEs: 'Bajo Contrato',
    color: 'text-orange-400',
    headerBg: 'bg-orange-900/40',
    border: 'border-orange-700/40',
    badge: 'bg-orange-900/40 text-orange-300',
    dot: 'bg-orange-400',
  },
  Closed: {
    label: 'Closed',
    labelEs: 'Cerrado',
    color: 'text-green-400',
    headerBg: 'bg-green-900/40',
    border: 'border-green-700/40',
    badge: 'bg-green-900/40 text-green-300',
    dot: 'bg-green-400',
  },
  Dead: {
    label: 'Dead',
    labelEs: 'Muerto',
    color: 'text-red-400',
    headerBg: 'bg-red-900/30',
    border: 'border-red-700/40',
    badge: 'bg-red-900/30 text-red-300',
    dot: 'bg-red-400',
  },
}

export interface DealCard {
  id: string
  user_id: string
  address: string
  purchase_price: number
  offer_price: number | null
  stage: PipelineStage
  notes: string | null
  scenario_id: string | null
  created_at: string
  updated_at: string
}
