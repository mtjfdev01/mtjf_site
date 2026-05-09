import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'
import { useDonation } from '../../contexts/DonationContext'
import { projectCards } from '../donation/projects_menu/DonationProjectsMenu'
import './VerticalDonationForm.css'


const DEFAULT_DONATION_OPTIONS = {
  PKR: [5000, 10000, 25000, 50000],
  USD: [50, 100, 250, 500],
  EUR: [45, 90, 225, 450]
}

const QURBANI_PROJECT_IDS = ['qurbani-baraye-mustehqeen', 'qurbani']

/** Resolve templateCode from projectCards for checkout / API (initiative-level or project fallback). */
const resolveInitiativeTemplateCode = (projectId, initiativeId) => {
  if (!projectCards?.length) return null
  if (projectId && initiativeId) {
    const project = projectCards.find((p) => p.id === projectId)
    const fromProject = project?.initiatives?.find((i) => i.id === initiativeId)
    if (fromProject) return fromProject.templateCode ?? null
  }
  if (initiativeId) {
    for (const p of projectCards) {
      const init = p.initiatives?.find((i) => i.id === initiativeId)
      if (init) return init.templateCode ?? null
    }
  }
  if (projectId) {
    return projectCards.find((p) => p.id === projectId)?.templateCode ?? null
  }
  return null
}

