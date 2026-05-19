/**
 * POST an HTML form to a payment gateway (PayFast, Bank Alfalah card HS, etc.).
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
