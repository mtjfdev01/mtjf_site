import React from 'react';
import { Link } from 'react-router-dom';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <div className="wrap">
      <div className="cta-banner">
        <div>
          <h3>Looking for a dream Shelter?</h3>
          <p>We can help you, We realize your dream of a new Shelter</p>
        </div>
        <Link to="/contact" className="btn btn-white">
          Get Your Shelter &nbsp;&rarr;
        </Link>
      </div>
    </div>
  );
}