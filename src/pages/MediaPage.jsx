import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import latestHero from '../assets/img/mediapage/latest-hero.png'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const MediaGrid = lazy(() => import('../components/mediaGrid'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))

const MediaPage = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  })
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  })

  return (
    <>
      <PageHeader image={latestHero} />

      <div ref={firstSectionRef}>
        {showFirstSection && (
          <Suspense fallback={null}>
            <MediaGrid />
          </Suspense>
        )}
      </div>

      <div ref={restRef} style={{ minHeight: '200px' }}>
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
}

export default MediaPage
