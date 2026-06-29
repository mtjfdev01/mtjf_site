import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <section className="privacy-policy">
      <div className="container">

        <div className="privacy-policy__header">
          <h1>Privacy Policy</h1>
          <p>
            MTJ Foundation ("the Foundation," "we," "us," or "our")
            is committed to protecting the privacy of individuals
            who interact with our organization in Pakistan.
            This Privacy Policy outlines how we collect, use,
            disclose, and safeguard personal information in
            accordance with applicable laws in Pakistan.
          </p>
        </div>

        <div className="privacy-policy__section">
          <h2>1. Collection of Personal Information</h2>

          <p>
            We collect personal information from individuals through
            various means, including but not limited to:
          </p>

          <ul>
            <li>
              <strong>• Donations:</strong> Name, contact details,
              and financial information for processing contributions.
            </li>

            <li>
              <strong>• Volunteering & Events:</strong> Information
              provided when signing up for events or volunteer activities.
            </li>

            <li>
              <strong>• Website & Online Interactions:</strong>
              Information automatically collected through cookies,
              IP addresses, and browsing behavior.
            </li>

            <li>
              <strong>• Direct Correspondence:</strong> Any information
              voluntarily shared through forms, surveys, or direct
              communication with us.
            </li>
          </ul>
        </div>

        <div className="privacy-policy__section">
          <h2>2. Use of Personal Information</h2>

          <p>
            The personal information collected is used for the
            following purposes:
          </p>

          <ul>
            <li><strong>• Donation Processing:</strong> To process contributions and issue receipts.</li>
            <li><strong>• Communication & Engagement:</strong> To respond to inquiries, share updates, and inform supporters about our projects.</li>
            <li><strong>• Program & Event Management:</strong> To organize events, volunteer activities, and community programs.</li>
            <li><strong>• Compliance & Legal Obligations:</strong> To fulfill regulatory and legal requirements in Pakistan.</li>
          </ul>
        </div>

        <div className="privacy-policy__section">
          <h2>3. Disclosure of Personal Information</h2>

          <p>
            We may share personal information under the following
            circumstances:
          </p>

          <ul>
            <li><strong>• With Third-Party Service Providers</strong> for operational support.</li>
            <li><strong>• As Required by Law</strong> To comply with legal obligations.</li>
            <li><strong>• With Individual Consent</strong> When permission is explicitly granted.</li>
          </ul>

          <p>
            We do not sell or trade personal information to third parties.
          </p>
        </div>

        <div className="privacy-policy__section">
          <h2>4. Protection of Personal Information</h2>

          <p>
            We implement strict security measures to protect personal
            data from unauthorized access, misuse, or disclosure.
          </p>

          <ul>
            <li>• Secure storage of sensitive data.</li>
            <li>• Restricted access to authorized personnel only.</li>
            <li>• Regular updates to our data protection protocols.</li>
          </ul>
        </div>

        <div className="privacy-policy__section">
          <h2>5. Retention of Personal Information</h2>

          <p>
            We retain personal information only for as long as
            necessary to fulfill the purposes for which it was
            collected or as required by Pakistani law. After this
            period, data is securely disposed of.
          </p>
        </div>

        <div className="privacy-policy__section">
          <h2>6. Consent & Rights of Individuals</h2>

          <p>
            By interacting with MTJ Foundation and providing personal
            information, individuals consent to its collection,
            use, and disclosure as outlined in this Privacy Policy.
          </p>

          <p>Individuals have the right to:</p>

          <ul>
            <li><strong>• Access</strong> their personal information.</li>
            <li><strong>• Request corrections</strong> to their data.</li>
            <li><strong>• Withdraw consent</strong> where applicable.</li>
          </ul>

          <p>
            Requests can be made by contacting us using the details below.
          </p>
        </div>

        <div className="privacy-policy__section privacy-policy__contact">
          <h2>7. Contact Us</h2>

          <p><strong>📍 MTJ Foundation</strong></p>

          <p>
            Address: Makhdoom Pur Road, Tulamba,
            District Khanewal, Pakistan
          </p>

          <p>
           📍  Phone: 061 111 786 853 | 0303-2440000
          </p>

          <p>
           📍  Email: info@mtjfoundation.org
          </p>

          <p>
           📍 Feedback: 0303-6660221
          </p>
        </div>

        <div className="privacy-policy__section">
          <h2>8. Changes to this Privacy Policy</h2>

          <p>
            MTJ Foundation reserves the right to update or modify
            this Privacy Policy at any time. Changes will take
            effect immediately upon being posted on our website.
          </p>
        </div>

      </div>
    </section>
  );
};

export default PrivacyPolicy;