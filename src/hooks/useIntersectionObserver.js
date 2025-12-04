import { useEffect, useRef, useState } from 'react'

/**
 * Simple hook to detect when an element enters the viewport
 * @param {Object} options - Intersection Observer options
 * @param {string} options.rootMargin - Margin around the root (default: '100px')
 * @param {boolean} options.loadImmediately - If true, load immediately (default: false)
 * @returns {Array} [ref, hasIntersected] - Ref to attach to element and intersection state
 */
export const useIntersectionObserver = (options = {}) => {
  const { rootMargin = '100px', loadImmediately = false } = options
  const [hasIntersected, setHasIntersected] = useState(loadImmediately)
  const elementRef = useRef(null)
  const initialPageLoad = useRef(true)
  const hasScrolled = useRef(false)

  useEffect(() => {
    if (loadImmediately) {
      setHasIntersected(true)
      return
    }

    const element = elementRef.current
    if (!element) return

    // Track user scrolling
    const handleScroll = () => {
      if (window.scrollY > 10) {
        hasScrolled.current = true
        initialPageLoad.current = false
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Mark initial page load as done after mount
    const initialLoadTimeout = setTimeout(() => {
      initialPageLoad.current = false
    }, 1000)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasIntersected) {
            const rect = entry.boundingClientRect
            const isBelowViewport = rect.top > window.innerHeight
            const isAboveViewport = rect.bottom < 0
            const isInViewport = rect.top >= 0 && rect.top < window.innerHeight
            const isAtTopOnInitialLoad = window.scrollY === 0 && initialPageLoad.current && !hasScrolled.current
            
            // Always load if:
            // 1. Element is below viewport (user will scroll to it)
            // 2. Element is above viewport (user scrolled past it)
            // 3. Element is in viewport AND (user has scrolled OR not at top on initial load)
            if (isBelowViewport || isAboveViewport || (isInViewport && !isAtTopOnInitialLoad)) {
              setHasIntersected(true)
            }
          }
        })
      },
      {
        rootMargin,
        threshold: 0.01
      }
    )

    observer.observe(element)

    return () => {
      clearTimeout(initialLoadTimeout)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [rootMargin, hasIntersected, loadImmediately])

  return [elementRef, hasIntersected]
}

