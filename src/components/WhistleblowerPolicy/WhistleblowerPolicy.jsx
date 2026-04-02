import './WhistleblowerPolicy.css'

const WHISTLEBLOWER_POLICY_PDF = '/pdfs/policies/Whistleblowing Policy and Procedure.pdf'

const WhistleblowerPolicy = () => {
  return (
    <section className="whistleblower-policy-section" aria-labelledby="whistleblower-policy-heading">
      <div className="container pb-48">
        <div className="whistleblower-policy-inner">
          <h2 className="heading-secondary">Whistleblower Policy</h2>
          <p className="whistleblower-policy-subtitle mt-0">
            Your voice helps us maintain a safe, fair, and transparent workplace.
          </p>
          <div className="whistleblower-policy-body">
            <p>
              If you witness or become aware of any unethical or inappropriate conduct, we encourage you
              to speak up. All reports are taken seriously, kept confidential, and retaliation is strictly
              prohibited.
            </p>
            <p className="whistleblower-policy-report-via">You can report concerns via:</p>
            <p>
              Email:{' '}
              <a href="mailto:hr@mtjfoundation.org" className="whistleblower-policy-link">
                hr@mtjfoundation.org
              </a>
            </p>
            <p className="whistleblower-policy-download-intro">
              Download the full Whistleblower Policy here:
            </p>
            <a
              href={encodeURI(WHISTLEBLOWER_POLICY_PDF)}
              className="whistleblower-policy-download-btn btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhistleblowerPolicy
