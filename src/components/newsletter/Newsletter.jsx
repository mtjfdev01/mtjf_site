import { useState } from 'react'
import './Newsletter.css'

const Newsletter = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('Newsletter subscription:', formData)
    }
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: ''
    })
  }

  return (
    <section className="newsletter-section">
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
              <button type="submit" className="newsletter-button">
                SIGN UP
              </button>
            </div>
          </form>

          <p className="newsletter-privacy">
            We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

