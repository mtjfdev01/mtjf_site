import React from 'react'
import './ResultSection.css'

const ResultSection = ({ calculations }) => {
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
  
  const getStatusMessage = () => {
    switch (eligibilityStatus) {
      case 'below-nisab':
        return {
          title: 'Below Nisab',
          message: `Your net zakatable wealth (Rs. ${netWealth.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}) is below the Nisab threshold (Rs. ${nisabValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}). No Zakat is due.`,
          color: 'text-warning',
          bgColor: 'bg-warning'
        }
      case 'due':
        return {
          title: 'Zakat Due',
          message: 'Your Zakat is due! Calculate and pay your Zakat obligation.',
          color: 'text-success',
          bgColor: 'bg-success'
        }
      default:
        return {
          title: 'Calculating...',
          message: 'Please complete all tabs to see your Zakat calculation.',
          color: 'text-muted',
          bgColor: 'bg-muted'
        }
    }
  }
  
  const status = getStatusMessage()
  
  return (
    <div className="result-section">
      <div className="result-header">
        <h2 className="h3 mb-16">Zakat Calculation</h2>
      </div>
      
      {/* Zakat Status */}
      {nisabValue > 0 && (
        <div className={`status-box ${status.bgColor} p-16 rounded mb-24`}>
          <h3 className={`h4 mb-8 ${status.color}`}>{status.title}</h3>
          <p className="text-sm mb-0">{status.message}</p>
        </div>
      )}
      
      {/* Step 1: Net Zakatable Wealth */}
      <div className="result-step mb-24">
        <h3 className="h4 mb-12">Step 1: Net Zakatable Wealth</h3>
        <div className="calculation-breakdown">
          <div className="calc-row">
            <span>Net Cash:</span>
            <strong>Rs. {netCash.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="calc-row">
            <span>Assets Value:</span>
            <strong>Rs. {(assetsTotal || 0).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="calc-row">
            <span>Gold Value:</span>
            <strong>Rs. {goldValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="calc-row">
            <span>Silver Value:</span>
            <strong>Rs. {silverValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="calc-row calc-total">
            <span>Net Zakatable Wealth:</span>
            <strong className="text-primary">Rs. {netWealth.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
        </div>
      </div>
      
      {/* Step 2: Nisab Threshold */}
      {nisabValue > 0 && (
        <div className="result-step mb-24">
          <h3 className="h4 mb-12">Step 2: Nisab Threshold</h3>
          <div className="calculation-breakdown">
            <div className="calc-row">
              <span>Nisab Value ({usedNisabMethod === 'gold' ? 'Gold-based' : 'Silver-based'}):</span>
              <strong className="text-primary">Rs. {nisabValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
            <p className="text-sm muted mt-12">
              Nisab is the minimum threshold. If your wealth is above Nisab, Zakat is due.
            </p>
          </div>
        </div>
      )}
      
      {/* Step 3: Zakat Status */}
      {nisabValue > 0 && eligibilityStatus !== 'checking' && (
        <div className="result-step mb-24">
          <h3 className="h4 mb-12">Step 3: Zakat Status</h3>
          <div className={`status-indicator ${eligibilityStatus === 'due' ? 'status-due' : 'status-below'}`}>
            {eligibilityStatus === 'due' ? (
              <div>
                <p className="text-lg bold text-success mb-8">✓ Zakat is Due</p>
                <p className="text-sm">
                  Your net wealth (Rs. {netWealth.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}) 
                  exceeds the Nisab threshold (Rs. {nisabValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}).
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg bold text-warning mb-8">⚠ Below Nisab</p>
                <p className="text-sm">
                  Your net wealth (Rs. {netWealth.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}) 
                  is below the Nisab threshold (Rs. {nisabValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}). 
                  No Zakat is due.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Step 4: Payable Zakat Amount */}
      {eligibilityStatus === 'due' && (
        <div className="result-step">
          <h3 className="h4 mb-12">Step 4: Payable Zakat Amount</h3>
          
          {/* Zakat Breakdown */}
          <div className="zakat-breakdown mb-24">
            <h4 className="h4 mb-16">Zakat Breakdown (2.5%)</h4>
            <div className="calculation-breakdown">
              {netCash > 0 && (
                <div className="calc-row">
                  <span>Cash Zakat:</span>
                  <strong>Rs. {zakatCash.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
              )}
              {(assetsTotal || 0) > 0 && (
                <div className="calc-row">
                  <span>Assets Zakat:</span>
                  <strong>Rs. {zakatAssets.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
              )}
              {goldValue > 0 && (
                <div className="calc-row">
                  <span>Gold Zakat:</span>
                  <strong>Rs. {zakatGold.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
              )}
              {silverValue > 0 && (
                <div className="calc-row">
                  <span>Silver Zakat:</span>
                  <strong>Rs. {zakatSilver.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
              )}
              <div className="calc-row calc-total">
                <span>Total Zakat Due:</span>
                <strong className="text-primary">Rs. {zakatDue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              </div>
            </div>
          </div>
          
          <div className="zakat-due-box">
            <div className="zakat-amount">
              <p className="text-sm muted mb-8">Total Zakat Amount (2.5%)</p>
              <h2 className="h2 text-primary mb-8">
                Rs. {zakatDue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <p className="text-sm muted">
                Calculated as 2.5% of your net zakatable wealth
              </p>
            </div>
          </div>
          
          <div className="info-box bg-muted p-16 rounded mt-24">
            <p className="text-sm mb-0">
              <strong>Important:</strong> Nisab is a threshold; Zakat is calculated on your full net wealth, 
              not (wealth − nisab). This is the correct Islamic calculation method.
            </p>
          </div>
        </div>
      )}
      
      {nisabValue === 0 && (
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

