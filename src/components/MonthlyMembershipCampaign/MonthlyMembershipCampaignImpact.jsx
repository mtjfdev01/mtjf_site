import { FaRegPlayCircle } from 'react-icons/fa'
import sadaqaImage from '../../assets/img/monthlyMembershipCampaign/MTJF-sadaqa.jpg'

const MonthlyMembershipCampaignImpact = ({ impact }) => (
  <section className="membership-section membership-impact" aria-labelledby="impact-title">
    <div className="membership-shell">
      <div className="membership-heading membership-heading--row">
        <div>
          <h2 id="impact-title">Every Membership Writes a New Story.</h2>
          <p>A family fed. A patient treated. A child back in school.</p>
          </div>
          <a className="membership-impact__watch" href="#membership-stories"><FaRegPlayCircle aria-hidden="true" /> Watch a story of change</a>
          </div>
      <div className="membership-impact__grid">
        {impact.map((item, index) => <article className="membership-impact__card" key={`${item.title}-${index}`}>
          <div className="membership-impact__photo">
            <img src={sadaqaImage} alt="MTJF sadaqa impact" />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              </div>
              </article>)}
      </div>
    </div>
  </section>
)

export default MonthlyMembershipCampaignImpact
