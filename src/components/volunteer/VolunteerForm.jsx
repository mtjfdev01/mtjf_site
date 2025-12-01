import { useState } from 'react'
import './VolunteerForm.css'

const DEFAULT_FORM = {
  name: '',
  email: '',
  phone: '',
  category: '',
  availability: '',
  schedule: '',
  comments: ''
}

const VolunteerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.category) {
      newErrors.category = 'Please select your category'
    }

    if (!formData.availability) {
      newErrors.availability = 'Please select your availability'
    }

    if (!formData.schedule) {
      newErrors.schedule = 'Please select your schedule preference'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    
    // Clear submit status when form changes
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Console log the form data
      console.log('Volunteer Registration Data:', formData)
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSubmitStatus('success')
      setFormData(DEFAULT_FORM)
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="volunteer-panel">
      <form className="volunteer-panel__form" onSubmit={handleSubmit} noValidate>
        <div className="volunteer-panel__grid">
          <label className="volunteer-panel__field">
            <span className="volunteer-panel__label">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`volunteer-panel__input ${errors.name ? 'volunteer-panel__input--error' : ''}`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="volunteer-panel__error" role="alert">
                {errors.name}
              </span>
            )}
          </label>

          <label className="volunteer-panel__field">
            <span className="volunteer-panel__label">Email Address</span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`volunteer-panel__input ${errors.email ? 'volunteer-panel__input--error' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="volunteer-panel__error" role="alert">
                {errors.email}
              </span>
            )}
          </label>
        </div>

        <div className="volunteer-panel__grid">
          <label className="volunteer-panel__field">
            <span className="volunteer-panel__label">Phone Number</span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`volunteer-panel__input ${errors.phone ? 'volunteer-panel__input--error' : ''}`}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className="volunteer-panel__error" role="alert">
                {errors.phone}
              </span>
            )}
          </label>

          <label className="volunteer-panel__field">
            <span className="volunteer-panel__label">I am a</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`volunteer-panel__input volunteer-panel__select ${errors.category ? 'volunteer-panel__input--error' : ''}`}
              aria-invalid={errors.category ? 'true' : 'false'}
              aria-describedby={errors.category ? 'category-error' : undefined}
            >
              <option value="">Select category</option>
              <option value="student">Student</option>
              <option value="working-professional">Working Professional</option>
              <option value="retired">Retired</option>
              <option value="individual">Individual</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <span id="category-error" className="volunteer-panel__error" role="alert">
                {errors.category}
              </span>
            )}
          </label>
        </div>

        <div className="volunteer-panel__grid">
          <label className="volunteer-panel__field">
            <span className="volunteer-panel__label">I am available on tasks that can be done</span>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className={`volunteer-panel__input volunteer-panel__select ${errors.availability ? 'volunteer-panel__input--error' : ''}`}
              aria-invalid={errors.availability ? 'true' : 'false'}
              aria-describedby={errors.availability ? 'availability-error' : undefined}
            >
              <option value="">Select availability</option>
              <option value="virtually-only">Virtually Only</option>
              <option value="offline-only">Offline Only</option>
              <option value="both">Both are Possible</option>
              <option value="others">Others</option>
            </select>
            {errors.availability && (
              <span id="availability-error" className="volunteer-panel__error" role="alert">
                {errors.availability}
              </span>
            )}
          </label>

          <label className="volunteer-panel__field">
            <span className="volunteer-panel__label">I can volunteer</span>
            <select
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              className={`volunteer-panel__input volunteer-panel__select ${errors.schedule ? 'volunteer-panel__input--error' : ''}`}
              aria-invalid={errors.schedule ? 'true' : 'false'}
              aria-describedby={errors.schedule ? 'schedule-error' : undefined}
            >
              <option value="">Select schedule</option>
              <option value="weekends-only">Only on Weekends</option>
              <option value="weekdays-only">Only on Weekdays</option>
              <option value="flexibility">Flexibility</option>
              <option value="others">Others</option>
            </select>
            {errors.schedule && (
              <span id="schedule-error" className="volunteer-panel__error" role="alert">
                {errors.schedule}
              </span>
            )}
          </label>
        </div>

        <label className="volunteer-panel__field volunteer-panel__field--message">
          <span className="volunteer-panel__label">Comments or Questions</span>
          <textarea
            name="comments"
            placeholder="Comments or Questions (Optional)"
            rows="6"
            value={formData.comments}
            onChange={handleChange}
            className="volunteer-panel__input volunteer-panel__textarea"
          />
        </label>

        {submitStatus === 'success' && (
          <div className="volunteer-panel__message volunteer-panel__message--success" role="alert">
            Registration Submitted
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="volunteer-panel__message volunteer-panel__message--error" role="alert">
            Something went wrong. Please try again later.
          </div>
        )}

        <button 
          type="submit" 
          className="volunteer-panel__submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </section>
  )
}

export default VolunteerForm

