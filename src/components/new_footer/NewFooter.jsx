import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaRss,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './NewFooter.css'
import logoImg from '../../assets/img/logos/footer_logo.png'
import googlePlayImg from '../../assets/img/app-stores/play_store.webp'

const aboutLinks = [
  { label: 'Contact Us', to: '/contact' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Programs', to: '/projects' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Volunteer', to: '/volunteerRegistration' },
  { label: 'Careers', to: '/careers' },
  { label: 'Regional Offices', to: '/regional-offices' },
  { label: 'Media & Downloads', to: '/downloads' },
  { label: 'Financial Reports', to: '/downloads' },
]

const basicsLinks = [
  { label: 'Ways to Donate', to: '/ways-to-donate' },
  { label: 'Privacy Policy', href: '/pdfs/policies/Privacy Policy.pdf', external: true },
  {
    label: 'Whistleblowing Policy',
    href: '/pdfs/policies/Whistleblowing Policy and Procedure.pdf',
    external: true,
  },
  { label: 'Volunteer Registration', to: '/volunteerRegistration' },
  { label: 'Publications', to: '/publications' },
  { label: 'Diagnostic Center', to: '/diagnostic-center' },
  // { label: 'Impacts', to: '/impacts' },
  // { label: 'Get Involved', to: '/getInvolved' },
]

const donationLinks = [
  { label: 'Clean Water', to: '/projects/clean-water' },
  { label: 'Health', to: '/projects/health' },
  { label: 'Education', to: '/projects/education' },
  { label: 'Disaster Relief', to: '/projects/disaster-management' },
  { label: 'Apna Ghar', to: '/projects/apna-ghar' },
  { label: 'Pay Zakat Online', to: '/zakat-calculator' },
  { label: 'Zakat Calculator', to: '/zakat-calculator' },
  { label: 'Donate Now', to: '/donate' },
]

const regionalOffices = [
  {
    city: 'Tulamba (Head Office)',
    address:
      'MTJ Foundation Secretariat, Makhdum Pur Road, Tulamba, District Khanewal, Pakistan',
    contacts: [
      { label: '061-111-786-853', href: 'tel:061111786853' },
      { label: '0303-2440000', href: 'tel:03032440000' },
      {
        label: 'info@mtjfoundation.org',
        href: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@mtjfoundation.org',
        external: true,
      },
      { label: 'Feedback: 0303-6660221', href: 'tel:03036660221' },
    ],
  },
  {
    city: 'Karachi',
    address:
      'Office No. 1, 190-1/A, Khayyam Chambers Nursery Market, Block 2, P.E.C.H.S, Main Shahrah-e-Faisal, Karachi',
    contacts: [
      { label: '021-111-786-853', href: 'tel:021111786853' },
      { label: '0300-2001575', href: 'tel:03002001575' },
    ],
  },
  {
    city: 'Multan',
    address: 'House #89, Block C, Model Town Phase-2, Multan',
    contacts: [
      { label: '061-111-786-853', href: 'tel:061111786853' },
      { label: '0303-2440000', href: 'tel:03032440000' },
    ],
  },
  {
    city: 'Faisalabad',
    address: 'Jamia Al-Hasanain, Green Town, Faisalabad',
    contacts: [
      { label: '041-111-786-853', href: 'tel:041111786853' },
      { label: '0300-4463903', href: 'tel:03004463903' },
    ],
  },
  {
    city: 'Lahore',
    address: 'Office #59-B, Faisal Town, Opposite Moon Market, Lahore',
    contacts: [
      { label: '042-111-786-853', href: 'tel:042111786853' },
      { label: '0300-4425557', href: 'tel:03004425557' },
    ],
  },
]

const socialLinks = [
  {
    href: 'https://www.facebook.com/foundation.mtj',
    label: 'Facebook',
    icon: FaFacebookF,
  },
  {
    href: 'https://x.com/foundationmtj',
    label: 'X',
    icon: FaXTwitter,
  },
  {
    href: 'https://youtube.com/@foundation_mtj?si=2NdH5biwwMFf8Ayv',
    label: 'YouTube',
    icon: FaYoutube,
  },
  {
    href: 'https://www.instagram.com/mtjfoundation_pakistan/?hl=en',
    label: 'Instagram',
    icon: FaInstagram,
  },
  {
    href: '/blogs',
    label: 'RSS',
    icon: FaRss,
  },
  {
    href: 'https://pk.linkedin.com/company/mtjf-00',
    label: 'LinkedIn',
    icon: FaLinkedinIn,
  },
]

const FooterLink = ({ item }) => {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="new-footer__link"
      >
        {item.label}
      </a>
    )
  }

  return (
    <Link to={item.to} className="new-footer__link">
      {item.label}
    </Link>
  )
}

