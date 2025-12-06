import React from 'react'
import LazyImage from '../common/LazyImage'
import './MediaContentSection.css'

const MediaContentSection = ({ subProjects, defaultImage }) => {
  // Function to focus the donation form
  const handleDonateClick = () => {
    setTimeout(() => {
      const donationForm = document.querySelector('.vertical-donation-form')
      if (donationForm) {
        donationForm.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Focus on the first input field in the form
        const firstInput = donationForm.querySelector('input, select, button')
        if (firstInput) {
          firstInput.focus()
        }
      }
    }, 100)
  }

  // Helper function to get list items from sub-project
  const getListItems = (subProject) => {
    // Check for common list fields in order of priority
    if (subProject.services) return subProject.services
    if (subProject.benefits) return subProject.benefits
    if (subProject.programs) return subProject.programs
    if (subProject.workflow) return subProject.workflow
    if (subProject.reportIncludes) return subProject.reportIncludes
    if (subProject.points) return subProject.points
    if (subProject.interventions && Array.isArray(subProject.interventions)) return subProject.interventions
    if (subProject.support) return subProject.support
    if (subProject.response) return subProject.response
    if (subProject.faqs) return subProject.faqs
    if (subProject.programs && Array.isArray(subProject.programs) && subProject.programs[0]?.title) {
      // Handle nested programs structure (like clean-water)
      return subProject.programs.map(p => p.title)
    }
    return null
  }

  // Helper function to get image for sub-project
  const getSubProjectImage = (subProject) => {
    // Use default image for now, can be extended to use subProject.image if added later
    return defaultImage
  }

  if (!subProjects || subProjects.length === 0) {
    return null
  }

  return (
    <section className="media-content-section">
      {subProjects.map((subProject, index) => {
        const listItems = getListItems(subProject)
        const image = getSubProjectImage(subProject)
        const isEven = index % 2 === 0
        const imagePosition = isEven ? 'right' : 'left'

        return (
          <div key={subProject.id || index} className="media-content-item">
            <div className={`media-content-wrapper container ${imagePosition}`}>
              {/* Content Side */}
              <div className="media-content-text">
                {subProject.subtitle && (
                  <p className="media-content-subtitle">{subProject.subtitle}</p>
                )}
                <h2 className="media-content-heading">{subProject.title}</h2>
                {subProject.description && (
                  <p className="media-content-description">{subProject.description}</p>
                )}
                
                {listItems && listItems.length > 0 && (
                  <ul className="media-content-list">
                    {listItems.map((item, itemIndex) => {
                      // Handle both string items and object items
                      const itemText = typeof item === 'string' ? item : item.name || item.title || item.label || JSON.stringify(item)
                      return (
                        <li key={itemIndex} className="media-content-list-item">
                          <span className="media-content-list-icon"></span>
                          <span className="media-content-list-text">{itemText}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}

                {subProject.donateButtonText && (
                  <button
                    className="media-content-cta btn btn--primary"
                    onClick={handleDonateClick}
                  >
                    {subProject.donateButtonText}
                  </button>
                )}
              </div>

              {/* Image Side */}
              {image && (
                <div className="media-content-image">
                  <LazyImage
                    src={image}
                    alt={subProject.title}
                    className="media-content-image-img"
                  />
                </div>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default MediaContentSection

