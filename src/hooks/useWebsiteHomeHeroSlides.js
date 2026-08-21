import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'

/**
 * Home hero slides from DMS.
 * Only fetches when enabled=true; otherwise returns static fallback.
 */
export const useWebsiteHomeHeroSlides = (fallback = [], enabled = false) => {
  const [slides, setSlides] = useState(fallback)

  useEffect(() => {
    if (!enabled) {
      setSlides(fallback)
      return undefined
    }

    let cancelled = false
    axiosInstance
      .get('/donations/public/home-hero-slides')
      .then((res) => {
        const rows = res.data?.data
        if (cancelled || !Array.isArray(rows) || !rows.length) return
        const mapped = rows
          .filter((row) => row?.desktop && row?.mobile)
          .map((row) => ({
            desktop: row.desktop,
            mobile: row.mobile,
            link: row.link || null,
          }))
        if (mapped.length) setSlides(mapped)
      })
      .catch(() => {
        // Keep hardcoded fallback if DMS hero slides are unavailable.
      })
    return () => {
      cancelled = true
    }
  }, [enabled])

  return slides
}
