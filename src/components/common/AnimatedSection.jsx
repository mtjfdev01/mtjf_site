import { useInViewOnce } from '../../hooks/useInViewOnce'

const AnimatedSection = ({ index = 0, className = '', children }) => {
  const [sectionRef, isVisible] = useInViewOnce({
    rootMargin: '80px',
    threshold: 0.12,
  })

  return (
    <div
      ref={sectionRef}
      className={`page-animated-section ${className} ${
        isVisible ? 'page-animated-section--visible' : ''
      } ${
        index % 2 === 0
          ? 'page-animated-section--from-left'
          : 'page-animated-section--from-right'
      }`}
      style={{
        '--projects-card-from-x': index % 2 === 0 ? '-64px' : '64px',
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
