import React, { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import ZakatCalculatorComponent from '../components/zakatCalculator/ZakatCalculator'
import '../common/styles/common.css'
import '../common/styles/base.css'

const ZakatCalculator = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px', 
    loadImmediately: true 
  })

  return (
    <div ref={firstSectionRef}>
      {showFirstSection && (
        <ZakatCalculatorComponent />
      )}
    </div>
  )
}

export default ZakatCalculator

