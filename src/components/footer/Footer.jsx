import { Link } from 'react-router-dom'
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './Footer.css'
import logoImg from '../../assets/img/logos/footer_logo.png'
import googlePlayImg from '../../assets/img/app-stores/play_store.webp'
// import appStoreImg from '../../assets/img/app-stores/app-store.png'

const Footer = () => {
  return (
    <>
    {/* <Newsletter />
    <DonationCta /> */}
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-grid grid grid-12 gap-24">
          {/* Leftmost Column - Logo and Contact Information */}
          <div className="footer-column footer-contact col-12 md-6 lg-3">
            <div className="footer-logo-wrapper flex flex-col items-start gap-12">
              <img src={logoImg} alt="MTJ Foundation Logo" className="footer-logo" />
            </div>
            
            <div className="footer-section flex flex-col gap-12">
              <h4 className="footer-heading h4">Contact Us</h4>
              <h5 className="footer-subheading h5">Head Office</h5>
              <ul className="footer-contact-list flex flex-col gap-12">
                <li>
                  <a href="https://maps.google.com" className="footer-link">
                    Makhdoom Pur Road, Tulamba, District Khanewal
                  </a>
                </li>
                <li>
                  <a href="tel:061111786853" className="footer-link">
                    061-111-786-853
                  </a>
                </li>
                <li>
                  <a href="tel:03032440000" className="footer-link">
                    +92 303 2440000
                  </a>
                </li>
                <li>
                  <a href="mailto:info@mtjfoundation.org" className="footer-link">
                    info@mtjfoundation.org
                  </a>
                </li>
                <li>
                  <span className="footer-label">Feedback:</span>{' '}
                  <a href="tel:03036660221" className="footer-link">
                    0303-6660221
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Combined Section - Locations, Quick Links, and Blogs */}
          <div className="footer-column footer-combined-section col-12 md-6 lg-9">
            {/* First Row - Locations */}
            <div className="footer-row footer-locations-row">
              <Link to="/contact" className="footer-link">
                <h4 className="footer-heading h4">Regional Offices</h4>
              </Link>
              <ul className="footer-list flex flex-col gap-12">
                <li className="footer-location-item">
                <div className="footer-location-city">Karachi</div>
                  <div className="footer-location-address">
                    Office No. 1, 190-1/A, Khayyam Chambers Nursery Market, Block 2, P.E.C.H.S, Main Shahrah-e-Faisal, Karachi
                  </div>
                  <div className="footer-location-contacts">
                    <a href="tel:021111786853" className="footer-link">021-111-786-853</a>
                    <a href="tel:03002001575" className="footer-link">0300-2001575</a>
                  </div>
                </li>
                
                <li className="footer-location-item">
                  <div className="footer-location-city">Multan</div>
                  <div className="footer-location-address">
                    House #89, Block C, Model Town Phase-2, Multan
                  </div>
                  <div className="footer-location-contacts">
                    <a href="tel:061111786853" className="footer-link">061-111-786-853</a>
                    <a href="tel:03032440000" className="footer-link">0303-2440000</a>
                  </div>
                </li>
                
                <li className="footer-location-item">
                  <div className="footer-location-city">Faisalabad</div>
                  <div className="footer-location-address">
                    Jamia Al Hasnain, Green Town, Faisalabad
                  </div>
                  <div className="footer-location-contacts">
                    <a href="tel:041111786853" className="footer-link">041-111-786-853</a>
                    <a href="tel:03004463903" className="footer-link">0300-4463903</a>
                  </div>  
                </li>
                
                <li className="footer-location-item">
                  <div className="footer-location-city">Lahore</div>
                  <div className="footer-location-address">
                    Office #59-B, Faisal Town, Opposite Moon Market, Lahore
                  </div>
                  <div className="footer-location-contacts">
                    <a href="tel:042111786853" className="footer-link">042-111-786-853</a>
                    <a href="tel:03004425557" className="footer-link">0300-4425557</a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Second Row - Quick Links and Blogs */}
            <div className="footer-row footer-links-row grid gap-24">
              {/* Third Column - Quick Links */}
              <div className="footer-column footer-quick-links">
                <h4 className="footer-heading h4">Quick Links</h4>
                <ul className="footer-list flex flex-col gap-12">
                <li>
                    <Link to="/home" className="footer-link">Home</Link>
                  </li>
                  <li>
                    <Link to="/about" className="footer-link">About Us</Link>
                  </li>
                  <li>
                    <Link to="/projects" className="footer-link">Our Programs</Link>
                  </li>
                  <li>
                    <Link to="/volunteerRegistration" className="footer-link">Volunteer</Link>
                  </li>
                  <li>
                    <Link to="/careers" className="footer-link">Careers</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="footer-link">Contact Us</Link>
                  </li>
                </ul>
              </div>

              {/* Rightmost Column - Blogs */}
              <div className="footer-column footer-blogs">
                {/* <h4 className="footer-heading h4">Blogs</h4> */}
                <ul className="footer-list flex flex-col gap-12">
                  <li>
                    <Link to="/blogs" className="footer-link">Blogs</Link>
                  </li>
                  <li>
                    <Link to="/volunteerRegistration" className="footer-link">Registration</Link>
                  </li>
                  {/* <li>
                    <Link to="/contact" className="footer-link">Contact Us</Link>
                  </li> */}
                </ul>
              </div>

              {/* Third Column - Social Media */}
              <div className="footer-column footer-social-media">
                <h4 className="footer-heading h4">Follow Us</h4>
                <div className="footer-social-icons">
                  <a
                    href="https://whatsapp.com/channel/0029VaOdgROFi8xkOWfsOl32"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon footer-social-whatsapp"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://www.facebook.com/foundation.mtj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon footer-social-facebook"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://x.com/foundationmtj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon footer-social-twitter"
                    aria-label="Twitter"
                  >
                    <FaXTwitter />
                  </a>
                  <a
                    href="https://www.instagram.com/mtjfoundation_pakistan/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon footer-social-instagram"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://pk.linkedin.com/company/mtjf-00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon footer-social-linkedin"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://youtube.com/@foundation_mtj?si=2NdH5biwwMFf8Ayv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon footer-social-youtube"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                </div>
                <div className="footer-app-stores">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.mtj.aqm&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-app-link footer-app-google"
                    aria-label="Google Play"
                  >
                    <img src={googlePlayImg} alt="Get it on Google Play" />
                  </a>
                  {/* <a
                    href="#"
                    className="footer-app-link footer-app-apple"
                    aria-label="App Store"
                  >
                    <img src={appStoreImg} alt="Download on the App Store" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
