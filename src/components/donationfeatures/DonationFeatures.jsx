import { useState } from 'react'
import './DonationFeatures.css'

const ICON_PROPS = {
  width: 30,
  height: 30,
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

const FEATURE_ITEMS = [
  {
    id: 'marriage',
    title: 'Marriage Support',
    description:
      'Marriage support provides guidance and builds strong, healthy relationships.',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8.5" cy="12" r="3.2"></circle>
        <circle cx="15.5" cy="12" r="3.2"></circle>
        <path d="M11 12c.5-2 1.5-3.5 3-4"></path>
      </svg>
    )
  },
  {
    id: 'food',
    title: 'Food Assistance',
    description: 'Nutritious meals and ration packs for vulnerable families.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 10h16"></path>
        <path d="M5 10a3 3 0 0 0 6 0V4"></path>
        <path d="M13 4h6v6a3 3 0 0 1-3 3"></path>
        <path d="M7 20h10"></path>
      </svg>
    )
  },
  {
    id: 'shelter',
    title: 'Disaster Relief',
    description: 'Rapid shelter, blankets, and essentials after emergencies.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 11 12 4l9 7"></path>
        <path d="M5 10v10h14V10"></path>
        <path d="M9 21V12h6v9"></path>
      </svg>
    )
  },
  {
    id: 'health',
    title: 'Health',
    description:
      'Health is a state of physical, mental, and emotional well-being, not just of illness.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M21 10v6a3 3 0 0 1-6 0v-6"></path>
        <path d="M3 13a8 8 0 0 0 8 8"></path>
        <circle cx="18" cy="7" r="2"></circle>
      </svg>
    )
  },
  {
    id: 'education',
    title: 'Education',
    description:
      'Education is the process of gaining knowledge, skills, personal and social growth.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 2L2 7l10 5 10-5-10-5Z"></path>
        <path d="M12 12v8"></path>
        <path d="M7 18a5 5 0 0 0 10 0"></path>
      </svg>
    )
  },
  {
    id: 'water',
    title: 'Clean Water',
    description:
      'Clean water is safe, fresh water free from pollutants — essential for health and hygiene.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 2s6 6.5 6 10a6 6 0 1 1-12 0c0-3.5 6-10 6-10Z"></path>
      </svg>
    )
  },
  {
    id: 'marriage',
    title: 'Marriage Support',
    description:
      'Marriage support provides guidance and builds strong, healthy relationships.',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8.5" cy="12" r="3.2"></circle>
        <circle cx="15.5" cy="12" r="3.2"></circle>
        <path d="M11 12c.5-2 1.5-3.5 3-4"></path>
      </svg>
    )
  },
  {
    id: 'food',
    title: 'Food Assistance',
    description: 'Nutritious meals and ration packs for vulnerable families.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 10h16"></path>
        <path d="M5 10a3 3 0 0 0 6 0V4"></path>
        <path d="M13 4h6v6a3 3 0 0 1-3 3"></path>
        <path d="M7 20h10"></path>
      </svg>
    )
  },
  {
    id: 'shelter',
    title: 'Disaster Relief',
    description: 'Rapid shelter, blankets, and essentials after emergencies.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 11 12 4l9 7"></path>
        <path d="M5 10v10h14V10"></path>
        <path d="M9 21V12h6v9"></path>
      </svg>
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
        <h1 className='heading-secondary d-flex items-center gap-12 mb-8'>Make A Donation</h1>
        <h2>Various things we <br /> help in whole world</h2>
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