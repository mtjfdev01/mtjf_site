import { useState, useEffect, Suspense, lazy } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../utils/axios'
// import ApplyForm from '../components/career/ApplyForm' // Commented out - form not integrated with backend yet
import logoBlueText from '../assets/img/logos/logo_blue_text.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import LazyImage from '../components/common/LazyImage'
import './JobDetail.css'
import PageHeader from '../components/pageHeader/PageHeader'
import JobDetailImage from '../assets/img/career/hero_career.webp'
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [showCopiedMessage, setShowCopiedMessage] = useState(false)
  // const [showApplyForm, setShowApplyForm] = useState(false) // Commented out - form not integrated with backend yet
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // First component after header - loads immediately
  const [contentRef, showContent] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });
  
  // Get job data from navigation state (passed when clicking job card)
  const jobFromState = location.state?.job

  useEffect(() => {
    // If job data was passed via navigation state, use it
    if (jobFromState) {
      setJob(jobFromState)
      setIsLoading(false)
    } else {
      // Otherwise, fetch job by ID from API
      const fetchJob = async () => {
        try {
          setIsLoading(true)
          const response = await axiosInstance.get(`/jobs/${id}`)
          console.log('Job Detail API Response:', response.data?.data)
          
          const jobData = response.data?.data
          if (jobData) {
            // Transform API data to match component structure
            const transformedJob = {
              ...jobData,
              // Create details array from API fields if needed
              details: [
                jobData.type || '',
                jobData.location || '',
                jobData.experience || ''
              ].filter(Boolean)
            }
            setJob(transformedJob)
          }
        } catch (error) {
          console.error('Error fetching job:', error)
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchJob()
    }
  }, [id, jobFromState])

  const handleShare = async () => {
    try {
      const currentUrl = window.location.href
      await navigator.clipboard.writeText(currentUrl)
      setShowCopiedMessage(true)
      setTimeout(() => {
        setShowCopiedMessage(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setShowCopiedMessage(true)
        setTimeout(() => {
          setShowCopiedMessage(false)
        }, 3000)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email)
      setShowCopiedMessage(true)
      setTimeout(() => {
        setShowCopiedMessage(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy email:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = email
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setShowCopiedMessage(true)
        setTimeout(() => {
          setShowCopiedMessage(false)
        }, 3000)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }


  if (isLoading) {
    return (
      <div className="container py-48 text-center">
        <div className="job-detail-loading">Loading job details...</div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container py-48 text-center">
        <h1>Job Not Found</h1>
        <p>The job you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/careers')} className="btn mt-24">
          Back to Careers
        </button>
      </div>
    )
  }

  return (
    <div className="job-detail-page">
      <PageHeader title={job.title} image={JobDetailImage}/>
      {showCopiedMessage && (
        <div className="job-detail-toast">
          <span className="job-detail-toast-icon">✓</span>
          <span className="job-detail-toast-message">Copied to clipboard!</span>
        </div>
      )}
      <div className="job-detail-container container py-48">
        {/* First component after header - loads immediately */}
        <div ref={contentRef}>
          {showContent && (
            <>
              {/* Header Section */}
              <div className="job-detail-header">
          <div className="job-detail-header-left">
            <h1 className="job-detail-title">{job.title}</h1>
            <div className="job-detail-company-info">
              <div className="job-detail-info-item">
                <svg className="job-detail-info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="job-detail-company-name">Molana Tariq Jamil Foundation</span>
              </div>
              <div className="job-detail-info-item">
                <svg className="job-detail-info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>{job.type}</span>
              </div>
              <div className="job-detail-info-item">
                <svg className="job-detail-info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{job.location}</span>
              </div>
            </div>
            {/* Apply button commented out - using email contact instead */}
            {/* <button 
              className="job-detail-apply-btn btn"
              onClick={() => setShowApplyForm(true)}
            >
              Apply Now
            </button> */}
          </div>
          <div className="job-detail-header-right">
            <div className="job-detail-logo">
              <LazyImage 
                src={logoBlueText} 
                alt="Molana Tariq Jamil Foundation Logo"
                className="job-detail-logo-img"
              />
            </div>
            <div className="job-detail-actions">
              <button className="job-detail-action-btn" aria-label="Save job">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button 
                className="job-detail-action-btn" 
                aria-label="Share job"
                onClick={handleShare}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="job-detail-content">
          {/* About the Job */}
          <section className="job-detail-section">
            <h2 className="job-detail-section-title">About the Job</h2>
            <p className="job-detail-section-text">{job.about}</p>
          </section>

          {/* Qualifications */}
          <section className="job-detail-section">
            <h2 className="job-detail-section-title">Qualifications  Experience & Skills</h2>
            <ul className="job-detail-list">
              {job.qualifications.map((qualification, index) => (
                <li key={index} className="job-detail-list-item">
                  {qualification}
                </li>
              ))}
            </ul>
          </section>

          {/* Responsibilities */}
          <section className="job-detail-section">
            <h2 className="job-detail-section-title">Responsibilities</h2>
            <ul className="job-detail-list">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="job-detail-list-item">
                  {responsibility}
                </li>
              ))}
            </ul>
          </section>

          {/* Company Information */}
          <section className="job-detail-section">
            <h2 className="job-detail-section-title">Molana Tariq Jamil Foundation</h2>
            <p className="job-detail-section-text">
              Molana Tariq Jamil Foundation is a non-profit organization dedicated to serving communities and making a positive impact. We are committed to creating opportunities for growth and development while maintaining the highest standards of excellence in all our endeavors.
            </p>
          </section>
        </div>
            </>
          )}
        </div>

        {/* Apply Form - Commented out, using email contact instead */}
        {/* {showApplyForm && (
          <ApplyForm 
            key={showApplyForm ? 'apply-form' : null}
            jobTitle={job.title}
            jobId={job.id || id}
            onClose={() => setShowApplyForm(false)}
            isVisible={showApplyForm}
          />
        )} */}

        {/* Email Contact Section */}
        <div className="job-detail-email-contact">
          <p className="job-detail-email-text">
            Share your CV/Resume at{' '}
            <span className="job-detail-email-wrapper">
              <a 
                href="mailto:careersmtjf@gmail.com" 
                className="job-detail-email-link"
              >
                careersmtjf@gmail.com
              </a>
              <button
                type="button"
                className="job-detail-email-copy"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCopyEmail('careersmtjf@gmail.com')
                }}
                aria-label="Copy email to clipboard"
                title="Copy email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </span>
            {' '}|{' '}
            <span className="job-detail-email-wrapper">
              <a 
                href="mailto:career@mtjfoundation.org" 
                className="job-detail-email-link"
              >
                career@mtjfoundation.org
              </a>
              <button
                type="button"
                className="job-detail-email-copy"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCopyEmail('career@mtjfoundation.org')
                }}
                aria-label="Copy email to clipboard"
                title="Copy email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </span>
          </p>
        </div>
      </div>

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <Newsletter />
            </Suspense>
            <Suspense fallback={null}>
              <DonationCta />
            </Suspense>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
      </div>
    </div>
  )
}

export default JobDetail

