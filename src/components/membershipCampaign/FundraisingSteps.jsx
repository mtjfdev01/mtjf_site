import step1Illustration from '../../assets/img/fundraising/step1.svg'
import step2Illustration from '../../assets/img/fundraising/step2.svg'
import step3Illustration from '../../assets/img/fundraising/step3.svg'
// import './FundraisingSteps.css'

const Placeholder = ({ label, className = '' }) => (
  <div className={`education-fundraiser__placeholder ${className}`} aria-label={`${label} image placeholder`}><span>{label}</span></div>
)

const FundraisingSteps = ({ steps }) => (
  <section className="education-fundraiser__steps" id="the-fundraiser" aria-labelledby="steps-title">
    <h2 id="steps-title" className="education-fundraiser__sr-only">How to start a fundraiser</h2>
    {steps.map((step, index) => {
      const isStepOne = step.number === 'STEP 1'
      const isStepTwo = step.number === 'STEP 2'
      const isStepThree = step.number === 'STEP 3'

      return (
        <article className={`education-fundraiser__step education-fundraiser__step--${step.tone} ${isStepOne ? 'education-fundraiser__step--first' : ''}`} key={step.number}>
          {isStepOne ? <>
            <div className="education-fundraiser__step-top"><h2>Starting an education fundraiser is easy.</h2></div>
            <div className="education-fundraiser__step-inner education-fundraiser__step-inner--first">
              <div className="education-fundraiser__step-copy education-fundraiser__step-copy--first"><span className="education-fundraiser__step-number">{step.number}</span><hr className="education-fundraiser__step-divider" /><h2>{step.title}</h2><p>{step.description}</p></div>
              <img src={step1Illustration} alt="Fundraiser setup illustration" className="education-fundraiser__step-illustration education-fundraiser__step-illustration--first" />
            </div>
          </> : isStepTwo ? <div className="education-fundraiser__step-inner education-fundraiser__step-inner--second">
            <img src={step2Illustration} alt="People sharing an education fundraiser" className="education-fundraiser__step-illustration education-fundraiser__step-illustration--second" />
            <div className="education-fundraiser__step-copy education-fundraiser__step-copy--second"><span className="education-fundraiser__step-number">{step.number}</span><hr className="education-fundraiser__step-divider" /><h2>{step.title}</h2><p>{step.description}</p></div>
          </div> : isStepThree ? <div className="education-fundraiser__step-inner education-fundraiser__step-inner--third">
            <div className="education-fundraiser__step-copy education-fundraiser__step-copy--third"><span className="education-fundraiser__step-number">{step.number}</span><hr className="education-fundraiser__step-divider" /><h2>{step.title}</h2><p>{step.description}</p></div>
            <img src={step3Illustration} alt="Notebook showing how education makes dreams a reality" className="education-fundraiser__step-illustration education-fundraiser__step-illustration--third" />
          </div> : <div className={`education-fundraiser__step-inner ${index % 2 ? 'education-fundraiser__step-inner--reverse' : ''}`}><Placeholder label={step.imageLabel} className="education-fundraiser__step-image" /><div className="education-fundraiser__step-copy"><span className="education-fundraiser__step-number">{step.number}</span><h2>{step.title}</h2><p>{step.description}</p></div></div>}
        </article>
      )
    })}
  </section>
)

export default FundraisingSteps
