import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { DealCard, PipelineStage } from './pipelineTypes'

export function usePipeline(userId: string) {
  const [deals, setDeals] = useState<DealCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('deal_pipeline')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      setDeals((data as DealCard[]) ?? [])
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load deals')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchDeals()
  }, [fetchDeals])

  const addDeal = async (payload: {
    address: string
    purchase_price: number
    offer_price?: number | null
    notes?: string | null
  }): Promise<DealCard | null> => {
    const { data, error } = await supabase
      .from('deal_pipeline')
      .insert({ ...payload, user_id: userId, stage: 'Lead' })
      .select()
      .single()
    if (error) throw error
    const deal = data as DealCard
    setDeals((prev) => [deal, ...prev])
    return deal
  }

  const updateStage = async (id: string, stage: PipelineStage) => {
    const { error } = await supabase
      .from('deal_pipeline')
      .update({ stage, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId)
    if (error) throw error
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, stage } : d)))
  }

  const deleteDeal = async (id: string) => {
    const { error } = await supabase
      .from('deal_pipeline')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
    if (error) throw error
    setDeals((prev) => prev.filter((d) => d.id !== id))
  }

  return { deals, loading, error, addDeal, updateStage, deleteDeal, refetch: fetchDeals }
}
