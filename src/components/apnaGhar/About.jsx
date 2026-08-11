import React from 'react';
import objectives from '../../assets/img/apnaGhar/objectives-apna-ghar.jpeg';
import './About.css';

// Import your image here, or pass an image URL string directly to src
// import aboutImage from './path-to-your-image.jpg'; 

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-photo">
            <img 
              src={objectives}
              alt="APNA GHAR Project Community" 
              loading="lazy"
            />
          </div>
          <div>
            <span className="eyebrow">Objectives</span>
            <h2>APNA GHAR</h2>
            <p style={{ marginTop: '6px', fontWeight: 600, color: 'var(--forest-deep)' }}>
              A Shelter of Dignity for Widows, Abandoned Women &amp; Orphans
            </p>
            <p style={{ color: 'var(--ink-soft)', marginTop: '16px', fontSize: '0.96rem' }}>
              APNA GHAR Project— A first of it's kind integrated community for widows, orphans, and abandoned women-headed families. Built upon over 44 Kanals of donated land, this initiative seeks to establish a secure, dignified, and empowering residential ecosystem with holistic services addressing livelihood, education, faith, clean energy, and water access.
            </p>

            <div className="objective-grid">
              <div className="objective">
                <div className="num">01</div>
                <div>
                  <h3>Shelter With Dignity</h3>
                  <p>To provide shelter with dignity to Zakat-eligible, vulnerable women-headed families and orphans.</p>
                </div>
              </div>
              <div className="objective">
                <div className="num">02</div>
                <div>
                  <h3>Faith-based Professional Skills</h3>
                  <p>To offer a faith-based and professional skills pathway toward independence.</p>
                </div>
              </div>
              <div className="objective">
                <div className="num">03</div>
                <div>
                  <h3>Sustainable Model</h3>
                  <p>To build a sustainable model powered by green energy and community-owned businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}