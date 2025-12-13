import React from 'react'
import { useNavigate } from 'react-router-dom'
import './DonationCardsFooter.css'

const DonationCardsFooter = ({ totalAmount, onDonate }) => {
  const navigate = useNavigate()

  const handlePrevious = () => {
    navigate('/donate')
  }

  const handleNext = () => {
    navigate('/checkout')
  }

  return (
    <div className="donation-cards-footer">
      <div className="donation-total">
        <span className="total-label">Total :</span>
        <span className="total-amount">{totalAmount.toLocaleString()} PKR</span>
      </div>
      
      <div className="donation-footer-actions">
        <button
          type="button"
          className="footer-btn footer-btn--previous"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="footer-btn footer-btn--next"
          onClick={handleNext}
        >
          Next
        </button>
        <button
          type="button"
          className="footer-btn footer-btn--donate"
          onClick={onDonate}
        >
          Donate
        </button>
      </div>
    </div>
  )
}

export default DonationCardsFooter

