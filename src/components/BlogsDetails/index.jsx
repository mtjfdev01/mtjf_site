import React from 'react'
import './index.css'
import PageHeader from '../pageHeader/PageHeader'
import heroImg from '../../assets/img/blogs_details/hero.webp'
import mediaImg from '../../assets/img/blogs_details/shahroz.webp'

const BlogDetailSection = ({
  title = 'MTJ Foundation Advances Community Health Through Diabetes Awareness Session',
  date = 'May 9, 2025',
  category = '',
  image = null,
  excerpt = '',
}) => {
  return (
    <article className="bd-page">
      {/* Shared page header (hero) */}
      <PageHeader image={image || heroImg} title={title} />

      {/* Black intro band with bullets + location + title + lead */}
      <section className="bd-header container">
        <h1 className="bd-header__title">{title}</h1>
        <div className="bd-meta">
          {category && (
            <div className="bd-meta__item">
              <span className="bd-meta__icon">📂</span>
              <span className="bd-meta__label">Category:</span>
              <span className="bd-meta__value">{category}</span>
            </div>
          )}
          <div className="bd-meta__item">
            <span className="bd-meta__icon">📅</span>
            <span className="bd-meta__label">Date:</span>
            <span className="bd-meta__value">{date}</span>
          </div>
        </div>
      </section>

      {/* Main intro text */}
      {excerpt && (
        <section className="bd-intro-text container">
          <p className="bd-intro-text__lead">
            {excerpt}
          </p>
        </section>
      )}

      {/* Split image banner with jagged bottom */}
      <section className="bd-banner">
        <div className="bd-banner__slices">
          <div className="bd-banner__slice" style={{ backgroundImage: `url(${mediaImg})` }} />
        </div>
      </section>

      {/* Stats and results section */}
      <section className="bd-stats container">
        <p><strong>73% of participants</strong> showed improved blood sugar levels within weeks of the session.</p>
        <p><strong>50%of patients</strong> reported being able to maintain normal blood sugar levels without medication through diet and exercise alone.</p>
        <p><strong>23% successfully managed their diabetes</strong> through a combination of dietary compliance and prescribed medication.</p>
         <p>
          Personalized consultations were conducted, and in several cases, medications were discontinued in favor of monitored lifestyle-based approaches.
        </p>
      </section>

      {/* Content block */}
      <section className="bd-content container">
       
        <p className="bd-section-title"><strong>Post-Session Support:</strong></p>
        <p>
          Several cases, medications were discontinued in favor of monitored lifestyle-based approaches.
        </p>
        <div className="bd-supports">
          <div className="bd-support-item">
            <strong>Daily Morning Calls:</strong> <span>Conducted by trained staff to monitor exercise, diet adherence, and blood sugar levels.</span>
          </div>
          <div className="bd-support-item">
            <strong>WhatsApp Groups:</strong> <span>Created to facilitate peer support, share educational materials, and maintain engagement.</span>
          </div>
          <div className="bd-support-item">
            <strong>Dedicated Focal Person:</strong> <span>Assigned to provide individual follow-up, counseling, and data collection</span>
          </div>
        </div>
        <p className="bd-closing">
          This structured approach reflects MTJ Foundation's model of combining education with ongoing support to reinforce<br /> behavioural change and ensure long-term health outcomes.
        </p>
      </section>
    </article>
  )
}

export default BlogDetailSection
