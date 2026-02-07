import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './PromoPopup.css'

/**
 * PromoPopup - A reusable promotional popup component
 * 
 * Props:
 * @param {string[]} routes - Array of routes where popup should appear (e.g., ['/', '/home'])
 * @param {string} redirectUrl - URL to navigate to when clicking the popup (default: '/zakat-calculator')
 * @param {string} desktopImage - Image source for desktop view
 * @param {string} mobileImage - Image source for mobile view (falls back to desktopImage)
 * @param {string} bannerStyle - 'standard' (4:3, 800x600), 'wide' (16:9, 900x500), 'balanced' (850x550)
 * @param {string} storageKey - localStorage key to track if shown (default: 'promo_popup_shown')
 * @param {number} delay - Delay in ms before showing popup (default: 3000)
 * @param {string} altText - Alt text for the image (default: 'Promotional Banner')
 * @param {boolean} showOnce - If true, only show once per browser (uses localStorage). If false, show once per session (uses sessionStorage). Default: true
 */
const PromoPopup = ({
  routes = ['/', '/home'],
  redirectUrl = '/ramzan-zakat',
  desktopImage,
  mobileImage,
  bannerStyle = 'standard',
  storageKey = 'promo_popup_shown',
  delay = 3000,
  altText = 'Promotional Banner',
  showOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check if current route matches any of the specified routes
  const isRouteMatch = routes.some(route => {
    // Exact match or match with trailing slash
    return location.pathname === route || 
           location.pathname === `${route}/` ||
           (route === '/' && location.pathname === '/home')
  })

  // Get storage based on showOnce prop
  const storage = showOnce ? localStorage : sessionStorage

  // Check if popup has already been shown
  const hasBeenShown = useCallback(() => {
    try {
      return storage.getItem(storageKey) === 'true'
    } catch {
      return false
    }
  }, [storage, storageKey])

  // Mark popup as shown
  const markAsShown = useCallback(() => {
    try {
      storage.setItem(storageKey, 'true')
    } catch {
      // Storage not available
    }
  }, [storage, storageKey])

  // Show popup after delay
  useEffect(() => {
    if (!isRouteMatch || hasBeenShown() || !desktopImage) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      markAsShown()
    }, delay)

    return () => clearTimeout(timer)
  }, [isRouteMatch, hasBeenShown, markAsShown, delay, desktopImage])

  // Handle close
  const handleClose = (e) => {
    e.stopPropagation()
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  // Handle click on popup (redirect)
  const handleClick = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
      navigate(redirectUrl)
    }, 200)
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose(e)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVisible])

  // Prevent body scroll when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  if (!isVisible || !desktopImage) return null

  return (
    <div 
      className={`promo-popup-overlay ${isClosing ? 'promo-popup-overlay--closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Promotional popup"
    >
      <div 
        className={`promo-popup promo-popup--${bannerStyle} ${isClosing ? 'promo-popup--closing' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <button 
          className="promo-popup__close" 
          onClick={handleClose}
          aria-label="Close popup"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <picture className="promo-popup__image-wrapper">
          {/* Mobile image */}
          <source 
            media="(max-width: 480px)" 
            srcSet={mobileImage || desktopImage}
          />
          {/* Desktop image */}
          <img 
            src={desktopImage} 
            alt={altText}
            className="promo-popup__image"
            loading="eager"
          />
        </picture>
        
        {/* <span className="promo-popup__cta">Click to learn more</span> */}
      </div>
    </div>
  )
}

export default PromoPopup
