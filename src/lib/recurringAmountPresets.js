/**
 * Recurring donation amount presets from URL.
 *
 * Examples:
 *   /test-checkout?recurring=gold
 *   /test-checkout?recurring=gold&mode=monthly
 *   /test-checkout?recurring=gold&mode=prepaid&frequency=daily&periods=3
 *   /test-checkout?recurring=gold&mode=prepaid&months=3
 *   /checkout?plan=silver&mode=prepaid&frequency=weekly&weeks=4
 *
 * Modes:
 *   monthly  — same amount every period (+/- multiplies the base)
 *   prepaid  — pay N periods now (total = base × periods), then continue at base
 */
export const RECURRING_AMOUNT_PRESETS = Object.freeze({
  bronze: 500,
  silver: 1000,
  gold: 5000,
  platinum: 10000,
})

export const RECURRING_AMOUNT_URL_PARAMS = ['recurring', 'plan']

export const RECURRING_GIFT_MODE_MONTHLY = 'monthly'
export const RECURRING_GIFT_MODE_PREPAID = 'prepaid'

export const RECURRING_PRESET_FREQUENCIES = Object.freeze([
  'daily',
  'weekly',
  'monthly',
])

export const RECURRING_AMOUNT_URL_MODE_PARAMS = ['mode', 'gift']

/** Resolve preset key from URL search string. */
export function getRecurringAmountKeyFromSearch(search) {
  const params = new URLSearchParams(search || '')
  for (const name of RECURRING_AMOUNT_URL_PARAMS) {
    const raw = params.get(name)
    if (!raw) continue
    const key = String(raw).trim().toLowerCase()
    if (key && Object.prototype.hasOwnProperty.call(RECURRING_AMOUNT_PRESETS, key)) {
      return key
    }
  }
  return null
}

export function getRecurringBaseAmount(key) {
  if (!key) return null
  const amount = RECURRING_AMOUNT_PRESETS[String(key).trim().toLowerCase()]
  return Number.isFinite(Number(amount)) && Number(amount) > 0
    ? Math.round(Number(amount))
    : null
}

export function normalizeRecurringPresetFrequency(value, fallback = 'monthly') {
  const raw = String(value || '')
    .trim()
    .toLowerCase()
  if (raw === 'daily' || raw === 'day') return 'daily'
  if (raw === 'weekly' || raw === 'week') return 'weekly'
  if (raw === 'monthly' || raw === 'month') return 'monthly'
  return fallback
}

/** daily | weekly | monthly from URL (?frequency= / ?interval=). */
export function getRecurringFrequencyFromSearch(search, fallback = 'monthly') {
  const params = new URLSearchParams(search || '')
  const raw = params.get('frequency') || params.get('interval')
  if (raw) return normalizeRecurringPresetFrequency(raw, fallback)
  return fallback
}

function clampPeriodCount(n, fallback = 1) {
  if (!Number.isFinite(n) || n < 1) return Math.max(1, Math.floor(Number(fallback) || 1))
  return Math.min(36, Math.floor(n))
}

/** monthly | prepaid — default monthly; periods>1 in URL implies prepaid. */
export function getRecurringGiftModeFromSearch(search) {
  const params = new URLSearchParams(search || '')
  for (const name of RECURRING_AMOUNT_URL_MODE_PARAMS) {
    const raw = String(params.get(name) || '')
      .trim()
      .toLowerCase()
    if (raw === 'prepaid' || raw === 'prepaid_months' || raw === 'advance') {
      return RECURRING_GIFT_MODE_PREPAID
    }
    if (raw === 'monthly' || raw === 'each_month' || raw === 'recurring') {
      return RECURRING_GIFT_MODE_MONTHLY
    }
  }
  const frequency = getRecurringFrequencyFromSearch(search)
  const periods = getRecurringPeriodsFromSearch(search, frequency, 1)
  if (periods > 1) return RECURRING_GIFT_MODE_PREPAID
  return RECURRING_GIFT_MODE_MONTHLY
}

