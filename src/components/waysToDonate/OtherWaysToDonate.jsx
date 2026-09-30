import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { PiBank } from 'react-icons/pi'
import { BsCreditCard2Front, BsWhatsapp } from 'react-icons/bs'
import { LuPhoneCall } from "react-icons/lu";
import './OtherWaysToDonate.css'

const HELPLINE = '061-111-786-853'
const WHATSAPP_DISPLAY = '+92 303 2440000'
const WHATSAPP_LINK = 'https://wa.me/923032440000'

const MEEZAN_BANK_DATA = {
  bankName: 'Meezan Bank Limited',
  accountTitle: 'MOLANA TARIQ JAMIL FOUNDATION',
  accountNumber: '1271-0116269601',
  iban: 'PK73MEZN0012710116269601',
  branchCode: '1271',
  swiftCode: 'MEZNPKKA',
  branchAddress: 'Tulamba',
}

const WAYS = [
  {
    id: 'join-online',
    title: 'Join Online',
    titleHref: '#membership-plans',
    Icon: BsCreditCard2Front,
    accent: '#eaaa00',
    description: (membershipPlansHref) => (
      <>
        Set up your monthly membership{' '}
        <a href={membershipPlansHref} className="other-ways-link">
          online
        </a>{' '}
        in a few minutes.
      </>
    ),
  },
  {
    id: 'register-whatsapp',
    title: 'Register on WhatsApp',
    titleHref: WHATSAPP_LINK,
    titleTarget: '_blank',
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
    titleHref: `tel:${HELPLINE.replace(/-/g, '')}`,
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
        <button
          type="button"
          className="other-ways-link other-ways-link--btn"
          onClick={(e) => e.preventDefault()}
        >
          bank transfer
        </button>
      </>
    ),
    showBankPopup: true,
  },
]

const OtherWaysToDonate = () => {
  const location = useLocation()
  const isMembershipCampaignPage = location.pathname.replace(/\/$/, '') === '/membership-campaign'
  const membershipPlansHref = isMembershipCampaignPage
    ? '#membership-plans'
    : '/membership-campaign'
  const [copied, setCopied] = useState(false)
  const [copiedItem, setCopiedItem] = useState(null)
  const [isBankPopupOpen, setIsBankPopupOpen] = useState(false)

  const copyHelpline = async () => {
    try {
      await navigator.clipboard.writeText(HELPLINE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const copyToClipboard = async (text, itemId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch {
      // ignore
    }
  }

  const CopyableField = ({ label, value, itemId }) => {
    const isCopied = copiedItem === itemId
    return (
      <p className="copyable-field">
        <strong>{label}</strong>
        <span className="copyable-value">{value}</span>
        <button
          type="button"
          className="copy-btn"
          onClick={() => copyToClipboard(value, itemId)}
          aria-label={`Copy ${label}`}
          title={`Copy ${label}`}
        >
          {isCopied ? (
            <>
              <FaCheck className="copy-icon copied" />
              <span className="copy-text">Copied!</span>
            </>
          ) : (
            <>
              <FaCopy className="copy-icon" />
              <span className="copy-text">Copy</span>
            </>
          )}
        </button>
      </p>
    )
  }

  const openBankPopup = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setIsBankPopupOpen(true)
  }

  const closeBankPopup = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setIsBankPopupOpen(false)
  }

  return (
    <>
      <section className="other-ways-to-donate" aria-labelledby="other-ways-heading">
        <div className="other-ways-to-donate__inner">
          <div className="other-ways-to-donate__header">
            <h2 id="other-ways-heading" className="other-ways-to-donate__title">
              Other Ways to Donate
            </h2>
          </div>

          <div className="other-ways-to-donate__grid">
            {WAYS.map(({ id, title, titleHref, titleTarget, Icon, accent, description, showHelplineCopy, showBankPopup }) => (
              <article
                key={id}
                className={`other-ways-card${showBankPopup ? ' other-ways-card--clickable' : ''}`}
                {...(showBankPopup
                  ? {
                      onClick: openBankPopup,
                      role: 'button',
                      tabIndex: 0,
                      onKeyDown: (e) => {
                        if (e.key === 'Enter' || e.key === ' ') openBankPopup(e)
                      },
                    }
                  : {})}
              >
                <div className="other-ways-card__icon-wrap" aria-hidden="true">
                  <span className="other-ways-card__accent" style={{ backgroundColor: accent }} />
                  <Icon className="other-ways-card__glyph" />
                </div>
                <h3 className="other-ways-card__label">
                  {showBankPopup ? (
                    <button
                      type="button"
                      className="other-ways-card__title-button"
                      onClick={openBankPopup}
                    >
                      {title}
                    </button>
                  ) : (
                    <a
                      href={id === 'join-online' ? membershipPlansHref : titleHref}
                      target={titleTarget}
                      rel={titleTarget === '_blank' ? 'noopener noreferrer' : undefined}
                      className="other-ways-card__title-link"
                    >
                      {title}
                    </a>
                  )}
                </h3>
                <p className="other-ways-card__text">
                  {typeof description === 'function' ? description(membershipPlansHref) : description}
                </p>
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

      {isBankPopupOpen && (
        <div
          className="bank-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bank-popup-title"
          onClick={closeBankPopup}
        >
          <div className="bank-popup" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="bank-popup__close"
              onClick={closeBankPopup}
              aria-label="Close popup"
            >
              <IoClose />
            </button>

            <div id="bank-popup-title" className="bank-popup__header">
              <div className="bank-popup__header-inner">
                <div className="bank-logo bank-popup__bank-logo" aria-hidden="true">
                  <div className="bank-logo-placeholder bank-popup__logo-placeholder">
                    MB
                  </div>
                </div>
                <div>
                  <h3 className="bank-name bank-popup__bank-name">
                    {MEEZAN_BANK_DATA.bankName}
                  </h3>
                  <p className="bank-popup__bank-subtitle">
                    Meezan Bank · Tulamba Branch · General Donation
                  </p>
                </div>
              </div>
            </div>

            <div className="bank-details-box bank-popup__card">
              <div className="bank-info bank-popup__bank-info">
                <p>
                  <strong>Account Title:</strong>{' '}
                  <span>{MEEZAN_BANK_DATA.accountTitle}</span>
                </p>
                <CopyableField
                  label="Account no. (PKR):"
                  value={MEEZAN_BANK_DATA.accountNumber}
                  itemId="meezan-account"
                />
                <CopyableField
                  label="IBAN:"
                  value={MEEZAN_BANK_DATA.iban}
                  itemId="meezan-iban"
                />
                <CopyableField
                  label="Branch Code:"
                  value={MEEZAN_BANK_DATA.branchCode}
                  itemId="meezan-branch"
                />
                <CopyableField
                  label="SWIFT code:"
                  value={MEEZAN_BANK_DATA.swiftCode}
                  itemId="meezan-swift"
                />
                <p>
                  <strong>Branch Address:</strong>{' '}
                  <span>{MEEZAN_BANK_DATA.branchAddress}</span>
                </p>
              </div>
            </div>

            <div className="bank-popup__footer">
              <p className="bank-popup__footer-note">
                After making the transfer, kindly share the receipt with us on{' '}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="other-ways-link"
                >
                  {WHATSAPP_DISPLAY}
                </a>{' '}
                so we can issue your receipt.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OtherWaysToDonate
