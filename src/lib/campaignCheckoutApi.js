import axiosInstance from '../utils/axios'

export async function fetchPublicCampaign(identifier) {
  const response = await axiosInstance.get(`/public/campaigns/${identifier}`)
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load campaign')
  }
  return response.data.data
}

export async function fetchPublicCampaignDonationItems(identifier) {
  const response = await axiosInstance.get(
    `/public/campaigns/${identifier}/donation-items`,
  )
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load campaign items')
  }
  return response.data.data || []
}

export function computeCampaignCheckoutTotal(items, quantities, pledgeMode, prepaidMonths) {
  let monthly = 0
  for (const item of items) {
    const qty = Number(quantities[item.id]) || 0
    if (qty <= 0) continue
    monthly += Number(item.unit_price) * qty
  }
  monthly = Math.round(monthly)
  if (pledgeMode === 'prepaid_months') {
    const months = Math.max(1, Number(prepaidMonths) || 1)
    return Math.round(monthly * months)
  }
  return monthly
}

export function buildCampaignPledgeSummary(items, quantities, pledgeMode, prepaidMonths, isRecurring = true) {
  const parts = items
    .filter((item) => Number(quantities[item.id]) > 0)
    .map((item) => {
      const qty = Number(quantities[item.id])
      return `${qty}x ${item.name}`
    })
  const itemsLabel = parts.join(', ')
  if (!isRecurring) {
    return `Campaign donation: ${itemsLabel}`
  }
  if (pledgeMode === 'prepaid_months') {
    return `Campaign pledge (prepaid ${prepaidMonths} months): ${itemsLabel}`
  }
  return `Campaign pledge (monthly): ${itemsLabel}`
}
