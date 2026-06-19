import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import change_hero_health from '../../assets/img/hero/change_hero_health.webp'
import hero_health_mobile from '../../assets/img/hero/hero_health_mobile.webp'
import barakah_hero_web from '../../assets/img/projects/projects-details/mtjf_sadqa/MTJF_Sadaqa_web.webp'
import barakah_hero_mob from '../../assets/img/projects/projects-details/mtjf_sadqa/MTJF Sadaqa Mob.webp'
import clean_water_hero_mob from '../../assets/img/projects/projects-details/cleanwater/mob_hero.webp'
import clean_water_hero_web from '../../assets/img/projects/projects-details/cleanwater/hero-section.webp'

import './hero.css'

const HERO_IMAGES = [
  { desktop: clean_water_hero_web, mobile: clean_water_hero_mob, link: '/projects/clean-water' }, 
  { desktop: change_hero_health, mobile: hero_health_mobile, link: '/donate/health' },
  { desktop: barakah_hero_web, mobile: barakah_hero_mob, link: '/' },
]

const HeroTrack = ({ imageKey, currentIndex }) => (
  <div className="hero-slider__viewport">
    <div
      className="hero-slider__track"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {HERO_IMAGES.map((image, index) => (
        <div className="hero-slider__slide" key={index}>
          {image.link ? (
            <Link to={image.link} className="hero-slide__link">
              <img src={image[imageKey]} alt="hero background" className="hero-slide__image" />
            </Link>
          ) : (
            <img src={image[imageKey]} alt="hero background" className="hero-slide__image" />
          )}
        </div>
      ))}
    </div>
  </div>
)

const HeroNav = ({ onPrev, onNext }) => (
  <div className="hero-nav-container">
    <button
      type="button"
      className="slider-nav-btn slider-nav-prev hero-nav-btn"
      onClick={onPrev}
      aria-label="Previous"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
    <button
      type="button"
      className="slider-nav-btn slider-nav-next hero-nav-btn"
      onClick={onNext}
      aria-label="Next"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
)

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 10000)

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

  return (
    <>
      <section className="hero-slider hero-slider--desktop d-none md:d-block">
        <HeroTrack imageKey="desktop" currentIndex={currentIndex} />
        <HeroNav onPrev={handlePrev} onNext={handleNext} />
      </section>

      <section className="hero-slider hero-slider--mobile sm:d-block md:d-none">
        <HeroTrack imageKey="mobile" currentIndex={currentIndex} />
        <HeroNav onPrev={handlePrev} onNext={handleNext} />
      </section>
    </>
  )
}

export default Hero
