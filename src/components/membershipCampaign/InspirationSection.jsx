import inspirationCardImage from '../../assets/img/fundraising/inspired-card1.jpg'
import inspirationCardIcon from '../../assets/img/fundraising/inspired-card-botm.svg'


const InspirationSection = ({ inspiration }) => (
  <section className="education-fundraiser__inspiration" id="the-team" aria-labelledby="inspiration-title">
    <p className="education-fundraiser__eyebrow">{inspiration.eyebrow}</p><h2 id="inspiration-title">{inspiration.title}</h2><p className="education-fundraiser__inspiration-summary">{inspiration.summary}</p>
    <div className="education-fundraiser__stories">{inspiration.stories.map((story, index) => <article className={`education-fundraiser__story education-fundraiser__story--${index + 1}`} key={story.name}><img src={inspirationCardImage} alt="Fundraising supporter" className="education-fundraiser__story-image" /><div><p>{story.name}</p><img src={inspirationCardIcon} alt="" aria-hidden="true" className="education-fundraiser__story-icon" /></div></article>)}</div>
    <div className="education-fundraiser__inspiration-actions"><h3>{inspiration.actionTitle}</h3><a className="education-fundraiser__button education-fundraiser__button--green" href="#fundraiser-start">{inspiration.action}</a><a className="education-fundraiser__inspiration-link" href="#fundraiser-start">{inspiration.secondaryAction}</a></div>
  </section>
)

export default InspirationSection
