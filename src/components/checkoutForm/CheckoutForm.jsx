import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDonation } from '../../contexts/DonationContext'
import axiosInstance from '../../utils/axios'
import { PROJECTS_DETAIL_DATA } from '../../data/projectsData'
import './CheckoutForm.css'
import CountryDropdown from './CountryDropdown'
import AppealCheckoutFields from './AppealCheckoutFields'
import CampaignCheckoutFields from './CampaignCheckoutFields'
import Loader from '../Loader/Loader'
import {
  fetchPublicCampaign,
  computeCampaignCheckoutTotal,
  buildCampaignPledgeSummary,
} from '../../lib/campaignCheckoutApi'
import { postGatewayForm } from '../../lib/paymentGatewayForm'
import {
  getNextFirstOfMonthDateString,
  getStripeRecurringForPayload,
  getTodayDayOfMonth,
  isDailyDonationFrequency,
  isMonthlyDonationFrequency,
  isRecurringDonationFrequency,
  isWeeklyDonationFrequency,
  RECURRING_CONSENT_TEXT,
  RECURRING_START_CUSTOM,
  RECURRING_START_DAY_OF_MONTH,
  RECURRING_START_FIRST_OF_MONTH,
  RECURRING_START_SAME_DATE,
  STRIPE_DONATION_METHOD,
} from '../../lib/stripeRecurring'
import {
  computeRecurringPresetTotals,
  getRecurringAmountKeyFromSearch,
  getRecurringBaseAmount,
  getRecurringFrequencyFromSearch,
  getRecurringGiftModeFromSearch,
  getRecurringPeriodsFromSearch,
  prepaidPeriodCadenceLabel,
  RECURRING_GIFT_MODE_MONTHLY,
  RECURRING_GIFT_MODE_PREPAID,
  RECURRING_PRESET_FREQUENCIES,
} from '../../lib/recurringAmountPresets'
import { CiCreditCard2 } from "react-icons/ci";
import { fetchAppealsList } from '../../lib/appealsApi'
import { buildAppealDonationLine, isAppealDonationLine } from '../../lib/appealsHelpers'

const MAX_RECURRING_DAY_OF_MONTH = 30

const getDefaultRecurringDayOfMonth = () =>
  String(Math.min(getTodayDayOfMonth(), MAX_RECURRING_DAY_OF_MONTH))

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
  recurring_start_mode: RECURRING_START_FIRST_OF_MONTH,
  recurring_start_date: getNextFirstOfMonthDateString(),
  recurring_day_of_month: getDefaultRecurringDayOfMonth(),
  recurring_consent: true,
  country: '',
  city: '',
  address: '',
  on_behalf_names: '',
  jazzcash_cnic: '',
  notification_subscription: true
}

// Non-Stripe gateways are one-time only; monthly uses donation_method stripe + recurring object
const paymentFrequency = {
  blinq: 'once',
  payfast: 'once',
  meezan: 'once',
  jazzcash: 'once',
  stripe: 'once',
  stripe_embed: 'once',
  alfalah: 'once',
}

