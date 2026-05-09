import { useState, useEffect } from 'react'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { BiSolidDonateHeart } from 'react-icons/bi'
import { FcDonate } from "react-icons/fc";
import { useNavigate, useLocation } from 'react-router-dom'
import './WaysToDonateSection.css'
import meezanBankLogo from '../../assets/img/ways_to_donate/meezan-bank.webp'
import mcbLogo from '../../assets/img/ways_to_donate/mcb.jpeg'
import aitmadLogo from '../../assets/img/ways_to_donate/aitmad.png'
import mobilinkLogo from '../../assets/img/ways_to_donate/mobilink_bank.jpg'
import faysalLogo from '../../assets/img/ways_to_donate/faysal_bank.png'
import bopLogo from '../../assets/img/ways_to_donate/bop.png'
import alBarakaLogo from '../../assets/img/ways_to_donate/al_baraka.png'
import bankIslamiLogo from '../../assets/img/ways_to_donate/bank_islami.png'
import uBankLogo from '../../assets/img/ways_to_donate/u_bank.png'
import hblLogo from '../../assets/img/ways_to_donate/hbl.png'
import telenorLogo from '../../assets/img/ways_to_donate/telenor.webp'
import easypaisaImage from '../../assets/img/ways_to_donate/easypesa.webp'
import alflah from '../../assets/img/ways_to_donate/alflah.jpg'

