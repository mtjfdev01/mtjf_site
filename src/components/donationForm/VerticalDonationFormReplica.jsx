import { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FcDonate } from 'react-icons/fc'
import { FaHeart, FaUsers } from 'react-icons/fa'
import { useDonation } from '../../contexts/DonationContext'
import { FALLBACK_PROJECT_CARDS } from '../donation/projects_menu/DonationProjectsMenu'
import { useWebsiteDonationProjects } from '../../hooks/useWebsiteDonationProjects'
import Loader from '../Loader/Loader'
import './VerticalDonationFormReplica.css'


const REPLICA_DEFAULT_AMOUNT = 2500

const DEFAULT_DONATION_OPTIONS = {
  PKR: [5000, 10000, 25000, 50000],
  USD: [50, 100, 250, 500],
  EUR: [45, 90, 225, 450]
}

const QURBANI_PROJECT_IDS = ['qurbani-baraye-mustehqeen', 'qurbani']

/** Resolve templateCode from projectCards for checkout / API (initiative-level or project fallback). */
const resolveInitiativeTemplateCode = (projectId, initiativeId, projectCards) => {
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
  CAD: 200,
  USD: 279,
  SAR: 74,
  AED: 76,
  GBP: 375,
  EUR: 326
}

const VerticalDonationFormReplica = ({
  formId,
  initialCurrency = 'PKR',
  donationOptions = {},
  categoryOptions = ['General'],
  defaultCategory,
  showProjectSelect = false,
  projects = [],
  defaultProjectId,
  onSubmit = (data) => console.log('Donation submitted:', data),
  className = '',
  showProgressBar = true,
  progress = 15,
  donorsGoal = 250000,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, Number(progress) || 0))
  const formattedDonorsGoal = Number(donorsGoal).toLocaleString()
  const navigate = useNavigate()
  const location = useLocation()
  const projectCards = useWebsiteDonationProjects(FALLBACK_PROJECT_CARDS)
  /** API catalog first; static `projects` prop kept for later / page-specific forms. */
  const selectableProjects = useMemo(
    () => (showProjectSelect && projectCards.length ? projectCards : projects),
    [showProjectSelect, projectCards, projects]
  )
  // ✅ Only qurbani page check
  const isQurbaniPage = location.pathname.includes('qurbani')
  const showQurbaniTabs =
  location.pathname.includes('test-qurbani-baraye-mustehqeen')
  // ✅ Tabs state only for qurbani
  const [activeTab, setActiveTab] = useState('online-donation')

  const categoryOptionsToShow = useMemo(
    () => (isQurbaniPage ? ['Qurbani Baraye Mustehqeen'] : categoryOptions),
    [isQurbaniPage, categoryOptions]
  )
  const { id: urlProjectId } = useParams() // Extract project_id from URL
  const { setDonationFormData, updateProjectDonation } = useDonation()

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
    const project = projectCards?.find((p) => p.id === initialProjectId)
    const firstInitiative = project?.initiatives?.[0]

    // Determine the initial category
    // Priority: 1. prop defaultCategory, 2. project.category from cards, 3. categoryOptions[0], 4. 'General'
    let initialCategory = defaultCategory || (project && project.category) || categoryOptions[0] || 'General'

    return {
      frequency: 'monthly',
      currency: initialCurrency,
      amount: '',
      customAmount: '',
      category: initialCategory,
      // store initiative id (not title) — needed for quantity → amount linkage
      subCategory: isQurbaniInit && firstInitiative?.id ? firstInitiative.id : '',
      projectId: initialProjectId || (projectCards[0]?.id ?? ''),
      quantity: 1
    }
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsSubmitting(false)
  }, [location.pathname])

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

    // NEW Priority: If projects prop is provided (e.g. from ProjectDetail), use it.
    // This handles initiatives for projects that might not be in the global projectCards.
    if (projects && projects.length > 0 && !showProjectSelect) {
      return projects.map(i => ({
        id: i.id || i.title,
        title: i.title,
        price: i.price
      }))
    }

    // Priority 1: If we have a specific urlProjectId (detail page), use its initiatives from projectCards
    if (urlProjectId && urlProjectId !== 'general') {
      const project = projectCards?.find((p) => p.id === urlProjectId)
      if (project) {
        if (project.initiatives && project.initiatives.length > 0) {
          return project.initiatives.map(i => ({ id: i.id, title: i.title, price: i.price }))
        } else {
          return [{ id: project.id, title: project.title, price: project.price }]
        }
      }
    }

    // Priority 2: Standard category-based logic (for home/general pages)
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
  }, [formData.category, formData.projectId, isQurbaniMultiCurrencyProject, urlProjectId, projects, showProjectSelect, projectCards])

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
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQurbaniMultiCurrencyProject, filteredInitiatives])

  // Sync category with projectId (from URL or selection) or defaultCategory prop
  // Only sync when the project ID or defaultCategory prop actually changes
  const prevTargetIdRef = useRef(null)
  const prevDefaultCategoryRef = useRef(null)

  useEffect(() => {
    const targetId = urlProjectId || formData.projectId
    
    // Only proceed if targetId or defaultCategory has changed
    if (targetId === prevTargetIdRef.current && defaultCategory === prevDefaultCategoryRef.current) {
      return
    }

    if (!projectCards) return
    
    // 1. Prioritize defaultCategory if provided
    if (defaultCategory) {
      setFormData(prev => ({ ...prev, category: defaultCategory }))
    } 
    // 2. Otherwise, look up project in projectCards
    else if (targetId) {
      const project = projectCards.find(p => p.id === targetId)
      if (project && project.category) {
        setFormData(prev => ({
          ...prev,
          category: project.category
        }))
      }
    }

    prevTargetIdRef.current = targetId
    prevDefaultCategoryRef.current = defaultCategory
  }, [urlProjectId, formData.projectId, defaultCategory])

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
    let basePrice = selectedInitiative?.price || 0

    // Fallback 1: Check projectCards directly if basePrice is 0
    if (basePrice === 0 && formData.projectId) {
      const project = projectCards.find(p => p.id === formData.projectId)
      basePrice = project?.price || 0
    }

    // Fallback 1.5: Check projects prop directly if basePrice is still 0
    if (basePrice === 0 && projects && projects.length > 0) {
      const p = projects.find(i => (i.id || i.title) === formData.subCategory)
      basePrice = p?.price || 0
    }

    // Fallback 2: Derive from current amount/quantity if still 0
    if (basePrice === 0 && formData.amount && formData.quantity > 0) {
      basePrice = Math.round(Number(formData.amount) / formData.quantity)
    }

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
    let basePrice = selectedInitiative?.price || 0

    // Fallback 1: Check projectCards directly if basePrice is 0
    if (basePrice === 0 && formData.projectId) {
      const project = projectCards.find(p => p.id === formData.projectId)
      basePrice = project?.price || 0
    }

    // Fallback 1.5: Check projects prop directly if basePrice is still 0
    if (basePrice === 0 && projects && projects.length > 0) {
      const p = projects.find(i => (i.id || i.title) === formData.subCategory)
      basePrice = p?.price || 0
    }

    // Fallback 2: Derive from current amount/quantity if still 0
    if (basePrice === 0 && formData.amount && formData.quantity > 0) {
      basePrice = Math.round(Number(formData.amount) / formData.quantity)
    }

    const newQuantity = formData.quantity - 1
    const newAmount = basePrice > 0 ? (newQuantity * basePrice).toString() : formData.amount

    setFormData(prev => ({
      ...prev,
      quantity: newQuantity,
      amount: newAmount,
      customAmount: ''
    }))
  }

  const handlePresetAmountClick = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: '',
    }))
  }

  const isPresetSelected = (amount) =>
    !formData.customAmount && Number(formData.amount) === amount

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSubmitting) return

    // Clear previous error
    setErrorMessage('')

    // Calculate final amount
    const finalAmount = (isQurbaniMultiCurrencyProject ? '' : formData.customAmount) || formData.amount

    // Validate amount is selected
    if (!finalAmount || finalAmount.trim() === '') {
      setErrorMessage('Please select or enter a donation amount')
      setTimeout(() => {
        const amountInput = document.querySelector('.vertical-donation-replica-amounts') ||
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
    const templateCode = resolveInitiativeTemplateCode(projectIdToUse, formData.subCategory, projectCards)

    const usingCustomAmount =
      !isQurbaniMultiCurrencyProject &&
      !!formData.customAmount &&
      String(formData.customAmount).trim() !== ''
    const quantityStored = usingCustomAmount
      ? 1
      : Math.max(1, Math.round(Number(formData.quantity)) || 1)

    const donationData = {
      ...formData,
      currency: isQurbaniMultiCurrencyProject ? 'PKR' : formData.currency,
      displayCurrency: isQurbaniMultiCurrencyProject ? formData.currency : undefined,
      amount: isQurbaniMultiCurrencyProject ? amountPKRToStore.toString() : finalAmount,
      finalAmount: isQurbaniMultiCurrencyProject ? amountPKRToStore.toString() : finalAmount,
      templateCode,
      quantity: quantityStored
    }

    const selectedProject = projectCards?.find((p) => p.id === projectIdToUse) || null
    const selectedInitiative =
      selectedProject?.initiatives?.find((i) => i.id === formData.subCategory) || null

    const projectDonationItem = {
      projectId: projectIdToUse || 'general',
      initiativeId: formData.subCategory || `vertical-form-${Date.now()}`,
      projectTitle: selectedProject?.title || '',
      initiativeTitle: selectedInitiative?.title || null,
      initiativeSubtitle: selectedInitiative?.subtitle || null,
      quantity: quantityStored,
      donationType: String(
        isQurbaniMultiCurrencyProject
          ? 'qurbani-baraye-mustehqeen'
          : String(formData.category || 'GENERAL').toUpperCase()
      ),
      basePrice: quantityStored > 0 ? Math.round(amountPKRToStore / quantityStored) : amountPKRToStore,
      customAmount: usingCustomAmount ? amountPKRToStore : 0,
      totalAmount: amountPKRToStore,
      templateCode
    }

    // Avoid double counting: clear single-flow object and store as project donation line item.
    setDonationFormData(null)
    updateProjectDonation(projectDonationItem)

    onSubmit?.(donationData)

    const returnTo = `${location.pathname}${location.search}${location.hash || ''}`
    setIsSubmitting(true)
    navigate('/test-checkout', { state: { returnTo } })
  }

  return (
    <>
      <Loader loading={isSubmitting} />
      <div id={formId} className={`vertical-donation-replica-form ${className}`}>
      {/* =========================================
          Qurbani Tabs Only
      ========================================= */}
      {/* {isQurbaniPage && ( */}
      {showQurbaniTabs && (
        <div className="vertical-donation-replica-tabs">
          <button
            type="button"
            className={`vertical-donation-replica-tab ${activeTab === 'online-donation'
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
            className={`vertical-donation-replica-tab ${activeTab === 'other-ways'
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
      <div className="vertical-donation-replica-card">
        <div className="vertical-donation-replica-heading">
          <h3 className="vertical-donation-replica-title">
            Support with <span className="vertical-donation-replica-title-accent">Membership</span>
          </h3>
          <p className="vertical-donation-replica-subtitle">
            Join our community and help us make a lasting{' '}
            <span className="vertical-donation-replica-title-accent">impact</span> every month.
          </p>
        </div>
        {/* {(!isQurbaniPage || */}
        {(!showQurbaniTabs ||
          activeTab === 'online-donation') && (
            <form onSubmit={handleSubmit} className="vertical-donation-replica-body">
              {errorMessage && (
                <div className="vertical-donation-replica-error">
                  {errorMessage}
                </div>
              )}

              <div className="vertical-donation-replica-default-amount">
                <button
                  type="button"
                  className={`vertical-donation-replica-amount-btn vertical-donation-replica-amount-btn--primary${
                    isPresetSelected(REPLICA_DEFAULT_AMOUNT) ? ' vertical-donation-replica-amount-btn--selected' : ''
                  }`}
                  onClick={() => handlePresetAmountClick(REPLICA_DEFAULT_AMOUNT)}
                >
                  PKR {REPLICA_DEFAULT_AMOUNT.toLocaleString()}
                </button>
              </div>

              <div className="vertical-donation-replica-bottom-row">
                <input
                  type="number"
                  className="vertical-donation-replica-input"
                  placeholder="Enter Custom Amount"
                  value={formData.customAmount}
                  onChange={(e) => {
                    const customValue = e.target.value

                    if (customValue === '' || customValue === null) {
                      setFormData((prev) => ({
                        ...prev,
                        customAmount: '',
                        amount: '',
                      }))
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        customAmount: customValue,
                        amount: '0',
                      }))
                    }
                  }}
                />
                <button
                  type="submit"
                  className="vertical-donation-replica-submit btn-donate-animated"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  <span className="glow-border"></span>
                  <span className="btn-donate-content">
                    <FcDonate className="btn-donate-icon" size={20} />
                    <span>Become a Member</span>
                  </span>
                </button>
              </div>
            </form>
          )}


        {/* =========================================
          OTHER WAYS TO DONATE
      ========================================= */}
        {/* {isQurbaniPage && */}
        {showQurbaniTabs &&
          activeTab === 'other-ways' && (
            <div className="other-ways-replica-donation-card">

              <p className="other-ways-replica-section-title">Cash, Cheque, or Bank Draft</p>
              <p className="other-ways-replica-section-desc">
                Please deposit cash or a bank draft for your Qurbani amount at AAS Lab |
                Regional Offices | AAS Lab Collection Centers
              </p>

              {/* Diagnostic Center + Regional Offices — 2-col grid like Frequency/Currency */}
              <div className="other-ways-replica-inline">
                <button
                  type="button"
                  className="other-donation-replica-btn"
                  onClick={() => navigate('/diagnostic-center')}
                >
                  Diagnostic Center
                </button>
                <button
                  type="button"
                  className="other-donation-replica-btn"
                  onClick={() => navigate('/regional-offices')}
                >
                  Regional Offices
                </button>
              </div>

              {/* Section 2: Direct Bank Transfer */}
              <p className="other-ways-replica-section-title">Direct Bank Transfer</p>
              <p className="other-ways-replica-section-desc">
                You can directly deposit the Qurbani amount to the below mentioned Molana
                Tariq Jamil Foundation Faysal bank account.
              </p>

              {/* Through Bank Transfer — full width */}
              <button
                type="button"
                className="other-donation-replica-btn-full"
                onClick={() => navigate('/ways-to-donate', { state: { bankId: 'faysal-sadaqah' } })}
              >
                Through Bank Transfer
              </button>

            </div>
          )}

        {showProgressBar && (
          <div className="vertical-donation-replica-progress-section">
            <div className="vertical-donation-replica-progress">
            <div
              className="vertical-donation-replica-progress-tooltip"
              style={{ left: `${clampedProgress}%` }}
              aria-hidden="true"
            >
              {clampedProgress}%
            </div>
            <div
              className="vertical-donation-replica-progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={clampedProgress}
              aria-label="Fundraising progress"
            >
              <div
                className="vertical-donation-replica-progress-fill"
                style={{ width: `${clampedProgress}%` }}
              >
                <span className="vertical-donation-replica-progress-shine" aria-hidden="true" />
              </div>
            </div>
            <div className="vertical-donation-replica-progress-labels" aria-hidden="true">
              <span>0%</span>
              <span>100%</span>
            </div>
            </div>
            <div className="vertical-donation-replica-progress-header">
              <span className="vertical-donation-replica-progress-goal-icon" aria-hidden="true">
                <FaUsers className="vertical-donation-replica-progress-goal-users" />
                <FaHeart className="vertical-donation-replica-progress-goal-heart" />
              </span>
              <p className="vertical-donation-replica-progress-goal-text">
                {formattedDonorsGoal} Donors Goal
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default VerticalDonationFormReplica