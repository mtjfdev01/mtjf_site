import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import { postGatewayForm } from '../lib/paymentGatewayForm'
import Loader from '../components/Loader/Loader'

/**
 * Card step 2: POST SSO form to Bank Alfalah hosted checkout.
 * - `form` query: encoded { action, fields } from API return redirect
 * - `authToken` + `donationId`: fetch SSO form from public API (handshake fallback)
 */
const AlfalahCardRedirect = () => {
  const [searchParams] = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    const rawForm = searchParams.get('form')
    if (rawForm) {
      try {
        const parsed = JSON.parse(decodeURIComponent(rawForm))
        const { action, fields } = parsed
        if (!action || !fields) {
          setError('Invalid payment session.')
          return
        }
        postGatewayForm(action, fields)
      } catch {
        setError('Could not continue to Bank Alfalah checkout.')
      }
      return
    }

    const donationId =
      searchParams.get('donationId') ||
      searchParams.get('donation_id') ||
      searchParams.get('O') ||
      searchParams.get('o')
    const authToken =
      searchParams.get('authToken') ||
      searchParams.get('AuthToken') ||
      searchParams.get('auth_token')
    if (!donationId || !authToken) {
      setError('Missing payment session. Please try donating again.')
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const { data } = await axiosInstance.get('/donations/public/alfalah/card-sso', {
          params: { donationId, authToken },
        })
        if (cancelled) return
        const payload = data?.data || data
        if (!payload?.formAction || !payload?.formFields) {
          setError(data?.message || 'Could not start Bank Alfalah checkout.')
          return
        }
        postGatewayForm(payload.formAction, payload.formFields)
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              'Could not continue to Bank Alfalah checkout.',
          )
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [searchParams])

  if (error) {
    return (
      <section style={{ maxWidth: 560, margin: '120px auto', padding: 24, textAlign: 'center' }}>
        <p>{error}</p>
        <a href="/test-checkout">Return to checkout</a>
      </section>
    )
  }

  return (
    <section style={{ maxWidth: 560, margin: '120px auto', padding: 24, textAlign: 'center' }}>
      <Loader loading />
      <p style={{ marginTop: 16 }}>Redirecting to Bank Alfalah secure checkout…</p>
    </section>
  )
}

export default AlfalahCardRedirect
