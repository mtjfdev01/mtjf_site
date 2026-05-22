/**
 * Appeal checkout fields — rendered inside checkout `.row` (not a separate section).
 * Shows the pre-selected appeal (read-only) and donation amount.
 */
const AppealCheckoutFields = ({
  appealTitle = '',
  loading = false,
  amount,
  onAmountChange,
  currency = 'PKR',
}) => (
  <>
    <div className="col-md-6">
      <div className="input-item checkout-panel__field">
        <input
          type="text"
          readOnly
          className="checkout-panel__input"
          value={loading && !appealTitle ? 'Loading appeal…' : appealTitle}
          placeholder="Appeal"
          aria-label="Selected appeal"
        />
      </div>
    </div>

    <div className="col-md-6">
      <div className="input-item checkout-panel__field">
        <input
          id="checkout-appeal-amount"
          type="number"
          min="100"
          step="1"
          className="checkout-panel__input"
          placeholder={`Donation amount (${currency}, min 100)`}
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={loading && !appealTitle}
          aria-label="Donation amount"
        />
      </div>
    </div>
  </>
)

export default AppealCheckoutFields
