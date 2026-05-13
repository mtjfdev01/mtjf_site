import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import PageHeader from '../pageHeader/PageHeader'
import './BlogDetailsV2.css'
import Footer from '../footer/Footer'
import { getBlogById } from '../../data/blogsData'

const DonationCta = lazy(() => import('../donationCta/DonationCta'))

const BlogDetailsV2 = () => {
  const { id, slug } = useParams()
  const navigate = useNavigate()
  const blog = useMemo(() => getBlogById(id || slug), [id, slug])
  const subProjects = blog?.subProjects && Array.isArray(blog.subProjects) ? blog.subProjects : []

  const sliderImages = useMemo(() => {
    const imgs = []
    if (blog?.image) imgs.push(blog.image)
    subProjects.forEach(s => { if (s?.image) imgs.push(s.image) })
    return imgs
  }, [blog, subProjects])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  const tableRows = useMemo(() => [], [])

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCardsPerView(1)
      } else if (width < 992) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const maxSlideIndex = Math.max(0, (sliderImages?.length || 0) - cardsPerView)

  useEffect(() => {
    if (currentSlide > maxSlideIndex) {
      setCurrentSlide(maxSlideIndex)
    }
  }, [currentSlide, maxSlideIndex])

  const goPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? maxSlideIndex : prev - 1))
  }

  const goNext = () => {
    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1))
  }

  useEffect(() => {
    if (!sliderImages || sliderImages.length <= cardsPerView) return undefined
    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1))
    }, 3500)
    return () => window.clearInterval(intervalId)
  }, [cardsPerView, maxSlideIndex])

  if (!blog) {
    return (
      <article className="blog-v2-page container py-48 text-center">
        <h1>Blog Not Found</h1>
        <p>The blog you are looking for doesn&apos;t exist or has been moved.</p>
        <button type="button" className="btn" onClick={() => navigate('/blogs')}>Go to Blogs</button>
      </article>
    )
  }

  return (
    <article className="blog-v2-page">
      <PageHeader title={blog?.title || 'Blog'} image={blog?.image} />
      {subProjects.map((subProject, index) => (
        <React.Fragment key={subProject.id || index}>
          {/* Main Content Section for each subProject */}
          <section className="blog-v2-intro container py-48">
            <div className={`blog-v2-split blog-v2-split--60-40 ${index % 2 !== 0 ? 'blog-v2-split--reverse' : ''}`}>
              <div className="blog-v2-text">
                <h2 className="heading-secondary">{subProject.title}</h2>
                {subProject.description && <p>{subProject.description}</p>}
                {subProject.description2 && <p>{subProject.description2}</p>}
                {subProject.description3 && <p>{subProject.description3}</p>}
                {subProject.services && subProject.services.length > 0 && (
                  <ul className="blog-v2-bullets">
                    {subProject.services.map((service, i) => (
                      <li key={i}>{service}</li>
                    ))}
                  </ul>
                )}
                {subProject.bottomText && <h3 className="blog-v2-bottom-heading">{subProject.bottomText}</h3>}
              </div>
              <div className="blog-v2-image-wrap">
                {subProject.image && (
                  <img src={subProject.image} alt={subProject.title} className="blog-v2-image" />
                )}
              </div>
            </div>
          </section>

          {/* Slider Section - Render only once after the first subProject */}
          {index === 0 && sliderImages.length > 0 && (
            <section className="blog-v2-slider container">
              <div className="blog-v2-slider__frame">
                <button
                  type="button"
                  className="blog-v2-slider__nav blog-v2-slider__nav--prev"
                  onClick={goPrev}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <div className="blog-v2-slider__viewport">
                  <div
                    className="blog-v2-slider__track"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
                      '--cards-per-view': cardsPerView
                    }}
                  >
                    {(sliderImages || []).map((image, index) => (
                      <div key={`${index}-${image}`} className="blog-v2-slider__item">
                        <div className="blog-v2-slider__item-inner">
                          <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="blog-v2-slider__image"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="blog-v2-slider__nav blog-v2-slider__nav--next"
                  onClick={goNext}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            </section>
          )}

          {/* Bottom Banner for each subProject */}
          {subProject.bottom_banner_img && subProject.bottom_banner_mobile_img && (
            <div className="blog-v2-banner-wrapper">
              <div className="banner_img d-none md:d-block">
                <PageHeader 
                  title={subProject.title} 
                  image={subProject.bottom_banner_img} 
                  url={subProject.donationUrl}
                />
              </div>
              <div className="banner_img--mobile sm:d-block md:d-none">
                {subProject.donationUrl ? (
                  <Link to={subProject.donationUrl}>
                    <img 
                      src={subProject.bottom_banner_mobile_img} 
                      alt={subProject.title} 
                      style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                  </Link>
                ) : (
                  <img 
                    src={subProject.bottom_banner_mobile_img} 
                    alt={subProject.title} 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      {tableRows.length > 0 ? (
        <section className="blog-v2-table container py-48">
          <h2 className="heading-secondary">Program Figures</h2>
          <div className="blog-v2-table-wrap">
            <table className="blog-v2-table__el">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.metric}>
                    <td>{row.metric}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <Suspense fallback={null}>
        <DonationCta route="/donate/qurbani-baraye-mustehqeen" />
      </Suspense>

      <Footer />
    </article>
  )
}

export default BlogDetailsV2
