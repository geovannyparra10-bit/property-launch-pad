import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

console.log('[Supabase] Initializing client with URL:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Profile {
  id: string
  user_id: string
  email: string
  full_name: string | null
  language: string | null
  subscription_status: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  is_admin: boolean
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}
