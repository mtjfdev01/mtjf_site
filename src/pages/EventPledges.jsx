import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/hero section for about/hero-about.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import EventPledgeForm from '../components/eventPledge/EventPledgeForm'

const Footer = lazy(() => import('../components/footer/Footer'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

/**
 * Public page for donors to submit event pledges.
 */
const EventPledges = () => {
  const [formRef, showForm] = useIntersectionObserver({
    rootMargin: '50px',
    loadImmediately: true,
  })
  const [restRef, showRest] = useIntersectionObserver({
    rootMargin: '200px',
  })

  return (
    <>
      <PageHeader title="Event Pledge" image={image1} />
      <div ref={formRef} className="container" style={{ padding: '2rem 1rem 3rem' }}>
        {showForm && <EventPledgeForm />}
      </div>
      <div ref={restRef}>
        {showRest && (
          <Suspense fallback={null}>
            <DonationCta />
            <Footer />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default EventPledges
