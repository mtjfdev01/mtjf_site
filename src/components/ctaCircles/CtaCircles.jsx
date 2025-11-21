import './CtaCircles.css'
import donateImg from '../../assets/img/causes/Rectangle 34625787.png'
import reliefImg from '../../assets/img/causes/Rectangle 34625788.png'
import volunteerImg from '../../assets/img/causes/Rectangle 34625789.png'

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
  return (
    <section className='cta-circles container'>
      <div className='cta-grid'>
        {CTA_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`cta-card ${item.hideOnSm ? 'd-none md:d-flex' : 'd-flex'} items-center gap-16`}
          >
            {item.label && (
              <div
                className='cta-label text-white semi upper'
                style={{ backgroundColor: item.color }}
              >
                {item.label}
              </div>
            )}
            <div className='cta-circle shadow-lg overflow-hidden'>
              <img src={item.image} alt={item.alt} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CtaCircles

