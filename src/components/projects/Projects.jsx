import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LazyImage from '../common/LazyImage'
import './Projects.css'

import community from '../../assets/img/projects/project-image/cleanwater.webp'
import kasb from '../../assets/img/projects/project-image/kasbskill.webp'
import Seeds from '../../assets/img/projects/project-image/seeds.webp'
import qurbani from '../../assets/img/projects/project-image/qurbani.webp'
import aas_lab from '../../assets/img/projects/project-image/aaslab.webp'
import health from '../../assets/img/projects/health.webp'
import education from '../../assets/img/projects/education.webp' 
import marriage_gift from '../../assets/img/projects/marriage_gift.webp' 
import water from '../../assets/img/projects/water.webp'
import apna_ghr from '../../assets/img/projects/apna_ghr.webp'
import disaster from '../../assets/img/projects/disaster.webp'
import { useCart } from '../../contexts/CartContext'


const PROJECTS_DATA = [
  {
    id: 'health',
    category: 'Health',
    categoryColor: '#FFB6C1',
    title: 'Ensuring Access to Dignified, Affordable Healthcare',
    description: 'We provide free OPDs, medical camps, essential treatments, and life-saving surgeries to vulnerable families who cannot afford healthcare.',
    image: health,
    progress: 47.79,
    progressColor: '#9B59B6',
    goal: 1000000,
    Achieved: 477890,
    donateButtonText: 'Support Healthcare Services',
    learnMorePath: '/projects/health',
    donatePath: '/donate/health'
  },
  {
    id: 'education',
    category: 'Education',
    categoryColor: '#90EE90',
    title: 'Opening Doors to Learning and Opportunity',
    description: 'We offer quality education, Islamic learning, scholarships, and support for out-of-school children to help them build brighter futures.',
    image: education,
    progress: 87.50,
    progressColor: '#2ECC71',
    goal: 1000000,
    Achieved: 875080,
    donateButtonText: 'Educate a Child',
    learnMorePath: '/projects/education',
    donatePath: '/donate/education'
  },
  {
    id: 'disaster-management', 
    category: 'Disaster Relief',
    categoryColor: '#FFD700',
    title: 'Rapid Response When <br />Crisis Strikes',
    description: 'Our teams deliver food, shelter, medical assistance, and long-term recovery support to families affected by floods, earthquakes, and emergencies.',
    image: disaster,
    progress: 77.58,
    progressColor: '#F39C12',
    goal: 1000000,
    Achieved: 775800,
    donateButtonText: 'Help in Emergencies',
    learnMorePath: '/projects/disaster-management',
    donatePath: '/donate/disaster-management'
  },
  {
    id: 'clean-water',
    category: 'Clean Water',
    categoryColor: '#87CEEB',
    title: 'Providing Safe Water for Healthier Communities.',
    description: 'We install hand pumps, filtration systems, and community water solutions where families struggle for safe drinking water.',
    image: water,
    progress: 18.56,
    progressColor: '#3498DB',
    goal: 1500000,
    Achieved: 278450,
    donateButtonText: 'Sponsor a Water Project',
    learnMorePath: '/projects/clean-water',
    donatePath: '/donate/clean-water'
  },
  {
    id: 'apna-ghar',
    category: 'apna-ghar',
    categoryColor: '#DDA0DD',
    title: 'A home where lost futures are rebuilt',
    description: 'Apna Ghar provides a nurturing home, education, emotional care, and long-term stability and independence for widows and orphaned children.',
    image: apna_ghr,
    progress: 15.37,
    progressColor: '#9B59B6',
    goal: 7000000,
    Achieved: 1076500,
    donateButtonText: 'Support Apna Ghar',
    learnMorePath: '/projects/apna-ghar',
    donatePath: '/donate/disaster-relief'
  },
   {
    id: 'kasb-skill-development',
    category: 'kasb-skill-development',
    categoryColor: '#DDA0DD',
    title: 'Empowering Youth and Women Through Skills',
    description: 'We offer vocational training, digital skills, and tailoring that help individuals earn a stable income.',
    image: kasb,
    progress: 8.82,
    progressColor: '#9B59B6',
    goal: 2000000,
    Achieved: 176500,
    donateButtonText: 'Sponsor Skill Training',
    learnMorePath: '/projects/kasb-skill-development',
    donatePath: '/donate/kasb-skill-development'
  },
   {
    id: 'seeds-of-change', 
    category: 'Seeds of Change',
    categoryColor: '#DDA0DD',
    title: 'seeds-of-change',
    description: 'Through plantation drives, climate awareness, and community engagement, we strengthen environmental resilience and promote sustainable living.',
    image: Seeds,
    progress: 35.62,
    progressColor: '#9B59B6',
    goal: 2000000,
    Achieved: 712500,
    donateButtonText: 'Plant a Tree',
    learnMorePath: '/projects/seeds-of-change',
    donatePath: '/donate/seeds-of-change'
  },
  //  {
  //   id: 'qurbani-baraye-mustehqeen',
  //   category: 'Qurbani Baraye Mustehqeen',
  //   categoryColor: '#DDA0DD',
  //   title: 'Delivering Qurbani Meat to Families in Need',
  //   description: 'We carry out donor Qurbanis with transparency and Shariah compliance, distributing fresh meat to families who rarely enjoy this blessing.',
  //   image: qurbani,
  //   progress: 22.25,
  //   progressColor: '#9B59B6',
  //   goal: 1000000,
  //   Achieved: 222500,
  //   donateButtonText: 'Book Your Qurbani',
  //   learnMorePath: '/projects/qurbani-baraye-mustehqeen',
  //   donatePath: '/donate/qurbani-baraye-mustehqeen'
  // },
   {
    id: 'aas-lab-diagnostics',
    category: 'AAS Lab & Diagnostics',
    categoryColor: '#DDA0DD',
    title: 'Accessible and Affordable Diagnostic Care for all',
    description: 'We provide accurate and affordable CT scans, MRIs, ultrasounds, and essential lab tests in underserved areas where such facilities never existed. These tests are also done free of cost for the more deserving patients.',
    image: aas_lab,
    progress: 32.55,
    progressColor: '#9B59B6',
    goal: 3000000,
    Achieved: 976500,
    donateButtonText: 'Support Diagnostic Care',
    learnMorePath: '/projects/aas-lab-diagnostics',
    donatePath: '/donate/aas-lab-diagnostics'
  },
    {
    id: 'community-services',
    category: 'Community Services',
    categoryColor: '#DDA0DD',
    title: 'Supporting Vulnerable Families With Essential Relief',
    description: 'We provide financial assistance, ration support, winter kits, marriage support, and cooked food to families struggling with daily survival.',
    image: community,
    progress: 67.07,
    progressColor: '#9B59B6',
    goal: 2000000,
    Achieved: 1341500,
    donateButtonText: 'Support a Family',
    learnMorePath: '/projects/community-services',
    donatePath: '/donate/community-services'
  }
]

