import { useState, useRef, useEffect } from 'react'
import axiosInstance from '../../utils/axios'
import './ApplyForm.css'

const DEFAULT_FORM = {
  fullName: '',
  email: '',
  phone: '',
  coverLetter: '',
  cvResume: null,
  consent: false
}

const ApplyForm = ({ jobTitle, jobId, onClose, isVisible }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [fileName, setFileName] = useState('No file chosen')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('')
  const formRef = useRef(null)
  const firstInputRef = useRef(null)

  useEffect(() => {
    // Focus on the form when it becomes visible
    if (isVisible && formRef.current) {
      // Scroll to form
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Focus on first input after scroll animation
      const focusTimer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus()
        } else {
          // Fallback: find first text input
          const firstInput = formRef.current?.querySelector('input[type="text"]')
          if (firstInput) {
            firstInput.focus()
          }
        }
      }, 400)
      
      return () => clearTimeout(focusTimer)
    }
  }, [isVisible])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // Allow numbers, spaces, dashes, parentheses, and + sign
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  }

  const validateForm = () => {
    const newErrors = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Cover Letter validation
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required'
    } else if (formData.coverLetter.trim().length < 20) {
      newErrors.coverLetter = 'Cover letter must be at least 20 characters'
    }

    // CV/Resume validation
    if (!formData.cvResume) {
      newErrors.cvResume = 'CV/Resume is required'
    } else {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!allowedTypes.includes(formData.cvResume.type)) {
        newErrors.cvResume = 'File must be PDF, DOC, or DOCX format'
      } else if (formData.cvResume.size > maxSize) {
        newErrors.cvResume = 'File size must be less than 5MB'
      }
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    
    // Clear submit status when form changes
    if (submitStatus) {
      setSubmitStatus(null)
      setSubmitMessage('')
    }
    
    if (type === 'file') {
      const file = files[0]
      if (file) {
        // Validate file immediately
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        const maxSize = 5 * 1024 * 1024 // 5MB
        
        if (!allowedTypes.includes(file.type)) {
          setErrors((prev) => ({ ...prev, [name]: 'File must be PDF, DOC, or DOCX format' }))
          return
        } else if (file.size > maxSize) {
          setErrors((prev) => ({ ...prev, [name]: 'File size must be less than 5MB' }))
          return
        } else {
          setErrors((prev) => ({ ...prev, [name]: '' }))
        }
      }
      setFormData((prev) => ({ ...prev, [name]: file }))
      setFileName(file ? file.name : 'No file chosen')
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('error')
      setSubmitMessage('Please fix the errors in the form')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      formDataToSend.append('applicant_name', formData.fullName.trim())
      formDataToSend.append('email', formData.email.trim())
      formDataToSend.append('phone_number', formData.phone.trim())
      formDataToSend.append('cover_letter', formData.coverLetter.trim())
      formDataToSend.append('cvResume', formData.cvResume) // File will be uploaded and resume_url will be set by backend
      if (jobId) {
        formDataToSend.append('job_id', Number(jobId))
      }

      const response = await axiosInstance.post('/job_applications', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setSubmitStatus('success')
      setSubmitMessage('Application submitted successfully! We will contact you soon.')
      setFormData(DEFAULT_FORM)
      setFileName('No file chosen')
      setErrors({})
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
        setSubmitMessage('')
        if (onClose) {
          onClose()
        }
      }, 5000)
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus('error')
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to submit application. Please try again.'
        setSubmitMessage(errorMessage)
      } else if (error.request) {
        // Request was made but no response received
        setSubmitMessage('Network error. Please check your connection and try again.')
      } else {
        // Something else happened
        setSubmitMessage('An error occurred. Please try again.')
      }
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
        setSubmitMessage('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="apply-form" ref={formRef}>
      <div className="apply-form-header">
        <h2 className="apply-form-title">Apply for this position</h2>
        {onClose && (
          <button 
            type="button" 
            className="apply-form-close"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
        )}
      </div>
      <form className="apply-form__form" onSubmit={handleSubmit}>
        <div className="apply-form__grid">
          <label className="apply-form__field">
            <span className="apply-form__label">Full Name <span className="required">*</span></span>
            <input
              ref={firstInputRef}
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={`apply-form__input ${errors.fullName ? 'apply-form__input--error' : ''}`}
            />
            {errors.fullName && (
              <span className="apply-form__error">{errors.fullName}</span>
            )}
          </label>

          <label className="apply-form__field">
            <span className="apply-form__label">Email <span className="required">*</span></span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`apply-form__input ${errors.email ? 'apply-form__input--error' : ''}`}
            />
            {errors.email && (
              <span className="apply-form__error">{errors.email}</span>
            )}
          </label>
        </div>

        <label className="apply-form__field">
          <span className="apply-form__label">Phone <span className="required">*</span></span>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`apply-form__input ${errors.phone ? 'apply-form__input--error' : ''}`}
          />
          {errors.phone && (
            <span className="apply-form__error">{errors.phone}</span>
          )}
        </label>

        <label className="apply-form__field apply-form__field--message">
          <span className="apply-form__label">Cover Letter <span className="required">*</span></span>
          <textarea
            name="coverLetter"
            placeholder="Cover Letter"
            rows="6"
            value={formData.coverLetter}
            onChange={handleChange}
            required
            className={`apply-form__input apply-form__textarea ${errors.coverLetter ? 'apply-form__input--error' : ''}`}
          />
          {errors.coverLetter && (
            <span className="apply-form__error">{errors.coverLetter}</span>
          )}
        </label>

        <label className="apply-form__field apply-form__field--file">
          <span className="apply-form__label">Upload CV/Resume <span className="required">*</span></span>
          <div className="apply-form__file-wrapper">
            <input
              type="file"
              name="cvResume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="apply-form__file-input"
              id="cv-resume-input"
            />
            <label htmlFor="cv-resume-input" className="apply-form__file-button">
              Choose file
            </label>
            <span className="apply-form__file-name">{fileName}</span>
          </div>
          {errors.cvResume && (
            <span className="apply-form__error">{errors.cvResume}</span>
          )}
          <p className="apply-form__file-hint">Allowed Type(s): .pdf, .doc, .docx (Max size: 5MB)</p>
        </label>

        <label className="apply-form__field apply-form__field--checkbox">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            className="apply-form__checkbox"
          />
          <span className="apply-form__checkbox-label">
            By using this form you agree with the storage and handling of your data by this website. <span className="required">*</span>
          </span>
        </label>
        {errors.consent && (
          <span className="apply-form__error apply-form__error--checkbox">{errors.consent}</span>
        )}

        {/* Submit Status Messages */}
        {submitStatus === 'success' && submitMessage && (
          <div className="apply-form__message apply-form__message--success">
            <span className="apply-form__message-icon">✓</span>
            <span>{submitMessage}</span>
          </div>
        )}

        {submitStatus === 'error' && submitMessage && (
          <div className="apply-form__message apply-form__message--error">
            <span className="apply-form__message-icon">⚠</span>
            <span>{submitMessage}</span>
          </div>
        )}

        <button 
          type="submit" 
          className="apply-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}

export default ApplyForm