const CheckoutForm = ({ testCheckout = false }) => {
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
  /** Set when `?donationId=` retry flow loads `/donations/public/failed-transaction/:id` — sent as `donor_id` on POST */
  const [failedRetryDonorId, setFailedRetryDonorId] = useState(null)
  const [stripeEmbedClientSecret, setStripeEmbedClientSecret] = useState(null)
  const hasFetchedFailedTransaction = useRef(false)
  const hasSetDonationItems = useRef(false)
  const previousDonationItemsRef = useRef(null)
  const previousDonationTypeRef = useRef(null)
  const appealCheckoutInitialized = useRef(false)
  const campaignCheckoutInitialized = useRef(false)

  const [campaignCheckout, setCampaignCheckout] = useState(null)
  const [campaignItems, setCampaignItems] = useState([])
  const [campaignItemsLoading, setCampaignItemsLoading] = useState(false)
  const [campaignItemQuantities, setCampaignItemQuantities] = useState({})
  const [campaignPledgeMode, setCampaignPledgeMode] = useState('recurring_monthly')
  const [campaignPrepaidMonths, setCampaignPrepaidMonths] = useState('3')

  const [appealsList, setAppealsList] = useState([])
  const [appealsLoading, setAppealsLoading] = useState(false)
  const [selectedAppealId, setSelectedAppealId] = useState('')
  const [appealAmount, setAppealAmount] = useState('')
  const appealIdFromQuery = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('appealId')
  }, [location.search])

  const appealSlugFromQuery = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('appealSlug')
  }, [location.search])

  const campaignIdFromQuery = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('campaignId')
  }, [location.search])

  const recurringAmountKey = useMemo(
    () => getRecurringAmountKeyFromSearch(location.search),
    [location.search],
  )
  const recurringBaseAmount = useMemo(
    () => getRecurringBaseAmount(recurringAmountKey),
    [recurringAmountKey],
  )
  const [recurringGiftMode, setRecurringGiftMode] = useState(() =>
    getRecurringGiftModeFromSearch(location.search),
  )
  const [recurringPrepaidFrequency, setRecurringPrepaidFrequency] = useState(() =>
    getRecurringFrequencyFromSearch(location.search, 'monthly'),
  )
  const [recurringAmountUnits, setRecurringAmountUnits] = useState(1)
  const [recurringPrepaidPeriods, setRecurringPrepaidPeriods] = useState(() =>
    getRecurringPeriodsFromSearch(
      location.search,
      getRecurringFrequencyFromSearch(location.search, 'monthly'),
      3,
    ),
  )
  const [showMoreRecurringBillingOptions, setShowMoreRecurringBillingOptions] = useState(false)
  const recurringPresetTotals = useMemo(() => {
    if (!recurringBaseAmount) return null
    return computeRecurringPresetTotals({
      baseAmount: recurringBaseAmount,
      mode: recurringGiftMode,
      amountUnits: recurringAmountUnits,
      prepaidPeriods: recurringPrepaidPeriods,
      frequency: recurringPrepaidFrequency,
    })
  }, [
    recurringBaseAmount,
    recurringGiftMode,
    recurringAmountUnits,
    recurringPrepaidPeriods,
    recurringPrepaidFrequency,
  ])
  const recurringPresetAmount = recurringPresetTotals?.payNow ?? null
  const isRecurringAmountPresetFlow = Boolean(recurringBaseAmount)

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
      setFailedRetryDonorId(null)
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

  const isCampaignCheckoutFlow = useMemo(
    () =>
      testCheckout &&
      Boolean(campaignIdFromQuery) &&
      !isFailedTransactionFlow,
    [testCheckout, campaignIdFromQuery, isFailedTransactionFlow],
  )

  const campaignMonthlyTotal = useMemo(() => {
    if (!isCampaignCheckoutFlow) return 0
    return computeCampaignCheckoutTotal(
      campaignItems,
      campaignItemQuantities,
      'recurring_monthly',
      1,
    )
  }, [isCampaignCheckoutFlow, campaignItems, campaignItemQuantities])

  const campaignCheckoutTotal = useMemo(() => {
    if (!isCampaignCheckoutFlow) return 0
    const mode =
      campaignCheckout?.is_recurring === false
        ? 'recurring_monthly'
        : campaignPledgeMode
    return computeCampaignCheckoutTotal(
      campaignItems,
      campaignItemQuantities,
      mode,
      campaignPrepaidMonths,
    )
  }, [
    isCampaignCheckoutFlow,
    campaignItems,
    campaignItemQuantities,
    campaignPledgeMode,
    campaignPrepaidMonths,
    campaignCheckout?.is_recurring,
  ])

  const hasNonAppealProjectCart = useMemo(
    () =>
      projectDonationItemsForCheckout.some(
        (d) => d.projectId && d.projectId !== 'appeal' && !isAppealDonationLine(d)
      ),
    [projectDonationItemsForCheckout]
  )

  const hasAppealQuery = Boolean(appealIdFromQuery || appealSlugFromQuery)

  const isAppealCheckoutFlow = useMemo(
    () => {
      if (isCampaignCheckoutFlow) return false
      if (isFailedTransactionFlow || donationItemsFromState.length > 0) return false
      if (hasAppealQuery) return true
      return (
        !hasNonAppealProjectCart &&
        projectDonationItemsForCheckout.some(isAppealDonationLine)
      )
    },
    [
      isCampaignCheckoutFlow,
      isFailedTransactionFlow,
      donationItemsFromState.length,
      hasAppealQuery,
      hasNonAppealProjectCart,
      projectDonationItemsForCheckout,
    ]
  )

  // URL preset amount (?recurring=gold / ?plan=silver) — skip when campaign/appeal/retry owns amount
  const showRecurringAmountStepper =
    isRecurringAmountPresetFlow &&
    !isCampaignCheckoutFlow &&
    !isAppealCheckoutFlow &&
    !isFailedTransactionFlow

  // Reset when URL key / mode / periods change
  useEffect(() => {
    const frequency = getRecurringFrequencyFromSearch(location.search, 'monthly')
    setRecurringGiftMode(getRecurringGiftModeFromSearch(location.search))
    setRecurringPrepaidFrequency(frequency)
    setRecurringPrepaidPeriods(getRecurringPeriodsFromSearch(location.search, frequency, 3))
    setRecurringAmountUnits(1)
  }, [recurringAmountKey, location.search])

  // Seed amount + frequency from URL preset
  useEffect(() => {
    if (!showRecurringAmountStepper || !recurringPresetTotals) return
    setDonationFormData({
      amount: String(recurringPresetTotals.payNow),
      finalAmount: recurringPresetTotals.payNow,
      currency: 'PKR',
      category: 'General',
      donation_type: 'general',
      recurring_amount_key: recurringAmountKey,
      recurring_gift_mode: recurringPresetTotals.mode,
      prepaid_periods: recurringPresetTotals.prepaidPeriods,
      prepaid_months:
        recurringPresetTotals.frequency === 'monthly'
          ? recurringPresetTotals.prepaidPeriods
          : undefined,
      monthly_amount: recurringPresetTotals.periodAmount,
      recurring_frequency: recurringPresetTotals.frequency,
    })
    setFormData((prev) => {
      const nextFrequency =
        recurringPresetTotals.mode === RECURRING_GIFT_MODE_PREPAID
          ? 'once'
          : recurringPrepaidFrequency
      const nextConsent = true
      if (
        prev.donation_frequency === nextFrequency &&
        prev.recurring_consent === nextConsent
      ) {
        return prev
      }
      return {
        ...prev,
        donation_frequency: nextFrequency,
        recurring_consent: nextConsent,
      }
    })
  }, [
    showRecurringAmountStepper,
    recurringPresetTotals,
    recurringAmountKey,
    recurringPrepaidFrequency,
    setDonationFormData,
  ])

  // Campaign checkout: load campaign + items from ?campaignId=
  useEffect(() => {
    if (!isCampaignCheckoutFlow || !campaignIdFromQuery) return undefined
    let cancelled = false
    campaignCheckoutInitialized.current = false
    setCampaignItemsLoading(true)
    setFormMessage({ type: '', text: '' })

    fetchPublicCampaign(campaignIdFromQuery)
      .then((campaign) => {
        if (cancelled) return
        setCampaignCheckout(campaign)
        const items = Array.isArray(campaign?.donation_items)
          ? campaign.donation_items
          : []
        setCampaignItems(items)
        const initialQty = {}
        items.forEach((item) => {
          initialQty[item.id] = ''
        })
        setCampaignItemQuantities(initialQty)
        setProjectDonationData([])
        setDonationFormData({
          amount: '0',
          finalAmount: 0,
          currency: campaign?.currency || 'PKR',
          category: 'General',
          donation_type: 'general',
          campaignId: campaign.id,
        })
        campaignCheckoutInitialized.current = true
      })
      .catch((err) => {
        if (cancelled) return
        setCampaignCheckout(null)
        setCampaignItems([])
        setFormMessage({
          type: 'error',
          text: err?.message || 'Failed to load campaign checkout',
        })
      })
      .finally(() => {
        if (!cancelled) setCampaignItemsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [
    isCampaignCheckoutFlow,
    campaignIdFromQuery,
    setDonationFormData,
    setProjectDonationData,
  ])

  // Keep donation context amount in sync with campaign item selections
  useEffect(() => {
    if (!isCampaignCheckoutFlow || !campaignCheckoutInitialized.current) return
    setDonationFormData({
      amount: String(campaignCheckoutTotal),
      finalAmount: campaignCheckoutTotal,
      currency: campaignCheckout?.currency || 'PKR',
      category: 'General',
      donation_type: 'general',
      campaignId: campaignCheckout?.id ?? campaignIdFromQuery,
    })
  }, [
    isCampaignCheckoutFlow,
    campaignCheckoutTotal,
    campaignCheckout,
    campaignIdFromQuery,
    setDonationFormData,
  ])

  // Recurring campaign pledge mode drives frequency defaults on test-checkout
  useEffect(() => {
    if (!isCampaignCheckoutFlow || !campaignCheckout?.is_recurring) return
    if (campaignPledgeMode === 'prepaid_months') {
      setFormData((prev) =>
        prev.donation_frequency === 'once'
          ? prev
          : { ...prev, donation_frequency: 'once', recurring_consent: false },
      )
      return
    }
    // Items every month → default Stripe monthly (donor can still switch to one-time)
    setFormData((prev) => {
      if (prev.donation_frequency === 'monthly') return prev
      return {
        ...prev,
        donation_frequency: 'monthly',
        recurring_consent: true,
      }
    })
  }, [isCampaignCheckoutFlow, campaignPledgeMode, campaignCheckout?.is_recurring])

  useEffect(() => {
    if (!isRecurringDonationFrequency(formData.donation_frequency)) {
      setShowMoreRecurringBillingOptions(false)
      return
    }
    if (formData.recurring_start_mode !== RECURRING_START_FIRST_OF_MONTH) {
      setShowMoreRecurringBillingOptions(true)
    }
  }, [formData.donation_frequency, formData.recurring_start_mode])

  // Appeal donate URL: clear other cart lines and pre-select appeal id before API list loads
  useEffect(() => {
    if (!hasAppealQuery) return
    setDonationFormData(null)
    setProjectDonationData([])
    appealCheckoutInitialized.current = false
    if (appealIdFromQuery) {
      setSelectedAppealId(String(appealIdFromQuery))
    }
  }, [hasAppealQuery, appealIdFromQuery, setDonationFormData, setProjectDonationData])

  // Load appeals for checkout selector
  useEffect(() => {
    if (!isAppealCheckoutFlow) return undefined
    let cancelled = false
    setAppealsLoading(true)
    fetchAppealsList()
      .then((list) => {
        if (!cancelled) setAppealsList(Array.isArray(list) ? list : [])
      })
      .catch(() => {
        if (!cancelled) setAppealsList([])
      })
      .finally(() => {
        if (!cancelled) setAppealsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [isAppealCheckoutFlow])

  // Match URL slug/id to loaded appeals list (when API returns)
  useEffect(() => {
    if (!isAppealCheckoutFlow || appealsList.length === 0) return
    if (appealCheckoutInitialized.current) return

    const fromCart = projectDonationItemsForCheckout.find(isAppealDonationLine)
    let appeal = null
    if (fromCart?.appealId) {
      appeal = appealsList.find((a) => String(a.id) === String(fromCart.appealId))
    } else if (appealIdFromQuery) {
      appeal = appealsList.find((a) => String(a.id) === String(appealIdFromQuery))
    } else if (appealSlugFromQuery) {
      appeal = appealsList.find((a) => a.slug === appealSlugFromQuery)
    }

    if (appeal) {
      setSelectedAppealId(String(appeal.id))
      const cartAmount = fromCart?.totalAmount
      if (cartAmount > 0) setAppealAmount(String(cartAmount))
    } else if (appealIdFromQuery) {
      setSelectedAppealId(String(appealIdFromQuery))
    }

    appealCheckoutInitialized.current = true
  }, [
    isAppealCheckoutFlow,
    appealsList,
    appealIdFromQuery,
    appealSlugFromQuery,
    projectDonationItemsForCheckout,
  ])

  // Sync appeal + amount into projectDonations for existing checkout amount/totals
  useEffect(() => {
    if (!isAppealCheckoutFlow || !setProjectDonationData) return

    if (!selectedAppealId) {
      setProjectDonationData([])
      return
    }

    const appeal = appealsList.find((a) => String(a.id) === String(selectedAppealId))
    if (!appeal) return

    const total = Math.round(Number(appealAmount) || 0)
    if (total <= 0) {
      setProjectDonationData([])
      return
    }

    setProjectDonationData([buildAppealDonationLine(appeal, total)])
  }, [
    isAppealCheckoutFlow,
    selectedAppealId,
    appealAmount,
    appealsList,
    setProjectDonationData,
  ])

  const selectedAppealForCheckout = useMemo(() => {
    if (!isAppealCheckoutFlow) return null
    const fromList = appealsList.find((a) => String(a.id) === String(selectedAppealId))
    if (fromList) return fromList
    const fromCart = projectDonationItemsForCheckout.find(isAppealDonationLine)
    if (fromCart) {
      return {
        id: fromCart.appealId,
        title: fromCart.projectTitle || 'Appeal',
        currency: fromCart.currency || 'PKR',
      }
    }
    if (selectedAppealId) {
      return { id: selectedAppealId, title: 'Appeal', currency: 'PKR' }
    }
    return null
  }, [
    isAppealCheckoutFlow,
    appealsList,
    selectedAppealId,
    projectDonationItemsForCheckout,
  ])

  // Initialize form with donation data if available (skip if failed transaction flow or appeal checkout)
  useEffect(() => {
    if (donationData && !isFailedTransactionFlow && !isAppealCheckoutFlow) {
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
  }, [donationData, isFailedTransactionFlow, isAppealCheckoutFlow])

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
        setFailedRetryDonorId(null)

        // Fetch failed transaction data
        const response = await axiosInstance.get(`/donations/public/failed-transaction/${donationIdFromQuery}`)

        if (response.data && response.data.success) {
          const failedTransaction = response.data?.data
          if (!failedTransaction || typeof failedTransaction !== 'object') {
            setFormMessage({
              type: 'error',
              text: 'Failed to load donation information (empty response). Please try again.'
            })
            hasFetchedFailedTransaction.current = false
            return
          }

          const donor = failedTransaction.donor && typeof failedTransaction.donor === 'object'
            ? failedTransaction.donor
            : {}

          const donorIdRaw =
            failedTransaction.donor_id ?? donor?.id ?? null
          const donorIdNum = donorIdRaw != null ? Number(donorIdRaw) : NaN
          setFailedRetryDonorId(Number.isFinite(donorIdNum) ? donorIdNum : null)

          const dt = String(failedTransaction.donation_type || '').toLowerCase()
          let categoryLabel = 'General'
          if (dt === 'zakat') categoryLabel = 'Zakat'
          else if (dt === 'sadqa' || dt === 'sadka') categoryLabel = 'Sadqa'
          else if (dt === 'qurbani-baraye-mustehqeen' || dt === 'qurbani') categoryLabel = 'Qurbani'

          // Extract donation amount from transaction
          const donationAmount = failedTransaction.amount || 0

          // FIRST: Set donation amount in context to make form visible
          if (donationAmount > 0) {
            const retryTemplateCode =
              failedTransaction.template_code ?? failedTransaction.templateCode ?? null
            const donationFormDataToSet = {
              amount: donationAmount.toString(),
              finalAmount: donationAmount.toString(),
              currency: failedTransaction.currency || 'PKR',
              category: categoryLabel,
              projectId: failedTransaction.project_id || '',
              donation_type: failedTransaction.donation_type || 'general',
              ...(retryTemplateCode != null &&
                String(retryTemplateCode).trim() !== '' && {
                  templateCode: String(retryTemplateCode).trim()
                })
            }
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
          setFailedRetryDonorId(null)
          setFormMessage({
            type: 'error',
            text: 'Failed to load donation information. Please try again.'
          })
        }
      } catch (error) {
        console.error('Error fetching failed transaction:', error)
        setFailedRetryDonorId(null)
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
        SUCCESS_URL: 'https://www.mtjfoundation.org/thanks?doantion_amount=' + TXNAMT, 
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

    if (!currentPayment) {
      setFormMessage({ type: 'error', text: 'Please select a payment method.' })
      return
    }

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

    if (currentPayment === 'jazzcash') {
      const cnicDigits = String(formData.jazzcash_cnic || '').replace(/\D/g, '')
      if (!/^\d{6}$/.test(cnicDigits)) {
        setFormMessage({
          type: 'error',
          text: 'Please enter the last 6 digits of your CNIC for JazzCash payment',
        })
        document.querySelector('input[name="jazzcash_cnic"]')?.focus()
        return
      }
    }

    // Use amount from context (already calculated from all sources)
    // Fallback to totalAmountFromState if amount is 0 and we have state
    let totalAmount = amount || 0
    if (showRecurringAmountStepper && recurringPresetAmount) {
      totalAmount = recurringPresetAmount
    } else if (isCampaignCheckoutFlow) {
      totalAmount = campaignCheckoutTotal
    } else if (totalAmount === 0 && totalAmountFromState > 0) {
      totalAmount = totalAmountFromState
    }
    if (totalAmount === 0 && testCheckout && !isCampaignCheckoutFlow && !showRecurringAmountStepper) {
      totalAmount = 111
    }
    totalAmount = Math.round(Number(totalAmount))

    if (isCampaignCheckoutFlow) {
      const hasSelectedItems = campaignItems.some(
        (item) => Number(campaignItemQuantities[item.id]) > 0,
      )
      if (!hasSelectedItems) {
        setFormMessage({
          type: 'error',
          text: 'Please select at least one campaign item with quantity',
        })
        return
      }
      if (campaignPledgeMode === 'prepaid_months' && campaignCheckout?.is_recurring) {
        const months = Number(campaignPrepaidMonths)
        if (!months || months < 1) {
          setFormMessage({
            type: 'error',
            text: 'Please enter a valid number of prepaid months',
          })
          return
        }
      }
    }

    if (!totalAmount || Number(totalAmount) <= 0 || Number(totalAmount) < 100) {
      setFormMessage({
        type: 'error',
        text: isCampaignCheckoutFlow
          ? 'Please select campaign items for a total of at least 100 PKR'
          : isAppealCheckoutFlow
          ? 'Please enter a valid donation amount (minimum 100 PKR)'
          : 'Please add donation items to the cart or enter a valid donation amount (minimum donation amount is 100 PKR)',
      })
      return
    }

    if (isAppealCheckoutFlow && !selectedAppealId) {
      setFormMessage({ type: 'error', text: 'Appeal information is missing. Please open checkout from the appeal page again.' })
      return
    }

    if (
      isCampaignCheckoutFlow &&
      campaignCheckout?.is_recurring &&
      campaignPledgeMode === 'prepaid_months' &&
      isRecurringDonationFrequency(formData.donation_frequency)
    ) {
      setFormMessage({
        type: 'error',
        text: 'Prepaid multi-month pledges must use a one-time payment.',
      })
      return
    }

    if (
      (isRecurringDonationFrequency(formData.donation_frequency) ||
        (showRecurringAmountStepper &&
          recurringPresetTotals?.mode === RECURRING_GIFT_MODE_PREPAID)) &&
      !formData.recurring_consent
    ) {
      setFormMessage({
        type: 'error',
        text: 'Please confirm the recurring donation authorization to continue.',
      })
      return
    }

    if (
      isRecurringDonationFrequency(formData.donation_frequency) &&
      !isDailyDonationFrequency(formData.donation_frequency) &&
      formData.recurring_start_mode === RECURRING_START_CUSTOM &&
      !String(formData.recurring_start_date || '').trim()
    ) {
      setFormMessage({
        type: 'error',
        text: 'Please choose a recurring start date.',
      })
      return
    }

    if (
      isMonthlyDonationFrequency(formData.donation_frequency) &&
      formData.recurring_start_mode === RECURRING_START_DAY_OF_MONTH
    ) {
      const dom = Number(formData.recurring_day_of_month)
      if (!Number.isFinite(dom) || dom < 1 || dom > MAX_RECURRING_DAY_OF_MONTH) {
        setFormMessage({
          type: 'error',
          text: `Please choose a valid day of the month (1–${MAX_RECURRING_DAY_OF_MONTH}).`,
        })
        return
      }
    }

    if (currentPayment === STRIPE_DONATION_METHOD && !stripePromise) {
      setFormMessage({
        type: 'error',
        text: 'Stripe is not configured. Please contact support or use another payment method.',
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
      
      if (isCampaignCheckoutFlow) {
        project_id = campaignCheckout?.project_id != null
          ? String(campaignCheckout.project_id)
          : ''
        project_name = campaignCheckout?.title || ''
      } else if (isProjectDonationsFlow) {
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
          const project = PROJECTS_DETAIL_DATA[project_id]
          project_name = project?.title || project?.donateCategory || ''
        }
      }

      const {
        on_behalf_names,
        recurring_start_mode,
        recurring_start_date,
        recurring_day_of_month,
        recurring_consent,
        ...formFieldsForPayload
      } = formData
      const appealLine = projectDonationItemsForCheckout.find(isAppealDonationLine)
      const appealIdForPayload =
        appealLine?.appealId ??
        (selectedAppealId && Number.isFinite(Number(selectedAppealId))
          ? Number(selectedAppealId)
          : null)

      const isPresetPrepaid =
        showRecurringAmountStepper &&
        recurringPresetTotals?.mode === RECURRING_GIFT_MODE_PREPAID

      const stripeRecurringPayload = getStripeRecurringForPayload(
        isPresetPrepaid ? recurringPrepaidFrequency : formData.donation_frequency,
        {
          startDateMode: recurring_start_mode,
          startDate: recurring_start_date,
          dayOfMonth: recurring_day_of_month,
          consent: recurring_consent === true || isPresetPrepaid,
        },
      )

      const isStripePayment =
        currentPayment === 'stripe' || currentPayment === STRIPE_DONATION_METHOD

      const campaignPledgeLines = isCampaignCheckoutFlow
        ? campaignItems
            .map((item) => ({
              campaign_item_id: Number(item.id),
              quantity: Number(campaignItemQuantities[item.id]) || 0,
            }))
            .filter((line) => line.campaign_item_id > 0 && line.quantity > 0)
        : []

      // Prepaid campaign only — regular recurring uses recurring_donations ledger
      const enrollManualRecurring =
        testCheckout &&
        !isStripePayment &&
        isCampaignCheckoutFlow &&
        campaignCheckout?.is_recurring === true &&
        campaignPledgeMode === 'prepaid_months'

      const resolvedCampaignId = Number(campaignCheckout?.id ?? campaignIdFromQuery)
      if (
        isCampaignCheckoutFlow &&
        (!Number.isFinite(resolvedCampaignId) || resolvedCampaignId <= 0)
      ) {
        setFormMessage({
          type: 'error',
          text: 'Campaign is still loading. Please wait a moment and try again.',
        })
        setIsLoading(null)
        setIsSubmitting(false)
        return
      }

      const payload = {
        project_id: isAppealCheckoutFlow ? 'appeal' : project_id,
        project_name: isAppealCheckoutFlow
          ? appealLine?.projectTitle || appealsList.find((a) => String(a.id) === String(selectedAppealId))?.title || ''
          : project_name,
        ...formFieldsForPayload,
        ...(isCampaignCheckoutFlow && {
          campaign_id: resolvedCampaignId,
          item_description: buildCampaignPledgeSummary(
            campaignItems,
            campaignItemQuantities,
            campaignPledgeMode,
            campaignPrepaidMonths,
            campaignCheckout?.is_recurring === true,
          ),
          item_name:
            campaignCheckout?.is_recurring && campaignPledgeMode === 'prepaid_months'
              ? `Prepaid ${campaignPrepaidMonths}-month campaign pledge`
              : campaignCheckout?.is_recurring
                ? 'Monthly campaign pledge'
                : 'Campaign donation',
        }),
        ...(isQurbaniCheckout && {
          on_behalf_names: typeof on_behalf_names === 'string' ? on_behalf_names.trim() : ''
        }),
        donation_method: currentPayment,
        // Stripe = auto subscription; other gateways charge once (+ manual pledge enrollment)
        // URL prepaid preset: charge total now, then ledger continues monthly after coverage
        donation_frequency: isPresetPrepaid
          ? 'once'
          : isCampaignCheckoutFlow
          ? campaignCheckout?.is_recurring && campaignPledgeMode === 'prepaid_months'
            ? 'once'
            : !campaignCheckout?.is_recurring
              ? 'once'
              : formData.donation_frequency || paymentFrequency[currentPayment] || 'once'
          : currentPayment === 'alfalah'
            ? 'once'
            : formData.donation_frequency || paymentFrequency[currentPayment] || 'once',
        donation_source: 'website',
        amount: totalAmount,
        currency: isCampaignCheckoutFlow
          ? (campaignCheckout?.currency || 'PKR')
          : (isOldDonationFormFlow || isFailedTransactionFlow)
            ? (donationData?.currency || 'PKR')
            : 'PKR',
        status: 'pending',
        ...(isPresetPrepaid &&
          recurringPresetTotals && {
            prepaid_periods: recurringPresetTotals.prepaidPeriods,
            ...(recurringPresetTotals.frequency === 'monthly' && {
              prepaid_months: recurringPresetTotals.prepaidPeriods,
            }),
            recurring_consent: true,
            ...(stripeRecurringPayload && { recurring: stripeRecurringPayload }),
            item_name: `Prepaid ${recurringPresetTotals.prepaidPeriods}-${recurringPresetTotals.periodUnitLabel} donation`,
            item_description: `Paid ${recurringPresetTotals.payNow.toLocaleString()} PKR now (${recurringPresetTotals.prepaidPeriods}×${recurringPresetTotals.periodAmount.toLocaleString()}); then ${recurringPresetTotals.periodAmount.toLocaleString()} PKR / ${recurringPresetTotals.cadenceLabel}`,
          }),
        ...(enrollManualRecurring && {
          enroll_manual_recurring: true,
          pledge_mode: 'prepaid_months',
          ...(campaignPledgeLines.length > 0 && {
            campaign_pledge_lines: campaignPledgeLines,
          }),
          prepaid_months: Number(campaignPrepaidMonths) || 1,
          recurring_consent: recurring_consent === true,
        }),
        // Consent + billing schedule for all recurring gateways (non-prepaid preset)
        ...(!isPresetPrepaid &&
          isRecurringDonationFrequency(formData.donation_frequency) && {
            recurring_consent: recurring_consent === true,
            ...(stripeRecurringPayload && { recurring: stripeRecurringPayload }),
          }),
        // Include donation items for project donations flow
        ...(isProjectDonationsFlow && {
          donation_items: donationItemsFromState.length > 0 ? donationItemsFromState : projectDonations
        }),
        ...(appealIdForPayload && {
          appeal_id: Number(appealIdForPayload),
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
        ...(isFailedTransactionFlow &&
          failedRetryDonorId != null &&
          Number.isFinite(Number(failedRetryDonorId)) && {
            donor_id: Number(failedRetryDonorId)
          }),
        // Include ref if available (agency performance tracking)
        ...(ref && {
          ref: ref
        }),
        // UTM campaign tracking (captured from landing URL)
        ...(utmParams && !isCampaignCheckoutFlow && {
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
        // Stripe only: lowercase currency + recurring subscription object
        ...(isStripePayment && {
          currency: String(
            isCampaignCheckoutFlow
              ? campaignCheckout?.currency || 'PKR'
              : (isOldDonationFormFlow || isFailedTransactionFlow)
                ? donationData?.currency || 'PKR'
                : 'PKR',
          ).toLowerCase(),
        }),
        notification_subscription: formData.notification_subscription !== false,
        ...(currentPayment === 'alfalah' && {
          alfalah_transaction_type: '3',
        }),
        ...(currentPayment === 'jazzcash' && {
          jazzcash_cnic: String(formData.jazzcash_cnic || '').replace(/\D/g, ''),
        }),
      }
      
      console.log('payload', payload)
      // return;
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
      } else if (currentPayment === 'alfalah') {
        const alfalahData = response.data?.data || response.data

        if (alfalahData?.formAction && alfalahData?.formFields) {
          try {
            // Server runs HS handshake; browser POST SSO/SSO/SSO (cardStep 2)
            postGatewayForm(alfalahData.formAction, alfalahData.formFields)
          } catch (formErr) {
            console.error(formErr)
            setFormMessage({
              type: 'error',
              text: 'Failed to open Bank Alfalah checkout. Please try again.',
            })
          }
        } else {
          setFormMessage({
            type: 'error',
            text:
              alfalahData?.message ||
              response.data?.message ||
              'Unexpected Bank Alfalah response. Please try again.',
          })
        }
        setIsLoading(null)
      } else if (currentPayment === 'jazzcash') {
        const data = response.data?.data || response.data
        setIsLoading(null)
        const donationId = data?.donationId || data?.id
        if (data?.paymentCompleted || data?.status === 'completed') {
          navigate(
            `/thank-you?donationId=${donationId || ''}&status=success`,
          )
        } else {
          setFormMessage({
            type: 'error',
            text:
              data?.pp_ResponseMessage ||
              response.data?.message ||
              'JazzCash payment failed. Please check your wallet balance and try again.',
          })
        }
      } else if (currentPayment === STRIPE_DONATION_METHOD || currentPayment === 'stripe_embed') {
        const data = response.data?.data || response.data
        const clientSecret = data?.clientSecret
        if (clientSecret) {
          setIsLoading(null)
          setStripeEmbedClientSecret(clientSecret)
        } else {
          setIsLoading(null)
          setFormMessage({ type: 'error', text: 'Failed to start Stripe payment. Please try again.' })
        }
      } else if (currentPayment === 'stripe') {
        if (response?.data?.success && response?.data?.data?.paymentUrl) {
          setIsLoading(null)
          window.location.href = response.data.data.paymentUrl
        } else {
          setIsLoading(null)
          setFormMessage({ type: 'error', text: 'Failed to open Stripe checkout. Please try again.' })
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
              <h2 id="stripe-embed-title" className="stripe-embed-modal__title">
                {isWeeklyDonationFrequency(formData.donation_frequency)
                  ? 'Complete weekly donation'
                  : isMonthlyDonationFrequency(formData.donation_frequency)
                    ? 'Complete monthly donation'
                    : isDailyDonationFrequency(formData.donation_frequency)
                      ? 'Complete daily donation'
                      : 'Complete payment'}
              </h2>
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

        {isCampaignCheckoutFlow && (
          <CampaignCheckoutFields
            campaignTitle={campaignCheckout?.title || ''}
            loading={campaignItemsLoading}
            items={campaignItems}
            quantities={campaignItemQuantities}
            onQuantityChange={(itemId, value) => {
              if (value === '' || Number(value) >= 0) {
                setCampaignItemQuantities((prev) => ({ ...prev, [itemId]: value }))
              }
            }}
            pledgeMode={campaignPledgeMode}
            onPledgeModeChange={setCampaignPledgeMode}
            prepaidMonths={campaignPrepaidMonths}
            onPrepaidMonthsChange={setCampaignPrepaidMonths}
            currency={campaignCheckout?.currency || 'PKR'}
            monthlyTotal={campaignMonthlyTotal}
            checkoutTotal={campaignCheckoutTotal}
            isRecurring={campaignCheckout?.is_recurring === true}
          />
        )}

        <div className="row">
          {isAppealCheckoutFlow && (
            <AppealCheckoutFields
              appealTitle={selectedAppealForCheckout?.title || ''}
              loading={appealsLoading}
              amount={appealAmount}
              currency={selectedAppealForCheckout?.currency || 'PKR'}
              onAmountChange={(val) => {
                if (val === '' || Number(val) >= 0) setAppealAmount(val)
              }}
            />
          )}

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

          {/* JazzCash CNIC — hidden while JazzCash payment is disabled */}
          {/* {testCheckout && (
          <div className="col-md-6">
            <div className="input-item input-item-name ltn__custom-icon checkout-panel__field">
              <input
                type="text"
                name="jazzcash_cnic"
                placeholder="CNIC last 6 digits (for JazzCash)"
                value={formData.jazzcash_cnic}
                onChange={handleInputChange}
                maxLength={6}
                inputMode="numeric"
                className="checkout-panel__input"
              />
            </div>
          </div>
          )} */}

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
                    {/* <option value="fitrana_2026">Fitrana </option> */}
                    {/* <option value="qurbani-baraye-mustehqeen">Qurbani </option> */}
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
        {isQurbaniCheckout && (
          <div className="input-item input-item-name ltn__custom-icon checkout-panel__field">
            {/* <label className="donation-form-label" htmlFor="checkout-on-behalf-names">
              On Behalf Names
            </label> */}
            <input
              id="checkout-on-behalf-names"
              type="text"
              name="on_behalf_names"
              placeholder="Enter names (comma-separated)"
              value={formData.on_behalf_names}
              onChange={handleInputChange}
              className="checkout-panel__input"
            />
          </div>
        )}

        <div className="input-item input-item-name ltn__custom-icon checkout-panel__field checkout-panel__field--full">
          {/* <label className="donation-form-label" htmlFor="checkout-address">
            Address
          </label> */}
          <input
            id="checkout-address"
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleInputChange}
            className="checkout-panel__input"
          />
        </div>

        {showRecurringAmountStepper && recurringPresetTotals && (
          <div className="checkout-panel__amount-stepper" role="group" aria-label="Recurring donation amount">
            <div className="checkout-panel__amount-stepper-header">
              <h3 className="checkout-panel__amount-stepper-title">Choose how you give</h3>
              <span className="checkout-panel__amount-stepper-plan">
                Plan: <strong>{recurringAmountKey}</strong>
                {' · '}
                base {recurringBaseAmount?.toLocaleString()} PKR /{' '}
                {prepaidPeriodCadenceLabel(recurringPrepaidFrequency)}
              </span>
            </div>

            <div className="checkout-panel__freq-chips" role="group" aria-label="Gift mode">
              <button
                type="button"
                className={`checkout-panel__freq-chip${
                  recurringGiftMode === RECURRING_GIFT_MODE_MONTHLY
                    ? ' checkout-panel__freq-chip--active'
                    : ''
                }`}
                onClick={() => setRecurringGiftMode(RECURRING_GIFT_MODE_MONTHLY)}
              >
                Each {prepaidPeriodCadenceLabel(recurringPrepaidFrequency)}
              </button>
              <button
                type="button"
                className={`checkout-panel__freq-chip${
                  recurringGiftMode === RECURRING_GIFT_MODE_PREPAID
                    ? ' checkout-panel__freq-chip--active'
                    : ''
                }`}
                onClick={() => setRecurringGiftMode(RECURRING_GIFT_MODE_PREPAID)}
              >
                Pay {recurringPresetTotals.periodUnitLabel} in advance
              </button>
            </div>

            {recurringGiftMode === RECURRING_GIFT_MODE_PREPAID && (
              <div
                className="checkout-panel__freq-chips checkout-panel__freq-chips--nested"
                role="group"
                aria-label="Prepaid frequency"
              >
                {RECURRING_PRESET_FREQUENCIES.map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    className={`checkout-panel__freq-chip${
                      recurringPrepaidFrequency === freq
                        ? ' checkout-panel__freq-chip--active'
                        : ''
                    }`}
                    onClick={() => setRecurringPrepaidFrequency(freq)}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            )}

            <p className="checkout-panel__amount-stepper-help">
              {recurringGiftMode === RECURRING_GIFT_MODE_PREPAID
                ? `Pay for several ${recurringPresetTotals.periodUnitLabel} now. After that period, the same amount continues automatically.`
                : `Donate this amount every ${prepaidPeriodCadenceLabel(recurringPrepaidFrequency)}. Use + / − to change the gift.`}
            </p>

            <div className="checkout-panel__amount-stepper-controls">
              <button
                type="button"
                className="checkout-panel__amount-btn"
                aria-label={
                  recurringGiftMode === RECURRING_GIFT_MODE_PREPAID
                    ? `Fewer ${recurringPresetTotals.periodUnitLabel}`
                    : 'Decrease amount'
                }
                disabled={
                  recurringGiftMode === RECURRING_GIFT_MODE_PREPAID
                    ? recurringPrepaidPeriods <= 1
                    : recurringAmountUnits <= 1
                }
                onClick={() => {
                  if (recurringGiftMode === RECURRING_GIFT_MODE_PREPAID) {
                    setRecurringPrepaidPeriods((prev) => Math.max(1, prev - 1))
                  } else {
                    setRecurringAmountUnits((prev) => Math.max(1, prev - 1))
                  }
                }}
              >
                −
              </button>
              <div className="checkout-panel__amount-value" aria-live="polite">
                <span className="checkout-panel__amount-value-num">
                  {recurringPresetTotals.payNow.toLocaleString()}
                </span>
                <span className="checkout-panel__amount-value-currency">
                  {recurringGiftMode === RECURRING_GIFT_MODE_PREPAID
                    ? `PKR now · ${recurringPrepaidPeriods} ${recurringPresetTotals.periodUnitLabel}`
                    : `PKR / ${recurringPresetTotals.cadenceLabel}`}
                </span>
              </div>
              <button
                type="button"
                className="checkout-panel__amount-btn"
                aria-label={
                  recurringGiftMode === RECURRING_GIFT_MODE_PREPAID
                    ? `More ${recurringPresetTotals.periodUnitLabel}`
                    : 'Increase amount'
                }
                disabled={
                  recurringGiftMode === RECURRING_GIFT_MODE_PREPAID &&
                  recurringPrepaidPeriods >= 36
                }
                onClick={() => {
                  if (recurringGiftMode === RECURRING_GIFT_MODE_PREPAID) {
                    setRecurringPrepaidPeriods((prev) => Math.min(36, prev + 1))
                  } else {
                    setRecurringAmountUnits((prev) => prev + 1)
                  }
                }}
              >
                +
              </button>
            </div>

            {recurringGiftMode === RECURRING_GIFT_MODE_PREPAID && (
              <p className="checkout-panel__amount-stepper-footnote">
                Then continues at{' '}
                <strong>
                  {recurringPresetTotals.periodAmount.toLocaleString()} PKR
                </strong>{' '}
                each {recurringPresetTotals.cadenceLabel} after the prepaid period.
              </p>
            )}

            {recurringGiftMode === RECURRING_GIFT_MODE_MONTHLY && (
              <div
                className="checkout-panel__freq-chips checkout-panel__freq-chips--nested"
                role="group"
                aria-label="Recurring frequency"
              >
                {RECURRING_PRESET_FREQUENCIES.map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    className={`checkout-panel__freq-chip${
                      recurringPrepaidFrequency === freq
                        ? ' checkout-panel__freq-chip--active'
                        : ''
                    }`}
                    onClick={() => setRecurringPrepaidFrequency(freq)}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Recurring consent — hidden for now */}
            {/* <label
              className={`checkout-panel__consent-card${
                formData.recurring_consent ? ' checkout-panel__consent-card--checked' : ''
              }`}
            >
              <input
                type="checkbox"
                name="recurring_consent"
                checked={formData.recurring_consent}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    recurring_consent: e.target.checked,
                  }))
                }
                className="checkout-panel__checkbox"
              />
              <span className="checkout-panel__consent-text">{RECURRING_CONSENT_TEXT}</span>
            </label> */}
          </div>
        )}

        {/* Donation frequency — recurring (Stripe); /test-checkout only; not for prepaid campaign */}
        {testCheckout &&
          !(isCampaignCheckoutFlow && campaignCheckout && !campaignCheckout.is_recurring) &&
          !(isCampaignCheckoutFlow && campaignPledgeMode === 'prepaid_months') &&
          !showRecurringAmountStepper && (
        <div className="checkout-panel__recurring-block">
          <div className="checkout-panel__recurring-header">
            <h3 className="checkout-panel__recurring-title">
              Select frequency:{' '}
            </h3>
          </div>

          <div className="checkout-panel__freq-chips" role="group" aria-label="Donation frequency">
            {[
              { value: 'once', label: 'One-time' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`checkout-panel__freq-chip${
                  formData.donation_frequency === opt.value
                    ? ' checkout-panel__freq-chip--active'
                    : ''
                }`}
                onClick={() => {
                  const nextFrequency = opt.value
                  setFormData((prev) => ({
                    ...prev,
                    donation_frequency: nextFrequency,
                    recurring_consent: isRecurringDonationFrequency(nextFrequency),
                    recurring_start_mode:
                      isDailyDonationFrequency(nextFrequency)
                        ? RECURRING_START_SAME_DATE
                        : nextFrequency === 'monthly'
                          ? prev.recurring_start_mode
                          : prev.recurring_start_mode === RECURRING_START_FIRST_OF_MONTH
                            ? RECURRING_START_SAME_DATE
                            : prev.recurring_start_mode,
                    recurring_start_date: isDailyDonationFrequency(nextFrequency)
                      ? ''
                      : prev.recurring_start_date,
                  }))
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {isRecurringDonationFrequency(formData.donation_frequency) && (
            <div className="checkout-panel__recurring-details">
              {!isDailyDonationFrequency(formData.donation_frequency) && (
                <>
              <div className="checkout-panel__recurring-subheader">
                <h4 className="checkout-panel__recurring-subtitle">
                  Recurring billing day
                </h4>
              </div>

              <div className="checkout-panel__start-options" role="radiogroup" aria-label="Recurring billing day">
                {isMonthlyDonationFrequency(formData.donation_frequency) ? (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formData.recurring_start_mode === RECURRING_START_FIRST_OF_MONTH}
                    className={`checkout-panel__start-option${
                      formData.recurring_start_mode === RECURRING_START_FIRST_OF_MONTH
                        ? ' checkout-panel__start-option--active'
                        : ''
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        recurring_start_mode: RECURRING_START_FIRST_OF_MONTH,
                        recurring_start_date: getNextFirstOfMonthDateString(),
                      }))
                    }
                  >
                    <span className="checkout-panel__start-option-radio" aria-hidden />
                    <span className="checkout-panel__start-option-copy">
                      <span className="checkout-panel__start-option-title">
                        Donate today, then charge on the 1st of every month
                      </span>
                      <span className="checkout-panel__start-option-desc">
                        Align future monthly charges to the 1st
                      </span>
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formData.recurring_start_mode === RECURRING_START_SAME_DATE}
                    className={`checkout-panel__start-option${
                      formData.recurring_start_mode === RECURRING_START_SAME_DATE
                        ? ' checkout-panel__start-option--active'
                        : ''
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        recurring_start_mode: RECURRING_START_SAME_DATE,
                        recurring_day_of_month: getDefaultRecurringDayOfMonth(),
                      }))
                    }
                  >
                    <span className="checkout-panel__start-option-radio" aria-hidden />
                    <span className="checkout-panel__start-option-copy">
                      <span className="checkout-panel__start-option-title">
                        Donate today and repeat on the same date
                      </span>
                      <span className="checkout-panel__start-option-desc">
                        First charge today, then on this same day each cycle
                      </span>
                    </span>
                  </button>
                )}

                {isMonthlyDonationFrequency(formData.donation_frequency) &&
                !showMoreRecurringBillingOptions ? (
                  <button
                    type="button"
                    className="checkout-panel__see-more-link"
                    onClick={() => setShowMoreRecurringBillingOptions(true)}
                  >
                    See more options
                  </button>
                ) : (
                  isMonthlyDonationFrequency(formData.donation_frequency) && (
                  <>
                <button
                  type="button"
                  role="radio"
                  aria-checked={formData.recurring_start_mode === RECURRING_START_SAME_DATE}
                  className={`checkout-panel__start-option${
                    formData.recurring_start_mode === RECURRING_START_SAME_DATE
                      ? ' checkout-panel__start-option--active'
                      : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      recurring_start_mode: RECURRING_START_SAME_DATE,
                      recurring_day_of_month: getDefaultRecurringDayOfMonth(),
                    }))
                  }
                >
                  <span className="checkout-panel__start-option-radio" aria-hidden />
                  <span className="checkout-panel__start-option-copy">
                    <span className="checkout-panel__start-option-title">
                      {`Today — repeat on the ${getTodayDayOfMonth()}th each month`}
                    </span>
                    <span className="checkout-panel__start-option-desc">
                      Donate today, then on this same day every month
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={formData.recurring_start_mode === RECURRING_START_DAY_OF_MONTH}
                  className={`checkout-panel__start-option${
                    formData.recurring_start_mode === RECURRING_START_DAY_OF_MONTH
                      ? ' checkout-panel__start-option--active'
                      : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      recurring_start_mode: RECURRING_START_DAY_OF_MONTH,
                      recurring_day_of_month:
                        prev.recurring_day_of_month || getDefaultRecurringDayOfMonth(),
                    }))
                  }
                >
                  <span className="checkout-panel__start-option-radio" aria-hidden />
                  <span className="checkout-panel__start-option-copy">
                    <span className="checkout-panel__start-option-title">
                      Choose day of every month
                    </span>
                    <span className="checkout-panel__start-option-desc">
                      e.g. pay on the 5th of each month (next reminder is at least 20 days after this donation)
                    </span>
                  </span>
                </button>

                {/* <button
                  type="button"
                  role="radio"
                  aria-checked={formData.recurring_start_mode === RECURRING_START_CUSTOM}
                  className={`checkout-panel__start-option${
                    formData.recurring_start_mode === RECURRING_START_CUSTOM
                      ? ' checkout-panel__start-option--active'
                      : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      recurring_start_mode: RECURRING_START_CUSTOM,
                    }))
                  }
                >
                  <span className="checkout-panel__start-option-radio" aria-hidden />
                  <span className="checkout-panel__start-option-copy">
                    <span className="checkout-panel__start-option-title">
                      Choose another available date
                    </span>
                    <span className="checkout-panel__start-option-desc">
                      Pick a custom start date for the recurring schedule
                    </span>
                  </span>
                </button>
                */}

                {formData.recurring_start_mode === RECURRING_START_FIRST_OF_MONTH && (
                  <button
                    type="button"
                    className="checkout-panel__see-more-link"
                    onClick={() => setShowMoreRecurringBillingOptions(false)}
                  >
                    See fewer options
                  </button>
                )}
                  </>
                  )
                )}
              </div>

              {formData.recurring_start_mode === RECURRING_START_DAY_OF_MONTH &&
                isMonthlyDonationFrequency(formData.donation_frequency) && (
                <div className="checkout-panel__field checkout-panel__day-picker-field">
                  <div className="checkout-panel__day-picker-header">
                    <label className="checkout-panel__date-label" htmlFor="checkout-recurring-day-of-month">
                      Day of month
                    </label>
                    <span className="checkout-panel__day-picker-selected">
                      {(() => {
                        const day = Number(
                          formData.recurring_day_of_month || getDefaultRecurringDayOfMonth(),
                        )
                        const suffix =
                          day % 10 === 1 && day !== 11
                            ? 'st'
                            : day % 10 === 2 && day !== 12
                              ? 'nd'
                              : day % 10 === 3 && day !== 13
                                ? 'rd'
                                : 'th'
                        return `Charges on the ${day}${suffix}`
                      })()}
                    </span>
                  </div>
                  <p className="checkout-panel__day-picker-hint">
                    Pick the day you want to be charged each month
                  </p>
                  <div
                    id="checkout-recurring-day-of-month"
                    className="checkout-panel__day-picker"
                    role="radiogroup"
                    aria-label="Day of month"
                  >
                    {Array.from({ length: MAX_RECURRING_DAY_OF_MONTH }, (_, i) => i + 1).map((day) => {
                      const dayValue = String(day)
                      const isSelected =
                        (formData.recurring_day_of_month || getDefaultRecurringDayOfMonth()) ===
                        dayValue

                      return (
                        <button
                          key={day}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          className={`checkout-panel__day-chip${
                            isSelected ? ' checkout-panel__day-chip--active' : ''
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              recurring_day_of_month: dayValue,
                            }))
                          }
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {formData.recurring_start_mode === RECURRING_START_CUSTOM && (
                <div className="checkout-panel__field checkout-panel__date-field">
                  <label className="checkout-panel__date-label" htmlFor="checkout-recurring-start-date">
                    Start date
                  </label>
                  <input
                    id="checkout-recurring-start-date"
                    type="date"
                    className="checkout-panel__input checkout-panel__date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={formData.recurring_start_date || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recurring_start_date: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
                </>
              )}

              {/* Recurring consent — hidden for now */}
              {/* <label
                className={`checkout-panel__consent-card${
                  formData.recurring_consent ? ' checkout-panel__consent-card--checked' : ''
                }`}
              >
                <input
                  type="checkbox"
                  name="recurring_consent"
                  checked={formData.recurring_consent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recurring_consent: e.target.checked,
                    }))
                  }
                  className="checkout-panel__checkbox"
                />
                <span className="checkout-panel__consent-text">{RECURRING_CONSENT_TEXT}</span>
              </label> */}
            </div>
          )}
        </div>
        )}

        </div>

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

          {/* PayFast — production checkout + test-checkout */}
          <div className="col-12">
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
                  <h6>Credit / Debit Card</h6>
                  <span className="payment-option-badge payment-option-badge--info">PayFast</span>
                </div>
                {isLoading === 'payfast' && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Alfalah account (SMS + email OTAC) — disabled */}
          {/* <div className="col-md-6">
            <div className="input-item">
              <div
                className={`payment-option ${isSubmitting || isLoading ? 'payment-option--disabled' : ''}`}
                onClick={(e) => {
                  if (!isSubmitting && !isLoading) {
                    handleAlfalahPayment(e, '2')
                  }
                }}
              >
                <div className="payment-icon">
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Bank Alfalah — Account</h6>
                  <span className="payment-option-badge payment-option-badge--info">SMS + email codes</span>
                </div>
                {isLoading === 'alfalah' && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}

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

          {/* Bank Alfalah — production checkout + test-checkout */}
          <div className="col-12">
            <div className="input-item">
              <div
                className={`payment-option ${isSubmitting || isLoading ? 'payment-option--disabled' : ''}`}
                onClick={(e) => {
                  if (!isSubmitting && !isLoading) {
                    handleSubmit(e, 'alfalah')
                  }
                }}
              >
                <div className="payment-icon">
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Credit / Debit Card</h6>
                  <span className="payment-option-badge payment-option-badge--info">Bank Alfalah</span>
                </div>
                {isLoading === 'alfalah' && (
                  <div className="payment-loading">
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* JazzCash MWallet — /test-checkout only (disabled, last) */}
          {testCheckout && (
          <div className="col-12">
            <div className="input-item">
              <div
                className="payment-option payment-option--disabled"
                aria-disabled="true"
              >
                <div className="payment-icon">
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Pay by JazzCash</h6>
                  <span className="payment-option-badge payment-option-badge--info">Mobile wallet</span>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Stripe — /test-checkout only (disabled, last) */}
          {testCheckout && (
          <div className="col-md-6">
            <div className="input-item">
              <div
                className="payment-option payment-option--disabled"
                aria-disabled="true"
              >
                <div className="payment-icon">
                  <CiCreditCard2 />
                </div>
                <div className="payment-content">
                  <h6>Pay with Stripe</h6>
                  <span className="payment-option-badge payment-option-badge--info">Card</span>
                  {isWeeklyDonationFrequency(formData.donation_frequency) && (
                    <span className="payment-option-badge">Weekly</span>
                  )}
                  {isMonthlyDonationFrequency(formData.donation_frequency) && (
                    <span className="payment-option-badge">Monthly</span>
                  )}
                  {isDailyDonationFrequency(formData.donation_frequency) && (
                    <span className="payment-option-badge">Daily</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </form>
    </section>
    </>
  )
}

export default CheckoutForm
