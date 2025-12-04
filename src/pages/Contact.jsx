import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/contact us/hero contact.webp'
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
const Blogs = lazy(() => import('../components/blogs/Blogs'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))

const Contact = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [secondSectionRef, showSecondSection] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <PageHeader title="Contact" image={image1} />

      <div ref={firstSectionRef}>
        {showFirstSection && (
          <>
            <Suspense fallback={null}>
              <ContactSection onSubmit={handleSubmit} />
            </Suspense>
            <Suspense fallback={null}>
              <InternationalOffices />
            </Suspense>
            <Suspense fallback={null}>
              <NationalOffices />
            </Suspense>
          </>
        )}
      </div>

      <div ref={secondSectionRef} style={{ minHeight: '50px' }}>
        {showSecondSection && (
          <Suspense fallback={null}>
            <ContactMap />
          </Suspense>
        )}
      </div>

      <div ref={restRef} style={{ minHeight: '50px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <Events />
            </Suspense>
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
export default Contact
