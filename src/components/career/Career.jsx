import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'

import './Careers.css'
import iconB from '../../assets/img/career//B.webp'

const LOCATION_KEYWORDS = ['lahore', 'tulamba', 'multan', 'faisalabad', 'head office']

const Career = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    department: '',
    type: '',
    location: ''
  })
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get('/jobs')
        console.log('Jobs API Response:', response.data?.data?.jobs)
        
        // Transform API data to match component structure
        const transformedJobs = (response.data?.data?.jobs || []).map(job => ({
          ...job,
          // Create details array from API fields (type, location, experience)
          details: [
            job.type || '',
            job.location || '',
            job.experience || ''
          ].filter(Boolean), // Remove empty strings
          // Handle icon path - use the icon from API or fallback
          icon: job.icon || iconB
        }))
        
        setJobs(transformedJobs)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setJobs([]) // Set empty array on error
      } finally {
        setIsLoading(false) // Set loading to false after API call completes
      }
    }

    fetchJobs()
  }, [])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleApplyFilters = () => {
    // Filter logic would go here
    console.log('Applying filters:', filters)
  }

  const handleJobCardClick = (job) => {
    // Navigate to job detail page and pass the job data via state
    navigate(`/careers/${job.id}`, { state: { job } })
  }

  return (
    <div className="careers-page">
      <div className="careers-container container py-48">
        {/* Header */}
      <div className="careers-header mb-48">
        <div className="careers-heading">
          <h2 className="heading-secondary">Career</h2>
        </div>
        <h2 className='mt-0'>
          Current Openings
        </h2>
      </div>
        {/* Filter Section */}
        <div className="careers-filters mb-48">
          <div className="careers-filter-selects">
            <select
              className="careers-filter-select"
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
            >
              <option value="">Department</option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
              <option value="operations">Operations</option>
            </select>

            <select
              className="careers-filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>

            <select
              className="careers-filter-select"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">Location</option>
              <option value="lahore">Lahore</option>
              <option value="tulamba">Head Office Tulamba</option>
              <option value="multan">Multan</option>
              <option value="faisalabad">Faisalabad</option>
            </select>
          </div>
          <button className="careers-apply-btn btn" onClick={handleApplyFilters}>
            Apply
          </button>
        </div>

        {/* Job Listings Grid */}
        <div className="careers-jobs-grid">
          {isLoading ? (
            <div className="careers-jobs-grid-empty">Loading jobs...</div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div 
                key={job.id} 
                className="careers-job-card card"
                onClick={() => handleJobCardClick(job)}
              >
                <div className="careers-job-card-content">
                  <div className="careers-job-main">
                    <div className="careers-job-icon">
                      <img src={job?.icon} alt={`${job.title} icon`} />
                    </div>
                    <div className="careers-job-info">
                      <h3 className="careers-job-title">{job.title}</h3>
                      <div className="careers-job-details">
                        {job.details && job.details.length > 0 ? job.details.map((detail, index) => {
                          const lowerDetail = detail?.toLowerCase()
                          const isLocation = LOCATION_KEYWORDS.some(keyword => lowerDetail.includes(keyword))
                          return (
                            <div key={index} className="careers-job-detail">
                              <span className={`careers-job-detail-icon ${isLocation ? 'location' : 'time'}`}>
                                {isLocation ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 5.25-9 12-9 12s-9-6.75-9-12a9 9 0 1 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                  </svg>
                                ) : (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="9"></circle>
                                    <polyline points="12 7 12 12 15 15"></polyline>
                                  </svg>
                                )}
                              </span>
                              <span>{detail}</span>
                            </div>
                          )
                        }) : null}
                      </div>
                    </div>
                  </div>
                  <div className="careers-job-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="careers-jobs-grid-empty">No jobs found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Career