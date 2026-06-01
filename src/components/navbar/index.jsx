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
  // { name: "Appeals", path: "/appeals" },
  // { name: "Blogs", path: "/blogs " },
  { name: "Volunteer", path: "/volunteerRegistration " },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
  // { name: "Ramadan 2026", path: "", submenu:[{name:'Zakat', path:'/projects/ramzan-zakat'},{name:'Zakat Calculator', path:'/zakat-calculator'}, {name:'Fitrana', path:'/fitrana'}, {name:'Laylatul Qadr', path:'/laylat-ul-qadar'}, {name:'Gaza Relief', path:'/gaza'}] },
  // { name: "Media", path: "/media", submenu: [{ name: "Downloads", path: "/media/downloads" }] },
  // { name: "Qurbani 2026 ", path: "/qurbani2026"},
  // { name: "Qurbani 2026 ", path: "", submenu:[{name:'Qurbani', path:'/projects/qurbani'}] },
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
        item.path.trim() === '/projects' &&
        currentPath.startsWith('/projects/');
      const isAppealsDetail =
        item.path.trim() === '/appeals' &&
        currentPath.startsWith('/appeals/');
      return isHome || isExactMatch || isProjectDetail || isAppealsDetail;
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
        <div className='nav-row-1'>
            {/* logo section */}
            <div className='flex items-center logo_section'>
                <div className='logo'>
                  <Link to="/home">
                    <img src={logo} alt='logo' />
                  </Link>
                </div>
            </div>
            {/* menu section - desktop only */}
            <div className='d-none md:d-block' style={{fontSize:'1vw'}}>
              <ul className={`hvr flex gap-24 ${isLightTheme ? 'text-white' : 'text-dark'}`}>
                 {navItems.map((item) => (
                <li key={item.name} className={`nav-item ${item.submenu ? 'nav-item-has-sub' : ''}`}>
                  <Link
                    className={activeLink === item.name ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.name, item.path);
                    }}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <ul className="nav-submenu">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={activeLink === subItem.name ? "active" : ""}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick(subItem.name, subItem.path);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              </ul>
            </div>

            {/* button section - desktop */}
            <div className='nav-btn-group d-none md:d-flex'>
              <button 
                className='btn btn-zakat-nav' 
                onClick={() => navigate('/zakat-calculator')}
                aria-label="Navigate to zakat calculator"
              >
                <span className="btn-donate-content">
                  <span>Give Your Zakat</span>
                </span>
              </button>
              <button 
                className='btn btn--alert btn-donate-animated' 
                onClick={() => navigate('/donate')}
                aria-label="Navigate to donation form"
              >
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
        {/* Row 2 - mobile only buttons */}
        <div className='nav-row-2 md:d-none'>
          <button 
            className='btn btn-zakat-nav nav-row-2__btn' 
            onClick={() => navigate('/zakat-calculator')}
            aria-label="Navigate to zakat calculator"
          >
            Give Your Zakat
          </button>
          <button 
            className='btn btn--alert btn-donate-animated nav-row-2__btn'  
            onClick={() => navigate('/donate')}
            aria-label="Navigate to donation form"
          >
            Donate Now
          </button>
        </div>
      </div>
           <div>
            <Mobilenavbar/>
           </div>
           </>
         
  )
}
export default Navbar
