import React, { useState } from 'react'
import '../../common/styles/base.css'
import '../../common/styles/common.css'
import centralImg from '../../assets/img/ourStory/donateImg.png'
import topLeftImg from '../../assets/img/ourStory/Ellipse 7.png'
import bottomLeftImg from '../../assets/img/ourStory/Ellipse 5.png'
import rightImg from '../../assets/img/ourStory/Ellipse 6.png'
import './OurStory.css'

const OurStory = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => setIsExpanded((prev) => !prev)

  return (
    <section className="our-story-section py-16">
      <div className="container our-story-grid">
        {/* Orbit visual */}
        <div className="our-story-visual center">
          <div className="orbit">
            <span className="orbit-ring ring-1" />
            <span className="orbit-ring ring-2" />
            <span className="orbit-ring ring-3" />

            <div className="orbit-center shadow-lg">
              <img src={centralImg} alt="Donate" />
            </div>

            <figure className="orbit-avatar avatar-top-left shadow-lg">
              <img src={centralImg} alt="Volunteer 1" />
            </figure>

            <figure className="orbit-avatar avatar-bottom-left shadow-lg">
              <img src={centralImg} alt="Volunteer 2" />
            </figure>

            <figure className="orbit-avatar avatar-right shadow-lg"> 
              <img src={centralImg} alt="Volunteer 3" /> 
            </figure>
          </div>
        </div>

        {/* Text content */}
        <div className="our-story-content">
          <p className="heading-secondary text-right mb-16">Our Story</p>

          <h2 className="h2 text-white mb-24">
            Molana Tariq Jamil, a revered figure since the 1980s, has dedicated his life
            to philanthropy with a mission to uplift those in need.
          </h2>

          <p className="text-base text-white opacity-80 mb-16">
            Recognizing the deep-rooted need for support, he established the MTJ Foundation
            as a beacon of hope for those in need. His lifelong commitment to helping others
            is now embodied in the foundation, providing education, healthcare, and economic empowerment.
          </p>

          {isExpanded && (
            <p className="text-base text-white opacity-80 mb-16">
              Today, MTJ Foundation continues to expand its reach with programs focused on sustainable livelihoods,
              community wellness, and education that empowers every generation to thrive with dignity.
            </p>
          )}

          <button type="button" className="our-story-link read-more bold" onClick={handleToggle}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default OurStory