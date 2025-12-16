import { lazy, Suspense } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/projects/apna_ghr.webp'

const WaysToDonateSection = lazy(() => import('../components/waysToDonate/WaysToDonateSection'))
const Footer = lazy(() => import('../components/footer/Footer'))

const WaysToDonate = () => {
  const [sectionRef, showSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  })
  
  const [footerRef, showFooter] = useIntersectionObserver({ 
    rootMargin: '200px'
  })

  return (
    <>
      <PageHeader title="Ways To Donate" image={image1} />
      
      <div ref={sectionRef}>
        {showSection && (
          <Suspense fallback={null}>
            <WaysToDonateSection />
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

export default WaysToDonate

