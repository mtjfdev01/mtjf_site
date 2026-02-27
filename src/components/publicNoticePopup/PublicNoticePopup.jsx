import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import './PublicNoticePopup.css'

const PUBLIC_NOTICE_CONTENT = `Important Public Notice | Stay Cautious
We have received reports of individuals falsely claiming to represent Molana Tariq Jamil Foundation and contacting people to request donations.
Please remain vigilant and protect yourself.
All official MTJ Foundation bank accounts carry the exact title:
"MTJ Foundation Pakistan"
Do not transfer funds to any account that does not have this title.
If you receive a call, message, or donation request and are unsure about its authenticity, please verify before donating.
Call Center: 061-111-786-853
WhatsApp: 0303-2440000
Email: info@mtjfoundation.org
Always double-check before donating.
Your trust and safety are important to us.
Please report any suspicious calls or messages immediately.
Stay cautious. Stay safe.`

const isRouteMatched = (pathname, route) => {
  if (!route) return false

  if (route.endsWith('/*')) {
    const prefix = route.slice(0, -1)
    return pathname.startsWith(prefix)
  }

  return pathname === route || pathname === `${route}/`
}

const PublicNoticePopup = ({
  routes = ['/'],
  storageKey = 'public_notice_popup_shown',
  delay = 2000,
  showOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const location = useLocation()

  const storage = showOnce ? localStorage : sessionStorage

  const hasBeenShown = useCallback(() => {
    try {
      return storage.getItem(storageKey) === 'true'
    } catch {
      return false
    }
  }, [storage, storageKey])

  const markAsShown = useCallback(() => {
    try {
      storage.setItem(storageKey, 'true')
    } catch {
      // Ignore storage access failures
    }
  }, [storage, storageKey])

  const isActiveRoute = routes.some((route) => isRouteMatched(location.pathname, route))

  useEffect(() => {
    if (!isActiveRoute || hasBeenShown()) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      markAsShown()
    }, delay)

    return () => clearTimeout(timer)
  }, [isActiveRoute, hasBeenShown, markAsShown, delay])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 250)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVisible])

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

  if (!isVisible) return null

  return (
    <div
      className={`public-notice-overlay ${isClosing ? 'public-notice-overlay--closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Important Public Notice"
    >
      <div
        className={`public-notice-card ${isClosing ? 'public-notice-card--closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="public-notice-close"
          onClick={handleClose}
          aria-label="Close notice"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="public-notice-text" aria-label="Important Public Notice content">
          {PUBLIC_NOTICE_CONTENT.split('\n').map((line, index) => {
            const trimmed = line.trim()
            const isHeading = index === 0
            const isQuotedTitle = trimmed === '"MTJ Foundation Pakistan"'
            const isContactLine = trimmed.startsWith('Call Center:') || trimmed.startsWith('WhatsApp:') || trimmed.startsWith('Email:')
            const isStrongLine =
              trimmed === 'Please remain vigilant and protect yourself.' ||
              trimmed === 'Do not transfer funds to any account that does not have this title.' ||
              trimmed === 'Always double-check before donating.' ||
              trimmed === 'Your trust and safety are important to us.' ||
              trimmed === 'Please report any suspicious calls or messages immediately.' ||
              trimmed === 'Stay cautious. Stay safe.'

            if (!trimmed) {
              return <div key={`line-${index}`} className="public-notice-spacer" />
            }

            if (isHeading) {
              return (
                <h2 key={`line-${index}`} className="public-notice-heading">
                  <span>{line}</span>
                  <span className="public-notice-heading-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L21 19H3L12 3Z" fill="#dc2626" />
                      <path d="M12 9V13.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="17" r="1.2" fill="#ffffff" />
                    </svg>
                  </span>
                </h2>
              )
            }

            if (isQuotedTitle) {
              return (
                <p key={`line-${index}`} className="public-notice-quoted-title">
                  {line}
                </p>
              )
            }

            if (isContactLine) {
              const [label, ...rest] = line.split(':')
              return (
                <p key={`line-${index}`} className="public-notice-contact-line">
                  <strong>{label}:</strong>{rest.join(':')}
                </p>
              )
            }

            return (
              <p key={`line-${index}`} className={`public-notice-line ${isStrongLine ? 'public-notice-line--strong' : ''}`}>
                {line}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PublicNoticePopup
