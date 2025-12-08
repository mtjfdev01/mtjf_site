import { useState } from 'react'
import './ContactForm.css'
import axiosInstance from '../../utils/axios'

const DEFAULT_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
}

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Payload example:
      // {
      //   name: "John Doe",
      //   email: "john@example.com",
      //   phone: "+1234567890",
      //   subject: "Inquiry",
      //   message: "Hello, I would like to know more about..."
      // }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject || null,
        message: formData.message
      }

      const response = await axiosInstance.post('/website_message', payload)
      
      setSubmitStatus('success')
      onSubmit?.(formData, response.data)
      setFormData(DEFAULT_FORM)
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-panel">
      <form className="contact-panel__form" onSubmit={handleSubmit}>
        <div className="contact-panel__grid">
          <label className="contact-panel__field">
            <span className="contact-panel__label">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-panel__input"
            />
          </label>
          <label className="contact-panel__field">
            <span className="contact-panel__label">Email Address</span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-panel__input"
            />
          </label>
        </div>

        <div className="contact-panel__grid">
          <label className="contact-panel__field">
            <span className="contact-panel__label">Phone Number</span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="contact-panel__input"
            />
          </label>
          <label className="contact-panel__field">
            <span className="contact-panel__label">Subject</span>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="contact-panel__input"
            />
          </label>
        </div>

        <label className="contact-panel__field contact-panel__field--message">
          <span className="contact-panel__label">Write a message</span>
          <textarea
            name="message"
            placeholder="Write a message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
            className="contact-panel__input contact-panel__textarea"
          />
        </label>

        <button 
          type="submit" 
          className="contact-panel__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Message'}
        </button>

        {submitStatus === 'success' && (
          <div className="contact-panel__message contact-panel__message--success">
            Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="contact-panel__message contact-panel__message--error">
            Failed to send message. Please try again later.
          </div>
        )}
      </form>
    </section>
  )
}

export default ContactForm

