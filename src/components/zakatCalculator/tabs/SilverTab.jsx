import React from 'react'
import './Tabs.css'

const SilverTab = ({
  silverWeight,
  setSilverWeight,
  silverUnit,
  setSilverUnit,
  silverPrice,
  setSilverPrice
}) => {
  const weightInGrams = silverUnit === 'tola' 
    ? (parseFloat(silverWeight) || 0) * 11.664 
    : (parseFloat(silverWeight) || 0)
  
  const price = parseFloat(silverPrice) || 0
  // Use the same unit as weight unit for price
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
      
      <div className="form-group mb-24">
        <label className="form-label mb-12">
          <strong>Unit</strong>
        </label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="silverUnit"
              value="tola"
              checked={silverUnit === 'tola'}
              onChange={(e) => setSilverUnit(e.target.value)}
            />
            <span>Tola</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="silverUnit"
              value="grams"
              checked={silverUnit === 'grams'}
              onChange={(e) => setSilverUnit(e.target.value)}
            />
            <span>Grams</span>
          </label>
        </div>
      </div>
      
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
          step="0.01"
        />
        {silverUnit === 'tola' && (
          <p className="text-sm muted mt-8">
            {silverWeight ? `${(parseFloat(silverWeight) || 0).toFixed(2)} tola = ${weightInGrams.toFixed(2)} grams` : ''}
          </p>
        )}
      </div>
      
      <div className="form-group mb-24">
        <label className="form-label mb-12">
          <strong>Price ({silverUnit === 'tola' ? 'Per Tola' : 'Per Gram'}) (Rs.)</strong>
        </label>
        <input
          type="number"
          className="input"
          placeholder={`Enter today's silver price ${silverUnit === 'tola' ? 'per tola' : 'per gram'}`}
          value={silverPrice}
          onChange={(e) => setSilverPrice(e.target.value)}
          min="0"
          step="0.01"
        />
        <p className="text-sm muted mt-8">
          Enter the current market price of silver {silverUnit === 'tola' ? 'per tola' : 'per gram'}. 
          (Future: Live rate API integration)
        </p>
      </div>
      
      {silverWeight && silverPrice && (
        <div className="summary-box mt-24">
          <p className="text-sm">Weight: <strong>{weightInGrams.toFixed(2)} grams</strong></p>
          <p className="text-sm mt-8">Price {silverUnit === 'tola' ? 'per tola' : 'per gram'}: <strong>Rs. {parseFloat(silverPrice).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
          {silverUnit === 'tola' && (
            <p className="text-sm muted mt-4">Price per gram: <strong>Rs. {pricePerGram.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
          )}
          <p className="text-sm bold mt-8">Silver Value: <span className="text-primary">Rs. {silverValue.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
        </div>
      )}
    </div>
  )
}

export default SilverTab

