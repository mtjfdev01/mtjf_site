import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'

import './Careers.css'
import iconA from '../../assets/img/career/A.webp'
import iconB from '../../assets/img/career//B.webp'
import iconC from '../../assets/img/career/C.webp'
import iconD from '../../assets/img/career/D.webp'
import iconE from '../../assets/img/career/E.webp'
import iconF from '../../assets/img/career/F.webp'

// export const JOBS_DATA = [
//   {
//     id: 1,
//     title: 'Office Boy',
//     icon: iconA,
//     details: ['Full Time', 'Lahore'],
//     type: 'Full Time',
//     location: 'Lahore',
//     department: 'Operations',
//     experience: '0-1 Years',
//     about: 'We are looking for a reliable and hardworking Office Boy to join our team. The ideal candidate will be responsible for maintaining office cleanliness, assisting with daily office tasks, and ensuring a smooth working environment for all staff members.',
//     qualifications: [
//       'Basic education (Matric or equivalent)',
//       'Good communication skills',
//       'Ability to follow instructions',
//       'Physical fitness for manual tasks',
//       'Punctual and reliable'
//     ],
//     responsibilities: [
//       'Maintain cleanliness of office premises',
//       'Assist with office errands and deliveries',
//       'Help with basic office tasks as needed',
//       'Ensure office supplies are well-stocked',
//       'Assist staff with various office-related duties'
//     ]
//   },
//   {
//     id: 2,
//     title: 'Website Developer',
//     icon: iconB,
//     details: ['Head Office Tulamba'],
//     type: 'Full Time',
//     location: 'Head Office Tulamba',
//     department: 'IT',
//     experience: '2-4 Years',
//     about: 'We are seeking a skilled Website Developer to design and develop responsive websites and web applications. You will work with our team to create user-friendly interfaces and ensure optimal performance across all platforms.',
//     qualifications: [
//       'Bachelor\'s degree in Computer Science or related field',
//       '2-4 years of experience in web development',
//       'Proficiency in HTML, CSS, JavaScript, and modern frameworks',
//       'Experience with responsive design principles',
//       'Knowledge of version control systems (Git)'
//     ],
//     responsibilities: [
//       'Develop and maintain responsive websites',
//       'Collaborate with designers and other developers',
//       'Write clean, maintainable code',
//       'Test websites across different browsers and devices',
//       'Optimize websites for speed and performance'
//     ]
//   },
//   {
//     id: 3,
//     title: 'JR. Graphic Designer',
//     icon: iconC,
//     details: ['1-2years experience in creative role', 'Head office tulamba'],
//     type: 'Full Time',
//     location: 'Head Office Tulamba',
//     department: 'Design',
//     experience: '1-2 Years',
//     about: 'Join our creative team as a Junior Graphic Designer. You will work on various design projects including marketing materials, social media graphics, and brand assets. This is an excellent opportunity to grow your skills in a supportive environment.',
//     qualifications: [
//       '1-2 years of experience in graphic design or related creative role',
//       'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
//       'Strong understanding of design principles',
//       'Creative thinking and attention to detail',
//       'Good communication and collaboration skills'
//     ],
//     responsibilities: [
//       'Create visual designs for marketing materials',
//       'Develop social media graphics and content',
//       'Assist with brand identity projects',
//       'Collaborate with the marketing team on campaigns',
//       'Maintain design consistency across all materials'
//     ]
//   },
//   {
//     id: 4,
//     title: 'Senior Video Producer',
//     icon: iconD,
//     details: ['5 years experience in creative role', 'Head office tulamba'],
//     type: 'Full Time',
//     location: 'Head Office Tulamba',
//     department: 'Design',
//     experience: '5+ Years',
//     about: 'We are looking for an experienced Senior Video Producer to lead our video production efforts. You will be responsible for creating high-quality video content for various platforms, managing production workflows, and mentoring junior team members.',
//     qualifications: [
//       '5+ years of experience in video production or related creative role',
//       'Expert knowledge of video editing software (Premiere Pro, After Effects, Final Cut)',
//       'Strong storytelling and creative vision',
//       'Experience with camera operation and lighting',
//       'Ability to manage multiple projects simultaneously'
//     ],
//     responsibilities: [
//       'Plan and execute video production projects',
//       'Edit and post-produce video content',
//       'Manage video production workflows and timelines',
//       'Collaborate with clients and stakeholders',
//       'Mentor and guide junior video team members'
//     ]
//   },
//   {
//     id: 5,
//     title: 'Graphic Designer',
//     icon: iconE,
//     details: ['3+ years experience in creative role', 'Head office tulamba'],
//     type: 'Full Time',
//     location: 'Head Office Tulamba',
//     department: 'Design',
//     experience: '3+ Years',
//     about: 'We are seeking an experienced Graphic Designer to join our creative team. You will be responsible for creating compelling visual designs that communicate our brand message effectively across various media platforms.',
//     qualifications: [
//       '3+ years of experience in graphic design or related creative role',
//       'Expert proficiency in Adobe Creative Suite',
//       'Strong portfolio demonstrating creative skills',
//       'Understanding of branding and marketing principles',
//       'Ability to work independently and meet deadlines'
//     ],
//     responsibilities: [
//       'Design marketing materials and promotional content',
//       'Create brand assets and visual identities',
//       'Develop concepts for campaigns and projects',
//       'Work closely with marketing and content teams',
//       'Ensure brand consistency across all design outputs'
//     ]
//   },
//   {
//     id: 6,
//     title: 'Assistant Manager - Marketing & Strategy',
//     icon: iconF,
//     details: ['Head office tulamba'],
//     type: 'Full Time',
//     location: 'Head Office Tulamba',
//     department: 'Marketing',
//     experience: '3-5 Years',
//     about: 'We are looking for an Assistant Manager for Marketing & Strategy to help develop and execute marketing strategies. You will work closely with the marketing team to drive brand awareness and support organizational goals.',
//     qualifications: [
//       'Bachelor\'s degree in Marketing, Business, or related field',
//       '3-5 years of experience in marketing or strategy',
//       'Strong analytical and strategic thinking skills',
//       'Experience with digital marketing tools and platforms',
//       'Excellent communication and presentation skills'
//     ],
//     responsibilities: [
//       'Assist in developing marketing strategies and campaigns',
//       'Analyze market trends and competitor activities',
//       'Coordinate marketing activities across different channels',
//       'Support brand development and positioning efforts',
//       'Collaborate with cross-functional teams on marketing initiatives'
//     ]
//   }
// ]

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
          <h1 className="heading-secondary">Career</h1>
        </div>
        <p className="h2">
          Current Openings
        </p>
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
                          const lowerDetail = detail.toLowerCase()
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