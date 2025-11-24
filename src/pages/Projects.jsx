import { Link, useNavigate } from 'react-router-dom'
import '../components/projects/ProjectsPage.css'
import image1 from '../assets/img/causes/Rectangle 34625787.png'
import image2 from '../assets/img/causes/Rectangle 34625788.png'
import image3 from '../assets/img/causes/Rectangle 34625789.png'
import PageHeader from '../components/pageHeader/PageHeader'

const ALL_PROJECTS_DATA = [
  {
    id: 'health',
    title: 'Health',
    description: 'Health is a blessing and is required to live life fully. It is very necessary for all of us to maintain a healthy lifestyle in order to be fit and fearless of diseases. Being healthy helps us to perform our daily activities without any hindrance.',
    image: image1,
    learnMorePath: '/projects/health',
    donatePath: '/donate/health'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Molana Tariq Jamil Foundation provides scholarships to individuals in need of financial assistance to further their education. These scholarships can range in amount and are awarded based on various criteria such as academic merit, financial need, or specific fields of study.',
    image: image2,
    learnMorePath: '/projects/education',
    donatePath: '/donate/education'
  },
  {
    id: 'disaster-management',
    title: 'Disaster Management',
    description: 'MTJ Foundation is working for relief the people affected by the flood by distribution Cooked food, Dry Foods, Medical Camps & distributing medicine.',
    image: image3,
    learnMorePath: '/projects/disaster-management',
    donatePath: '/donate/disaster-management'
  },
  {
    id: 'clean-water',
    title: 'Clean Water',
    description: 'Clean Water project is a welfare project initiated by MTJ Foundation to address the dire need for safe drinking water in deprived areas of the country.',
    image: image1,
    learnMorePath: '/projects/clean-water',
    donatePath: '/donate/clean-water'
  },
  {
    id: 'ecommerce-training',
    title: 'E Commerce Training',
    description: 'At the core of our mission, MTJ Foundation is dedicated to comprehensive livelihood support, committed to elevating the well-being of communities through sustainable economic empowerment initiatives.',
    image: image2,
    learnMorePath: '/projects/ecommerce-training',
    donatePath: '/donate/ecommerce-training'
  },
  {
    id: 'marriage-gift',
    title: 'Marriage Gift',
    description: 'Molana Tariq Jamil Foundation is doing a truly remarkable and heartwarming favor to distribute wedding gifts to poor girls. In many parts of the world, poverty can be a significant barrier to celebrating life\'s important milestones, including weddings.',
    image: image3,
    learnMorePath: '/projects/marriage-gift',
    donatePath: '/donate/marriage-gift'
  },
  {
    id: 'maskan',
    title: 'Maskan',
    description: 'MTJ Foundation\'s Maskan Program is a revolutionary initiative to provide shelter to the homeless. Our dream is that no one in Pakistan should be left to sleep under open sky.',
    image: image1,
    learnMorePath: '/projects/maskan',
    donatePath: '/donate/maskan'
  },
  {
    id: 'monthly-ration',
    title: 'Monthly Ration',
    description: 'Pakistan has a high rate of poverty and low development. This leads to citizens of lower socioeconomic classes suffering due to the lack of resources available to them. It is hard for many families to afford basic necessities including food.',
    image: image2,
    learnMorePath: '/projects/monthly-ration',
    donatePath: '/donate/monthly-ration'
  }
]

const Projects = () => {
  const navigate = useNavigate()

  return (
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
  )
}

export default Projects
