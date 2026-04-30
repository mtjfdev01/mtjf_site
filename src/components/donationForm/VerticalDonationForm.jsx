import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams,  useLocation } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'
import { useDonation } from '../../contexts/DonationContext'
import { projectCards } from '../donation/projects_menu/DonationProjectsMenu'
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
    subCategory: '',
    projectId: urlProjectId || defaultProjectId || projects[0]?.id || '',
    quantity: 1
  })
  const [errorMessage, setErrorMessage] = useState('')

  const filteredInitiatives = useMemo(() => {
    // Ensure projectCards exists and category is selected
    if (!projectCards || !formData.category) return []

    // 1. Find projects where the category matches exactly
    // 2. OR find projects where the title matches the category name (e.g. category "Education" matches project title "Education")
    const matchingProjects = projectCards.filter(project => 
      project.category === formData.category || 
      project.title.toLowerCase() === formData.category.toLowerCase()
    )

    // Collect all initiatives from these matching projects
    const allInitiatives = matchingProjects.reduce((acc, project) => {
      if (project.initiatives && project.initiatives.length > 0) {
        // If the project has initiatives, add their titles and prices
        const titles = project.initiatives.map(i => ({ id: i.id, title: i.title, price: i.price }))
        return [...acc, ...titles]
      } else {
        // If the project has no initiatives, use the project title and price as a fallback
        return [...acc, { id: project.id, title: project.title, price: project.price }]
      }
    }, [])

    return allInitiatives
  }, [formData.category])

  // Update subCategory when category changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subCategory: ''
    }))
  }, [formData.category])

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

  const handleIncrement = () => {
    const selectedInitiative = filteredInitiatives.find(i => i.title === formData.subCategory)
    const basePrice = selectedInitiative?.price || 0
    const newQuantity = formData.quantity + 1
    const newAmount = basePrice > 0 ? (newQuantity * basePrice).toString() : formData.amount
    
    setFormData(prev => ({
      ...prev,
      quantity: newQuantity,
      amount: newAmount,
      customAmount: ''
    }))
  }

  const handleDecrement = () => {
    if (formData.quantity <= 1) return
    
    const selectedInitiative = filteredInitiatives.find(i => i.title === formData.subCategory)
    const basePrice = selectedInitiative?.price || 0
    const newQuantity = formData.quantity - 1
    const newAmount = basePrice > 0 ? (newQuantity * basePrice).toString() : formData.amount
    
    setFormData(prev => ({
      ...prev,
      quantity: newQuantity,
      amount: newAmount,
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
   const location = useLocation();

  const isQurbaniPage = location.pathname.includes('qurbani');
  const categoryOptionsToShow = isQurbaniPage
  ? ["Qurbani 2026"]
  : categoryOptions;

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

          <div className="vertical-donation-inline">
            <div className="vertical-donation-group">
              <label className="vertical-donation-label">Frequency</label>
               {isQurbaniPage ? (
          // ✅ Fixed value (no dropdown)
          <input
            type="text"
            className="vertical-donation-input"
            value="Give Once"
            readOnly
          />
        ) : (
          // ✅ Normal dropdown for other pages
          <select
            className="vertical-donation-input"
            value={formData.frequency}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                frequency: e.target.value
              }))
            }
          >
            <option value="once">Give Once</option>
            <option value="monthly">Give Monthly</option>
          </select>
        )}
            </div>

            <div className="vertical-donation-group">
              <label className="vertical-donation-label">Currency</label>
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
                {/* <option value="USD">USD</option> */}
                {/* <option value="EUR">EUR</option> */}
              </select>
            </div>
          </div>

          <div className="vertical-donation-inline">
            <div className="vertical-donation-group">
              <label className="vertical-donation-label">Category</label>
               <select
    className="vertical-donation-input"
    value={formData.category}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        category: e.target.value,
      }))
    }
  >
    {categoryOptionsToShow.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
            </div>

            {filteredInitiatives.length > 0 && (
              <div className="vertical-donation-group">
                <label className="vertical-donation-label">Sub Category</label>
                <select
                  className="vertical-donation-input"
                  value={formData.subCategory}
                  onChange={(e) => {
                    const selectedTitle = e.target.value
                    const selectedInitiative = filteredInitiatives.find(i => i.title === selectedTitle)
                    
                    setFormData((prev) => ({
                      ...prev,
                      subCategory: selectedTitle,
                      quantity: 1,
                      amount: selectedInitiative?.price ? selectedInitiative.price.toString() : prev.amount,
                      customAmount: ''
                    }))
                  }}
                >
                  {/* <option value="">Select Sub Category</option> */}
                  {filteredInitiatives.map((initiative) => (
                    <option key={initiative.id} value={initiative.title}>
                      {initiative.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {!formData.customAmount && (
            <div className="vertical-donation-inline">
              <div className="vertical-donation-group">
                <label className="vertical-donation-label">Quantity</label>
                <div className="vertical-donation-quantity-wrapper">
                  <button type="button" onClick={handleDecrement} className="vertical-donation-quantity-btn">−</button>
                  <input
                    type="number"
                    className="vertical-donation-input vertical-donation-quantity-input"
                    value={formData.quantity}
                    readOnly
                  />
                  <button type="button" onClick={handleIncrement} className="vertical-donation-quantity-btn">+</button>
                </div>
              </div>

              <div className="vertical-donation-group">
                <label className="vertical-donation-label">Amount</label>
                <input
                  type="text"
                  className="vertical-donation-input"
                  value={formData.amount ? `${formData.currency} ${Number(formData.amount).toLocaleString()}` : ''}
                  readOnly
                />
              </div>
            </div>
          )}

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
            <label className="vertical-donation-label">
              {formData.currency} Enter an amount
            </label>
            <input
              type="number"
              className="vertical-donation-input"
              placeholder="Enter custom amount"
              value={formData.customAmount}
              onChange={(e) => {
                const customValue = e.target.value
                
                // If clearing the custom amount, restore the calculated amount
                if (customValue === '' || customValue === null) {
                  const selectedInitiative = filteredInitiatives.find(i => i.title === formData.subCategory)
                  const basePrice = selectedInitiative?.price || 0
                  const restoredAmount = basePrice > 0 ? (formData.quantity * basePrice).toString() : ''
                  
                  setFormData((prev) => ({
                    ...prev,
                    customAmount: '',
                    amount: restoredAmount
                  }))
                } else {
                  // User is typing, clear the preset amount
                  setFormData((prev) => ({
                    ...prev,
                    customAmount: customValue,
                    amount: ''
                  }))
                }
              }}
            />
          </div>

          <button type="submit" className="vertical-donation-submit btn-donate-animated">
            {/* Animated background particles */}
              {/* <span className="particle particle-1"></span>
              <span className="particle particle-2"></span> */}
            {/* <span className="particle particle-3"></span> */}
            {/* <span className="particle particle-4"></span> */}
            
            {/* Glowing border */}
            <span className="glow-border"></span>
            
            {/* Button content */}
            <span className="btn-donate-content">
              <FcDonate className="btn-donate-icon" size={20} />
              <span>Donate</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerticalDonationForm

