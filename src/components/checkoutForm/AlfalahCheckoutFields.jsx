import './AlfalahCheckoutFields.css'

/**
 * Wallet / account number for Bank Alfalah APG (types 1 & 2).
 * Card (type 3) does not use this field.
 */
const AlfalahCheckoutFields = ({
  accountNumber,
  onAccountNumberChange,
  disabled = false,
}) => (
  <section className="alfalah-checkout-fields checkout-panel__field--full">
    <h2 className="alfalah-checkout-fields__title">Mobile OTP</h2>
    <p className="alfalah-checkout-fields__hint">
      Enter your Alfa Wallet number. Bank Alfalah will send an 8-digit OTP to your registered mobile number.
    </p>
    <div className="alfalah-checkout-fields__group">
      <label className="alfalah-checkout-fields__label" htmlFor="alfalah-account-number">
        Alfa Wallet number
      </label>
      <input
        id="alfalah-account-number"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        className="alfalah-checkout-fields__input"
        placeholder="e.g. 987654321987100"
        value={accountNumber}
        onChange={(e) => onAccountNumberChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  </section>
)

export default AlfalahCheckoutFields
