import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import './DonationSidebar.css'

const DonationSidebar = ({ totalAmount, onCompleteDonation, onClearCart }) => {
  const navigate = useNavigate()

  const handleCompleteDonation = () => {
    if (onCompleteDonation) {
      onCompleteDonation()
    } else {
      navigate('/checkout')
    }
  }

  const handleClearCart = () => {
    const confirmed = window.confirm('Are you sure you want to remove your donations?')
    if (confirmed && onClearCart) {
      onClearCart()
    }
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
          <button
            className="donation-sidebar-clear-btn"
            onClick={handleClearCart}
            title="Clear all donations"
            aria-label="Clear all donations"
          >
            <FaTrash />
          </button>
        </div>
        <button
          className="donation-sidebar-button"
          onClick={handleCompleteDonation}
          disabled={totalAmount <= 0}
        >
          Complete Donation
        </button>
      </div>
    </div>
  )
}

export default DonationSidebar

