import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'
import './VerticalDonationForm.css'

const DEFAULT_DONATION_OPTIONS = {
  PKR: [5000, 10000, 25000, 50000],
  USD: [50, 100, 250, 500],
  EUR: [45, 90, 225, 450]
}

const VerticalDonationForm = ({
  formId,
  title = 'Donate',
  initialCurrency = 'PKR',
  donationOptions = {},
  categoryOptions = ['General'],
  defaultCategory,
  showProjectSelect = false,
  projects = [],
  defaultProjectId,
  onSubmit = (data) => console.log('Donation submitted:', data),
  className = ''
}) => {
  const navigate = useNavigate()
  const { id: urlProjectId } = useParams() // Extract project_id from URL
  const { setDonationFormData } = useDonation()
  const mergedDonationOptions = useMemo(() => {
    return {
      PKR: donationOptions.PKR || DEFAULT_DONATION_OPTIONS.PKR,
      USD: donationOptions.USD || DEFAULT_DONATION_OPTIONS.USD,
      EUR: donationOptions.EUR || DEFAULT_DONATION_OPTIONS.EUR
    }
  }, [donationOptions])

  const [formData, setFormData] = useState({
    frequency: 'once',
    currency: initialCurrency,
    amount: '',
    customAmount: '',
    category: defaultCategory || categoryOptions[0] || 'General',
    projectId: urlProjectId || defaultProjectId || projects[0]?.id || ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  // Update projectId when URL changes
  useEffect(() => {
    if (urlProjectId) {
      setFormData((prev) => ({
        ...prev,
        projectId: urlProjectId
      }))
    }
  }, [urlProjectId])

  const getDonationAmounts = (currency) =>
    mergedDonationOptions[currency] || mergedDonationOptions[initialCurrency]

  const handleAmountClick = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: ''
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Clear previous error
    setErrorMessage('')
    
    // Calculate final amount
    const finalAmount = formData.customAmount || formData.amount
    
    // Validate amount is selected
    if (!finalAmount || finalAmount.trim() === '') {
      setErrorMessage('Please select or enter a donation amount')
      setTimeout(() => {
        const amountInput = document.querySelector('.vertical-donation-amounts') || 
                          document.querySelector('input[type="number"]')
        if (amountInput) {
          amountInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }
    
    // Validate amount is a valid number
    const amountNumber = Number(finalAmount)
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setErrorMessage('Please enter a valid donation amount')
      setTimeout(() => {
        const amountInput = document.querySelector('input[type="number"]')
        if (amountInput) {
          amountInput.focus()
          amountInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }
    
    // Validate minimum amount (100 PKR)
    if (amountNumber < 100) {
      setErrorMessage('Minimum donation amount is 100 PKR')
      setTimeout(() => {
        const amountInput = document.querySelector('input[type="number"]')
        if (amountInput) {
          amountInput.focus()
          amountInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }
    
    // Prepare donation data
    const donationData = {
      ...formData,
      amount: finalAmount,
      finalAmount: finalAmount
    }
    
    // Store in context
    setDonationFormData(donationData)
    
    // Call original onSubmit if provided
    onSubmit?.(donationData)
    
    // Navigate to checkout
    navigate('/checkout')
  }

  return (
    <div id={formId} className={`vertical-donation-form ${className}`}>
      <div className="vertical-donation-card">
        <h3 className="vertical-donation-title h2">{title}</h3>

        <form onSubmit={handleSubmit} className="vertical-donation-body">
          {errorMessage && (
            <div className="vertical-donation-error">
              {errorMessage}
            </div>
          )}
          <div className="vertical-donation-group">
            {/* <label className="vertical-donation-label">Donation Frequency</label> */}
            <div className="vertical-donation-frequency">
              {['once', 'monthly'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`vertical-donation-frequency-btn ${
                    formData.frequency === type ? 'active' : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, frequency: type }))
                  }
                >
                  {type === 'once' ? 'Give Once' : 'Give Monthly'}
                </button>
              ))}
            </div>
          </div>

          <div className="vertical-donation-inline">
            <div className="vertical-donation-group">
              {/* <label className="vertical-donation-label">Currency</label> */}
              <select
                className="vertical-donation-input"
                value={formData.currency}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currency: e.target.value,
                    amount: '',
                    customAmount: ''
                  }))
                }
              >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="vertical-donation-group">
              {/* <label className="vertical-donation-label">Category</label> */}
              <select
                className="vertical-donation-input"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value
                  }))
                }
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showProjectSelect && (
            <div className="vertical-donation-group">
              <label className="vertical-donation-label">Select Project</label>
              <select
                className="vertical-donation-input"
                value={formData.projectId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    projectId: e.target.value
                  }))
                }
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title || project.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="vertical-donation-group">
            <label className="vertical-donation-label">Choose Amount</label>
            <div className="vertical-donation-amounts">
              {getDonationAmounts(formData.currency).map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`vertical-donation-amount-btn ${
                    formData.amount === amount.toString() ? 'active' : ''
                  }`}
                  onClick={() => handleAmountClick(amount)}
                >
                  {amount.toLocaleString()} {formData.currency}
                </button>
              ))}
            </div>
          </div>

          <div className="vertical-donation-group">
            <label className="vertical-donation-label">
              {formData.currency} Enter an amount
            </label>
            <input
              type="number"
              className="vertical-donation-input"
              placeholder="Enter custom amount"
              value={formData.customAmount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customAmount: e.target.value,
                  amount: ''
                }))
              }
            />
          </div>

          <button type="submit" className="vertical-donation-submit">
            Donate
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerticalDonationForm

