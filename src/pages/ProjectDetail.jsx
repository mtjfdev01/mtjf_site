import { useParams, useNavigate } from 'react-router-dom'
import PageHeader from '../components/pageHeader/PageHeader'
import Footer from '../components/footer/Footer'
import DonationForm from '../components/donationForm/DonationForm'
import { PROJECTS_DETAIL_DATA } from '../data/projectsData'
import './ProjectDetail.css'
import VerticalDonationForm from '../components/donationForm/VerticalDonationForm'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS_DETAIL_DATA[id]

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
              <img
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

      {/* Full Width Image Section */}
      <section className="project-full-image-section">
        <div className="project-full-image-container">
          <img
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

      <Footer />
    </div>
  )
}

export default ProjectDetail

