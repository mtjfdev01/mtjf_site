import React from 'react';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <div className="wrap">
      <div className="cta-banner">
        <div>
          <h3>Looking for a dream Shelter?</h3>
          <p>We can help you, We realize your dream of a new Shelter</p>
        </div>
        <a href="#contact" className="btn btn-white">
          Get Your Shelter &nbsp;&rarr;
        </a>
      </div>
    </div>
  );
}