import {useState} from 'react'
// import {useState, useEffect, useRef} from 'react' // Commented out: useEffect and useRef no longer needed 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.css' 
import Hamburger from '../hamburgermenu/Hamburger'
import Mobilenavbar from '../mobilenavbar/Mobilenavbar'
import logo from '../../assets/img/logos/only_logo.png'
import StickyBar from '../stickybar';



const Navbar = () => {
   const [activeLink, setActiveLink] = useState("Home");
   const location = useLocation();
   const navigate = useNavigate();
   // const observerRef = useRef(null);
   
   // Always use white background for all states
   const [isLightTheme, setIsLightTheme] = useState(false);

   // COMMENTED OUT: Transparency/scroll detection code
   // Check if we're on home page
   // const isHomePage = location.pathname === '/' || location.pathname === '/home';
   // Start transparent on home page, white on other pages
   // const [isLightTheme, setIsLightTheme] = useState(isHomePage);

   // useEffect(() => {
   //   const isHomePage = location.pathname === '/' || location.pathname === '/home';
   //   
   //   // For non-home pages, always use white background (no scroll detection)
   //   if (!isHomePage) {
   //     setIsLightTheme(false);
   //     // Clean up any existing observer
   //     if (observerRef.current) {
   //       observerRef.current.disconnect();
   //       observerRef.current = null;
   //     }
   //     return;
   //   }

   //   // Home page: transparent initially, white on scroll
   //   setIsLightTheme(true); // Start transparent

   //   const setupScrollDetection = () => {
   //     const bannerImg = document.querySelector('.banner_img');
   //     const heroContent = document.querySelector('.hero_content');
   //     
   //     // If elements don't exist yet (lazy loading), retry
   //     if (!bannerImg && !heroContent) {
   //       return false;
   //     }

   //     // Use Intersection Observer to detect when hero/banner scrolls out of view
   //     const observer = new IntersectionObserver(
   //       (entries) => {
   //         // Check if any hero element is still visible
   //         const isVisible = entries.some(entry => entry.isIntersecting);
   //         // Transparent when hero is visible, white when scrolled past
   //         setIsLightTheme(isVisible);
   //       },
   //       {
   //         threshold: 0, // Trigger as soon as element enters/leaves viewport
   //         rootMargin: '-100px 0px' // Account for navbar height
   //       }
   //     );

   //     // Observe both elements
   //     if (bannerImg) observer.observe(bannerImg);
   //     if (heroContent) observer.observe(heroContent);

   //     observerRef.current = observer;
   //     return true;
   //   };

   //   // Retry mechanism for lazy-loaded components
   //   const checkWithRetry = (attempts = 0) => {
   //     requestAnimationFrame(() => {
   //       if (setupScrollDetection() || attempts >= 10) {
   //         // Successfully set up or max attempts reached
   //         return;
   //       }
   //       // Retry if elements not found yet
   //       checkWithRetry(attempts + 1);
   //     });
   //   };

   //   checkWithRetry();

   //   return () => {
   //     if (observerRef.current) {
   //       observerRef.current.disconnect();
   //       observerRef.current = null;
   //     }
   //   };
   // }, [location.pathname]);

  const handleClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleDonateClick = () => {
    const isHomePage = location.pathname === '/' || location.pathname === '/home';
    
    if (!isHomePage) {
      // Navigate to home page
      navigate('/home');
      
      // Wait for navigation and page load, then scroll to donation form
      setTimeout(() => {
        scrollToDonationForm();
      }, 100);
    } else {
      // Already on home page, just scroll to donation form
      scrollToDonationForm();
    }
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
                <img src={logo} alt='logo' />
                </div>
                {/* <div className='logo-heading'><h1>Molana Tariq Jamil <br /> Foundation</h1></div> */}
            </div>
            {/* menu section */}
            {/* <div className='ul-btn'> */}
             <div className='d-none md:d-block' style={{fontSize:'1vw'}}>
              <ul className={`hvr flex gap-24 ${isLightTheme ? 'text-white' : 'text-dark'}`} >
                 {[
                { name: "Home", path: "/home" },
                { name: "About", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Blogs", path: "/blogs " },
                { name: "Registration", path: "/volunteerRegistration " },
                { name: "Careers", path: "/careers" },
                { name: "Contact", path: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={activeLink === item.name ? "active" : ""}
                    onClick={() => handleClick(item.name)}
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
              className='btn' 
              style={{margin:'10px'}}
              onClick={handleDonateClick}
              aria-label="Navigate to donation form"
            >
              Donate Now
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
