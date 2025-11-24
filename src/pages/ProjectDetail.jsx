import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import Footer from '../components/footer/Footer'
import { PROJECTS_DETAIL_DATA } from '../data/projectsData'
import './ProjectDetail.css'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS_DETAIL_DATA[id]

  const [donationData, setDonationData] = useState({
    frequency: 'once',
    currency: 'PKR',
    amount: '',
    category: 'General',
    customAmount: ''
  })

  if (!project) {
    return (
      <div className="container py-48 text-center">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
      </div>
    )
  }

  const getDonationAmounts = (currency) => {
    if (project?.donationOptions && project.donationOptions[currency]) {
      return project.donationOptions[currency]
    }
    return currency === 'PKR'
      ? [5000, 10000, 25000, 50000]
      : currency === 'USD'
        ? [50, 100, 250, 500]
        : [45, 90, 225, 450]
  }

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    // Handle donation submission
    console.log('Donation submitted:', donationData)
    navigate('/donate', { state: { project: project.id, ...donationData } })
  }

  const handleAmountClick = (amount) => {
    setDonationData({ ...donationData, amount: amount.toString(), customAmount: '' })
  }

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
            <div className="project-donate-card">
              <h3 className="h2 mb-24">Donate</h3>

              <form onSubmit={handleDonationSubmit}>
                {/* Frequency Buttons */}
                <div className="donate-frequency mb-24">
                  <button
                    type="button"
                    className={`donate-frequency-btn ${donationData.frequency === 'once' ? 'active' : ''}`}
                    onClick={() => setDonationData({ ...donationData, frequency: 'once' })}
                  >
                    Give Once
                  </button>
                  <button
                    type="button"
                    className={`donate-frequency-btn ${donationData.frequency === 'monthly' ? 'active' : ''}`}
                    onClick={() => setDonationData({ ...donationData, frequency: 'monthly' })}
                  >
                    Give Monthly
                  </button>
                </div>

                {/* Currency */}
                <div className="donate-field mb-24">
                  <label className="donate-label">Currency</label>
                  <select
                    className="donate-input"
                    value={donationData.currency}
                    onChange={(e) =>
                      setDonationData({
                        ...donationData,
                        currency: e.target.value,
                        amount: '',
                        customAmount: ''
                      })
                    }
                  >
                    <option value="PKR">PKR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                {/* Pre-set Amounts */}
                <div className="donate-amounts mb-24">
                  <div className="donate-amounts-grid grid grid-2 gap-12">
                    {getDonationAmounts(donationData.currency).map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`donate-amount-btn ${donationData.amount === amount.toString() ? 'active' : ''}`}
                        onClick={() => handleAmountClick(amount)}
                      >
                        {amount.toLocaleString()} {donationData.currency}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="donate-field mb-24">
                  <label className="donate-label">{donationData.currency} Enter an amount</label>
                  <input
                    type="number"
                    className="donate-input"
                    placeholder="Enter custom amount"
                    value={donationData.customAmount}
                    onChange={(e) => {
                      setDonationData({
                        ...donationData,
                        customAmount: e.target.value,
                        amount: ''
                      })
                    }}
                  />
                </div>

                {/* Category */}
                <div className="donate-field mb-32">
                  <label className="donate-label">Category</label>
                  <select
                    className="donate-input"
                    value={donationData.category}
                    onChange={(e) => setDonationData({ ...donationData, category: e.target.value })}
                  >
                    <option value="General">General</option>
                    <option value={project.donateCategory}>{project.donateCategory}</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="donate-submit-btn">
                  Donate
                </button>
              </form>
            </div>
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

