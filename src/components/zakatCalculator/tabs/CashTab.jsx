import React from 'react'
import './Tabs.css'
import './CashTab.css'

const CashTab = ({ cashItems, setCashItems, debts, setDebts }) => {
  // Cash items functions (same pattern as debts)
  const addCashItem = () => {
    setCashItems([...cashItems, { id: Date.now(), name: '', amount: '' }])
  }
  
  const removeCashItem = (id) => {
    setCashItems(cashItems.filter(item => item.id !== id))
  }
  
  const updateCashItem = (id, field, value) => {
    setCashItems(cashItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }
  
  // Debts section (keep existing functionality)
  const addDebt = () => {
    setDebts([...debts, { id: Date.now(), name: '', amount: '' }])
  }
  
  const removeDebt = (id) => {
    setDebts(debts.filter(debt => debt.id !== id))
  }
  
  const updateDebt = (id, field, value) => {
    setDebts(debts.map(debt =>
      debt.id === id ? { ...debt, [field]: value } : debt
    ))
  }
  
  const cashTotal = cashItems.reduce((sum, item) => {
    return sum + (parseFloat(item.amount) || 0)
  }, 0)
  const debtTotal = debts.reduce((sum, debt) => {
    return sum + (parseFloat(debt.amount) || 0)
  }, 0)
  
  const netCash = Math.max(cashTotal - debtTotal, 0)
  
  return (
    <div className="cash-tab">
      <h2 className="cash-tab-title">Cash</h2>
      
      {/* Cash Items Section */}
      <div className="section">
        <div className="section-header mb-16">
          <h3 className="h4">Cash Items</h3>
          <p className="text-sm muted">
            Enter your cash assets and investments
          </p>
        </div>
        
        <div className="items-list">
          {cashItems.map((item, index) => (
            <div key={item.id} className="item-row">
              <div className="item-input-group">
                <input
                  type="text"
                  className="input"
                  placeholder={`Cash Item ${index + 1} (e.g., Bank Account, Savings)`}
                  value={item.name}
                  onChange={(e) => updateCashItem(item.id, 'name', e.target.value)}
                />
                <input
                  type="number"
                  className="input"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => updateCashItem(item.id, 'amount', e.target.value)}
                  min="0"
                  step="1"
                />
                {cashItems.length > 1 && (
                  <button
                    className="btn btn--ghost"
                    onClick={() => removeCashItem(item.id)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          className="btn btn--outline mt-16"
          onClick={addCashItem}
          type="button"
        >
          + Add Cash Item
        </button>
        
        <div className="summary-box mt-24">
          <p className="text-sm bold">Cash Total: <span className="text-primary">Rs. {cashTotal.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
        </div>
      </div>
      
      {/* Debts Section */}
      <div className="section mt-40">
        <div className="section-header mb-16">
          <h3 className="h4">Deductible Liabilities</h3>
          <p className="text-sm muted">
            Short-term debts due within a year or due soon (deducted from cash assets)
          </p>
        </div>
        
        <div className="items-list">
          {debts.map((debt, index) => (
            <div key={debt.id} className="item-row">
              <div className="item-input-group">
                <input
                  type="text"
                  className="input"
                  placeholder={`Debt ${index + 1} (e.g., Credit Card, Loan)`}
                  value={debt.name}
                  onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                />
                <input
                  type="number"
                  className="input"
                  placeholder="Amount"
                  value={debt.amount}
                  onChange={(e) => updateDebt(debt.id, 'amount', e.target.value)}
                  min="0"
                  step="1"
                />
                {debts.length > 1 && (
                  <button
                    className="btn btn--ghost"
                    onClick={() => removeDebt(debt.id)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          className="btn btn--outline mt-16"
          onClick={addDebt}
          type="button"
        >
          + Add Debt
        </button>
        
        <div className="summary-box mt-24">
          <p className="text-sm">Debt Total: <span className="text-danger">Rs. {debtTotal.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
          <p className="text-sm bold mt-8">Net Cash: <span className="text-primary">Rs. {netCash.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
        </div>
      </div>
    </div>
  )
}

export default CashTab

