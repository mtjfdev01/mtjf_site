import { lazy, Suspense } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import PageHeader from '../components/pageHeader/PageHeader'
import DonateImage from '../assets/img/donate/donate.png'
import DonateLgImage from '../assets/img/donate/donate_xs.png'
import OfficeSection from '../components/contant-us/OfficeSection';
import { nationalOffices } from '../data/contactOffices';
const Footer = lazy(() => import('../components/footer/Footer'))

const RegionalOffices = () => {
  const [sectionRef, showSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  })
  
  const [footerRef, showFooter] = useIntersectionObserver({ 
    rootMargin: '200px'
  })

  return (
    <>
    <div className='d-none md:d-block'>
      <PageHeader title={'Main Donation Page'} image={DonateLgImage}/>
    </div>
    <div className='md:d-none'>
    <PageHeader title={'Main Donation Page'} image={DonateImage}/>
    </div>      
      <div ref={sectionRef}>
        {showSection && (
          <Suspense fallback={null}>
            <OfficeSection title="Our Regional Offices" offices={nationalOffices} />
          </Suspense>
        )}
      </div>

      <div ref={footerRef} style={{ minHeight: '200px' }}>
        {showFooter && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default RegionalOffices

