import { useState } from 'react'
import '../contact/ContactForm.css'
import axiosInstance from '../../utils/axios'

const DEFAULT_FORM = {
  name: '',
  email: '',
  message: ''
}

const StoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear submit status when form changes
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim()) {
      return
    }
    
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      return
    }
    
    if (!formData.message.trim()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message
      }

      const response = await axiosInstance.post('/submit_story', payload)
      
      setSubmitStatus('success')
      onSubmit?.(formData, response.data)
      setFormData(DEFAULT_FORM)
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting story:', error)
      setSubmitStatus('error')
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-panel__form" onSubmit={handleSubmit}>
      <label className="contact-panel__field">
        <span className="contact-panel__label">Your Name</span>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="contact-panel__input"
          required
        />
      </label>

      <label className="contact-panel__field">
        <span className="contact-panel__label">Email</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="contact-panel__input"
          required
        />
      </label>

      <label className="contact-panel__field contact-panel__field--message">
        <span className="contact-panel__label">Message</span>
        <textarea
          name="message"
          placeholder="Message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          className="contact-panel__input contact-panel__textarea"
          required
        />
      </label>

      {submitStatus === 'success' && (
        <div className="contact-panel__message contact-panel__message--success" role="alert">
          Story submitted successfully! Thank you for sharing.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="contact-panel__message contact-panel__message--error" role="alert">
          Failed to submit story. Please try again later.
        </div>
      )}

      <button 
        type="submit" 
        className="contact-panel__submit"
        disabled
        // disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
      </button>
    </form>
  )
}

export default StoryForm

