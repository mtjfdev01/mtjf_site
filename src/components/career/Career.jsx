import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'

import './Careers.css'
import iconB from '../../assets/img/career//B.webp'

const LOCATION_KEYWORDS = ['lahore', 'tulamba', 'multan', 'faisalabad', 'head office']

const PROJECT_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'MTJ Foundation', label: 'MTJ Foundation' },
  { value: 'Aas Lab', label: 'Aas Lab' },
  { value: 'Aas Clinics', label: 'Aas Clinics' },
]

const Career = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    project: 'MTJ Foundation',
    department: '',
    type: '',
    location: ''
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

  const fetchJobs = async (filterParams = {}) => {
    try {
      setIsLoading(true)

      const params = new URLSearchParams({
        page: String(filterParams.page || currentPage),
        limit: String(filterParams.limit || limit)
      })

      if (filterParams.project) {
        params.append('project', filterParams.project)
      }

      if (filterParams.department) {
        const departmentValue = filterParams.department.toUpperCase().replace(/\s+/g, '_')
        params.append('department', departmentValue)
      }

      if (filterParams.type) {
        const typeMapping = {
          'Full Time': 'FULL_TIME',
          'Part Time': 'PART_TIME',
          Contract: 'CONTRACT'
        }
        const apiType =
          typeMapping[filterParams.type] ||
          filterParams.type.toUpperCase().replace(/\s+/g, '_')
        params.append('type', apiType)
      }

      const response = await axiosInstance.get(`/jobs?${params.toString()}`)

      if (response.data?.data?.pagination) {
        setPagination(response.data.data.pagination)
        setCurrentPage(response.data.data.pagination.currentPage)
      }

      const transformedJobs = (response.data?.data?.jobs || []).map((job) => ({
        ...job,
        details: [job.type || '', job.location || '', job.experience || ''].filter(
          Boolean
        ),
        icon: job.icon || iconB
      }))

      setJobs(transformedJobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs({ page: 1, limit, project: filters.project })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleProjectTab = (project) => {
    setFilters((prev) => ({ ...prev, project }))
    setCurrentPage(1)
    fetchJobs({
      page: 1,
      limit,
      project,
      department: filters.department,
      type: filters.type
    })
  }

  const handlePageChange = (page) => {
    fetchJobs({
      page,
      limit,
      project: filters.project,
      department: filters.department,
      type: filters.type
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
    navigate(`/careers/${job.id}`, { state: { job } })
  }

  return (
    <div className="careers-page">
      <div className="careers-container container py-48">
        <div
          className="careers-project-tabs"
          role="tablist"
          aria-label="Filter by project"
        >
          {PROJECT_OPTIONS.map((opt) => {
            const active = filters.project === opt.value
            return (
              <button
                key={opt.value || 'all'}
                type="button"
                role="tab"
                aria-selected={active}
                className={`careers-project-tab${
                  active ? ' careers-project-tab--active' : ''
                }`}
                onClick={() => handleProjectTab(opt.value)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

        {isLoading ? (
          <div className="careers-jobs-grid-empty text-center mb-48">
            Loading jobs...
          </div>
        ) : jobs.length > 0 ? (
          <div className="careers-jobs-grid">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`careers-job-card card ${
                  job.status === 'closed' ? 'careers-job-closed' : ''
                }`}
                onClick={() => {
                  if (job.status !== 'closed') handleJobCardClick(job)
                }}
              >
                <div className="careers-job-card-content">
                  <div className="careers-job-main">
                    <div className="careers-job-info">
                      <h3 className="careers-job-title">{job.title}</h3>
                      {job.project ? (
                        <div
                          className="careers-job-detail"
                          style={{ marginBottom: 8, opacity: 0.85 }}
                        >
                          {job.project}
                        </div>
                      ) : null}
                      <div className="careers-job-details">
                        {job?.details && job.details.length > 0
                          ? job.details.map((detail, index) => {
                              const lowerDetail = detail
                              const isLocation = LOCATION_KEYWORDS.some(
                                (keyword) => lowerDetail.includes(keyword)
                              )
                              return (
                                <div key={index} className="careers-job-detail">
                                  <span
                                    className={`careers-job-detail-icon ${
                                      isLocation ? 'location' : 'time'
                                    }`}
                                  >
                                    {isLocation ? (
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path d="M21 10c0 5.25-9 12-9 12s-9-6.75-9-12a9 9 0 1 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                      </svg>
                                    ) : (
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <circle cx="12" cy="12" r="9"></circle>
                                        <polyline points="12 7 12 12 15 15"></polyline>
                                      </svg>
                                    )}
                                  </span>
                                  <span>{detail}</span>
                                </div>
                              )
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="careers-job-arrow">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-48">No jobs found...</div>
        )}

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
      </div>
    </div>
  )
}

export default Career
