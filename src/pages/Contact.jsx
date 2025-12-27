import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'

import image1 from '../assets/img/hero/contact_us_hero.webp'

// import image1 from '../assets/img/contact us/hero contact.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'


const ContactSection = lazy(() =>
  import('../components/contact/ContactSection')
)
const ContactMap = lazy(() =>
  import('../components/contant-us/ContactMap')
)
const InternationalOffices = lazy(() =>
  import('../components/contant-us/InternationalOffices')
)
const NationalOffices = lazy(() =>
  import('../components/contant-us/NationalOffices')
)
const Events = lazy(() => import('../components/events/Events'))
const QuickBlogs = lazy(() => import('../components/quickblogs/index'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))

const Contact = () => {
  // First component after header - loads immediately
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Next component - loads on short scroll
  const [secondSectionRef, showSecondSection] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <PageHeader title="Contact" image={image1} />

      {/* First component after header - loads immediately */}
      <div ref={firstSectionRef}>
        {showFirstSection && (
            <ContactSection onSubmit={handleSubmit} />
        )}
      </div>
              <NationalOffices />
              <InternationalOffices />
              <ContactMap />
              <Newsletter />
              <DonationCta />
              <Footer />
    </>
  )
}
export default Contact
