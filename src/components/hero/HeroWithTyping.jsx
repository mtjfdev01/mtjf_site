import { useState, useEffect, useRef } from 'react'
import './HeroWithTyping.css'

const HeroWithTyping = ({
  // Image props
  imageUrl,
  imageAlt = 'Hero image',
  
  // Text content props
  staticText = '', // Text above typing effect
  subtitle = '', // Subtitle text (appears below static text, above typing)
  typingText = 'ENGLISH', // Text for typing effect
  
  // Layout props
  textPosition = 'left', // 'left' or 'right' - controls which side text appears
  backgroundColor = '#ffffff', // Background color
  imageWidth = '100%', // Image width percentage (e.g., '50%', '100%')
  imageHeight = '100%', // Image height percentage (e.g., '50%', '100%')
  
  // Typing effect props
  enableTyping = true, // Enable/disable typing effect
  typingSpeed = 100, // Speed in milliseconds per character
  deleteSpeed = 50, // Speed when deleting
  pauseTime = 2000, // Pause time after completing word
  
  // Button props
  buttonText,
  buttonOnClick,
  buttonClassName = '',
  
  // Additional props
  className = ''
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const timeoutRef = useRef(null)

  // Determine layout order
  const isTextLeft = textPosition === 'left'
  const textSection = (
    <div className="hero-typing-text-section">
      {staticText && (
        <div className="hero-static-text">
          {staticText}
        </div>
      )}
      
      {/* Subtitle - Always rendered statically, no typing effect */}
      {subtitle && (
        <div className="hero-subtitle">
          {subtitle}
        </div>
      )}
      
      {/* Typing effect - Only applies to typingText, not subtitle */}
      {enableTyping ? (
        <div className="hero-typing-container">
          <span className="hero-typing-text">
            {displayedText}
            <span className="hero-typing-cursor">|</span>
          </span>
        </div>
      ) : (
        <div className="hero-typing-container">
          <span className="hero-typing-text">
            {typingText}
          </span>
        </div>
      )}
      
      {buttonText && (
        <button
          className={`hero-typing-button ${buttonClassName}`}
          onClick={buttonOnClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  )

  const imageSection = (
    <div 
      className="hero-typing-image-section"
      style={{
        width: imageWidth,
        height: imageHeight
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="hero-typing-image"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  )

  // Typing effect logic
  useEffect(() => {
    if (!enableTyping) {
      setDisplayedText(typingText)
      return
    }

    const currentWord = typingText
    const currentLength = displayedText.length
    const isComplete = currentLength === currentWord.length && !isDeleting
    const isEmpty = currentLength === 0 && isDeleting

    if (isComplete) {
      // Word is complete, wait then start deleting
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    } else if (isEmpty) {
      // Word is deleted, restart typing
      setIsDeleting(false)
      setCharIndex(0)
    } else {
      // Typing or deleting
      const speed = isDeleting ? deleteSpeed : typingSpeed
      timeoutRef.current = setTimeout(() => {
        if (isDeleting) {
          setDisplayedText((prev) => prev.slice(0, -1))
          setCharIndex((prev) => Math.max(0, prev - 1))
        } else {
          if (charIndex < currentWord.length) {
            setDisplayedText((prev) => prev + currentWord[charIndex])
            setCharIndex((prev) => prev + 1)
          }
        }
      }, speed)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [displayedText, isDeleting, charIndex, typingText, enableTyping, typingSpeed, deleteSpeed, pauseTime])

  return (
    <section
      className={`hero-typing-section ${className}`}
      style={{ backgroundColor }}
    >
      <div className="hero-typing-container-wrapper">
        {isTextLeft ? (
          <>
            {textSection}
            {imageSection}
          </>
        ) : (
          <>
            {imageSection}
            {textSection}
          </>
        )}
      </div>
    </section>
  )
}

export default HeroWithTyping