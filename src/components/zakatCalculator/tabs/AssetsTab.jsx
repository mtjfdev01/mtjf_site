import React from 'react'
import './Tabs.css'
import './CashTab.css'

const AssetsTab = ({ assetsItems, setAssetsItems }) => {
  // Calculate total from quantity and price
  const calculateTotal = (quantity, pricePerItem) => {
    const qty = parseFloat(quantity) || 0
    const price = parseFloat(pricePerItem) || 0
    return Math.round(qty * price)
  }
  
  // Assets items functions (same pattern as cash and debts)
  const addAssetItem = () => {
    setAssetsItems([...assetsItems, { id: Date.now(), name: '', quantity: '', pricePerItem: '', amount: '' }])
  }
  
  const removeAssetItem = (id) => {
    setAssetsItems(assetsItems.filter(item => item.id !== id))
  }
  
  const updateAssetItem = (id, field, value) => {
    setAssetsItems(assetsItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        // If quantity or price changes, recalculate amount
        if (field === 'quantity' || field === 'pricePerItem') {
          const qty = field === 'quantity' ? value : item.quantity
          const price = field === 'pricePerItem' ? value : item.pricePerItem
          updatedItem.amount = calculateTotal(qty, price).toString()
        }
        return updatedItem
      }
      return item
    }))
  }
  
  const assetsTotal = assetsItems.reduce((sum, item) => {
    const quantity = parseFloat(item.quantity) || 0
    const pricePerItem = parseFloat(item.pricePerItem) || 0
    return sum + calculateTotal(quantity, pricePerItem)
  }, 0)
  
  return (
    <div className="cash-tab">
      <h2 className="cash-tab-title">Assets</h2>
      
      {/* Assets Items Section */}
      <div className="section">
        <div className="section-header mb-16">
          <h3 className="h4">Assets Items</h3>
          <p className="text-sm muted">
            Enter your zakatable assets with quantity and price per item
          </p>
        </div>
        
        <div className="items-list">
          {assetsItems.map((item, index) => {
            const itemTotal = calculateTotal(item.quantity, item.pricePerItem)
            return (
              <div key={item.id} className="item-row">
                <div className="item-input-group">
                  <input
                    type="text"
                    className="input"
                    placeholder={`Asset ${index + 1} (e.g., Business Inventory, Livestock)`}
                    value={item.name}
                    onChange={(e) => updateAssetItem(item.id, 'name', e.target.value)}
                  />
                  <div className="asset-inputs-group">
                    <div className="asset-input-row">
                      <input
                        type="number"
                        className="input asset-quantity-input"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => updateAssetItem(item.id, 'quantity', e.target.value)}
                        min="0"
                        step="1"
                      />
                      <span className="asset-input-separator">×</span>
                      <input
                        type="number"
                        className="input asset-price-input"
                        placeholder="Price per item"
                        value={item.pricePerItem}
                        onChange={(e) => updateAssetItem(item.id, 'pricePerItem', e.target.value)}
                        min="0"
                        step="1"
                      />
                    </div>
                    {itemTotal > 0 && (
                      <div className="asset-total-display">
                        <span className="text-sm muted">Total: </span>
                        <strong className="text-primary">Rs. {itemTotal.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>
                      </div>
                    )}
                  </div>
                  {assetsItems.length > 1 && (
                    <button
                      className="btn btn--ghost"
                      onClick={() => removeAssetItem(item.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        <button
          className="btn btn--outline mt-16"
          onClick={addAssetItem}
          type="button"
        >
          + Add Asset Item
        </button>
        
        <div className="summary-box mt-24">
          <p className="text-sm bold">Assets Total: <span className="text-primary">Rs. {assetsTotal.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
        </div>
      </div>
      
      <div className="info-box bg-muted p-16 rounded mt-24">
        <p className="text-sm mb-0">
          <strong>Note:</strong> Only assets that are zakatable and held for trade or business purposes should be included. Personal use items are not zakatable.
        </p>
      </div>
    </div>
  )
}

export default AssetsTab

