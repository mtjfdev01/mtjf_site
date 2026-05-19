import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import './index.css'
import { FaLinkedinIn } from "react-icons/fa";
// import UrgentAppealsBar from '../appeals/UrgentAppealsBar'

const StickyBar = () => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle window resize and initial mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      // Reset phone number visibility when switching from mobile to desktop
      if (window.innerWidth > 768) {
        setShowPhoneNumber(false)
      }
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handlePhoneClick = (event) => {
    // On mobile: toggle to show phone number
    if (isMobile && !showPhoneNumber) {
      event.preventDefault()
      setShowPhoneNumber(true)
    }
    // If phone number is already visible, let the default tel: link behavior proceed (call)
  }

  const handleEmailClick = (event) => {
    // On mobile: if phone is showing, toggle back to email
    if (isMobile && showPhoneNumber) {
      event.preventDefault()
      setShowPhoneNumber(false)
    }
    // Otherwise, let the default email link behavior proceed
  }

  return (
    <div className="sticky_bar_container">
      <div className={`sticky_bar-content ${!isMobile ? 'container' : ''}`}>
        <div className="sticky_bar-start">
          {/* <UrgentAppealsBar /> */}
          <div className={`sticky_bar-contact ${showPhoneNumber ? 'show-phone' : ''}`}>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@mtjfoundation.org" target="_blank" rel="noopener noreferrer" className="sticky_bar-link sticky_bar-email-link" onClick={handleEmailClick}>
            <FaEnvelope />
            <span className="sticky_bar-email-text">info@mtjfoundation.org</span>
          </a>
          <a
            href="tel:061-111-786-853"
            className="sticky_bar-link sticky_bar-phone-link"
            onClick={handlePhoneClick}
          >
            <FaPhone />
            <span className="sticky_bar-phone-number">
              061-111-786-853
            </span>
          </a>
        </div>
        </div>


        <div className="sticky_bar-social">
          <a href="https://www.instagram.com/mtjfoundation_pakistan/?hl=en" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/foundation.mtj" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://youtube.com/@foundation_mtj?si=NCJMYOSXihYOqMjK" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://pk.linkedin.com/company/mtjf-00" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
          
        </div>
        <div className="sticky_bar-international">
          <a
            href="https://mtjfoundation.ca/?form=Quick-Donate"
            target="_blank"
            rel="noopener noreferrer"
            className="sticky_bar-international-link"
          >
             Donate Globally
          </a>
        </div> 
      </div>
    </div>
  )
}

export default StickyBar