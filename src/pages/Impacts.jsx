import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import ImportantDocuments from '../components/downloads/Downloads'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import image1 from '../assets/img/blogs/hero_blogs.webp'
import Stats from '../components/stats/Stats'
import BrandArea from '../components/brands/brands'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const FinancialReports = lazy(() => import('../components/financialReports/FinancialReports'))
const WhistleblowerPolicy = lazy(() =>
  import("../components/WhistleblowerPolicy/WhistleblowerPolicy")
);

const ImpactsPage = () => {
  // First component after header - loads immediately
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
        <PageHeader image={image1} />
      

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
       
          <>
           <Stats />
          <BrandArea />
            <Suspense fallback={null}>
              <Newsletter />
            </Suspense>
            <Suspense fallback={null}>
              <DonationCta />
            </Suspense>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
      </div>
    </>
  )
}

export default ImpactsPage
