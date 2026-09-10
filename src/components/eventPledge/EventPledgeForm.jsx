import { useState } from 'react'
import axiosInstance from '../../utils/axios'
import '../checkoutForm/CheckoutForm.css'

const INITIAL_FORM = {
  donor_name: '',
  contact_number: '',
  care_of_representative: '',
  donation_type: 'general',
  donation_amount: '',
  address: '',
}

/**
 * Public donor form to create an event pledge (ERP event_pledges).
 * Uses the same checkout panel markup / CSS patterns as CheckoutForm.
 */
const EventPledgeForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formMessage.text) setFormMessage({ type: '', text: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormMessage({ type: '', text: '' })

    if (!formData.donor_name.trim()) {
      setFormMessage({ type: 'error', text: 'Please enter donor name' })
      return
    }
    if (!formData.contact_number.trim()) {
      setFormMessage({ type: 'error', text: 'Please enter contact number' })
      return
    }
    if (!formData.donation_amount || Number(formData.donation_amount) <= 0) {
      setFormMessage({ type: 'error', text: 'Please enter a valid donation amount' })
      return
    }

    const payload = {
      donor_name: formData.donor_name.trim(),
      contact_number: formData.contact_number.trim(),
      care_of_representative: formData.care_of_representative.trim() || undefined,
      donation_type: formData.donation_type,
      donation_amount: Number(formData.donation_amount),
      address: formData.address.trim() || undefined,
    }

    setIsSubmitting(true)
    try {
      const response = await axiosInstance.post('/public/event-pledges', payload)
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to submit pledge')
      }
      setFormData(INITIAL_FORM)
      setFormMessage({
        type: 'success',
        text: response.data?.message || 'Thank you! Your pledge has been submitted.',
      })
    } catch (err) {
      setFormMessage({
        type: 'error',
        text:
          err.response?.data?.message ||
          err.message ||
          'Failed to submit pledge. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="checkout-panel">
      <form className="checkout-panel__form" onSubmit={handleSubmit}>
        <h2 className="checkout-panel__title-2">Event Pledge</h2>
        <p style={{ marginBottom: 16, color: '#4b5563', fontSize: 14 }}>
          Share your pledge details. Our team will follow up with you.
        </p>

        {formMessage.text && (
          <div className={`checkout-panel__message checkout-panel__message--${formMessage.type}`}>
            {formMessage.text}
          </div>
        )}

        <div className="row">
          <div className="input-item checkout-panel__field">
            <input
              type="text"
              name="donor_name"
              placeholder="Donor Name"
              value={formData.donor_name}
              onChange={handleInputChange}
              className="checkout-panel__input"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="input-item checkout-panel__field">
            <input
              type="tel"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleInputChange}
              className="checkout-panel__input"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="row">
          <div className="input-item checkout-panel__field">
            <input
              type="text"
              name="care_of_representative"
              placeholder="Care of / Representative"
              value={formData.care_of_representative}
              onChange={handleInputChange}
              className="checkout-panel__input"
              disabled={isSubmitting}
            />
          </div>
          <div className="input-item checkout-panel__field">
            <select
              name="donation_type"
              value={formData.donation_type}
              onChange={handleInputChange}
              className="checkout-panel__input checkout-panel__select"
              disabled={isSubmitting}
            >
              <option value="general">General</option>
              <option value="zakat">Zakat</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-item checkout-panel__field">
            <input
              type="number"
              name="donation_amount"
              placeholder="Donation Amount"
              value={formData.donation_amount}
              onChange={handleInputChange}
              className="checkout-panel__input"
              min="1"
              step="0.01"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="input-item checkout-panel__field">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="checkout-panel__input"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn--alert"
          style={{ width: '100%' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Submit Pledge'}
        </button>
      </form>
    </section>
  )
}

export default EventPledgeForm
