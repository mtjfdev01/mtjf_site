import { useInViewOnce } from '../../hooks/useInViewOnce'

const ProjectsAnimatedItem = ({ index, className = '', children }) => {
  const [itemRef, isVisible] = useInViewOnce({ rootMargin: '80px', threshold: 0.15 })

  return (
    <div
      ref={itemRef}
      className={`${className} ${
        isVisible ? 'projects-card-item--visible' : ''
      } ${index % 2 === 0 ? 'projects-page-item--from-left' : 'projects-page-item--from-right'}`}
      style={{
        '--projects-card-from-x': index % 2 === 0 ? '-64px' : '64px',
      }}
    >
      {children}
    </div>
  )
}

export default ProjectsAnimatedItem