const QURBANI_EXCHANGE_RATES_PKR = {
  PKR: 1,
  CAD: 204,
  USD: 280,
  SAR: 74,
  AED: 76,
  GBP: 379,
  EUR: 328
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
  className = '',
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  // ✅ Only qurbani page check
  const isQurbaniPage = location.pathname.includes('qurbani')
  const showQurbaniTabs =
  location.pathname.includes('test-qurbani-baraye-mustehqeen')
  // ✅ Tabs state only for qurbani
  const [activeTab, setActiveTab] = useState('online-donation')

  const categoryOptionsToShow = useMemo(
    () => (isQurbaniPage ? ['qurbani-baraye-mustehqeen'] : categoryOptions),
    [isQurbaniPage, categoryOptions]
  )
  const { id: urlProjectId } = useParams() // Extract project_id from URL
  const { setDonationFormData } = useDonation()

  const mergedDonationOptions = useMemo(() => {
    return {
      PKR: donationOptions.PKR || DEFAULT_DONATION_OPTIONS.PKR,
      USD: donationOptions.USD || DEFAULT_DONATION_OPTIONS.USD,
      EUR: donationOptions.EUR || DEFAULT_DONATION_OPTIONS.EUR
    }
  }, [donationOptions])

  const [formData, setFormData] = useState(() => {
    const initialProjectId = urlProjectId || defaultProjectId || projects[0]?.id || ''
    const isQurbaniInit = QURBANI_PROJECT_IDS.includes(initialProjectId)
    const qurbaniProject = isQurbaniInit ? projectCards?.find((p) => p.id === initialProjectId) : null
    const firstInitiative = qurbaniProject?.initiatives?.[0]

    return {
      frequency: 'once',
      currency: initialCurrency,
      amount: isQurbaniInit && firstInitiative?.price ? String(firstInitiative.price) : '',
      customAmount: '',
      category: defaultCategory || categoryOptions[0] || 'General',
      // store initiative id (not title) — needed for quantity → amount linkage
      subCategory: isQurbaniInit && firstInitiative?.id ? firstInitiative.id : '',
      projectId: initialProjectId,
      quantity: 1
    }
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isQurbaniPage) return
    const next = categoryOptionsToShow[0]
    if (!next) return
    setFormData((prev) => (prev.category === next ? prev : { ...prev, category: next }))
  }, [isQurbaniPage, categoryOptionsToShow])



  const isQurbaniMultiCurrencyProject = QURBANI_PROJECT_IDS.includes(urlProjectId || formData.projectId)
  const rate = QURBANI_EXCHANGE_RATES_PKR[formData.currency] || 1
  const toDisplayAmount = (amountPKR) => {
    const n = Number(amountPKR) || 0
    if (!isQurbaniMultiCurrencyProject || formData.currency === 'PKR') return Math.round(n)
    return Math.round(n / rate)
  }
  const toPKRAmount = (amountDisplay) => {
    const n = Number(amountDisplay) || 0
    if (!isQurbaniMultiCurrencyProject || formData.currency === 'PKR') return Math.round(n)
    return Math.round(n * rate)
  }

  // Qurbani projects: disallow custom amount input
  useEffect(() => {
    if (!isQurbaniMultiCurrencyProject) return
    if (!formData.customAmount) return
    setFormData((prev) => ({ ...prev, customAmount: '' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQurbaniMultiCurrencyProject])

  const filteredInitiatives = useMemo(() => {
    // For Qurbani projects, ignore Category dropdown entirely and pull initiatives by project id
    if (isQurbaniMultiCurrencyProject) {
      const projectIdToUse = urlProjectId || formData.projectId
      const project = projectCards?.find((p) => p.id === projectIdToUse)
      const initiatives = project?.initiatives || []
      return initiatives.map((i) => ({ id: i.id, title: i.title, price: i.price }))
    }

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
  }, [formData.category, formData.projectId, isQurbaniMultiCurrencyProject, urlProjectId])

  useEffect(() => {
    if (isQurbaniMultiCurrencyProject) return
    if (!filteredInitiatives || filteredInitiatives.length === 0) return

    const exists = filteredInitiatives.some(
      (i) => i.id === formData.subCategory
    )

    if (exists && formData.amount) return

    const first = filteredInitiatives[0]

    setFormData((prev) => ({
      ...prev,
      subCategory: first.id,
      quantity: 1,
      amount: first.price ? first.price.toString() : '',
      customAmount: ''
    }))
  }, [filteredInitiatives, isQurbaniMultiCurrencyProject])

  // Qurbani projects: default to first initiative (Cow Share) and set PKR price so +/− works
  useEffect(() => {
    if (!isQurbaniMultiCurrencyProject) return
    if (!filteredInitiatives || filteredInitiatives.length === 0) return

    const exists = filteredInitiatives.some((i) => i.id === formData.subCategory)
    if (exists && formData.amount && String(formData.amount).trim() !== '') return

    const first = filteredInitiatives[0]
    setFormData((prev) => ({
      ...prev,
      subCategory: exists ? prev.subCategory : first.id,
      quantity: 1,
      amount: String(first.price ?? ''),
      customAmount: ''
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQurbaniMultiCurrencyProject, filteredInitiatives])

  // Update subCategory when category changes
  useEffect(() => {
    if (isQurbaniMultiCurrencyProject) return
    setFormData((prev) => ({
      ...prev,
      subCategory: ''
    }))
  }, [formData.category, isQurbaniMultiCurrencyProject])

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
    const selectedInitiative = filteredInitiatives.find(i => i.id === formData.subCategory)
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

    const selectedInitiative = filteredInitiatives.find(i => i.id === formData.subCategory)
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
    const finalAmount = (isQurbaniMultiCurrencyProject ? '' : formData.customAmount) || formData.amount

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
    // For Qurbani multi-currency mode, `formData.amount` is intentionally kept in PKR
    // (currency selection is display-only). So do NOT reconvert PKR -> PKR again.
    const amountPKRForValidation = isQurbaniMultiCurrencyProject ? Math.round(amountNumber) : toPKRAmount(amountNumber)
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
    const amountPKRToStore = isQurbaniMultiCurrencyProject ? Math.round(amountNumber) : amountNumber
    const projectIdToUse = urlProjectId || formData.projectId
    const templateCode = resolveInitiativeTemplateCode(projectIdToUse, formData.subCategory)

    const donationData = {
      ...formData,
      currency: isQurbaniMultiCurrencyProject ? 'PKR' : formData.currency,
      displayCurrency: isQurbaniMultiCurrencyProject ? formData.currency : undefined,
      amount: isQurbaniMultiCurrencyProject ? amountPKRToStore.toString() : finalAmount,
      finalAmount: isQurbaniMultiCurrencyProject ? amountPKRToStore.toString() : finalAmount,
      templateCode
    }

    // Store in context
    setDonationFormData(donationData)

    // Call original onSubmit if provided
    onSubmit?.(donationData)

    // Navigate to checkout
    const returnTo = `${location.pathname}${location.search}${location.hash || ''}`
    navigate('/checkout', { state: { returnTo } })
  }

  return (
    <div id={formId} className={`vertical-donation-form ${className}`}>
      {/* =========================================
          Qurbani Tabs Only
      ========================================= */}
      {/* {isQurbaniPage && ( */}
      {showQurbaniTabs && (
        <div className="vertical-donation-tabs">
          <button
            type="button"
            className={`vertical-donation-tab ${activeTab === 'online-donation'
              ? 'active'
              : ''
              }`}
            onClick={() =>
              setActiveTab('online-donation')
            }
          >
            Online Donation
          </button>

          <button
            type="button"
            className={`vertical-donation-tab ${activeTab === 'other-ways'
              ? 'active'
              : ''
              }`}
            onClick={() =>
              setActiveTab('other-ways')
            }
          >
            Other Ways To Donate
          </button>
        </div>
      )}
      <div className="vertical-donation-card">
        <h3 className="vertical-donation-title h2">{title}</h3>
        {/* {(!isQurbaniPage || */}
        {(!showQurbaniTabs ||
          activeTab === 'online-donation') && (
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
                        // keep PKR base price for Qurbani projects; only affects display
                        ...(isQurbaniMultiCurrencyProject ? {} : { amount: '' }),
                        customAmount: ''
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
                        category: e.target.value
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
                        const selectedId = e.target.value
                        const selectedInitiative = filteredInitiatives.find(i => i.id === selectedId)

                        setFormData((prev) => ({
                          ...prev,
                          subCategory: selectedId,
                          quantity: 1,
                          amount: selectedInitiative?.price ? selectedInitiative.price.toString() : prev.amount,
                          customAmount: ''
                        }))
                      }}
                    >
                      {/* <option value="">Select Sub Category</option> */}
                      {filteredInitiatives.map((initiative) => (
                        <option key={initiative.id} value={initiative.id}>
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
                      value={formData.amount ? `${formData.currency} ${toDisplayAmount(formData.amount).toLocaleString()}` : ''}
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

              {!isQurbaniMultiCurrencyProject && (
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
              )}

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
          )}


        {/* =========================================
          OTHER WAYS TO DONATE
      ========================================= */}
        {/* {isQurbaniPage && */}
        {showQurbaniTabs &&
          activeTab === 'other-ways' && (
            <div className="other-ways-donation-card">

              <p className="other-ways-section-title">Cash, Cheque, or Bank Draft</p>
              <p className="other-ways-section-desc">
                Please deposit cash or a bank draft for your Qurbani amount at AAS Lab |
                Regional Offices | AAS Lab Collection Centers
              </p>

              {/* Diagnostic Center + Regional Offices — 2-col grid like Frequency/Currency */}
              <div className="other-ways-inline">
                <button
                  type="button"
                  className="other-donation-btn"
                  onClick={() => navigate('/diagnostic-center')}
                >
                  Diagnostic Center
                </button>
                <button
                  type="button"
                  className="other-donation-btn"
                  onClick={() => navigate('/regional-offices')}
                >
                  Regional Offices
                </button>
              </div>

              {/* Section 2: Direct Bank Transfer */}
              <p className="other-ways-section-title">Direct Bank Transfer</p>
              <p className="other-ways-section-desc">
                You can directly deposit the Qurbani amount to the below mentioned Molana
                Tariq Jamil Foundation Faysal bank account.
              </p>

              {/* Through Bank Transfer — full width */}
              <button
                type="button"
                className="other-donation-btn-full"
                onClick={() => navigate('/ways-to-donate', { state: { bankId: 'faysal-sadaqah' } })}
              >
                Through Bank Transfer
              </button>

            </div>
          )}
      </div>
    </div>
  )
}

export default VerticalDonationForm

