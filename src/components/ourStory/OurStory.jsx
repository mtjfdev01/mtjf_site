import React, { useState } from 'react'
import '../../common/styles/base.css'
import '../../common/styles/common.css'
import centralImg from '../../assets/img/ourStory/donate cap.webp'
import topLeftImg from '../../assets/img/ourStory/man1.webp'
import bottomLeftImg from '../../assets/img/ourStory/man2.webp'
import rightImg from '../../assets/img/ourStory/man3.webp'
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
              <img src={topLeftImg} alt="Volunteer 1" />
            </figure>

            <figure className="orbit-avatar avatar-bottom-left shadow-lg">
              <img src={bottomLeftImg} alt="Volunteer 2" />
            </figure>

            <figure className="orbit-avatar avatar-right shadow-lg"> 
              <img src={rightImg} alt="Volunteer 3" /> 
            </figure>
          </div>
        </div>

        {/* Text content */}
        <div className="our-story-content">
          <h2 className="heading-secondary text-right mb-16">Our Story</h2>
          <p>At the heart of the Molana Tariq Jamil Foundation (MTJF) is a simple but powerful belief:<b>every human being deserves dignity, opportunity, and compassion, regardless of their background.</b></p>
            <p></p>
          
          
        

          <p className="text-base text-white opacity-80 mb-16">
           Established by Molana Tariq Jamil, whose voice has inspired millions toward kindness and unity, MTJF began with a mission to ease suffering and uplift vulnerable families throughout Pakistan. Over the years, what started as a modest effort has grown into a global humanitarian movement—providing education, healthcare, clean water, shelter, and life-changing support to those who need it most.
           Since 2019, MTJF has touched 1 Million+ lives through sustainable, long-term programs that restore hope and build resilience. From constructing homes for flood survivors to ensuring clean drinking water in remote villages, our journey is driven by compassion and shaped by the belief that meaningful change begins with a single act of care.
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