import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'
import { useWebsiteDonationProjects } from '../../hooks/useWebsiteDonationProjects'
import { FALLBACK_PROJECT_CARDS } from './projects_menu/DonationProjectsMenu'
import './StickyQuickDonationForm.css'

/** Default selected project in sticky form — must exist in catalog */
const STICKY_DEFAULT_PROJECT_ID = 'qurbani-baraye-mustehqeen'

const StickyQuickDonationForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { donationType, setDonationType, updateProjectDonation } = useDonation()
  const projectCards = useWebsiteDonationProjects(FALLBACK_PROJECT_CARDS)

  // const stickyFirstInitiative = stickyDefaultProject?.initiatives?.[0]

  const [localAmount, setLocalAmount] = useState(() =>
    // stickyFirstInitiative?.price != null ? String(stickyFirstInitiative.price) : '0'
    '0'
  )
  /** Keeps checkout `quantity` in sync with +/- (and with typed totals that are exact multiples of unit price). */
  const [localQuantity, setLocalQuantity] = useState(() => 1)
  const [selectedProjectId, setSelectedProjectId] = useState('general')
  const [selectedInitiativeId, setSelectedInitiativeId] = useState(null)
  const [customInput, setCustomInput] = useState('')
  const [message, setMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  // Pages where StickyQuickDonationForm should not be shown
  const hiddenPages = ['/donate', '/donation', '/checkout', '/projects-replica', '/test-checkout']
  const shouldHideOnPage = hiddenPages.some(page =>
    location.pathname === page || location.pathname.startsWith(page + '/')
  )

  const handleQuickDonate = () => {
    // Clear previous message
    setMessage('')

    // Validate amount
    const amountToValidate = customInput.trim() !== '' ? customInput : localAmount;

    if (!amountToValidate || amountToValidate.toString().trim() === '') {
      setMessage('⚠ Please enter a donation amount.');
      return;
    }

    const numericAmount = Number(String(amountToValidate).trim());
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessage('⚠ Please enter a valid donation amount.');
      return;
    }

    if (numericAmount < 100) {
      setMessage('⚠ Minimum donation amount is Rs. 100')
      return
    }

    // Get selected project
    const selectedProject = projectCards.find(p => p.id === selectedProjectId) || null
    const selectedInitiative = selectedProject?.initiatives?.find(i => i.id === selectedInitiativeId) || null

    const unitPrice = selectedInitiative?.price
    const usedCustomField = customInput.trim() !== ''
    const totalRounded = Math.round(numericAmount)
    const unitRounded = unitPrice > 0 ? Math.round(unitPrice) : 0

    let quantity = 1
    let basePrice = totalRounded
    if (!usedCustomField && unitRounded > 0 && selectedInitiative) {
      const expectedTotal = localQuantity * unitRounded
      if (totalRounded === expectedTotal) {
        quantity = localQuantity
        basePrice = unitRounded
      } else if (totalRounded >= unitRounded && totalRounded % unitRounded === 0) {
        quantity = totalRounded / unitRounded
        basePrice = unitRounded
      }
    }

    // Create quick donate item
    const quickDonateItem = {
      projectId: selectedProjectId,
      initiativeId: selectedInitiativeId || `quick-donate-${Date.now()}`,
      projectTitle: selectedProject?.title || 'General Donation',
      initiativeTitle: selectedInitiative?.title || null,
      initiativeSubtitle: selectedInitiative?.subtitle || null,
      projectIcon: selectedProject?.icon || null,
      quantity,
      donationType: donationType.toUpperCase(),
      basePrice,
      customAmount: 0,
      customField: customInput, // Added custom input field
      totalAmount: numericAmount,
      templateCode:
        selectedInitiative?.templateCode ?? selectedProject?.templateCode ?? null
    }

    // Add to projectDonations in context
    updateProjectDonation(quickDonateItem)

    // Clear the input
    setLocalAmount('0')
    setLocalQuantity(1)

    // Navigate to checkout
    navigate('/checkout')
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleIncrement = () => {
    const selectedProject = projectCards.find(p => p.id === selectedProjectId)
    const selectedInitiative = selectedProject?.initiatives?.find(i => i.id === selectedInitiativeId)
    const step = Math.round(selectedInitiative?.price || 100)
    setLocalQuantity((prev) => {
      const next = prev + 1
      setLocalAmount(String(next * step))
      return next
    })
    setCustomInput('')
  }

  const handleDecrement = () => {
    const selectedProject = projectCards.find(p => p.id === selectedProjectId)
    const selectedInitiative = selectedProject?.initiatives?.find(i => i.id === selectedInitiativeId)
    const step = Math.round(selectedInitiative?.price || 100)
    setLocalQuantity((prev) => {
      if (prev <= 1) return prev
      const next = prev - 1
      setLocalAmount(next <= 0 ? '0' : String(next * step))
      return next
    })
    setCustomInput('')
  }

  // Hide sticky form based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const donationForm = document.getElementById('home-donation-form') || document.querySelector('.donation-form');
      const footer = document.querySelector('.footer');
      
      let isVisible = false;

      if (donationForm) {
        const donationRect = donationForm.getBoundingClientRect();
        // Show if we've scrolled past the donation form
        if (donationRect.bottom < 0) {
          isVisible = true;
        }
      } else if (window.scrollY > 400) {
        // Fallback if donation form not found
        isVisible = true;
      }

      // Hide if footer is in view
      if (footer && isVisible) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
          isVisible = false;
        }
      }

      setShouldShow(isVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't render if on hidden pages
  if (shouldHideOnPage) {
    return null
  }

  const selectedProject = projectCards.find(p => p.id === selectedProjectId);
  const showInitiatives = selectedProject && selectedProject.initiatives && selectedProject.initiatives.length > 0;

  return (
    <div className={`sticky-quick-donation-form ${isExpanded ? 'expanded' : ''} ${!shouldShow ? 'hidden' : ''}`}>
      <div className="sticky-quick-donation-form-content">
        <h3 
          className="sticky-quick-donation-form-title"
          onClick={toggleExpanded}
        >
          Quick Donate : &nbsp; &nbsp;
          <span className="sticky-toggle-icon">{isExpanded ? '−' : '+'}</span>
        </h3>

        <div className={`sticky-form-row ${isExpanded ? 'expanded' : ''}`}>
          {/* Project Selection */}
          <div className="sticky-project-section">
            <div className="sticky-project-select-wrap">
              <select
                className="sticky-project-select"
                value={selectedProjectId}
                onChange={(e) => {
                  const projectId = e.target.value
                  setSelectedProjectId(projectId)
                  const project = projectCards.find(p => p.id === projectId)
                  if (project && project.initiatives && project.initiatives.length > 0) {
                    const firstInitiative = project.initiatives[0]
                    setSelectedInitiativeId(firstInitiative.id)
                    setLocalAmount(firstInitiative.price.toString())
                    setLocalQuantity(1)
                  } else {
                    setSelectedInitiativeId('')
                    setLocalAmount('0')
                    setLocalQuantity(1)
                  }
                  setCustomInput('') // Reset custom input when project changes
                }}
                aria-label="Select project"
              >
                <option value="general">General</option>
                {projectCards.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Initiative Selection */}
          {showInitiatives && (
            <div className="sticky-initiative-section">
              <div className="sticky-project-select-wrap">
                <select
                  className="sticky-project-select"
                  value={selectedInitiativeId}
                  onChange={(e) => {
                    const initiativeId = e.target.value
                    setSelectedInitiativeId(initiativeId)
                    const initiative = selectedProject.initiatives.find(i => i.id === initiativeId)
                    if (initiative) {
                      setLocalAmount(initiative.price.toString())
                      setLocalQuantity(1)
                    }
                    setCustomInput('') // Reset custom input when initiative changes
                  }}
                  aria-label="Select initiative"
                >
                  {selectedProject.initiatives.map((initiative) => (
                    <option key={initiative.id} value={initiative.id}>
                      {initiative.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Amount Input Section */}
          {showInitiatives && (
            <div className="sticky-amount-section">
              <div className="sticky-amount-input-wrapper">
                <button 
                  type="button" 
                  className="sticky-amount-btn" 
                  onClick={handleDecrement}
                  disabled={localQuantity <= 1 || customInput.trim() !== ''}
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  placeholder="Amount"
                  value={Number(localAmount) === 0 ? '0' : localAmount}
                  disabled={Number(localAmount) === 0 || customInput.trim() !== ''}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val === '' || Number(val) >= 0) {
                      setLocalAmount(val === '' ? '0' : val)
                      setCustomInput('')
                      const project = projectCards.find(p => p.id === selectedProjectId)
                      const initiative = project?.initiatives?.find(i => i.id === selectedInitiativeId)
                      const unit = initiative?.price != null ? Math.round(initiative.price) : 0
                      const total = Math.round(Number(val === '' ? 0 : val))
                      if (unit > 0 && total > 0 && total % unit === 0) {
                        setLocalQuantity(total / unit)
                      } else {
                        setLocalQuantity(1)
                      }
                    }
                  }}
                  aria-label="Donation amount in rupees"
                  className="sticky-donation-amount-input text-center"
                />
                <button 
                  type="button" 
                  className="sticky-amount-btn" 
                  onClick={handleIncrement}
                  disabled={customInput.trim() !== ''}
                >
                  +
                </button>
                <span
                  className="sticky-quantity-display"
                  title="Quantity"
                  aria-label={`Quantity ${localQuantity}`}
                >
                  {localQuantity}
                </span>
              </div>
            </div>
          )}

          {/* Custom Input Field */}
          {selectedProjectId && (
          <div className="sticky-amount-section">
            <div className="sticky-amount-input-wrapper">
              <input
                type="text"
                placeholder="Custom"
                value={customInput}
                onChange={(e) => {
                  setCustomInput(e.target.value)
                  if (e.target.value.trim() !== '') {
                    setLocalAmount('0')
                    setLocalQuantity(1)
                  }
                }}
                aria-label="Custom input"
                className="sticky-donation-amount-input"
              />
            </div>
          </div>
          )}

          {/* Donation Type Selection */}
          <div className="sticky-project-section">
            <div className="sticky-project-select-wrap">
              <select
                className="sticky-project-select"
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                aria-label="Select donation type"
              >
                {selectedProjectId && (
                  <>
                    <option value="general">General</option>
                    <option value="sadqa">Sadqa</option>
                    <option value="zakat">Zakat</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="sticky-form-actions">
            <button className="sticky-quick-donate-btn" onClick={handleQuickDonate}>
              Donate
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <p className="sticky-message">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default StickyQuickDonationForm