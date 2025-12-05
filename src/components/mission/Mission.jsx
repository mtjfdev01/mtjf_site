import React from 'react'
import './Mission.css'
import missionImg from '../../assets/img/mission/mission.webp'
const Mission = () => {
  return (
    <section className="mission-section">
      {/* Full-width black background container */}
      <div className="mission-black-bg">
        <div className="container mission-container relative">
          
          {/* Text content - Left side */}
          <div className="mission-content">
            <h2 className="heading-secondary mission-title">Our Mission</h2>
            <h3>What We Strive For</h3>
            
            <p className="mission-text text-base text-white mb-16">
              <b>To serve humanity by providing education, healthcare, shelter, clean water, and livelihood opportunities—ensuring no one is left behind.</b>
            </p>
            
            <p className="mission-text text-base text-white mb-16">
             We work to break cycles of poverty, empower families, and uplift underserved communities by building solutions that last.
             From the classroom to the clinic, from livelihood training to emergency relief, our mission is rooted in service, dignity, and sustainable transformation.
            </p>
          </div>
          
          {/* Image box - Right side */}
          <div className="mission-image-box">
            <img 
              src={missionImg} 
              alt="MTJ Foundation distribution during Ramadan"
              className="mission-img"
            />
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Mission