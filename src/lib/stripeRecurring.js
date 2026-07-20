/** Default Stripe gateway on checkout (embedded Payment Element; supports recurring). */
export const STRIPE_DONATION_METHOD = 'stripe_embed'

export const STRIPE_RECURRING_WEEKLY = Object.freeze({
  interval: 'week',
  interval_count: 1,
})

export const STRIPE_RECURRING_MONTHLY = Object.freeze({
  interval: 'month',
  interval_count: 1,
})

/** Recurring billing start options (sent under `recurring`). */
export const RECURRING_START_SAME_DATE = 'same_date'
export const RECURRING_START_FIRST_OF_MONTH = 'first_of_month'
export const RECURRING_START_CUSTOM = 'custom'

export const RECURRING_CONSENT_TEXT =
  'I authorize MTJ Foundation to automatically charge this amount according to the selected schedule until I cancel.'

export function isMonthlyDonationFrequency(frequency) {
  return frequency === 'monthly'
}

export function isWeeklyDonationFrequency(frequency) {
  return frequency === 'weekly'
}

/** @deprecated Use isWeeklyDonationFrequency — kept for older payloads */
export function isDailyDonationFrequency(frequency) {
  return frequency === 'daily'
}

export function isRecurringDonationFrequency(frequency) {
  return (
    isWeeklyDonationFrequency(frequency) ||
    isMonthlyDonationFrequency(frequency) ||
    isDailyDonationFrequency(frequency)
  )
}

/**
 * Build Stripe `recurring` object for POST /donations.
 * @param {string} donationFrequency
 * @param {{ startDateMode?: string, startDate?: string, consent?: boolean }} [options]
 */
export function getStripeRecurringForPayload(donationFrequency, options = {}) {
  let base
  if (isWeeklyDonationFrequency(donationFrequency)) {
    base = { ...STRIPE_RECURRING_WEEKLY }
  } else if (isMonthlyDonationFrequency(donationFrequency)) {
    base = { ...STRIPE_RECURRING_MONTHLY }
  } else if (isDailyDonationFrequency(donationFrequency)) {
    base = { interval: 'day', interval_count: 1 }
  } else {
    return undefined
  }

  const start_date_mode = options.startDateMode || RECURRING_START_SAME_DATE
  const payload = {
    ...base,
    start_date_mode,
    consent: options.consent === true,
  }

  if (start_date_mode === RECURRING_START_FIRST_OF_MONTH) {
    payload.start_date =
      (options.startDate && String(options.startDate).trim().slice(0, 10)) ||
      getNextFirstOfMonthDateString()
  }

  if (
    start_date_mode === RECURRING_START_CUSTOM &&
    options.startDate &&
    String(options.startDate).trim()
  ) {
    payload.start_date = String(options.startDate).trim().slice(0, 10)
  }

  return payload
}

/** Next calendar 1st of month as YYYY-MM-DD (local). */
export function getNextFirstOfMonthDateString(fromDate = new Date()) {
  const d = new Date(fromDate)
  const year = d.getMonth() === 11 ? d.getFullYear() + 1 : d.getFullYear()
  const month = d.getMonth() === 11 ? 0 : d.getMonth() + 1
  const first = new Date(year, month, 1)
  const yyyy = first.getFullYear()
  const mm = String(first.getMonth() + 1).padStart(2, '0')
  const dd = String(first.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
