import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import LazyImage from '../components/common/LazyImage'
import { useNavigate } from 'react-router-dom'
import {
  EVENTS_DATA,
  EVENTS_PAGE_DATA
} from '../data/eventsData'
import './EventsPage.css'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const EventsPage = () => {
  const navigate = useNavigate()

  // Function to handle register/support button click
  const handleRegisterClick = (donationUrl, openInNewTab = false) => {
    if (donationUrl && openInNewTab) {
      window.open(donationUrl, '_blank', 'noopener,noreferrer')
      return
    }

    // If donationUrl exists, navigate to that page
    if (donationUrl) {
      navigate(donationUrl)
      return
    }
    
    // Otherwise, scroll to the donation form on the page
    setTimeout(() => {
      let donationForm = document.querySelector('.vertical-donation-form')
      if (!donationForm) {
        donationForm = document.querySelector('.donation-form')
      }
      if (donationForm) {
        donationForm.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const firstInput = donationForm.querySelector('input, select, button')
        if (firstInput) {
          firstInput.focus()
        }
      }
    }, 100)
  }

  return (
    <div className="events-page">
      <PageHeader
        title={EVENTS_PAGE_DATA.title}
        image={EVENTS_PAGE_DATA.headerImage}
      />

      <section className="events-list-section">
        <div className="container">
          {EVENTS_DATA.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-layout-wrapper">
                {/* Left Side - Image */}
                <div className="event-image-wrapper">
                  <LazyImage
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                  />
                </div>

                {/* Right Side - Content */}
                <div className="event-content-wrapper">
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-subtitle">{event.subtitle}</p>
                  <div className="event-description">
                    {event.description}
                  </div>
                  {event.donateButtonText && (
                    <button
                      className="event-cta btn btn--primary"
                      onClick={() => handleRegisterClick(event.donationUrl, event.openInNewTab)}
                    >
                      {event.donateButtonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Suspense fallback={null}>
        <Newsletter />
      </Suspense>
      <Suspense fallback={null}>
        <DonationCta />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default EventsPage
