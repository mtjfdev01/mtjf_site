import {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcDonate } from 'react-icons/fc'
import './index.css' 
import Hamburger from '../hamburgermenu/Hamburger'
import Mobilenavbar from '../mobilenavbar/Mobilenavbar'
import logo from '../../assets/img/logos/only_logo.png'

// Navigation items mapping
const navItems = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Programs", path: "/projects" },
  // { name: "Blogs", path: "/blogs " },
  { name: "Volunteer", path: "/volunteerRegistration " },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" }
];

const Navbar = () => {
   const [activeLink, setActiveLink] = useState("Home");
   const location = useLocation();
   const navigate = useNavigate();
   // const observerRef = useRef(null);
   
   // Always use white background for all states
   const [isLightTheme, setIsLightTheme] = useState(false);

   // Update active link based on current route
   useEffect(() => {
     const currentPath = location.pathname.trim();
     
     // Check each nav item to see if current path matches
    const matchedItem = navItems.find(item => {
      const itemPath = item.path.trim();
      const isHome =
        (currentPath === '/' || currentPath === '/home') &&
        item.name === 'Home';
      const isExactMatch =
        currentPath === itemPath || currentPath === itemPath + ' ';
      const isProjectDetail =
        item.name === 'Projects' &&
        currentPath.startsWith('/projects/');
      return isHome || isExactMatch || isProjectDetail;
    });
     
     if (matchedItem) {
       setActiveLink(matchedItem.name);
     } else {
       // Default to Home if no match found
       setActiveLink("Home");
     }
   }, [location.pathname]);

  const handleClick = (linkName, path) => {
    // Scroll to top on current page first
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setActiveLink(linkName);
    
    // Wait for scroll to complete, then navigate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navigate(path);
      });
    });
  };

  const scrollToDonationForm = () => {
    // Try multiple selectors to find the donation form
    const donationForm = document.querySelector('.donation-form') || 
                        document.querySelector('.donation-form-card') ||
                        document.querySelector('[class*="donation-form"]');
    
    if (donationForm) {
      donationForm.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Focus on the form for better accessibility
      const firstInput = donationForm.querySelector('input, select, button');
      if (firstInput) {
        setTimeout(() => {
          firstInput.focus();
        }, 500);
      }
    } else {
      // If form not found (lazy loading), retry after a delay
      setTimeout(() => {
        scrollToDonationForm();
      }, 300);
    }
  };
  return (
    <>
    <div className={`nav-container rounded fixed ${isLightTheme ? 'nav-light-theme' : 'nav-dark-theme'}`}>
        <div className='flex justify-between  items-center'>
            {/* logo section */}
            <div className='flex items-center logo_section '>
                <div className='logo'>
                  <Link to="/home">
                <img src={logo} alt='logo' />
                </Link>
                </div>
                {/* <div className='logo-heading'><h1>Molana Tariq Jamil <br /> Foundation</h1></div> */}
            </div>
            {/* menu section */}
            {/* <div className='ul-btn'> */}
             <div className='d-none md:d-block' style={{fontSize:'1vw'}}>
              <ul className={`hvr flex gap-24 ${isLightTheme ? 'text-white' : 'text-dark'}`} >
                 {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    // to={item.path}
                    className={activeLink === item.name ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.name, item.path);
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
                </ul>
             </div>

            {/* button section */}
             <div>
            <button 
              className='btn btn--alert btn-donate-animated' 
              onClick={() => navigate('/donate')}
              aria-label="Navigate to donation form"
            >
              {/* Animated background particles */}
              {/* <span className="particle particle-1"></span>
              <span className="particle particle-2"></span> */}
              <span className="particle particle-3"></span>
              <span className="particle particle-4"></span>
              
              {/* Glowing border */}
              <span className="glow-border"></span>
              
              {/* Button content */}
              <span className="btn-donate-content">
                <FcDonate className="btn-donate-icon" size={20} />
                <span>Donate Now</span>
              </span>
            </button>
            </div>
            <div className='md:d-none'>
             <Hamburger/>
            </div>
           </div>
          </div>
           <div>
            <Mobilenavbar/>
           </div>
           </>
         
  )
}
export default Navbar
