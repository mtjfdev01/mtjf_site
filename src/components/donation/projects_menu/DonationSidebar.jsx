import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useDonation } from '../../../contexts/DonationContext'
import './DonationSidebar.css'

const DonationSidebar = ({ onCompleteDonation, showBackButton = false }) => {
  const navigate = useNavigate()
  const { amount, clearDonationData } = useDonation()

  // Use total amount from context (already calculated from all sources)
  const totalAmount = amount || 0

  const handleCompleteDonation = () => {
    if (onCompleteDonation) {
      onCompleteDonation()
    } else {
      navigate('/checkout')
    }
  }

  const handleClearCart = () => {
    const confirmed = window.confirm('Are you sure you want to remove your donations?')
    if (confirmed) {
      clearDonationData()
    }
  }

  const handleBackToDonations = () => {
    navigate('/donate')
  }

  return (
    <div className="donation-sidebar">
      <div className="donation-sidebar-content">
        <div className="donation-sidebar-header">
          <div className="donation-sidebar-total">
            <span className="total-label">Total Donation</span>
            <span className="total-amount">{totalAmount.toLocaleString()}</span>
            <span className="total-currency">PKR</span>
          </div>
          {/* {!showBackButton && ( */}
            <button
              className="donation-sidebar-clear-btn"
              onClick={handleClearCart}
              title="Clear all donations"
              aria-label="Clear all donations"
            >
              <FaTrash />
            </button>
          {/* )} */}
        </div>
        {!showBackButton && (
          <button
            className="donation-sidebar-button"
            onClick={handleCompleteDonation}
            disabled={totalAmount <= 0}
          >
            Complete Donation
          </button>
        )}
        {showBackButton && (
          <button
            className="donation-sidebar-button donation-sidebar-back-button"
            onClick={handleBackToDonations}
          >
            Back to Donations Menu
          </button>
        )}
      </div>
    </div>
  )
}

export default DonationSidebar

