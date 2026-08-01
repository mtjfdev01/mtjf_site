import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap footer-grid">
        <div>
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" style={{ marginBottom: '16px' }}>
            <path d="M20 4L36 16V36H4V16L20 4Z" stroke="#FAF9F4" strokeWidth="2" />
            <path d="M15 36V22H25V36" stroke="#4F7A5C" strokeWidth="2" />
          </svg>
          <p style={{ opacity: 0.78, fontSize: '0.9rem', maxWidth: '280px' }}>
            APNA GHAR — a project of the Molana Tariq Jamil Foundation, building dignified shelter for widows, abandoned women, and orphans across Punjab, Pakistan.
          </p>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#facilities">Facilities / Services</a></li>
            <li><a href="#planning">Budget Overview</a></li>
          </ul>
        </div>
        <div>
          <h5>Services</h5>
          <ul>
            <li>Residential Housing</li>
            <li>KASB Skill Center</li>
            <li>Dairy &amp; Livestock Farm</li>
          </ul>
        </div>
        <div>
          <h5>Customer Care</h5>
          <ul>
            <li>Certifications</li>
            <li>Eligibility Criteria</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h5>Newsletter</h5>
          <ul>
            <li>Stay updated on the Apna Ghar project</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">MOLANA TARIQ JAMIL FOUNDATION — mtjf.com.pk</div>
    </footer>
  );
}