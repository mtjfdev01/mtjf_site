import React, { useState, lazy } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import ZakatCalculatorComponent from '../components/zakatCalculator/ZakatCalculator'
import '../common/styles/common.css'
import '../common/styles/base.css'
import image1 from '../assets/img/zakat/zakat_hero.webp'
import PageHeader from '../components/pageHeader/PageHeader'
const Footer = lazy(() => import('../components/footer/Footer'))

const ZakatCalculator = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px', 
    loadImmediately: true 
  })

  return (<>
  <PageHeader image={image1} />
    <div ref={firstSectionRef}>
      {showFirstSection && (
        <ZakatCalculatorComponent />
      )}
    </div>
    <Footer  />
    </>
  )
}

export default ZakatCalculator

