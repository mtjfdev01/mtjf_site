import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'
import './StickyQuickDonationForm.css'

// Import project icons
import health from '../../assets/img/projects/icons/health.png'
import education from '../../assets/img/projects/icons/education.png'
import cleanWater from '../../assets/img/projects/icons/clean_water.png'
import apnaghar from '../../assets/img/projects/icons/apnaghar.png'
import disasterRelief from '../../assets/img/projects/icons/disaster_relief.png'
import kasb from '../../assets/img/projects/icons/kasb.png'
import seeds from '../../assets/img/projects/icons/seeds.png'
import qurbani from '../../assets/img/projects/icons/qurbani.png'
import aaslab from '../../assets/img/projects/icons/aaslab.png'
import community from '../../assets/img/projects/icons/community.png'

const StickyQuickDonationForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { donationType, setDonationType, updateProjectDonation } = useDonation()
  const [localAmount, setLocalAmount] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState('general')
  const [message, setMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldShow, setShouldShow] = useState(true)

  // Pages where StickyQuickDonationForm should not be shown
  const hiddenPages = ['/donate', '/donation', '/checkout']
  const shouldHideOnPage = hiddenPages.some(page => 
    location.pathname === page || location.pathname.startsWith(page + '/')
  )

  // Project list - same as DonationProjectsMenu
  const projectCards = [
    { id: 'health', title: "Health", icon: health, category: "General" },
    { id: 'education', title: "Education", icon: education, category: "General" },
    { id: 'clean-water', title: "Clean Water", icon: cleanWater, category: "General" },
    { id: 'apna-ghar', title: "Apna Ghar", icon: apnaghar, category: "Sadqa" },
    { id: 'disaster-management', title: "Disaster Relief", icon: disasterRelief, category: "General" },
    { id: 'kasb-skill-development', title: "KASB Skill Development", icon: kasb, category: "Sadqa" },
    { id: 'seeds-of-change', title: "Seeds of Change", icon: seeds, category: "General" },
    { id: 'qurbani-barai-mustehqeen', title: "Qurbani Barai Mustehqeen", icon: qurbani, category: "Zakat" },
    { id: 'aas-lab-diagnostics', title: "Aaslab", icon: aaslab, category: "General" },
    { id: 'community-services', title: "Community Service", icon: community, category: "Sadqa" },
  ]

  const handleQuickDonate = () => {
    // Clear previous message
    setMessage('')

    // Validate amount
    if (!localAmount || localAmount.toString().trim() === '') {
      setMessage('⚠ Please enter a donation amount.')
      return
    }

    const numericAmount = Number(String(localAmount).trim())
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessage('⚠ Please enter a valid donation amount.')
      return
    }

    if (numericAmount < 100) {
      setMessage('⚠ Minimum donation amount is Rs. 100')
      return
    }

    // Get selected project
    const selectedProject = projectCards.find(p => p.id === selectedProjectId) || null

    // Create quick donate item
    const quickDonateItem = {
      projectId: selectedProjectId,
      initiativeId: `quick-donate-${Date.now()}`,
      projectTitle: selectedProject?.title || 'General Donation',
      initiativeTitle: null,
      initiativeSubtitle: null,
      projectIcon: selectedProject?.icon || null,
      quantity: 1,
      donationType: donationType.toUpperCase(),
      basePrice: numericAmount,
      customAmount: 0,
      totalAmount: numericAmount
    }

    // Add to projectDonations in context
    updateProjectDonation(quickDonateItem)

    // Clear the input
    setLocalAmount('')

    // Navigate to checkout
    navigate('/checkout')
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Check if donation forms are visible on screen
  useEffect(() => {
    const checkDonationForms = () => {
      const donationForms = document.querySelectorAll('.donation-form, .vertical-donation-form')
      
      if (donationForms.length === 0) {
        setShouldShow(true)
        return
      }

      // Check if any donation form is visible in viewport
      let isFormVisible = false
      
      donationForms.forEach((form) => {
        const rect = form.getBoundingClientRect()
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
        
        // Also check if form is partially visible
        const isPartiallyVisible = (
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0
        )
        
        if (isInViewport || isPartiallyVisible) {
          isFormVisible = true
        }
      })

      setShouldShow(!isFormVisible)
    }

    // Initial check
    checkDonationForms()

    // Use Intersection Observer for better performance
    const donationForms = document.querySelectorAll('.donation-form, .vertical-donation-form')
    
    if (donationForms.length === 0) {
      setShouldShow(true)
      return
    }

    const observers = []
    
    donationForms.forEach((form) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldShow(false)
            } else {
              // Check all forms again when one leaves viewport
              checkDonationForms()
            }
          })
        },
        {
          threshold: 0.1, // Trigger when 10% of form is visible
          rootMargin: '0px'
        }
      )
      
      observer.observe(form)
      observers.push(observer)
    })

    // Also listen to scroll events as fallback
    const handleScroll = () => {
      checkDonationForms()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Don't render if on hidden pages or donation forms are visible
  if (shouldHideOnPage || !shouldShow) {
    return null
  }

  return (
    <div className="sticky-quick-donation-form">
      <div className="sticky-quick-donation-form-content">
        <div className="sticky-form-row">
          <h3 
            className="sticky-quick-donation-form-title"
            onClick={toggleExpanded}
          >
            Quick Donate : &nbsp; &nbsp;
            <span className="sticky-toggle-icon">{isExpanded ? '−' : '+'}</span>
          </h3>

          {/* Project Selection */}
          <div className={`sticky-project-section ${isExpanded ? 'expanded' : ''}`}>
            <select
              className="sticky-project-select"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
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

          {/* Amount Input Section */}
          <div className={`sticky-amount-section ${isExpanded ? 'expanded' : ''}`}>
            <div className="sticky-amount-input-wrapper">
              <input
                type="number"
                min="0"
                placeholder="Amount"
                value={localAmount}
                onChange={(e) => setLocalAmount(e.target.value)}
                aria-label="Donation amount in rupees"
                className="sticky-donation-amount-input"
              />
              <span className="sticky-currency">Rs.</span>
            </div>
          </div>

          {/* Donation Type Selection */}
          <div className={`sticky-donation-type ${isExpanded ? 'expanded' : ''}`}>
            <label className={donationType === "general" ? "active" : ""}>
              <input
                type="radio"
                name="sticky-donation"
                value="general"
                checked={donationType === "general"}
                onChange={() => setDonationType("general")}
              />
              <span>General</span>
            </label>
            
            <label className={donationType === "sadqa" ? "active" : ""}>
              <input
                type="radio"
                name="sticky-donation"
                value="sadqa"
                checked={donationType === "sadqa"}
                onChange={() => setDonationType("sadqa")}
              />
              <span>Sadqa</span>
            </label>

            <label className={`sticky-zakat-label ${donationType === "zakat" ? "active" : ""}`}>
              <input
                type="radio"
                name="sticky-donation"
                value="zakat"
                checked={donationType === "zakat"}
                onChange={() => setDonationType("zakat")}
              />
              <span>Zakat</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className={`sticky-form-actions ${isExpanded ? 'expanded' : ''}`}>
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

