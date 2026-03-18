import React from 'react'
import './Tabs.css'

const KARAT_OPTIONS = [
  { value: 24, label: '24K (Pure Gold)' },
  { value: 22, label: '22K' },
  { value: 21, label: '21K' },
  { value: 18, label: '18K' }
]

const GoldTab = ({
  goldWeight,
  setGoldWeight,
  goldUnit,
  setGoldUnit,
  goldPrice,
  setGoldPrice,
  goldKarat,
  setGoldKarat,
  useCustomGoldPrice,
  setUseCustomGoldPrice
}) => {
  const weightInGrams = goldUnit === 'tola' 
    ? (parseFloat(goldWeight) || 0) * 11.664 
    : (parseFloat(goldWeight) || 0)
  
  const price = parseFloat(goldPrice) || 0
  const pricePerTola = goldUnit === 'tola' ? price : price * 11.664
  const pricePerGram = goldUnit === 'tola' ? price / 11.664 : price
  const goldValue = weightInGrams * pricePerGram
  
  return (
    <div className="gold-tab">
      <h2 className="h3 mb-24">Gold</h2>
      
      <div className="info-box bg-muted p-16 rounded mb-32">
        <p className="text-sm mb-0">
          <strong>Note:</strong> Gold is zakatable if included in your zakatable wealth 
          and you meet Nisab + Hawl requirements.
        </p>
      </div>

      {/* Karat & Price in one row */}
      <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'flex-end', flexWrap: 'wrap' }} className="mb-24">
        <div className="form-group" style={{ minWidth: '140px', marginBottom: 0 }}>
          <label className="form-label mb-12">
            <strong>Karat</strong>
          </label>
          <select
            className="input"
            value={goldKarat}
            onChange={(e) => setGoldKarat(Number(e.target.value))}
          >
            {KARAT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 0 }}>
          <label className="form-label mb-12">
            <strong>Unit</strong>
          </label>
          <div className="radio-group" style={{ height: '42px', alignItems: 'center' }}>
            <label className="radio-option">
              <input type="radio" name="goldUnit" value="tola" checked={goldUnit === 'tola'} onChange={(e) => setGoldUnit(e.target.value)} />
              <span>Tola</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="goldUnit" value="grams" checked={goldUnit === 'grams'} onChange={(e) => setGoldUnit(e.target.value)} />
              <span>Grams</span>
            </label>
          </div>
        </div>
        <div style={{ minWidth: '160px', marginBottom: -10 }}>
          <label className="form-label mb-12">
            <strong>Per Tola</strong>
          </label>
          <p className="h4 text-primary mb-0" style={{ lineHeight: '42px' }}>
            Rs. {pricePerTola.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
        <div style={{ minWidth: '160px', marginBottom: -10 }}>
          <label className="form-label mb-12">
            <strong>Per Gram</strong>
          </label>
          <p className="h4 text-primary mb-0" style={{ lineHeight: '42px' }}>
            Rs. {pricePerGram.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {!useCustomGoldPrice ? (
        <button
          type="button"
          className="btn btn--outline mb-24"
          onClick={() => setUseCustomGoldPrice(true)}
        >
          Enter Custom Price
        </button>
      ) : (
        <div className="form-group mb-24">
          <input
            type="number"
            className="input"
            placeholder={`Enter gold price ${goldUnit === 'tola' ? 'per tola' : 'per gram'}`}
            value={goldPrice}
            onChange={(e) => setGoldPrice(e.target.value)}
            min="0"
            step="1"
          />
          <p className="text-sm muted mt-8">
            Enter the current market price of gold {goldUnit === 'tola' ? 'per tola' : 'per gram'}.
          </p>
          <button
            type="button"
            className="btn btn--outline mt-12"
            onClick={() => setUseCustomGoldPrice(false)}
          >
            Use Default Price
          </button>
        </div>
      )}

      <div className="form-group mb-24">
        <label className="form-label mb-12">
          <strong>Quantity ({goldUnit === 'tola' ? 'Tola' : 'Grams'})</strong>
        </label>
        <input
          type="number"
          className="input"
          placeholder={`Enter weight in ${goldUnit}`}
          value={goldWeight}
          onChange={(e) => setGoldWeight(e.target.value)}
          min="0"
          step="1"
        />
        {goldUnit === 'tola' && goldWeight && (
          <p className="text-sm muted mt-8">
            {`${(parseFloat(goldWeight) || 0).toFixed(0)} tola = ${weightInGrams.toFixed(0)} grams`}
          </p>
        )}
      </div>
      
      {goldWeight && goldPrice && (
        <div className="summary-box mt-24">
          <p className="text-sm">Weight: <strong>{weightInGrams.toFixed(0)} grams</strong></p>
          <p className="text-sm mt-8">Price per tola: <strong>Rs. {pricePerTola.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></p>
          <p className="text-sm mt-4">Price per gram: <strong>Rs. {pricePerGram.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></p>
          <p className="text-sm bold mt-8">Gold Value: <span className="text-primary">Rs. {goldValue.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
        </div>
      )}
    </div>
  )
}

export default GoldTab
