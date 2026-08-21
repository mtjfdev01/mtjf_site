import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import change_hero_health from '../../assets/img/hero/change_hero_health.webp'
import hero_health_mobile from '../../assets/img/hero/hero_health_mobile.webp'
import slider_august from '../../assets/img/hero/slider_august.webp'
import slider_august_mob from '../../assets/img/hero/slider_august_mob.webp'
import clean_water_hero_mob from '../../assets/img/projects/projects-details/cleanwater/mob_hero.webp'
import clean_water_hero_web from '../../assets/img/projects/projects-details/cleanwater/hero-section.webp'
import apna_ghar_hero_web from '../../assets/img/projects/projects-details/Apna Ghar/hero.webp'
import apna_ghar_hero_mob from '../../assets/img/projects/projects-details/Apna Ghar/hero_mob.webp'
import { useWebsiteHomeHeroSlides } from '../../hooks/useWebsiteHomeHeroSlides'
import './hero.css'

/**
 * TEMP testing flag — set true to load hero slides from DMS.
 * Keep false for production (static images below). Remove after verifying DMS.
 */
const USE_DMS_HOME_HERO_SLIDES = false

/** Static home hero slides (default). */
const HERO_IMAGES = [
  // { desktop: slider_august, mobile: slider_august_mob, link: '/' },
  { desktop: apna_ghar_hero_web, mobile: apna_ghar_hero_mob, link: '/donate/apna-ghar' },
  { desktop: clean_water_hero_web, mobile: clean_water_hero_mob, link: '/donate/clean-water' },
  { desktop: change_hero_health, mobile: hero_health_mobile, link: '/donate/health' },
]

const HeroTrack = ({ images, imageKey, currentIndex }) => (
  <div className="hero-slider__viewport">
    <div
      className="hero-slider__track"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((image, index) => (
        <div className="hero-slider__slide" key={`${imageKey}-${index}-${image.link || ''}`}>
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
  const dmsSlides = useWebsiteHomeHeroSlides(
    HERO_IMAGES,
    USE_DMS_HOME_HERO_SLIDES,
  )
  const heroImages = USE_DMS_HOME_HERO_SLIDES ? dmsSlides : HERO_IMAGES
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)
  const slideCount = heroImages.length || 1

  useEffect(() => {
    setCurrentIndex((prev) => (prev >= slideCount ? 0 : prev))
  }, [slideCount])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (slideCount <= 1) return undefined

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount)
    }, 10000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [slideCount])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideCount)
  }

  return (
    <>
      <section className="hero-slider hero-slider--desktop d-none md:d-block">
        <HeroTrack images={heroImages} imageKey="desktop" currentIndex={currentIndex} />
        {slideCount > 1 && <HeroNav onPrev={handlePrev} onNext={handleNext} />}
      </section>

      <section className="hero-slider hero-slider--mobile sm:d-block md:d-none">
        <HeroTrack images={heroImages} imageKey="mobile" currentIndex={currentIndex} />
        {slideCount > 1 && <HeroNav onPrev={handlePrev} onNext={handleNext} />}
      </section>
    </>
  )
}

export default Hero
