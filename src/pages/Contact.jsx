import React, { Suspense, lazy, useEffect, useState } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/contact us/hero contact.webp'

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
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 0)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <PageHeader title="Contact" image={image1} />

      {showContent && (
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
          <Suspense fallback={null}>
            <ContactMap />
          </Suspense>
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
    </>
  )
}
export default Contact
