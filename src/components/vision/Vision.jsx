import React from 'react'
import './Vision.css'
import missionImg from '../../assets/img/mission/mission.webp'
const Mission = () => {
  return (
    <section className="mission-section">
      {/* Full-width black background container */}
      <div className="mission-black-bg">
        <div className="container mission-container relative">
          
        {/* Image box - Left side */}
          {/* <div className="mission-image-box">
            <img 
              src={missionImg} 
              alt="MTJ Foundation distribution during Ramadan"
              className="mission-img"
            />
          </div> */}
          {/* Text content - Right side */}
          <div className="mission-content">
            {/* Vision Section */}

            <h2 className="heading-secondary mission-title">Our Vision</h2> 
            <h3 className='mission-subtitle'>The Future We Aim to Build</h3>
            
            <p className="mission-text text-base text-white mb-16">
              <b>Empowering Communities, Transforming Lives.</b>
            </p>
            <p className="mission-text text-base text-white mb-16">
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