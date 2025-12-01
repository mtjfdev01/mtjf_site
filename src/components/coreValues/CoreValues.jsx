import React from 'react'
import '../../common/styles/base.css'
import '../../common/styles/common.css'
import './CoreValues.css'

const CoreValues = () => {
  const values = [
    { text: 'Equality' },
    { text: 'Inclusivity' },
    { text: 'Compassion' },
    { text: 'Unity' },
    { text: 'Global Perspective' },
    { text: 'Empowerment' },
    { text: 'Love in Action' },
    { text: 'Mutual Respect' },
    { text: 'Hope' },
  ]

  return (
    <section className="core-values-section">
      {/* Header Section */}
      <div className="core-values-header">
        <div className="container">
          <h2 className="heading-secondary core-values-title">Our Core Values</h2>
          <p>Discover, what MTJ focus most</p>
        </div>
      </div>

      {/* Content Section with Background */}
      <div className="core-values-content">
        <div className="core-values-bg" />
        
        <div className="container">
          <div className="core-values-overlay">
            <div className="core-values-grid">
              {values.map((value, index) => (
                <div key={index} className="core-value-item flex items-center gap-16">
                  <div className="core-value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#30AEE3" />
                          <stop offset="33%" stopColor="#2E7D32" />
                          <stop offset="66%" stopColor="#F98167" />
                          <stop offset="100%" stopColor="#ffda79" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={`url(#gradient-${index})`} />
                    </svg>
                  </div>
                  <span className="core-value-text text-white text-base">{value.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreValues

