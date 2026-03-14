import { supabase } from '../lib/supabase'

export async function createPortalSession(userId: string): Promise<string> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  const { data: { session } } = await supabase.auth.getSession()

  const response = await fetch(`${supabaseUrl}/functions/v1/create-portal-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token ?? supabaseAnonKey}`,
      'Apikey': supabaseAnonKey,
    },
    body: JSON.stringify({ userId }),
  })

  if (!response.ok) {
    throw new Error('Failed to create portal session')
  }

  const data = await response.json()
  return data.url
}
