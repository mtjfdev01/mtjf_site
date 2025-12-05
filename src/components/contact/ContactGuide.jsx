import { FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import './ContactSection.css'

const SOCIAL_LINKS = [
  { id: 'whatsapp', icon: <FaWhatsapp />, href: '#' },
  { id: 'facebook', icon: <FaFacebookF />, href: '#' },
  { id: 'twitter', icon: <FaTwitter />, href: '#' },
  { id: 'instagram', icon: <FaInstagram />, href: '#' }
]

const ContactGuide = ({
  subtitle = 'Contact  Us',
  title = 'We’re Here for You',
  description = 'Whether you’re a donor, volunteer, or supporter, we’re always ready to connect. Drop us a message — together we can make an even greater impact',
  socials = SOCIAL_LINKS
}) => {
  return (
    <div className="contact-guide">
      <h2 className="heading-secondary">{subtitle}</h2>
      <h3 className="contact-guide-title">{title}</h3>
      <p className="contact-guide-description">{description}</p>
      <div className="contact-guide-socials">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            className={`contact-social contact-social-${social.id}`}
            aria-label={social.id}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default ContactGuide

