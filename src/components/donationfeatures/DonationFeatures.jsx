import { useState } from 'react'
import './DonationFeatures.css'
import DisasterRelief from '../../assets/img/projects/icons/disaster_relief.webp'
import Health from '../../assets/img/projects/icons/health.webp'
import Education from '../../assets/img/projects/icons/education.webp'
import CleanWater from '../../assets/img/projects/icons/clean_water.webp'
import ApnaGhar from '../../assets/img/projects/icons/apnaghar.webp'
import Qurbani from '../../assets/img/projects/icons/qurbani.webp'
import KASB from '../../assets/img/projects/icons/kasb.webp'
import Seeds from '../../assets/img/projects/icons/seeds.webp'
import Community from '../../assets/img/projects/icons/community.webp'
import AASLab from '../../assets/img/projects/icons/aaslab.webp'
 

const ICON_PROPS = {
  width: 40,
  height: 40,
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

const FEATURE_ITEMS = [
  {
    id: 'seeds',
    title: 'Seeds of Change',
    description:
      'Planting trees and raising awareness to build a greener, climate-resilient Pakistan.',
    icon: (
      <img src={Seeds} alt="Seeds of Change Icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'qurbani',
    title: 'Qurbani Barai Mustehqeen',
    description: 'Sharing the blessings of Qurbani and Eid with families who rarely enjoy fresh meat.',
    icon: (
     <img src={Qurbani} alt="Qurbani Icon"  {...ICON_PROPS}/>
)
  },
  {
    id: 'shelter',
    title: 'Disaster Relief',
    description: 'Rapid shelter, blankets, and essentials after emergencies.',
    icon: (
      <img src={DisasterRelief} alt="Disaster Relief Icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'health',
    title: 'Health',
    description:
      'Bringing essential healthcare to everyone, ensuring timely treatments for all.',
    icon: (
     <img src={Health} alt='health Icon' {...ICON_PROPS} />
    )
  },
  {
    id: 'education',
    title: 'Education',
    description:
      'Opening doors to brighter futures through accessible, quality learning for every child.',
    icon: (
     <img src={Education} alt="Education Icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'water',
    title: 'Clean Water',
    description:
      'Providing clean, safe drinking water to restore health, dignity, and daily ease.',
    icon: (
     <img src={CleanWater} alt="CleanWater Icon"  {...ICON_PROPS}/>
)
  },
  {
    id: 'apnaghar',
    title: 'Apna Ghar',
    description:
      'Offering vulnerable widows and children a safe, nurturing home to call their own.',
    icon: (
    <img src={ApnaGhar} alt="ApnaGhar Icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'kasb',
    title: 'KASB Skill Development',
    description: 'Empowering youth and women with skills that create income and independence.',
    icon: (
      <img src={KASB} alt="KASB Icon"  {...ICON_PROPS}/>
    )
  },
   {
    id: 'community',
    title: 'Community Services',
    description: 'Supporting families with essential aid to meet immediate needs with dignity.',
    icon: (
      <img src={Community} alt="Community Icon"  {...ICON_PROPS}/>
    )
  },
  {
    id: 'disaster',
    title: 'Disaster Relief',
    description: 'Responding swiftly with food, shelter, and care when crises strike globally.',
    icon: (
    <img src={DisasterRelief} alt="Disaster Relief Icon"  {...ICON_PROPS}/>
   )
  },
   {
    id: 'aaslab',
    title: 'AAS Lab & Diagnostics',
    description: 'Delivering affordable, reliable diagnostic services to ensure timely medical treatment.',
    icon: (
    <img src={AASLab} alt="AAS Lab Icon"  {...ICON_PROPS}/>
   )
  }
]

const ITEMS_PER_SLIDE = 4

const DonationFeatures = () => {
  const [startIndex, setStartIndex] = useState(0)
  const totalFeatures = FEATURE_ITEMS.length
  const maxStartIndex = Math.max(totalFeatures - ITEMS_PER_SLIDE, 0)
  const visibleFeatures =
    FEATURE_ITEMS.slice(startIndex, startIndex + ITEMS_PER_SLIDE) || FEATURE_ITEMS

  const handlePrev = () => {
    if (startIndex === 0) return
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_SLIDE, 0))
  }

  const handleNext = () => {
    if (startIndex >= maxStartIndex) return
    setStartIndex((prev) => Math.min(prev + ITEMS_PER_SLIDE, maxStartIndex))
  }

  return (
    <div className='donation_feature_container d-flex gap-32 items-start w-100 mt-16'>
      {/* LEFT COLUMN*/}
      <div className='left-column flex-1'>
        <h3 className='heading-secondary d-flex items-center gap-12 mb-8'>Make A Donation</h3>
        <h2>Changing Lives through these Initiatives</h2>
        <div className="arrowsn d-flex gap-12 items-center mt-24">
          <button
            type="button"
            className="arrow-btn inline-flex items-center justify-center pointer"
            title="Previous"
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="View previous donation programs"
          >
            &#x2190;
          </button>
          <button
            type="button"
            className="arrow-btn blue inline-flex items-center justify-center pointer"
            title="Next"
            onClick={handleNext}
            disabled={startIndex >= maxStartIndex}
            aria-label="View next donation programs"
          >
            &#x2192;
          </button>
        </div>
      </div>

      {/* RIGHT  COLUMN */}
      <div className='right-column'>
        <div className='features d-grid grid-2 items-start'>
          {visibleFeatures.map((feature) => (
            <div className='feature d-flex gap-12 items-start' key={feature.id}>
              <div className={`icon ${feature.id} d-flex items-center justify-center`}>
                {feature.icon}
              </div>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DonationFeatures