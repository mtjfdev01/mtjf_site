import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useDonation } from '../../../contexts/DonationContext'
import DonationProjectsMenuCard from './DonationProjectsMenuCard'
import DonationProjectsMenuForm from './DonationProjectsMenuForm'
import InitiativeDonationCard from './InitiativeDonationCard'
import DonationSidebar from './DonationSidebar'
import './DonationProjectsMenu.css'

import health from '../../../assets/img/projects/icons/health.png'
import education from '../../../assets/img/projects/icons/education.png'
import cleanWater from '../../../assets/img/projects/icons/clean_water.png'
import apnaghar from '../../../assets/img/projects/icons/apnaghar.png'
import disasterRelief from '../../../assets/img/projects/icons/disaster_relief.png'
import kasb from '../../../assets/img/projects/icons/kasb.png'
import seeds from '../../../assets/img/projects/icons/seeds.png'
import qurbani from '../../../assets/img/projects/icons/qurbani.png'
import aaslab from '../../../assets/img/projects/icons/aaslab.png'
import community from '../../../assets/img/projects/icons/community.png'
import marriageGift from '../../../assets/img/projects/marriage_gift.webp'

const DonationProjectsMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { projectId } = useParams()
  const { projectDonations, amount: totalDonationAmount, donationType, setDonationType, clearDonationData, updateProjectDonation, setRef } = useDonation()
  const [selectedProjects, setSelectedProjects] = useState([])
  const [expandedProjectId, setExpandedProjectId] = useState(null)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("General")

  const projectCards = [
    { 
      id: 'health', 
      title: "Health", 
      icon: health, 
      price: 5000, 
      new: false,
      category: "General",
      initiatives: [
        { id: 'health-patient-care', title: 'Patient Care', subtitle: 'Initiative Per Patient', price: 15000, icon: health },
        { id: 'health-medical-support', title: 'Medical Support', subtitle: 'Initiative Per Beneficiary', price: 40000, icon: health },
        { id: 'health-rehabilitation-pwds', title: 'Rehabilitation of PWDs', subtitle: 'Per Beneficiary', price: 20000, icon: health }
      ]
    },
    { 
      id: 'education', 
      title: "Education", 
      icon: education, 
      price: 3000, 
      new: false,
      category: "General",
      initiatives: [
        { id: 'education-scholarship', title: 'Scholarship', subtitle: 'Per Student/Per Month', price: 15000, icon: education },
        { id: 'education-dream-school', title: 'Dream School', subtitle: 'Per School/Per Month', price: 35000, icon: education },
        { id: 'education-hafiz', title: 'For Hafiz', subtitle: 'Per Student/Per Month', price: 5000, icon: education },
        { id: 'education-alim', title: 'For Alim', subtitle: 'Per Student/Per Month', price: 18000, icon: education }
      ]
    },
    { 
      id: 'clean-water', 
      title: "Clean Water", 
      icon: cleanWater, 
      price: 2000, 
      new: true,
      category: "General",
      initiatives: [
        { id: 'clean-water-hand-pump', title: 'Hand Pump', subtitle: 'Per Unit', price: 60000, icon: cleanWater },
        { id: 'clean-water-afridev', title: 'Afridev Community Hand Pump', subtitle: 'Per Unit', price: 125000, icon: cleanWater },
        { id: 'clean-water-filtration-plant-1', title: 'Filtration Plant', subtitle: 'Per Unit', price: 1500000, icon: cleanWater },
        { id: 'clean-water-filtration-plant-2', title: 'Filtration Plant', subtitle: 'Per Unit', price: 2500000, icon: cleanWater },
        { id: 'clean-water-solar-pump', title: 'Solar Submersible Pump', subtitle: 'Per Unit', price: 750000, icon: cleanWater },
        { id: 'clean-water-solar-turbine', title: 'Solar Submersible Pump / Turbine', subtitle: 'Per Unit', price: 1500000, icon: cleanWater }
      ]
    },
    { id: 'apna-ghar', title: "Apna Ghar", icon: apnaghar, price: 10000, new: false, category: "Sadqa", initiatives: [] },
    { id: 'disaster-management', title: "Disaster Relief", icon: disasterRelief, price: 5000, new: false, category: "General", initiatives: []     },
    { 
      id: 'kasb-skill-development', 
      title: "KASB Skill Development", 
      icon: kasb, 
      price: 4000, 
      new: false,
      category: "Sadqa",
      initiatives: [
        { id: 'kasb-empowering-woman', title: 'Empowering a Woman', subtitle: 'Per Beneficiary', price: 100000, icon: kasb }
      ]
    },
    { 
      id: 'seeds-of-change', 
      title: "Seeds of Change", 
      icon: seeds, 
      price: 2500, 
      new: false,
      category: "General",
      initiatives: [
        { id: 'seeds-of-change-plant', title: 'SEEDS OF CHANGE', subtitle: 'Per Plant', price: 750, icon: seeds }
      ]
    },
    { id: 'qurbani-barai-mustehqeen', title: "Qurbani Barai Mustehqeen", icon: qurbani, price: 15000, new: false, category: "Zakat", initiatives:[] },
    { id: 'aas-lab-diagnostics', title: "Aaslab", icon: aaslab, price: 3500, new: false, category: "General", initiatives:[] },
    { 
      id: 'community-services', 
      title: "Community Service", 
      icon: community, 
      price: 3000, 
      new: false,
      category: "Sadqa",
      initiatives: [
        { id: 'community-feed-family', title: 'Feed a Family for whole month', subtitle: 'Per Family', price: 8500, icon: community },
        { id: 'community-feed-individual', title: 'Feed an Individual', subtitle: 'Per Individual', price: 250, icon: community },
        { id: 'community-mosque-construction', title: 'Support the Construction of a Mosque', subtitle: 'Per Musala', price: 50000, icon: community }
      ]
    },
  ]

  // Set expandedProjectId from URL parameter on mount
  useEffect(() => {
    if (projectId) {
      setExpandedProjectId(projectId)
    }
  }, [projectId])

  // Extract and store ref query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const refParam = searchParams.get('ref')
    if (refParam) {
      setRef(refParam)
    }
  }, [location.search, setRef])

  const numericAmount = (val) => {
    const n = Number(String(val).trim())
    return Number.isFinite(n) ? n : NaN
  }

  const handleSelectProject = (card) => {
    // console.log('handleSelectProject called with card:', card)
    
    // If project has initiatives, expand it and hide others
    // if (card.initiatives && card.initiatives.length > 0) {
      if (expandedProjectId === card.id) {
        // If already expanded, collapse it
        setExpandedProjectId(null)
        setSelectedProjects([])
      } else {
        // Expand this project
        setExpandedProjectId(card.id)
        setSelectedProjects([card])
      }
    // } else {
    //   // Regular project without initiatives - toggle selection
    //   setExpandedProjectId(null)
    //   setSelectedProjects(prev => {
    //     console.log('Previous selectedProjects:', prev)
    //     const exists = prev.find(p => p.id === card.id)
    //     if (exists) {
    //       const filtered = prev.filter(p => p.id !== card.id)
    //       console.log('Removed card, new state:', filtered)
    //       return filtered
    //     } else {
    //       const added = [...prev, card]
    //       console.log('Added card, new state:', added)
    //       return added
    //     }
    //   })
    // }
    setMessage("")
  }

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "General") {
      return projectCards // Show all projects when General is selected
    }
    return projectCards.filter(project => project.category === selectedCategory)
  }, [selectedCategory, projectCards])

  // Use total donation amount from context (already calculated from all sources)
  // No need to calculate separately - context handles it

  const handleSubmitDonation = async (quickDonateAmountValue) => {
    // Check if this is a Quick Donate from the form (when amount is passed)
    // Use the amount passed from the form (local state)
    if (quickDonateAmountValue && quickDonateAmountValue.toString().trim() !== '') {
      const numericAmount = Number(String(quickDonateAmountValue).trim())
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        setMessage("⚠ Please enter a valid donation amount.")
        return
      }
      if (numericAmount < 100) {
        setMessage("⚠ Minimum donation amount is Rs. 100")
        return
      }
      
      // Determine project_id: expandedProject?.id or "general"
      const projectId = expandedProjectId || 'general'
      const expandedProject = expandedProjectId ? filteredProjects.find(p => p.id === expandedProjectId) : null
      
      setMessage("")
      
      // Create a unique quick donate item and add to projectDonations
      // This ensures it doesn't conflict with initiative card donations
      const quickDonateItem = {
        projectId: projectId,
        initiativeId: `quick-donate-${Date.now()}`, // Unique ID to avoid conflicts
        projectTitle: expandedProject?.title || 'General Donation',
        initiativeTitle: null,
        initiativeSubtitle: null,
        projectIcon: expandedProject?.icon || null,
        quantity: 1,
        donationType: donationType.toUpperCase(),
        basePrice: numericAmount,
        customAmount: 0,
        totalAmount: numericAmount
      }
      
      // Add to projectDonations in context (this will update the total amount)
      updateProjectDonation(quickDonateItem)
      
      // Navigate to checkout with the donation item
      navigate('/checkout')
      return
    }
    
    // Original logic for navigating to cards page
    // Prepare projects for navigation
    let projectsToNavigate = []
    
    if (expandedProjectId) {
      // If a project is expanded, use its selected initiatives
      const expandedProject = filteredProjects.find(p => p.id === expandedProjectId)
      if (expandedProject && expandedProject.initiatives) {
        // Get selected initiatives from selectedProjects
        const selectedInitiatives = selectedProjects
          .filter(p => p.parentProjectId === expandedProjectId)
          .map(p => expandedProject.initiatives.find(i => i.id === p.initiativeId))
          .filter(Boolean)
        
        if (selectedInitiatives.length > 0) {
          projectsToNavigate = [{
            ...expandedProject,
            selectedInitiatives: selectedInitiatives
          }]
        }
      }
    } else {
      // Regular projects without initiatives
      projectsToNavigate = selectedProjects.filter(p => !p.initiatives || p.initiatives.length === 0)
    }
    
    if (projectsToNavigate.length === 0) {
      setMessage("⚠ Please select at least one project or initiative.")
      return
    }

    navigate('/donate/cards', { state: { selectedProjects: projectsToNavigate } })
  }

  const handleCompleteDonation = () => {
    if (totalDonationAmount <= 0) {
      setMessage("⚠ Please add at least one donation item.")
      return
    }

    // Use projectDonations from context
    const donationsToCheckout = projectDonations.filter(donation => {
      return donation.totalAmount > 0
    })
    
    if (donationsToCheckout.length === 0) {
      setMessage("⚠ Please add at least one donation item.")
      return
    }

    // Navigate to checkout with donation data
    navigate('/checkout', { 
      state: { 
        donationItems: donationsToCheckout, 
        totalAmount: totalDonationAmount 
      } 
    })
  }

  return (
    <div className="donation-page">
      <div className="donation-content">
        <h2 className="section-title">Support a Project</h2>
        
        {/* Back Button - Show when project is expanded */}
        {expandedProjectId && (
          <button
            className="back-to-projects-btn"
            onClick={() => {
              setExpandedProjectId(null) 
              // clearDonationData()
            }}
          >
            <FaArrowLeft />
            <span>Projects Menu</span>
          </button>
        )}
        
        {/* Category Filter Buttons - Hide when project is expanded */}
        {!expandedProjectId && (
          <div className="category-filter">
            <button
              className={`category-filter-btn ${selectedCategory === "General" ? "active" : ""}`}
              onClick={() => setSelectedCategory("General")}
            >
              General
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === "Sadqa" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Sadqa")}
            >
              Sadqa
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === "Zakat" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Zakat")}
            >
              Zakat
            </button>
          </div>
        )}

        <div className="grid-section">
          {/* Hide donation form when a project is expanded */}
          {!expandedProjectId && (
            <div className="general-donation-card form-card">
              <DonationProjectsMenuForm
                onQuickDonate={handleSubmitDonation}
                showMessage={message}
              />
            </div>
          )}

          {filteredProjects.map((card) => {
            const isSelected = selectedProjects.some(p => p.id === card.id)
            const isExpanded = expandedProjectId === card.id
            const shouldShow = expandedProjectId === null || expandedProjectId === card.id
            
            // console.log('Rendering card:', card.title, 'selected:', isSelected, 'expanded:', isExpanded, 'shouldShow:', shouldShow)
            
            // Hide project card when it's expanded (only show initiatives)
            if (isExpanded) {
              return null
            }
            
            if (!shouldShow) {
              return null
            }
            
            return (
              <DonationProjectsMenuCard
                key={card.id}
                card={card}
                selected={isSelected || isExpanded}
                onSelect={handleSelectProject}
              />
            )
          })}
          
          {/* Show initiatives if a project is expanded */}
          {expandedProjectId && (() => {
            const expandedProject = filteredProjects.find(p => p.id === expandedProjectId)
            if (expandedProject && expandedProject?.initiatives.length === 0) return (
              <>
                <div className="general-donation-card form-card">
                  <DonationProjectsMenuForm
                    onQuickDonate={handleSubmitDonation}
                    showMessage={message}
                  />
                </div>
              </>
            )
            if (!expandedProject || !expandedProject.initiatives) return null

            return (
              <>
                {/* Custom Donation Form Card - First Card */}
                <div className="general-donation-card form-card">
                  <DonationProjectsMenuForm
                    onQuickDonate={handleSubmitDonation}
                    showMessage={message}
                  />
                </div>
                
                {expandedProject.initiatives.map((initiative) => {
                  const initiativeData = {
                    ...initiative,
                    parentProjectId: expandedProject.id,
                    parentProjectTitle: expandedProject.title
                  }
                  
                  return (
                    <InitiativeDonationCard
                      key={initiative.id}
                      initiative={initiativeData}
                    />
                  )
                })}
              </>
            )
          })()}
        </div>
      </div>
      {totalDonationAmount > 0 && (
        <DonationSidebar 
          onCompleteDonation={handleCompleteDonation}
        />
      )}
    </div>
  )
}

export default DonationProjectsMenu

