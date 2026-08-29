import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element enters the viewport.
 */
export const useInViewOnce = (options = {}) => {
  const { rootMargin = '80px', threshold = 0.12 } = options
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isInView, rootMargin, threshold])

  return [ref, isInView]
}
