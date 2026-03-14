export type ForumCategory =
  | 'house-hack'
  | 'brrr'
  | 'flip'
  | 'rental'
  | 'owner-finance'
  | 'deals'
  | 'introductions'

export interface ForumPost {
  id: string
  user_id: string
  author_name: string
  title: string
  body: string
  category: ForumCategory
  is_pinned: boolean
  reply_count: number
  created_at: string
  updated_at: string
}

export interface ForumReply {
  id: string
  post_id: string
  user_id: string | null
  author_name: string
  body: string
  is_ai: boolean
  created_at: string
}

export const CATEGORIES: { value: ForumCategory | 'all'; labelEn: string; labelEs: string }[] = [
  { value: 'all', labelEn: 'All', labelEs: 'Todos' },
  { value: 'house-hack', labelEn: 'House Hack', labelEs: 'House Hack' },
  { value: 'brrr', labelEn: 'BRRR', labelEs: 'BRRR' },
  { value: 'flip', labelEn: 'Flip', labelEs: 'Flip' },
  { value: 'rental', labelEn: 'Rental', labelEs: 'Renta' },
  { value: 'owner-finance', labelEn: 'Owner Finance', labelEs: 'Financ. Vendedor' },
  { value: 'deals', labelEn: 'Deals', labelEs: 'Tratos' },
  { value: 'introductions', labelEn: 'Introductions', labelEs: 'Presentaciones' },
]

export const CATEGORY_COLORS: Record<ForumCategory, string> = {
  'house-hack': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'brrr': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'flip': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'rental': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'owner-finance': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'deals': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'introductions': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
}

export function categoryLabel(cat: ForumCategory | string, lang: 'en' | 'es') {
  const found = CATEGORIES.find((c) => c.value === cat)
  if (!found) return cat
  return lang === 'en' ? found.labelEn : found.labelEs
}

export function timeAgo(iso: string, lang: 'en' | 'es'): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (lang === 'en') {
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } else {
    if (mins < 1) return 'ahora'
    if (mins < 60) return `hace ${mins}m`
    if (hours < 24) return `hace ${hours}h`
    if (days < 7) return `hace ${days}d`
    return new Date(iso).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })
  }
}
