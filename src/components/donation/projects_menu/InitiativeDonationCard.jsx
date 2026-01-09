import React, { useState, useEffect } from 'react'
import { useDonation } from '../../../contexts/DonationContext'
import './InitiativeDonationCard.css'

const InitiativeDonationCard = ({ initiative }) => {
  const { projectDonations, updateProjectDonation } = useDonation()
  const [quantity, setQuantity] = useState(0)
  const [donationType, setDonationType] = useState('GENERAL')
  const [customAmount, setCustomAmount] = useState('')

  const basePrice = initiative.price || 0
  const totalPrice = quantity * basePrice + (parseFloat(customAmount) || 0)

  // Restore state from context on mount
  useEffect(() => {
    const existingDonation = projectDonations.find(
      p => p.projectId === initiative.parentProjectId && 
           p.initiativeId === initiative.id
    )
    
    if (existingDonation) {
      setQuantity(existingDonation.quantity || 0)
      setDonationType(existingDonation.donationType || 'GENERAL')
      setCustomAmount(existingDonation.customAmount ? existingDonation.customAmount.toString() : '')
    }
  }, [projectDonations, initiative.parentProjectId, initiative.id])

  // Donation type options - can be customized per initiative
  const donationTypeOptions = initiative.donationTypeOptions || [
    { value: 'GENERAL', label: 'GENERAL' },
    { value: 'SADKA', label: 'SADKA' },
    { value: 'ZAKAT', label: 'ZAKAT' }
  ]

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(0, quantity + delta)
    setQuantity(newQuantity)
    updateDonationData(newQuantity, donationType, customAmount)
  }

  const handleDonationTypeChange = (e) => {
    const newType = e.target.value
    setDonationType(newType)
    updateDonationData(quantity, newType, customAmount)
  }

  const handleCustomAmount = () => {
    const amount = prompt('Enter custom amount:')
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      setCustomAmount(amount)
      updateDonationData(quantity, donationType, amount)
    }
  }

  const updateDonationData = (qty, type, custom) => {
    const amount = (qty * basePrice) + (parseFloat(custom) || 0)
    
    const donationData = {
      projectId: initiative.parentProjectId,
      initiativeId: initiative.id,
      projectTitle: initiative.parentProjectTitle || '',
      initiativeTitle: initiative.title,
      initiativeSubtitle: initiative.subtitle || null,
      // projectIcon: initiative.icon,
      quantity: qty,
      // donationType: type,
      basePrice: basePrice,
      customAmount: parseFloat(custom) || 0,
      totalAmount: amount
    }

    // Update context directly - context will handle removal if totalAmount is 0
    updateProjectDonation(donationData)
  }

  return (
    <div className="initiative-donation-card">
      <div className="initiative-card-icon">
        <img src={initiative.icon} alt={initiative.title} />
      </div>
      
      <h3 className="initiative-card-title">{initiative.title}</h3>

      <div className="initiative-quantity-selector">
        <button
          type="button"
          className="initiative-quantity-btn initiative-quantity-btn--minus"
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity === 0}
        >
          −
        </button>
        <input
          type="number"
          className="initiative-quantity-input"
          value={quantity}
          onChange={(e) => {
            const val = Math.max(0, parseInt(e.target.value) || 0)
            setQuantity(val)
            updateDonationData(val, donationType, customAmount)
          }}
          min="0"
        />
        <button
          type="button"
          className="initiative-quantity-btn initiative-quantity-btn--plus"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>

      <div className="initiative-donation-type-field">
        <label className="initiative-field-label">Donation type</label>
        <select
          className="initiative-donation-type-select"
          value={donationType}
          onChange={handleDonationTypeChange}
        >
          {donationTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="initiative-price-field">
        <label className="initiative-field-label">{initiative.subtitle 
            ? `RS ${basePrice.toLocaleString()} ${initiative.subtitle}`
            : `RS ${basePrice.toLocaleString()} Per Item`
          }</label> 
        <div className="initiative-price-input-wrapper">
          <input
            type="text"
            className="initiative-price-input"
            value={totalPrice > 0 ? totalPrice.toLocaleString() : '0'}
            readOnly
          />
          <span className="initiative-price-currency">PKR</span>
        </div>
      </div>

      {/* <button
        type="button"
        className="initiative-add-other-amount-btn"
        onClick={handleCustomAmount}
      >
        Add Other Amount
      </button> */}
    </div>
  )
}

export default InitiativeDonationCard

