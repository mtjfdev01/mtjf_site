import { FaRegPlayCircle } from 'react-icons/fa'

const MonthlyMembershipCampaignImpact = ({ impact }) => (
  <section className="membership-section membership-impact" aria-labelledby="impact-title">
    <div className="membership-shell">
      <div className="membership-heading membership-heading--row"><div><h2 id="impact-title">Membership changes lives</h2><p>Behind every monthly membership is a family, a patient or a child whose story keeps moving forward.</p></div><a className="membership-impact__watch" href="#membership-stories"><FaRegPlayCircle aria-hidden="true" /> Watch a story of change</a></div>
      <div className="membership-impact__grid">
        {impact.map((item) => <article className="membership-impact__card" key={item.title}><div className="membership-impact__photo">[Story photo]</div><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}
      </div>
    </div>
  </section>
)

export default MonthlyMembershipCampaignImpact
