import { useState } from 'react'
import './ContactForm.css'

const DEFAULT_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
}

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData)
    setFormData(DEFAULT_FORM)
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

        <button type="submit" className="contact-panel__submit">
          Submit Message
        </button>
      </form>
    </section>
  )
}

export default ContactForm

