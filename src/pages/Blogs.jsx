import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/blogs/hero_blogs.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import StorySection from '../components/story/StorySection'

const Events = lazy(() => import('../components/events/Events'))
const Blogs = lazy(() => import('../components/quickblogs'))
const BlogsGrid = lazy(() => import('../components/blogsGrid/index'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))

const BlogsPage = () => {
  // First component after header - loads immediately
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader image={image1} />

      {/* First component after header - loads immediately */}
      <div ref={firstSectionRef}>
        {showFirstSection && (
          <Suspense fallback={null}>
            {/* <Events /> */}
            <BlogsGrid />
            <StorySection />
          </Suspense>
        )}
      </div>

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <Blogs />
            </Suspense>
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