import React, { useState } from 'react';
import './Facilities.css';

export default function Facilities() {
  const [activeTab, setActiveTab] = useState('fac-1');

  return (
    <section id="facilities">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Features</span>
          <h2>Facilities And Services Offered</h2>
          <p className="lede">Twelve integrated facilities across four categories — browse each tab to explore what's included.</p>
        </div>

        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'fac-1' ? 'active' : ''}`}
            onClick={() => setActiveTab('fac-1')}
          >
            Housing &amp; Faith
          </button>
          <button
            className={`tab-btn ${activeTab === 'fac-2' ? 'active' : ''}`}
            onClick={() => setActiveTab('fac-2')}
          >
            Water &amp; Energy
          </button>
          <button
            className={`tab-btn ${activeTab === 'fac-3' ? 'active' : ''}`}
            onClick={() => setActiveTab('fac-3')}
          >
            Livelihood &amp; Skills
          </button>
          <button
            className={`tab-btn ${activeTab === 'fac-4' ? 'active' : ''}`}
            onClick={() => setActiveTab('fac-4')}
          >
            Education &amp; Care
          </button>
        </div>

        {activeTab === 'fac-1' && (
          <div className="tab-panel active">
            <div className="fac-grid">
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 11l9-7 9 7" />
                  <path d="M5 10v10h14V10" />
                </svg>
                <h4>RESIDENTIAL HOUSING (102 UNITS)</h4>
                <p>Secure, modest homes for long-term use, each with private sanitation, cooking area, ventilation, electricity, solar backup, and water connection.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 21V10l8-6 8 6v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
                <h4>COMMUNITY MOSQUE &amp; ISLAMIC INSTITUTE</h4>
                <p>Capacity of 150+ worshippers, Quranic and Hadith learning for residents and local community, moral, ethical, and spiritual education.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 9h16M9 4v16" />
                </svg>
                <h4>COMMUNITY CENTER</h4>
                <p>Female leadership and decision-making space; hosts parenting workshops, religious classes, events, and psychological counseling sessions.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fac-2' && (
          <div className="tab-panel active">
            <div className="fac-grid">
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="4" y="4" width="16" height="12" rx="1" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
                <h4>CENTRALIZED SOLAR POWER SYSTEM (500 KVA)</h4>
                <p>Budget: PKR 50 Million. Covers lighting, fans, water pumps, mosque, RO plant, and community center — sustainable energy with 24/7 power at minimal cost.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="6" y="3" width="12" height="6" rx="1" />
                  <path d="M9 9v12M15 9v12M5 21h14" />
                </svg>
                <h4>WATER SUPPLY SCHEME (OVERHEAD TANK SYSTEM)</h4>
                <p>RCC overhead tank (40,000 gallons), 24/7 piped water supply to homes, mosque, cattle farm, and green belts, with integrated solar-powered pumping.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2.5s5 5.6 5 10a5 5 0 01-10 0c0-4.4 5-10 5-10z" />
                </svg>
                <h4>SOLARIZED WATER FILTRATION PLANT (RO SYSTEM)</h4>
                <p>6,000 GPD (gallons per day) capacity, providing clean drinking water to 1,000+ people, for both residents and the nearby community.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fac-3' && (
          <div className="tab-panel active">
            <div className="fac-grid">
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 6h16M4 12h10M4 18h13" />
                  <circle cx="19" cy="6" r="1.4" />
                  <circle cx="16" cy="12" r="1.4" />
                  <circle cx="18" cy="18" r="1.4" />
                </svg>
                <h4>KASB SKILL CENTER (VOCATIONAL TRAINING)</h4>
                <p>Skills: stitching, handicrafts, food processing, IT basics, beautician, and more. Dedicated trainers, career counselors, certificate-based programs.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M2 21v-1a6 6 0 0112 0v1" />
                  <path d="M17 5l1.8 1.8L22 3.5" />
                </svg>
                <h4>LIVELIHOOD SUPPORT (FAMILY-LEVEL)</h4>
                <p>Livelihood counseling and plans for every family, small business funding or livestock provision, follow-up mentorship and sales facilitation.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 9l1-5h16l1 5" />
                  <path d="M4 9v10h16V9" />
                  <path d="M9 19v-6h6v6" />
                </svg>
                <h4>COMMERCIAL SHOPS (20 UNITS)</h4>
                <p>Rentable retail units generating sustainable income to support ongoing community operations.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <ellipse cx="12" cy="14" rx="8" ry="5" />
                  <circle cx="8" cy="9" r="2" />
                </svg>
                <h4>DAIRY &amp; LIVESTOCK FARM (200+ ANIMALS)</h4>
                <p>Milk and livestock-based livelihood generation supporting family nutrition and household income.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fac-4' && (
          <div className="tab-panel active">
            <div className="fac-grid">
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M22 10L12 4 2 10l10 6 10-6z" />
                  <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
                </svg>
                <h4>HASNAIN DREAM SCHOOL + CAREER COUNSELING</h4>
                <p>Free dual-curriculum education for resident orphans, plus digital literacy programs and ongoing career guidance.</p>
              </div>
              <div className="fac-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="6" width="18" height="13" rx="2" />
                  <path d="M8 6V4h8v2" />
                  <path d="M3 11h18" />
                </svg>
                <h4>ADDITIONAL SERVICES</h4>
                <p>Digital literacy hub: an IT lab providing community-wide access to computing and connectivity resources.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}