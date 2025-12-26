import React, { useState } from 'react'
import { useDonation } from '../../../contexts/DonationContext'
import './DonationProjectsMenuForm.css'

const DonationProjectsMenuForm = ({
  onQuickDonate,
  showMessage,
}) => {
  const { donationType, setDonationType } = useDonation()
  // Use local state for input field - don't update context until button is clicked
  const [localAmount, setLocalAmount] = useState('')

  const handleQuickDonate = () => {
    // Pass the local amount to the parent handler
    onQuickDonate(localAmount)
    // Clear the input after submission
    setLocalAmount('')
  }

  return (
    <>
      <div className="amount-section">
        <div className="amount-input-wrapper">
          <input
            type="number"
            min="0"
            placeholder="Amount (Rs.)"
            value={localAmount}
            onChange={(e) => setLocalAmount(e.target.value)}
            aria-label="Donation amount in rupees"
            className="donation-amount-input"
          />
          <span className="currency">Rs.</span>
        </div>
      </div>

      <div className="donation-type">
      <label className={donationType === "general" ? "active" : ""}>
          <input
            type="radio"
            name="donation"
            value="general"
            checked={donationType === "general"}
            onChange={() => setDonationType("general")}
          />
          General
        </label>
        
        <label className={donationType === "sadqa" ? "active" : ""}>
          <input
            type="radio"
            name="donation"
            value="sadqa"
            checked={donationType === "sadqa"}
            onChange={() => setDonationType("sadqa")}
          />
          Sadqa
        </label>

        <label className={`zakat-label text-center ${donationType === "zakat" ? "active" : ""}`}>
          <input
            type="radio"
            name="donation"
            value="zakat"
            checked={donationType === "zakat"}
            onChange={() => setDonationType("zakat")}
          />
          Zakat
        </label>


      </div>

      <div className="form-actions">
        <button className="quick-donate-btn" onClick={handleQuickDonate}>
          Quick Donate
        </button>
      </div>

      {showMessage && (
        <p className="message">
          {showMessage}
        </p>
      )}
    </>
  )
}

export default DonationProjectsMenuForm

