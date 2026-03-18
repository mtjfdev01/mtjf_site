import React from 'react'
import './Tabs.css'

const SilverTab = ({
  silverWeight,
  setSilverWeight,
  silverUnit,
  setSilverUnit,
  silverPrice,
  setSilverPrice,
  useCustomSilverPrice,
  setUseCustomSilverPrice
}) => {
  const weightInGrams = silverUnit === 'tola' 
    ? (parseFloat(silverWeight) || 0) * 11.664 
    : (parseFloat(silverWeight) || 0)
  
  const price = parseFloat(silverPrice) || 0
  const pricePerTola = silverUnit === 'tola' ? price : price * 11.664
  const pricePerGram = silverUnit === 'tola' ? price / 11.664 : price
  const silverValue = weightInGrams * pricePerGram
  
  return (
    <div className="silver-tab">
      <h2 className="h3 mb-24">Silver</h2>
      
      <div className="info-box bg-muted p-16 rounded mb-32">
        <p className="text-sm mb-0">
          <strong>Note:</strong> Silver is zakatable if included in your zakatable wealth 
          and you meet Nisab + Hawl requirements.
        </p>
      </div>

      {/* Unit & Prices in one row */}
      <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'flex-end', flexWrap: 'wrap' }} className="mb-24">
        {/* <div style={{ marginBottom: -20 }}>
          <label className="form-label mb-12">
            <strong>Unit</strong>
          </label>
          <div className="radio-group" style={{ height: '42px', alignItems: 'center' }}>
            <label className="radio-option">
              <input type="radio" name="silverUnit" value="tola" checked={silverUnit === 'tola'} onChange={(e) => setSilverUnit(e.target.value)} />
              <span>Tola</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="silverUnit" value="grams" checked={silverUnit === 'grams'} onChange={(e) => setSilverUnit(e.target.value)} />
              <span>Grams</span>
            </label>
          </div>
        </div> */}
        <div style={{ minWidth: '160px', marginBottom: -20 }}>
          <label className="form-label mb-12">
            <strong>Per Tola</strong>
          </label>
          <p className="h4 text-primary mb-0" style={{ lineHeight: '42px' }}>
            Rs. {pricePerTola.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
        <div style={{ minWidth: '160px', marginBottom: -20 }}>
          <label className="form-label mb-12">
            <strong>Per Gram</strong>
          </label>
          <p className="h4 text-primary mb-0" style={{ lineHeight: '42px' }}>
            Rs. {pricePerGram.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {!useCustomSilverPrice ? (
        <button
          type="button"
          className="btn btn--outline mb-24"
          onClick={() => setUseCustomSilverPrice(true)}
        >
          Enter Custom Price
        </button>
      ) : (
        <div className="form-group mb-24">
          <input
            type="number"
            className="input"
            placeholder={`Enter silver price ${silverUnit === 'tola' ? 'per tola' : 'per gram'}`}
            value={silverPrice}
            onChange={(e) => setSilverPrice(e.target.value)}
            min="0"
            step="1"
          />
          <p className="text-sm muted mt-8">
            Enter the current market price of silver {silverUnit === 'tola' ? 'per tola' : 'per gram'}.
          </p>
          <button
            type="button"
            className="btn btn--outline mt-12"
            onClick={() => setUseCustomSilverPrice(false)}
          >
            Use Default Price
          </button>
        </div>
      )}
      
      <div className="form-group mb-24">
        <label className="form-label mb-12">
          <strong>Quantity ({silverUnit === 'tola' ? 'Tola' : 'Grams'})</strong>
        </label>
        <input
          type="number"
          className="input"
          placeholder={`Enter weight in ${silverUnit}`}
          value={silverWeight}
          onChange={(e) => setSilverWeight(e.target.value)}
          min="0"
          step="1"
        />
        {silverUnit === 'tola' && silverWeight && (
          <p className="text-sm muted mt-8">
            {`${(parseFloat(silverWeight) || 0).toFixed(0)} tola = ${weightInGrams.toFixed(0)} grams`}
          </p>
        )}
      </div>
      
      {silverWeight && silverPrice && (
        <div className="summary-box mt-24">
          <p className="text-sm">Weight: <strong>{weightInGrams.toFixed(0)} grams</strong></p>
          <p className="text-sm mt-8">Price per tola: <strong>Rs. {pricePerTola.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></p>
          <p className="text-sm mt-4">Price per gram: <strong>Rs. {pricePerGram.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></p>
          <p className="text-sm bold mt-8">Silver Value: <span className="text-primary">Rs. {silverValue.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
        </div>
      )}
    </div>
  )
}

export default SilverTab
