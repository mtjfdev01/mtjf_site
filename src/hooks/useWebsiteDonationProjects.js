import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'

import health from '../assets/img/projects/icons/MTJF_Logos/health.svg'
import education from '../assets/img/projects/icons/MTJF_Logos/education.svg'
import cleanWater from '../assets/img/projects/icons/MTJF_Logos/clean_water.svg'
import apnaghar from '../assets/img/projects/icons/MTJF_Logos/apnaghar.svg'
import disasterRelief from '../assets/img/projects/icons/MTJF_Logos/disaster_relief.svg'
import kasb from '../assets/img/projects/icons/MTJF_Logos/kasb.svg'
import seeds from '../assets/img/projects/icons/MTJF_Logos/seeds.svg'
import qurbani from '../assets/img/projects/icons/qurbani.png'
import aaslab from '../assets/img/projects/icons/MTJF_Logos/aaslab.svg'
import community from '../assets/img/projects/icons/MTJF_Logos/community.svg'

const ICON_MAP = {
  health,
  education,
  clean_water: cleanWater,
  apnaghar,
  disaster_relief: disasterRelief,
  kasb,
  seeds,
  qurbani,
  aaslab,
  community,
  'gaza-relief': disasterRelief,
  'disaster-management': disasterRelief,
  'clean-water': cleanWater,
  'apna-ghar': apnaghar,
  'kasb-skill-development': kasb,
  'seeds-of-change': seeds,
  'aas-lab-diagnostics': aaslab,
  'community-services': community,
}

const applyIcons = (cards) =>
  (cards || []).map((project) => {
    const icon =
      ICON_MAP[project.icon_key] ||
      ICON_MAP[project.id] ||
      project.icon ||
      health
    return {
      ...project,
      icon,
      initiatives: (project.initiatives || []).map((initiative) => ({
        ...initiative,
        icon:
          ICON_MAP[initiative.icon_key] ||
          ICON_MAP[initiative.id] ||
          icon,
      })),
    }
  })

export const useWebsiteDonationProjects = (fallback = []) => {
  const [projectCards, setProjectCards] = useState(() => applyIcons(fallback))

  useEffect(() => {
    let cancelled = false
    axiosInstance
      .get('/donations/public/website-projects')
      .then((res) => {
        const rows = res.data?.data
        if (cancelled || !Array.isArray(rows) || !rows.length) return
        setProjectCards(applyIcons(rows))
      })
      .catch(() => {
        // Keep hardcoded fallback if DMS catalog is unavailable.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return projectCards
}
