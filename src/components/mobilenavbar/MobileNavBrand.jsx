import { Link } from 'react-router-dom'
import './mobilenavbar.css'

const MobileNavBrand = () => (
  <Link to="/home" className="mobile-nav-brand" aria-label="Molana Tariq Jamil Foundation home">
    {/* <span className="mobile-nav-brand__accent" aria-hidden="true" /> */}
    <span className="mobile-nav-brand__text">
      <span className="mobile-nav-brand__name">Molana Tariq Jamil Foundation</span>
      {/* <span className="mobile-nav-brand__tagline">Foundation</span> */}
    </span>
  </Link>
)

export default MobileNavBrand
