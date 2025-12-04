import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LazyImage from '../common/LazyImage'
import './Projects.css'
import image1 from '../../assets/img/causes/Rectangle 34625787.png'
import image3 from '../../assets/img/causes/Rectangle 34625789.png'

import health from '../../assets/img/projects/cards/health.webp'
import education from '../../assets/img/projects/cards/education.webp' 
import marriage_gift from '../../assets/img/projects/cards/merrage_gift.webp' 
import water from '../../assets/img/projects/cards/water.webp'
import apna_ghr from '../../assets/img/projects/cards/apna_ghr.webp'


const PROJECTS_DATA = [
  {
    id: 'medicine',
    category: 'Medicine',
    categoryColor: '#FFB6C1',
    title: 'Sehatmand Zindagi, Behtar Mustaqbil',
    description: 'Health is a blessing and is required to live life fully. It is very necessary for all of us.',
    image: health,
    progress: 47.56,
    progressColor: '#9B59B6',
    goal: 100000,
    pledged: 47789,
    learnMorePath: '/projects/medicine',
    donatePath: '/donate/medicine'
  },
  {
    id: 'education',
    category: 'Education',
    categoryColor: '#90EE90',
    title: 'Taleem Har Bachay Ka Haq',
    description: 'Education is the process of gaining knowledge, skills, personal and social growth.',
    image: education,
    progress: 47.58,
    progressColor: '#2ECC71',
    goal: 100000,
    pledged: 47580,
    learnMorePath: '/projects/education',
    donatePath: '/donate/education'
  },
  {
    id: 'charity',
    category: 'Charity',
    categoryColor: '#FFD700',
    title: 'Tabahi Ke Baad Naye Hoslay',
    description: 'Health is a blessing and is required to live life fully. It is very necessary for all of us.',
    image: marriage_gift,
    progress: 47.58,
    progressColor: '#F39C12',
    goal: 100000,
    pledged: 47580,
    learnMorePath: '/projects/charity',
    donatePath: '/donate/charity'
  },
  {
    id: 'water',
    category: 'Clean Water',
    categoryColor: '#87CEEB',
    title: 'Saf Pani, Behtar Zindagi',
    description: 'Clean water is safe, fresh water free from pollutants — essential for health and hygiene.',
    image: water,
    progress: 52.30,
    progressColor: '#3498DB',
    goal: 150000,
    pledged: 78450,
    learnMorePath: '/projects/water',
    donatePath: '/donate/water'
  },
  {
    id: 'shelter',
    category: 'Shelter',
    categoryColor: '#DDA0DD',
    title: 'Ghar Har Kisi Ka',
    description: 'Providing safe shelter and housing for families in need.',
    image: apna_ghr,
    progress: 38.25,
    progressColor: '#9B59B6',
    goal: 200000,
    pledged: 76500,
    learnMorePath: '/projects/shelter',
    donatePath: '/donate/shelter'
  }
]

const Projects = () => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchScrollLeft, setTouchScrollLeft] = useState(0)

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = 'grabbing'
    scrollContainerRef.current.style.userSelect = 'none'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setTouchScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!scrollContainerRef.current) return
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - touchStart) * 2
    scrollContainerRef.current.scrollLeft = touchScrollLeft - walk
  }

  // Button navigation
  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cardWidth = 380 + 24 // card width + gap
    const scrollAmount = cardWidth * 1.5 // scroll 1.5 cards at a time
    
    if (direction === 'prev') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <section className="projects-section container py-48">
      <div className="projects-header flex justify-between items-center mb-32">
        <div>
          <h2 className="heading-secondary">Projects</h2>
          <h2 className="projects-title">Some projects we have in World</h2>
        </div>
        <Link to="/projects" className="projects-link">
          More Causes &gt;
        </Link>
      </div>

      <div className="projects-wrapper relative">
        <button
          className="projects-nav-btn projects-nav-prev"
          onClick={() => scrollTo('prev')}
          aria-label="Previous projects"
        >
          &#x2190;
        </button>
        
        <div
          ref={scrollContainerRef}
          className="projects-scroll-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
        <div className="projects-grid">
          {PROJECTS_DATA.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="project-card card"
            >
              <div className="project-image-container relative">
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  rootMargin="50px"
                />
                <div
                  className="project-category-tag"
                  style={{
                    color: project.categoryColor,
                    backgroundColor: `${project.categoryColor}20`
                  }}
                >
                  {project.category}
                </div>

              </div>

              <div className="project-content p-20">
                <h3 className="h3 mb-12">{project.title}</h3>
                <p className="text-sm muted mb-16">{project.description}</p>
                <div className="project-progress-bar-container">
                  <div
                    className="project-progress-bar"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.progressColor
                    }}
                  />
                </div>

                <div className="project-goal-info">
                  Goal : {formatCurrency(project.pledged)} - Pledged :{' '}
                  {formatCurrency(project.goal)}
                </div>

                <div className="project-actions">
                  <button
                    type="button"
                    className="project-donate-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      navigate(project.donatePath)
                    }}
                  >
                    Donate
                  </button>
                </div>

              </div>
            </Link>
          ))}
        </div>
        </div>
        
        <button
          className="projects-nav-btn projects-nav-next"
          onClick={() => scrollTo('next')}
          aria-label="Next projects"
        >
          &#x2192;
        </button>
      </div>
    </section>
  )
}

export default Projects

