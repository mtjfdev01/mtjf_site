import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'
import axiosInstance from '../../utils/axios'
import { ALL_PROJECTS_DATA } from '../../data/projectsData'
import './CheckoutForm.css'
import CountryDropdown from './CountryDropdown'

const DEFAULT_FORM = {
  donor_name: '',
  donor_email: '',
  donor_phone: '',
  donation_type: 'general',
  country: '',
  city: '',
  address: ''
}

// Payment frequency mapping
const paymentFrequency = {
  blinq: 'once',
  payfast: 'once'
}

// PayFast handler (placeholder for future implementation)
const postToPayfast = (data, formData) => {
  // TODO: Implement PayFast integration
  console.log('PayFast data:', data, formData)
}

const CheckoutForm = () => {
  const navigate = useNavigate()
  const { donationData, clearDonationData } = useDonation()
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })

  // Initialize form with donation data if available
  useEffect(() => {
    if (donationData) {
      // Set donation_type from donationData category if available
      if (donationData.category) {
        const categoryMap = {
          'General': 'general',
          'Zakat': 'zakat',
          'Sadqa': 'sadqa'
        }
        setFormData(prev => ({
          ...prev,
          donation_type: categoryMap[donationData.category] || 'general'
        }))
      }
    }
  }, [donationData])

  // Redirect if no donation data
  useEffect(() => {
    if (!donationData) {
      navigate('/home')
    }
  }, [donationData, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e, paymentMethod = null) => {
    e.preventDefault()

    // Use the passed payment method or the current selected payment
    const currentPayment = paymentMethod

    // Validate required fields and focus on first invalid field
    if (!formData.donor_name.trim()) {
      setFormMessage({ 
        type: 'error', 
        text: 'Please enter your name' 
      })
      setTimeout(() => {
        const nameField = document.querySelector('input[name="donor_name"]')
        if (nameField) {
          nameField.focus()
          nameField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    if (!formData.donor_email.trim()) {
      setFormMessage({ 
        type: 'error', 
        text: 'Please enter your email' 
      })
      setTimeout(() => {
        const emailField = document.querySelector('input[name="donor_email"]')
        if (emailField) {
          emailField.focus()
          emailField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    if (!formData.donor_phone.trim()) {
      setFormMessage({ 
        type: 'error', 
        text: 'Please enter your phone number' 
      })
      setTimeout(() => {
        const phoneField = document.querySelector('input[name="donor_phone"]')
        if (phoneField) {
          phoneField.focus()
          phoneField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    if (!formData.city.trim()) {
      setFormMessage({ 
        type: 'error', 
        text: 'Please enter your city' 
      })
      setTimeout(() => {
        const cityField = document.querySelector('input[name="city"]')
        if (cityField) {
          cityField.focus()
          cityField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.donor_email)) {
      setFormMessage({ 
        type: 'error', 
        text: 'Please enter a valid email address' 
      })
      document.querySelector('input[name="donor_email"]')?.focus()
      return
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(formData.donor_phone)) {
      setFormMessage({ 
        type: 'error', 
        text: 'Please enter a valid phone number' 
      })
      document.querySelector('input[name="donor_phone"]')?.focus()
      return
    }

    // Calculate total amount from donation data
    const totalAmount = donationData?.finalAmount || donationData?.amount || donationData?.customAmount || 0

    if (!totalAmount || Number(totalAmount) <= 0 || Number(totalAmount) < 100) {
      setFormMessage({ 
        type: 'error', 
        text: 'Please add donation items to the cart or enter a valid donation amount (minimum donation amount is 100 PKR)' 
      })
      return
    }

    setIsSubmitting(true)
    setFormMessage({ type: '', text: '' })

    try {
      setIsLoading(true)

      // Get project info from donation data
      const project_id = donationData?.projectId || ''
      // Look up project name from projects data if projectId exists
      let project_name = ''
      if (project_id) {
        const project = ALL_PROJECTS_DATA.find(p => p.id === project_id)
        project_name = project?.title || ''
      }

      const payload = {
        project_id,
        project_name,
        ...formData,
        donation_method: currentPayment,
        donation_frequency: paymentFrequency[currentPayment] || 'once',
        donation_source: 'website',
        amount: totalAmount,
        currency: donationData?.currency || 'PKR',
        status: 'pending'
      }

      const response = await axiosInstance.post('/donations', payload)

      if (currentPayment === 'payfast') {
        // Call postToPayfast with the response data from the server
        postToPayfast(response.data.data, formData)
      } else {
        if (response?.data?.success && response?.data?.data?.paymentUrl) {
          try {
            setIsLoading(false)
            // Try to open in new window
            const paymentWindow = window.open('', '_blank')
            if (paymentWindow) {
              paymentWindow.location.href = response.data.data.paymentUrl
              paymentWindow.focus()
            } else {
              setIsLoading(false)
              window.location.href = response.data.data.paymentUrl
            }
          } catch (error) {
            console.error('Error opening payment URL:', error)
            setIsLoading(false)
            window.location.href = response.data.data.paymentUrl
          }
        } else {
          setIsLoading(false)
          setFormMessage({ type: 'error', text: 'Failed to open invoice url' })
        }
      }
    } catch (error) {
      setIsLoading(false)
      setFormMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || error?.message || 'An error occurred. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!donationData) {
    return null
  }

  return (
    <section className="checkout-panel">
      <form className="checkout-panel__form">
        {formMessage.text && (
          <div className={`checkout-panel__message checkout-panel__message--${formMessage.type}`}>
            {formMessage.text}
          </div>
        )}
        
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-item-name ltn__custom-icon checkout-panel__field">
              <input
                type="text"
                name="donor_name"
                placeholder="Enter your name"
                value={formData.donor_name}
                onChange={handleInputChange}
                required
                className="checkout-panel__input"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-item input-item-email ltn__custom-icon checkout-panel__field">
              <input
                type="email"
                name="donor_email"
                placeholder="Enter email address"
                value={formData.donor_email}
                onChange={handleInputChange}
                required
                className="checkout-panel__input"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-item input-item-phone ltn__custom-icon checkout-panel__field">
              <input
                type="text"
                name="donor_phone"
                placeholder="Enter phone number"
                value={formData.donor_phone}
                onChange={handleInputChange}
                required
                className="checkout-panel__input"
              />
            </div>
          </div>

          <div className="col-md-6">
            <span className="donation_type_select checkout-panel__field">
              <select
                name="donation_type"
                value={formData.donation_type}
                onChange={handleInputChange}
                className="checkout-panel__input checkout-panel__select"
              >
                <option value="general">General Donation</option>
                <option value="zakat">Zakat Donation</option>
                <option value="sadqa">Sadqa Donation</option>
              </select>
            </span>
          </div>

          {/* country dropdown */}
          <div className="col-md-6">
            <CountryDropdown
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
            />
          </div>

          <div className="col-md-6">
            <div className="input-item input-item-name ltn__custom-icon checkout-panel__field">
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
                className="checkout-panel__input"
              />
            </div>
          </div>

          <div className="input-item input-item-textarea ltn__custom-icon checkout-panel__field checkout-panel__field--textarea">
            <textarea
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              className="checkout-panel__input checkout-panel__textarea"
              rows="4"
            />
          </div>
        </div>

        {/* Payment Method Section */}
        <h5 className="checkout-panel__title-2">Donate Via :</h5>

        <div className="row">
          {/* blinq payment option */}
          <div className="col-md-6">
            <div className="input-item">
              <div
                className={`payment-option ${isSubmitting || isLoading ? 'payment-option--disabled' : ''}`}
                onClick={(e) => {
                  if (!isSubmitting && !isLoading) {
                    handleSubmit(e, 'blinq')
                  }
                }}
              >
                <div className="payment-icon">
                  <i className="fas fa-university"></i>
                </div>
                <div className="payment-content">
                  <h6>Credit, Debit Card, Jazz Cash, Easy Pesa</h6>
                  <p>Blinq's Secure online payment gateway</p>
                  <div className="payment-selection-options"></div>
                </div>
                {isLoading && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PayFast payment option (prepared for future) */}
          {/* <div className="col-md-6">
            <div className="input-item">
              <div
                className={`payment-option ${isSubmitting || isLoading ? 'payment-option--disabled' : ''}`}
                onClick={(e) => {
                  if (!isSubmitting && !isLoading) {
                    handleSubmit(e, 'payfast')
                  }
                }}
              >
                <div className="payment-icon">
                  <i className="fas fa-credit-card"></i>
                </div>
                <div className="payment-content">
                  <h6>Credit, Debit Card, Jazz Cash, Easy Pesa, U Pesa</h6>
                  <p>Payfast's (Faisal Bank Islami) Secure online payment gateway</p>
                </div>
                {isLoading && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </form>
    </section>
  )
}

export default CheckoutForm

