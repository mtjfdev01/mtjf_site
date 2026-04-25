import React from 'react'
import './index.css'
import PageHeader from '../pageHeader/PageHeader'
import heroImg from '../../assets/img/blogs_details/hero.webp'
import mediaImg from '../../assets/img/blogs_details/shahroz.webp'
import MediaContentSection from '../mediaContentSection/MediaContentSection'
import FAQs from '../faqs/FAQs'
const BlogDetailSection = ({   
  title,
  date,
  category,
  image,
  excerpt,
  subProjects,
  faqs,
}) => {
  console.log("subProjects1234", subProjects)
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
      {/* <section className="bd-banner">
        <div className="bd-banner__slices">
          <div className="bd-banner__slice" style={{ backgroundImage: `url(${mediaImg})` }} />
        </div>
      </section> */}

    

      <MediaContentSection
        subProjects={subProjects || []} 
        defaultImage={image || heroImg}
      />
      <FAQs 
        title="FAQs"
        subtitle="FAQs"
        faqs={faqs || []}
      />
    </article>
  )
}

export default BlogDetailSection
