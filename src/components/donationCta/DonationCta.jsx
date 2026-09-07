import './DonationCta.css'
import { useNavigate } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'

const DonationCta = ({
  intro = 'You can send your',
  title = 'Sadqa/Donations/Zakat Via Bank Transfer',
  cta_btn_text = 'Donate Now',
  route = '/donate'
}) => {
  const navigate = useNavigate()

  const handleCtaClick = () => {
    if (route) {
      navigate(route)
      return
    }

    // Same as donateButtonText with empty donationUrl: scroll to donation form
    setTimeout(() => {
      let donationForm = document.querySelector('.vertical-donation-form')
      if (!donationForm) {
        donationForm = document.querySelector('.vertical-donation-replica-form')
      }
      if (!donationForm) {
        donationForm = document.querySelector('.donation-form')
      }
      if (donationForm) {
        donationForm.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const firstInput = donationForm.querySelector('input, select, button')
        if (firstInput) {
          firstInput.focus()
        }
      }
    }, 100)
  }

  return (
    <section className="donation-cta">
      <div className="donation-cta-colored-section donation-cta-colored-section--left"></div>
      <div className="donation-cta-card">
        <p className="donation-cta-intro text-gray-500">
          {intro}
        </p>
        
        <div className="donation-cta-title-wrapper flex items-center justify-center gap-12">
          <span className="donation-cta-icon">✦</span>
          <h2 className="donation-cta-title">
            {title}
          </h2>
          <span className="donation-cta-icon">✦</span>
        </div>
        
        <button 
        onClick={handleCtaClick}
        className="donation-cta-btn cta_primary_btn btn--alert btn-donate-animated">
          {/* Animated background particles */}
          <span className="particle particle-3"></span>
          <span className="particle particle-4"></span>
          
          {/* Glowing border */}
          <span className="glow-border"></span>
          
          {/* Button content */}
          <span className="btn-donate-content">
            <FcDonate className="btn-donate-icon" size={20} />
            <span>{cta_btn_text}</span>
          </span>
        </button>
      </div>
      <div className="donation-cta-colored-section donation-cta-colored-section--right"></div>
    </section>
  )
}

export default DonationCta

