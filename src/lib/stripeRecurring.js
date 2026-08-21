/** Default Stripe gateway on checkout (embedded Payment Element; supports recurring). */
export const STRIPE_DONATION_METHOD = 'stripe_embed'

export const STRIPE_RECURRING_WEEKLY = Object.freeze({
  interval: 'week',
  interval_count: 1,
})

export const STRIPE_RECURRING_DAILY = Object.freeze({
  interval: 'day',
  interval_count: 1,
})

export const STRIPE_RECURRING_MONTHLY = Object.freeze({
  interval: 'month',
  interval_count: 1,
})

/** Recurring billing start options (sent under `recurring`). */
export const RECURRING_START_SAME_DATE = 'same_date'
export const RECURRING_START_FIRST_OF_MONTH = 'first_of_month'
export const RECURRING_START_DAY_OF_MONTH = 'day_of_month'
export const RECURRING_START_CUSTOM = 'custom'

const PKT_TIMEZONE = 'Asia/Karachi'

/** Today as YYYY-MM-DD in Pakistan time. */
export function getTodayDateString(fromDate = new Date()) {
  return fromDate.toLocaleDateString('en-CA', { timeZone: PKT_TIMEZONE })
}

/** Day of month (1–31) in Pakistan time. */
export function getTodayDayOfMonth(fromDate = new Date()) {
  const pkt = new Date(fromDate.toLocaleString('en-US', { timeZone: PKT_TIMEZONE }))
  return pkt.getDate()
}

/** Minimum days between signup and the next monthly billing / reminder date. */
export const MIN_MONTHLY_RECURRING_GAP_DAYS = 20

function clampDayToMonth(day, year, monthIndex) {
  const last = new Date(year, monthIndex + 1, 0).getDate()
  const n = Math.floor(Number(day))
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(n, last)
}

function ymdToUtcMs(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(ymd || '').trim())
  if (!m) return NaN
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

function calendarDaysFromReferenceToYmd(ymd, fromDate = new Date()) {
  const fromMs = ymdToUtcMs(getTodayDateString(fromDate))
  const toMs = ymdToUtcMs(ymd)
  if (!Number.isFinite(fromMs) || !Number.isFinite(toMs)) return NaN
  return Math.round((toMs - fromMs) / 86400000)
}

function advanceMonthYmd(year, monthIndex, dayOfMonth) {
  let y = year
  let m = monthIndex + 1
  if (m > 11) {
    m = 0
    y += 1
  }
  const finalDay = clampDayToMonth(dayOfMonth, y, m)
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(finalDay).padStart(2, '0')}`
}

/**
 * Next calendar date (PKT) with the given day-of-month, at least 20 days after signup.
 * Example: donate on the 25th, pick the 5th → returns the 5th ~40 days later, not ~10.
 */
export function buildStartDateForDayOfMonth(
  dayOfMonth,
  fromDate = new Date(),
  minGapDays = MIN_MONTHLY_RECURRING_GAP_DAYS,
) {
  const pkt = new Date(fromDate.toLocaleString('en-US', { timeZone: PKT_TIMEZONE }))
  let year = pkt.getFullYear()
  let month = pkt.getMonth()
  const todayDay = pkt.getDate()
  const dom = clampDayToMonth(dayOfMonth, year, month)

  if (dom < todayDay) {
    month += 1
    if (month > 11) {
      month = 0
      year += 1
    }
  }

  let candidate = `${year}-${String(month + 1).padStart(2, '0')}-${String(
    clampDayToMonth(dayOfMonth, year, month),
  ).padStart(2, '0')}`

  let guard = 0
  while (calendarDaysFromReferenceToYmd(candidate, fromDate) < minGapDays && guard < 14) {
    const [y, m] = candidate.split('-').map(Number)
    candidate = advanceMonthYmd(y, m - 1, dayOfMonth)
    guard += 1
  }

  return candidate
}

export const RECURRING_CONSENT_TEXT =
  'I authorize MTJ Foundation to automatically charge this amount according to the selected schedule until I cancel.'

export function isMonthlyDonationFrequency(frequency) {
  return frequency === 'monthly'
}

export function isWeeklyDonationFrequency(frequency) {
  return frequency === 'weekly'
}

export function isDailyDonationFrequency(frequency) {
  return frequency === 'daily'
}

export function isRecurringDonationFrequency(frequency) {
  return (
    isDailyDonationFrequency(frequency) ||
    isWeeklyDonationFrequency(frequency) ||
    isMonthlyDonationFrequency(frequency)
  )
}

/**
 * Build Stripe `recurring` object for POST /donations.
 * @param {string} donationFrequency
 * @param {{ startDateMode?: string, startDate?: string, dayOfMonth?: number|string, consent?: boolean }} [options]
 */
export function getStripeRecurringForPayload(donationFrequency, options = {}) {
  let base
  if (isDailyDonationFrequency(donationFrequency)) {
    base = { ...STRIPE_RECURRING_DAILY }
  } else if (isWeeklyDonationFrequency(donationFrequency)) {
    base = { ...STRIPE_RECURRING_WEEKLY }
  } else if (isMonthlyDonationFrequency(donationFrequency)) {
    base = { ...STRIPE_RECURRING_MONTHLY }
  } else {
    return undefined
  }

  // Daily has no start-date UI — always charge today and repeat daily
  if (isDailyDonationFrequency(donationFrequency)) {
    return {
      ...base,
      start_date_mode: RECURRING_START_SAME_DATE,
      consent: options.consent === true,
    }
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
      buildStartDateForDayOfMonth(1)
  }

  if (start_date_mode === RECURRING_START_DAY_OF_MONTH) {
    const day =
      Number(options.dayOfMonth) ||
      getTodayDayOfMonth()
    payload.day_of_month = day
    payload.start_date = buildStartDateForDayOfMonth(day)
  }

  if (
    start_date_mode === RECURRING_START_SAME_DATE &&
    isMonthlyDonationFrequency(donationFrequency)
  ) {
    payload.start_date = getTodayDateString()
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
