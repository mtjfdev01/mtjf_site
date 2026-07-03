import { Link } from 'react-router-dom'
import './mobilenavbar.css'

const MobileNavBrand = ({ onNavigationStart }) => (
  <Link
    to="/home"
    className="mobile-nav-brand"
    aria-label="MTJ Foundation home"
    onClick={() => onNavigationStart?.('/home')}
  >
    <span className="mobile-nav-brand__accent" aria-hidden="true" />
    <span className="mobile-nav-brand__text">
      <span className="mobile-nav-brand__name">MTJ Foundation</span>
      {/* <span className="mobile-nav-brand__tagline">Foundation</span> */}
    </span>
  </Link>
)

export default MobileNavBrand