const NewFooter = () => {
  const [email, setEmail] = useState('')

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=info@mtjfoundation.org&su=Newsletter%20Signup&body=${encodeURIComponent(email)}`
  }

  return (
    <footer className="new-footer">
      <div className="new-footer__container container">
        <div className="new-footer__grid">
          <div className="new-footer__column">
            <h4 className="new-footer__heading">About MTJF</h4>
            <ul className="new-footer__list">
              {aboutLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
            <div className="new-footer__app-block">
              {/* <h4 className="new-footer__heading new-footer__heading--sub">
                Download our Mobile App
              </h4> */}
              <a
                href="https://play.google.com/store/apps/details?id=com.mtj.aqm&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="new-footer__app-link"
                aria-label="Google Play"
              >
                <img src={googlePlayImg} alt="Get it on Google Play" />
              </a>
            </div>
          </div>

          <div className="new-footer__column">
            <h4 className="new-footer__heading">The Basics</h4>
            <ul className="new-footer__list">
              {basicsLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
            <div className="new-footer__badges">
              <div className="new-footer__badge">
                <span className="new-footer__badge-title">SECP Licensed</span>
                <span className="new-footer__badge-text">SECP/LRD/Co42/350/2025</span>
              </div>
              <div className="new-footer__badge">
                <span className="new-footer__badge-title">CUIN</span>
                <span className="new-footer__badge-text">0329787</span>
              </div>
            </div>
          </div>

          <div className="new-footer__column">
            <h4 className="new-footer__heading">Donation Plans</h4>
            <ul className="new-footer__list">
              {donationLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div className="new-footer__column new-footer__column--follow">
            <h4 className="new-footer__heading">Follow Us</h4>
            {/* <p className="new-footer__tagline">Questions? We will reply as soon as possible!</p>

            <a
              href="https://whatsapp.com/channel/0029VaOdgROFi8xkOWfsOl32"
              target="_blank"
              rel="noopener noreferrer"
              className="new-footer__whatsapp-btn"
            >
              <FaWhatsapp aria-hidden />
              <span>Chat with us via WhatsApp</span>
            </a> */}

            <form className="new-footer__email-form" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="new-footer__email-input"
                aria-label="Email address"
              />
              <button type="submit" className="new-footer__email-submit">
                Submit
              </button>
            </form>

            <ul className="new-footer__contact-list">
              <li>
                <FaMapMarkerAlt className="new-footer__contact-icon" aria-hidden />
                <span>
                  MTJ Foundation Secretariat, Makhdum Pur Road, Tulamba, District Khanewal,
                  Pakistan
                </span>
              </li>
              <li>
                <FaPhone className="new-footer__contact-icon" aria-hidden />
                <a href="tel:061111786853" className="new-footer__contact-link">
                  UAN: 061-111-786-853
                </a>
              </li>
              <li>
                <FaPhone className="new-footer__contact-icon" aria-hidden />
                <a href="tel:03032440000" className="new-footer__contact-link">
                  Tel: 0303-2440000
                </a>
              </li>
              <li>
                <FaEnvelope className="new-footer__contact-icon" aria-hidden />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@mtjfoundation.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="new-footer__contact-link"
                >
                  info@mtjfoundation.org
                </a>
              </li>
              <li>
                <FaPhone className="new-footer__contact-icon" aria-hidden />
                <a href="tel:03036660221" className="new-footer__contact-link">
                  Feedback: 0303-6660221
                </a>
              </li>
            </ul>

            <div className="new-footer__social-icons">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="new-footer__social-icon"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>

            <small className="new-footer__legal-note">
              NPOs and associations must comply with Companies Regulations, 2024 (S.R.O. 210(I)/2024)
              Regulations 100(1)(xvii) by including “A Company set up under section 42 of the
              Companies Act, 2017”
            </small>

            {/* <div className="new-footer__logo-wrap">
              <img src={logoImg} alt="MTJ Foundation" className="new-footer__logo" />
            </div> */}
          </div>
        </div>

        <div className="new-footer__locations">
          <Link to="/contact" className="new-footer__locations-heading">
            <h4 className="new-footer__heading">Regional Offices</h4>
          </Link>
          <ul className="new-footer__locations-list">
            {regionalOffices.map((office) => (
              <li key={office.city} className="new-footer__location-item">
                <div className="new-footer__location-city">{office.city}</div>
                <div className="new-footer__location-address">{office.address}</div>
                <div className="new-footer__location-contacts">
                  {office.contacts.map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      className="new-footer__contact-link"
                      {...(contact.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {contact.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="new-footer__copyright">
          <span>© Copyright 2026 MTJ Foundation</span>
        </div>
      </div>
    </footer>
  )
}

export default NewFooter
