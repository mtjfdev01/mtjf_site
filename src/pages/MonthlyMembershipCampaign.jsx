import MonthlyMembershipCampaignHero from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignHero'
import MonthlyMembershipCampaignPlans from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignPlans'
import MonthlyMembershipCampaignImpact from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignImpact'
import MonthlyMembershipCampaignCta from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignCta'
import MonthlyMembershipCampaignFaq from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignFaq'
import MonthlyMembershipCampaignFooter from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignFooter'
import { monthlyMembershipCampaignData } from '../data/monthlyMembershipCampaignData'
import './MonthlyMembershipCampaign.css'
import OtherWaysToDonate from '../components/waysToDonate/OtherWaysToDonate'

const MonthlyMembershipCampaign = () => {
  const { hero, plans, impact, faqs } = monthlyMembershipCampaignData

  return (
    <main className="membership-page">
      <MonthlyMembershipCampaignHero hero={hero} />
      <MonthlyMembershipCampaignPlans plans={plans} />
      <OtherWaysToDonate />
      <MonthlyMembershipCampaignImpact impact={impact} />
      <MonthlyMembershipCampaignCta />
      <MonthlyMembershipCampaignFaq faqs={faqs} />
      <MonthlyMembershipCampaignFooter />
    </main>
  )
}

export default MonthlyMembershipCampaign
