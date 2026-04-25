import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import image1 from '../assets/img/blogs/hero_blogs.webp'
import { home_testimonials } from "../utils/variables";
import { PROJECTS_DETAIL_DATA } from '../data/projectsData'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const ProjectsTestimonial = lazy(() => import('../components/projectsTestimonial/ProjectsTestimonial'))

const VideosPage = () => {
  // First component after header - loads immediately
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  // Extract videos from PROJECTS_DETAIL_DATA
  const projectsVideosData = Object.values(PROJECTS_DETAIL_DATA).reduce((acc, project) => {
    if (project.videos && Array.isArray(project.videos)) {
      acc.push({
        videos: project.videos,
        title: project.title,
        subtitle: project.subtitle || ''
      })
    }
    if (project.subProjects && Array.isArray(project.subProjects)) {
      project.subProjects.forEach(sub => {
        if (sub.videos && Array.isArray(sub.videos)) {
          acc.push({
            videos: sub.videos,
            title: sub.title,
            subtitle: sub.subtitle || ''
          })
        }
      })
    }
    return acc
  }, [])

  return (
    <>
        <PageHeader image={image1} />
      

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
       
          <>
           <ProjectsTestimonial
                videos={home_testimonials.videos}
                title={home_testimonials.title}
                subtitle={home_testimonials?.subtitle}
              />
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

                        {/* Videos from PROJECTS_DETAIL_DATA */}
                        {projectsVideosData.length > 0 && (
                          <Suspense fallback={null}>
                            {projectsVideosData.map((projectData, index) => (
                              <ProjectsTestimonial
                                key={`project-video-${index}`}
                                videos={projectData.videos}
                                title={projectData.title}
                                subtitle={projectData.subtitle}
                              />
                            ))}
                          </Suspense>
                        )}
                        
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
      </div>
    </>
  )
}

export default VideosPage
