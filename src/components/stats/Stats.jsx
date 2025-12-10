import './Stats.css'
import floodIcon from '../../assets/img/projects/icons2/flood_ helped.webp';
import logo_one from '../../assets/img/projects/icons2/logo_one.webp';

import Medicine from '../../assets/img/projects/icons2/medicine.webp';
import Home from '../../assets/img/projects/icons2/home.webp';
import Water from '../../assets/img/projects/icons2/water.webp';
import Scholarship from '../../assets/img/projects/icons2/scholarship.webp';
import AidPackages from '../../assets/img/projects/icons2/aid_packages.webp';
import Food from '../../assets/img/projects/icons2/food.webp';
import Education from '../../assets/img/projects/icons2/education.webp';
const STATS_DATA = [
  {
    id: 'floods',
    icon: (
        <img src={logo_one} alt="flood icon" />
      ),
    statistic: '400,000 +',
    description: 'People helped during the 2022 and 2025 floods of Pakistan',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  },
  {
    id: 'health',
    icon: (
      <img src={Medicine} alt="Medicine icon" />
   ),
    statistic: '200,000 +',
    description: 'Free of cost tests and medicines provided',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  },
  {
    id: 'homes',
    icon: (
      <img src={Home} alt="home icon" />
    ),
    statistic: '150,000+',
    description: 'Ration bags distributed',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  },
  {
    id: 'water',
    icon: (
     <img src={Water} alt="water icon" />
    ),
    statistic: '300,000 +',
    description: 'with access to clean water',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  },
  {
    id: 'education',
    icon: (
      <img src={Education} alt="education icon" />
    ),
    statistic: '300,000+',
    description: 'free-of-cost lab tests done',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  },
  {
    id: 'scholarship',
    icon: (
      <img src={Scholarship} alt="scholarship icon" />
    ),
    statistic: '6000+',
    description: 'Scholarships awarded',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  },
  {
    id: 'aid',
    icon: (
      <img src={AidPackages} alt="aid icon" />
  ),
    statistic: '200,000+',
    description: 'Aid packages distributed',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  },
  {
    id: 'food',
    icon: (
      <img src={Food} alt="food icon" /> 
    ),
    statistic: '50,000+ ',
    description: 'Trees planted',
    iconColor: 'rgba(83, 176, 72, 0.8)'
  }
]

const Stats = () => {
  return (
    <section className="stats-section container py-64">
      <div className="stats-header text-center mb-48">
        <h1 className="heading-secondary mb-16">Since 2019 We Have:</h1>
        <h2 className="h1">
         Brought Hope to 1 Million+ People, with your Help
        </h2>
      </div>

      <div className="stats-grid">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="stat-card card text-center">
            <div
              className="stat-icon-container"
              style={{ backgroundColor: stat.iconColor }}
            >
              <div className="stat-icon" style={{ color: 'white' }}>
                {stat.icon}
              </div>
            </div>
            <h3 className="stat-number bold mb-8">{stat.statistic}</h3>
            <p className="stat-description text-sm muted">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats

