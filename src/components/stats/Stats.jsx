import { useState, useEffect, useRef } from 'react'
import './Stats.css'
import floodIcon from '../../assets/img/projects/icons2/flood_ helped.webp';
import logo_one from '../../assets/img/projects/icons2/logo_one.webp';

import Medicine from '../../assets/img/projects/icons2/medicine.webp';
import Home from '../../assets/img/projects/icons2/home.webp';
import Water from '../../assets/img/projects/icons2/water.webp';
import Scholarship from '../../assets/img/projects/icons2/scholarship.webp';
import AidPackages from '../../assets/img/projects/icons2/aid_packages.webp';
import Food from '../../assets/img/projects/icons2/food.webp';
import Education from '../../assets/img/projects/icons2/education.webp';
const STATS_DATA = [
  {
    id: 'floods',
    icon: (
        <img src={logo_one} alt="flood icon" />
      ),
    statistic: '400,000+',
    description: 'People helped during the 2022 and 2025 floods of Pakistan',
    iconColor: '#f6b319'
  },
  {
    id: 'health',
    icon: (
      <img src={Medicine} alt="Medicine icon" />
   ),
    statistic: '200,000+',
    description: 'Free of cost tests and medicines provided',
    iconColor: '#2cade3'
  },
  {
    id: 'homes',
    icon: (
      <img src={Home} alt="home icon" />
    ),
    statistic: '150,000+',
    description: 'Ration bags distributed',
    iconColor: '#e02228'
  },
  {
    id: 'water',
    icon: (
     <img src={Water} alt="water icon" />
    ),
    statistic: '300,000+',
    description: 'With access to clean water',
    iconColor: '#53af47'
  },
  {
    id: 'education',
    icon: (
      <img src={Education} alt="education icon" />
    ),
    statistic: '300,000+',
    description: 'Free of cost lab tests done',
    iconColor: '#53af47'
  },
  {
    id: 'scholarship',
    icon: (
      <img src={Scholarship} alt="scholarship icon" />
    ),
    statistic: '6000+',
    description: 'Scholarships awarded',
    iconColor: '#e02228'
  },
  {
    id: 'aid',
    icon: (
      <img src={AidPackages} alt="aid icon" />
  ),
    statistic: '200,000+',
    description: 'Aid packages distributed',
    iconColor: '#2cade3'
  },
  {
    id: 'food',
    icon: (
      <img src={Food} alt="food icon" /> 
    ),
    statistic: '50,000+ ',
    description: 'Trees planted',
    iconColor: '#f6b319'
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
         Brought Hope to 1 Million+ People, with your Help
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

