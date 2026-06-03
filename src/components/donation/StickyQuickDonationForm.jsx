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

/** Default selected project in sticky form — must exist in `projectCards` below */
const STICKY_DEFAULT_PROJECT_ID = 'qurbani-baraye-mustehqeen'

const StickyQuickDonationForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { donationType, setDonationType, updateProjectDonation } = useDonation()

  // Project list - same as DonationProjectsMenu (before state so first initiative price applies on first render)
  const projectCards = [
    // { id: 'ramzan-ration', title: "Ramadan Ration", icon: community, category: "General" },
  //   { 
  //     id: 'qurbani-baraye-mustehqeen',
  //     title: "Qurbani Baraye Mustehqeen",
  //     icon: qurbani,
  //     category: "Zakat",
  //     initiatives:[
  //               {
  //                 id: 'qurbani-baraye-mustehqeen-1', title: 'Cow Share', subtitle: 'Cow Share', price: 24500, icon: qurbani
  //               },
  //               {
  //                 id: 'qurbani-baraye-mustehqeen-2', title: 'Full Cow', subtitle: 'Full Cow', price: 171500, icon: qurbani
  //               },
  //               {
  //                 id: 'qurbani-baraye-mustehqeen-3', title: 'Goat', subtitle: 'Goat', price: 58000, icon: qurbani
  //               }
  //  ]
  //   },
    { 
      id: 'health',
      title: "Health",
      icon: health,
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
              { id: 'clean-water-filtration-plant-1', title: 'Filtration Plant', subtitle: 'Per Unit : Filtration Plant (without construction 1.5 Million)', price: 1500000, icon: cleanWater,
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
      category: "Sadqa" ,
      initiatives: [] 
    },
    { 
      id: 'gaza-relief', 
      title: "Gaza Relief",
      icon: disasterRelief,
      category: "General",
      initiatives: []
    },
    {
     id: 'kasb-skill-development',
     title: "KASB Skill Development", 
     icon: kasb,
     category: "Sadqa", 
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
       category: "General",
       initiatives: [
               { id: 'seeds-of-change-plant', title: 'SEEDS OF CHANGE', subtitle: 'Per Plant', price: 750, icon: seeds }
             ]
      },

    {
       id: 'aas-lab-diagnostics', 
       title: "Aaslab", 
       icon: aaslab,
       category: "General",
      initiatives:[]
     },
    {
     id: 'community-services',
     title: "Community Service",
     icon: community,
     category: "Sadqa",
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

  const stickyDefaultProject = projectCards.find((p) => p.id === STICKY_DEFAULT_PROJECT_ID)
  const stickyFirstInitiative = stickyDefaultProject?.initiatives?.[0]

  const [localAmount, setLocalAmount] = useState(() =>
    stickyFirstInitiative?.price != null ? String(stickyFirstInitiative.price) : '0'
  )
  /** Keeps checkout `quantity` in sync with +/- (and with typed totals that are exact multiples of unit price). */
  const [localQuantity, setLocalQuantity] = useState(1)
  const [selectedProjectId, setSelectedProjectId] = useState(STICKY_DEFAULT_PROJECT_ID)
  const [selectedInitiativeId, setSelectedInitiativeId] = useState(
    () => stickyFirstInitiative?.id ?? ''
  )
  const [customInput, setCustomInput] = useState('')
  const [message, setMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  // Pages where StickyQuickDonationForm should not be shown
  const hiddenPages = ['/donate', '/donation', '/checkout']
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

          {/* Initiative Selection */}
          {showInitiatives && (
            <div className="sticky-initiative-section">
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
            <select
              className="sticky-project-select"
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              aria-label="Select donation type"
            >
        {selectedProjectId &&
      <>
        <option value="general">General</option>
        <option value="sadqa">Sadqa</option>
        <option value="zakat">Zakat</option>
      </>
    }
            </select>
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