import React, { Suspense, lazy, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useDonation } from '../contexts/DonationContext'
// import image1 from '../assets/img/projects/apna_ghr.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const CheckoutForm = lazy(() =>
  import('../components/checkoutForm/CheckoutForm')
)
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const Footer = lazy(() => import('../components/footer/Footer'))
const DonationSidebar = lazy(() => import('../components/donation/projects_menu/DonationSidebar'))

const TEST_CHECKOUT_DEFAULT_AMOUNT = 2500
const TEST_CHECKOUT_B_DEFAULT_AMOUNT = 100

const Checkout = () => {
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/'
  const isTestCheckoutOnly = pathname === '/test-checkout'
  const isTestCheckoutB = pathname === '/test-checkout-b' || pathname === '/test_checkout_b'
  const testCheckout = isTestCheckoutOnly || isTestCheckoutB
  const enableJazzCash = isTestCheckoutB
  const { amount, setDonationFormData } = useDonation()

  const campaignIdFromQuery = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('campaignId')
  }, [location.search])

  const testCheckoutFallbackAmount = isTestCheckoutOnly
    ? TEST_CHECKOUT_DEFAULT_AMOUNT
    : TEST_CHECKOUT_B_DEFAULT_AMOUNT

  useEffect(() => {
    if (!testCheckout || campaignIdFromQuery || (amount && amount > 0)) return
    setDonationFormData({
      amount: String(testCheckoutFallbackAmount),
      finalAmount: testCheckoutFallbackAmount,
      customAmount: testCheckoutFallbackAmount,
      currency: 'PKR',
      category: 'General',
      donation_type: 'general',
      ...(isTestCheckoutOnly && {
        frequency: 'monthly',
        donation_frequency: 'monthly',
      }),
    })
  }, [
    testCheckout,
    isTestCheckoutOnly,
    campaignIdFromQuery,
    amount,
    setDonationFormData,
    testCheckoutFallbackAmount,
  ])

  // Use total amount from context (already calculated from all sources)
  const totalAmount =
    amount ||
    (testCheckout && !campaignIdFromQuery ? testCheckoutFallbackAmount : 0)

  // First component after header - loads immediately
  const [formRef, showForm] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <div ref={formRef}>
        {showForm && (
          <Suspense fallback={null}>
            <CheckoutForm testCheckout={testCheckout} enableJazzCash={enableJazzCash} />
          </Suspense>
        )}
      </div>

      {/* Donation Sidebar - visible on checkout page */}
      {totalAmount > 0 && (
        <Suspense fallback={null}>
          <DonationSidebar 
            showBackButton={true}
          />
        </Suspense>
      )}

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: isTestCheckoutOnly ? 0 : '200px' }}>
        {showRest && !isTestCheckoutOnly && (
          <Suspense fallback={null}>
            <DonationCta />
          </Suspense>
        )}
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
export default Checkout
