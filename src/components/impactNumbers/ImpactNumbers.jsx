import LazyImage from '../common/LazyImage'
import './ImpactNumbers.css'

import impact1 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -01.webp'
import impact2 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -02.webp'
import impact3 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -03.webp'
import impact4 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -04.webp'
import impact5 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -05.webp'
import impact6 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -06.webp'
import impact7 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -07.webp'
import impact8 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -08.webp'
import impact9 from '../../assets/img/impact_numbers/MTJF Impact Numbers 300x260 -09.webp'

const IMPACT_IMAGES = [
  { id: 'impact-1', src: impact1, alt: 'Impact stat 1' },
  { id: 'impact-2', src: impact2, alt: 'Impact stat 2' },
  { id: 'impact-3', src: impact3, alt: 'Impact stat 3' },
  { id: 'impact-4', src: impact4, alt: 'Impact stat 4' },
  { id: 'impact-5', src: impact5, alt: 'Impact stat 5' },
  { id: 'impact-7', src: impact7, alt: 'Impact stat 7' },
  { id: 'impact-6', src: impact6, alt: 'Impact stat 6' },
  { id: 'impact-8', src: impact8, alt: 'Impact stat 8' },
  { id: 'impact-9', src: impact9, alt: 'Impact stat 9' },
]

const ImpactNumbers = () => {
  return (
    <section className="impact-numbers-section container py-64">
      <div className="impact-numbers-header text-center mb-48">
        <h2 className="heading-secondary mb-16">Since 2019 We Have</h2>
        <h2>Brought Hope to 1 Million+ People, with your Help</h2>
      </div>

      <div className="impact-numbers-grid">
        {IMPACT_IMAGES.map((item) => (
          <div key={item.id} className="impact-number-card">
            <LazyImage
              src={item.src}
              alt={item.alt}
              className="impact-number-img"
              rootMargin="100px"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ImpactNumbers
