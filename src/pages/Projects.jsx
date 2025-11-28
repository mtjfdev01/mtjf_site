import { Link, useNavigate } from 'react-router-dom'
import '../components/projects/ProjectsPage.css'
import image1 from '../assets/img/causes/Rectangle 34625787.png'
import image2 from '../assets/img/causes/Rectangle 34625788.png'
import image3 from '../assets/img/causes/Rectangle 34625789.png'
import PageHeader from '../components/pageHeader/PageHeader'
import { ALL_PROJECTS_DATA } from '../data/projectsData'
import Events from '../components/events/Events'
import Blogs from '../components/blogs/Blogs'
import DonationCta from '../components/donationCta/DonationCta'
import Footer from '../components/footer/Footer'



const Projects = () => {
  const navigate = useNavigate()

  return (<>
    <section className="projects-page-section container py-48">
      <PageHeader image={image1} />
      <div className="projects-page-header text-center mb-48">
        <h1 className="heading-secondary mb-16">Projects</h1>
        <h2 className="h1">PROJECTS WE WORKED ON</h2>
      </div>

      <div className="projects-page-grid grid grid-2 gap-24">
        {ALL_PROJECTS_DATA.map((project) => (
          <div key={project.id} className="projects-page-card card relative overflow-hidden">
            <div className="projects-page-image-container relative w-100 h-100">
              <img
                src={project.image}
                alt={project.title}
                className="projects-page-image"
              />
              <div className="projects-page-overlay absolute w-100 h-100"></div>
            </div>

            <div className="projects-page-content absolute w-100 h-100 flex flex-col justify-end p-24">
              <h3 className="h3 mb-16 text-white">{project.title}</h3>
              <p className="text-sm text-white mb-24 projects-page-description">
                {project.description}
              </p>

              <div className="projects-page-actions flex gap-12">
                <button
                  type="button"
                  className="projects-page-donate-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(project.donatePath)
                  }}
                >
                  Donate
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
        ))}
      </div>

    </section>
    <Events />
      <Blogs />
      <DonationCta />
      <Footer />
    </>
  )
}

export default Projects