export function getRecurringMonthsFromSearch(search, fallback = 1) {
  const params = new URLSearchParams(search || '')
  const n = Number(params.get('months') || params.get('prepaid_months'))
  return clampPeriodCount(n, fallback)
}

/** Prepaid period count for daily / weekly / monthly. */
export function getRecurringPeriodsFromSearch(search, frequency = 'monthly', fallback = 1) {
  const params = new URLSearchParams(search || '')
  const freq = normalizeRecurringPresetFrequency(frequency)

  const generic = Number(params.get('periods') || params.get('prepaid_periods'))
  if (Number.isFinite(generic) && generic >= 1) {
    return clampPeriodCount(generic, fallback)
  }

  if (freq === 'daily') {
    const n = Number(params.get('days') || params.get('prepaid_days'))
    if (Number.isFinite(n) && n >= 1) return clampPeriodCount(n, fallback)
  }

  if (freq === 'weekly') {
    const n = Number(params.get('weeks') || params.get('prepaid_weeks'))
    if (Number.isFinite(n) && n >= 1) return clampPeriodCount(n, fallback)
  }

  return getRecurringMonthsFromSearch(search, fallback)
}

export function prepaidPeriodUnitLabel(frequency, count = 1) {
  const n = Math.max(1, Math.floor(Number(count) || 1))
  const freq = normalizeRecurringPresetFrequency(frequency)
  if (freq === 'daily') return n === 1 ? 'day' : 'days'
  if (freq === 'weekly') return n === 1 ? 'week' : 'weeks'
  return n === 1 ? 'month' : 'months'
}

export function prepaidPeriodCadenceLabel(frequency) {
  const freq = normalizeRecurringPresetFrequency(frequency)
  if (freq === 'daily') return 'day'
  if (freq === 'weekly') return 'week'
  return 'month'
}

/**
 * @returns {{
 *   monthlyAmount: number,
 *   periodAmount: number,
 *   prepaidMonths: number,
 *   prepaidPeriods: number,
 *   payNow: number,
 *   mode: string,
 *   frequency: string,
 *   periodUnitLabel: string,
 *   cadenceLabel: string,
 * }}
 */
export function computeRecurringPresetTotals({
  baseAmount,
  mode = RECURRING_GIFT_MODE_MONTHLY,
  amountUnits = 1,
  prepaidMonths = 1,
  prepaidPeriods,
  frequency = 'monthly',
} = {}) {
  const base = Math.round(Number(baseAmount) || 0)
  const units = Math.max(1, Math.floor(Number(amountUnits) || 1))
  const freq = normalizeRecurringPresetFrequency(frequency)
  const isPrepaid = mode === RECURRING_GIFT_MODE_PREPAID

  const resolvedPeriods = isPrepaid
    ? clampPeriodCount(
        prepaidPeriods != null ? Number(prepaidPeriods) : Number(prepaidMonths),
        1,
      )
    : 1

  const periodAmount = isPrepaid ? base : base * units
  const payNow = periodAmount * resolvedPeriods

  return {
    mode: isPrepaid ? RECURRING_GIFT_MODE_PREPAID : RECURRING_GIFT_MODE_MONTHLY,
    frequency: freq,
    periodAmount,
    monthlyAmount: periodAmount,
    prepaidPeriods: resolvedPeriods,
    prepaidMonths: freq === 'monthly' ? resolvedPeriods : resolvedPeriods,
    payNow,
    amountUnits: units,
    periodUnitLabel: prepaidPeriodUnitLabel(freq, resolvedPeriods),
    cadenceLabel: prepaidPeriodCadenceLabel(freq),
  }
}

/** Clamp to whole units of base (min = 1 unit). */
export function snapRecurringAmount(amount, baseAmount) {
  const base = Math.round(Number(baseAmount))
  if (!Number.isFinite(base) || base <= 0) return 0
  const n = Math.round(Number(amount) || 0)
  const units = Math.max(1, Math.round(n / base))
  return units * base
}
