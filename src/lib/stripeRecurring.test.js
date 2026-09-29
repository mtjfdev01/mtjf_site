import {
  getStripeRecurringForPayload,
  isRecurringDonationFrequency,
  isYearlyDonationFrequency,
} from './stripeRecurring'

describe('yearly recurring donations', () => {
  it('builds an annual Stripe recurrence with same-date billing', () => {
    const recurring = getStripeRecurringForPayload('yearly', { consent: true })

    expect(isYearlyDonationFrequency('yearly')).toBe(true)
    expect(isRecurringDonationFrequency('yearly')).toBe(true)
    expect(recurring).toEqual(
      expect.objectContaining({
        interval: 'year',
        interval_count: 1,
        start_date_mode: 'same_date',
        consent: true,
      }),
    )
    expect(recurring.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('keeps monthly recurrence unchanged', () => {
    expect(getStripeRecurringForPayload('monthly')).toEqual(
      expect.objectContaining({ interval: 'month', interval_count: 1 }),
    )
  })
})