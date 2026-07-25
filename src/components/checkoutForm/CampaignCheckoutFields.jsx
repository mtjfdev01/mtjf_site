const PLEDGE_MODE_OPTIONS = [
  {
    value: 'recurring_monthly',
    label: 'Items every month',
    hint: 'Donate one or more items each month (pay this month, or set up monthly with Stripe).',
  },
  {
    value: 'prepaid_months',
    label: 'Pay once for several months',
    hint: 'One donation covers the selected items for multiple months. No monthly payment reminders for those months.',
  },
]

const CampaignCheckoutFields = ({
  campaignTitle = '',
  loading = false,
  items = [],
  quantities = {},
  onQuantityChange,
  pledgeMode = 'recurring_monthly',
  onPledgeModeChange,
  prepaidMonths = '3',
  onPrepaidMonthsChange,
  currency = 'PKR',
  monthlyTotal = 0,
  checkoutTotal = 0,
  isRecurring = false,
}) => {
  const activeMode = PLEDGE_MODE_OPTIONS.find((opt) => opt.value === pledgeMode)

  return (
  <div className="checkout-panel__campaign-block">
    <div className="checkout-panel__campaign-header">
      <h3 className="checkout-panel__campaign-title">
        {loading && !campaignTitle ? 'Loading campaign…' : campaignTitle || 'Campaign'}
      </h3>
      <p className="checkout-panel__campaign-hint">
        {isRecurring
          ? 'Choose items and quantities, then tell us how you want to give: every month, or one payment covering several months.'
          : 'Choose items and quantities. Your total is calculated from unit prices below.'}
      </p>
    </div>

    {loading && items.length === 0 ? (
      <p className="checkout-panel__campaign-loading">Loading donation items…</p>
    ) : items.length === 0 ? (
      <p className="checkout-panel__campaign-empty">
        This campaign has no donation items yet. Please contact support.
      </p>
    ) : (
      <div className="checkout-panel__campaign-items">
        {items.map((item) => (
          <div key={item.id} className="checkout-panel__campaign-item">
            <div className="checkout-panel__campaign-item-info">
              <span className="checkout-panel__campaign-item-name">{item.name}</span>
              <span className="checkout-panel__campaign-item-price">
                {item.currency || currency} {Number(item.unit_price).toLocaleString()} each
              </span>
              {item.description && (
                <span className="checkout-panel__campaign-item-desc">{item.description}</span>
              )}
            </div>
            <div className="checkout-panel__campaign-item-qty">
              <label htmlFor={`campaign-item-qty-${item.id}`}>Qty</label>
              <input
                id={`campaign-item-qty-${item.id}`}
                type="number"
                min="0"
                step="1"
                className="checkout-panel__input checkout-panel__campaign-qty-input"
                value={quantities[item.id] ?? ''}
                onChange={(e) => onQuantityChange(item.id, e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>
    )}

    {isRecurring && (
      <>
        <div className="checkout-panel__campaign-mode">
          <span className="checkout-panel__campaign-mode-label">
            How do you want to donate?
          </span>
          <div className="checkout-panel__freq-chips" role="group" aria-label="Pledge type">
            {PLEDGE_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`checkout-panel__freq-chip${
                  pledgeMode === opt.value ? ' checkout-panel__freq-chip--active' : ''
                }`}
                onClick={() => onPledgeModeChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {activeMode?.hint && (
            <p className="checkout-panel__campaign-mode-hint">{activeMode.hint}</p>
          )}
        </div>

        {pledgeMode === 'prepaid_months' && (
          <div className="checkout-panel__field checkout-panel__campaign-prepaid">
            <label htmlFor="checkout-campaign-prepaid-months">
              Number of months to cover in this one donation
            </label>
            <input
              id="checkout-campaign-prepaid-months"
              type="number"
              min="1"
              step="1"
              className="checkout-panel__input"
              value={prepaidMonths}
              onChange={(e) => onPrepaidMonthsChange(e.target.value)}
            />
          </div>
        )}
      </>
    )}

    <div className="checkout-panel__campaign-totals">
      {isRecurring && (
        <div>
          <strong>Per month:</strong> {currency} {monthlyTotal.toLocaleString()}
        </div>
      )}
      <div>
        <strong>
          {isRecurring && pledgeMode === 'prepaid_months'
            ? `Total for ${Math.max(1, Number(prepaidMonths) || 1)} months`
            : isRecurring
              ? 'This checkout total'
              : 'Donation total'}
          :
        </strong>{' '}
        {currency} {checkoutTotal.toLocaleString()}
      </div>
    </div>
  </div>
  )
}

export default CampaignCheckoutFields
