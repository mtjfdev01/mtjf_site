import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'
import { useDonation } from '../../contexts/DonationContext'
import { projectCards } from '../donation/projects_menu/DonationProjectsMenu'
import './DonationForm.css'

const QURBANI_PROJECT_IDS = ['qurbani-baraye-mustehqeen', 'qurbani']

/** When checkout reads `category`, Qurbani detail project must send `qurbani-baraye-mustehqeen`. */
const resolveCategoryForProjectId = (projectId, prevCategory, fallbackCategory) => {
  if (projectId === 'qurbani-baraye-mustehqeen') return 'qurbani-baraye-mustehqeen'
  if (prevCategory === 'qurbani-baraye-mustehqeen') return fallbackCategory
  return prevCategory
}

const QURBANI_EXCHANGE_RATES_PKR = {
  PKR: 1,
  CAD: 200,
  USD: 279,
  SAR: 74,
  AED: 76,
  GBP: 375,
  EUR: 326
}

const formatCurrency = (amount, currency) => {
  const resolvedCurrency = currency || 'PKR'
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: resolvedCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(amount) || 0)
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
  const { setDonationFormData, updateProjectDonation } = useDonation() 
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
    const fallbackCategory = defaultCategory || categoryOptions[0] || 'General'

    return {
      frequency: 'once',
      currency: initialCurrency,
      amount: firstInitiative?.price ? firstInitiative.price.toString() : '0',
      customAmount: '',
      category: resolveCategoryForProjectId(
        initialProjectId,
        fallbackCategory,
        fallbackCategory
      ),
      projectId: initialProjectId,
      projectName: defaultProjectName || initialProject?.title || initialProject?.name || '',
      initiativeId: firstInitiative?.id || '',
      initiativeName: firstInitiative?.title || '',
      templateCode: firstInitiative?.templateCode ?? projectMenuData?.templateCode ?? null,
      quantity: 1
    }
  })
  const [errorMessage, setErrorMessage] = useState('')

  const selectedProjectData = useMemo(() => {
    return projectCards.find(p => p.id === formData.projectId)
  }, [formData.projectId])

  const isQurbaniMultiCurrencyProject = QURBANI_PROJECT_IDS.includes(formData.projectId)
  const effectiveCurrency = isQurbaniMultiCurrencyProject ? formData.currency : 'PKR'
  const rate = QURBANI_EXCHANGE_RATES_PKR[effectiveCurrency] || 1
  const toDisplayAmount = (amountPKR) => {
    const n = Number(amountPKR) || 0
    if (!isQurbaniMultiCurrencyProject || effectiveCurrency === 'PKR') return Math.round(n)
    return Math.round(n / rate)
  }
  const toPKRAmount = (amountDisplay) => {
    const n = Number(amountDisplay) || 0
    if (!isQurbaniMultiCurrencyProject || effectiveCurrency === 'PKR') return Math.round(n)
    return Math.round(n * rate)
  }

  // Qurbani projects: disallow custom amount input
  useEffect(() => {
    if (!isQurbaniMultiCurrencyProject) return
    if (!formData.customAmount) return
    setFormData((prev) => ({ ...prev, customAmount: '' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQurbaniMultiCurrencyProject])

  useEffect(() => {
    if (!showProjectSelect) return

    const hasCurrent = !!formData.projectId && projects.some((p) => p.id === formData.projectId)
    if (hasCurrent) return

    const nextId = defaultProjectId || projects[0]?.id || ''
    const nextProject = projects.find((p) => p.id === nextId)
    const nextName = defaultProjectName || nextProject?.title || nextProject?.name || ''
    const fallbackCategory = defaultCategory || categoryOptions[0] || 'General'

    setFormData((prev) => ({
      ...prev,
      projectId: nextId,
      projectName: nextName,
      category: resolveCategoryForProjectId(nextId, prev.category, fallbackCategory)
    }))
  }, [showProjectSelect, projects, defaultProjectId, defaultProjectName, formData.projectId, defaultCategory, categoryOptions])

  const getDonationAmounts = (currency) =>
    mergedDonationOptions[currency] || mergedDonationOptions[initialCurrency]

  const handleAmountClick = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: '',
      quantity: 1
    }))
  }

  const handleInitiativeChange = (initiativeId) => {
    const initiative = selectedProjectData?.initiatives?.find(i => i.id === initiativeId)
    setFormData(prev => ({
      ...prev,
      initiativeId: initiativeId,
      initiativeName: initiative?.title || '',
      templateCode: initiative?.templateCode ?? selectedProjectData?.templateCode ?? null,
      amount: initiative?.price ? initiative.price.toString() : prev.amount,
      customAmount: '',
      quantity: 1
    }))
  }

  const handleIncrement = () => {
    const initiative = selectedProjectData?.initiatives?.find(i => i.id === formData.initiativeId);
    const basePrice = initiative?.price || 100;
    const newQuantity = (Number(formData.quantity) || 1) + 1
    const newAmount = basePrice > 0 ? (newQuantity * basePrice).toString() : (parseFloat(formData.amount) || 0) + basePrice

    setFormData(prev => ({
      ...prev,
      quantity: newQuantity,
      amount: newAmount,
      customAmount: ''
    }));
  };

  const handleDecrement = () => {
    const currentQty = Number(formData.quantity) || 1
    if (currentQty <= 1) return

    const initiative = selectedProjectData?.initiatives?.find(i => i.id === formData.initiativeId);
    const basePrice = initiative?.price || 100;
    const newQuantity = currentQty - 1
    const newAmount = basePrice > 0 ? (newQuantity * basePrice).toString() : Math.max(0, (parseFloat(formData.amount) || 0) - basePrice)

    setFormData(prev => ({
      ...prev,
      quantity: newQuantity,
      amount: newAmount,
      customAmount: ''
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault()
    setErrorMessage('')
    
   // [CHANGED] Strip any formatting before validation so pure numbers are used
    const finalAmount = parseCurrencyInput(
      (isQurbaniMultiCurrencyProject ? '' : formData.customAmount) || formData.amount
    )
    const usingCustomAmount =
      !isQurbaniMultiCurrencyProject &&
      !!formData.customAmount &&
      String(formData.customAmount).trim() !== ''
    
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
    const amountPKRForValidation = usingCustomAmount ? toPKRAmount(amountNumber) : Math.round(amountNumber)
    if (amountPKRForValidation < 100) {
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
    const amountPKRToStore = usingCustomAmount ? toPKRAmount(amountNumber) : Math.round(amountNumber)
    const selectedInitiative = selectedProjectData?.initiatives?.find(
      (i) => i.id === formData.initiativeId
    )
    const resolvedTemplateCode =
      selectedInitiative?.templateCode ??
      selectedProjectData?.templateCode ??
      formData.templateCode ??
      null

    const donationData = {
      ...formData,
      currency: isQurbaniMultiCurrencyProject ? 'PKR' : formData.currency,
      displayCurrency: isQurbaniMultiCurrencyProject ? formData.currency : undefined,
      amount: amountPKRToStore.toString(),
      finalAmount: amountPKRToStore.toString(),
      templateCode: resolvedTemplateCode
    }

    // Prefer projectDonations flow so checkout sends donation_items (tracking creation).
    const resolvedProjectId = formData.projectId || 'general'
    const resolvedInitiativeId =
      formData.initiativeId || `donation-form-${Date.now()}`
    const resolvedQuantity = usingCustomAmount
      ? 1
      : Math.max(1, Math.round(Number(formData.quantity) || 1))
    const projectDonationItem = {
      projectId: resolvedProjectId,
      initiativeId: resolvedInitiativeId,
      projectTitle: formData.projectName || selectedProjectData?.title || '',
      initiativeTitle: formData.initiativeName || selectedInitiative?.title || null,
      initiativeSubtitle: null,
      quantity: resolvedQuantity,
      donationType: String(
        isQurbaniMultiCurrencyProject
          ? 'qurbani-baraye-mustehqeen'
          : String(formData.category || 'GENERAL').toUpperCase()
      ),
      basePrice: resolvedQuantity > 0 ? Math.round(amountPKRToStore / resolvedQuantity) : amountPKRToStore,
      selectedPricingOptionId: null,
      selectedPricingOptionLabel: null,
      customAmount: usingCustomAmount ? amountPKRToStore : 0,
      totalAmount: amountPKRToStore,
      templateCode: resolvedTemplateCode
    }

    // Avoid double counting: clear old single-flow object.
    setDonationFormData(null)
    updateProjectDonation(projectDonationItem)

    // Call original onSubmit if provided
    onSubmit?.(donationData)

    // Navigate to checkout (context now has projectDonations)
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

            {!isQurbaniMultiCurrencyProject && (
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
            )}

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
                    const fallbackCategory =
                      defaultCategory || categoryOptions[0] || 'General'

                    setFormData((prev) => ({
                      ...prev,
                      projectId: selectedId,
                      projectName: selectedProject?.title || selectedProject?.name || '',
                      initiativeId: firstInitiative?.id || '',
                      initiativeName: firstInitiative?.title || '',
                      templateCode:
                        firstInitiative?.templateCode ?? projectMenuData?.templateCode ?? null,
                      amount: firstInitiative?.price ? firstInitiative.price.toString() : '',
                      customAmount: '',
                      quantity: 1,
                      category: resolveCategoryForProjectId(
                        selectedId,
                        prev.category,
                        fallbackCategory
                      )
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
                    currency: e.target.value
                  }))
                }
              >
                <option value="PKR">PKR</option>
                {isQurbaniMultiCurrencyProject && (
                  <>
                    <option value="CAD">CAD</option>
                    <option value="USD">USD</option>
                    <option value="SAR">SAR</option>
                    <option value="AED">AED</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                  </>
                )}
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
                          ? formatCurrency(0, effectiveCurrency)
                          : formatCurrency(toDisplayAmount(Number(formData.amount)), effectiveCurrency)
                      }
                      disabled={!!formData.customAmount || Number(formData.amount) === 0}
                    />
                    <button type="button" onClick={handleIncrement} className="donation-form-amount-btn" disabled={!!formData.customAmount}>+</button>
                    <span
                      className="donation-form-quantity-display"
                      title="Quantity"
                      aria-label={`Quantity ${Math.max(1, Math.round(Number(formData.quantity) || 1))}`}
                    >
                      {Math.max(1, Math.round(Number(formData.quantity) || 1))}
                    </span>
                  </div>
              </div>
            )}

            {!isQurbaniMultiCurrencyProject && (
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
                    const val = e.target.value
                    if (val === '' || Number(val) >= 0) {
                      setFormData((prev) => ({
                        ...prev,
                        customAmount: val,
                        amount: '0',
                        quantity: 1
                      }))
                    }
                  }}
                />
                {formData.customAmount && Number(formData.customAmount) > 0 && (
                  <small className="donation-form-amount-preview">
                    {formatCurrency(Number(formData.customAmount), effectiveCurrency)}
                  </small>
                )}
              </div>
            )}

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
