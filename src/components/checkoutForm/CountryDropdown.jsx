import { useState } from 'react'
import './CheckoutForm.css'

// Common countries list - you can expand this
const COUNTRIES = [
  { value: '', label: 'Select Country' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'IN', label: 'India' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'TR', label: 'Turkey' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'BE', label: 'Belgium' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'AT', label: 'Austria' },
  { value: 'SE', label: 'Sweden' },
  { value: 'NO', label: 'Norway' },
  { value: 'DK', label: 'Denmark' },
  { value: 'FI', label: 'Finland' },
  { value: 'PL', label: 'Poland' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'GR', label: 'Greece' },
  { value: 'PT', label: 'Portugal' },
  { value: 'IE', label: 'Ireland' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'SG', label: 'Singapore' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'TH', label: 'Thailand' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'PH', label: 'Philippines' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'KR', label: 'South Korea' },
  { value: 'JP', label: 'Japan' },
  { value: 'CN', label: 'China' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'EG', label: 'Egypt' },
  { value: 'KE', label: 'Kenya' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'CO', label: 'Colombia' },
  { value: 'PE', label: 'Peru' },
]

const CountryDropdown = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <span className="donation_type_select checkout-panel__field">
      <select
        value={value}
        onChange={handleChange}
        className="checkout-panel__input checkout-panel__select"
      >
        {COUNTRIES.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </span>
  )
}

export default CountryDropdown

