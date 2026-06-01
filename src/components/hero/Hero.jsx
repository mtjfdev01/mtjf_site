import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// import hero from '../../assets/img/hero/hero.webp'
// import hero_mob from '../../assets/img/hero/hero_mob.webp'
// import winter_hero from '../../assets/img/hero/winter.webp'
// import winter_mob from '../../assets/img/hero/winter_mob.webp'
// import apna_ghar_hero from '../../assets/img/projects/projects-details/Apna Ghar/hero.webp'
// import apna_ghar_hero_mob from '../../assets/img/projects/projects-details/Apna Ghar/hero_mob.webp'
import zakat_hero from '../../assets/img/zakat/zakat_hero.webp'
import change_hero from '../../assets/img/hero/change_hero.webp'
import change_mob from '../../assets/img/hero/change_mob.webp'
import change_hero_qurbani from '../../assets/img/hero/change_hero_qurbani.webp'
import hero_qurbani_mobile from '../../assets/img/hero/hero_qurbani_mobile.webp'
import ramzan_zakat_mob_popup from '../../assets/img/zakat/ramzan_zakat_mob_popup.webp' 
import hero from '../../assets/img/projects/project-image/gaza.webp'
import hero_mob from '../../assets/img/projects/project-image/gaza_mob.webp'
import change_hero_health from '../../assets/img/hero/change_hero_health.webp'
import hero_health_mobile from '../../assets/img/hero/hero_health_mobile.webp'
import './hero.css'
import barakah_hero_web from '../../assets/img/projects/projects-details/mtjf_sadqa/MTJF_Sadaqa_web.webp'
import barakah_hero_mob from '../../assets/img/projects/projects-details/mtjf_sadqa/MTJF Sadaqa Mob.webp'

const HERO_IMAGES = [
    // { desktop: change_hero_qurbani, mobile: hero_qurbani_mobile, link: '/' },
    { desktop: change_hero_health, mobile: hero_health_mobile, link: '/donate/health' },
  // { desktop: change_hero, mobile: change_mob, link: '/' },
  { desktop: barakah_hero_web, mobile: barakah_hero_mob, link: '/' },
  
  // { desktop: zakat_hero, mobile: ramzan_zakat_mob_popup, link: '/projects/ramzan-zakat' }, 
  // { desktop: hero, mobile: hero_mob }, 
  // { desktop: winter_hero, mobile: winter_mob },
  // { desktop: apna_ghar_hero, mobile: apna_ghar_hero_mob }
    // { desktop: hero, mobile: hero_mob, link: '/' }, 

]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 10000) // Moderate, smooth pace (10 seconds)

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
