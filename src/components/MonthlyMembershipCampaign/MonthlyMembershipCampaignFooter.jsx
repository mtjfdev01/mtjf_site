import './MonthlyMembershipCampaignFooter.css'

const MonthlyMembershipCampaignFooter = () => (
  <footer className="membership-footer">
    <div className="membership-footer__inner">
      <div className="membership-footer__brand">
        <h2>MTJ Foundation</h2>
        <p>[One-line organisation description]</p>
      </div>
      <div className="membership-footer__contact">
        <h3>Get in touch</h3>
        <a href="tel:061111786853">061-111-786-853</a>
        <a href="https://wa.me/923032440000">WhatsApp 0303-2440000</a>
      </div>
      <nav className="membership-footer__nav" aria-label="Footer navigation">
        <h3>Explore</h3>
        <a href="/projects">Programmes</a>
        <a href="/appeals">Campaigns</a>
        <a href="/about">About Us</a>
      </nav>
    </div>
    <div className="membership-footer__bottom">
      <p>&copy; 2026 MTJ Foundation. All rights reserved.</p>
    </div>
  </footer>
)

export default MonthlyMembershipCampaignFooter
