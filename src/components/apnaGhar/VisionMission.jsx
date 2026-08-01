import React from 'react';
import './VisionMission.css';

export default function VisionMission() {
  return (
    <section id="vision-mission">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Who We Are</span>
          <h2>Our Vision &amp; Mission</h2>
        </div>
        <div className="vm-grid">
          <div className="vm-card">
            <h3>Our Vision</h3>
            <p>
              To become the leading Islamic financial advisory firm globally, recognized for our commitment to ethical principles, innovative solutions, and sustainable financial growth that aligns with Islamic values and international best practices.
            </p>
            <p>
              We envision a world where Islamic finance serves as a beacon of ethical financial practices, providing accessible, transparent, and socially responsible financial solutions to individuals, businesses, and communities worldwide.
            </p>
          </div>
          <div className="vm-card">
            <h3>Our Mission</h3>
            <p>
              To deliver comprehensive, Shariah-compliant financial advisory services that empower our clients to achieve their financial goals while maintaining the highest standards of ethical conduct and Islamic principles.
            </p>
            <p>
              Through expert guidance, innovative solutions, and unwavering commitment to our values, we strive to build lasting partnerships that contribute to the growth and stability of the Islamic finance industry and the prosperity of our global community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}