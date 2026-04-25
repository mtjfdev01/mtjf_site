import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageHeader from '../pageHeader/PageHeader'
import './BlogDetailsV2.css'
import Footer from '../footer/Footer'
import { getBlogById } from '../../data/blogsData'

const BlogDetailsV2 = () => {
  const { id, slug } = useParams()
  const navigate = useNavigate()
  const blog = useMemo(() => getBlogById(id || slug), [id, slug])
  const subProjects = blog?.subProjects && Array.isArray(blog.subProjects) ? blog.subProjects : []
  const firstSection = subProjects[0] || null
  const secondSection = subProjects[1] || null
  const bullets = (secondSection?.services && Array.isArray(secondSection.services))
    ? secondSection.services
    : (firstSection?.services && Array.isArray(firstSection.services))
      ? firstSection.services
      : []
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
      <section className="blog-v2-intro container py-48">
        <div className="blog-v2-split blog-v2-split--60-40">
          <div className="blog-v2-text">
            <h2 className="heading-secondary">{firstSection?.title || blog?.title}</h2>
            {blog?.excerpt ? <p>{blog.excerpt}</p> : null}
            {firstSection?.description ? <p>{firstSection.description}</p> : null}
            {firstSection?.description2 ? <p>{firstSection.description2}</p> : null}
          </div>
          <div className="blog-v2-image-wrap">
            {firstSection?.image ? (
              <img src={firstSection.image} alt="Blog visual" className="blog-v2-image" />
            ) : null}
          </div>
        </div>
      </section>

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

      <section className="blog-v2-secondary container py-48">
        <div className="blog-v2-split blog-v2-split--60-40">
          <div className="blog-v2-text">
            <h2 className="heading-secondary">{secondSection?.title || 'Details'}</h2>
            {secondSection?.description ? <p>{secondSection.description}</p> : null}
            {secondSection?.description2 ? <p>{secondSection.description2}</p> : null}
            {secondSection?.description3 ? <p>{secondSection.description3}</p> : null}
            {secondSection?.bottomText ? <h3 className="blog-v2-bottom-heading">{secondSection.bottomText}</h3> : null}
          </div>
          <div className="blog-v2-image-wrap">
            {secondSection?.image ? (
              <img src={secondSection.image} alt="Secondary visual" className="blog-v2-image" />
            ) : null}
          </div>
        </div>
        {secondSection?.bottomText ? (
          <p className="blog-v2-bottom-paragraph">{secondSection.bottomText}</p>
        ) : null}
      </section>

      {bullets && bullets.length > 0 ? (
        <section className="blog-v2-highlights container py-48">
          <h2 className="heading-secondary">Key Points</h2>
          <ul className="blog-v2-bullets">
            {bullets.map((b, i) => <li key={`bullet-${i}`}>{b}</li>)}
          </ul>
        </section>
      ) : null}

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
      <Footer />
    </article>
  )
}

export default BlogDetailsV2
