import React, { Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/projects/ProjectsPage.css'
import image1 from '../assets/img/projects/hero-project.webp'
import PageHeader from '../components/pageHeader/PageHeader'
import { ALL_PROJECTS_DATA } from '../data/projectsData'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import LazyImage from '../components/common/LazyImage'
import { useCart } from '../contexts/CartContext'

const Events = lazy(() => import('../components/events/Events'))
const Blogs = lazy(() => import('../components/blogs/Blogs'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const Projects = () => {
  const navigate = useNavigate()
  const { shortDonate } = useCart()
  const [projectsRef, showProjects] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <section className="projects-page-section container py-48">
        <PageHeader image={image1} />

        <div ref={projectsRef}>
          {showProjects && (
            <>
              <div className="projects-page-header text-center mb-48">
                <h1 className="heading-secondary mb-16">Our Work</h1>
                <h2 className="h1">Explore our programs and see how your contribution transforms futures</h2>
              </div>

              <div className="projects-page-grid grid grid-2 gap-24">
                {ALL_PROJECTS_DATA.map((project) => (
                  <div key={project.id} className="projects-page-item">
                    <h2 className="heading-secondary projects-page-card-title mb-16 text-center">{project.title}</h2>
                    <div
                      className="projects-page-card card relative overflow-hidden"
                    >
                      <div className="projects-page-image-container relative w-100 h-100">
                        <LazyImage
                          src={project.image}
                          alt={project.title}
                          className="projects-page-image"
                        />
                        <div className="projects-page-overlay absolute w-100 h-100"></div>
                      </div>

                      <div className="projects-page-content absolute w-100 h-100 flex flex-col justify-end p-24">
                        {project.subtitle && (
                          <p className="text-sm text-white mb-8 projects-page-subtitle">
                            {project.subtitle}
                          </p>
                        )}
                        <p className="text-sm text-white mb-24 projects-page-description">
                          {project.description}
                        </p>

                        <div className="projects-page-actions flex gap-12">
                          <button
                            type="button"
                            className="projects-page-donate-btn"
                            onClick={(e) => {
                              e.preventDefault()
                              shortDonate()
                            }}
                          >
                            {project.donateButtonText || 'Donate'}
                          </button>
                          <button
                            type="button"
                            className="projects-page-learn-btn"
                            onClick={(e) => {
                              e.preventDefault()
                              navigate(project.learnMorePath)
                            }}
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <div ref={restRef} style={{ minHeight: '50px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <Events />
            </Suspense>
            <Suspense fallback={null}>
              <Blogs />
            </Suspense>
            <Suspense fallback={null}>
              <Newsletter />
            </Suspense>
            <Suspense fallback={null}>
              <DonationCta />
            </Suspense>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
      </div>
    </>
  )
}

export default Projects
