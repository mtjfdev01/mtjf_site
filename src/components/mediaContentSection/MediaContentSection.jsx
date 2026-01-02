import React from 'react'
import LazyImage from '../common/LazyImage'
import './MediaContentSection.css'

const MediaContentSection = ({ subProjects, defaultImage }) => {
  // Function to focus the donation form
  const handleDonateClick = () => {
    setTimeout(() => {
      let donationForm = document.querySelector('.vertical-donation-form')
      if (!donationForm) {
        donationForm = document.querySelector('.donation-form')
      }
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
    return subProject?.image
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
            <div className={`media-content-wrapper container ${image ? imagePosition : 'no-image'}`}>
              {/* Content Side */}
              <div className="media-content-text">

                <h2 className="media-content-heading">{subProject.title}</h2>
                {subProject.subtitle && (
                  <p className="media-content-subtitle">{subProject.subtitle}</p>
                )}
                {subProject?.impact && (
                  <h3 className='m-0'>{subProject.impact}</h3>
                )}
                {subProject.description && (<>
                  {subProject?.descriptionBold && <b>{subProject?.descriptionBold || ''}</b>}
                  <p className="media-content-description"> {subProject.description} </p>
                  </>
                )} 
              {subProject.description2 && (<>
                {subProject?.description2Bold && <b>{subProject?.description2Bold || ''}</b>}
                  <p className="media-content-description"> {subProject.description2} </p>
                </>
                )} 
                {subProject.description3 && (<>
                  {subProject?.description3Bold && <b>{subProject?.description3Bold || ''}</b>}
                  <p className="media-content-description"> {subProject.description3} </p>
                </>
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

                {subProject.afterServicesText && (
                  <p className="media-content-description">{subProject.afterServicesText}</p>
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

              {/* Bottom Paragraph - appears below both image and text */}
              {/* BottomText Bold */}
              {(subProject?.bottomTextBold) && (
               <p><b>{subProject?.bottomTextBold || ''}</b></p>
              )}

              {/* Bottom Text Sub Title */}
              {(subProject?.bottomTextSubTitle) && (
                  <p>
                    {subProject?.bottomTextSubTitle || ''}
                  </p>
              )}
              {(subProject.bottomText || subProject.footerText || subProject.conclusion || subProject.summary) && (
                <div className="media-content-bottom-text">
                  <p className="media-content-bottom-paragraph">
                    {subProject.bottomText || subProject.footerText || subProject.conclusion || subProject.summary}
                  </p>
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
