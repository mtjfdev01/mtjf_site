/** Default Stripe gateway on checkout (embedded Payment Element; supports recurring). */
export const STRIPE_DONATION_METHOD = 'stripe_embed'

/** Stripe subscription shape for POST /donations (donation_method: stripe | stripe_embed). */
export const STRIPE_RECURRING_MONTHLY = Object.freeze({
  interval: 'month',
  interval_count: 1,
})

export function isMonthlyDonationFrequency(frequency) {
  return frequency === 'monthly'
}

export function getStripeRecurringForPayload(donationFrequency) {
  if (!isMonthlyDonationFrequency(donationFrequency)) return undefined
  return { ...STRIPE_RECURRING_MONTHLY }
}
