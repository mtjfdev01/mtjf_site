import React from 'react'
import './index.css'
import PageHeader from '../pageHeader/PageHeader'
import heroImg from '../../assets/img/blogs_details/hero.webp'
import mediaImg from '../../assets/img/blogs_details/shahroz.webp'

const BlogDetailSection = ({
  title = 'MTJ Foundation Advances Community Health Through Diabetes Awareness Session',
//   location = 'Tulamba, Punjab, Pakistan',
  date = 'May 9, 2025',
}) => {
  return (
    <article className="bd-page">
      {/* Shared page header (hero) */}
      <PageHeader image={heroImg} title={title} />

      {/* Black intro band with bullets + location + title + lead */}
      <section className="bd-header container">
        <h1 className="bd-header__title">{title}</h1>
        <div className="bd-meta">
          <div className="bd-meta__item">
            <span className="bd-meta__icon">📅</span>
            <span className="bd-meta__label">Date:</span>
            <span className="bd-meta__value">{date}</span>
          </div>
          {/* <div className="bd-meta__item">
            <span className="bd-meta__icon">📍</span>
            <span className="bd-meta__label">Location:</span>
            <span className="bd-meta__value">{location}</span>
          </div> */}
        </div>
      </section>

      {/* Main intro text */}
      <section className="bd-intro-text container">
        <p className="bd-intro-text__lead">
          The Molana Tariq Jamil (MTJ) Foundation's Health Department recently conducted a <strong>Diabetes Awareness and Lifestyle Management Session</strong> for 30 registered beneficiaries, as part of its ongoing efforts to promote preventive healthcare and reduce the burden of non-communicable diseases among vulnerable communities. The session was facilitated by <strong>Dr. Asif Imam</strong>, Senior Medical Officer at RHC Tulamba, and focused on equipping patients with practical, non-pharmacological tools to manage Type 2 Diabetes—emphasizing nutrition, physical activity, regular blood sugar monitoring, and lifestyle discipline. The event was attended by 30 diabetic patients (11 males, 19 females), all of whom are registered under MTJ Foundation's healthcare support system. The Foundation's <strong>Chief Executive Officer, Mr. Ihtsham Ullah Qureshi</strong> also participated as a special guest, demonstrating organizational commitment to community health initiatives.
        </p>
      </section>

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
