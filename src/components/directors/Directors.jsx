import React from 'react'
import '../../common/styles/base.css'
import '../../common/styles/common.css'
import './Directors.css'
import directorImage from '../../assets/img/directors/molana.webp'

const defaultTexts = [
  'Our foundation was established to promote the teachings of Islam, foster interfaith harmony, and serve humanity through various initiatives such as education scholarships, healthcare, food, clean water, housing, and a marriage gift for girls.',
  'We believe that all people should have the opportunity to live with dignity and security, including girls who are preparing to enter into marriage. To support this, we provide marriage gifts to girls to help them establish a new home.',
  'We are immensely grateful for your support and invite you to join us on this journey to make a positive impact in the world.'
]

const Directors = ({
  imageUrl = directorImage,
  directorName = 'Molana Tariq Jamil',
  directorRole = "Chairman",
  directorTexts = defaultTexts
}) => {
  return (
    <section className="directors-section">
      <div className=" directors-wrapper">
        <div className="directors-heading-block text-center">
          <h2 className="heading-primary directors-heading-title">
            {directorRole}
          </h2>
        </div>

        <div className="directors-panel">
          <figure className="directors-image-panel">
            <img
              src={imageUrl}
              alt="Molana Tariq Jamil delivering a message"
              className="directors-image"
            />

            <figcaption className="directors-label">
              <span className="directors-name h2">{directorName}</span>
              <span className="directors-role text-accent">
                {directorRole}'s Message
              </span>
            </figcaption>
          </figure>

          <div className="directors-text-panel">
            <span className="directors-quote-mark" aria-hidden="true">
              &ldquo;
            </span>

            {directorTexts.map((text, index) => (
              <p key={index} className="directors-text text-base">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Directors

