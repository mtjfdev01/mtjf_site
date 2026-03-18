import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'
import './ResultSection.css'

const ResultSection = ({ calculations }) => {
  const navigate = useNavigate()
  const { clearDonationData, setDonationFormData } = useDonation()
  const [isDonating, setIsDonating] = useState(false)
  const {
    netCash,
    assetsTotal,
    goldValue,
    silverValue,
    netWealth,
    nisabValue,
    eligibilityStatus,
    zakatDue,
    zakatCash,
    zakatAssets,
    zakatGold,
    zakatSilver,
    usedNisabMethod
  } = calculations

  // Single threshold: Nisab. Net wealth must exceed this for Zakat to be due.
  const zakatThreshold = Math.round(nisabValue)
  const exceedsThreshold = zakatThreshold > 0 && Number(netWealth) >= zakatThreshold
 console.log("Zakat Threshold: " + zakatThreshold + " Net Wealth: " + netWealth + " Exceeds Threshold: " + exceedsThreshold)
  console.log(typeof netWealth, netWealth, typeof zakatThreshold, zakatThreshold)

  const handleProceedToDonate = async () => {
    if (isDonating) return
    setIsDonating(true)
    try {
      const amount = Math.round(zakatDue)
      clearDonationData()
      setDonationFormData({
        amount: amount.toString(),
        finalAmount: amount.toString(),
        currency: 'PKR',
        category: 'Zakat',
        donation_type: 'zakat'
      })
      navigate('/checkout')
    } catch {
      setIsDonating(false)
    }
  }
  
  const formatRs = (n) => Number(n || 0).toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <div className="result-section">
      <div className="result-header">
        <h2 className="h3 mb-16">Zakat Calculation</h2>
      </div>
            {/* Exceeds threshold: show Zakat amount + Proceed to Donate */}
            {exceedsThreshold && (
        <div className="result-step">
          <h3 className="h4 mb-12">Payable Zakat Amount (2.5%)</h3>
          <div className="zakat-breakdown mb-24">
            <div className="calculation-breakdown">
              {netCash > 0 && (
                <div className="calc-row">
                  <span>Cash Zakat:</span>
                  <strong>Rs. {formatRs(zakatCash)}</strong>
                </div>
              )}
              {(assetsTotal || 0) > 0 && (
                <div className="calc-row">
                  <span>Assets Zakat:</span>
                  <strong>Rs. {formatRs(zakatAssets)}</strong>
                </div>
              )}
              {goldValue > 0 && (
                <div className="calc-row">
                  <span>Gold Zakat:</span>
                  <strong>Rs. {formatRs(zakatGold)}</strong>
                </div>
              )}
              {silverValue > 0 && (
                <div className="calc-row">
                  <span>Silver Zakat:</span>
                  <strong>Rs. {formatRs(zakatSilver)}</strong>
                </div>
              )}
              <div className="calc-row calc-total">
                <span>Total Zakat Due:</span>
                <strong className="text-primary">Rs. {formatRs(zakatDue)}</strong>
              </div>
            </div>
          </div>
          <div className="zakat-due-box">
            <div className="zakat-amount">
              <p className="text-sm muted mb-8">Total Zakat Amount (2.5%)</p>
              <h2 className="h2 text-primary mb-8">Rs. {formatRs(zakatDue)}</h2>
              <p className="text-sm muted mb-0">Calculated as 2.5% of your net zakatable wealth</p>
              <button
                type="button"
                className={`result-section__donate-btn${isDonating ? ' result-section__donate-btn--loading' : ''}`}
                onClick={handleProceedToDonate}
                disabled={isDonating}
              >
                {isDonating ? (
                  <>
                    <span className="result-section__spinner" aria-hidden="true" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Donate this Zakat'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Net wealth summary */}
      <div className="result-step mb-24">
        <h3 className="h4 mb-12">Net Zakatable Wealth</h3>
        <div className="calculation-breakdown">
          <div className="calc-row">
            <span>Net Cash:</span>
            <strong>Rs. {formatRs(netCash)}</strong>
          </div>
          <div className="calc-row">
            <span>Assets Value:</span>
            <strong>Rs. {formatRs(assetsTotal || 0)}</strong>
          </div>
          <div className="calc-row">
            <span>Gold Value:</span>
            <strong>Rs. {formatRs(goldValue)}</strong>
          </div>
          <div className="calc-row">
            <span>Silver Value:</span>
            <strong>Rs. {formatRs(silverValue)}</strong>
          </div>
          <div className="calc-row calc-total">
            <span>Net Total:</span>
            <strong className="text-primary">Rs. {formatRs(netWealth)}</strong>
          </div>
        </div>
      </div>
      
      {/* Threshold */}
      {zakatThreshold > 0 && (
        <div className="result-step mb-24">
          <h3 className="h4 mb-12">Nisab Threshold ({usedNisabMethod === 'gold' ? 'Gold-based' : 'Silver-based'})</h3>
          <div className="calc-row">
            <span>Threshold:</span>
            <strong className="text-primary">Rs. {formatRs(zakatThreshold)}</strong>
          </div>
        </div>
      )}
      

      
      {/* Below threshold: single message */}
      {zakatThreshold > 0 && !exceedsThreshold && (
        <div className="result-step">
          <div className="result-section__below-threshold status-box bg-warning p-16 rounded">
            <p className="text-sm mb-0">
              <span style={{ color: '#e53e3e', fontWeight: 700 }}>Amount is less than threshold.</span> Your net wealth (Rs. {formatRs(netWealth)}) is below the Nisab threshold (Rs. {formatRs(zakatThreshold)}). No Zakat is due.
            </p>
          </div>
        </div>
      )}
      
      {zakatThreshold === 0 && (
        <div className="info-box bg-warning p-16 rounded mt-24">
          <p className="text-sm mb-0">
            <strong>Note:</strong> Please enter gold or silver prices to calculate the Nisab threshold.
          </p>
        </div>
      )}
    </div>
  )
}

export default ResultSection

