import { FaShieldAlt, FaSyncAlt, FaLock, FaReceipt } from 'react-icons/fa'
import './AppealsTrustBar.css'

const TRUST_ITEMS = [
  { icon: FaLock, title: '100% Secure', text: 'Your donation is safe with us.' },
  { icon: FaShieldAlt, title: 'Verified Cases', text: 'Every case is reviewed.' },
  { icon: FaSyncAlt, title: 'Regular Updates', text: 'We keep you informed.' },
  { icon: FaReceipt, title: 'Tax Benefit', text: 'Eligible for Zakat & tax relief.' },
]

const AppealsTrustBar = () => (
  <section className="appeals-trust-bar">
    <div className="appeals-trust-bar__inner container">
      {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
        <div key={title} className="appeals-trust-bar__item">
          <span className="appeals-trust-bar__icon">
            <Icon aria-hidden="true" />
          </span>
          <div>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default AppealsTrustBar
