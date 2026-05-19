import { formatProgress } from '../../lib/appealsHelpers'
import './AppealCheckoutFields.css'

const AppealCheckoutFields = ({
  appeals = [],
  loading = false,
  selectedAppealId,
  amount,
  onAppealChange,
  onAmountChange,
}) => {
  const selected = appeals.find((a) => String(a.id) === String(selectedAppealId))
  const stats = selected ? formatProgress(selected) : null

  return (
    <section className="appeal-checkout-fields checkout-panel__field--full">
      <h2 className="appeal-checkout-fields__title">Support an appeal</h2>

      <div className="appeal-checkout-fields__row">
        <div className="appeal-checkout-fields__group">
          <label className="appeal-checkout-fields__label" htmlFor="checkout-appeal-select">
            Select appeal
          </label>
          <select
            id="checkout-appeal-select"
            className="appeal-checkout-fields__select"
            value={selectedAppealId ?? ''}
            onChange={(e) => onAppealChange(e.target.value)}
            disabled={loading || appeals.length === 0}
          >
            <option value="">
              {loading ? 'Loading appeals…' : 'Choose an appeal'}
            </option>
            {appeals.map((appeal) => (
              <option key={appeal.id} value={appeal.id}>
                {appeal.title}
              </option>
            ))}
          </select>
        </div>

        <div className="appeal-checkout-fields__group">
          <label className="appeal-checkout-fields__label" htmlFor="checkout-appeal-amount">
            Donation amount ({selected?.currency || 'PKR'})
          </label>
          <input
            id="checkout-appeal-amount"
            type="number"
            min="100"
            step="1"
            className="appeal-checkout-fields__input"
            placeholder="Minimum 100"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            disabled={!selectedAppealId}
          />
        </div>
      </div>

      {selected && stats && (
        <p className="appeal-checkout-fields__progress">
          {stats.raised} raised of {stats.goal} · {stats.percent}% funded
        </p>
      )}
    </section>
  )
}

export default AppealCheckoutFields
