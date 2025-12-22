import React from 'react'
import { useDonation } from '../../../contexts/DonationContext'
import './DonationProjectsMenuForm.css'

const DonationProjectsMenuForm = ({
  onQuickDonate,
  showMessage,
}) => {
  const { amount, donationType, setAmount, setDonationType } = useDonation()
  return (
    <>
      <div className="amount-section">
        <div className="amount-input-wrapper">
          <input
            type="number"
            min="0"
            placeholder="Amount (Rs.)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
        <button className="quick-donate-btn" onClick={onQuickDonate}>
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

