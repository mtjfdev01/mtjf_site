import MonthlyMembershipCampaignHero from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignHero'
import MembershipPlanCards from '../components/MonthlyMembershipCampaign/MembershipPlanCards'
import MonthlyMembershipCampaignImpact from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignImpact'
import MonthlyMembershipCampaignCta from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignCta'
import MonthlyMembershipCampaignFaq from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignFaq'
import MonthlyMembershipCampaignFooter from '../components/MonthlyMembershipCampaign/MonthlyMembershipCampaignFooter'
import { monthlyMembershipCampaignData } from '../data/monthlyMembershipCampaignData'
import { monthlyMembershipCampaign } from "../utils/variables";
import ProjectsTestimonial from "../components/projectsTestimonial/ProjectsTestimonial";
import './MonthlyMembershipCampaign.css'
import OtherWaysToDonate from '../components/waysToDonate/OtherWaysToDonate'

const MonthlyMembershipCampaign = () => {
  const { hero, plans, impact, faqs } = monthlyMembershipCampaignData

  return (
    <main className="membership-page">
      <MonthlyMembershipCampaignHero hero={hero} />
      <MembershipPlanCards plans={plans} />
      <OtherWaysToDonate />
      {/* <MonthlyMembershipCampaignImpact impact={impact} /> */}
        <ProjectsTestimonial
                    videos={monthlyMembershipCampaign.videos}
                    title={monthlyMembershipCampaign.title}
                    subtitle={monthlyMembershipCampaign.subtitle}
                  />
      <MonthlyMembershipCampaignCta />
      <MonthlyMembershipCampaignFaq faqs={faqs} />
      <MonthlyMembershipCampaignFooter />
    </main>
  )
}

export default MonthlyMembershipCampaign
