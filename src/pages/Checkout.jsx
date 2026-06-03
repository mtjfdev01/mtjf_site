import React, { Suspense, lazy, useEffect } from 'react'
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

const TEST_CHECKOUT_DEFAULT_AMOUNT = 222

const Checkout = () => {
  const location = useLocation()
  const testCheckout = location.pathname === '/test-checkout'
  const { amount, setDonationFormData } = useDonation()

  useEffect(() => {
    if (!testCheckout || (amount && amount > 0)) return
    setDonationFormData({
      amount: String(TEST_CHECKOUT_DEFAULT_AMOUNT),
      finalAmount: TEST_CHECKOUT_DEFAULT_AMOUNT,
      customAmount: TEST_CHECKOUT_DEFAULT_AMOUNT,
      currency: 'PKR',
      category: 'General',
      donation_type: 'general',
    })
  }, [testCheckout, amount, setDonationFormData])

  // Use total amount from context (already calculated from all sources)
  const totalAmount = amount || (testCheckout ? TEST_CHECKOUT_DEFAULT_AMOUNT : 0)

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
            <CheckoutForm testCheckout={testCheckout} />
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
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <DonationCta />
            </Suspense>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
      </div>
    </>
  )
}
export default Checkout
