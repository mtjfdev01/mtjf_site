import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDonation } from '../../contexts/DonationContext'
import axiosInstance from '../../utils/axios'
import { ALL_PROJECTS_DATA } from '../../data/projectsData'
import './CheckoutForm.css'
import CountryDropdown from './CountryDropdown'
import Loader from '../Loader/Loader'
import { CiCreditCard2 } from "react-icons/ci";

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

/**
 * Inner form for Stripe Embedded payment: PaymentElement + confirmPayment.
 * Must be rendered inside <Elements options={{ clientSecret }}>.
 */
function StripeEmbedPaymentForm({ clientSecret, returnUrl, onClose }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return
    setError(null)
    // Required: call elements.submit() before confirmPayment (prior to any async work)
    await elements.submit()
    setIsConfirming(true)
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl,
        receipt_email: undefined,
      },
    })
    setIsConfirming(false)
    if (confirmError) {
      setError(confirmError.message || 'Payment failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-embed-form">
      <PaymentElement />
      {error && <div className="stripe-embed-form__error">{error}</div>}
      <div className="stripe-embed-form__actions">
        <button type="button" className="stripe-embed-form__btn stripe-embed-form__btn--secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="stripe-embed-form__btn stripe-embed-form__btn--primary" disabled={!stripe || isConfirming}>
          {isConfirming ? 'Processing…' : 'Pay now'}
        </button>
      </div>
    </form>
  )
}

const DEFAULT_FORM = {
  donor_name: '',
  donor_email: '',
  donor_phone: '',
  donation_type: 'general',
  donation_frequency: 'once',
  country: '',
  city: '',
  address: '',
  on_behalf_names: '',
  notification_subscription: true
}

// Payment frequency mapping (Stripe supports recurring; form value used when 'monthly')
const paymentFrequency = {
  blinq: 'once',
  payfast: 'once',
  meezan: 'once',
  stripe: 'once',
  stripe_embed: 'once'
}

const CheckoutForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { donationData, projectDonations, amount, clearDonationData, setProjectDonationData, setDonationFormData, ref, utmParams } = useDonation()
  console.log("donationData", donationData);
  console.log("projectDonations", projectDonations);

  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(null)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })
  const [isLoadingFailedTransaction, setIsLoadingFailedTransaction] = useState(false)
  const [isDonationPostLoading, setIsDonationPostLoading] = useState(false)
  const [donationIdFromQuery, setDonationIdFromQuery] = useState(null)
  const [stripeEmbedClientSecret, setStripeEmbedClientSecret] = useState(null)
  const hasFetchedFailedTransaction = useRef(false)
  const hasSetDonationItems = useRef(false)
  const previousDonationItemsRef = useRef(null)
  const previousDonationTypeRef = useRef(null)

  // Get donationID from query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const donationID = searchParams.get('donationId')
    if (donationID && donationID !== donationIdFromQuery) {
      // Reset the fetch flag when donationId changes
      hasFetchedFailedTransaction.current = false
      setDonationIdFromQuery(donationID)
    } else if (!donationID) {
      // Reset when donationId is removed from URL
      hasFetchedFailedTransaction.current = false
      setDonationIdFromQuery(null)
    }
  }, [location.search, donationIdFromQuery])

  // Get donation items from location state (passed from donation projects menu)
  const donationItemsFromState = location.state?.donationItems || []
  const totalAmountFromState = location.state?.totalAmount || 0
  
  // Determine which donation flow we're using
  const isProjectDonationsFlow = donationItemsFromState.length > 0 || projectDonations.length > 0
  const projectDonationItemsForCheckout = useMemo(
    () => (donationItemsFromState.length > 0 ? donationItemsFromState : projectDonations),
    [donationItemsFromState, projectDonations]
  )
  const isQurbaniOnlyCheckout = useMemo(
    () =>
      isProjectDonationsFlow &&
      projectDonationItemsForCheckout.length > 0 &&
      projectDonationItemsForCheckout.every(
        (d) => d.projectId === 'qurbani-baraye-mustehqeen' || d.projectId === 'qurbani'
      ),
    [isProjectDonationsFlow, projectDonationItemsForCheckout]
  )
  const isQurbaniCheckout = useMemo(
    () =>
      isQurbaniOnlyCheckout ||
      donationData?.projectId === 'qurbani-baraye-mustehqeen' ||
      donationData?.projectId === 'qurbani',
    [isQurbaniOnlyCheckout, donationData?.projectId]
  )
  const isOldDonationFormFlow = !!donationData
  const isFailedTransactionFlow = !!donationIdFromQuery

  // Initialize form with donation data if available (skip if failed transaction flow)
  useEffect(() => {
    if (donationData && !isFailedTransactionFlow) {
      if (donationData.category) {
        const labelToDonationType = {
          General: 'general',
          Zakat: 'zakat',
          Sadqa: 'sadqa',
          Qurbani: 'qurbani-baraye-mustehqeen',
          // DonationForm / context may store the API value as category (e.g. qurbani flow)
          'qurbani-baraye-mustehqeen': 'qurbani-baraye-mustehqeen',
          qurbani: 'qurbani-baraye-mustehqeen'
        }
        const raw = donationData.category
        const donationType =
          labelToDonationType[raw] ||
          (['general', 'zakat', 'sadqa', 'fitrana_2026', 'qurbani-baraye-mustehqeen'].includes(raw)
            ? raw
            : 'general')
        setFormData((prev) => ({
          ...prev,
          donation_type: donationType
        }))
      }
    }
  }, [donationData, isFailedTransactionFlow])

  // Store donation items from location state into context if available
  // Use ref to track if we've already set the data to prevent infinite loops
  useEffect(() => {
    // Check if donationItemsFromState has actually changed
    const itemsChanged = JSON.stringify(previousDonationItemsRef.current) !== JSON.stringify(donationItemsFromState)
    
    if (donationItemsFromState.length > 0 && setProjectDonationData && (itemsChanged || !hasSetDonationItems.current)) {
      setProjectDonationData(donationItemsFromState)
      hasSetDonationItems.current = true
      previousDonationItemsRef.current = donationItemsFromState
    }
    
    // Reset when donationItemsFromState is empty (new navigation without state)
    if (donationItemsFromState.length === 0) {
      hasSetDonationItems.current = false
      previousDonationItemsRef.current = null
    }
  }, [donationItemsFromState, setProjectDonationData])

  // Initialize donation type from project donations if available
  // Memoize the donation type to prevent unnecessary recalculations
  const firstDonationType = useMemo(() => {
    return projectDonationItemsForCheckout.length > 0
      ? projectDonationItemsForCheckout[0]?.donationType
      : null
  }, [projectDonationItemsForCheckout])
  
  useEffect(() => {
    if (isQurbaniOnlyCheckout) {
      setFormData((prev) => {
        if (prev.donation_type === 'qurbani-baraye-mustehqeen') return prev
        return { ...prev, donation_type: 'qurbani-baraye-mustehqeen' }
      })
      previousDonationTypeRef.current = 'qurbani-baraye-mustehqeen'
      return
    }

    if (isProjectDonationsFlow && firstDonationType) {
      const normalizedType = String(firstDonationType).trim().toLowerCase()
      const typeMap = {
        general: 'general',
        sadqa: 'sadqa',
        sadka: 'sadqa',
        zakat: 'zakat',
        fitrana: 'fitrana_2026',
        fitrana_2026: 'fitrana_2026',
        'qurbani-baraye-mustehqeen': 'qurbani-baraye-mustehqeen'
      }
      const newDonationType = typeMap[normalizedType] || 'general'

      if (previousDonationTypeRef.current !== newDonationType) {
        setFormData((prev) => {
          if (prev.donation_type === newDonationType) {
            return prev
          }
          return {
            ...prev,
            donation_type: newDonationType
          }
        })
        previousDonationTypeRef.current = newDonationType
      }
    } else if (!isProjectDonationsFlow) {
      previousDonationTypeRef.current = null
    }
  }, [isProjectDonationsFlow, firstDonationType, isQurbaniOnlyCheckout])

  // Handle failed transaction flow - fetch and populate form data
  useEffect(() => {
    // Prevent multiple calls - only fetch once per donationId
    if (!donationIdFromQuery || hasFetchedFailedTransaction.current) return

    const fetchFailedTransaction = async () => {
      try {
        hasFetchedFailedTransaction.current = true
        setIsLoadingFailedTransaction(true)
        
        // First, reset donation data as requested
        clearDonationData()

        // Fetch failed transaction data
        const response = await axiosInstance.get(`/donations/public/failed-transaction/${donationIdFromQuery}`)
        console.log("failed transaction response", response)
        
        if (response.data && response.data.success) {
          const failedTransaction = response.data.data
          const donor = failedTransaction.donor || {}
          
          console.log("Failed transaction data:", failedTransaction)
          console.log("Donor data:", donor)
          
          // Extract donation amount from transaction
          const donationAmount = failedTransaction.amount || 0
          console.log("Donation amount:", donationAmount)
          
          // FIRST: Set donation amount in context to make form visible
          if (donationAmount > 0) {
            const donationFormDataToSet = {
              amount: donationAmount.toString(),
              finalAmount: donationAmount.toString(),
              currency: failedTransaction.currency || 'PKR',
              category: failedTransaction.donation_type === 'zakat' ? 'Zakat' : 
                       failedTransaction.donation_type === 'sadqa' ? 'Sadqa' : 'General',
              projectId: failedTransaction.project_id || '',
              donation_type: failedTransaction.donation_type || 'general',
            }
            console.log("Setting donation form data:", donationFormDataToSet)
            setDonationFormData(donationFormDataToSet)
            
            // THEN: Pre-populate form with donor and transaction data after a small delay
            // to ensure donation data is set first
            setTimeout(() => {
              const formDataToSet = {
                donor_name: donor.name || '',
                donor_email: donor.email || '',
                donor_phone: donor.phone || '',
                donation_type: failedTransaction.donation_type || 'general',
                country: failedTransaction.country || donor.country || '',
                city: failedTransaction.city || donor.city || '',
                address: donor.address || ''
              }
              console.log("Setting form data:", formDataToSet)
              setFormData(prev => ({
                ...prev,
                ...formDataToSet
              }))
            }, 100)
          } else {
            // If no amount, still set form data
            const formDataToSet = {
              donor_name: donor.name || '',
              donor_email: donor.email || '',
              donor_phone: donor.phone || '',
              donation_type: failedTransaction.donation_type || 'general',
              country: failedTransaction.country || donor.country || '',
              city: failedTransaction.city || donor.city || '',
              address: donor.address || ''
            }
            console.log("Setting form data (no amount):", formDataToSet)
            setFormData(prev => ({
              ...prev,
              ...formDataToSet
            }))
          }

          setFormMessage({ 
            type: 'info', 
            text: 'Your previous donation attempt was not completed. Please complete the payment below.' 
          })
        } else {
          setFormMessage({ 
            type: 'error', 
            text: 'Failed to load donation information. Please try again.' 
          })
        }
      } catch (error) {
        console.error('Error fetching failed transaction:', error)
        setFormMessage({ 
          type: 'error', 
          text: error?.response?.data?.message || 'Failed to load donation information. Please try again.' 
        })
        hasFetchedFailedTransaction.current = false // Reset on error so user can retry
      } finally {
        setIsLoadingFailedTransaction(false)
      }
    }

    fetchFailedTransaction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationIdFromQuery]) // Only depend on donationIdFromQuery

  // REMOVED: Redirect check - always show checkout page
  // useEffect(() => {
  //   const hasDonationData = isOldDonationFormFlow || isProjectDonationsFlow || isFailedTransactionFlow
  //   if (!hasDonationData) {
  //     navigate('/home')
  //   }
  // }, [isOldDonationFormFlow, isProjectDonationsFlow, isFailedTransactionFlow, navigate])

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
        setIsLoading(null)
        return
      }

      const { MERCHANT_ID, ACCESS_TOKEN, BASKET_ID, TXNAMT } = payfastResponse

      // Validate required fields
      if (!MERCHANT_ID || !ACCESS_TOKEN || !BASKET_ID || !TXNAMT) {
        console.error('Missing required PayFast fields:', { MERCHANT_ID, ACCESS_TOKEN, BASKET_ID, TXNAMT })
        setFormMessage({ type: 'error', text: 'Missing payment information. Please try again.' })
        setIsLoading(null)
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

      
      // Build and submit a real HTML form (POST navigation)
      const form = document.createElement('form')
      form.method = 'POST' 
      form.action = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction'
      form.target = '_self' // Open in same window

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

      setIsLoading(null)
    } catch (error) {
      console.error('Error in postToPayfast:', error)
      setFormMessage({ type: 'error', text: 'Failed to initialize payment. Please try again.' })
      setIsLoading(null)
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

    // Use amount from context (already calculated from all sources)
    // Fallback to totalAmountFromState if amount is 0 and we have state
    let totalAmount = amount || 0
    if (totalAmount === 0 && totalAmountFromState > 0) {
      totalAmount = totalAmountFromState
    }
    totalAmount = Math.round(Number(totalAmount))

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
      setIsLoading(currentPayment)

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

      const { on_behalf_names, ...formFieldsForPayload } = formData
      const payload = {
        project_id,
        project_name,
        ...formFieldsForPayload,
        ...(isQurbaniCheckout && {
          on_behalf_names: typeof on_behalf_names === 'string' ? on_behalf_names.trim() : ''
        }),
        donation_method: currentPayment,
        // editable in UI, fallback to method default if missing
        donation_frequency: formData.donation_frequency || paymentFrequency[currentPayment] || 'once',
        donation_source: 'website',
        amount: totalAmount,
        currency: (isOldDonationFormFlow || isFailedTransactionFlow) ? (donationData?.currency || 'PKR') : 'PKR',
        status: 'pending',
        // Include donation items for project donations flow
        ...(isProjectDonationsFlow && {
          donation_items: donationItemsFromState.length > 0 ? donationItemsFromState : projectDonations
        }),
        // Old single-form flow: initiative template (e.g. Qurbani cow_share) from context
        ...(isOldDonationFormFlow &&
          donationData?.templateCode != null &&
          String(donationData.templateCode).trim() !== '' && {
            template_code: String(donationData.templateCode).trim()
          }),
        // Include donationID if this is a retry of failed transaction
        ...(isFailedTransactionFlow && donationIdFromQuery && {
          previous_donation_id: donationIdFromQuery
        }),
        // Include ref if available (agency performance tracking)
        ...(ref && {
          ref: ref
        }),
        // UTM campaign tracking (captured from landing URL)
        ...(utmParams && {
          ...(() => {
            const { utm_source, utm_medium, utm_campaign } = utmParams || {}
            // Case-insensitive so ?utm_campaign=Qurbani2026 matches (same as qurbani2026)
            const utmCampaignNorm = utm_campaign != null ? String(utm_campaign).trim().toLowerCase() : ''
            const hasUtmCampaign = utmCampaignNorm !== ''
            const resolvedCampaignId = hasUtmCampaign
              ? (utmCampaignNorm === 'qurbani2026' ? 3 : null)
              : undefined
            return {
              ...(utm_source ? { utm_source } : {}),
              ...(utm_medium ? { utm_medium } : {}),
              ...(hasUtmCampaign ? { campaign_id: resolvedCampaignId } : {})
            }
          })()
        }),
        // Stripe / Stripe Embed: recurring true when "Give Monthly" is selected
        ...((currentPayment === 'stripe' || currentPayment === 'stripe_embed') && {
          recurring: formData.donation_frequency === 'monthly'
        }),
        notification_subscription: formData.notification_subscription !== false
      }
      
      console.log('payload', payload)
              // Optional debug: set REACT_APP_DEBUG_CHECKOUT_PAYLOAD="true" to only log payload
      if (process.env.REACT_APP_DEBUG_CHECKOUT_PAYLOAD === 'true') {
        console.log('payload', payload)
        setIsLoading(null)
        return
      }
      
      let response
      try {
        setIsDonationPostLoading(true)
        response = await axiosInstance.post('/donations', payload)
      } finally {
        setIsDonationPostLoading(false)
      }
      

      if (currentPayment === 'payfast') {
        const payfastData = response.data?.data || response.data
        postToPayfast(payfastData, formData)
      } else if (currentPayment === 'stripe_embed') {
        const data = response.data?.data || response.data
        const clientSecret = data?.clientSecret
        if (clientSecret) {
          setIsLoading(null)
          setStripeEmbedClientSecret(clientSecret)
        } else {
          setIsLoading(null)
          setFormMessage({ type: 'error', text: 'Failed to start Stripe payment. Please try again.' })
        }
      } else {
        if (response?.data?.success && response?.data?.data?.paymentUrl) {
          try {
            setIsLoading(null)
            const paymentWindow = window.open('', '_self')
            if (paymentWindow) {
              paymentWindow.location.href = response.data.data.paymentUrl
              paymentWindow.focus()
            } else {
              setIsLoading(null)
              window.location.href = response.data.data.paymentUrl
            }
          } catch (error) {
            console.error('Error opening payment URL:', error)
            setIsLoading(null)
            window.location.href = response.data.data.paymentUrl
          }
        } else {
          setIsLoading(null)
          setFormMessage({ type: 'error', text: 'Failed to open invoice url' })
        }
      }
    } catch (error) {
      setIsLoading(null)
      setFormMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || error?.message || 'An error occurred. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Failed-transaction fetch: full-screen loader only (donation context cleared until data loads)
  if (isLoadingFailedTransaction) {
    return <Loader loading />
  }

  // Always render the form - no conditions
  // if (!isOldDonationFormFlow && !isProjectDonationsFlow && !isFailedTransactionFlow) {
  //   return null
  // }

  const stripeEmbedReturnUrl = `${window.location.origin}/thanks`

  const showCheckoutApiLoader = isDonationPostLoading

  return (
    <>
      <Loader loading={showCheckoutApiLoader} />
      <section className="checkout-panel">
      {stripeEmbedClientSecret && stripePromise && (
        <div className="stripe-embed-overlay" role="dialog" aria-modal="true" aria-labelledby="stripe-embed-title">
          <div className="stripe-embed-modal">
            <div className="stripe-embed-modal__header">
              <h2 id="stripe-embed-title" className="stripe-embed-modal__title">Complete payment</h2>
              <button type="button" className="stripe-embed-modal__close" onClick={() => setStripeEmbedClientSecret(null)} aria-label="Close">×</button>
            </div>
            <Elements stripe={stripePromise} options={{ clientSecret: stripeEmbedClientSecret }}>
              <StripeEmbedPaymentForm
                clientSecret={stripeEmbedClientSecret}
                returnUrl={stripeEmbedReturnUrl}
                onClose={() => setStripeEmbedClientSecret(null)}
              />
            </Elements>
          </div>
        </div>
      )}
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
                {isQurbaniOnlyCheckout ? (
                  <option value="qurbani-baraye-mustehqeen">Qurbani </option>
                ) : (
                  <>
                    <option value="general">General Donation</option>
                    <option value="zakat">Zakat </option>
                    <option value="sadqa">Sadqa </option>
                    <option value="fitrana_2026">Fitrana </option>
                    <option value="qurbani-baraye-mustehqeen">Qurbani </option>
                  </>
                )}
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
        {/* Donation Frequency (editable) */}
        <div className="checkout-panel__field">
          <label className="donation-form-label">Donation Frequency</label>
          <select
            className="checkout-panel__input checkout-panel__select"
            value={formData.donation_frequency}
            onChange={(e) => setFormData((prev) => ({ ...prev, donation_frequency: e.target.value }))}
          >
            <option value="once">Give Once only</option>
            <option value="monthly">Give Monthly</option>
          </select>
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
        {isQurbaniCheckout && (
          <div className="input-item input-item-textarea ltn__custom-icon checkout-panel__field checkout-panel__field--textarea">
            <label className="donation-form-label" htmlFor="checkout-on-behalf-names">
              On Behalf Names
            </label>
            <textarea
              id="checkout-on-behalf-names"
              name="on_behalf_names"
              placeholder="Enter names (one per line or separated by commas)"
              value={formData.on_behalf_names}
              onChange={handleInputChange}
              className="checkout-panel__input checkout-panel__textarea"
              rows="4"
            />
          </div>
        )}
        {/* Notification / campaign subscription */}
        <div className="checkout-panel__field checkout-panel__field--checkbox">
          <label className="checkout-panel__checkbox-label">
            <input
              type="checkbox"
              name="notification_subscription"
              checked={formData.notification_subscription}
              onChange={(e) => setFormData((prev) => ({ ...prev, notification_subscription: e.target.checked }))}
              className="checkout-panel__checkbox"
            />
            <span>Subscribe to email and WhatsApp for notifications and campaign updates</span>
          </label>
        </div>
        {/* Payment Method Section */}
        <h5 className="checkout-panel__title-2">Donate Via :</h5>

        <div className="row">
                  {/* blinq payment option */}
          {/* <div className="col-md-6">
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
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Pay with Bank Account (One Link)</h6>
                  {formData.donation_frequency === 'monthly' && (
                    <span className="payment-option-badge">Recurring</span>
                  )}
                  <div className="payment-selection-options"></div>
                </div>
                {isLoading && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}

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
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Pay Securely with Credit/Debit Card</h6>
                  {formData.donation_frequency === 'monthly' && (
                    <span className="payment-option-badge">Recurring</span>
                  )}
                </div>
                {isLoading === 'payfast' && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

                        {/* Meezan payment option */}
          {/* <div className="col-md-6">
            <div className="input-item">
              <div
                className={`payment-option ${isSubmitting || isLoading ? 'payment-option--disabled' : ''}`}
                onClick={(e) => {
                  if (!isSubmitting && !isLoading) {
                    handleSubmit(e, 'meezan')
                  }
                }}
              >
                <div className="payment-icon">
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Pay Securely with Credit/Debit Card (2nd)</h6>
                  {formData.donation_frequency === 'monthly' && (
                    <span className="payment-option-badge">Recurring</span>
                  )}
                </div>
                {isLoading === 'meezan' && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}
          

          


              {/* Stripe payment option (recurring when "Give Monthly" selected) */}
          {/* <div className="col-md-6">
            <div className="input-item">
              <div
                className={`payment-option ${isSubmitting || isLoading ? 'payment-option--disabled' : ''}`}
                onClick={(e) => {
                  if (!isSubmitting && !isLoading) {
                    handleSubmit(e, 'stripe')
                  }
                }}
              >
                <div className="payment-icon">
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Pay with Stripe (Card)</h6>
                  {formData.donation_frequency === 'monthly' && (
                    <span className="payment-option-badge">Recurring</span>
                  )}
                </div>
                {isLoading && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}

              {/* Stripe Embedded: payment form on page (no redirect) */}
          {/* <div className="col-md-6">
            <div className="input-item">
              <div
                className={`payment-option ${isSubmitting || isLoading ? 'payment-option--disabled' : ''}`}
                onClick={(e) => {
                  if (!isSubmitting && !isLoading) {
                    handleSubmit(e, 'stripe_embed')
                  }
                }}
              >
                <div className="payment-icon">
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Pay with Stripe </h6>
                  {formData.donation_frequency === 'monthly' && (
                    <span className="payment-option-badge">Recurring</span>
                  )}
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
    </>
  )
}

export default CheckoutForm

