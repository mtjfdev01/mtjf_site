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
    location: '' // Commented out for now
  })
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNext: false,
    hasPrev: false
  })
  const limit = 10

  // Reusable function to fetch jobs with filters
  const fetchJobs = async (filterParams = {}) => {
    try {
      setIsLoading(true)
      
      // Build query parameters
      const params = new URLSearchParams({
        page: filterParams.page || currentPage,
        limit: filterParams.limit || limit
      })
      
      // Add department filter if provided (convert to uppercase, replace underscores if needed)
      if (filterParams.department) {
        // Convert "fund_raising" to "FUND_RAISING" or keep as is if already uppercase
        const departmentValue = filterParams.department.toUpperCase().replace(/\s+/g, '_')
        params.append('department', departmentValue)
      }
      
      // Add type filter if provided (convert to API format: "Full Time" -> "FULL_TIME")
      if (filterParams.type) {
        const typeMapping = {
          'Full Time': 'FULL_TIME',
          'Part Time': 'PART_TIME',
          'Contract': 'CONTRACT'
        }
        const apiType = typeMapping[filterParams.type] || filterParams.type.toUpperCase().replace(/\s+/g, '_')
        params.append('type', apiType)
      }
      
      // Location filter - commented out for now
      // if (filterParams.location) {
      //   params.append('location', filterParams.location)
      // }
      
      const response = await axiosInstance.get(`/jobs?${params.toString()}`)
      console.log('Jobs API Response:', response.data?.data?.jobs)
      
      // Store pagination data from API
      if (response.data?.data?.pagination) {
        setPagination(response.data.data.pagination)
        setCurrentPage(response.data.data.pagination.currentPage)
      }
      
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

  // Initial fetch on component mount
  useEffect(() => {
    fetchJobs()
  }, [])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleApplyFilters = () => {
    // Call API with filter parameters
    fetchJobs({
      page: 1, // Reset to first page when filtering
      limit: limit,
      department: filters.department,
      type: filters.type,
      // location: filters.location // Commented out for now
    })
    
    // Reset to first page when applying filters
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    fetchJobs({
      page: page,
      limit: limit,
      department: filters.department,
      type: filters.type,
      // location: filters.location // Commented out for now
    })
  }

  const handleFirstPage = () => {
    handlePageChange(1)
  }

  const handlePrevPage = () => {
    if (pagination.hasPrev) {
      handlePageChange(pagination.currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (pagination.hasNext) {
      handlePageChange(pagination.currentPage + 1)
    }
  }

  const handleLastPage = () => {
    handlePageChange(pagination.totalPages)
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
              <option value="fund_raising">Fund Raising</option>
              {/* Add more department options based on actual API data */}
              {/* <option value="it">IT</option> */}
              {/* <option value="marketing">Marketing</option> */}
              {/* <option value="design">Design</option> */}
              {/* <option value="operations">Operations</option> */}
            </select>

            <select
              className="careers-filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>

            {/* Location filter - commented out for now, will implement later */}
            {/* <select
              className="careers-filter-select"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">Location</option>
              <option value="Lahore">Lahore</option>
              <option value="Head Office Tulamba">Head Office Tulamba</option>
              <option value="Multan">Multan</option>
              <option value="Faisalabad">Faisalabad</option>
            </select> */}
          </div>
          <button className="careers-apply-btn btn" onClick={handleApplyFilters}>
            Filter Jobs
          </button>
        </div>

        {/* Job Listings Grid */}
        {/* <div className="careers-jobs-grid"> */}
          {isLoading ? (
            <div className="careers-jobs-grid-empty text-center mb-48">Loading jobs...</div>
          ) : jobs.length > 0 ? (
            <div className="careers-jobs-grid">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className={`careers-job-card card ${job.status === 'closed' ? 'careers-job-closed' : ''}`}
                onClick={() => handleJobCardClick(job)}
              >
                <div className="careers-job-card-content">
                  <div className="careers-job-main">
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
              ))}
            </div>
          ) : (
            <div className='text-center mb-48'>No jobs found...</div>
          )}

        {/* Pagination Controls */}
        {!isLoading && jobs.length > 0 && pagination.totalPages > 1 && (
          <div className="careers-pagination">
            <button
              className="careers-pagination-btn"
              onClick={handleFirstPage}
              disabled={!pagination.hasPrev}
            >
              First
            </button>
            <button
              className="careers-pagination-btn"
              onClick={handlePrevPage}
              disabled={!pagination.hasPrev}
            >
              Prev
            </button>
            <span className="careers-pagination-info">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              className="careers-pagination-btn"
              onClick={handleNextPage}
              disabled={!pagination.hasNext}
            >
              Next
            </button>
            <button
              className="careers-pagination-btn"
              onClick={handleLastPage}
              disabled={!pagination.hasNext}
            >
              Last
            </button>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Career