import { useState, useEffect, useRef } from 'react'
import './Stats.css'
import Water from '../../assets/img/projects/icons2/water.webp';
import Scholarship from '../../assets/img/projects/icons2/scholarship.webp';
import Food from '../../assets/img/projects/icons2/food.webp';
import Education from '../../assets/img/projects/icons2/education.webp';
import Medicine from '../../assets/img/projects/icons2/medicine.webp';
import DreamSchool from '../../assets/img/projects/icons2/Dream School.webp';
import MarriageGift from '../../assets/img/projects/icons2/Marrigae Gift.webp';
const STATS_DATA = [
  {
    id: 'floods',
    icon: (
        // <img src={logo_one} alt="flood icon" /> 
        <img src={Education} alt="Disaster Relief Icon" />
      ),
    statistic: '380,000+',
    description: 'Disaster Relief',
    iconColor: '#f6b319'
  },
  {
    id: 'health',
    icon: (
        <img src={Medicine} alt="Health Icon" />
   ),
    statistic: '950,000+',
    description: 'Medical Assistance',
    iconColor: '#2cade3'
  },
  {
    id: 'homes',
    icon: (
      <img src={Food} alt="Homes Icon" />
    ),
    statistic: '200,000+', 
    description: 'Ration Bags Distributed',
    iconColor: '#e02228'
  },
  {
    id: 'water',
    icon: (
     <img src={Water} alt="water icon" />
    ),
    statistic: '430+',
    description: 'Handpumps Installed',
    iconColor: '#53af47'
  },
  {
    id: 'scholarship',
    icon: (
      <img src={Scholarship} alt="scholarship icon" />
    ),
    statistic: '7000+',
    description: 'Scholarships Awarded',
    iconColor: '#e02228'
  },
  {
    id: 'floods',
    icon: (
        // <img src={logo_one} alt="flood icon" /> 
        <img src={Education} alt="Education Icon" />
      ),
    statistic: '735',
    description: 'Homes Built',
    iconColor: '#f6b319'
  }
  ,
  {
    id: 'aid',
    icon: (
      <img src={MarriageGift} alt="Marriage Gift Icon" />
  ),
    statistic: '651',
    description: 'Marriage Gifts',
    iconColor: '#2cade3'
  },
  {
    id: 'food',
    icon: (
      <img src={DreamSchool} alt="Dream School Icon" /> 
    ),
    statistic: '9',
    description: 'Dreams Schools',
    iconColor: '#f6b319'
  },
  {
    id: 'water',
    icon: (
     <img src={Water} alt="Water Filteration Plants Icon" />
    ),
    statistic: '12',
    description: 'Water Filteration Plants',
    iconColor: '#53af47'
  }
]

// Counter component for animated numbers
const AnimatedCounter = ({ targetValue, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCounter()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [hasAnimated])

  const animateCounter = () => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = targetValue / steps
    const stepDuration = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newValue = Math.min(
        Math.floor(increment * currentStep),
        targetValue
      )
      setCount(newValue)

      if (currentStep >= steps || newValue >= targetValue) {
        setCount(targetValue)
        clearInterval(timer)
      }
    }, stepDuration)
  }

  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  return (
    <span ref={counterRef}>
      {formatNumber(count)}{suffix}
    </span>
  )
}

const Stats = () => {
  // Parse statistic values to extract number and suffix
  const parseStatistic = (statString) => {
    const match = statString.match(/([\d,]+)(.*)/)
    if (match) {
      const numberStr = match[1].replace(/,/g, '')
      const suffix = match[2].trim()
      return {
        value: parseInt(numberStr, 10),
        suffix: suffix ? ` ${suffix}` : ''
      }
    }
    return { value: 0, suffix: '' }
  }

  return (
    <section className="stats-section container py-64">
      <div className="stats-header text-center mb-48">
        <h2 className="heading-secondary mb-16">Since 2019 We Have</h2>
        <h2>
         Brought Hope to 2.5 Million+  &nbsp;  People, with your Help
        </h2>
      </div>

      <div className="stats-grid">
        {STATS_DATA.map((stat) => {
          const { value, suffix } = parseStatistic(stat.statistic)
          return (
            <div key={stat.id} className="stat-card card text-center">
              <div
                className="stat-icon-container"
                style={{ backgroundColor: stat.iconColor }}
              >
                <div className="stat-icon" style={{ color: 'white' }}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="stat-number bold mb-8">
                <AnimatedCounter targetValue={value} suffix={suffix} />
              </h3>
              <p className="stat-description text-sm muted">{stat.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Stats

