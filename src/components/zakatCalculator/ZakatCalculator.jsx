import React, { useState, useMemo, useEffect } from 'react'
import './ZakatCalculator.css'
import EligibilityTab from './tabs/EligibilityTab'
import CashTab from './tabs/CashTab'
import AssetsTab from './tabs/AssetsTab'
import GoldTab from './tabs/GoldTab'
import SilverTab from './tabs/SilverTab'
import ResultSection from './ResultSection'
import { fetchGoldSilverPrices } from '../../services/zakatService'

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
  const [goldPrice, setGoldPrice] = useState('')
  
  // Silver state
  const [silverWeight, setSilverWeight] = useState('')
  const [silverUnit, setSilverUnit] = useState('tola')
  const [silverPrice, setSilverPrice] = useState('')
  
  // Nisab method - no longer needed as it's auto-determined, but keeping for backward compatibility
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
          setGoldPrice(goldPriceValue.toString())
          setFetchedGoldPrice(goldPriceNum)
          
          // Calculate Gold Nisab amount (price per tola * 7.5 tola)
          // Assuming prices from API are per tola
          const goldNisab = goldPriceNum * GOLD_NISAB_TOLA
          setGoldNisabAmount(goldNisab)
        }
        
        // Update silver price if available
        if (prices.silverPrice || prices.silver_price || prices.silver) {
          const silverPriceValue = prices.silverPrice || prices.silver_price || prices.silver
          const silverPriceNum = parseFloat(silverPriceValue)
          setSilverPrice(silverPriceValue.toString())
          setFetchedSilverPrice(silverPriceNum)
          
          // Calculate Silver Nisab amount (price per tola * 52.5 tola)
          // Assuming prices from API are per tola
          const silverNisab = silverPriceNum * SILVER_NISAB_TOLA
          setSilverNisabAmount(silverNisab)
        }
      }
    }
    
    loadPrices()
  }, [])
  
  // Calculations
  const calculations = useMemo(() => {
    // Calculate Net Cash
    const cashTotal = cashItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0
      return sum + amount
    }, 0)
    
    const debtTotal = debts.reduce((sum, debt) => {
      const amount = parseFloat(debt.amount) || 0
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
      goldValue = weight * price
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
      silverValue = weight * price
    }
    
    // Calculate Assets Value
    // Calculate from quantity × pricePerItem, or use amount if provided
    const assetsTotal = assetsItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0
      const pricePerItem = parseFloat(item.pricePerItem) || 0
      const amount = parseFloat(item.amount) || 0
      // Use calculated value (quantity × price) if both are provided, otherwise use amount
      const itemValue = (quantity > 0 && pricePerItem > 0) ? (quantity * pricePerItem) : amount
      return sum + itemValue
    }, 0)
    
    // Net Zakatable Wealth
    const netWealth = netCash + assetsTotal + goldValue + silverValue
    
    // Calculate Nisab Value - Use fetched prices from API (preferred) or user-entered prices
    // Priority: Gold-based (tola) > Silver-based (tola)
    let nisabValue = 0
    let usedNisabMethod = null
    
    // Use fetched prices from API if available, otherwise use user-entered prices
    if (fetchedGoldPrice && goldNisabAmount) {
      // Use the pre-calculated gold Nisab amount from API
      nisabValue = goldNisabAmount
      usedNisabMethod = 'gold'
    } else if (fetchedSilverPrice && silverNisabAmount) {
      // Use the pre-calculated silver Nisab amount from API
      nisabValue = silverNisabAmount
      usedNisabMethod = 'silver'
    } else if (goldPrice) {
      // Fallback to user-entered gold price
      const price = parseFloat(goldPrice) || 0
      // Price unit matches weight unit, so convert to per gram if needed
      const pricePerGram = goldUnit === 'tola' ? price / 11.664 : price
      // Use gold-based method (87.48g)
      nisabValue = GOLD_NISAB_GRAMS * pricePerGram
      usedNisabMethod = 'gold'
    } else if (silverPrice) {
      // Fallback to user-entered silver price
      const price = parseFloat(silverPrice) || 0
      // Price unit matches weight unit, so convert to per gram if needed
      const pricePerGram = silverUnit === 'tola' ? price / 11.664 : price
      // Use silver-based method (612.36g)
      nisabValue = SILVER_NISAB_GRAMS * pricePerGram
      usedNisabMethod = 'silver'
    }
    
    // Eligibility Check
    // Zakat is only due if net wealth EXCEEDS (not just equals) the Nisab threshold
    let eligibilityStatus = 'checking'
    if (nisabValue > 0) {
      if (netWealth <= nisabValue) {
        eligibilityStatus = 'below-nisab'
      } else if (netWealth > nisabValue) {
        eligibilityStatus = 'due'
      }
    }
    
    // Calculate Zakat Due - ONLY if wealth exceeds Nisab threshold
    let zakatDue = 0
    let zakatCash = 0
    let zakatAssets = 0
    let zakatGold = 0
    let zakatSilver = 0
    
    // Only calculate Zakat if net wealth EXCEEDS the Nisab threshold
    if (eligibilityStatus === 'due' && netWealth > nisabValue && nisabValue > 0) {
      zakatDue = netWealth * ZAKAT_RATE
      // Calculate zakat for each category proportionally
      if (netWealth > 0) {
        zakatCash = (netCash / netWealth) * zakatDue
        zakatAssets = (assetsTotal / netWealth) * zakatDue
        zakatGold = (goldValue / netWealth) * zakatDue
        zakatSilver = (silverValue / netWealth) * zakatDue
      }
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
    silverPrice
  ])
  
  const tabs = [
    { id: 'eligibility', label: 'Eligibility', icon: '✓' },
    { id: 'cash', label: 'Cash', icon: '💰' },
    { id: 'assets', label: 'Assets', icon: '🏢' },
    { id: 'gold', label: 'Gold', icon: '🥇' },
    { id: 'silver', label: 'Silver', icon: '🥈' }
  ]
  
  return (
    <div className="zakat-calculator-page container py-48">
      <div className="zakat-header text-center mb-48">
        <h1 className="heading-secondary mb-16">Zakat Calculator</h1>
        <p className="text-lg muted max-w-md mx-auto">
          Calculate your Zakat obligation according to Islamic principles. 
          Zakat is 2.5% of your net zakatable wealth when it reaches Nisab and completes one lunar year.
        </p>
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
                <span className="zakat-tab-icon">{tab.icon}</span>
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

