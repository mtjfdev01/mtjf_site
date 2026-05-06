import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useDonation } from '../../../contexts/DonationContext'
import './DonationSidebar.css'

const DonationSidebar = ({
  onCompleteDonation,
  showBackButton = false,
  displayCurrency = 'PKR',
  exchangeRatesPKR,
  convertOnlyForProjectId
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { amount, clearDonationData } = useDonation()

  // Use total amount from context (already calculated from all sources)
  const totalAmount = amount || 0
  const shouldConvert =
    (convertOnlyForProjectId === 'qurbani-baraye-mustehqeen' || convertOnlyForProjectId === 'qurbani') &&
    displayCurrency !== 'PKR'
  const rate = (exchangeRatesPKR && exchangeRatesPKR[displayCurrency]) || 1
  const displayTotalAmount = shouldConvert ? Math.round(Number(totalAmount || 0) / rate) : Math.round(Number(totalAmount || 0))

  const currentPath = `${location.pathname}${location.search}${location.hash || ''}`
  const returnTo = location.state?.returnTo

  const handleCompleteDonation = () => {
    if (onCompleteDonation) {
      onCompleteDonation()
    } else {
      navigate('/checkout', { state: { ...(location.state || {}), returnTo: currentPath } })
    }
  }

  const handleClearCart = () => {
    const confirmed = window.confirm('Are you sure you want to remove your donations?')
    if (confirmed) {
      clearDonationData()
    }
  }

  const handleBackToDonations = () => {
    if (returnTo) {
      navigate(returnTo)
      return
    }
    navigate('/donate')
  }

  return (
    <div className="donation-sidebar">
      <div className="donation-sidebar-content">
        <div className="donation-sidebar-header">
          <div className="donation-sidebar-total">
            <span className="total-label">Total Donation</span>
            <span className="total-amount">{displayTotalAmount.toLocaleString()}</span>
            <span className="total-currency">{shouldConvert ? displayCurrency : 'PKR'}</span>
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
            // disabled={totalAmount <= 0}
          >
            Complete Donation
          </button>
        )}
        {showBackButton && (
          <button
            className="donation-sidebar-button donation-sidebar-back-button"
            onClick={handleBackToDonations}
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  )
}

export default DonationSidebar

