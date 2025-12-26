import './DonationCta.css'
import { useNavigate } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'
const DonationCta = () => {
  const navigate = useNavigate()  
  return (
    <section className="donation-cta">
      <div className="donation-cta-colored-section donation-cta-colored-section--left"></div>
      <div className="donation-cta-card">
        <p className="donation-cta-intro text-gray-500">
          You can send your
        </p>
        
        <div className="donation-cta-title-wrapper flex items-center justify-center gap-12">
          <span className="donation-cta-icon">✦</span>
          <h2 className="donation-cta-title">
            sadqa/Donations/Zakat via Bank Transfer
          </h2>
          <span className="donation-cta-icon">✦</span>
        </div>
        
        <button 
        onClick={() => navigate('/donate')}
        className="donation-cta-btn cta_primary_btn btn--alert btn-donate-animated">
          {/* Animated background particles */}
          <span className="particle particle-3"></span>
          <span className="particle particle-4"></span>
          
          {/* Glowing border */}
          <span className="glow-border"></span>
          
          {/* Button content */}
          <span className="btn-donate-content">
            <FcDonate className="btn-donate-icon" size={20} />
            <span>Donate Now</span>
          </span>
        </button>
      </div>
      <div className="donation-cta-colored-section donation-cta-colored-section--right"></div>
    </section>
  )
}

export default DonationCta

