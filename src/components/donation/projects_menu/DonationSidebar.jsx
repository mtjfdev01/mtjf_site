import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useDonation } from '../../../contexts/DonationContext'
import './DonationSidebar.css'

const DonationSidebar = ({ onCompleteDonation, showBackButton = false }) => {
  const navigate = useNavigate()
  const { projectDonations, donationData, clearDonationData } = useDonation()

  // Calculate total amount from context - support both projectDonations and donationData
  const totalAmount = useMemo(() => {
    // First check projectDonations (new flow)
    if (projectDonations.length > 0) {
      return projectDonations.reduce((total, donation) => {
        return total + (donation.totalAmount || 0)
      }, 0)
    }
    
    // Fallback to donationData (old form flow)
    if (donationData) {
      return donationData?.finalAmount || donationData?.amount || donationData?.customAmount || 0
    }
    
    return 0
  }, [projectDonations, donationData])

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

