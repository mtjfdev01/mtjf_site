import { useState } from 'react'
import { FaCopy, FaCheck } from 'react-icons/fa'
import './WaysToDonateSection.css'
import meezanBankLogo from '../../assets/img/ways_to_donate/meezan-bank.webp'

const WaysToDonateSection = () => {
  const [activeMainTab, setActiveMainTab] = useState('online-banking')
  const [activeSubTab, setActiveSubTab] = useState('debit-credit')
  const [activeCategory, setActiveCategory] = useState('general-donation')
  const [copiedItem, setCopiedItem] = useState(null)

  const copyToClipboard = async (text, itemId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const CopyableField = ({ label, value, itemId }) => {
    const isCopied = copiedItem === itemId
    return (
      <p className="copyable-field">
        <strong>{label}</strong>
        <span className="copyable-value">{value}</span>
        <button
          className="copy-btn"
          onClick={() => copyToClipboard(value, itemId)}
          aria-label={`Copy ${label}`}
          title={`Copy ${label}`}
        >
          {isCopied ? <FaCheck className="copy-icon copied" /> : <FaCopy className="copy-icon" />}
        </button>
      </p>
    )
  }

  const mainTabs = [
    { id: 'online-banking', label: 'Online Banking' },
    { id: 'bank-transfer', label: 'Bank Transfer' },
    { id: 'home-collection', label: 'Home Collection' },
    { id: 'international-accounts', label: 'International Accounts' }
  ]

  const onlineBankingSubTabs = [
    { id: 'debit-credit', label: 'Pay by Debit/Credit Card' },
    { id: 'jazzcash', label: 'JazzCash' },
    { id: 'easypaisa', label: 'EasyPaisa' }
  ]

  const internationalSubTabs = [
    { id: 'usd', label: 'USD Accounts' },
    { id: 'gbp', label: 'GBP Account' },
    { id: 'euro', label: 'Euro Accounts' }
  ]

  const donationCategories = [
    'General Donation',
    'Zakat',
    'Tameer E Watan',
    'Orphan Care',
    'Disaster Management',
    'Health',
    'Education',
    'Community Services',
    'Bano Qabil',
    'WASH',
    'Donate to Palestine',
    'Alkhidmat Islamic Microfinance'
  ]

  const handleMainTabChange = (tabId) => {
    setActiveMainTab(tabId)
    // Reset sub-tabs based on main tab
    if (tabId === 'online-banking') {
      setActiveSubTab('debit-credit')
    } else if (tabId === 'international-accounts') {
      setActiveSubTab('usd')
    }
  }

  const renderContent = () => {
    switch (activeMainTab) {
      case 'online-banking':
        return (
          <div className="ways-to-donate-content">
            <div className="sub-tabs-container">
              {onlineBankingSubTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sub-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="content-box">
              <div className="content-box-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.72-2.83-.01-1.54-.85-2.48-2.65-3.01z" fill="currentColor"/>
                </svg>
              </div>
              <div className="content-box-text">
                <p>
                  You can make donations to MTJ Foundation using your debit or credit card from any corner of the globe, at any time using our website. It's a convenient and secure way to support from wherever you are.{' '}
                  <a href="/donate" className="donate-link">Donate Now mtjfoundation.org/donate</a>
                </p>
              </div>
            </div>
          </div>
        )

      case 'bank-transfer':
        return (
          <div className="ways-to-donate-content">
            <div className="categories-container">
              {donationCategories.map((category, index) => (
                <button
                  key={index}
                  className={`category-btn ${activeCategory === category.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.toLowerCase().replace(/\s+/g, '-'))}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="bank-details-box">
              <div className="bank-logo">
                <div className="bank-logo-placeholder">BOP</div>
              </div>
              <div className="bank-details">
                <h3 className="bank-name">Bank of Punjab (Taqwa Islamic Banking)</h3>
                <div className="bank-info">
                  <p><strong>Account Title:</strong> MTJ Foundation Pakistan</p>
                  <CopyableField label="Account no. (PKR):" value="5310067845100016" itemId="bop-account" />
                  <CopyableField label="IBAN:" value="PK19BPUN5310067845100016" itemId="bop-iban" />
                  <p><strong>Branch:</strong> Allama Iqbal Town, Lahore</p>
                  <p><strong>SWIFT code:</strong> BPUNPKKA</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'home-collection':
        return (
          <div className="ways-to-donate-content">
            <div className="content-box">
              <div className="content-box-text">
                <h3>Home Collection Service</h3>
                <p>
                  Our team can visit your location to collect your donation. Please contact us to schedule a home collection.
                </p>
                <p>
                  <strong>Contact:</strong> +923000776016
                </p>
              </div>
            </div>
          </div>
        )

      case 'international-accounts':
        return (
          <div className="ways-to-donate-content">
            <div className="sub-tabs-container">
              {internationalSubTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sub-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="international-accounts-grid">
              <div className="account-column">
                <div className="account-section">
                  <h4 className="account-category">General Donation</h4>
                  <div className="account-details">
                    <div className="account-bank">
                      <div className="account-bank-logo">MB</div>
                      <span className="account-bank-name">Makramah Bank Limited</span>
                    </div>
                    <p><strong>Account Title:</strong> MTJ Foundation Pakistan</p>
                    <CopyableField label="Account no. (USD):" value="1994426252333135802" itemId="makramah-general-account" />
                    <CopyableField label="IBAN:" value="PK32SUMB9944293330135802" itemId="makramah-general-iban" />
                    <p><strong>Branch:</strong> Allama Iqbal Town Kashmir Block, Lahore</p>
                    <p><strong>SWIFT code:</strong> SUMBPKKA</p>
                  </div>
                </div>
                <div className="account-section">
                  <h4 className="account-category">Orphan/Aghosh (ZAKAT)</h4>
                  <div className="account-details">
                    <div className="account-bank">
                      <img src={meezanBankLogo} alt="Meezan Bank" className="account-bank-logo meezan" />
                      <span className="account-bank-name">Meezan Bank</span>
                    </div>
                    <p><strong>Account Title:</strong> MTJ Foundation Pakistan</p>
                    <CopyableField label="Account no. (USD):" value="0100643642" itemId="meezan-orphan-zakat-account" />
                    <CopyableField label="IBAN:" value="PK40MEZN0002010100643642" itemId="meezan-orphan-zakat-iban" />
                    <p><strong>Branch:</strong> R1 Johar Town, Lahore</p>
                    <p><strong>SWIFT code:</strong> MEZNPKKA</p>
                  </div>
                </div>
              </div>
              <div className="account-column">
                <div className="account-section">
                  <h4 className="account-category">Zakat</h4>
                  <div className="account-details">
                    <div className="account-bank">
                      <img src={meezanBankLogo} alt="Meezan Bank" className="account-bank-logo meezan" />
                      <span className="account-bank-name">Meezan Bank</span>
                    </div>
                    <p><strong>Account Title:</strong> MTJ Foundation Pakistan</p>
                    <CopyableField label="Account no. (USD):" value="0100643642" itemId="meezan-zakat-account" />
                    <CopyableField label="IBAN:" value="PK40MEZN0002010100643642" itemId="meezan-zakat-iban" />
                    <p><strong>Branch:</strong> R1 Johar Town, Lahore</p>
                    <p><strong>SWIFT code:</strong> MEZNPKKA</p>
                  </div>
                </div>
                <div className="account-section">
                  <h4 className="account-category">Orphan/Aghosh (Donation)</h4>
                  <div className="account-details">
                    <div className="account-bank">
                      <div className="account-bank-logo">MB</div>
                      <span className="account-bank-name">Makramah Bank Limited</span>
                    </div>
                    <p><strong>Account Title:</strong> MTJ Foundation Pakistan</p>
                    <CopyableField label="Account no. (USD):" value="1994426252333135802" itemId="makramah-orphan-account" />
                    <CopyableField label="IBAN:" value="PK32SUMB9944293330135802" itemId="makramah-orphan-iban" />
                    <p><strong>Branch:</strong> Allama Iqbal Town Kashmir Block, Lahore</p>
                    <p><strong>SWIFT code:</strong> SUMBPKKA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="ways-to-donate-section">
      <div className="container">
        <h1 className="ways-to-donate-title">
          Ways To <span className="title-highlight">Donate</span>
        </h1>
        
        <div className="whatsapp-notice">
          <p>
            To get donation receipt please share your transaction slip to our following WhatsApp number:{' '}
            <a href="https://wa.me/923000776016" className="whatsapp-link">+923000776016</a>
          </p>
        </div>

        <div className="main-tabs-container">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              className={`main-tab ${activeMainTab === tab.id ? 'active' : ''}`}
              onClick={() => handleMainTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="content-wrapper">
          {renderContent()}
        </div>
      </div>
    </section>
  )
}

export default WaysToDonateSection

