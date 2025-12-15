import { FaEnvelope, FaPhone, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import './index.css'
import { FaLinkedinIn } from "react-icons/fa";

const StickyBar = () => {
  return (
    <div className="sticky_bar_container">
      <div className="sticky_bar-content container">
        <div className="sticky_bar-contact">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@mtjfoundation.org" target="_blank" rel="noopener noreferrer" className="sticky_bar-link">
            <FaEnvelope />
            <span>info@mtjfoundation.org</span>
          </a>
          <a href="tel:061-111-786-853" className="sticky_bar-link">
            <FaPhone />
            <span> 061-111-786-853 </span>
          </a>
        </div>
        <div className="sticky_bar-social">
          <a href="https://www.instagram.com/mtjfoundation_pakistan/?hl=en" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/foundation.mtj" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://youtube.com/@foundation_mtj?si=NCJMYOSXihYOqMjK" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://pk.linkedin.com/company/mtjf-00" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
          
        </div>
      </div>
    </div>
  )
}

export default StickyBar