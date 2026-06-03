/**
 * Public API return URL for APG card step 2 (AuthToken → SSO auto-post on server).
 */
export function getAlfalahApiReturnUrl(donationId, authToken) {
  const apiBase = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '')
  if (!apiBase) return null
  const params = new URLSearchParams()
  if (donationId) params.set('donationId', String(donationId))
  if (authToken) params.set('auth_token', String(authToken))
  return `${apiBase}/donations/public/alfalah/return?${params.toString()}`
}

/**
 * POST an HTML form to APG.
 * Checkout: Step 1 only (HS/HS/HS). Step 2 (SSO/SSO/SSO) is via API /alfalah/return after auth_token.
 */
export function postGatewayForm(formAction, formFields) {
  if (!formAction || !formFields || typeof formFields !== 'object') {
    throw new Error('Invalid gateway form parameters')
  }

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = formAction
  form.target = '_self'

  Object.entries(formFields).forEach(([key, value]) => {
    if (value == null || value === '') return
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = String(value)
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()

  setTimeout(() => {
    if (form.parentNode) {
      form.parentNode.removeChild(form)
    }
  }, 1000)
}
