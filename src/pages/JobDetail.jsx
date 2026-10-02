import { useState, useEffect, useMemo, Suspense, lazy } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import JobApplyPanel from '../components/career/JobApplyPanel'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './JobDetail.css'
const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))

const COMPANY_BLURB =
  'MTJ Foundation is a non-profit organization dedicated to serving communities and making a positive impact. We are committed to creating opportunities for growth and development while maintaining the highest standards of excellence in all our endeavors.'

function toListItems(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string' && value.trim()) return [value.trim()]
  return []
}

function buildJobSections(job) {
  if (!job) return []
  const sections = []

  if (job.about) {
    sections.push({ id: 'about', title: 'About the Job', type: 'text', content: job.about })
  }

  const qualifications = toListItems(job.qualifications)
  if (qualifications.length) {
    sections.push({ id: 'qualifications', title: 'Qualifications', type: 'list', content: qualifications })
  }

  const experience = toListItems(job.experience)
  if (experience.length) {
    sections.push({ id: 'experience', title: 'Experience', type: 'list', content: experience })
  }

  const skills = toListItems(job.skills)
  if (skills.length) {
    sections.push({ id: 'skills', title: 'Skills', type: 'list', content: skills })
  }

  const responsibilities = toListItems(job.responsibilities)
  if (responsibilities.length) {
    sections.push({ id: 'responsibilities', title: 'Responsibilities', type: 'list', content: responsibilities })
  }

  return sections
}

function renderSectionBody(section) {
  if (section.type === 'list') {
    return (
      <ul className="job-detail-list">
        {section.content.map((item, index) => (
          <li key={index} className="job-detail-list-item">
            {item}
          </li>
        ))}
      </ul>
    )
  }

  return <p className="job-detail-section-text">{section.content}</p>
}

function CompanyBlurb() {
  return (
    <div className="job-detail-company-blurb">
      <h3 className="job-detail-section-title">MTJ Foundation</h3>
      <p className="job-detail-section-text">{COMPANY_BLURB}</p>
    </div>
  )
}

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [showCopiedMessage, setShowCopiedMessage] = useState(false)
  // const [showApplyForm, setShowApplyForm] = useState(false) // Commented out - form not integrated with backend yet
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')

  // First component after header - loads immediately
  const [contentRef, showContent] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  
  // Get job data from navigation state (passed when clicking job card)
  const jobFromState = location.state?.job

  const sections = useMemo(() => buildJobSections(job), [job])
  const activeSection = sections.find((section) => section.id === activeTab) || sections[0]
  const isApplyTab = activeTab === 'apply'

  useEffect(() => {
    if (activeTab === 'apply') return
    if (!sections.length) return
    if (!sections.some((section) => section.id === activeTab)) {
      setActiveTab(sections[0].id)
    }
  }, [sections, activeTab])

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
      {showCopiedMessage && (
        <div className="job-detail-toast">
          <span className="job-detail-toast-icon">✓</span>
          <span className="job-detail-toast-message">Copied to clipboard!</span>
        </div>
      )}
      <div className="job-detail-container container py-24">
        {/* First component after header - loads immediately */}
        <div ref={contentRef}>
          {showContent && (
            <>
              <div className="job-detail-header">
                <div className="job-detail-header-left">
                  <h1 className="job-detail-title">{job.title}</h1>
                  <div className="job-detail-company-info">
                    <div className="job-detail-info-item">
                      <svg className="job-detail-info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="job-detail-company-name">MTJ Foundation</span>
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
                    {job?.closing_date && (
                      <>
                        {job?.posted_date && (() => {
                          const postedDate = new Date(job.posted_date)
                          const closingDate = new Date(job.closing_date)
                          const currentDate = new Date()
                          currentDate.setHours(0, 0, 0, 0)

                          const isPostedToday = postedDate.toDateString() === currentDate.toDateString()
                          const hasClosingDatePassed = closingDate < currentDate
                          const isPostedCurrentYear = postedDate.getFullYear() === currentDate.getFullYear()
                          const isClosingPastYear = closingDate.getFullYear() < currentDate.getFullYear()

                          if ((isPostedToday && hasClosingDatePassed) || (isPostedCurrentYear && isClosingPastYear)) {
                            return null
                          }

                          return (
                            <div className="job-detail-info-item">
                              <span><b> Posted Date: </b></span>
                              <span>{postedDate.toLocaleDateString()}</span>
                            </div>
                          )
                        })()}
                        <div className="job-detail-info-item">
                          <span><b> Closing  Date: </b></span>
                          <span>{new Date(job.closing_date).toLocaleDateString()}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="job-detail-header-right">
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

        {/* Content Sections — tabs on desktop, stacked on mobile */}
        <div className="job-detail-content">
          <div className="job-detail-tabs" role="tablist" aria-label="Job details">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                role="tab"
                id={`job-tab-${section.id}`}
                aria-selected={!isApplyTab && activeSection?.id === section.id}
                aria-controls={`job-panel-${section.id}`}
                className={`job-detail-tab ${!isApplyTab && activeSection?.id === section.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(section.id)}
              >
                {section.title}
              </button>
            ))}
            <button
              type="button"
              role="tab"
              id="job-tab-apply"
              aria-selected={isApplyTab}
              aria-controls="job-panel-apply"
              className={`job-detail-tab ${isApplyTab ? 'is-active' : ''}`}
              onClick={() => setActiveTab('apply')}
            >
              Apply
            </button>
          </div>

          {!isApplyTab && activeSection && (
            <div
              className={`job-detail-tab-panel${activeSection.id === 'about' ? ' job-detail-tab-panel--about' : ''}`}
              role="tabpanel"
              id={`job-panel-${activeSection.id}`}
              aria-labelledby={`job-tab-${activeSection.id}`}
            >
              {renderSectionBody(activeSection)}
              {/* <CompanyBlurb /> */}
            </div>
          )}

          {isApplyTab && (
            <div
              className="job-detail-tab-panel job-detail-tab-panel--apply"
              role="tabpanel"
              id="job-panel-apply"
              aria-labelledby="job-tab-apply"
            >
              <JobApplyPanel jobId={job.id || id} jobTitle={job.title} />
            </div>
          )}

          <div className="job-detail-sections-mobile">
            {sections.map((section) => (
              <section key={section.id} className="job-detail-section">
                <h2 className="job-detail-section-title">{section.title}</h2>
                {renderSectionBody(section)}
                {/* <CompanyBlurb /> */}
              </section>
            ))}
            <section className="job-detail-section job-detail-section--apply">
              <h2 className="job-detail-section-title">Apply</h2>
              <JobApplyPanel jobId={job.id || id} jobTitle={job.title} />
            </section>
          </div>
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

      </div>

      {/* Rest of components */}
      <div>
        <Suspense fallback={null}>
          <Newsletter />
        </Suspense>
        <Suspense fallback={null}>
          <DonationCta />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  )
}

export default JobDetail

