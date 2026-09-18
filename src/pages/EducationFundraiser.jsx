import { Link } from 'react-router-dom'
import logo from '../assets/img/logos/only_logo.png'
import step1Illustration from '../assets/img/fundraising/step1.svg'
import Footer from '../components/footer/Footer'
import { educationFundraiserData } from '../data/educationFundraiserData'
import './EducationFundraiser.css'

const Placeholder = ({ label, className = '' }) => (
  <div className={`education-fundraiser__placeholder ${className}`} aria-label={`${label} image placeholder`}>
    <span>{label}</span>
  </div>
)

const EducationFundraiser = () => {
  const { navItems, hero, steps, inspiration, cta, lists } = educationFundraiserData

  return (
    <main className="education-fundraiser">
      <section className="education-fundraiser__hero" aria-labelledby="education-fundraiser-title">
        <div className="education-fundraiser__hero-copy">
          <p className="education-fundraiser__eyebrow">{hero.eyebrow}</p>
          <h1 id="education-fundraiser-title">{hero.title}</h1>
          <p>{hero.description}</p>
          <a className="education-fundraiser__button" href="#fundraiser-start">{hero.action}</a>
        </div>
      </section>

      <section className="education-fundraiser__steps" id="the-fundraiser" aria-labelledby="steps-title">
        <h2 id="steps-title" className="education-fundraiser__sr-only">How to start a fundraiser</h2>
        {steps.map((step, index) => {
          const isStepOne = step.number === 'STEP 1'

          return (
            <article
              className={`education-fundraiser__step education-fundraiser__step--${step.tone} ${isStepOne ? 'education-fundraiser__step--first' : ''}`}
              key={step.number}
            >
              {isStepOne ? (
                <>
                  <div className="education-fundraiser__step-top">
                    <h2>Starting an education fundraiser is easy.</h2>
                  </div>
                  <hr className="education-fundraiser__step-divider" />
                  <div className={`education-fundraiser__step-inner ${index % 2 ? 'education-fundraiser__step-inner--reverse' : ''} ${isStepOne ? 'education-fundraiser__step-inner--first' : ''}`}>
                    <div className="education-fundraiser__step-copy education-fundraiser__step-copy--first">
                      <span className="education-fundraiser__step-number">{step.number}</span>
                      <h2>{step.title}</h2>
                      <p>{step.description}</p>
                    </div>
                    <img src={step1Illustration} alt="Fundraiser setup illustration" className="education-fundraiser__step-illustration education-fundraiser__step-illustration--first" />
                  </div>
                </>
              ) : (
                <div className={`education-fundraiser__step-inner ${index % 2 ? 'education-fundraiser__step-inner--reverse' : ''}`}>
                  <Placeholder label={step.imageLabel} className="education-fundraiser__step-image" />
                  <div className="education-fundraiser__step-copy">
                    <span className="education-fundraiser__step-number">{step.number}</span>
                    <h2>{step.title}</h2>
                    <p>{step.description}</p>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </section>

      <section className="education-fundraiser__inspiration" id="the-team" aria-labelledby="inspiration-title">
        <p className="education-fundraiser__eyebrow">{inspiration.eyebrow}</p>
        <h2 id="inspiration-title">{inspiration.title}</h2>
        <div className="education-fundraiser__stories">
          {inspiration.stories.map((story, index) => (
            <article className={`education-fundraiser__story education-fundraiser__story--${index + 1}`} key={story.name}>
              <Placeholder label={`Supporter story ${index + 1}`} />
              <div>
                <strong>{story.name}</strong>
                <span>{story.label}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="education-fundraiser__inspiration-actions">
          <p>Ready to turn inspiration into impact?</p>
          <a className="education-fundraiser__button education-fundraiser__button--green" href="#fundraiser-start">Start your fundraiser</a>
        </div>
      </section>

      <section className="education-fundraiser__cta" id="fundraiser-start" aria-labelledby="cta-title">
        <p className="education-fundraiser__eyebrow">{cta.title}</p>
        <p>{cta.description}</p>
        <a className="education-fundraiser__button education-fundraiser__button--light" href="/volunteerRegistration">{cta.action}</a>
      </section>

      <section className="education-fundraiser__lists" id="faq" aria-label="Fundraising resources">
        <div>
          <h2>Top fundraisers</h2>
          <ul>{lists.fundraisers.map((item) => <li key={item}><a href="#fundraiser-start">{item}</a></li>)}</ul>
        </div>
        <div>
          <h2>Our teams</h2>
          <ul>{lists.teams.map((item) => <li key={item}><a href="#the-team">{item}</a></li>)}</ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default EducationFundraiser
