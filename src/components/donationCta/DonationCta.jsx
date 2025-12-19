import './DonationCta.css'
import { useNavigate } from 'react-router-dom'
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
        className="donation-cta-btn cta_primary_btn btn--alert">
          Donate Now
        </button>
      </div>
      <div className="donation-cta-colored-section donation-cta-colored-section--right"></div>
    </section>
  )
}

export default DonationCta

