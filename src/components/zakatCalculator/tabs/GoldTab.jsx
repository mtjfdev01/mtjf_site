import React from 'react'
import './Tabs.css'

const GoldTab = ({
  goldWeight,
  setGoldWeight,
  goldUnit,
  setGoldUnit,
  goldPrice,
  setGoldPrice
}) => {
  const weightInGrams = goldUnit === 'tola' 
    ? (parseFloat(goldWeight) || 0) * 11.664 
    : (parseFloat(goldWeight) || 0)
  
  const price = parseFloat(goldPrice) || 0
  // Use the same unit as weight unit for price
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
      
      <div className="form-group mb-24">
        <label className="form-label mb-12">
          <strong>Unit</strong>
        </label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="goldUnit"
              value="tola"
              checked={goldUnit === 'tola'}
              onChange={(e) => setGoldUnit(e.target.value)}
            />
            <span>Tola</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="goldUnit"
              value="grams"
              checked={goldUnit === 'grams'}
              onChange={(e) => setGoldUnit(e.target.value)}
            />
            <span>Grams</span>
          </label>
        </div>
      </div>
      
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
          step="0.01"
        />
        {goldUnit === 'tola' && (
          <p className="text-sm muted mt-8">
            {goldWeight ? `${(parseFloat(goldWeight) || 0).toFixed(2)} tola = ${weightInGrams.toFixed(2)} grams` : ''}
          </p>
        )}
      </div>
      
      <div className="form-group mb-24">
        <label className="form-label mb-12">
          <strong>Price ({goldUnit === 'tola' ? 'Per Tola' : 'Per Gram'}) (Rs.)</strong>
        </label>
        <input
          type="number"
          className="input"
          placeholder={`Enter today's gold price ${goldUnit === 'tola' ? 'per tola' : 'per gram'}`}
          value={goldPrice}
          onChange={(e) => setGoldPrice(e.target.value)}
          min="0"
          step="0.01"
        />
        <p className="text-sm muted mt-8">
          Enter the current market price of gold {goldUnit === 'tola' ? 'per tola' : 'per gram'}. 
          (Future: Live rate API integration)
        </p>
      </div>
      
      {goldWeight && goldPrice && (
        <div className="summary-box mt-24">
          <p className="text-sm">Weight: <strong>{weightInGrams.toFixed(2)} grams</strong></p>
          <p className="text-sm mt-8">Price {goldUnit === 'tola' ? 'per tola' : 'per gram'}: <strong>Rs. {parseFloat(goldPrice).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
          {goldUnit === 'tola' && (
            <p className="text-sm muted mt-4">Price per gram: <strong>Rs. {pricePerGram.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
          )}
          <p className="text-sm bold mt-8">Gold Value: <span className="text-primary">Rs. {goldValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
        </div>
      )}
    </div>
  )
}

export default GoldTab

