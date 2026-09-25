import { useState } from 'react'
import { FaUniversity, FaCreditCard, FaPhoneAlt, FaWhatsapp, FaCopy, FaCheck } from 'react-icons/fa'

const icons = { card: FaCreditCard, whatsapp: FaWhatsapp, phone: FaPhoneAlt, bank: FaUniversity }

const MonthlyMembershipCampaignWays = ({ ways }) => {
  const [copied, setCopied] = useState(false)

  const copyPhoneNumber = async (phoneNumber) => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      console.error('Failed to copy phone number:', error)
    }
  }

  return (
    <section className="membership-section membership-ways" aria-labelledby="ways-title">
      <div className="membership-shell">
        <div className="membership-heading">
          <h2 id="ways-title">EASY WAYS TO JOIN 250k DONOR MOVEMENT</h2>
          <p>Sign up the way that’s most convenient for you</p>
        </div>
        <div className="membership-ways__grid">
          {ways.map((way) => {
            const Icon = icons[way.icon]
            const isPhoneWay = way.icon === 'phone'
            const isWhatsappWay = way.icon === 'whatsapp'
            const copyNumber = isPhoneWay ? '061-111-786-853' : '0303-2440000'

            return (
              <article className="membership-way" key={way.title}>
                <span className="membership-way__icon"><Icon /></span>
                <h3>{way.title}</h3>
                <p>{isPhoneWay ? 'Register over the phone by calling:' : way.detail}</p>
                {(isPhoneWay || isWhatsappWay) && (
                  <button className="membership-way__phone" type="button" onClick={() => copyPhoneNumber(copyNumber)} aria-label={`Copy ${isPhoneWay ? 'helpline' : 'WhatsApp'} number`} title={`Copy ${isPhoneWay ? 'helpline' : 'WhatsApp'} number`}>
                    <span>{copyNumber}</span>
                    {copied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
                    <span className="membership-way__copy-status" aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
                <a className="membership-way__action" href={way.href}>{way.action}<span aria-hidden="true">&rarr;</span></a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MonthlyMembershipCampaignWays
