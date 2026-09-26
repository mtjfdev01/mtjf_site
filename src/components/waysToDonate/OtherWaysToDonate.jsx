import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { PiBank } from 'react-icons/pi'
import { BsCreditCard2Front, BsWhatsapp, BsTelephone } from 'react-icons/bs'
import { LuPhoneCall } from "react-icons/lu";
import './OtherWaysToDonate.css'

const HELPLINE = '061-111-786-853'
const WHATSAPP_DISPLAY = '+92 303 2440000'
const WHATSAPP_LINK = 'https://wa.me/923032440000'

const WAYS = [
  {
    id: 'join-online',
    title: 'Join Online',
    Icon: BsCreditCard2Front,
    accent: '#eaaa00',
    description: (
      <>
        Set up your monthly membership{' '}
        <Link to="/membership-campaign" className="other-ways-link">
          online
        </Link>{' '}
        in a few minutes.
      </>
    ),
  },
  {
    id: 'register-whatsapp',
    title: 'Register on WhatsApp',
    Icon: BsWhatsapp,
    accent: '#00a3e0',
    description: (
      <>
        Send your name, address & mobile number to{' '}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="other-ways-link"
        >
          {WHATSAPP_DISPLAY}
        </a>
      </>
    ),
  },
  {
    id: 'call-helpline',
    title: 'Call our Helpline',
    Icon: LuPhoneCall,
    accent: '#e4002b',
    description: (
      <>
        Register over the phone by calling:
      </>
    ),
    showHelplineCopy: true,
  },
  {
    id: 'bank-transfer',
    title: 'Bank transfer',
    Icon: PiBank,
    accent: '#009a44',
    description: (
      <>
        Make your monthly contribution directly through{' '}
        <Link to="/ways-to-donate" state={{ mainTab: 'bank-transfer' }} className="other-ways-link">
          bank transfer
        </Link>
      </>
    ),
  },
]

const OtherWaysToDonate = () => {
  const [copied, setCopied] = useState(false)

  const copyHelpline = async () => {
    try {
      await navigator.clipboard.writeText(HELPLINE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <section className="other-ways-to-donate" aria-labelledby="other-ways-heading">
      <div className="other-ways-to-donate__inner">
        <div className="other-ways-to-donate__header">
          <h2 id="other-ways-heading" className="other-ways-to-donate__title">
            Other Ways to Donate
          </h2>
        </div>

        <div className="other-ways-to-donate__grid">
          {WAYS.map(({ id, title, Icon, accent, description, showHelplineCopy }) => (
            <article key={id} className="other-ways-card">
              <div className="other-ways-card__icon-wrap" aria-hidden="true">
                <span className="other-ways-card__accent" style={{ backgroundColor: accent }} />
                <Icon className="other-ways-card__glyph" />
              </div>
              <h3 className="other-ways-card__label">{title}</h3>
              <p className="other-ways-card__text">{description}</p>
              {showHelplineCopy && (
                <div className="other-ways-card__copy-row">
                  <a href={`tel:${HELPLINE.replace(/-/g, '')}`} className="other-ways-link">
                    {HELPLINE}
                  </a>
                  <button
                    type="button"
                    className="other-ways-copy-btn"
                    onClick={copyHelpline}
                    aria-label="Copy helpline number"
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OtherWaysToDonate
