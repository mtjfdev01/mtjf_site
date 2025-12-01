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
            <h5 className="heading-secondary mission-title">Our Mission</h5>
            
            <h2 className="mission-heading h2 text-white mb-24">
              Standing Strong for a Free and Dignified Pakistan
            </h2>
            
            <p className="mission-text text-base text-white mb-16">
              The Molana Tariq Jamil Foundation is dedicated to serving humanity without discrimination, 
              providing essential services like education, healthcare, and shelter regardless of color, 
              religion, or creed.
            </p>
            
            <p className="mission-text text-base text-white mb-16">
              We believe in empowerment, breaking the cycle of poverty through education and sustainable 
              initiatives. Our non-profit, non-political, and non-sectarian approach makes us a beacon 
              of hope, promoting unity, love, understanding, and empowerment globally.
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