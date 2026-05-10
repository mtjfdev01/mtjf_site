import { useState } from 'react'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { BiSolidDonateHeart } from 'react-icons/bi'
import { FcDonate } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import './DiagnosticCenter.css'
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
import aasLogo from '../../assets/img/diagnosticCenter/aasLogo.webp'

const DiagnosticCenterSection = () => {
  const navigate = useNavigate()
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

  // Diagnostic Center data array
  const diagnosticCenterData = [
    {
      id: 'mian-channu',
      centerName: 'Mian Channu',
      centerBadge: '(Head Office)',
      address: `Rasheeda Ibrahim Centre, Near 
PSO Petrol Pump, GT Road Mian 
Channu `,
      openingTime: '07:AM',
      closingTime: '10:00PM',
      mobileNumbers: ['0311-1605227', '0304-6660534'],
      ptclNumber: '065-2664227 ',
      phcReg: 'Reg#: R-76541 ',
    },
     {
      id: 'sargodha ',
      centerName: 'Sargodha ',
      address: `Shop# 22, Lower Ground Floor, 
Al-Rehman Business Tower, 
University Road, Sargodha `,
      openingTime: '7:30 AM',
      closingTime: '9:30 PM',
      mobileNumbers: ['0311-1605227', '0303-6661302'],
      ptclNumber: '',
      phcReg: 'Reg#: R-95079 ',
    },
      {
      id: 'tulamba',
      centerName: 'Tulamba', 
      address: `Molana Tariq Jamil Foundation, 
Makhdoom Pur Road, Tulamba `,
      openingTime: '08:00AM',
      closingTime: '06:00PM',
      mobileNumbers: ['0311-1605227', '0304-6660643'],
      ptclNumber: '',
      phcReg: 'Reg#: R-85547',
    },
     {
      id: 'sahiwal',
      centerName: 'Sahiwal',
      address: `Opposite Sahiwal Education 
Board, Fareed Town, Sahiwal `,
      openingTime: '07:00AM',
      closingTime: '10:00PM',
      mobileNumbers: ['0311-1605227', '0304-6660695'],
      ptclNumber: '040-4557227 ',
      phcReg: 'Reg#: R-87207',
    },
      {
      id: 'abdul-hakim ',
      centerName: 'Abdul Hakim ',
      address: `Near Sabzi Mandi, Kacha Khu 
Road, Abdul Hakim `,
      openingTime: '07:00AM',
      closingTime: '08:00PM',
      mobileNumbers: ['0311-1605227', '0304-6660583'],
      ptclNumber: '',
      phcReg: 'Reg#: R-85595',
    },
      {
      id: 'khanewal',
      centerName: 'Khanewal',
      address: `Block# 10, Kabotar Chowk, 
Khanewal`,
      openingTime: '07:00AM',
      closingTime: '9:00 PM',
      mobileNumbers: ['0311-1605227', '0303-6661315'],
      ptclNumber: '',
      phcReg: 'Reg#: R-92217',
    },
      {
      id: 'center-12',
      centerName: 'Daska Centre',
      address: `Elahi Health Care Clinic, 
Dhidowali, Daska, Sialkot`,
      openingTime: '9:00 AM ',
      closingTime: '5:00 PM ',
      mobileNumbers: ['0311-1605227', '0303-6661132'],
      ptclNumber: '',
      phcReg: '',
    },
      {
      id: 'kacha-khu ',
      centerName: 'Kacha Khu ',
      address: `Zaman Khan City Centre, Near 
Sabzi Mandi Abdul Hakim Road, 
Kacha Khu `,
      openingTime: '7:30 AM',
      closingTime: '5:30 PM',
      mobileNumbers: ['0311-1605227', '0304-6668529'],
      ptclNumber: '',
      phcReg: 'Reg#: R-90053',
    },
    {
      id: 'chichawanti-1',
      centerName: 'Chichawanti-1',
      address: `Syedna Abu Bakar Siddique 
Chowk, Block# 15, Chichawatni `,
      openingTime: '07:00AM ',
      closingTime: '09:30PM',
      mobileNumbers: ['0311-1605227', '0304-6660237'],
      ptclNumber: '040-5480227 ',
      phcReg: 'Reg#: R-83098 ',
    },
  {
      id: 'chichawanti-2',
      centerName: 'Chichawanti-2',
      address: `Near Mobilink Franchise, Begum 
Shehnaz Road, Chichawatni `,
      openingTime: '07:00AM',
      closingTime: '09:30PM',
      mobileNumbers: ['0311-1605227', '0304-6665479'],
      ptclNumber: '040-5481227 ',
      phcReg: 'Reg#: R-90209',
    },
      {
      id: 'center-13',
      centerName: 'Mian Channu',
      address: ` Gulshan Iqbal Town, Opposite 
PSO Petrol Pump, Tulamba 
Road Mian Channu `,
      openingTime: '8:00 AM',
      closingTime: '6:00 PM ',
      mobileNumbers: ['0311-1605227', '0303-6661133'],
      ptclNumber: '',
      phcReg: '',
    },
    {
      id: '90-morh ',
      centerName: '90 Morh ',
      address: 'Iqbal Nagar Road, 90 Morh',
      openingTime: '7:30 AM',
      closingTime: '5:30 PM ',
      mobileNumbers: ['0311-1605227', '0305-6660287'],
      ptclNumber: '',
      phcReg: 'Reg#: R-90346',
    },
    {
      id: 'makhdoom-pur',
      centerName: `Makhdoom Pur`,
      address: `Railway Road, Opposite Dar-E
Arqam School, Makhdoom Pur `,
      openingTime: '7:30 AM ',
      closingTime: '5:30 PM',
      mobileNumbers: ['0311-1605227', '0304-6660634'],
      ptclNumber: '',
      phcReg: 'Reg#: R-92391',
    }
  ]

  return (
    <section className="ways-to-donate-section">
      <div className="container text-center">
        <h1 className="heading-secondary">
          Ways To Donate
        </h1>

        <div className="whatsapp-notice">
          <p>
            To get donation receipt please share your transaction slip to our following WhatsApp number:{' '}
            <a href="https://wa.me/+92 303 2440000" className="whatsapp-link">+92 303 2440000</a>
          </p>
        </div>

        <div className="content-wrapper">
          <div className="ways-to-donate-content">
            <div className="banks-grid">
              {diagnosticCenterData.map((center) => (
                <div key={center.id} className="bank-details-box">
                  <div className="bank-header">
                    {center.id === 'mian-channu' && (
                      <div className="bank-logo">
                        <img
                          src={aasLogo}
                          alt="AAS Lab & Diagnostic Centre"
                          className="bank-logo-img"
                        />
                      </div>
                    )}
                    {/* Fix 1: name and badge rendered as separate elements */}
                    <h3 className="bank-name">
                      <span className="bank-name-text">{center.centerName}</span>
                      {center.centerBadge && (
                        <span className="bank-name-badge">{center.centerBadge}</span>
                      )}
                    </h3>
                  </div>
                  <div className="bank-info">
                    {center.address && <p><strong>Address:</strong> {center.address}</p>}
                    {center.openingTime && <p><strong>Opening Time:</strong> {center.openingTime}</p>}
                    {center.closingTime && <p><strong>Closing Time:</strong> {center.closingTime}</p>}
                    {/* Fix 2: each phone number rendered on its own line via separate spans */}
                    {center.mobileNumbers && center.mobileNumbers.length > 0 && (
                      <p>
                        <strong>Contact Us:</strong>{' '}
                        {center.mobileNumbers.map((num, index) => (
                          <span key={index} className="phone-number">{num}</span>
                        ))}
                      </p>
                    )}
                    {center.ptclNumber && <p><strong>PTCL:</strong> {center.ptclNumber}</p>}
                    {center.phcReg && <p><strong>PHC Reg:</strong> {center.phcReg}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiagnosticCenterSection
