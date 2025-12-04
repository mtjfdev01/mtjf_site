import './CtaCircles.css'
import { useCart } from '../../contexts/CartContext'
import donateImg from '../../assets/img/donation_volunteer_cta/donation_box.webp'
import reliefImg from '../../assets/img/donation_volunteer_cta/help.webp'
import volunteerImg from '../../assets/img/donation_volunteer_cta/ration.webp'

const CTA_ITEMS = [
  {
    id: 'donation',
    label: 'Make Donation',
    color: '#F5C46E',
    image: donateImg, 
    alt: 'Donation jar filled with coins',
    hideOnSm: false
  },
  {
    id: 'relief',
    label: null,
    color: null,
    image: reliefImg,
    alt: 'Elderly man receiving warm meal',
    hideOnSm: true
  },
  {
    id: 'volunteer',
    label: 'Become Volunteer',
    color: '#56C7C8',
    image: volunteerImg,
    alt: 'Hands stacked together to volunteer',
    hideOnSm: false
  }
]

const CtaCircles = () => {
  const { shortDonate, handleVolunteerRegistration } = useCart()

  const handleDonationClick = () => {
    shortDonate()
  }

  const handleVolunteerClick = () => {
    handleVolunteerRegistration()
  }

  return (
    <section className='cta-circles container'>
      <div className='cta-grid'>
        {CTA_ITEMS.map((item) => {
          const isDonation = item.id === 'donation'
          const isVolunteer = item.id === 'volunteer'
          const isClickable = isDonation || isVolunteer
          
          const handleClick = isDonation ? handleDonationClick : isVolunteer ? handleVolunteerClick : undefined
          
          return (
            <div
              key={item.id}
              className={`cta-card ${item.hideOnSm ? 'd-none md:d-flex' : 'd-flex'} items-center gap-16`}
              onClick={handleClick}
              style={isClickable ? { cursor: 'pointer' } : undefined}
            >
              {item.label && (
                <div
                  className='cta-label text-white semi upper'
                  style={{ 
                    backgroundColor: item.color,
                    cursor: isClickable ? 'pointer' : 'default'
                  }}
                >
                  {item.label}
                </div>
              )}
              <div 
                className='cta-circle shadow-lg overflow-hidden'
                style={isClickable ? { cursor: 'pointer' } : undefined}
              >
                <img src={item.image} alt={item.alt} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CtaCircles

