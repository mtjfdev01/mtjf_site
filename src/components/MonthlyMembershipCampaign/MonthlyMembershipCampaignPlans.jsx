import { useState } from 'react'

const MonthlyMembershipCampaignPlans = ({ plans }) => {
  const [selected, setSelected] = useState(0)
  const [billing, setBilling] = useState('monthly')

  return (
    <section className="membership-section membership-plans" id="membership-plans" aria-labelledby="plans-title">
      <div className="membership-shell">
        <div className="membership-plans__heading">
          <div className="membership-heading">
            <h2 id="plans-title">Choose Your Impact Level</h2>
            <p>Pick a monthly amount that's right for you. Every level supports MTJ’s work year-round.</p>
          </div>
          <div className="membership-billing" role="group" aria-label="Choose billing frequency">
            <button className={billing === 'monthly' ? 'is-active' : ''} type="button" onClick={() => setBilling('monthly')}>Monthly</button>
            <button className={billing === 'yearly' ? 'is-active' : ''} type="button" onClick={() => setBilling('yearly')}>Yearly</button>
          </div>
        </div>
        <div className="membership-plans__grid">
          {plans.map((plan, index) => (
            <article className={`membership-plan ${selected === index ? 'is-selected' : ''}`} key={`${plan.amount}-${index}`}>
              <span className="membership-plan__label">{plan.name}</span>
              {index === 0 && <span className="membership-plan__badge">Start here</span>}
              <strong><small>Rs.</small> {billing === 'yearly' && index === 0 ? '30,000' : plan.amount}</strong>
              <span className="membership-plan__month">per month</span>
              <span className="membership-plan__detail">{plan.detail}</span>
              <button className="membership-plan__action" onClick={() => setSelected(index)} type="button" aria-pressed={selected === index}>Become a member</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MonthlyMembershipCampaignPlans
