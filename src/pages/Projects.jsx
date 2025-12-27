import React, { Suspense, lazy } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/projects/ProjectsPage.css'
import image1 from '../assets/img/projects/hero-project.webp'
import PageHeader from '../components/pageHeader/PageHeader'
import { ALL_PROJECTS_DATA } from '../data/projectsData'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import LazyImage from '../components/common/LazyImage'
import { useCart } from '../contexts/CartContext'

// const Events = lazy(() => import('../components/events/Events'))
//   const QuickBlogs = lazy(() => import('../components/quickblogs'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const ProjectsTestimonial = lazy(() => import('../components/projectsTestimonial/ProjectsTestimonial'))
const Projects = () => {
  const navigate = useNavigate()
  const { shortDonate } = useCart()
  // First component after header - loads immediately
  const [projectsRef, showProjects] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Next component - loads on short scroll
  const [testimonialRef, showTestimonial] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <section className="projects-page-section container py-48">
        <PageHeader image={image1} />

        {/* First component after header - loads immediately */}
        <div ref={projectsRef}>
          {showProjects && (
            <>
              <div className="projects-page-header text-center mb-48">
                <h2 className="heading-secondary">Our Work</h2>
                <h2 className='mt-0'style={{maxWidth: '90vw', margin: '0 auto'}}>Explore our programs and see how your contribution transforms futures</h2>
              </div>

              <div className="projects-page-grid grid grid-2 gap-32"> 
                {ALL_PROJECTS_DATA.map((project) => (
                  <div key={project.id} className="projects-page-item">
                    <h2 className="heading-secondary projects-page-card-title mb-16 text-center">{project.title}</h2>
                    <Link to={`/projects/${project.id}`}>
                      <div
                        className="projects-page-card card relative overflow-hidden"
                      >
                        <div className="projects-page-image-container relative w-100 h-100">
                          {/* <LazyImage
                            src={project.image}
                            alt={project.title}
                            className="projects-page-image"
                          /> */}
                          <img src={project.image} alt={project.title} className="projects-page-image" />
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
                            {/* <Link to={project.learnMorePath}> */}
                              <button
                                type="button"
                                className="projects-page-learn-btn"
                              >
                                Learn More
                              </button>
                            {/* </Link> */}
                          </div>
                        </div>
                      </div>
                      </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Next component - loads on short scroll */}
      <div ref={testimonialRef} style={{ minHeight: '200px' }}>
        {showTestimonial && (
          <Suspense fallback={null}>
            <ProjectsTestimonial 
              videos={[
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
              ]}
              title="Why Our Programs Matter"
            />
          </Suspense>
        )}
      </div>

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
            {/* <Suspense fallback={null}>
              <Events />
            </Suspense> */}
            {/* <Suspense fallback={null}>
              <QuickBlogs />
            </Suspense> */}
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
