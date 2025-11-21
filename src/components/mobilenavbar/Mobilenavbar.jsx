import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './mobilenavbar.css'

const links = [
                { name: "Home", path: "/home" },
                { name: "About", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Publications", path: "/publications " },
                { name: "Involved ", path: "/getInvolved " },
                { name: "Donor ", path: "/donorResources " },
                { name: "Careers", path: "/careers" },
                { name: "Contact", path: "/contact" }
];


const Mobilenavbar = () => {
     const [visible, setVisible] = useState(false);
     const [activeLink, setActiveLink] = useState("Home");

     const handleClick = (linkName) => {
     setActiveLink(linkName);
     const burger = document.querySelector(".hamburger.open");
    if (burger) burger.click();
   };
  useEffect(() => {
    // handler for custom event dispatched by Hamburger
    const onToggle = (e) => {
      if (e && e.detail && typeof e.detail.isOpen === "boolean") {
        setVisible(e.detail.isOpen);
      }
    };

    // listen for the event on window
    window.addEventListener("mobile-menu-toggle", onToggle);

    // cleanup
    return () => {
      window.removeEventListener("mobile-menu-toggle", onToggle);
    };
  }, []);

  // If you prefer not to render the DOM at all when hidden, return null
  if (!visible) return null;

  return (
    <div className='mbl lg:d-none md:d-block sm:d-block'>
       <ul className='text-white'>
        {links.map((item) => (
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
  )
}

export default Mobilenavbar