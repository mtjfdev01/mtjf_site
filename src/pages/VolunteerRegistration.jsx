import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/hero section for about/hero-about.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import VolunteerForm from '../components/volunteer/VolunteerForm'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const VolunteerRegistration = () => {
  const [formRef, showForm] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader title="Volunteer Registration" image={image1} />
      
      <div ref={formRef}>
        {showForm && <VolunteerForm />}
      </div>

      <div ref={restRef} style={{ minHeight: '50px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <Newsletter />
            </Suspense>
            <Suspense fallback={null}>
              <DonationCta />
            </Suspense>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
      </div>
    </>
  )
};

export default VolunteerRegistration;