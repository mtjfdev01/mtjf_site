import {useState, useEffect, useRef} from 'react' 
import { Link, useLocation } from 'react-router-dom';
import './index.css' 
import Hamburger from '../hamburgermenu/Hamburger'
import Mobilenavbar from '../mobilenavbar/Mobilenavbar'
import logo from '../../assets/img/logos/only_logo.png'
import StickyBar from '../stickybar';



const Navbar = () => {
   const [activeLink, setActiveLink] = useState("Home");
   const [isLightTheme, setIsLightTheme] = useState(false);
   const location = useLocation();
   const observerRef = useRef(null);

   useEffect(() => {
     // Check if we're on home page
     const isHomePage = location.pathname === '/' || location.pathname === '/home';
     
     if (!isHomePage) {
       setIsLightTheme(false);
       return;
     }

     // Check if banner_img or hero_content elements are visible
     const checkElementsVisibility = () => {
       const bannerImg = document.querySelector('.banner_img');
       const heroContent = document.querySelector('.hero_content');
       
       if (!bannerImg && !heroContent) {
         setIsLightTheme(false);
         return;
       }

       // Use Intersection Observer to check visibility
       const observer = new IntersectionObserver(
         (entries) => {
           const isVisible = entries.some(entry => entry.isIntersecting);
           setIsLightTheme(isVisible);
         },
         {
           threshold: 0.1, // Trigger when 10% visible
           rootMargin: '-100px 0px' // Account for navbar height
         }
       );

       // Observe both elements
       if (bannerImg) observer.observe(bannerImg);
       if (heroContent) observer.observe(heroContent);

       observerRef.current = observer;

       return () => {
         if (observerRef.current) {
           observerRef.current.disconnect();
         }
       };
     };

     // Small delay to ensure DOM is ready
     const timeoutId = setTimeout(checkElementsVisibility, 100);

     return () => {
       clearTimeout(timeoutId);
       if (observerRef.current) {
         observerRef.current.disconnect();
       }
     };
   }, [location.pathname]);

     const handleClick = (linkName) => {
    setActiveLink(linkName);
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
                { name: "Registration", path: "/registration " },
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
            <button className='btn' style={{margin:'10px'}}>Donate Now</button>
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
