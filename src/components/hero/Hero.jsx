import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// import hero from '../../assets/img/hero/hero.webp'
// import hero_mob from '../../assets/img/hero/hero_mob.webp'
// import winter_hero from '../../assets/img/hero/winter.webp'
// import winter_mob from '../../assets/img/hero/winter_mob.webp'
// import apna_ghar_hero from '../../assets/img/projects/projects-details/Apna Ghar/hero.webp'
// import apna_ghar_hero_mob from '../../assets/img/projects/projects-details/Apna Ghar/hero_mob.webp'
import zakat_hero from '../../assets/img/zakat/zakat_hero.webp'
import ramzan_zakat_mob_popup from '../../assets/img/zakat/ramzan_zakat_mob_popup.webp' 
import './hero.css'

const HERO_IMAGES = [
  { desktop: zakat_hero, mobile: ramzan_zakat_mob_popup, link: '/projects/ramzan-zakat' }, 
  // { desktop: hero, mobile: hero_mob }, 
  // { desktop: winter_hero, mobile: winter_mob },
  // { desktop: apna_ghar_hero, mobile: apna_ghar_hero_mob }
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
      {currentImage.link ? (
        <>
          <Link to={currentImage.link} className='banner_img d-none md:d-block' key={`desktop-${currentIndex}`}>
            <img src={currentImage.desktop} alt="hero background" style={{width:"100%" , height:"auto"}} />
          </Link>
          <div className='banner_img--mobile sm:d-block md:d-none' key={`mobile-${currentIndex}`}>
            <Link to={currentImage.link} className='banner_img'>
              <img src={currentImage.mobile} alt="hero background" style={{width:"100%"}} />  
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='banner_img d-none md:d-block' key={`desktop-${currentIndex}`}>
            <img src={currentImage.desktop} alt="hero background" style={{width:"100%" , height:"auto"}} />
          </div>
          <div className='banner_img--mobile sm:d-block md:d-none' key={`mobile-${currentIndex}`} >
            <img src={currentImage.mobile} alt="hero background" style={{width:"100%"}} />
          </div>
        </>
      )}

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
