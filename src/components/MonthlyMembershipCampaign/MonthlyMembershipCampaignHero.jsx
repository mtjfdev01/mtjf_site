import { FaWhatsapp } from 'react-icons/fa'
import heroWeb from '../../assets/img/monthlyMembershipCampaign/monthly_campaign_hero-web.jpg'
import heroMobile from '../../assets/img/monthlyMembershipCampaign/monthly_campaign_hero-mob.jpg'

const MonthlyMembershipCampaignHero = ({ hero }) => (
  <section className="membership-hero" aria-labelledby="membership-title">
    <div className="membership-shell membership-hero__inner">
      <div className="membership-hero__copy">
        <p className="membership-hero__badge">MTJF MEMBERSHIP CAMPAIGN</p>
        <h1 id="membership-title">{hero.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="membership-hero__description">{hero.description}</p>
        <div className="membership-hero__actions">
          <a className="membership-button" href="#membership-plans">{hero.action}</a>
          <a className="membership-button membership-button--outline" href="https://wa.me/923001234567" target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /> Register on WhatsApp</a>
        </div>
        <p className="membership-hero__contact">Prefer to talk? Call <a href="tel:061111786853">061-111-786-853</a></p>
        <div className="membership-hero__mobile-actions">
          <a className="membership-button" href="#membership-plans">Join Our Support Community</a>
          <a className="membership-button membership-button--outline" href="/donate">Donate now</a>
        </div>
      </div>
      <div className="membership-hero__visual">
        <picture className="membership-art membership-art--hero">
          <source media="(max-width: 767px)" srcSet={heroMobile} />
          <img src={heroWeb} alt="MTJ Foundation beneficiary or programme" />
        </picture>
        <div className="membership-member-card"><p>MONTHLY MEMBER</p><strong>Rs. 2500</strong><span>One steady gift, every month</span></div>
      </div>
    </div>
  </section>
)

export default MonthlyMembershipCampaignHero
