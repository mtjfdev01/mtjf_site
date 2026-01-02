import React, { Suspense, lazy } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BlogDetailSection from '../components/BlogsDetails/index'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { getBlogById } from '../data/blogsData'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const BlogsDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = getBlogById(id)
  console.log("blog subPros", blog?.subProjects)
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ rootMargin: '50px', loadImmediately: true })
  const [restRef, showRest] = useIntersectionObserver({ rootMargin: '200px' })

  // If blog not found, redirect to blogs page
  if (!blog) {
    return (
      <div className="container py-48 text-center">
        <h1>Blog Not Found</h1>
        <p>The blog you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/blogs')} className="btn">
          Go to Blogs
        </button>
      </div>
    )
  }

  return (
    <>
      <div ref={firstSectionRef}>
        {showFirstSection && (
          <Suspense fallback={null}>
            <BlogDetailSection 
              title={blog?.title}
              date={blog?.date}
              category={blog?.category}
              image={blog?.image}
              excerpt={blog?.excerpt}
              subProjects={blog?.subProjects}
              faqs={blog?.faqs || []}
            />
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
