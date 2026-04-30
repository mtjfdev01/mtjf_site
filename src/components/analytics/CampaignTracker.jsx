import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'

// Only keep the three attribution fields we use in payload
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign']

function pickUtmParams(search) {
  const params = new URLSearchParams(search || '')
  const utm = {}
  for (const k of UTM_KEYS) {
    const v = params.get(k)
    if (v) utm[k] = v
  }
  return Object.keys(utm).length > 0 ? utm : null
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
  }, [location.search, setUtmParams, setRef])

  return null
}

