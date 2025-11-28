import { useMemo, useState } from 'react'
import './DonationForm.css'

const DEFAULT_DONATION_OPTIONS = {
  PKR: [5000, 10000, 25000, 50000],
  USD: [50, 100, 250, 500],
  EUR: [45, 90, 225, 450]
}

const DonationForm = ({
  formId,
  title = 'Donate',
  initialCurrency = 'PKR',
  donationOptions = {},
  categoryOptions = ['General'],
  defaultCategory,
  showProjectSelect = false,
  projects = [],
  defaultProjectId,
  onSubmit = (data) => console.log('Donation submitted:', data),
  layout = 'vertical',
  className = ''
}) => {
  const mergedDonationOptions = useMemo(() => {
    return {
      PKR: donationOptions.PKR || DEFAULT_DONATION_OPTIONS.PKR,
      USD: donationOptions.USD || DEFAULT_DONATION_OPTIONS.USD,
      EUR: donationOptions.EUR || DEFAULT_DONATION_OPTIONS.EUR
    }
  }, [donationOptions])

  const [formData, setFormData] = useState({
    frequency: 'once',
    currency: initialCurrency,
    amount: '',
    customAmount: '',
    category: defaultCategory || categoryOptions[0] || 'General',
    projectId: defaultProjectId || projects[0]?.id || ''
  })

  const getDonationAmounts = (currency) =>
    mergedDonationOptions[currency] || mergedDonationOptions[initialCurrency]

  const handleAmountClick = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: ''
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div
      id={formId}
      className={`donation-form donation-form--${layout} ${className} mt-32`} 
    >
      <div className="donation-form-card">
        <h3 className="donation-form-title h2">{title}</h3>

        <form onSubmit={handleSubmit} className="donation-form-body">
          {/* First Row: Frequency, Currency, Project, Category */}
          <div className="donation-form-row">
            <div className="donation-form-group donation-form-frequency-group">
              <label className="donation-form-label">Donation Frequency</label>
              <div className="donation-form-frequency">
                {['once', 'monthly'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`donation-form-frequency-btn ${
                      formData.frequency === type ? 'active' : ''
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, frequency: type }))
                    }
                  >
                    {type === 'once' ? 'Give Once' : 'Give Monthly'}
                  </button>
                ))}
              </div>
            </div>

            <div className="donation-form-group donation-form-currency">
              <label className="donation-form-label">Currency</label>
              <select
                className="donation-form-input"
                value={formData.currency}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currency: e.target.value,
                    amount: '',
                    customAmount: ''
                  }))
                }
              >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            {showProjectSelect && (
              <div className="donation-form-group">
                <label className="donation-form-label">Select Project</label>
                <select
                  className="donation-form-input"
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      projectId: e.target.value
                    }))
                  }
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title || project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="donation-form-group donation-form-category">
              <label className="donation-form-label">Category</label>
              <select
                className="donation-form-input"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value
                  }))
                }
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="donation-form-group">
            <label className="donation-form-label">Choose Amount</label>
            <div className="donation-form-amounts-row">
              <div className="donation-form-amounts">
                {getDonationAmounts(formData.currency).map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`donation-form-amount-btn ${
                      formData.amount === amount.toString() ? 'active' : ''
                    }`}
                    onClick={() => handleAmountClick(amount)}
                  >
                    {amount.toLocaleString()} {formData.currency}
                  </button>
                ))}
              </div>
              
              <div className="donation-form-actions-input">
                <label className="donation-form-label md:d-none">
                  {formData.currency} Enter an amount
                </label>
                <input
                  type="number"
                  className="donation-form-input"
                  placeholder="Enter custom amount"
                  value={formData.customAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customAmount: e.target.value,
                      amount: ''
                    }))
                  }
                />
              </div>

              <button type="submit" className="donation-form-submit">
                Donate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonationForm
