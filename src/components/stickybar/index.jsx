import { FaEnvelope, FaPhone, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import './index.css'

const StickyBar = () => {
  return (
    <div className="sticky_bar_container">
      <div className="sticky_bar-content container">
        <div className="sticky_bar-contact">
          <a href="mailto:info@mtjfoundation.org" className="sticky_bar-link">
            <FaEnvelope />
            <span>info@mtjfoundation.org</span>
          </a>
          <a href="tel:+13108001170" className="sticky_bar-link">
            <FaPhone />
            <span> +1 (310) 800-1170</span>
          </a>
        </div>
        <div className="sticky_bar-social">
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  )
}

export default StickyBar