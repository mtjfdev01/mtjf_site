import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './ContactSection.css'

const SOCIAL_LINKS = [
  { id: 'whatsapp', icon: <FaWhatsapp />, href: 'https://whatsapp.com/channel/0029VaOdgROFi8xkOWfsOl32' },
  { id: 'facebook', icon: <FaFacebookF />, href: 'https://www.facebook.com/foundation.mtj' },
  { id: 'twitter', icon: <FaXTwitter />, href: '#' },
  { id: 'instagram', icon: <FaInstagram />, href: 'https://www.instagram.com/mtjfoundation_pakistan/?hl=en' }
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
            target={social.href !== '#' ? "_blank" : undefined}
            rel={social.href !== '#' ? "noopener noreferrer" : undefined}
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

