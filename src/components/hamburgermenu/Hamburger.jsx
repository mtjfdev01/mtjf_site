import  { useState } from "react";
import "./Hamburger.css";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
     const next = !isOpen;
      setIsOpen(next);

  const ev = new CustomEvent("mobile-menu-toggle", { detail: { isOpen: next } });
      window.dispatchEvent(ev);
  };

  return (
    <div
      className={`hamburger ${isOpen ? "open" : ""}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); } }}
       >
      <span className="bar bar1"></span>
      <span className="bar bar2"></span>
      <span className="bar bar3"></span>
      <span className="bar bar4"></span>
    </div>
  );
};

export default Hamburger;
