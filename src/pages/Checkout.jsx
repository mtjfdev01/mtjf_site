import React, { Suspense, lazy, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useDonation } from '../contexts/DonationContext'
import PageHeader from '../components/pageHeader/PageHeader'
// import image1 from '../assets/img/projects/apna_ghr.webp'
import CheckoutImage from '../assets/img/checkout/checkout.jpg'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const CheckoutForm = lazy(() =>
  import('../components/checkoutForm/CheckoutForm')
)
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const Footer = lazy(() => import('../components/footer/Footer'))
const DonationSidebar = lazy(() => import('../components/donation/projects_menu/DonationSidebar'))

const Checkout = () => {
  const location = useLocation()
  const { amount } = useDonation() 
  
  // Use total amount from context (already calculated from all sources)
  const totalAmount = amount || 0

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
      <PageHeader title="Checkout"  image={CheckoutImage}/>

      <div ref={formRef}>
        {showForm && (
          <Suspense fallback={null}>
            <CheckoutForm />
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
