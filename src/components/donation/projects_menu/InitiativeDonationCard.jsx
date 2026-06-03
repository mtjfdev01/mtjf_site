import React, { useState, useEffect } from 'react'
import { useDonation } from '../../../contexts/DonationContext'
import { FaTimes } from 'react-icons/fa'
import './InitiativeDonationCard.css'

const InitiativeDonationCard = ({ initiative, displayCurrency = 'PKR', exchangeRatesPKR }) => {
  const { projectDonations, updateProjectDonation } = useDonation()
  const [quantity, setQuantity] = useState(0)
  const [customAmount, setCustomAmount] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)
  const pricingOptions = Array.isArray(initiative.pricingOptions) && initiative.pricingOptions.length > 0
    ? initiative.pricingOptions
    : null

  const isQurbaniMultiCurrencyProject =
    initiative?.parentProjectId === 'qurbani-baraye-mustehqeen' || initiative?.parentProjectId === 'qurbani'

  // Qurbani projects always use this donation type only (no GENERAL / SADKA / ZAKAT selector)
  const donationTypeOptions = initiative.donationTypeOptions || [
        { value: 'GENERAL', label: 'GENERAL' },
        { value: 'SADQA', label: 'SADQA' },
        { value: 'ZAKAT', label: 'ZAKAT' },
        // { value: 'qurbani-baraye-mustehqeen', label: 'QURBANI' },
      ]
  const defaultDonationType = isQurbaniMultiCurrencyProject
    ? 'qurbani-baraye-mustehqeen'
    : (donationTypeOptions[0]?.value || 'GENERAL')
  const [donationType, setDonationType] = useState(defaultDonationType)
  const defaultPricingOptionId = initiative.defaultPricingOptionId || pricingOptions?.[0]?.id || null
  const [selectedPricingOptionId, setSelectedPricingOptionId] = useState(defaultPricingOptionId)

  const selectedPricingOption = pricingOptions
    ? pricingOptions.find((option) => option.id === selectedPricingOptionId) || pricingOptions[0]
    : null
  const basePrice = selectedPricingOption?.price ?? initiative.price ?? 0
  const totalPrice = quantity * basePrice + (parseFloat(customAmount) || 0)
  const resolvedRates = exchangeRatesPKR || { PKR: 1 }
  const effectiveCurrency = isQurbaniMultiCurrencyProject ? displayCurrency : 'PKR'
  const rate = resolvedRates[effectiveCurrency] || 1
  const toDisplayAmount = (amountPKR) => {
    const n = Number(amountPKR) || 0
    if (effectiveCurrency === 'PKR') return Math.round(n)
    return Math.round(n / rate)
  }
  const formatNumber = (n) => Number(n || 0).toLocaleString()

  // Restore state from context on mount
  useEffect(() => {
    const existingDonation = projectDonations.find(
      p => p.projectId === initiative.parentProjectId && 
           p.initiativeId === initiative.id
    )
    
    if (existingDonation) {
      setQuantity(existingDonation.quantity || 0)
      setDonationType(
        isQurbaniMultiCurrencyProject
          ? 'qurbani-baraye-mustehqeen'
          : (existingDonation.donationType || defaultDonationType)
      )
      setCustomAmount(existingDonation.customAmount ? existingDonation.customAmount.toString() : '')
      if (pricingOptions) {
        setSelectedPricingOptionId(existingDonation.selectedPricingOptionId || defaultPricingOptionId)
      }
    }
  }, [projectDonations, initiative.parentProjectId, initiative.id, pricingOptions, defaultPricingOptionId, defaultDonationType, isQurbaniMultiCurrencyProject])

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

  const updateDonationData = (qty, type, custom, pricingOptionId = selectedPricingOptionId) => {
    const selectedOptionForPayload = pricingOptions
      ? pricingOptions.find((option) => option.id === pricingOptionId) || pricingOptions[0]
      : null
    const itemPrice = selectedOptionForPayload?.price ?? initiative.price ?? 0
    const amount = (qty * itemPrice) + (parseFloat(custom) || 0)
    
    const donationData = {
      projectId: initiative.parentProjectId,
      initiativeId: initiative.id,
      projectTitle: initiative.parentProjectTitle || '',
      initiativeTitle: initiative.title,
      initiativeSubtitle: selectedOptionForPayload?.subtitle || initiative.subtitle || null,
      // projectIcon: initiative.icon,
      quantity: qty,
      donationType: type,
      basePrice: itemPrice,
      selectedPricingOptionId: selectedOptionForPayload?.id || null,
      selectedPricingOptionLabel: selectedOptionForPayload?.label || null,
      customAmount: parseFloat(custom) || 0,
      totalAmount: amount,
      templateCode: initiative?.templateCode || null
    }

    // Update context directly - context will handle removal if totalAmount is 0
    updateProjectDonation(donationData)
  }

  return (
    <div className="initiative-donation-card">
      {/* <div className="initiative-card-icon">
        <img src={initiative.icon} alt={initiative.title} />
      </div> */}
      
      {/* <h3 className="initiative-card-title">{initiative.title}</h3> */}

      {pricingOptions && (
        <div className="initiative-pricing-options" role="radiogroup" aria-label={`${initiative.title} options`}>
          {pricingOptions.map((option) => {
            const isActive = selectedPricingOption?.id === option.id
            return (
              <button
                key={option.id}
                type="button"
                className={`initiative-pricing-option ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSelectedPricingOptionId(option.id)
                  updateDonationData(quantity, donationType, customAmount, option.id)
                }}
                aria-pressed={isActive}
              >
                <span className="initiative-pricing-option-title">{option.label}</span>
                <span className="initiative-pricing-option-amount">
                  {effectiveCurrency} {formatNumber(toDisplayAmount(option.price))} {option.subtitle || initiative.subtitle || 'Per Item'}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Initiative Title - Displayed above donation type filter */}
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

      {!isQurbaniMultiCurrencyProject && (
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
      )}

      <div className="initiative-price-field">
        <label className="initiative-field-label">
          {(selectedPricingOption?.subtitle || initiative.subtitle)
            ? `${effectiveCurrency} ${formatNumber(toDisplayAmount(basePrice))} ${selectedPricingOption?.subtitle || initiative.subtitle}`
            : `${effectiveCurrency} ${formatNumber(toDisplayAmount(basePrice))} Per Item`
          }
          {initiative.description && (
            <span 
              className="initiative-read-more"
              onClick={() => setShowOverlay(true)}
            >
              View Details
            </span>
          )}
        </label> 
        <div className="initiative-price-input-wrapper">
          <input
            type="text"
            className="initiative-price-input"
            value={toDisplayAmount(totalPrice) > 0 ? formatNumber(toDisplayAmount(totalPrice)) : '0'}
            readOnly
          />
          <span className="initiative-price-currency">{effectiveCurrency}</span>
        </div>
      </div>

      {showOverlay && initiative.description && (
        <div className="initiative-overlay" onClick={() => setShowOverlay(false)}>
          <div className="initiative-overlay-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="initiative-overlay-close"
              onClick={() => setShowOverlay(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            {initiative.duration && (
              <div className="initiative-overlay-duration">
                <strong>Duration:</strong> {initiative.duration}
              </div>
            )}
            <p className="initiative-overlay-description">{initiative.description}</p>
          </div>
        </div>
      )}

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

