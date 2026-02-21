import React, { useState, lazy } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import ZakatCalculatorComponent from '../components/zakatCalculator/ZakatCalculator'
import '../common/styles/common.css'
import '../common/styles/base.css'
import image1 from '../assets/img/zakat/Zakat Calculator.webp'
import PageHeader from '../components/pageHeader/PageHeader'
const Footer = lazy(() => import('../components/footer/Footer'))
const FAQs = lazy(() => import('../components/faqs/FAQs'))

const ZakatCalculator = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px', 
    loadImmediately: true 
  })
  const faqs = [
    {
      question: 'What is the Zakat Calculator?',
      answer: 'The Zakat Calculator is a simple online tool that helps you calculate the amount of Zakat you are obligated to pay according to Islamic guidelines, based on your assets and savings.'
    },
    {
      question: 'Who should pay Zakat?',
      answer: 'Zakat is obligatory for Muslims whose wealth reaches or exceeds the Nisab (minimum threshold). This includes cash, savings, gold, silver, business inventory, and other eligible assets.'
    },
    {
      question: 'How does the calculator work?',
      answer: 'The calculator considers your eligible assets, liabilities, and savings over a lunar year. By entering your values, it automatically calculates the 2.5% Zakat you are required to pay.'
    },
    {
      question: 'What types of wealth should I include?',
      answer: 'You should include Cash, Bank balances, and savings, Gold and silver, Stocks, Mutual funds, and investments, Business inventory and profits, Rental income or other passive income.'
    },
    {
      question: 'What should I exclude from Zakat calculation?',
      answer: 'You should exclude Personal belongings (home, furniture, car, etc.), Debts you owe, and Essentials required for daily living.'
    },
    {
      question: 'Is Zakat only for money and gold?',
      answer: 'No. Zakat applies to all eligible wealth, including business inventory, agricultural produce, livestock, and certain investments.'
    },
    {
      question: 'Can I use this calculator for family wealth?',
      answer: 'Yes. You can calculate Zakat for your personal wealth as well as family assets, provided you account for combined assets and liabilities accurately.'
    },
    {
      question: 'Is my information safe on this website?',
      answer: 'Absolutely. We respect your privacy. No personal data is stored or shared. The calculator is for your guidance only.'
    },
    {
      question: 'Can I donate Zakat directly through your website?',
      answer: 'Yes. After calculating your Zakat, you will have the option to donate online, safely and securely, to our verified programs for those in need.'
    },
    {
      question: 'What if I am unsure about my calculation?',
      answer: 'If you are uncertain, you can consult a qualified scholar or our team for guidance. The calculator is a tool to help, but final responsibility for accuracy lies with the donor.'
    },
    {
      question: 'How often should I pay Zakat?',
      answer: 'Zakat is due once every lunar year on wealth that meets the Nisab threshold.'
    },
    {
      question: 'Can I calculate Zakat for non-cash assets like property or business inventory?',
      answer: 'Yes. You can enter the current market value of your assets, and the calculator will include them in your Zakat computation.'
    },
    {
      question: 'Who is Zakat obligatory (Farz) upon?',
      answer: 'Zakat is Farz (obligatory) upon every adult Muslim who is sane and whose wealth reaches the Nisab threshold (the minimum amount of wealth that makes one liable for Zakat).'
    },
    {
      question: 'What is Nisab?',
      answer: 'Nisab is the minimum amount of wealth a Muslim must possess before Zakat becomes obligatory.'
    },
    {
      question: 'When should Zakat be paid?',
      answer: 'Zakat is due once every lunar year on wealth that has reached the Nisab threshold. It can also be paid anytime during the year if one chooses to do so.'
    },
    {
      question: 'Is paying Zakat online Shariah-compliant?',
      answer: 'Yes. Paying Zakat online through verified and trustworthy channels is Shariah-compliant, provided the funds reach the eligible recipients as intended.'
    },
    {
      question: 'Can I consult a scholar if I am unsure about my Zakat obligations?',
      answer: 'Yes. You can consult a qualified Islamic scholar to ensure your calculation and distribution of Zakat align with Shariah principles.'
    },
    {
      question: 'How does MTJ Foundation utilize Zakat?',
      answer: 'MTJ Foundation ensures that all Zakat donations are used strictly in accordance with Shariah guidelines. Zakat is distributed transparently to eligible recipients such as the poor, needy, and other Quran-specified categories, supporting essential needs like food, healthcare, clean water, and shelter. This ensures your Zakat is not only impactful but also fully compliant with Islamic law.'
    }
  ]
  const scrollToEligibility = () => {
    document.querySelector('.test_target')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (<>
  <PageHeader image={image1} onClick={scrollToEligibility} />
    <div ref={firstSectionRef}>
      {showFirstSection && (<>
        <ZakatCalculatorComponent />
        <FAQs title="Frequently Asked Questions (FAQs)"  faqs={faqs} />
        </>
      )}
    </div>
    <Footer  />
    </>
  )
}

export default ZakatCalculator

