import { useState, useRef, useEffect } from 'react'
import './LazyImage.css'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f3f3" width="400" height="300"/%3E%3C/svg%3E',
  rootMargin = '50px',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    let hasScrolled = false
    const initialScrollY = window.scrollY

    // Track scrolling
    const handleScroll = () => {
      if (window.scrollY > initialScrollY + 50) {
        hasScrolled = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only load if user has scrolled OR image is actually visible
            const rect = entry.boundingClientRect
            const isVisible = rect.top >= 0 && rect.top < window.innerHeight
            
            if (hasScrolled || isVisible) {
              setIsInView(true)
              observer.disconnect()
            }
          }
        })
      },
      {
        rootMargin,
        threshold: 0.01
      }
    )

    // Small delay before starting observation to prevent immediate loading on refresh
    const timeoutId = setTimeout(() => {
      if (imgRef.current) {
        observer.observe(imgRef.current)
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
      observer.disconnect()
    }
  }, [rootMargin])

  useEffect(() => {
    if (isInView && imageSrc === placeholder) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      img.onerror = () => {
        // Keep placeholder on error
        console.error(`Failed to load image: ${src}`)
      }
    }
  }, [isInView, src, placeholder, imageSrc])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'lazy-image-loaded' : 'lazy-image-loading'}`}
      style={{
        ...style,
        transition: 'opacity 0.3s ease',
        opacity: isLoaded ? 1 : 0.7
      }}
      {...props}
    />
  )
}

export default LazyImage

