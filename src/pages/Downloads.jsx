import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import ImportantDocuments from '../components/downloads/Downloads'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import image1 from '../assets/img/blogs/hero_blogs.webp'

const Footer = lazy(() => import('../components/footer/Footer'))
const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const FinancialReports = lazy(() => import('../components/financialReports/FinancialReports'))
const WhistleblowerPolicy = lazy(() =>
  import("../components/WhistleblowerPolicy/WhistleblowerPolicy")
);

const DownloadsPage = () => {
  // First component after header - loads immediately
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px',
    loadImmediately: true 
  });

  return (
    <>
        {/* <PageHeader image={image1} />  */}
      
      {/* Downloads Section - loads immediately */}
      <div ref={firstSectionRef} style={{marginTop:"130px"}}>
        {showFirstSection && (
          <FinancialReports showTitle isDownloads />
        )}
      </div>

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
          <Suspense fallback={null}>
             <WhistleblowerPolicy />
            </Suspense>
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
        )}
      </div>
    </>
  )
}

export default DownloadsPage
