import { Link } from 'react-router-dom'
import './Footer.css'
import logoImg from '../../assets/img/logos/logo_blue_text.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-grid grid grid-12 gap-24">
          {/* Leftmost Column - Logo and Contact Information */}
          <div className="footer-column footer-contact col-12 md-6 lg-3">
            <div className="footer-logo-wrapper flex flex-col items-start gap-12">
              <img src={logoImg} alt="MTJ Foundation Logo" className="footer-logo" />
            </div>
            
            <div className="footer-section flex flex-col gap-12">
              <h4 className="footer-heading h4">Contact Us:</h4>
              <h5 className="footer-subheading h5">Head Office:</h5>
              <ul className="footer-contact-list flex flex-col gap-12">
                <li>
                  <a href="https://maps.google.com" className="footer-link">
                    Makhdoom Pur Road, Tulamba, District Khanewal.
                  </a>
                </li>
                <li>
                  <a href="tel:061111786853" className="footer-link">
                    061 111 786 853
                  </a>
                </li>
                <li>
                  <a href="tel:03032440000" className="footer-link">
                    0303-2440000
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

          {/* Second Column - Products/Locations */}
          <div className="footer-column footer-products col-12 md-6 lg-3">
            <h4 className="footer-heading h4">Products</h4>
            <ul className="footer-list flex flex-col gap-12">
              <li className="footer-location-item">
                <div className="footer-location-address">
                  Shahrah-e-Faisal Office # 503, 5th Floor, Al Tijarah Centre.
                </div>
                <div className="footer-location-contacts">
                  <a href="tel:021111786853" className="footer-link">021-111-786-853</a>
                  <a href="tel:03002001575" className="footer-link">0300-2001575</a>
                </div>
                <div className="footer-location-city">Multan</div>
              </li>
              
              <li className="footer-location-item">
                <div className="footer-location-address">
                  House #89 Block C, Model Town Multan
                </div>
                <div className="footer-location-contacts">
                  <a href="tel:061111786853" className="footer-link">061-111-786-853</a>
                  <a href="tel:03004422543" className="footer-link">0300-4422543</a>
                </div>
                <div className="footer-location-city">Lahore</div>
              </li>
              
              <li className="footer-location-item">
                <div className="footer-location-address">
                  Office # 59-B, Faisal Town, Opposite Moon Market.
                </div>
                <div className="footer-location-contacts">
                  <a href="tel:03004425557" className="footer-link">0300-4425557</a>
                </div>
                <div className="footer-location-city">Faisalabad</div>
              </li>
              
              <li className="footer-location-item">
                <div className="footer-location-contacts">
                  <a href="tel:041111786853" className="footer-link">041-111-786-853</a>
                  <a href="tel:03004463903" className="footer-link">0300-4463903</a>
                </div>
                <div className="footer-location-city">Jamia al Hasanain, Green Town</div>
              </li>
            </ul>
          </div>

          {/* Third Column - Quick Links */}
          <div className="footer-column footer-quick-links col-12 md-6 lg-3">
            <h4 className="footer-heading h4">Quick Link</h4>
            <ul className="footer-list flex flex-col gap-12">
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/projects" className="footer-link">Our Programs</Link>
              </li>
              <li>
                <Link to="/get-involved" className="footer-link">Donate</Link>
              </li>
              <li>
                <Link to="/get-involved" className="footer-link">Volunteer</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Rightmost Column - Blogs */}
          <div className="footer-column footer-blogs col-12 md-6 lg-3">
            <h4 className="footer-heading h4">Blogs</h4>
            <ul className="footer-list flex flex-col gap-12">
              <li>
                <Link to="/donor-resources" className="footer-link">Zakat</Link>
              </li>
              <li>
                <Link to="/publications" className="footer-link">Newsletters</Link>
              </li>
              <li>
                <Link to="/careers" className="footer-link">Careers</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

