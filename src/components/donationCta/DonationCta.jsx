import './DonationCta.css'
import { useCart } from '../../contexts/CartContext'
const DonationCta = () => { 
  const { shortDonate } = useCart()
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
            Sadaqa/Donations/Zakat via Bank Transfer
          </h2>
          <span className="donation-cta-icon">✦</span>
        </div>
        
        <button 
        onClick={shortDonate}
        className="donation-cta-btn cta_primary_btn btn--alert">
          Donate Now
        </button>
      </div>
      <div className="donation-cta-colored-section donation-cta-colored-section--right"></div>
    </section>
  )
}

export default DonationCta

