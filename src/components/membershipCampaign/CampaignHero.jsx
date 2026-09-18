// import './CampaignHero.css'

const CampaignHero = ({ hero }) => (
  <section className="education-fundraiser__hero" aria-labelledby="education-fundraiser-title">
    <div className="education-fundraiser__hero-copy">
      <p className="education-fundraiser__eyebrow">{hero.eyebrow}</p>
      <h1 id="education-fundraiser-title">{hero.title}</h1>
      <p>{hero.description}</p>
      <a className="education-fundraiser__button" href="#fundraiser-start">{hero.action}</a>
    </div>
  </section>
)

export default CampaignHero
