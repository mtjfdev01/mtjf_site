import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useDonation } from '../../../contexts/DonationContext'
import DonationProjectsMenuCard from './DonationProjectsMenuCard'
import DonationProjectsMenuForm from './DonationProjectsMenuForm'
import InitiativeDonationCard from './InitiativeDonationCard'
import DonationSidebar from './DonationSidebar'
import './DonationProjectsMenu.css'

import health from '../../../assets/img/projects/icons/MTJF_Logos/health.svg'
import education from '../../../assets/img/projects/icons/MTJF_Logos/education.svg'
import cleanWater from '../../../assets/img/projects/icons/MTJF_Logos/clean_water.svg'
import apnaghar from '../../../assets/img/projects/icons/MTJF_Logos/apnaghar.svg'
import disasterRelief from '../../../assets/img/projects/icons/MTJF_Logos/disaster_relief.svg'
import kasb from '../../../assets/img/projects/icons/MTJF_Logos/kasb.svg'
import seeds from '../../../assets/img/projects/icons/MTJF_Logos/seeds.svg'
import qurbani from '../../../assets/img/projects/icons/qurbani.png'
import aaslab from '../../../assets/img/projects/icons/MTJF_Logos/aaslab.svg'
import community from '../../../assets/img/projects/icons/MTJF_Logos/community.svg'
import marriageGift from '../../../assets/img/projects/marriage_gift.webp'

