import React, { useState } from 'react'
import './ProjectDonationCard.css'

const ProjectDonationCard = ({ project, onUpdate }) => {
  const [quantity, setQuantity] = useState(0)
  const [donationType, setDonationType] = useState('GENERAL')
  const [customAmount, setCustomAmount] = useState('')

  const basePrice = project.price || 0
  const totalPrice = quantity * basePrice + (parseFloat(customAmount) || 0)

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

  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    setCustomAmount(value)
    updateDonationData(quantity, donationType, value)
  }

  const updateDonationData = (qty, type, custom) => {
    const amount = (qty * basePrice) + (parseFloat(custom) || 0)
    onUpdate({
      projectId: project.id,
      initiativeId: project.initiativeId || null,
      projectTitle: project.title,
      initiativeTitle: project.subtitle ? null : project.title,
      initiativeSubtitle: project.subtitle || null,
      // projectIcon: project.icon,
      quantity: qty,
      // donationType: type,
      basePrice: basePrice,
      customAmount: parseFloat(custom) || 0,
      totalAmount: amount
    })
  }

  return (
    <div className="project-donation-card">
      <div className="project-donation-icon">
        <img src={project.icon} alt={project.title} />
      </div>
      
      <h3 className="project-donation-title">{project.title}</h3>
      {project.subtitle && (
        <p className="project-donation-subtitle">{project.subtitle}</p>
      )}

      <div className="quantity-selector">
        <button
          type="button"
          className="quantity-btn quantity-btn--minus"
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity === 0}
        >
          −
        </button>
        <input
          type="number"
          className="quantity-input"
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
          className="quantity-btn quantity-btn--plus"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>

      <div className="donation-type-field">
        <label className="field-label">Donation type</label>
        <select
          className="donation-type-select"
          value={donationType}
          onChange={handleDonationTypeChange}
        >
          <option value="GENERAL">GENERAL</option>
          <option value="SADKA">SADKA</option>
          <option value="ZAKAT">ZAKAT</option>
        </select>
      </div>

      <div className="price-field">
        <label className="field-label">
          {project.subtitle 
            ? `RS ${basePrice.toLocaleString()} ${project.subtitle}`
            : `RS ${basePrice.toLocaleString()} Per Item`
          }
        </label>
        <div className="price-input-wrapper">
          <input
            type="text"
            className="price-input"
            value={totalPrice > 0 ? totalPrice.toLocaleString() : '0'}
            readOnly
          />
          <span className="price-currency">PKR</span>
        </div>
      </div>

      {project.showCustomAmount !== false && (
        <button
          type="button"
          className="add-other-amount-btn"
          onClick={() => {
            const amount = prompt('Enter custom amount:')
            if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
              setCustomAmount(amount)
              updateDonationData(quantity, donationType, amount)
            }
          }}
        >
          Add Other Amount
        </button>
      )}
    </div>
  )
}

export default ProjectDonationCard

