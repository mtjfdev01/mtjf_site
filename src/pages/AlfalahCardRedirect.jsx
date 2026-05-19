import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { postGatewayForm } from '../lib/paymentGatewayForm'
import Loader from '../components/Loader/Loader'

/**
 * Card step 2: backend return redirects here with encoded formAction + formFields (SSO).
 */
const AlfalahCardRedirect = () => {
  const [searchParams] = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    const raw = searchParams.get('form')
    if (!raw) {
      setError('Missing payment session. Please try donating again.')
      return
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(raw))
      const { action, fields } = parsed
      if (!action || !fields) {
        setError('Invalid payment session.')
        return
      }
      postGatewayForm(action, fields)
    } catch {
      setError('Could not continue to Bank Alfalah checkout.')
    }
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
