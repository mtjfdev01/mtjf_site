import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { postGatewayForm, getAlfalahApiReturnUrl } from '../lib/paymentGatewayForm'
import Loader from '../components/Loader/Loader'

/**
 * Legacy/fallback: `?form=` from old API redirects only.
 * AuthToken + donationId → public API /alfalah/return (server auto-posts SSO).
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

    const apiReturn = getAlfalahApiReturnUrl(donationId, authToken)
    if (apiReturn) {
      window.location.replace(apiReturn)
      return
    }

    setError('Missing payment session. Please try donating again.')
  }, [searchParams])

  if (error) {
    return (
      <section style={{ maxWidth: 560, margin: '120px auto', padding: 24, textAlign: 'center' }}>
        <p>{error}</p>
        <a href="/checkout">Return to checkout</a>
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
