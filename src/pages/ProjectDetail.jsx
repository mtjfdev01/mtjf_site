import { useParams, useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import { PROJECTS_DETAIL_DATA } from '../data/projectsData'
import './ProjectDetail.css'
import VerticalDonationForm from '../components/donationForm/VerticalDonationForm'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import LazyImage from '../components/common/LazyImage'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS_DETAIL_DATA[id]

  const [contentRef, showContent] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [imageRef, showImage] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  if (!project) {
    return (
      <div className="container py-48 text-center">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
      </div>
    )
  }

  const handleDonationSubmit = (formData) => {
    navigate('/donate', { state: { project: project.id, ...formData } })
  }

  const categoryOptions = ['General', project.donateCategory].filter(Boolean)

  return (
    <div className="project-detail-page">
      <PageHeader title={project.title} image={project.headerImage} />

      <div ref={contentRef}>
        {showContent && (
          <>
            {/* Statistics Section */}
            <section className="project-stats-section container py-48">
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
            </section>

            {/* Main Content Section */}
            <section className="project-content-section container py-48">
              <div className="project-content-grid grid grid-12 gap-32">
                {/* Left Content */}
                <div className="project-content-left col-12 lg-8">
                  <h2 className="h1 mb-24">{project.title}</h2>
                  <div className="project-content-text">
                    <p className="text-base mb-24">{project.content.paragraph1}</p>
                    <p className="text-base mb-24">{project.content.paragraph2}</p>
                  </div>

                  {/* Main Image */}
                  <div className="project-main-image mb-32">
                    <LazyImage
                      src={project.mainImage}
                      alt={project.title}
                      className="project-main-image-img"
                    />
                  </div>

                  <div className="project-content-text">
                    <p className="text-base">{project.content.paragraph3}</p>
                  </div>
                </div>

                {/* Right Sidebar - Donate Form */}
                <div className="project-donate-sidebar col-12 lg-4">
                  <VerticalDonationForm
                    formId="project-detail-donation-form"
                    donationOptions={project.donationOptions}
                    categoryOptions={categoryOptions}
                    defaultCategory={project.donateCategory}
                    onSubmit={handleDonationSubmit}
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {/* Full Width Image Section */}
      <div ref={imageRef} style={{ minHeight: '50px' }}>
        {showImage && (
          <section className="project-full-image-section">
            <div className="project-full-image-container">
              <LazyImage
                src={project.mainImage}
                alt={`${project.title} - Impact`}
                className="project-full-image"
              />
            </div>

            <div className="project-full-image-text container">
              {(project.additionalContent ||
                [project.content.paragraph1, project.content.paragraph2]
              ).map((text, index) => (
                <p key={index} className="text-base project-full-image-paragraph">
                  {text}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>

      <div ref={restRef} style={{ minHeight: '50px' }}>
        {showRest && (
          <>
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
    </div>
  )
}

export default ProjectDetail

