import React, { useState, useEffect } from 'react'
import './ProjectsTestimonial.css'

// Extract video IDs from YouTube URLs
const extractVideoId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

// Video URLs data
const TESTIMONIAL_VIDEOS = [
  'https://www.youtube.com/watch?v=4A8q8Al7TMs&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=7',
  'https://www.youtube.com/watch?v=6bqunG0PeNQ&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=8',
  'https://www.youtube.com/watch?v=jK4a0OeDwXI&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=14',
  'https://www.youtube.com/watch?v=gNt5XZyRGDk&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=25',
  'https://www.youtube.com/watch?v=B1FnJc8YVjA&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=31',
  'https://www.youtube.com/watch?v=v929F_VF1UM&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=37',
  'https://www.youtube.com/watch?v=DAnXnVpICys&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=42',
  'https://www.youtube.com/watch?v=r8Kz53e9yZY&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=48',
  'https://www.youtube.com/watch?v=_rQhKds84rc&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=49',
  'https://www.youtube.com/watch?v=7Z9YoYVrE9c&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=59',
  'https://www.youtube.com/watch?v=yHAo1Y4i3Vw&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=65'
]

const ProjectsTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(4)
  const [selectedVideoId, setSelectedVideoId] = useState(null)

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth
      if (width < 480) {
        setCardsPerView(1)
      } else if (width < 768) {
        setCardsPerView(2)
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

  const maxIndex = Math.max(0, TESTIMONIAL_VIDEOS.length - cardsPerView)

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

  return (
    <section className="projects-testimonial-section container py-48">
      <div className="projects-testimonial-header text-center mb-48">
        <h2 className="heading-secondary mb-16">Why Our Programs Matter</h2>
      </div>

      <div className="projects-testimonial-wrapper relative">
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

        <div className="projects-testimonial-container">
          <div 
            className="projects-testimonial-grid"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              transition: 'transform 0.4s var(--ease)'
            }}
          >
            {TESTIMONIAL_VIDEOS.map((url, index) => {
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

export default ProjectsTestimonial

