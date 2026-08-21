import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'
import { PROJECTS_LISTING_DATA } from '../data/projectsData'
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
 * Projects listing page: DMS catalog order/visibility + static card copy/images from fallback.
 */
export const useWebsiteProjectsListing = (fallback = PROJECTS_LISTING_DATA) => {
  const [projects, setProjects] = useState(() => fallback)

  useEffect(() => {
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
  }, [fallback])

  return projects
}
