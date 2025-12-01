import React, { Suspense, lazy, useEffect, useState } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/blogs/hero section for blogs.webp'

const Events = lazy(() => import('../components/events/Events'))
const Blogs = lazy(() => import('../components/blogs/Blogs'))
const DonationCta = lazy(() =>
  import('../components/donationCta/DonationCta')
)
const Footer = lazy(() => import('../components/footer/Footer'))

const BlogsPage = () => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PageHeader  image={image1} />

      {showContent && (
        <>
          <Suspense fallback={null}>
            <Events />
          </Suspense>
          {/* <Suspense fallback={null}>
            <Blogs />
          </Suspense> */}
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

export default BlogsPage