import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DonationProjectsMenuCard from './DonationProjectsMenuCard'
import DonationProjectsMenuForm from './DonationProjectsMenuForm'
import InitiativeDonationCard from './InitiativeDonationCard'
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
  const [amount, setAmount] = useState("")
  const [donationType, setDonationType] = useState("sadaqa")
  const [selectedProjects, setSelectedProjects] = useState([])
  const [expandedProjectId, setExpandedProjectId] = useState(null)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const projectCards = [
    { 
      id: 7, 
      title: "Health", 
      icon: health, 
      price: 5000, 
      new: false,
      initiatives: [
        { id: 'health-patient-care', title: 'Patient Care', subtitle: 'Initiative Per Patient', price: 15000, icon: health },
        { id: 'health-medical-support', title: 'Medical Support', subtitle: 'Initiative Per Beneficiary', price: 40000, icon: health },
        { id: 'health-rehabilitation-pwds', title: 'Rehabilitation of PWDs', subtitle: 'Per Beneficiary', price: 20000, icon: health }
      ]
    },
    { 
      id: 5, 
      title: "Education", 
      icon: education, 
      price: 3000, 
      new: false,
      initiatives: [
        { id: 'education-scholarship', title: 'Scholarship', subtitle: 'Per Student/Per Month', price: 15000, icon: education },
        { id: 'education-dream-school', title: 'Dream School', subtitle: 'Per School/Per Month', price: 35000, icon: education },
        { id: 'education-hafiz', title: 'For Hafiz', subtitle: 'Per Student/Per Month', price: 5000, icon: education },
        { id: 'education-alim', title: 'For Alim', subtitle: 'Per Student/Per Month', price: 18000, icon: education }
      ]
    },
    { 
      id: 2, 
      title: "Clean Water", 
      icon: cleanWater, 
      price: 2000, 
      new: true,
      initiatives: [
        { id: 'clean-water-hand-pump', title: 'Hand Pump', subtitle: 'Per Unit', price: 60000, icon: cleanWater },
        { id: 'clean-water-afridev', title: 'Afridev Community Hand Pump', subtitle: 'Per Unit', price: 125000, icon: cleanWater },
        { id: 'clean-water-filtration-plant-1', title: 'Filtration Plant', subtitle: 'Per Unit', price: 1500000, icon: cleanWater },
        { id: 'clean-water-filtration-plant-2', title: 'Filtration Plant', subtitle: 'Per Unit', price: 2500000, icon: cleanWater },
        { id: 'clean-water-solar-pump', title: 'Solar Submersible Pump', subtitle: 'Per Unit', price: 750000, icon: cleanWater },
        { id: 'clean-water-solar-turbine', title: 'Solar Submersible Pump / Turbine', subtitle: 'Per Unit', price: 1500000, icon: cleanWater }
      ]
    },
    { id: 4, title: "Apna Ghar", icon: apnaghar, price: 10000, new: false },
    { id: 1, title: "Disaster Relief", icon: disasterRelief, price: 5000, new: false },
    { 
      id: 10, 
      title: "KASB Skill Development", 
      icon: kasb, 
      price: 4000, 
      new: false,
      initiatives: [
        { id: 'kasb-empowering-woman', title: 'Empowering a Woman', subtitle: 'Per Beneficiary', price: 100000, icon: kasb }
      ]
    },
    { 
      id: 8, 
      title: "Seeds of Change", 
      icon: seeds, 
      price: 2500, 
      new: false,
      initiatives: [
        { id: 'seeds-of-change-plant', title: 'SEEDS OF CHANGE', subtitle: 'Per Plant', price: 750, icon: seeds }
      ]
    },
    { id: 3, title: "Qurbani Barai Mustehqeen", icon: qurbani, price: 15000, new: false },
    { id: 9, title: "Aaslab", icon: aaslab, price: 3500, new: false },
    { 
      id: 6, 
      title: "Community Service", 
      icon: community, 
      price: 3000, 
      new: false,
      initiatives: [
        { id: 'community-feed-family', title: 'Feed a Family for whole month', subtitle: 'Per Family', price: 8500, icon: community },
        { id: 'community-feed-individual', title: 'Feed an Individual', subtitle: 'Per Individual', price: 250, icon: community },
        { id: 'community-mosque-construction', title: 'Support the Construction of a Mosque', subtitle: 'Per Musala', price: 50000, icon: community }
      ]
    },
    { 
      id: 11, 
      title: "Marriage Gift", 
      icon: marriageGift, 
      price: 150000, 
      new: false,
      initiatives: [
        { id: 'marriage-gift-initiative', title: 'Marriage Gift', subtitle: 'Per Beneficiary', price: 150000, icon: marriageGift }
      ]
    },
  ]

  const numericAmount = (val) => {
    const n = Number(String(val).trim())
    return Number.isFinite(n) ? n : NaN
  }

  const handleSelectProject = (card) => {
    console.log('handleSelectProject called with card:', card)
    
    // If project has initiatives, expand it and hide others
    if (card.initiatives && card.initiatives.length > 0) {
      if (expandedProjectId === card.id) {
        // If already expanded, collapse it
        setExpandedProjectId(null)
        setSelectedProjects([])
      } else {
        // Expand this project
        setExpandedProjectId(card.id)
        setSelectedProjects([card])
      }
    } else {
      // Regular project without initiatives - toggle selection
      setExpandedProjectId(null)
      setSelectedProjects(prev => {
        console.log('Previous selectedProjects:', prev)
        const exists = prev.find(p => p.id === card.id)
        if (exists) {
          const filtered = prev.filter(p => p.id !== card.id)
          console.log('Removed card, new state:', filtered)
          return filtered
        } else {
          const added = [...prev, card]
          console.log('Added card, new state:', added)
          return added
        }
      })
    }
    setMessage("")
  }

  const handleSubmitDonation = async () => {
    // Prepare projects for navigation
    let projectsToNavigate = []
    
    if (expandedProjectId) {
      // If a project is expanded, use its selected initiatives
      const expandedProject = projectCards.find(p => p.id === expandedProjectId)
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

  return (
    <div className="donation-page">
      <div className="donation-content">
        <h2 className="section-title">Support a Project</h2>
        <div className="grid-section">
          {/* Hide donation form when a project is expanded */}
          {!expandedProjectId && (
            <div className="general-donation-card form-card">
              <DonationProjectsMenuForm
                amount={amount}
                setAmount={setAmount}
                donationType={donationType}
                setDonationType={setDonationType}
                onQuickDonate={handleSubmitDonation}
                showMessage={message}
              />
            </div>
          )}

          {projectCards.map((card) => {
            const isSelected = selectedProjects.some(p => p.id === card.id)
            const isExpanded = expandedProjectId === card.id
            const shouldShow = expandedProjectId === null || expandedProjectId === card.id
            
            console.log('Rendering card:', card.title, 'selected:', isSelected, 'expanded:', isExpanded, 'shouldShow:', shouldShow)
            
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
            const expandedProject = projectCards.find(p => p.id === expandedProjectId)
            if (!expandedProject || !expandedProject.initiatives) return null
            
            return expandedProject.initiatives.map((initiative) => {
              const initiativeData = {
                ...initiative,
                parentProjectId: expandedProject.id,
                parentProjectTitle: expandedProject.title
              }
              
              return (
                <InitiativeDonationCard
                  key={initiative.id}
                  initiative={initiativeData}
                  onUpdate={(donationData) => {
                    // Update selected projects with initiative donation data
                    setSelectedProjects(prev => {
                      const existingIndex = prev.findIndex(p => 
                        p.initiativeId === initiative.id && p.parentProjectId === expandedProject.id
                      )
                      
                      if (existingIndex >= 0) {
                        const updated = [...prev]
                        updated[existingIndex] = {
                          ...expandedProject,
                          ...donationData
                        }
                        return updated
                      } else {
                        return [...prev, {
                          ...expandedProject,
                          ...donationData
                        }]
                      }
                    })
                  }}
                />
              )
            })
          })()}
        </div>
      </div>
    </div>
  )
}

export default DonationProjectsMenu

