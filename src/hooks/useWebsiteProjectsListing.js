import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'
import { PROJECTS_LISTING_DATA } from '../data/projectsData'

/**
 * Flip to true only when testing / shipping DMS catalog for /projects.
 * Default false = static PROJECTS_LISTING_DATA from projectsData.js.
 */
export const USE_DMS_WEBSITE_PROJECTS_LISTING = false

const mergeListing = (apiRows, fallback) => {
  const staticById = Object.fromEntries(
    (fallback || []).map((project) => [project.id, project]),
  )

  if (!Array.isArray(apiRows) || apiRows.length === 0) {
    return fallback || []
  }

  return apiRows.map((api) => {
    const stat = staticById[api.id] || {}
    const id = api.id || stat.id

    return {
      ...stat,
      id,
      title: api.title || stat.title || id,
      subtitle: stat.subtitle || '',
      description: stat.description || '',
      impactStatement: stat.impactStatement || '',
      image: api.listingImage || stat.image,
      donateButtonText: stat.donateButtonText || 'Donate',
      learnMorePath: stat.learnMorePath || `/projects/${id}`,
      donatePath: stat.donatePath || `/donate/${id}`,
    }
  })
}

/**
 * Projects listing page.
 * When USE_DMS_WEBSITE_PROJECTS_LISTING is false, returns static fallback only.
 */
export const useWebsiteProjectsListing = (
  fallback = PROJECTS_LISTING_DATA,
  enabled = USE_DMS_WEBSITE_PROJECTS_LISTING,
) => {
  const [projects, setProjects] = useState(() => fallback)

  useEffect(() => {
    if (!enabled) {
      setProjects(fallback)
      return undefined
    }

    let cancelled = false

    axiosInstance
      .get('/donations/public/website-projects')
      .then((res) => {
        if (cancelled) return
        const rows = res.data?.data
        setProjects(mergeListing(rows, fallback))
      })
      .catch(() => {
        // Keep static fallback when DMS catalog is unavailable.
      })

    return () => {
      cancelled = true
    }
  }, [fallback, enabled])

  return projects
}
