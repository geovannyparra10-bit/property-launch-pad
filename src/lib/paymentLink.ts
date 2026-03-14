export const STRIPE_PRICE_ID = 'price_1TAzhmLlGMCFrvDim003cEg7'
export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_fZu3cw5Uc7xucqGbk6gw000'

export function getPaymentLink(email?: string | null): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(email)}`
  }
  return STRIPE_PAYMENT_LINK
}
