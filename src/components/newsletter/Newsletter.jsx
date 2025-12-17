import { useState } from 'react'
import './Newsletter.css'
import axiosInstance from '../../utils/axios'

const Newsletter = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Payload example:
      // {
      //   firstName: "John",
      //   lastName: "Doe",
      //   email: "john@example.com"
      // }

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      }

      const response = await axiosInstance.post('/website_news_letter', payload)
      
      setSubmitStatus('success')
      onSubmit?.(formData, response.data)
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: ''
      })
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      setSubmitStatus('error')
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="newsletter-section mt-32">
      <div className="container">
        <div className="newsletter-content text-center">
          <h2 className="newsletter-heading">SUBSCRIBE</h2>
          <p className="newsletter-description">
            Sign up with your email address to receive news and updates.
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-inputs">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="newsletter-input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="newsletter-input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="newsletter-input"
                required
              />
              <button 
                type="submit" 
                className="newsletter-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </div>
          </form>

          {submitStatus === 'success' && (
            <div className="newsletter-message newsletter-message--success">
              Successfully subscribed. We will keep you updated with our latest news and updates.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="newsletter-message newsletter-message--error">
              Failed to subscribe. Please try again later or contact us at info@mtjfoundation.org
            </div>
          )}

          <p className="newsletter-privacy">
            We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

