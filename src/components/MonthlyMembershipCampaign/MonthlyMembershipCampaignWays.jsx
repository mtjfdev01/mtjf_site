import { FaUniversity, FaCreditCard, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'

const icons = { card: FaCreditCard, whatsapp: FaWhatsapp, phone: FaPhoneAlt, bank: FaUniversity }

const MonthlyMembershipCampaignWays = ({ ways }) => (
  <section className="membership-section membership-ways" aria-labelledby="ways-title">
    <div className="membership-shell">
      <div className="membership-heading">
        <h2 id="ways-title">Easy ways to join</h2>
        <p>Sign up the way that's most convenient for you.</p>
      </div>
      <div className="membership-ways__grid">
        {ways.map((way) => {
          const Icon = icons[way.icon]
          return <article className="membership-way" key={way.title}><span className="membership-way__icon"><Icon /></span><h3>{way.title}</h3><p>{way.detail}</p><a className="membership-way__action" href={way.href}>{way.action}<span aria-hidden="true">&rarr;</span></a></article>
        })}
      </div>
    </div>
  </section>
)

export default MonthlyMembershipCampaignWays
