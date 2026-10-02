import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'

// Only keep the three attribution fields we use in payload
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign']
const REFERRAL_CODE_SESSION_KEY = 'mtj_referral_code'

function pickUtmParams(search) {
  const params = new URLSearchParams(search || '')
  const utm = {}
  for (const k of UTM_KEYS) {
    const v = params.get(k)
    if (v) utm[k] = v
  }
  return Object.keys(utm).length > 0 ? utm : null
}

/**
 * Staff referral code from session (set by CampaignTracker from URL).
 * Used by CheckoutForm for donate + membership-campaign flows.
 */
export function getStoredReferralCode() {
  try {
    const code = sessionStorage.getItem(REFERRAL_CODE_SESSION_KEY)
    return code && String(code).trim() ? String(code).trim() : null
  } catch {
    return null
  }
}

function storeReferralCode(raw) {
  const normalized = String(raw || '')
    .trim()
    .toUpperCase()
  if (!normalized) return
  try {
    sessionStorage.setItem(REFERRAL_CODE_SESSION_KEY, normalized)
  } catch {
    // ignore storage failures
  }
}

/**
 * Captures campaign attribution from the URL on every page, including:
 * - /donate?referral_code=XXXX
 * - /membership-campaign?referral_code=XXXX
 * - /membership-campaign?code=XXXX  (alias for referral_code)
 *
 * CheckoutForm reads getStoredReferralCode() and sends referral_code on submit.
 */
export default function CampaignTracker() {
  const location = useLocation()
  const { setUtmParams, setRef } = useDonation()

  useEffect(() => {
    const utm = pickUtmParams(location.search)
    if (utm) {
      setUtmParams?.(utm)
      try {
        const raw = localStorage.getItem('mtj_utm_params')
        const prev = raw ? JSON.parse(raw) : null
        const merged = { ...(prev || {}), ...utm }
        localStorage.setItem('mtj_utm_params', JSON.stringify(merged))
      } catch {
        // ignore storage failures
      }
    }

    const sp = new URLSearchParams(location.search || '')

    // Optional: also capture `ref` from URL for agency/campaign tracking
    const refParam = sp.get('ref')
    if (refParam) {
      setRef?.(refParam)
    }

    // Staff referral — same storage for donate, membership-campaign, and any other page.
    // Prefer referral_code everywhere. Accept short `code=` only on membership campaign.
    const isMembershipCampaign = location.pathname
      .replace(/\/$/, '')
      .endsWith('membership-campaign')
    const referralCode =
      sp.get('referral_code') ||
      (isMembershipCampaign ? sp.get('code') : null)
    if (referralCode) {
      storeReferralCode(referralCode)
    }
  }, [location.pathname, location.search, setUtmParams, setRef])

  return null
}
