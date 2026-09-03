import React, { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import '../components/projects/ProjectsPage.css'
import '../components/projects/ProjectsCardsAnimation.css'
import './ProjectsReplica.css'
import image1 from '../assets/img/projects/hero-project.webp'
import PageHeaderReplica from '../components/pageHeader/PageHeaderReplica'
import { PROJECTS_LISTING_DATA } from '../data/projectsData'
import {
  useWebsiteProjectsListing,
  USE_DMS_WEBSITE_PROJECTS_LISTING,
} from '../hooks/useWebsiteProjectsListing'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import ProjectsAnimatedItem from '../components/projects/ProjectsAnimatedItem'
import apna_ghar_hero_web from '../assets/img/projects/projects-details/Apna Ghar/hero.webp'
import apna_ghar_hero_mob from '../assets/img/projects/projects-details/Apna Ghar/hero_mob.webp'
// const Events = lazy(() => import('../components/events/Events'))
//   const QuickBlogs = lazy(() => import('../components/quickblogs'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const ProjectsTestimonial = lazy(() => import('../components/projectsTestimonial/ProjectsTestimonial'))
const ProjectsReplica = () => {
  // Static projectsData.js by default; API only when USE_DMS_WEBSITE_PROJECTS_LISTING is true
  const projects = useWebsiteProjectsListing(
    PROJECTS_LISTING_DATA,
    USE_DMS_WEBSITE_PROJECTS_LISTING,
  )
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
      <section className="projects-page-section projects-replica-page container py-48">
        <PageHeaderReplica image={apna_ghar_hero_web} imageMob={apna_ghar_hero_mob} />  

        {/* First component after header - loads immediately */}
        <div ref={projectsRef}>
          {showProjects && (
            <>
              <div className="projects-page-header text-center mb-48">
                {/* <h2 className="heading-secondary">Our Work</h2>
                <h2 className='mt-0'style={{maxWidth: '90vw', margin: '0 auto'}}>Explore our programs and see how your contribution transforms futures</h2> */}
              </div>

              <div className="projects-page-grid projects-replica-grid projects-cards-animated gap-32"> 
                {projects.map((project, index) => (
                  <ProjectsAnimatedItem
                    key={project.id}
                    index={index}
                    className="projects-page-item projects-replica-item"
                  >
                    {/* <Link to={`/projects/${project.id}`} className="projects-replica-card-link"> */}
                      <div className="projects-replica-card card">
                        <div className="projects-replica-card-media">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="projects-replica-card-image"
                          />
                        </div>

                        <div className="projects-replica-card-body">
                          <h2 className="heading-secondary projects-replica-card-title">
                            {project.title}
                          </h2>

                          <p className="text-sm projects-replica-card-subtitle">
                            {project.subtitle || '\u00A0'}
                          </p>

                          <p className="text-sm projects-replica-card-description">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    {/* </Link> */}
                  </ProjectsAnimatedItem>
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

export default ProjectsReplica
