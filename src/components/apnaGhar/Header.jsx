import React from 'react';
import './Header.css';
export default function Header() {
  return (
    <header>
      <div className="nav">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L36 16V36H4V16L20 4Z" stroke="#1F3B2E" strokeWidth="2.2" fill="none" />
            <path d="M15 36V22H25V36" stroke="#AD8A3F" strokeWidth="2.2" />
          </svg>
          <div className="brand-text">
            <div className="name">APNA GHAR</div>
            <div className="sub">Molana Tariq Jamil Foundation</div>
          </div>
        </div>
        <nav className="links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#facilities">Facilities / Services</a>
          <a href="#planning">Budget Overview</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-right">
          <a href="#donate" className="btn btn-primary">Donate Now</a>
        </div>
      </div>
    </header>
  );
}