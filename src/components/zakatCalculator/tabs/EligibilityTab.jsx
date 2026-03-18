import React from 'react'
import './Tabs.css'

const EligibilityTab = ({ goldNisabAmount, silverNisabAmount, fetchedGoldPrice, fetchedSilverPrice }) => {
  return (
    <div className="eligibility-tab">
      {/* Zakat Eligibility Criteria */}
      <div className="form-group mb-32">
        <label className="form-label mb-12">
          <strong>Zakat Eligibility Criteria</strong>
        </label>
        <div className="info-box bg-muted p-16 rounded mb-16">
          <p className="text-sm mb-12">
            <strong>Zakat is only applicable if you have:</strong>
          </p>
          <p className="text-sm mb-8">
            Nisab is the minimum amount of net capital that a Muslim must possess in order to be eligible to pay Zakat, which is prescribed as the equivalent of <strong>87.48 grams/ 7.5 tola of gold</strong> or <strong>612.36 grams/ 52.5 tola of silver</strong>. If your savings and assets exceed this value for a full lunar year, you must pay 2.5% Zakat, calculated using the current market value of gold or silver in your local currency.
          </p>
          <p className="text-sm mb-0">
            <strong>Nisab Threshold (Current Market Value):</strong>
          </p>
          <ul className="text-sm mt-8" style={{ paddingLeft: '20px', marginBottom: '0' }}>
            <li>87.48 grams/ 7.5 tola of gold, or</li>
            <li>612.36 grams/ 52.5 tola of silver, or</li>
            <li>Equivalent cash value to one of these prices</li>
          </ul>
          
          {/* Display calculated Nisab amounts */}
          {(goldNisabAmount || silverNisabAmount) && (
            <div className="nisab-amounts-display mt-24 p-16 rounded" style={{ 
              background: 'var(--color-100)', 
              border: '1px solid var(--color-200)' 
            }}>
              <p className="text-sm mb-12" style={{ fontWeight: '600', color: 'var(--color-900)' }}>
                <strong>Current Nisab Amounts (Based on Latest Prices):</strong>
              </p>
              {goldNisabAmount && (
                <p className="text-sm mb-8">
                  <strong>Gold-based Nisab:</strong> Rs. {goldNisabAmount.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  {fetchedGoldPrice && (
                    <span className="text-muted" style={{ fontSize: 'var(--fs-14)', display: 'block', marginTop: '4px' }}>
                      (Rs. {fetchedGoldPrice.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} per tola × 7.5 tola)
                    </span>
                  )}
                </p>
              )}
              {silverNisabAmount && (
                <p className="text-sm mb-0">
                  <strong>Silver-based Nisab:</strong> Rs. {silverNisabAmount.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  {fetchedSilverPrice && (
                    <span className="text-muted" style={{ fontSize: 'var(--fs-14)', display: 'block', marginTop: '4px' }}>
                      (Rs. {fetchedSilverPrice.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} per tola × 52.5 tola)
                    </span>
                  )}
                </p>
              )}
              <p className="text-sm mt-12 mb-0" style={{ fontStyle: 'italic', color: 'var(--color-600)' }}>
                If your net zakatable wealth exceeds either of these amounts, Zakat is applicable.
              </p>
            </div>
          )}
        </div>
        <div className="info-box bg-primary text-white p-16 rounded">
          <p className="text-sm mb-0">
            <strong>Note:</strong> Home, normal clothing, and tools for personal usage (not for business purposes) are typically not zakatable. Only wealth above basic needs and above the Nisab threshold is subject to Zakat.
          </p>
        </div>
      </div>
      
      <div className="info-box bg-primary text-white p-16 rounded">
        <p className="text-sm mb-0">
          <strong>Note:</strong> Your eligibility will be automatically calculated based on 
          your inputs in all tabs. Make sure to complete the Cash, Gold, and Silver tabs 
          to get an accurate result.
        </p>
      </div>
    </div>
  )
}

export default EligibilityTab

