import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'
import './AlfalahOtpPanel.css'

const AlfalahOtpPanel = ({ session, onCancel }) => {
  const navigate = useNavigate()
  const [smsOtp, setSmsOtp] = useState('')
  const [smsOtac, setSmsOtac] = useState('')
  const [emailOtac, setEmailOtac] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isWallet = session?.isOtp !== false
  const donationId = session?.donationId

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!donationId) {
      setError('Donation reference is missing. Please start checkout again.')
      return
    }

    if (isWallet) {
      if (!/^\d{8}$/.test(smsOtp.trim())) {
        setError('Enter the 8-digit OTP from Bank Alfalah.')
        return
      }
    } else if (smsOtac.trim().length !== 4 || emailOtac.trim().length !== 4) {
      setError('Enter both 4-character codes from SMS and email.')
      return
    }

    setSubmitting(true)
    try {
      const body = isWallet
        ? { donationId: Number(donationId), smsOtp: smsOtp.trim() }
        : {
            donationId: Number(donationId),
            smsOtac: smsOtac.trim(),
            emailOtac: emailOtac.trim(),
          }

      const response = await axiosInstance.post(
        '/donations/public/alfalah/process-otp',
        body,
      )

      if (!response.data?.success) {
        setError(response.data?.message || 'Verification failed. Please try again.')
        return
      }

      const status = response.data?.data?.status || 'completed'
      navigate(
        `/thanks?donationId=${donationId}&status=${status === 'completed' ? 'success' : 'pending'}`,
      )
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Could not verify the code. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="alfalah-otp-panel checkout-panel__field--full" aria-labelledby="alfalah-otp-title">
      <h2 id="alfalah-otp-title" className="alfalah-otp-panel__title">
        Enter Bank Alfalah verification code
      </h2>
      <p className="alfalah-otp-panel__hint">
        {session?.otpHint ||
          (isWallet
            ? 'Bank Alfalah sent an 8-digit OTP to your Alfa Wallet mobile number.'
            : 'Bank Alfalah sent a 4-character code to your mobile and email for your Alfalah account.')}
      </p>

      <form className="alfalah-otp-panel__form" onSubmit={handleSubmit}>
        {isWallet ? (
          <div className="alfalah-otp-panel__field">
            <label className="alfalah-otp-panel__label" htmlFor="alfalah-sms-otp">
              SMS OTP (8 digits)
            </label>
            <input
              id="alfalah-sms-otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={8}
              className="alfalah-otp-panel__input"
              placeholder="12345678"
              value={smsOtp}
              onChange={(e) => setSmsOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
              disabled={submitting}
            />
          </div>
        ) : (
          <div className="alfalah-otp-panel__row">
            <div className="alfalah-otp-panel__field">
              <label className="alfalah-otp-panel__label" htmlFor="alfalah-sms-otac">
                SMS code (4 characters)
              </label>
              <input
                id="alfalah-sms-otac"
                type="text"
                maxLength={4}
                className="alfalah-otp-panel__input"
                value={smsOtac}
                onChange={(e) => setSmsOtac(e.target.value.slice(0, 4))}
                disabled={submitting}
              />
            </div>
            <div className="alfalah-otp-panel__field">
              <label className="alfalah-otp-panel__label" htmlFor="alfalah-email-otac">
                Email code (4 characters)
              </label>
              <input
                id="alfalah-email-otac"
                type="text"
                maxLength={4}
                className="alfalah-otp-panel__input"
                value={emailOtac}
                onChange={(e) => setEmailOtac(e.target.value.slice(0, 4))}
                disabled={submitting}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="alfalah-otp-panel__error" role="alert">
            {error}
          </p>
        )}

        <div className="alfalah-otp-panel__actions">
          <button
            type="button"
            className="alfalah-otp-panel__btn alfalah-otp-panel__btn--secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="alfalah-otp-panel__btn alfalah-otp-panel__btn--primary"
            disabled={submitting}
          >
            {submitting ? 'Verifying…' : 'Complete payment'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AlfalahOtpPanel
