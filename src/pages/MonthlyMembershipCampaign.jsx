import MonthlyMembershipCampaignHero from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignHero'
import MonthlyMembershipCampaignPlans from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignPlans'
import MonthlyMembershipCampaignWays from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignWays'
import MonthlyMembershipCampaignImpact from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignImpact'
import MonthlyMembershipCampaignCta from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignCta'
import MonthlyMembershipCampaignFaq from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignFaq'
import MonthlyMembershipCampaignFooter from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignFooter'
import { monthlyMembershipCampaignData } from '../data/monthlyMembershipCampaignData'
import './MonthlyMembershipCampaign.css'

const MonthlyMembershipCampaign = () => {
  const { hero, plans, ways, impact, faqs } = monthlyMembershipCampaignData

  return (
    <main className="membership-page">
      <MonthlyMembershipCampaignHero hero={hero} />
      <MonthlyMembershipCampaignPlans plans={plans} />
      <MonthlyMembershipCampaignWays ways={ways} />
      <MonthlyMembershipCampaignImpact impact={impact} />
      <MonthlyMembershipCampaignCta />
      <MonthlyMembershipCampaignFaq faqs={faqs} />
      <MonthlyMembershipCampaignFooter />
    </main>
  )
}

export default MonthlyMembershipCampaign
