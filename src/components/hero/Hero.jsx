import { useState, useEffect, useRef } from 'react'
import hero from '../../assets/img/hero/hero.webp'
import hero2 from '../../assets/img/hero/hero_2.webp'
import hero_mob from '../../assets/img/hero/hero_mob.webp'
import contactHero from '../../assets/img/hero/contact_us_hero.webp'
import './hero.css'

const HERO_IMAGES = [
  { desktop: hero, mobile: hero_mob },
  { desktop: hero2, mobile: hero2 },
  { desktop: contactHero, mobile: contactHero },
  { desktop: hero, mobile: hero }
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 50000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
  }

  const currentImage = HERO_IMAGES[currentIndex]

  return (
    <>
      <div className='banner_img d-none md:d-block' key={`desktop-${currentIndex}`}>
        <img src={currentImage.desktop} alt="hero background" style={{width:"100%" , height:"100%"}} />
      </div>
      <div className='banner_img sm:d-block md:d-none mt-48' key={`mobile-${currentIndex}`}>
        <img src={currentImage.mobile} alt="hero background" style={{width:"100%" , height:"100%"}} />
      </div>

      <div className="hero-nav-container">
        <button
          type="button"
          className="slider-nav-btn slider-nav-prev hero-nav-btn"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          type="button"
          className="slider-nav-btn slider-nav-next hero-nav-btn"
          onClick={handleNext}
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  )
}

export default Hero
