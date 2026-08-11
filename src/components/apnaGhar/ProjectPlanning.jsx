import React, { useState } from 'react';
import { subTabsData, subTabsContentData } from '../../data/projectPlanningData';
import './ProjectPlanning.css';

export default function ProjectPlanning() {
  const [activeTab, setActiveTab] = useState('plan-1');
  const [activeSubTab, setActiveSubTab] = useState('community-map'); // Selected Mosque tab

  const currentSubTabData = subTabsContentData[activeSubTab];

  return (
    <section id="planning">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Apna-Ghar Sketch</span>
          <h2>Building Plan</h2>
          <p className="lede">
            The full 44-Kanal site plan, its funding breakdown, who qualifies to live there, and how the project maps to global development goals.
          </p>
        </div>

        {/* Main Tabs Navigation */}
        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'plan-1' ? 'active' : ''}`}
            onClick={() => setActiveTab('plan-1')}
          >
            Building Plan
          </button>
          <button
            className={`tab-btn ${activeTab === 'plan-2' ? 'active' : ''}`}
            onClick={() => setActiveTab('plan-2')}
          >
            Budget Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'plan-3' ? 'active' : ''}`}
            onClick={() => setActiveTab('plan-3')}
          >
            Eligibility Criteria
          </button>
          <button
            className={`tab-btn ${activeTab === 'plan-4' ? 'active' : ''}`}
            onClick={() => setActiveTab('plan-4')}
          >
            Global Goals
          </button>
        </div>

        {/* Sub Tabs Navigation */}
        {activeTab === 'plan-1' && (
          <div className="sub-tabs-nav">
            {subTabsData.map((subTab) => (
              <button
                key={subTab.id}
                className={`sub-tab-btn ${activeSubTab === subTab.id ? 'active' : ''}`}
                onClick={() => setActiveSubTab(subTab.id)}
              >
                {subTab.label}
                {activeSubTab === subTab.id && (
                  <span className="active-indicator">
                    <span className="dot-node"></span>
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Building Plan Tab Content */}
        {activeTab === 'plan-1' && (
          <div className="tab-panel active">
            {currentSubTabData ? (
              <>
                {/* 1. Community Map Layout Style */}
                {currentSubTabData.type === 'map-card' && (
                  <div className="map-view-container">
                    <div className="map-image-wrapper">
                      <picture>
                        <source media="(max-width: 768px)" srcSet={currentSubTabData.images.mobileImg} />
                        <img
                          src={currentSubTabData.images.desktopImg}
                          alt={currentSubTabData.cardData.title}
                          className="community-map-img"
                        />
                      </picture>
                    </div>

                    <div className="apna-ghar-card">
                      <h3>{currentSubTabData.cardData.title}</h3>
                      <p className="card-description">{currentSubTabData.cardData.description}</p>
                      <div className="info-dotted-list">
                        {currentSubTabData.cardData.metrics.map((item, index) => (
                          <div key={index} className="dotted-item">
                            <span className="label">{item.label}</span>
                            <span className="dots"></span>
                            <span className="val">{item.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Side-By-Side Layout (Home & Mosque Tabs) */}
                {currentSubTabData.type === 'side-by-side' && (
                  <div className="side-by-side-container">
                    {/* Feature Info Card */}
                    <div className="feature-info-card">
                      {/* Top Right Icon Badge (Mobile Only / Dynamic) */}
                      <div className="icon-badge">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 21.7C17.3 17 20 13 20 9a8 8 0 1 0-16 0c0 4 2.7 8 8 12.7z"></path>
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                      </div>

                      <h3>{currentSubTabData.cardData.title}</h3>
                      <p className="feature-desc">{currentSubTabData.cardData.description}</p>

                      <ul className="feature-bullets">
                        {currentSubTabData.cardData.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Side: Floor Plan Image OR Placeholder Text */}
                    <div className="floorplan-image-wrapper">
                      {currentSubTabData.isPlaceholderMap ? (
                        <div className="map-placeholder-box">
                          <h3>{currentSubTabData.placeholderText}</h3>
                        </div>
                      ) : (
                        <picture>
                          <source media="(max-width: 768px)" srcSet={currentSubTabData.images.mobileImg} />
                          <img
                            src={currentSubTabData.images.desktopImg}
                            alt={`${currentSubTabData.cardData.title} Floor Plan`}
                            className="floorplan-img"
                          />
                        </picture>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="sub-tab-placeholder">
                <p>Content for {subTabsData.find((s) => s.id === activeSubTab)?.label} will go here.</p>
              </div>
            )}
          </div>
        )}

        {/* Budget Overview Tab Content */}
        {activeTab === 'plan-2' && (
          <div className="tab-panel active">
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Cost (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Land (44 Kanals)</td>
                    <td>44,000,000</td>
                  </tr>
                  <tr>
                    <td>102 Homes + Solarization</td>
                    <td>173,400,000</td>
                  </tr>
                  <tr>
                    <td>500 KVA Solar Grid</td>
                    <td>50,000,000</td>
                  </tr>
                  <tr>
                    <td>Water Scheme + RO Plant</td>
                    <td>12,526,000</td>
                  </tr>
                  <tr>
                    <td>Mosque + Islamic Institute</td>
                    <td>7,500,000</td>
                  </tr>
                  <tr>
                    <td>KASB Skill Center</td>
                    <td>15,000,000</td>
                  </tr>
                  <tr>
                    <td>Dairy Farm + Shops</td>
                    <td>25,000,000</td>
                  </tr>
                  <tr className="total">
                    <td>TOTAL</td>
                    <td>327,426,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="table-note">Approx. (~USD 1.17 million | GBP 880,000)</p>
          </div>
        )}

        {/* Eligibility Criteria Tab Content */}
        {activeTab === 'plan-3' && (
          <div className="tab-panel active">
            <div className="elig-grid">
              <div className="elig-card">
                <h4>Widows &amp; Divorced Women</h4>
                <p>Without male guardianship, financially vulnerable.</p>
              </div>
              <div className="elig-card">
                <h4>Abandoned Women headed Families</h4>
                <p>Deserted or socially excluded women with dependent children.</p>
              </div>
              <div className="elig-card">
                <h4>Double Orphans</h4>
                <p>Children who have lost both parents.</p>
              </div>
              <div className="elig-card">
                <h4>Zakat Eligible Individuals</h4>
                <p>Minimum 70% of residents will be verified as Zakat eligible.</p>
              </div>
            </div>
          </div>
        )}

        {/* Global Goals Tab Content */}
        {activeTab === 'plan-4' && (
          <div className="tab-panel active">
            <div className="sdg-row">
              <div className="sdg-badge" style={{ background: '#19486A' }}>
                <div className="n">17</div>
                <div className="t">Partnerships for the Goals</div>
              </div>
              <div className="sdg-badge" style={{ background: '#00689D' }}>
                <div className="n">16</div>
                <div className="t">Peace, Justice and Strong Institutions</div>
              </div>
              <div className="sdg-badge" style={{ background: '#C5192D' }}>
                <div className="n">4</div>
                <div className="t">Quality Education</div>
              </div>
              <div className="sdg-badge" style={{ background: '#DD1367' }}>
                <div className="n">10</div>
                <div className="t">Reduced Inequalities</div>
              </div>
              <div className="sdg-badge" style={{ background: '#BF8B2E' }}>
                <div className="n">12</div>
                <div className="t">Responsible Consumption and Production</div>
              </div>
              <div className="sdg-badge" style={{ background: '#FD9D24' }}>
                <div className="n">11</div>
                <div className="t">Sustainable Cities and Communities</div>
              </div>
              <div className="sdg-hub">
                SUSTAINABLE<br />DEVELOPMENT<br />G⊛ALS
              </div>
              <div className="sdg-badge" style={{ background: '#FCC30B' }}>
                <div className="n">7</div>
                <div className="t">Affordable and Clean Energy</div>
              </div>
              <div className="sdg-badge" style={{ background: '#3F7E44' }}>
                <div className="n">13</div>
                <div className="t">Climate Action</div>
              </div>
              <div className="sdg-badge" style={{ background: '#A21942' }}>
                <div className="n">8</div>
                <div className="t">Decent Work and Economic Growth</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}