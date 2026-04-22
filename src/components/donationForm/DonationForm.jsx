import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'
import { useDonation } from '../../contexts/DonationContext'
import { projectCards } from '../donation/projects_menu/DonationProjectsMenu'
import './DonationForm.css'

// ─── [ADDED] Currency helpers ─────────────────────────────────────────────────
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Strips formatting so only a plain number string is sent to the API / context
const parseCurrencyInput = (value) => String(value).replace(/[^0-9.]/g, '')

const DEFAULT_DONATION_OPTIONS = {
  PKR: [5000, 10000, 25000, 50000],
  USD: [50, 100, 250, 500],
  EUR: [45, 90, 225, 450]
}

const DonationForm = ({
  formId,
  title = 'Donate',
  initialCurrency = 'PKR',
  donationOptions = {},
  categoryOptions = ['General', 'Sadqa', 'Zakat'],
  defaultCategory,
  showProjectSelect = false,
  projects = [],
  defaultProjectId,
  defaultProjectName,
  onSubmit = (data) => console.log('Donation submitted:', data),
  layout = 'vertical',
  className = ''
}) => {
  const navigate = useNavigate()
  const { setDonationFormData } = useDonation() 
  const mergedDonationOptions = useMemo(() => {
    return {
      PKR: donationOptions.PKR || DEFAULT_DONATION_OPTIONS.PKR,
      USD: donationOptions.USD || DEFAULT_DONATION_OPTIONS.USD,
      EUR: donationOptions.EUR || DEFAULT_DONATION_OPTIONS.EUR
    }
  }, [donationOptions])

  const [formData, setFormData] = useState(() => {
    const initialProjectId = defaultProjectId || projects[0]?.id || ''
    const initialProject = projects.find(p => p.id === initialProjectId)
    const projectMenuData = projectCards.find(p => p.id === initialProjectId)
    const firstInitiative = projectMenuData?.initiatives?.[0]

    return {
      frequency: 'once',
      currency: initialCurrency,
      amount: firstInitiative?.price ? firstInitiative.price.toString() : '0',
      customAmount: '',
      category: defaultCategory || categoryOptions[0] || 'General',
      projectId: initialProjectId,
      projectName: defaultProjectName || initialProject?.title || initialProject?.name || '',
      initiativeId: firstInitiative?.id || '',
      initiativeName: firstInitiative?.title || ''
    }
  })
  const [errorMessage, setErrorMessage] = useState('')

  const selectedProjectData = useMemo(() => {
    return projectCards.find(p => p.id === formData.projectId)
  }, [formData.projectId])

  useEffect(() => {
    if (!showProjectSelect) return

    const hasCurrent = !!formData.projectId && projects.some((p) => p.id === formData.projectId)
    if (hasCurrent) return

    const nextId = defaultProjectId || projects[0]?.id || ''
    const nextProject = projects.find((p) => p.id === nextId)
    const nextName = defaultProjectName || nextProject?.title || nextProject?.name || ''

    setFormData((prev) => ({
      ...prev,
      projectId: nextId,
      projectName: nextName
    }))
  }, [showProjectSelect, projects, defaultProjectId, defaultProjectName, formData.projectId])

  const getDonationAmounts = (currency) =>
    mergedDonationOptions[currency] || mergedDonationOptions[initialCurrency]

  const handleAmountClick = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: ''
    }))
  }

  const handleInitiativeChange = (initiativeId) => {
    const initiative = selectedProjectData?.initiatives?.find(i => i.id === initiativeId)
    setFormData(prev => ({
      ...prev,
      initiativeId: initiativeId,
      initiativeName: initiative?.title || '',
      amount: initiative?.price ? initiative.price.toString() : prev.amount,
      customAmount: ''
    }))
  }

  const handleIncrement = () => {
    const currentAmount = parseFloat(formData.amount) || 0;
    const initiative = selectedProjectData?.initiatives?.find(i => i.id === formData.initiativeId);
    const step = initiative?.price || 100; // Default step to 100 if price not found
    setFormData(prev => ({
      ...prev,
      amount: (currentAmount + step).toString(),
      customAmount: ''
    }));
  };

  const handleDecrement = () => {
    const currentAmount = parseFloat(formData.amount) || 0;
    const initiative = selectedProjectData?.initiatives?.find(i => i.id === formData.initiativeId);
    const step = initiative?.price || 100;
    const newAmount = currentAmount - step;
    setFormData(prev => ({
      ...prev,
      amount: (newAmount > 0 ? newAmount : 0).toString(), // Prevent negative values
      customAmount: ''
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault()
    setErrorMessage('')
    
   // [CHANGED] Strip any formatting before validation so pure numbers are used
    const finalAmount = parseCurrencyInput(formData.customAmount || formData.amount)
    
    // Validate amount is selected
    if (!finalAmount || finalAmount.trim() === '') {
      setErrorMessage('Please select or enter a donation amount')
      setTimeout(() => {
        const amountInput = document.querySelector('.donation-form-amounts') || 
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
    <div
      id={formId}
      className={`donation-form donation-form--${layout} ${className} mt-32 mb-32`} 
    >
      <div className="donation-form-card">
        <h3 className="donation-form-title h2">{title}</h3>

        <form onSubmit={handleSubmit} className="donation-form-body">
          {errorMessage && (
            <div className="donation-form-error">
              {errorMessage}
            </div>
          )}
          {/* First Row: Frequency, Category, Project, Sub-Project */}
          <div className="donation-form-row">
            <div className="donation-form-group donation-form-frequency-group">
              <label className="donation-form-label">Frequency</label>
              <select
                className="donation-form-input"
                value={formData.frequency}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, frequency: e.target.value }))
                }
              >
                <option value="once">Give Once</option>
                <option value="monthly">Give Monthly</option>
              </select>
            </div>

            <div className="donation-form-group donation-form-category">
              <label className="donation-form-label">Category</label>
              <select
                className="donation-form-input"
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

            {showProjectSelect && (
              <div className="donation-form-group">
                <label className="donation-form-label">Projects</label>
                <select
                  className="donation-form-input"
                  value={formData.projectId}
                  onChange={(e) => {
                    const selectedId = e.target.value
                    const selectedProject = projects.find((p) => p.id === selectedId)
                    
                    // Find the first initiative for this project from projectCards
                    const projectMenuData = projectCards.find(p => p.id === selectedId)
                    const firstInitiative = projectMenuData?.initiatives?.[0]
                    
                    setFormData((prev) => ({
                      ...prev,
                      projectId: selectedId,
                      projectName: selectedProject?.title || selectedProject?.name || '',
                      initiativeId: firstInitiative?.id || '',
                      initiativeName: firstInitiative?.title || '',
                      amount: firstInitiative?.price ? firstInitiative.price.toString() : '',
                      customAmount: ''
                    }))
                  }
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

            {selectedProjectData?.initiatives?.length > 0 && (
              <div className="donation-form-group">
                <label className="donation-form-label">Sub Project</label>
                <select
                  className="donation-form-input"
                  value={formData.initiativeId}
                  onChange={(e) => handleInitiativeChange(e.target.value)}
                >
                  {selectedProjectData?.initiatives?.map((initiative) => (
                    <option key={initiative.id} value={initiative.id}>
                      {initiative.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Second Row: Currency, PKR Amount, Custom Amount, Donate Button */}
          <div className="donation-form-row mt-24">
            <div className="donation-form-group donation-form-currency">
              <label className="donation-form-label">Currency</label>
              <select
                className="donation-form-input"
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
                {/* <option value="USD">USD</option>
                <option value="EUR">EUR</option> */}
              </select>
            </div>

            {formData.initiativeId && (
              <div className="donation-form-group">
                <label className="donation-form-label">
                    {formData.currency} Currency
                  </label>
                  <div className="donation-form-amount-wrapper">
                    <button type="button" onClick={handleDecrement} className="donation-form-amount-btn" disabled={!!formData.customAmount || Number(formData.amount) <= 0}>-</button>
                    {/* [CHANGED] type="text" + readOnly to display formatted value.
                        formData.amount stays a plain number string — no logic changed. */}
                    <input
                      type="text"
                      readOnly
                      className="donation-form-input no-spinner"
                      placeholder="Enter amount"
                      value={
                        !!formData.customAmount || Number(formData.amount) === 0
                          ? formatCurrency(0)
                          : formatCurrency(Number(formData.amount))
                      }
                      disabled={!!formData.customAmount || Number(formData.amount) === 0}
                    />
                    <button type="button" onClick={handleIncrement} className="donation-form-amount-btn" disabled={!!formData.customAmount}>+</button>
                  </div>
              </div>
            )}

             <div className="donation-form-group">
              <label className="donation-form-label">
                {formData.currency} Custom Amount
              </label>
              <input
                type="number"
                className="donation-form-input no-spinner"
                placeholder="Enter custom amount"
                value={formData.customAmount}
                min="0"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || Number(val) >= 0) {
                    setFormData((prev) => ({
                      ...prev,
                      customAmount: val,
                      amount: '0'
                    }))
                  }
                }}
              />
              {/* [ADDED] Formatted preview shown below custom amount while typing */}
              {formData.customAmount && Number(formData.customAmount) > 0 && (
                <small className="donation-form-amount-preview">
                  {formatCurrency(Number(formData.customAmount))}
                </small>
              )}
            </div>

            <div className="donation-form-group">
              <label className="donation-form-label">&nbsp;</label>
              <button type="submit" className="donation-form-submit btn--alert btn-donate-animated" style={{ width: '100%', minWidth: 'auto' }}>
                {/* Animated background particles */}

                {/* <span className="particle particle-3"></span> */}
                {/* <span className="particle particle-4"></span> */}
                
                {/* Glowing border */}
                <span className="glow-border"></span>
                
                {/* Button content */}
                <span className="btn-donate-content text-center">
                  <FcDonate className="btn-donate-icon" size={20} />
                  <span>Donate</span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonationForm
