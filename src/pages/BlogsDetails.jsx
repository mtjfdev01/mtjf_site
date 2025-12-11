import React, { Suspense, lazy } from 'react'
import BlogDetailSection   from '../components/BlogsDetails/index'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const BlogsDetails = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ rootMargin: '50px', loadImmediately: true })
  const [restRef, showRest] = useIntersectionObserver({ rootMargin: '200px' })

  return (
    <>
      <div ref={firstSectionRef}>
        {showFirstSection && (
          <Suspense fallback={null}>
            <BlogDetailSection />
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

export default BlogsDetails