export const projectCards = [
  // {
  //   id: 'qurbani-baraye-mustehqeen', 
  //   title: "Qurbani Baraye Mustehqeen",
  //   icon: qurbani,
  //   price: 15000,
  //   new: false, 
  //   category: "Zakat", 
  //   initiatives:[
  //    {
  //      id: 'qurbani-baraye-mustehqeen-1', title: 'Cow Share', subtitle: 'Cow Share', price: 24500, icon: qurbani, templateCode: "cow_share",
  //    },
  //    {
  //      id: 'qurbani-baraye-mustehqeen-2', title: 'Full Cow', subtitle: 'Full Cow', price: 171500, icon: qurbani, templateCode: "cow",
  //    },
  //    {
  //      id: 'qurbani-baraye-mustehqeen-3', title: 'Goat', subtitle: 'Goat', price: 58000, icon: qurbani, templateCode: "goat",
  //    }
  //   ]
  //   },
    { 
      id: 'health', 
      title: "Health", 
      icon: health, 
      price: 5000, 
      new: false,
      category: "General",
      initiatives: [
        { id: 'health-patient-care', title: 'Patient Care', subtitle: 'Initiative Per Patient', price: 10000, icon: health,
          description:'The per patient cost includes consultancy fees, diagnostic tests, and the cost of medicines',
          duration: 'One time'
         },
        { id: 'health-medical-support', title: 'Medical Support', subtitle: 'Initiative Per Beneficiary', price: 40000, icon: health,
          description: 'Medical Support Initiative provides direct financial assistance — with payments made straight to partner hospitals — for deserving patients who cannot afford essential surgical procedures. This program supports a broad range of surgeries, including gynecological, orthopedic, and other critical medical interventions, ensuring that vulnerable individuals receive timely, safe, and life-enhancing treatment.',
          duration: 'One time'
        },
        { id: 'health-rehabilitation-pwds', title: 'Rehabilitation of PWDs', subtitle: 'Per Beneficiary', price: 20000, icon: health,
          description: 'This initiative focuses on restoring independence and mobility for individuals with physical disabilities or mobility impairments. By providing wheelchairs, crutches, walkers, and other mobility aids, we aim to remove the barriers that limit their access to education, healthcare, employment, and social participation.',
          duration: 'One time'
        }
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
        { id: 'education-scholarship', title: 'Scholarship', subtitle: 'Per Student/Per Month', price: 15000, icon: education,
          description: 'The monthly scholarship for deserving students encompasses various expenses, including tuition fees, accommodation, food, and stationery costs. This comprehensive support aims to alleviate the financial burden on students and ensure their continued access to education.',
          duration: 'Minimum 2-years'
        },
        { id: 'education-dream-school', title: 'Dream School', subtitle: 'Per School/Per Month', price: 35000, icon: education,
          description: 'Dream Schools is a flagship educational initiative designed to bring out-of-school and deserving children back into the learning environment. Each Dream School accommodates 40 students and provides a complete package of support including free books, uniforms, school bags, and shoes, ensuring that no child is deprived of education due to financial barriers.',
          duration: '4-Years Session'
        },
        { id: 'education-hafiz', title: 'For Hafiz', subtitle: 'Per Student/Per Month', price: 5000, icon: education,
          description: 'The monthly expenses for a Hafiz include various components such as the teacher\'s salary, operational expenses, and other essential costs associated with their education and well-being.',
          duration: '2-Years Session'
        },
        { id: 'education-alim', title: 'For Alim', subtitle: 'Per Student/Per Month', price: 18000, icon: education,
          description: 'The monthly expenses for an Alim student typically encompass fees, boarding and lodging costs, as well as food expenses. These components collectively contribute to their educational and living requirements.',
          duration: '6-Years'
        }
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
        { id: 'clean-water-hand-pump', title: 'Hand Pump', subtitle: 'Per Unit', price: 80000, icon: cleanWater,
          description: 'Projects involving hand pumps cater to varying depths of water levels to ensure access to clean water across different regions',
          duration: 'One time'
        },
        { id: 'clean-water-afridev', title: 'Afridev Community Hand Pump', subtitle: 'Per Unit', price: 125000, icon: cleanWater,
          description: 'The Afridev Community Hand Pump is highly recommended for areas with low water levels, as it is specifically designed to efficiently extract water from shallow depths.',
          duration: 'One time'
        },
        { id: 'clean-water-filtration-plant-1', title: 'Filtration Plant(without construction)', subtitle: 'Per Unit : Filtration Plant (without construction 1.5 Million)', price: 1500000, icon: cleanWater,
          description: 'This initiative will be carried out with active community participation and contributions. It encompasses all expenses related to the RO filtration plant, excluding civil construction work.',
          duration: 'One time'
        },
        { id: 'clean-water-filtration-plant-2', title: 'Filtration Plant', subtitle: 'Filtration Plant Per Unit (2.5 Million)', price: 2500000, icon: cleanWater,
          description: 'This initiative will be implemented without community participation or contributions. It covers all expenses related to the Solarized RO filtration plant (fully automated), including solar system, equipment, machinery, and civil construction work.',
          duration: 'One time'
        },
        { id: 'clean-water-solar-pump', title: 'Solar Submersible Pump', subtitle: 'Per Unit', price: 250000, icon: cleanWater,
          description: 'For plains areas, the project entails borehole drilling, installation of a submersible pump, utilization of 4 solar panels, and provision of water tanks.',
          duration: 'One time'
        },
        { id: 'clean-water-solar-turbine', title: 'Solar Submersible Pump / Turbine', subtitle: 'Per Unit', price: 500000, icon: cleanWater,
          description: 'For desert areas, the initiative comprises borehole drilling, installation of a submersible pump/turbine, construction of room, incorporation of 8 solar panels, and provision of water tanks.',
          duration: 'One time'
        }
      ]
    },
    { 
      id: 'apna-ghar',
      title: "Apna Ghar",
      icon: apnaghar, 
      price: 10000, 
      new: false, 
      category: "Sadqa",
       initiatives: [] 
      },
    { 
      id: 'disaster-management',
      title: "Gaza Relief",
      icon: disasterRelief, 
      price: 5000,
      new: false,
      category: "General",
      initiatives: []    
     },
    { 
      id: 'kasb-skill-development', 
      title: "KASB Skill Development", 
      icon: kasb, 
      price: 4000, 
      new: false,
      category: "General",
      initiatives: [
        { id: 'kasb-empowering-woman', title: 'Empowering a Woman', subtitle: 'Per Beneficiary', price: 100000, icon: kasb,
          description: 'This initiative is particularly recommended for woman-headed families to promote sustainable livelihoods.',
          duration: 'One time'
        }
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

      //    {
      //  id: 'qurbani', 
      //  title: "Qurbani 2026",
      //  icon: qurbani,
      //  price: 15000,
      //  new: false, 
      //  category: "Zakat", 
      //  initiatives:[
      //   {
      //     id: 'qurbani-1', title: 'Cow Share', subtitle: 'Cow Share', price: 24500, icon: qurbani
      //   },
      //   {
      //     id: 'qurbani-2', title: 'Full Cow', subtitle: 'Full Cow', price: 171500, icon: qurbani
      //   },
      //   {
      //     id: 'qurbani-3', title: 'Goat', subtitle: 'Goat', price: 58000, icon: qurbani
      //   }
      //  ]
      //  },
    {
       id: 'aas-lab-diagnostics', 
       title: "Aaslab",
       icon: aaslab, 
       price: 3500, 
       new: false, 
       category: "General", 
       initiatives:[]
       },
    { 
      id: 'community-services', 
      title: "Community Service", 
      icon: community, 
      price: 3000, 
      new: false,
      category: "General",
      initiatives: [
        { id: 'community-feed-family', title: 'Feed a Family for whole month', subtitle: 'Per Family', price: 8500, icon: community,
          description: 'The monthly ration for deserving families includes essential food items necessary for their sustenance. This support helps alleviate food insecurity and ensures that these families have access to nutritious meals on a regular basis.',
          duration: '1-Year'
        },
        { id: 'community-ramzan-ration', title: 'Ramadan Ration', subtitle: 'Per Family', price: 9600, icon: community,
          description: 'The monthly ration for deserving families includes essential food items necessary for their sustenance. This support helps alleviate food insecurity and ensures that these families have access to nutritious meals on a regular basis.',
          duration: 'One time'
        },
        { id: 'marriage-gift-distribution', title: 'Marriage Gift', subtitle: 'Per Benificiary', price: 150000, icon: community,
          description: 'This initiative is aimed at deserving girls whose families are unable to make arrangements for their marriage, providing them with essential support for their marital journey.',
          duration: 'One time'
        },
      ]
    },
  ]

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
  const [qurbaniCurrency, setQurbaniCurrency] = useState('PKR')

  const QURBANI_PROJECT_IDS = ['qurbani-baraye-mustehqeen', 'qurbani']
  const QURBANI_EXCHANGE_RATES_PKR = useMemo(
    () => ({
      PKR: 1,
      CAD: 200,
      USD: 279,
      SAR: 74,
      AED: 76,
      GBP: 375,
      EUR: 326
    }),
    []
  )

  const isKnownProjectId = useMemo(
    () => (projectId ? projectCards.some((p) => p.id === projectId) : false),
    [projectId]
  )

  const hasInvalidProjectInUrl = Boolean(projectId && !isKnownProjectId)

  // Sync expanded state only for project ids that exist in projectCards
  useEffect(() => {
    if (projectId && isKnownProjectId) {
      const card = projectCards.find((p) => p.id === projectId)
      setExpandedProjectId(projectId)
      if (card) setSelectedProjects([card])
    } else if (!projectId) {
      setExpandedProjectId(null)
    }
  }, [projectId, isKnownProjectId])

  // Reset currency when leaving Qurbani project
  useEffect(() => {
    if (!QURBANI_PROJECT_IDS.includes(expandedProjectId) && qurbaniCurrency !== 'PKR') {
      setQurbaniCurrency('PKR')
    }
  }, [expandedProjectId, qurbaniCurrency])

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
        navigate({ pathname: '/donate', search: location.search }, { replace: true })
      } else {
        // Expand this project
        setExpandedProjectId(card.id)
        setSelectedProjects([card])
        navigate(
          { pathname: `/donate/${card.id}`, search: location.search },
          { replace: true }
        )
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

    // if (totalDonationAmount <= 0) {
    //   setMessage("⚠ Please add at least one donation item.")
    //   return
    // }


    // Use projectDonations from context
    const donationsToCheckout = projectDonations.filter(donation => {
      return donation.totalAmount > 0
    })

    
    // if (donationsToCheckout.length === 0) {
    //   setMessage("⚠ Please add at least one donation item.")
    //   return
    // }

    

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
        
        {/* Back Button - Show when a known project is expanded */}
        {expandedProjectId && !hasInvalidProjectInUrl && (
          <button
            className="back-to-projects-btn"
            onClick={() => {
              setExpandedProjectId(null) 
              navigate({ pathname: '/donate', search: location.search }, { replace: true })
              // clearDonationData()
            }}
          >
            <FaArrowLeft />
            <span>Projects Menu</span>
          </button>
        )}
        
        {/* Category Filter Buttons - Hide when project is expanded */}
        {/* {!expandedProjectId && (
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
        )} */}

        <div className="grid-section">
          {/* Main donate page, or unknown /donate/:id — quick donate form only */}
          {(!expandedProjectId || hasInvalidProjectInUrl) && (
            <div className="general-donation-card form-card">
              <DonationProjectsMenuForm
                onQuickDonate={handleSubmitDonation}
                showMessage={message}
              />
            </div>
          )}

          {!hasInvalidProjectInUrl && filteredProjects.map((card) => {
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
          
          {/* Show initiatives if a known project is expanded */}
          {!hasInvalidProjectInUrl && expandedProjectId && (() => {
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

                {/* Currency selector (Qurbani Baraye Mustehqeen only) */}
                {/* {QURBANI_PROJECT_IDS.includes(expandedProjectId) && (
                  <div className="general-donation-card form-card">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <strong>Currency</strong>
                      <select
                        value={qurbaniCurrency}
                        onChange={(e) => setQurbaniCurrency(e.target.value)}
                        aria-label="Select currency for Qurbani prices"
                      >
                        <option value="PKR">Pakistan (PKR)</option>
                        <option value="CAD">Canadian Dollar (CAD)</option>
                        <option value="USD">American Dollar (USD)</option>
                        <option value="SAR">Saudi Riyal (SAR)</option>
                        <option value="AED">UAE Dirham (AED)</option>
                        <option value="GBP">UK Pound (GBP)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                      <span style={{ opacity: 0.8 }}>
                        Amounts will be charged in PKR at checkout.
                      </span>
                    </div>
                  </div>
                )} */}
                
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
                      displayCurrency={QURBANI_PROJECT_IDS.includes(expandedProjectId) ? qurbaniCurrency : 'PKR'}
                      exchangeRatesPKR={QURBANI_EXCHANGE_RATES_PKR}
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
          displayCurrency={QURBANI_PROJECT_IDS.includes(expandedProjectId) ? qurbaniCurrency : 'PKR'}
          exchangeRatesPKR={QURBANI_EXCHANGE_RATES_PKR}
          convertOnlyForProjectId={expandedProjectId}
        />
      )}
    </div>
  )
}

export default DonationProjectsMenu

