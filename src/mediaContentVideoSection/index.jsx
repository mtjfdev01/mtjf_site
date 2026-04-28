import React, { useState, useEffect, useRef } from 'react'
import './MediaContentVideoSection.css'

// Extract video IDs from YouTube URLs
const extractVideoId = (url) => {
  if (!url || typeof url !== 'string') return null
  const cleanedUrl = url.trim()
  if (!cleanedUrl) return null
  // Support multiple YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = cleanedUrl.match(pattern)
    if (match && match[1]) {
      const normalized = match[1].trim().match(/[a-zA-Z0-9_-]{11}/)
      if (normalized) return normalized[0]
    }
  }
  return null
}

const MediaContentVideoSection = ({ 
  videos = [], 
  title = 'Why Our Programs Matter',
  subtitle = null 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(4)
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [translateOffset, setTranslateOffset] = useState(0)
  const gridRef = useRef(null)

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCardsPerView(1)
      } else if (width < 992) {
        setCardsPerView(3)
      } else {
        setCardsPerView(4)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  // Reset currentIndex when cardsPerView or videos change
  useEffect(() => {
    const maxIndex = Math.max(0, videos.length - cardsPerView)
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex))
    }
  }, [cardsPerView, videos.length, currentIndex])

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (selectedVideoId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Handle ESC key to close modal
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedVideoId) {
        setSelectedVideoId(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideoId])

  useEffect(() => {
    const calculateOffset = () => {
      const grid = gridRef.current
      if (!grid) {
        setTranslateOffset(0)
        return
      }

      const firstCard = grid.querySelector('.projects-testimonial-card')
      if (!firstCard) {
        setTranslateOffset(0)
        return
      }

      const gridStyles = window.getComputedStyle(grid)
      const gap = parseFloat(gridStyles.columnGap || gridStyles.gap || '0')
      const cardWidth = firstCard.getBoundingClientRect().width
      setTranslateOffset(currentIndex * (cardWidth + gap))
    }

    calculateOffset()
    window.addEventListener('resize', calculateOffset)
    return () => window.removeEventListener('resize', calculateOffset)
  }, [currentIndex, cardsPerView, videos.length])

  const maxIndex = Math.max(0, videos.length - cardsPerView)
  const isScrollable = videos.length > cardsPerView

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handleVideoClick = (url) => {
    const videoId = extractVideoId(url)
    if (videoId) {
      setSelectedVideoId(videoId)
    }
  }

  const handleCloseModal = () => {
    setSelectedVideoId(null)
  }

  const getEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  }

  // Early return if no videos (after all hooks)
  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <section className="projects-testimonial-section container py-48">
      <div className="projects-testimonial-header text-center mb-48">
       
        <h2 className="heading-secondary mb-16">{title}</h2>
        {subtitle && <p className="projects-testimonial-subtitle">{subtitle}</p>}
      </div>

      <div className={`projects-testimonial-wrapper relative ${!isScrollable ? 'projects-testimonial-wrapper--no-nav' : ''}`}>
        {isScrollable && (
          <button
            className="projects-testimonial-nav-btn projects-testimonial-nav-prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous videos"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <div className="projects-testimonial-container">
          <div 
            ref={gridRef}
            className={`projects-testimonial-grid ${!isScrollable ? 'projects-testimonial-grid--centered' : ''}`}
            style={{
              transform: isScrollable ? `translateX(-${translateOffset}px)` : 'translateX(0)',
              transition: 'transform 0.4s var(--ease)',
              '--cards-per-view': cardsPerView
            }}
          >
            {videos.map((url, index) => {
              const videoId = extractVideoId(url)
              const thumbnailUrl = videoId 
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : null

              return (
                <div
                  key={index}
                  className="projects-testimonial-card"
                  onClick={() => handleVideoClick(url)}
                >
                  <div className="projects-testimonial-image-container">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={`Testimonial video ${index + 1}`}
                        className="projects-testimonial-thumbnail"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget
                          if (!img.dataset.fallbackApplied) {
                            img.dataset.fallbackApplied = 'true'
                            img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                          }
                        }}
                      />
                    ) : (
                      <div className="projects-testimonial-placeholder">
                        <span>Video {index + 1}</span>
                      </div>
                    )}
                    <div className="projects-testimonial-play-overlay">
                      <div className="projects-testimonial-play-button">
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="30" cy="30" r="30" fill="white" fillOpacity="0.9" />
                          <path
                            d="M24 20L24 40L38 30L24 20Z"
                            fill="var(--color-primary)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {isScrollable && (
          <button
            className="projects-testimonial-nav-btn projects-testimonial-nav-next"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next videos"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideoId && (
        <div className="projects-testimonial-modal" onClick={handleCloseModal}>
          <div 
            className="projects-testimonial-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="projects-testimonial-modal-close"
              onClick={handleCloseModal}
              aria-label="Close video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="projects-testimonial-modal-video">
              <iframe
                src={getEmbedUrl(selectedVideoId)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MediaContentVideoSection

