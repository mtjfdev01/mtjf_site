import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'
import './AnimatedButton.css'

const AnimatedButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)
  const { pathname } = location

  const shouldHideButton =
    pathname === '/new_footer' ||
    pathname === '/donate' ||
    pathname.startsWith('/donate/') ||
    pathname === '/fitrana' ||
    pathname.startsWith('/fitrana/') ||
    pathname === '/checkout' ||
    pathname.startsWith('/checkout/') ||
    isNearFooter

  useEffect(() => {
    const checkFooter = () => {
      const footer = document.querySelector('footer, .footer, .new-footer')
      if (!footer) {
        setIsNearFooter(false)
        return
      }

      const { top } = footer.getBoundingClientRect()
      setIsNearFooter(top < window.innerHeight)
    }

    checkFooter()
    const timer = setTimeout(checkFooter, 800)

    window.addEventListener('scroll', checkFooter, { passive: true })
    window.addEventListener('resize', checkFooter)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', checkFooter)
      window.removeEventListener('resize', checkFooter)
    }
  }, [pathname])

  if (shouldHideButton) {
    return null
  }

  const handleClick = () => {
    navigate('/ways-to-donate')
  }

  return (
    <button
      className={`animated-donate-btn ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Ways You can donate"
    >
      {/* Animated background particles */}
      <span className="particle particle-1"></span>
      {/* <span className="particle particle-2"></span>
      <span className="particle particle-3"></span> */}
      <span className="particle particle-4"></span>
      
      {/* Glowing border */}
      <span className="glow-border"></span>
      
      {/* Main content */}
      <span className="btn-content">
        <span className="btn-icon-wrapper">
          <FcDonate className="btn-icon" size={22} />
        </span>
        <span className="btn-text">Ways You can donate</span>
        <span className="btn-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </span>
      
      {/* Shine effect */}
      <span className="btn-shine"></span>
      
      {/* Ripple effect on click */}
      <span className="ripple"></span>
    </button>
  )
}

export default AnimatedButton

