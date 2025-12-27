import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/hero section for about/hero-about.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import VolunteerSection from '../components/volunteer/VolunteerSection'
import VolunteerCards from '../components/volunteerCards/VolunteerCards'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const VolunteerRegistration = () => {
  // First component after header - loads immediately
  const [formRef, showForm] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader title="Volunteer Registration" image={image1} />
      <VolunteerCards />
        {showForm && <VolunteerSection />}
              <Newsletter />
              <DonationCta />
              <Footer />
    </>
  )
};

export default VolunteerRegistration;