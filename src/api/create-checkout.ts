import { supabase } from '../lib/supabase'

const STRIPE_PAYMENT_LINK_PLACEHOLDER = 'https://checkout.stripe.com/pay/placeholder'

export async function createCheckoutSession(userId: string): Promise<string> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    const { data: { session } } = await supabase.auth.getSession()

    const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token ?? supabaseAnonKey}`,
        'Apikey': supabaseAnonKey,
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error('Edge function not available')
    }

    const data = await response.json()
    return data.url
  } catch {
    return STRIPE_PAYMENT_LINK_PLACEHOLDER
  }
}
