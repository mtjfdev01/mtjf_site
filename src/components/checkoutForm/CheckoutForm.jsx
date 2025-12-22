import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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

const CheckoutForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { donationData, projectDonations, clearDonationData, setProjectDonationData } = useDonation()
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })

  // Get donation items from location state (passed from donation projects menu)
  const donationItemsFromState = location.state?.donationItems || []
  const totalAmountFromState = location.state?.totalAmount || 0
  
  // Determine which donation flow we're using
  const isProjectDonationsFlow = donationItemsFromState.length > 0 || projectDonations.length > 0
  const isOldDonationFormFlow = !!donationData

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

  // Store donation items from location state into context if available
  useEffect(() => {
    if (donationItemsFromState.length > 0 && setProjectDonationData) {
      setProjectDonationData(donationItemsFromState)
    }
  }, [donationItemsFromState, setProjectDonationData])

  // Initialize donation type from project donations if available
  useEffect(() => {
    if (isProjectDonationsFlow && (donationItemsFromState.length > 0 || projectDonations.length > 0)) {
      // Get donation type from first donation item
      const firstDonation = donationItemsFromState[0] || projectDonations[0]
      if (firstDonation?.donationType) {
        const typeMap = {
          'GENERAL': 'general',
          'SADKA': 'sadqa',
          'ZAKAT': 'zakat'
        }
        setFormData(prev => ({
          ...prev,
          donation_type: typeMap[firstDonation.donationType] || 'general'
        }))
      }
    }
  }, [isProjectDonationsFlow, donationItemsFromState, projectDonations])

  // Redirect if no donation data (check both context and location state)
  useEffect(() => {
    const hasDonationData = isOldDonationFormFlow || isProjectDonationsFlow
    if (!hasDonationData) {
      navigate('/home')
    }
  }, [isOldDonationFormFlow, isProjectDonationsFlow, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // PayFast handler function
  const postToPayfast = (payfastResponse, formData) => {
    try {
      // Validate required fields from response
      if (!payfastResponse) {
        console.error('PayFast response is missing')
        setFormMessage({ type: 'error', text: 'Invalid payment response. Please try again.' })
        setIsLoading(false)
        return
      }

      const { MERCHANT_ID, ACCESS_TOKEN, BASKET_ID, TXNAMT } = payfastResponse

      // Validate required fields
      if (!MERCHANT_ID || !ACCESS_TOKEN || !BASKET_ID || !TXNAMT) {
        console.error('Missing required PayFast fields:', { MERCHANT_ID, ACCESS_TOKEN, BASKET_ID, TXNAMT })
        setFormMessage({ type: 'error', text: 'Missing payment information. Please try again.' })
        setIsLoading(false)
        return
      }

      // ORDER_DATE best in "YYYY-MM-DD HH:mm:ss"
      const now = new Date()
      const ORDER_DATE = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`

      // SIGNATURE is just a random string per docs (not a hash)
      const SIGNATURE = Math.random().toString(36).slice(2, 10)

      const fields = {
        MERCHANT_ID,
        MERCHANT_NAME: 'MTJ Foundation',
        TOKEN: ACCESS_TOKEN,                 // from GetAccessToken
        PROCCODE: '00',
        TXNAMT,              // must match token call
        CUSTOMER_MOBILE_NO: formData.donor_phone,
        CUSTOMER_EMAIL_ADDRESS: formData.donor_email,
        SIGNATURE,
        VERSION: SIGNATURE,
        TXNDESC: (process.env.REACT_APP_TXNDESC || 'Donation'),
        SUCCESS_URL: 'https://www.mtjfoundation.org/thanks', 
        FAILURE_URL: (process.env.REACT_APP_FAILURE_URL || 'https://www.mtjfoundation.org/donate'), //return back to home page if payment fails
        CHECKOUT_URL: (`https://mtjf-erp-backend.up.railway.app/donations/public/payfast/ipn`), // backend api url to handle payfast response to update donation status
        BASKET_ID,        // must match token call
        ORDER_DATE,
        CURRENCY_CODE: (process.env.REACT_APP_CURRENCY_CODE || 'PKR'),
        TRAN_TYPE: "ECOMM_PURCHASE",
      }

      // console.log("PayFast fields:", fields)
      
      // Build and submit a real HTML form (POST navigation)
      const form = document.createElement('form')
      form.method = 'POST' 
      form.action = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction'
      form.target = '_blank' // Open in new tab

      Object.entries(fields).forEach(([k, v]) => {
        if (v == null || v === '') return
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = String(v)
        form.appendChild(input)
      })

      document.body.appendChild(form)
      
      // Submit form and remove it after a short delay
      form.submit()
      
      // Remove form from DOM after submission
      setTimeout(() => {
        if (form.parentNode) {
          form.parentNode.removeChild(form)
        }
      }, 1000)
      
      setIsLoading(false)
    } catch (error) {
      console.error('Error in postToPayfast:', error)
      setFormMessage({ type: 'error', text: 'Failed to initialize payment. Please try again.' })
      setIsLoading(false)
    }
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

    // Calculate total amount - support both flows
    let totalAmount = 0
    if (isProjectDonationsFlow) {
      // Calculate from project donations
      const donationsToUse = donationItemsFromState.length > 0 ? donationItemsFromState : projectDonations
      totalAmount = donationsToUse.reduce((sum, donation) => {
        return sum + (donation.totalAmount || 0)
      }, 0)
      
      // Also check totalAmountFromState as fallback
      if (totalAmount === 0 && totalAmountFromState > 0) {
        totalAmount = totalAmountFromState
      }
    } else if (isOldDonationFormFlow) {
      // Calculate from old donation form data
      totalAmount = donationData?.finalAmount || donationData?.amount || donationData?.customAmount || 0
    }

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

      // Get project info - support both flows
      let project_id = ''
      let project_name = ''
      
      if (isProjectDonationsFlow) {
        // For project donations flow, get project info from first donation
        const donationsToUse = donationItemsFromState.length > 0 ? donationItemsFromState : projectDonations
        if (donationsToUse.length > 0) {
          const firstDonation = donationsToUse[0]
          project_id = firstDonation.projectId || ''
          project_name = firstDonation.projectTitle || ''
        }
      } else if (isOldDonationFormFlow) {
        // For old donation form flow
        project_id = donationData?.projectId || ''
        if (project_id) {
          const project = ALL_PROJECTS_DATA.find(p => p.id === project_id)
          project_name = project?.title || ''
        }
      }

      const payload = {
        project_id,
        project_name,
        ...formData,
        donation_method: currentPayment,
        donation_frequency: paymentFrequency[currentPayment] || 'once',
        donation_source: 'website',
        amount: totalAmount,
        currency: isOldDonationFormFlow ? (donationData?.currency || 'PKR') : 'PKR',
        status: 'pending',
        // Include donation items for project donations flow
        ...(isProjectDonationsFlow && {
          donation_items: donationItemsFromState.length > 0 ? donationItemsFromState : projectDonations
        })
      }

      const response = await axiosInstance.post('/donations', payload)

      if (currentPayment === 'payfast') {
        // Debug: Log the response to see its structure
        console.log('PayFast response:', response.data)
        console.log('PayFast response.data:', response.data?.data)
        
        // Call postToPayfast with the response data from the server
        // Try different possible response structures
        const payfastData = response.data?.data || response.data
        postToPayfast(payfastData, formData)
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

  // Don't render if no donation data from either flow
  if (!isOldDonationFormFlow && !isProjectDonationsFlow) {
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

                    {/* PayFast payment option */}
                    <div className="col-md-6">
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
                  <h6>Credit, Debit Card, Jazz Cash</h6>
                  <p>Payfast's (Faysal Bank) Secure online payment gateway</p>
                </div>
                {isLoading && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>


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
                  <h6>Credit, Debit Card, Jazz Cash, EasyPaisa</h6>
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
        </div>
      </form>
    </section>
  )
}

export default CheckoutForm

