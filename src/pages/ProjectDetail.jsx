import { useParams, useNavigate, Link } from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import { PROJECTS_DETAIL_DATA } from '../data/projectsData'
import './ProjectDetail.css'
import VerticalDonationForm from '../components/donationForm/VerticalDonationForm'
import InitiativeDonationCard from '../components/donation/projects_menu/InitiativeDonationCard'
import DonationSidebar from '../components/donation/projects_menu/DonationSidebar'
import { useDonation } from '../contexts/DonationContext'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import LazyImage from '../components/common/LazyImage'
const MediaContentSection = lazy(() => import('../components/mediaContentSection/MediaContentSection'))
const FAQs = lazy(() => import('../components/faqs/FAQs'))
const ProjectsTestimonial = lazy(() => import('../components/projectsTestimonial/ProjectsTestimonial'))
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const ProjectDetail = ({ forcedProjectId }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { amount } = useDonation()
  const resolvedProjectId = forcedProjectId || id
  const project = PROJECTS_DETAIL_DATA[resolvedProjectId]
  const totalDonationAmount = amount || 0

  const [isPlayingContentVideo, setIsPlayingContentVideo] = useState(false)

  // First component after header - loads immediately
  const [contentRef, showContent] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Next component - loads on short scroll
  const [imageRef, showImage] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  // Next section - loads on short scroll (or immediately if no content)
  const [mediaRef, showMedia] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: !project?.content
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  if (!project) {
    return (
      <div className="container py-48 text-center mt-48">
        <br /><br />
        <br /><br />
        <br />
        <h1>We are working on details for this Program.</h1>
        
        <p>The program's detailed content will be  updated soon.</p>
        <Link to="/projects" className="btn">
          Go to Programs & Projects
        </Link>
      </div>
    )
  }

  const handleDonationSubmit = (formData) => {
    navigate(`/donate/${project.id}`, { state: { ...formData } })
  }

  const categoryOptions = ['General', project.donateCategory].filter(Boolean)
  const projectCtaProps = project?.ctaProps || project?.ctaContent || {}

  return (
    <div className="project-detail-page">
      <div className='d-none md:d-block'>
      <PageHeader title={project.title} image={project.headerImage} url={project?.url}/>
    </div>
    <div className='md:d-none'>
    <PageHeader title={project.title} image={project?.headerImageMob || project?.headerImage}/>
    </div>
      <div ref={contentRef}>
        {showContent && (
          <>
            {/* Statistics Section */}
            {/* <section className="project-stats-section container py-48">
              <div className="project-stats-grid grid grid-4 gap-24">
                {project.stats.map((stat, index) => (
                  <div key={index} className="project-stat-card card text-center">
                    <div className="project-stat-icon">
                      {stat.icon ? (
                        typeof stat.icon === 'string' ? (
                          stat.icon
                        ) : (
                          (() => {
                            const Icon = stat.icon
                            return <Icon />
                          })()
                        )
                      ) : null}
                    </div>
                    <div className="project-stat-number">{stat.number}</div>
                    <div className="project-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section> */}

            {/* Main Content Section */}
            {/* show if title exists and content exists */}
            { project?.content &&    (
            <section key={project.id} className="project-content-section container py-48">
              <div className="project-content-grid grid grid-12 gap-32">
                {/* Left Content */}
                <div className="project-content-left col-12 lg-8">
                  <h2>{project?.title}</h2>
                  <div className="project-content-text">
                    <p className="text-base mb-24">{project.content.paragraph1}</p>
                    <p className="text-base mb-24">{project.content.paragraph2}</p>
                  </div>

                  {/* Main Image */}
                  {/* <div className="project-main-image mb-32">
                    <LazyImage
                      src={project.mainImage}
                      alt={project.title}
                      className="project-main-image-img"
                    />
                  </div> */}

                  {project.content.paragraph3 && (
                    <div className="project-content-text">
                      <p className="text-base">{project.content.paragraph3}</p>
                    </div>
                  )}

                  {/* Single video embed inside content */}
                  {project.content.testimonials?.videos?.[0] && (
                    <div className="project-content-video">
                      {isPlayingContentVideo ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${project.content.testimonials.videos[0].match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]}?autoplay=1`}
                          title="Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div 
                          className="project-content-video-thumbnail"
                          onClick={() => setIsPlayingContentVideo(true)}
                        >
                          <img 
                            src={`https://img.youtube.com/vi/${project.content.testimonials.videos[0].match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]}/maxresdefault.jpg`}
                            alt="Video Thumbnail"
                            onError={(e) => {
                              e.target.src = `https://img.youtube.com/vi/${project.content.testimonials.videos[0].match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]}/hqdefault.jpg`
                            }}
                          />
                          <div className="play-button-overlay">
                            <div className="play-button">
                              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="30" cy="30" r="30" fill="white" fillOpacity="0.9" />
                                <path d="M24 20L24 40L38 30L24 20Z" fill="var(--color-primary)" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Sidebar - Donate Form or Initiative Cards */}
                <div className="project-donate-sidebar col-12 lg-4">
                  {project.showInitiative && project.initiatives ? (
                    <div className="project-initiative-cards">
                      {Array.isArray(project.initiatives) ? (
                        project.initiatives.map((initiative) => (
                          <InitiativeDonationCard
                            key={initiative.id}
                            initiative={{
                              ...initiative,
                              parentProjectId: project.id,
                              parentProjectTitle: project.title
                            }}
                          />
                        ))
                      ) : (
                        <InitiativeDonationCard
                          initiative={{
                            ...project.initiatives,
                            parentProjectId: project.id,
                            parentProjectTitle: project.title
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <VerticalDonationForm
                      formId="project-detail-donation-form"
                      donationOptions={project.donationOptions}
                      categoryOptions={categoryOptions}
                      defaultCategory={project.donateCategory}
                      defaultProjectId={resolvedProjectId}
                      onSubmit={handleDonationSubmit}
                      projects={project.initiatives || []} // pass the initiatives as projects to the donation form
                    />
                  )}
                </div>
              </div>
            </section>
            ) 
          }
          </>
        )}
      </div>

      {/* Full Width Image Section - loads on short scroll */}
      {project?.mainImage && <div ref={imageRef} style={{ minHeight: '200px' }}>
        {showImage && (
          <section className="project-full-image-section">
            <div className="project-full-image-container">
              <LazyImage
                src={project.mainImage}
                alt={`${project.title} - Impact`}
                className="project-full-image"
              />
            </div>
          </section>
        )}
      </div> }

      {/* Media Content Section for Sub-Projects - loads on short scroll */}
      <div ref={mediaRef} style={{ minHeight: '200px' }}>
        {showMedia && (
          <>
            {project.subProjects && project.subProjects.length > 0 && (
              <Suspense fallback={null}>
                <MediaContentSection 
                  subProjects={project.subProjects} 
                  defaultImage={project.mainImage}
                  projectKey={resolvedProjectId}
                />
              </Suspense>
            )}
            {/* Testimonials Section */}
            {project?.testimonials && (
              <div className={project.testimonials.mobileOnly ? 'testimonials-mobile-only' : ''}>
                <Suspense fallback={null}>
                  <ProjectsTestimonial
                    videos={project.testimonials.videos}
                    title={project.testimonials.title}
                    subtitle={project.testimonials.subtitle}
                  />
                </Suspense>
              </div>
            )}
            {/* FAQs Section */}
            {project?.faqs && (
              <Suspense fallback={null}>
                <FAQs
                  title={project.faqs.title}
                  subtitle={project.faqs.subtitle}
                  faqs={project.faqs.faqs}
                />
              </Suspense>
            )}
          </>
        )}
      </div>

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <Newsletter />
            </Suspense>
            <Suspense fallback={null}>
              <DonationCta {...projectCtaProps} />
            </Suspense>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
      </div>
      {totalDonationAmount > 0 && (
        <DonationSidebar />
      )}
    </div>
  )
}

export default ProjectDetail

