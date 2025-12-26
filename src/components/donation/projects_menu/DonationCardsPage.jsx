import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDonation } from '../../../contexts/DonationContext'
import PageHeader from '../../pageHeader/PageHeader'
import ProjectDonationCard from './ProjectDonationCard'
import DonationCardsFooter from './DonationCardsFooter'
import './DonationCardsPage.css'

const Footer = lazy(() => import('../../footer/Footer'))

const DonationCardsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { updateProjectDonation, projectDonations, setProjectDonationData, amount } = useDonation()
  
  const selectedProjects = location.state?.selectedProjects || []
  const [donations, setDonations] = useState([])

  useEffect(() => {
    if (selectedProjects.length === 0) {
      navigate('/donate')
      return
    }

    const allInitiatives = []
    selectedProjects.forEach(project => {
      if (project.initiatives && project.initiatives.length > 0) {
        project.initiatives.forEach(initiative => {
          allInitiatives.push({
            projectId: project.id,
            initiativeId: initiative.id,
            projectTitle: project.title,
            initiativeTitle: initiative.title,
            initiativeSubtitle: initiative.subtitle,
            projectIcon: initiative.icon || project.icon,
            quantity: 0,
            donationType: 'GENERAL',
            basePrice: initiative.price || 0,
            customAmount: 0,
            totalAmount: 0
          })
        })
      } else {
        allInitiatives.push({
          projectId: project.id,
          initiativeId: null,
          projectTitle: project.title,
          initiativeTitle: null,
          initiativeSubtitle: null,
          projectIcon: project.icon,
          quantity: 0,
          donationType: 'GENERAL',
          basePrice: project.price || 0,
          customAmount: 0,
          totalAmount: 0
        })
      }
    })
    
    setDonations(allInitiatives)
    setProjectDonationData(allInitiatives)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDonationUpdate = (updatedDonation) => {
    setDonations(prev => {
      const existingIndex = prev.findIndex(d => 
        d.projectId === updatedDonation.projectId && 
        d.initiativeId === updatedDonation.initiativeId
      )
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = updatedDonation
        updateProjectDonation(updatedDonation)
        return updated
      }
      return prev
    })
  }

  // Use amount from context (already calculated from all projectDonations)
  const totalAmount = amount || 0

  const handleDonate = () => {
    if (totalAmount <= 0) {
      alert('Please add at least one donation item')
      return
    }
    navigate('/checkout')
  }

  if (selectedProjects.length === 0) {
    return null
  }

  return (
    <>
      <PageHeader title="Donation Details" />
      <div className="donation-cards-page">
        <div className="donation-cards-container">
          <h2 className="donation-cards-title">Select Donation Details</h2>
          
          <div className="donation-cards-grid">
            {selectedProjects.map((project) => {
              if (project.initiatives && project.initiatives.length > 0) {
                return project.initiatives.map((initiative) => (
                  <ProjectDonationCard
                    key={`${project.id}-${initiative.id}`}
                    project={{
                      id: project.id,
                      initiativeId: initiative.id,
                      title: initiative.title,
                      subtitle: initiative.subtitle,
                      icon: initiative.icon || project.icon,
                      price: initiative.price
                    }}
                    onUpdate={handleDonationUpdate}
                  />
                ))
              } else {
                return (
                  <ProjectDonationCard
                    key={project.id}
                    project={project}
                    onUpdate={handleDonationUpdate}
                  />
                )
              }
            })}
          </div>

          <DonationCardsFooter
            totalAmount={totalAmount}
            onDonate={handleDonate}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default DonationCardsPage

