import React, { useState, useMemo, useEffect } from 'react'
import './ZakatCalculator.css'
import EligibilityTab from './tabs/EligibilityTab'
import CashTab from './tabs/CashTab'
import AssetsTab from './tabs/AssetsTab'
import GoldTab from './tabs/GoldTab'
import SilverTab from './tabs/SilverTab'
import ResultSection from './ResultSection'
import { fetchGoldSilverPrices } from '../../services/zakatService'
import goldBarImage from '../../assets/img/zakat/Gold icon.svg'

import silverBarImage from '../../assets/img/zakat/Silver icon.svg'
import cashIcon from '../../assets/img/zakat/Cash icon.svg'
const ZakatCalculator = () => {
  const [activeTab, setActiveTab] = useState('eligibility')
  
  // Eligibility state - removed ownsWealth check as it's now informational only
  
  // Cash/Assets state - structured as dynamic list
  const [cashItems, setCashItems] = useState([
    { id: 1, name: 'Cash in hand & in bank accounts', amount: '' }
  ])
  const [debts, setDebts] = useState([
    { id: 1, name: '', amount: '' }
  ])
  
  // Assets state - structured as dynamic list
  const [assetsItems, setAssetsItems] = useState([])
  
  // Gold state
  const [goldWeight, setGoldWeight] = useState('')
  const [goldUnit, setGoldUnit] = useState('tola')
  const [goldKaratPrices] = useState({
    24: 482500,
    22: 442405,
    21: 422296,
    18: 361968
  })
  const [goldPrice, setGoldPrice] = useState('482500')
  const [goldKarat, setGoldKarat] = useState(24)
  const [useCustomGoldPrice, setUseCustomGoldPrice] = useState(false)
  
  // Silver state
  const [silverWeight, setSilverWeight] = useState('')
  const [silverUnit, setSilverUnit] = useState('tola')
  const [silverPrice, setSilverPrice] = useState('7706')
  const [useCustomSilverPrice, setUseCustomSilverPrice] = useState(false)
  
  // Nisab base threshold selection (gold or silver)
  const [nisabMethod, setNisabMethod] = useState('gold')
  
  // State for fetched prices and calculated Nisab amounts
  const [fetchedGoldPrice, setFetchedGoldPrice] = useState(null)
  const [fetchedSilverPrice, setFetchedSilverPrice] = useState(null)
  const [goldNisabAmount, setGoldNisabAmount] = useState(null)
  const [silverNisabAmount, setSilverNisabAmount] = useState(null)
  
  // Constants
  const GOLD_NISAB_GRAMS = 87.48
  const SILVER_NISAB_GRAMS = 612.36
  const GOLD_NISAB_TOLA = 7.5
  const SILVER_NISAB_TOLA = 52.5
  const TOLA_TO_GRAMS = 11.664 // 1 tola = 11.664 grams
  const ZAKAT_RATE = 0.025 // 2.5%

  // Fetch gold and silver prices from backend on component mount
  useEffect(() => {
    const loadPrices = async () => {
      const prices = await fetchGoldSilverPrices()
      if (prices) {
        // Update gold price if available
        if (prices.goldPrice || prices.gold_price || prices.gold) {
          const goldPriceValue = prices.goldPrice || prices.gold_price || prices.gold
          const goldPriceNum = parseFloat(goldPriceValue)
          setFetchedGoldPrice(goldPriceNum)
          
          // Calculate Gold Nisab amount (price per tola * 7.5 tola)
          // Assuming prices from API are per tola
          const goldNisab = goldPriceNum * GOLD_NISAB_TOLA
          setGoldNisabAmount(Math.round(goldNisab))
        }
        
        // Update silver price if available
        if (prices.silverPrice || prices.silver_price || prices.silver) {
          const silverPriceValue = prices.silverPrice || prices.silver_price || prices.silver
          const silverPriceNum = parseFloat(silverPriceValue)
          setFetchedSilverPrice(silverPriceNum)
          
          // Calculate Silver Nisab amount (price per tola * 52.5 tola)
          // Assuming prices from API are per tola
          const silverNisab = silverPriceNum * SILVER_NISAB_TOLA
          setSilverNisabAmount(Math.round(silverNisab))
        }
      }
    }
    
    loadPrices()
  }, [])

  useEffect(() => {
    if (!useCustomGoldPrice) {
      const karatPrice = goldKaratPrices[goldKarat]
      const displayPrice = goldUnit === 'grams' ? karatPrice / 11.664 : karatPrice
      setGoldPrice(Math.round(displayPrice).toString())
    }
  }, [goldKarat, useCustomGoldPrice, goldUnit, goldKaratPrices])

  useEffect(() => {
    if (!useCustomSilverPrice && fetchedSilverPrice) {
    setSilverPrice(Math.round(fetchedSilverPrice).toString())
    }
}, [useCustomSilverPrice, fetchedSilverPrice])
  
  // Calculations
  const calculations = useMemo(() => {
    const toWholeNumber = (value) => Math.round(parseFloat(value) || 0)

    // Calculate Net Cash
    const cashTotal = cashItems.reduce((sum, item) => {
      const amount = toWholeNumber(item.amount)
      return sum + amount
    }, 0)
    
    const debtTotal = debts.reduce((sum, debt) => {
      const amount = toWholeNumber(debt.amount)
      return sum + amount
    }, 0)
    
    const netCash = Math.max(cashTotal - debtTotal, 0)
    
    // Calculate Gold Value
    // Price unit matches weight unit (tola or grams)
    let goldValue = 0
    if (goldWeight && goldPrice) {
      const weight = parseFloat(goldWeight) || 0
      const price = parseFloat(goldPrice) || 0
      // If unit is tola, price is per tola, so value = weight * price
      // If unit is grams, price is per gram, so value = weight * price
      // Both cases: value = weight * price (since price matches weight unit)
      goldValue = Math.round(weight * price)
    }
    
    // Calculate Silver Value
    // Price unit matches weight unit (tola or grams)
    let silverValue = 0
    if (silverWeight && silverPrice) {
      const weight = parseFloat(silverWeight) || 0
      const price = parseFloat(silverPrice) || 0
      // If unit is tola, price is per tola, so value = weight * price
      // If unit is grams, price is per gram, so value = weight * price
      // Both cases: value = weight * price (since price matches weight unit)
      silverValue = Math.round(weight * price)
    }
    
    // Calculate Assets Value
    // Calculate from quantity × pricePerItem, or use amount if provided
    const assetsTotal = assetsItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0
      const pricePerItem = parseFloat(item.pricePerItem) || 0
      const amount = toWholeNumber(item.amount)
      // Use calculated value (quantity × price) if both are provided, otherwise use amount
      const itemValue = (quantity > 0 && pricePerItem > 0)
        ? Math.round(quantity * pricePerItem)
        : amount
      return sum + itemValue
    }, 0)
    
    // Net Zakatable Wealth
    const netWealth = netCash + assetsTotal + goldValue + silverValue
    
    // Calculate Nisab Value based on user-selected base threshold (gold or silver)
    let nisabValue = 0
    let usedNisabMethod = nisabMethod

    if (nisabMethod === 'gold') {
      if (goldNisabAmount) {
        nisabValue = Math.round(goldNisabAmount)
      } else if (goldPrice) {
        const price = parseFloat(goldPrice) || 0
        const pricePerGram = goldUnit === 'tola' ? price / TOLA_TO_GRAMS : price
        nisabValue = Math.round(GOLD_NISAB_GRAMS * pricePerGram)
      }
    } else {
      if (silverNisabAmount) {
        nisabValue = Math.round(silverNisabAmount)
      } else if (silverPrice) {
        const price = parseFloat(silverPrice) || 0
        const pricePerGram = silverUnit === 'tola' ? price / TOLA_TO_GRAMS : price
        nisabValue = Math.round(SILVER_NISAB_GRAMS * pricePerGram)
      }
    }
    
    // Eligibility Check
    // Zakat is only due if net wealth EXCEEDS (not just equals) the Nisab threshold
    let eligibilityStatus = 'checking'
    if (nisabValue > 0) {
      if (netWealth < nisabValue) {
        eligibilityStatus = 'below-nisab'
      } else if (netWealth >= nisabValue) {
        eligibilityStatus = 'due'
      }
    }
    
    let zakatDue = 0
    let zakatCash = 0
    let zakatAssets = 0
    let zakatGold = 0
    let zakatSilver = 0
    
    if (eligibilityStatus === 'due' && netWealth >= nisabValue && nisabValue > 0) {
      // Keep all category and total amounts as whole numbers (non-decimal).
      zakatCash = Math.round(netCash * ZAKAT_RATE)
      zakatAssets = Math.round(assetsTotal * ZAKAT_RATE)
      zakatGold = Math.round(goldValue * ZAKAT_RATE)
      zakatSilver = Math.round(silverValue * ZAKAT_RATE)
      zakatDue = zakatCash + zakatAssets + zakatGold + zakatSilver
    }
    
    return {
      cashTotal,
      debtTotal,
      netCash,
      assetsTotal,
      goldValue,
      silverValue,
      netWealth,
      nisabValue,
      eligibilityStatus,
      zakatDue,
      zakatCash,
      zakatAssets,
      zakatGold,
      zakatSilver,
      usedNisabMethod
    }
  }, [
    cashItems,
    debts,
    assetsItems,
    goldWeight,
    goldUnit,
    goldPrice,
    silverWeight,
    silverUnit,
    silverPrice,
    nisabMethod,
    fetchedGoldPrice,
    fetchedSilverPrice,
    goldNisabAmount,
    silverNisabAmount
  ])

  const approxGoldPerTola = useMemo(() => {
    if (fetchedGoldPrice) return fetchedGoldPrice
    const parsed = parseFloat(goldPrice) || 0
    return goldUnit === 'grams' ? parsed * TOLA_TO_GRAMS : parsed
  }, [fetchedGoldPrice, goldPrice, goldUnit])

  const approxSilverPerTola = useMemo(() => {
    if (fetchedSilverPrice) return fetchedSilverPrice
    const parsed = parseFloat(silverPrice) || 0
    return silverUnit === 'grams' ? parsed * TOLA_TO_GRAMS : parsed
  }, [fetchedSilverPrice, silverPrice, silverUnit])
  
  const tabs = [
    { id: 'eligibility', label: 'Eligibility', icon: '✓' },
    { id: 'cash', label: 'Cash', icon: cashIcon, isImage: true },
    { id: 'assets', label: 'Assets', icon: '🏢' },
    { id: 'gold', label: 'Gold', icon: goldBarImage, isImage: true },
    { id: 'silver', label: 'Silver', icon: silverBarImage, isImage: true }
  ]
  
  return (
    <div className="zakat-calculator-page container py-48">
      <div className="zakat-header text-center mb-48">
        <h1 className="heading-secondary mb-16">Calculate your Zakat with Clarity using our Zakat Calculator</h1>
        <p className="text-lg muted w-full mx-auto">
        Ramadan is a time of reflection, generosity, and fulfilling our obligations. Zakat is one of the most important pillars of Islam, and paying it correctly ensures that your wealth benefits those who need it most. Our online Zakat Calculator helps you determine the exact amount of Zakat due on your wealth, savings, gold, silver, business assets, and other eligible assets.
        </p>
        <p className="text-lg muted w-full mx-auto test_target">
        Enter your assets, savings, and liabilities, and our calculator will automatically calculate the Zakat amount. Once done, you can donate online to support verified beneficiaries across Pakistan.
        </p>
        <div className="zakat-nisab-selector mt-24">
          <h3 className="zakat-nisab-selector__title">Nisab Threshold</h3>
          <div className="zakat-nisab-selector__options">
            <label className="zakat-nisab-option">
              <input
                type="radio"
                name="nisab-method"
                value="gold"
                checked={nisabMethod === 'gold'}
                onChange={(e) => setNisabMethod(e.target.value)}
              />
              <span>
                Value of Gold <strong>(approximately Rs. {Math.round(approxGoldPerTola).toLocaleString('en-PK')}/Tola)</strong>
              </span>
            </label>
            <label className="zakat-nisab-option">
              <input
                type="radio"
                name="nisab-method"
                value="silver"
                checked={nisabMethod === 'silver'}
                onChange={(e) => setNisabMethod(e.target.value)}
              />
              <span>
                Value of Silver <strong>(approximately Rs. {Math.round(approxSilverPerTola).toLocaleString('en-PK')}/Tola)</strong>
              </span>
            </label>
          </div>
        </div>

      </div>
      
      <div className="zakat-calculator-wrapper">
        <div className="zakat-main-content">
          {/* Tabs Navigation */}
        <div className="zakat-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`zakat-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="zakat-tab-icon">
                {tab.isImage ? (
                  <img
                    src={tab.icon}
                    alt={tab.label}
                    className="zakat-tab-icon-img"
                  />
                ) : (
                  tab.icon
                )}
              </span>

              <span className="zakat-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

          
          {/* Tab Content */}
          <div className="zakat-tab-content">
            {activeTab === 'eligibility' && (
              <EligibilityTab 
                goldNisabAmount={goldNisabAmount}
                silverNisabAmount={silverNisabAmount}
                fetchedGoldPrice={fetchedGoldPrice}
                fetchedSilverPrice={fetchedSilverPrice}
              />
            )}
            
            {activeTab === 'cash' && (
              <CashTab
                cashItems={cashItems}
                setCashItems={setCashItems}
                debts={debts}
                setDebts={setDebts}
              />
            )}
            
            {activeTab === 'assets' && (
              <AssetsTab
                assetsItems={assetsItems}
                setAssetsItems={setAssetsItems}
              />
            )}
            
            {activeTab === 'gold' && (
              <GoldTab
                goldWeight={goldWeight}
                setGoldWeight={setGoldWeight}
                goldUnit={goldUnit}
                setGoldUnit={setGoldUnit}
                goldPrice={goldPrice}
                setGoldPrice={setGoldPrice}
                goldKarat={goldKarat}
                setGoldKarat={setGoldKarat}
                useCustomGoldPrice={useCustomGoldPrice}
                setUseCustomGoldPrice={setUseCustomGoldPrice}
              />
            )}
            
            {activeTab === 'silver' && (
              <SilverTab
                silverWeight={silverWeight}
                setSilverWeight={setSilverWeight}
                silverUnit={silverUnit}
                setSilverUnit={setSilverUnit}
                silverPrice={silverPrice}
                setSilverPrice={setSilverPrice}
                useCustomSilverPrice={useCustomSilverPrice}
                setUseCustomSilverPrice={setUseCustomSilverPrice}
              />
            )}
          </div>
        </div>
        
        {/* Result Section - Always Visible */}
        <div className="zakat-result-section">
          <ResultSection calculations={calculations} />
        </div>
      </div>
    </div>
  )
}

export default ZakatCalculator

