import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/blogs/hero section for blogs.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Events = lazy(() => import('../components/events/Events'))
const Blogs = lazy(() => import('../components/blogs/Blogs'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))

const BlogsPage = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader image={image1} />

      <div ref={firstSectionRef}>
        {showFirstSection && (
          <Suspense fallback={null}>
            <Events />
          </Suspense>
        )}
      </div>

      <div ref={restRef} style={{ minHeight: '50px' }}>
        {showRest && (
          <>
            {/* <Suspense fallback={null}>
              <Blogs />
            </Suspense> */}
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

export default BlogsPage