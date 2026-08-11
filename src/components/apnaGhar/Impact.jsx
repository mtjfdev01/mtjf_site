import React, { useState } from 'react';
import './Impact.css';

export default function Impact() {
  const [activeTab, setActiveTab] = useState('imp-1');

  return (
    <section id="impact">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">SDG Impact Mapping</span>
          <h2>Impact, Governance &amp; Compliance</h2>
          <p className="lede">Impact mapped through direct contributions (core activities) and indirect contributions (systemic ripple effects), measured against UN SDG indicators.</p>
        </div>

        <div className="tabs-nav">
          <button className={`tab-btn ${activeTab === 'imp-1' ? 'active' : ''}`} onClick={() => setActiveTab('imp-1')}>
            SDG Impact Matrix
          </button>
          <button className={`tab-btn ${activeTab === 'imp-2' ? 'active' : ''}`} onClick={() => setActiveTab('imp-2')}>
            SDG Synergies
          </button>
          <button className={`tab-btn ${activeTab === 'imp-3' ? 'active' : ''}`} onClick={() => setActiveTab('imp-3')}>
            Logical Framework
          </button>
          <button className={`tab-btn ${activeTab === 'imp-4' ? 'active' : ''}`} onClick={() => setActiveTab('imp-4')}>
            Sustainability &amp; Monitoring
          </button>
          <button className={`tab-btn ${activeTab === 'imp-5' ? 'active' : ''}`} onClick={() => setActiveTab('imp-5')}>
            Certification
          </button>
        </div>

        {activeTab === 'imp-1' && (
          <div className="tab-panel active">
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th>SDG</th>
                    <th>Project Component</th>
                    <th>Direct Contribution</th>
                    <th>Indirect Contribution</th>
                    <th>Alignment Metrics</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="sdg-num">1</span>No Poverty</td>
                    <td><ul className="tight"><li>102 Homes</li><li>20 Shops</li><li>Dairy Farm</li></ul></td>
                    <td>Safe housing for asset-less families; rental income from shops; livestock ownership transfers wealth.</td>
                    <td>Graduation model breaks intergenerational poverty; micro-enterprises stimulate local economy.</td>
                    <td>80% families achieve &ge; PKR 20,000/month income in 3 years.</td>
                  </tr>
                  <tr>
                    <td><span className="sdg-num">2</span>Zero Hunger</td>
                    <td><ul className="tight"><li>Dairy Farm</li><li>Green Belts</li></ul></td>
                    <td>Milk/cheese production for 600+ residents; medicinal gardens provide nutrient-rich crops.</td>
                    <td>Surplus dairy sold locally; training in organic farming for neighboring communities.</td>
                    <td>100% food self-sufficiency for residents; 30% surplus sales.</td>
                  </tr>
                  <tr>
                    <td><span className="sdg-num">3</span>Good Health</td>
                    <td><ul className="tight"><li>RO Plant</li><li>Healthcare</li></ul></td>
                    <td>Elimination of waterborne diseases; prenatal/maternal care for women.</td>
                    <td>Community health camps: WASH training reduces regional disease burden.</td>
                    <td>70% reduction in diarrhea cases; 95% antenatal coverage.</td>
                  </tr>
                  <tr>
                    <td><span className="sdg-num">4</span>Quality Education</td>
                    <td><ul className="tight"><li>Dream School</li><li>KASB Center</li></ul></td>
                    <td>Free dual-curriculum education for orphans; digital literacy programs.</td>
                    <td>Scholarships for external students; vocational certification recognized nationally.</td>
                    <td>100% resident children in school; 150+ certifications/year.</td>
                  </tr>
                  <tr>
                    <td><span className="sdg-num">5</span>Gender Equality</td>
                    <td><ul className="tight"><li>Women-Led Shops</li><li>Skill Center</li></ul></td>
                    <td>100% female entrepreneurship; gender-sensitive counseling services.</td>
                    <td>Challenging patriarchal norms; economic independence reduces GBV vulnerability.</td>
                    <td>70+ women-owned businesses; 90% financial autonomy rate.</td>
                  </tr>
                  <tr>
                    <td><span className="sdg-num">6</span>Clean Water</td>
                    <td><ul className="tight"><li>Solar Water Scheme</li><li>RO Plant</li></ul></td>
                    <td>24/7 potable water for 1,100+ users; Islamic WASH (Taharah) compliance.</td>
                    <td>Filtration access for 500 external families/day.</td>
                    <td>40,000 gallons/day capacity; zero water-quality complaints.</td>
                  </tr>
                  <tr>
                    <td><span className="sdg-num">7</span>Clean Energy</td>
                    <td><ul className="tight"><li>500 KVA Solar Grid</li></ul></td>
                    <td>Carbon-neutral operations; near-zero energy costs for vulnerable families.</td>
                    <td>Surplus energy sold to grid; model for renewable adoption in rural Pakistan.</td>
                    <td>90% energy cost reduction/year.</td>
                  </tr>
                  <tr>
                    <td><span className="sdg-num">16</span>Peace &amp; Justice</td>
                    <td><ul className="tight"><li>Islamic Institute</li><li>Counseling</li></ul></td>
                    <td>Spiritual conflict resolution; legal aid for women's inheritance rights.</td>
                    <td>Partnerships with local police for GBV response; SDG-focused Friday sermons.</td>
                    <td>100% residents access legal aid; 20+ community mediation cases/year.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'imp-2' && (
          <div className="tab-panel active">
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th>Synergy Cluster</th>
                    <th>Components Involved</th>
                    <th>Impact Amplification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Women's Nexus (SDGs 1,5,8)</td><td>KASB Center + Shops + Dream School</td><td>Economic autonomy &rarr; Education &rarr; Reduced GBV &rarr; Poverty exit (87% projected success rate).</td></tr>
                  <tr><td>Water-Energy-Food (SDGs 2,6,7)</td><td>Solar Grid + RO Plant + Dairy Farm</td><td>Clean energy powers water/food systems &rarr; Healthier livestock &rarr; Higher incomes &rarr; SDG 1.</td></tr>
                  <tr><td>Faith &amp; Ecology (SDGs 11,13,16)</td><td>Mosque + Green Belts + Waste Mgmt</td><td>Quranic environmental stewardship &rarr; Community-led conservation &rarr; Social cohesion.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'imp-3' && (
          <div className="tab-panel active">
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th>Objective</th>
                    <th>Indicator</th>
                    <th>Verification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Impact: Reduce poverty</td><td>80% families self-sufficient in 5 yrs</td><td>Income surveys</td></tr>
                  <tr><td>Outcome: Skill development</td><td>150 women trained/year per skill</td><td>KASB graduation records</td></tr>
                  <tr><td>Output: Water access</td><td>1,100+ daily users</td><td>Filtration plant logs</td></tr>
                  <tr><td>Activity: Build solar grid</td><td>500 KVA operational by 2026</td><td>Energy production reports</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'imp-4' && (
          <div className="tab-panel active">
            <p className="eyebrow" style={{ display: 'block', marginBottom: '14px' }}>Sustainability Mechanism</p>
            <div className="sustain-grid">
              <div className="sustain-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                <h4>Revenue Streams</h4><p>Dairy sales, shop rentals, vocational products.</p>
              </div>
              <div className="sustain-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="4" width="16" height="12" rx="1" /><path d="M8 20h8M12 16v4" /></svg>
                <h4>Solar ROI</h4><p>Energy savings fund community welfare.</p>
              </div>
              <div className="sustain-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M2 21v-1a6 6 0 0112 0v1" /><path d="M15 21v-.6a4.6 4.6 0 018.8-1.8" /></svg>
                <h4>Graduation Model</h4><p>Families exit after 10-15 years; new beneficiaries rotate in.</p>
              </div>
            </div>

            <p className="eyebrow" style={{ display: 'block', marginBottom: '14px' }}>Monitoring Framework</p>
            <div className="monitor-grid">
              <div className="monitor-item"><h4>Data Sources</h4><p>IoT sensors (water/energy usage), biometric attendance (school/skill center), sales ledgers (shops/dairy).</p></div>
              <div className="monitor-item"><h4>Evaluation</h4><p>Annual SDG scorecard by UNDP Pakistan; third-party impact audits.</p></div>
              <div className="monitor-item"><h4>Beneficiary Feedback</h4><p>Digital grievance portal + community Shura councils.</p></div>
            </div>

            <div className="quote-box">
              <p className="q">&ldquo;The most beloved deed to Allah is to make a Muslim happy, remove his hardship, or settle his debt.&rdquo;</p>
              <div className="attr">&mdash; Prophet Muhammad ﷺ (Al-Adab Al-Mufrad)</div>
              <div className="foot">APNA GHAR embodies this hadith by converging faith, justice, and sustainability to advance 12/17 SDGs.</div>
            </div>
          </div>
        )}

        {activeTab === 'imp-5' && (
          <div className="tab-panel active">
            <div className="cert-wrap">
              <div>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  Alhamd Shariah Advisory Services (Pvt.) Limited serves as the official Shariah Advisor to the Molana Tariq Jamil Foundation, providing continuous guidance on Shariah compliance of Zakat funds under a Wakalah-based model.
                </p>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  Under APNA GHAR, MTJF serves purely as a community service — ownership of houses remains with MTJF and is not transferred to beneficiaries — structured to fulfil essential living requirements in a sustainable, Shariah-compliant manner.
                </p>
              </div>
              <div className="cert-doc">
                <div className="cert-head">
                  <span className="name">ALHAMD SHARIAH ADVISORY SERVICES (PVT) LIMITED</span>
                  <span className="date">18 July, 2025</span>
                </div>
                <div className="cert-no">Certificate No: ASA/053/003</div>
                <h5>Shariah Approval for Paying Zakat to<br />APNA GHAR Project<br />By Molana Tariq Jamil Foundation</h5>
                <p>This is to certify that Alhamd Shariah Advisory Services (Pvt.) Ltd. serves as the official Shariah Advisor to the Molana Tariq Jamil Foundation (MTJF). We provide continuous guidance to MTJF on all matters related to Shariah compliance of Zakat funds.</p>
                <p>The Foundation has adopted a Wakalah-based Zakat model, under which eligible individuals are appointed MTJF as Wakeel to receive and utilize Zakat funds for their needs.</p>
                <p>We confirm that the project complies with the principles of Shariah, and it is permissible to utilize Zakat funds for this initiative. All Zakat funds will be spent strictly in accordance with Shariah guidelines.</p>
                <div className="cert-sign">
                  <div><strong>Mufti Ubaid Ur Rehman Zubairi</strong>Director</div>
                  <div><strong>Mufti Abdul Rafey</strong>Senior Shariah Scholar</div>
                </div>
                <div className="cert-valid">Note: This Certificate is valid till June 30, 2026.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}