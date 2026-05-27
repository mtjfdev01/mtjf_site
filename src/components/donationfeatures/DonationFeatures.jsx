import { useState } from 'react'
import './DonationFeatures.css'
import DisasterRelief from '../../assets/img/projects/icons/MTJF_Logos/disaster_relief.svg'
import Health from '../../assets/img/projects/icons/MTJF_Logos/health.svg'
import Education from '../../assets/img/projects/icons/MTJF_Logos/education.svg'
import CleanWater from '../../assets/img/projects/icons/MTJF_Logos/clean_water.svg'
import ApnaGhar from '../../assets/img/projects/icons/MTJF_Logos/apnaghar.svg'
import Qurbani from '../../assets/img/projects/icons/MTJF_Logos/qurbani.svg'
import KASB from '../../assets/img/projects/icons/MTJF_Logos/kasb.svg'
import Seeds from '../../assets/img/projects/icons/MTJF_Logos/seeds.svg'
import Community from '../../assets/img/projects/icons/MTJF_Logos/community.svg'
import AASLab from '../../assets/img/projects/icons/MTJF_Logos/aaslab.svg'
import { Link } from 'react-router-dom'

const ICON_PROPS = {
  width: 60,
  height: 60,
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

const FEATURE_ITEMS = [
  {
    id: 'apna-ghar',
    title: 'APNA GHAR',
    description:
      'Offering vulnerable widows and children a safe, nurturing home to call their own.',
    icon: (
    <img src={ApnaGhar} alt="Apna Ghar - A safe home for orphans and widows program icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'health',
    title: 'HEALTH',
    description:
      'Bringing essential healthcare to everyone, ensuring timely treatments for all.',
    icon: (
     <img src={Health} alt="Health - Essential healthcare and medical treatment services program icon" {...ICON_PROPS} />
    )
  },
  {
    id: 'education',
    title: 'EDUCATION',
    description:
      'Opening doors to brighter futures through accessible, quality learning for every child.',
    icon: (
     <img src={Education} alt="Education - Dream Schools, Al Hasanain College, and Scholarships program icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'community-services',
    title: 'COMMUNITY SERVICES',
    description: 'Supporting families with essential aid to meet immediate needs with dignity.',
    icon: (
      <img src={Community} alt="Community Services - Marriage gifts, monthly ration, cash assistance, and Eid gifts program icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'kasb-skill-development',
    title: 'KASB VOCATIONAL CENTRE',
    description: 'Empowering youth and women with skills that create income and independence.',
    icon: (
      <img src={KASB} alt="KASB Vocational Centre - Training and livelihood skills program icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'clean-water',
    title: 'CLEAN WATER',
    description:
      'Providing clean, safe drinking water to restore health, dignity, and daily ease.',
    icon: (
     <img src={CleanWater} alt="Clean Water - Water filtration plants and hand pumps program icon" {...ICON_PROPS}/>
)
  },
  {
    id: 'disaster-management',
    title: 'DISASTER Management',
    description: 'Responding swiftly with food, shelter, and care when crises strike globally.',
    icon: (
    <img src={DisasterRelief} alt="Disaster Management - Emergency response and relief services program icon"  {...ICON_PROPS}/>
   )
  },
  {
    id: 'seeds-of-change',
    title: 'SEEDS OF CHANGE',
    description:
      'Planting trees and raising awareness to build a greener, climate-resilient Pakistan.',
    icon: (
      <img src={Seeds} alt="Seeds of Change - Environmental conservation and tree planting program icon"  {...ICON_PROPS}/>
    )
  },
//   {
//     id: 'qurbani-baraye-mustehqeen',
//     title: 'Qurbani Baraye Mustehqeen',
//     description: 'Sharing the blessings of Qurbani and Eid with families who rarely enjoy fresh meat.',
//     icon: (
//      <img src={Qurbani} alt="Qurbani Baraye Mustehqeen - Qurbani meat distribution program icon" {...ICON_PROPS}/>
// )
//   },
  {
    id: 'aas-lab-diagnostics',
    title: 'AAS LAB',
    description: 'Delivering affordable, reliable diagnostic services to ensure timely medical treatment.',
    icon: (
    <img src={AASLab} alt="AAS Lab - Affordable diagnostic and medical testing services program icon"  {...ICON_PROPS}/>
   )
  }
]

const ITEMS_PER_SLIDE = 4

const DonationFeatures = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState('right')
  const totalFeatures = FEATURE_ITEMS.length
  const maxStartIndex = Math.max(totalFeatures - ITEMS_PER_SLIDE, 0)
  const visibleFeatures =
    FEATURE_ITEMS.slice(startIndex, startIndex + ITEMS_PER_SLIDE) || FEATURE_ITEMS

  const handlePrev = () => {
    if (startIndex === 0) return
    setSlideDirection('left')
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_SLIDE, 0))
  }

  const handleNext = () => {
    if (startIndex >= maxStartIndex) return
    setSlideDirection('right')
    setStartIndex((prev) => Math.min(prev + ITEMS_PER_SLIDE, maxStartIndex))
  }

  return (
    <div className='donation_feature_container d-flex gap-32 items-start w-100 mt-16'>
      {/* LEFT COLUMN*/}
      <div className='left-column flex-1'>
        <h2 className='heading-secondary d-flex items-center gap-12 mb-8'>Make A Donation</h2>
        <h2>Changing Lives through these Initiatives</h2>
        <div className="slider-nav-container mt-24">
          <button
            type="button"
            className="slider-nav-btn slider-nav-prev"
            title="Previous"
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="View previous donation programs"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            className="slider-nav-btn slider-nav-next"
            title="Next"
            onClick={handleNext}
            disabled={startIndex >= maxStartIndex}
            aria-label="View next donation programs"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* RIGHT  COLUMN */}
      <div className='right-column'>
        <div className={`features d-grid grid-2 items-start slide-${slideDirection}`} key={startIndex}>
          {visibleFeatures.map((feature) => (
            <Link to={`/projects/${feature.id}`} key={feature.id}>
            <div className='feature d-flex gap-12 items-start' key={feature.id}>
              <div className={`feature_icon ${feature.id} d-flex items-center justify-center`}>
                {feature.icon}
              </div>
              <div className='text-left'>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DonationFeatures