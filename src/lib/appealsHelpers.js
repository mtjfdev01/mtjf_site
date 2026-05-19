export const APPEAL_CATEGORIES = [
  { value: '', label: 'All Cases' },
  { value: 'medical', label: 'Medical' },
  { value: 'education', label: 'Education' },
  { value: 'ration', label: 'Ration' },
  { value: 'widow_support', label: 'Widow Support' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'other', label: 'Other' },
]

export const CATEGORY_LABELS = {
  medical: 'Medical',
  education: 'Education',
  ration: 'Ration',
  widow_support: 'Widow Support',
  emergency: 'Emergency',
  other: 'Other',
}

export const APPEAL_PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'

export function getAppealImage(appeal) {
  return (
    appeal?.cover_image_url ||
    appeal?.beneficiary?.profile_image_url ||
    APPEAL_PLACEHOLDER_IMAGE
  )
}

export function formatMoney(amount, currency = 'PKR') {
  const n = Number(amount ?? 0)
  try {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(n)
  } catch {
    return `${currency} ${n.toLocaleString()}`
  }
}

export function formatProgress(appeal) {
  return {
    percent: Math.min(100, Math.max(0, appeal?.progress_percent ?? 0)),
    raised: formatMoney(appeal?.raised_amount, appeal?.currency),
    goal: formatMoney(appeal?.goal_amount, appeal?.currency),
    donors: appeal?.donor_count ?? 0,
    daysLeft: appeal?.days_left,
  }
}

export function filterAppeals(appeals, { search, category }) {
  if (!Array.isArray(appeals)) return []
  return appeals.filter((a) => {
    if (category && a.category !== category) return false
    if (!search?.trim()) return true
    const q = search.toLowerCase()
    const hay = [a.title, a.short_description, a.beneficiary?.name, a.tags]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
}

export function getDonateUrl(appeal) {
  if (!appeal?.id) return '/checkout'
  const params = new URLSearchParams({
    appealId: String(appeal.id),
    appealSlug: appeal.slug || '',
  })
  return `/checkout?${params.toString()}`
}

/** Single line item for appeal checkout (uses projectDonations flow in context). */
export function buildAppealDonationLine(appeal, amount) {
  const total = Math.round(Number(amount) || 0)
  return {
    projectId: 'appeal',
    initiativeId: `appeal-${appeal.id}`,
    appealId: appeal.id,
    appealSlug: appeal.slug,
    projectTitle: appeal.title,
    initiativeTitle: appeal.short_description || 'Appeal donation',
    initiativeSubtitle: null,
    quantity: 1,
    donationType: 'GENERAL',
    basePrice: total,
    customAmount: 0,
    totalAmount: total,
  }
}

export function isAppealDonationLine(item) {
  return (
    item?.appealId != null ||
    item?.projectId === 'appeal' ||
    String(item?.initiativeId || '').startsWith('appeal-')
  )
}
