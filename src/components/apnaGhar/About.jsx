import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-photo">
            <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              {/* Neutral Light Background */}
              <rect width="400" height="500" fill="#F3F6F2" />
              
              {/* Top Circle: MTJ Brand Green (#009A44) */}
              <circle cx="200" cy="190" r="66" fill="#009A44" opacity="0.95" />
              
              {/* Left Column: #00A3E0 */}
              <rect x="122" y="258" width="68" height="140" rx="8" fill="#00A3E0" />
              
              {/* Right Column: MTJ Brand Gold (#EAAA00) */}
              <rect x="210" y="278" width="68" height="120" rx="8" fill="#EAAA00" opacity="0.95" />
            </svg>
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