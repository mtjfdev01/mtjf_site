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

export function getStoredReferralCode() {
  try {
    const code = sessionStorage.getItem(REFERRAL_CODE_SESSION_KEY)
    return code && String(code).trim() ? String(code).trim() : null
  } catch {
    return null
  }
}

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

    // Optional: also capture `ref` from URL for agency/campaign tracking
    const sp = new URLSearchParams(location.search || '')
    const refParam = sp.get('ref')
    if (refParam) {
      setRef?.(refParam)
    }

    // Staff referral: mtjfoundation.org/donate?referral_code=XXXX
    const referralCode = sp.get('referral_code')
    if (referralCode && String(referralCode).trim()) {
      try {
        sessionStorage.setItem(
          REFERRAL_CODE_SESSION_KEY,
          String(referralCode).trim(),
        )
      } catch {
        // ignore storage failures
      }
    }
  }, [location.search, setUtmParams, setRef])

  return null
}
