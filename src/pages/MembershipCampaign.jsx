import Footer from '../components/footer/Footer'
import HomeInfoSection from '../components/homeInfoSection/HomeInfoSection'
import CampaignHero from '../components/membershipCampaign/CampaignHero'
import FundraisingSteps from '../components/membershipCampaign/FundraisingSteps'
import InspirationSection from '../components/membershipCampaign/InspirationSection'
import FundraisingResources from '../components/membershipCampaign/FundraisingResources'
import { membershipCampaignData } from '../data/membershipCampaignData'
import './MembershipCampaign.css'

const MembershipCampaign = () => {
  const { hero, steps, inspiration, lists } = membershipCampaignData

  return (
    <main className="education-fundraiser">
      <CampaignHero hero={hero} />
      <FundraisingSteps steps={steps} />
      <InspirationSection inspiration={inspiration} />
      <FundraisingResources lists={lists} />

      <HomeInfoSection />

      <Footer />
    </main>
  )
}

export default MembershipCampaign
