import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
// import image1 from '../assets/img/contact us/hero contact.webp'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const CheckoutForm = lazy(() =>
  import('../components/checkoutForm/CheckoutForm')
)
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const Footer = lazy(() => import('../components/footer/Footer'))

const Checkout = () => {
  const [formRef, showForm] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      {/* <PageHeader title="Checkout" image={image1} /> */}

      <div ref={formRef}>
        {showForm && (
          <Suspense fallback={null}>
            <CheckoutForm />
          </Suspense>
        )}
      </div>

      <div ref={restRef} style={{ minHeight: '50px' }}>
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
