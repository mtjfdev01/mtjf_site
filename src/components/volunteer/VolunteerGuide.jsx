import { FaCheck } from 'react-icons/fa'
import '../contact/ContactSection.css'

const BENEFITS = [
  'Help those in need',
  'Learn and grow',
  'Make a real impact'
]

const VolunteerGuide = ({
  subtitle = 'Join Us Now',
  title = 'Register yourself as our volunteer.',
  description = 'Become part of a meaningful cause—support our mission to spread hope, serve humanity, and help build a brighter, better tomorrow for everyone.',
  benefits = BENEFITS
}) => {
  return (
    <div className="contact-guide">
      <h2 className="heading-secondary">{subtitle}</h2>
      <h3 className="contact-guide-title">{title}</h3>
      <p className="contact-guide-description">{description}</p>
      <ul className="volunteer-guide-benefits">
        {benefits.map((benefit, index) => (
          <li key={index} className="volunteer-guide-benefit">
            <div className="volunteer-guide-check">
              <FaCheck />
            </div>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VolunteerGuide