const Projects = () => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const { shortDonate } = useCart()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchScrollLeft, setTouchScrollLeft] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  // Check scroll position and update button states
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const { scrollLeft, scrollWidth, clientWidth } = container
    
    // Check if we can scroll left (not at the start)
    setCanScrollPrev(scrollLeft > 0)
    
    // Check if we can scroll right (not at the end)
    // Add a small threshold (1px) to account for rounding
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1)
  }

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
    checkScrollPosition()
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
    checkScrollPosition()
  }

  // Button navigation
  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const firstCard = container.querySelector('.project-card')
    const grid = container.querySelector('.projects-grid')
    const gridStyles = grid ? window.getComputedStyle(grid) : null
    const gap = gridStyles ? parseFloat(gridStyles.columnGap || gridStyles.gap || '0') : 0
    const scrollAmount = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : container.clientWidth
    
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
    
    // Check position after a short delay to allow smooth scroll to complete
    setTimeout(checkScrollPosition, 300)
  }

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition()
    
    const container = scrollContainerRef.current
    if (!container) return
    
    // Listen to scroll events
    container.addEventListener('scroll', checkScrollPosition)
    
    // Check on resize
    window.addEventListener('resize', checkScrollPosition)
    
    return () => {
      container.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <section className="projects-section container py-48">
      <div className="projects-header flex justify-center items-center mb-32">
        <div className="text-center">
          <h2 className="heading-secondary">Our Projects</h2>
          <h2 className="mt-0">Where Your Support Meets Real Impact</h2>
          <Link to="/projects" className="projects-link">
          Learn More &gt;
        </Link>
        </div>

      </div>

      <div className="projects-wrapper relative">
        <button
          className="slider-nav-btn slider-nav-prev"
          onClick={() => scrollTo('prev')}
          disabled={!canScrollPrev}
          aria-label="Previous projects"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
                <h3 className="h3 mb-12 text-capitalize" dangerouslySetInnerHTML={{ __html: project.title }}></h3>
                <p className="text-sm muted mb-16">
                  {project.description?.slice(0, 60)}...{' '}
                  <span 
                    className="text-primary"
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Learn More
                  </span>
                </p>
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
                  Goal : {formatCurrency(project.goal)} - Achieved :{' '}
                  {formatCurrency(project.Achieved)}
                </div>

                <div className="project-actions">
                  <button
                    type="button"
                    className="project-donate-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      navigate(`/donate/${project.id}`)
                    }}
                  >
                    {project.donateButtonText}
                  </button>
                </div>

              </div>
            </Link>
          ))}
        </div>
        </div>
        
        <button
          className="slider-nav-btn slider-nav-next" 
          onClick={() => scrollTo('next')}
          disabled={!canScrollNext}
          aria-label="Next projects"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Projects

