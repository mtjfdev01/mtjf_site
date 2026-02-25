import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '../pageHeader/PageHeader'
import './BlogDetailsV2.css'

import headerImage from '../../assets/img/blogs/hero_blogs.webp'
import introImage from '../../assets/img/blogs/power of clean water.webp'
import sectionTwoImage from '../../assets/img/blogs/poor child.webp'
import slideOne from '../../assets/img/blogs/handpump.webp'
import slideTwo from '../../assets/img/blogs/poor man.webp'
import slideThree from '../../assets/img/blogs/image blog 3.webp'
import Footer from '../footer/Footer'

const sliderImages = [slideOne, slideTwo, slideThree, introImage, sectionTwoImage]

const BlogDetailsV2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  const tableRows = useMemo(
    () => [
      { metric: 'Families Reached', value: '12,500' },
      { metric: 'Women Beneficiaries', value: '6,800' },
      { metric: 'Children Supported', value: '8,200' },
      { metric: 'Districts Covered', value: '19' }
    ],
    []
  )

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

  const maxSlideIndex = Math.max(0, sliderImages.length - cardsPerView)

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
    if (sliderImages.length <= cardsPerView) return undefined
    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1))
    }, 3500)
    return () => window.clearInterval(intervalId)
  }, [cardsPerView, maxSlideIndex])

  return (
    <article className="blog-v2-page">
      <PageHeader title="Blog Details V2" image={headerImage} />

      <section className="blog-v2-intro container py-48">
        <div className="blog-v2-split blog-v2-split--60-40">
          <div className="blog-v2-text">
            <h2 className="heading-secondary">A New Story of Community Impact</h2>
            <p>
              This layout is designed as a clean editorial detail page where the narrative remains
              the focus. The left side gives enough room for text flow while the right side
              supports the story with visuals and context.
            </p>
            <p>
              The 60/40 ratio keeps readability strong on desktop and can naturally stack on
              smaller viewports. You can bind this section to dynamic blog content later.
            </p>
          </div>
          <div className="blog-v2-image-wrap">
            <img src={introImage} alt="Blog visual" className="blog-v2-image" />
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
              {sliderImages.map((image, index) => (
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
            <h2 className="heading-secondary">What Changed on Ground</h2>
            <p>
              The second mixed section keeps the same text-image rhythm and introduces an optional
              bottom block for summary-style messaging.
            </p>
            <h3 className="blog-v2-bottom-heading">Bottom Heading</h3>
          </div>
          <div className="blog-v2-image-wrap">
            <img src={sectionTwoImage} alt="Secondary visual" className="blog-v2-image" />
          </div>
        </div>
        <p className="blog-v2-bottom-paragraph">
          This bottom paragraph is useful for concluding the section with one clear takeaway
          before moving to the thematic points and data table.
        </p>
      </section>

      <section className="blog-v2-highlights container py-48">
        {/* <p className="heading-primary blog-v2-primary">Highlights</p> */}
        <h2 className="heading-secondary">Key Learning and Action Points</h2>
        <ul className="blog-v2-bullets">
          <li>Strengthen local partnerships for long-term continuity.</li>
          <li>Prioritize women-led outreach for faster household-level impact.</li>
          <li>Publish periodic updates to increase donor trust and transparency.</li>
          <li>Use measurable goals to track program outcomes month by month.</li>
        </ul>
      </section>

      <section className="blog-v2-table container py-48">
        <h2 className="heading-secondary">Program Figures (Optional Table)</h2>
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
      <Footer />
    </article>
  )
}

export default BlogDetailsV2
