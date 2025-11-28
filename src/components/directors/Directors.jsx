import React from 'react'
import '../../common/styles/base.css'
import '../../common/styles/common.css'
import './Directors.css'
import directorImage from '../../assets/img/directors/molana.jpg'

const Directors = () => {
  return (
    <section className="directors-section">
      <div className="container directors-wrapper">
        <div className="directors-heading-block text-center">
          <p className="heading-primary directors-heading-title">
            Directors
          </p>
          <p className="directors-heading-text text-base">
          Board of Directors.
          </p>
        </div>

        <div className="directors-panel">
          <figure className="directors-image-panel">
            <img
              src={directorImage}
              alt="Molana Tariq Jamil delivering a message"
              className="directors-image"
            />

            <figcaption className="directors-label">
              <span className="directors-name h2">Molana Tariq Jamil</span>
              <span className="directors-role text-accent">
                Chairman&apos;s Message
              </span>
            </figcaption>
          </figure>

          <div className="directors-text-panel">
            <span className="directors-quote-mark" aria-hidden="true">
              &ldquo;
            </span>

            <p className="directors-text text-base">
              Our foundation was established to promote the teachings of Islam,
              foster interfaith harmony, and serve humanity through various
              initiatives such as education scholarships, healthcare, food,
              clean water, housing, and a marriage gift for girls.
            </p>

            <p className="directors-text text-base">
              We believe that all people should have the opportunity to live
              with dignity and security, including girls who are preparing to
              enter into marriage. To support this, we provide marriage gifts to
              girls to help them establish a new home.
            </p>

            <p className="directors-text text-base">
              We are immensely grateful for your support and invite you to join
              us on this journey to make a positive impact in the world.
            </p>
            <div className="directors-button-row">
          <button type="button" className="directors-next-btn">
            Next <span aria-hidden="true">›</span>
          </button>
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Directors