const WaysToDonateSection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeMainTab, setActiveMainTab] = useState('online-banking')
  const [activeSubTab, setActiveSubTab] = useState('debit-credit')
  const [activeCategory, setActiveCategory] = useState('general-donation')
  const [copiedItem, setCopiedItem] = useState(null)
  const [activeSubTabLabel, setActiveSubTabLabel] = useState('Debit/Credit Card')
  const [selectedBankId, setSelectedBankId] = useState(null)

  // When navigated here with a specific bankId in location state,
  // switch to bank-transfer tab and filter to that card
  useEffect(() => {
    if (location.state?.bankId) {
      setActiveMainTab('bank-transfer')
      setSelectedBankId(location.state.bankId)
      // Clear location state so back-navigation doesn't re-trigger
      window.history.replaceState({}, '')
    }
  }, [location.state])

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

  const mainTabs = [
    { id: 'online-banking', label: 'Online Banking' },
    { id: 'bank-transfer', label: 'Bank Transfer' },
    { id: 'home-collection', label: 'Home Collection' },
    // { id: 'international-accounts', label: 'International Accounts' }
  ]

  const onlineBankingSubTabs = [
    { id: 'debit-credit', label: 'Debit/Credit Card' },
    // { id: 'jazzcash', label: 'JazzCash' },
    { id: 'easypaisa', label: 'EasyPaisa' }
  ]

  const internationalSubTabs = [
    { id: 'usd', label: 'USD Accounts' },
    { id: 'gbp', label: 'GBP Account' },
    { id: 'euro', label: 'Euro Accounts' }
  ]

  const donationCategories = [
    { id: 'general-donation', label: 'General Donation' },
    // { id: 'zakat', label: 'Zakat' },
    // { id: 'sadaqah', label: 'Sadaqah' },
    // { id: 'tameer-e-watan', label: 'Tameer E Watan' },
    { id: 'orphan-care', label: 'Orphan Care' },
    { id: 'disaster-management', label: 'Disaster Management' },
    { id: 'health', label: 'Health' },
    { id: 'education', label: 'Education' },
    { id: 'community-services', label: 'Community Services' },
    // { id: 'bano-qabil', label: 'Bano Qabil' },
    { id: 'wash', label: 'WASH' },
    { id: 'donate-to-palestine', label: 'Donate to Palestine' },
  ]

  // Banks data array with categories
  const banksData = [
    {
      id: 'meezan-1',
      bankName: 'Meezan Bank Limited',
      accountNumber: '12710104410786',
      iban: 'PK02MEZN0012710104410786',
      category: 'general-donation',
      logo: meezanBankLogo,
      branch: 'Lahore',
      swiftCode: 'MEZNPKKA'
    },
    {
      id: 'meezan-2',
      bankName: 'Meezan Bank Limited',
      accountNumber: '12710105404686',
      iban: 'PK43MEZN0012710105404686',
      category: 'general-donation',
      logo: meezanBankLogo,
      branch: 'Lahore',
      swiftCode: 'MEZNPKKA'
    },
    {
      id: 'meezan-3',
      bankName: 'Meezan Bank Limited',
      accountNumber: '04070105756121',
      iban: 'PK56MEZN0004070105756121',
      category: 'zakat',
      logo: meezanBankLogo,
      branch: 'Lahore',
      swiftCode: 'MEZNPKKA'
    },
    {
      id: 'meezan-4',
      bankName: 'Bank Alfalah Limited',
      accountNumber: '5774-5002836731',
      iban: 'PK14ALFH5774005002836731',
      category: 'zakat',
      logo: alflah,
      branch: 'Lahore',
      swiftCode: 'MEZNPKKA'
    },
    {
      id: 'mcb-islamic',
      bankName: 'MCB Islamic',
      accountNumber: '2061004025950001',
      iban: 'PK35MCIB2061004025950001',
      category: 'general-donation',
      logo: mcbLogo,
      branch: 'Lahore',
      swiftCode: 'MCIBPKKA'
    },
    {
      id: 'nbp-aitmad',
      bankName: 'NBP Aitmad',
      accountNumber: '09434322501821',
      iban: 'PK39NBPA0943004322501821',
      category: 'general-donation',
      logo: aitmadLogo,
      branch: 'Lahore',
      swiftCode: 'NBPAPKKA'
    },
    {
      id: 'mobilink',
      bankName: 'Mobilink Microfinance Bank Limited',
      accountNumber: '135089303',
      iban: 'PK30JCMA0000000135089303',
      category: 'general-donation',
      logo: mobilinkLogo,
      branch: 'Lahore',
      swiftCode: 'JCMAPKKA'
    },
    {
      id: 'faysal-1',
      bankName: 'Faysal Bank Limited',
      accountNumber: '3369387000002235',
      iban: 'PK19FAYS3369387000002235',
      category: 'general-donation',
      logo: faysalLogo,
      branch: 'Lahore',
      swiftCode: 'FAYSPKKA'
    },
    {
      id: 'faysal-2',
      bankName: 'Faysal Bank Limited',
      accountNumber: '3369301000003097',
      iban: 'PK15FAYS3369301000003097',
      category: 'general-donation',
      logo: faysalLogo,
      branch: 'Lahore',
      swiftCode: 'FAYSPKKA'
    },
    {
      id: 'faysal-zakat',
      bankName: 'Faysal Bank Limited (Zakat)',
      accountNumber: '3369301000003783',
      iban: 'PK20FAYS3369301000003783',
      category: 'zakat',
      logo: faysalLogo,
      branch: 'Lahore',
      swiftCode: 'FAYSPKKA'
    },
    {
      id: 'faysal-sadaqah',
      bankName: 'Faysal Bank Limited',
      accountNumber: '3369301000003939',
      iban: 'PK76FAYS3369301000003939',
      category: 'sadaqah',
      logo: faysalLogo,
      branch: 'Lahore',
      swiftCode: 'FAYSPKKA'
    },
    {
      id: 'faysal-education',
      bankName: 'Faysal Bank Limited (Al-Hasnain College)',
      accountNumber: '3369301000004086',
      iban: 'PK84FAYS3369301000004086',
      category: 'education',
      logo: faysalLogo,
      branch: 'Lahore',
      swiftCode: 'FAYSPKKA'
    },
    {
      id: 'bop-taqwa',
      bankName: 'The Bank of Punjab (Taqwa)',
      accountNumber: '5310275199100018',
      iban: 'PK13BPUN5310275199100018',
      category: 'general-donation',
      logo: bopLogo,
      branch: 'Allama Iqbal Town, Lahore',
      swiftCode: 'BPUNPKKA'
    },
    {
      id: 'al-baraka',
      bankName: 'Al-Baraka Bank',
      accountNumber: '0120610164018',
      iban: 'PK28AIIN0000120610164018',
      category: 'general-donation',
      logo: alBarakaLogo,
      branch: 'Lahore',
      swiftCode: 'AIINPKKA'
    },
    {
      id: 'bank-islami',
      bankName: 'Bank Islamic Pakistan',
      accountNumber: '202300707000190',
      iban: 'PK91BKIP0202300707000190',
      category: 'general-donation',
      logo: bankIslamiLogo,
      branch: 'Lahore',
      swiftCode: 'BKIPPKKA'
    },
    {
      id: 'u-bank',
      bankName: 'U Microfinance Bank Limited',
      accountNumber: '810600028957221',
      iban: 'PK41UMBL0810600028957221',
      category: 'general-donation',
      logo: uBankLogo,
      branch: 'Lahore',
      swiftCode: 'UMBLPKKA'
    },
    {
      id: 'hbl',
      bankName: 'HBL',
      accountNumber: '16447900705252',
      iban: 'PK98HABB0016447900705252',
      category: 'general-donation',
      logo: hblLogo,
      branch: 'Lahore',
      swiftCode: 'HABBPKKA'
    },
    {
      id: 'telenor',
      bankName: 'Telenor Microfinance Bank',
      accountNumber: '2201605264',
      iban: 'PK37TMFB9999002201605264',
      category: 'general-donation',
      logo: telenorLogo,
      branch: 'Lahore',
      swiftCode: 'TMFBPKKA'
    }
  ]

  const handleMainTabChange = (tabId) => {
    setActiveMainTab(tabId)
    // Clear any specific bank filter when manually switching tabs
    setSelectedBankId(null)
    if (tabId === 'online-banking') {
      setActiveSubTab('debit-credit')
    } else if (tabId === 'international-accounts') {
      setActiveSubTab('usd')
    } else if (tabId === 'bank-transfer') {
      setActiveCategory('general-donation')
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
                  onClick={() => {
                    setActiveSubTab(tab.id)
                    setActiveSubTabLabel(tab.label)
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="content-box online-banking-content-box">
              {activeSubTab === 'debit-credit' && (
                <>
                  <div className="content-box-icon">
                    <FcDonate size={48} />
                  </div>
                  <div className="content-box-text">
                    <p>
                      You can make donations to MTJ Foundation using your {activeSubTabLabel} from any corner of the globe, at any time using our website. It's a convenient and secure way to support from wherever you are.{' '}
                      <a className="donate-link" onClick={() => navigate('/donate')}>Donate Now mtjfoundation.org/donate</a>
                    </p>
                  </div>
                </>
              )}
              {activeSubTab === 'easypaisa' && (
                <div className="online-banking-image-wrap">
                  <img
                    src={easypaisaImage}
                    alt="EasyPaisa donation method"
                    className="online-banking-image"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 'bank-transfer':
        // If a specific bank was requested, show only that card
        // Otherwise show all banks as before
        const filteredBanks = selectedBankId
          ? banksData.filter((bank) => bank.id === selectedBankId)
          : banksData

        return (
          <div className="ways-to-donate-content">
            <div className="categories-container">
              {donationCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category.id)
                    // Clear specific filter when user manually picks a category
                    setSelectedBankId(null)
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
            {filteredBanks.length > 0 ? (
              <div className="banks-grid">
                {filteredBanks.map((bank) => (
                  <div key={bank.id} className="bank-details-box">
                    <div className="bank-header">
                      <div className="bank-logo">
                        {bank.logo ? (
                          <img src={bank.logo} alt={bank.bankName} className="bank-logo-img" />
                        ) : (
                          <div className="bank-logo-placeholder">
                            {bank.bankName.substring(0, 3).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <h3 className="bank-name">{bank.bankName}</h3>
                    </div>
                    <div className="bank-info">
                      <p><strong>Account Title:</strong> MTJ Foundation Pakistan</p>
                      <CopyableField
                        label="Account no. (PKR):"
                        value={bank.accountNumber}
                        itemId={`${bank.id}-account`}
                      />
                      <CopyableField
                        label="IBAN:"
                        value={bank.iban}
                        itemId={`${bank.id}-iban`}
                      />
                      {/* {bank.branch && <p><strong>Branch:</strong> {bank.branch}</p>} */}
                      {/* {bank.swiftCode && <p><strong>SWIFT code:</strong> {bank.swiftCode}</p>} */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-banks-message">
                <p>No banks available for this category.</p>
              </div>
            )}
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
                  <strong>Contact:</strong>{' '}
                  <a href="tel:+923032440000" className="whatsapp-link">+92 303 2440000</a>
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
      <div className="container text-center">
        {/* <h1 className="ways-to-donate-title"> */}
        <h1 className="heading-secondary">
          Ways To Donate
        </h1>

        <div className="whatsapp-notice">
          <p>
            To get donation receipt please share your transaction slip to our following WhatsApp number:{' '}
            <a href="https://wa.me/+92 303 2440000" className="whatsapp-link">+92 303 2440000</a>
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
