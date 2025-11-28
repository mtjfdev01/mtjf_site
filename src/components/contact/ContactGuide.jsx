import { FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import './ContactSection.css'

const SOCIAL_LINKS = [
  { id: 'whatsapp', icon: <FaWhatsapp />, href: '#' },
  { id: 'facebook', icon: <FaFacebookF />, href: '#' },
  { id: 'twitter', icon: <FaTwitter />, href: '#' },
  { id: 'instagram', icon: <FaInstagram />, href: '#' }
]

const ContactGuide = ({
  subtitle = 'Contact With Us',
  title = 'Feel Free to write us a message',
  description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  socials = SOCIAL_LINKS
}) => {
  return (
    <div className="contact-guide">
      <p className="heading-secondary">{subtitle}</p>
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

