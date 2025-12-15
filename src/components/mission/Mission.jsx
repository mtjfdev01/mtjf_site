import React from 'react'
import './Mission.css'

const Mission = () => {
  return (
    <section className="mission-section">
      {/* Full-width black background container */}
      <div className="mission-black-bg">
        <div className="container mission-container relative">
          
          {/* Mission Column - Left */}
          <div className="mission-content">
            <h2 className="heading-secondary">Our Mission</h2> 
            <h3 className='mission-subtitle'>What We Strive For</h3>
            
            <p className="mission-text text-base mb-16">
              <b>To serve humanity by providing education, healthcare, shelter, clean water, and livelihood opportunities—ensuring no one is left behind.</b>
            </p>
            
            <p className="mission-text text-base mb-16">
             We work to break cycles of poverty, empower families, and uplift underserved communities by building solutions that last.
             From the classroom to the clinic, from livelihood training to emergency relief, our mission is rooted in service, dignity, and sustainable transformation.
            </p>
          </div>
          
          {/* Vision Column - Right */}
          <div className="mission-content">
            <h2 className="heading-secondary">Our Vision</h2> 
            <h3 className='mission-subtitle'>The Future We Aim to Build</h3>
            
            <p className="mission-text text-base mb-16">
              <b>Empowering Communities, Transforming Lives.</b>
            </p>
            <p className="mission-text text-base mb-16">
            We envision a world where every person—regardless of their circumstances—has access to basic rights, opportunities, and the tools to build a better future.
            A world where compassion guides action, communities thrive together, and hope becomes a shared reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission