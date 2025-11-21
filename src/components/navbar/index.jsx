import {useState} from 'react' 
import { Link } from 'react-router-dom';
import './index.css' 
import Hamburger from '../hamburgermenu/Hamburger'
import Mobilenavbar from '../mobilenavbar/Mobilenavbar'
import logo from '../../assets/img/logos/only_logo.png'



const Navbar = () => {
   const [activeLink, setActiveLink] = useState("Home");
     const handleClick = (linkName) => {
    setActiveLink(linkName);
  };
  return (
    <>
    <div className='nav-container  rounded  fixed'>
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
              <ul className='hvr flex  gap-24 text-white' >
                 {[
                { name: "Home", path: "/home" },
                { name: "About", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Publications", path: "/publications " },
                { name: "Involved ", path: "/getInvolved " },
                { name: "Resources ", path: "/donorResources " },
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
