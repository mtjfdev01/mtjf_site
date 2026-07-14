import { useState } from 'react'
import './VolunteerForm.css'
import axiosInstance from '../../utils/axios'

const STEPS = [
  { label: 'Personal', icon: '1' },
  { label: 'Availability', icon: '2' },
  { label: 'Skills', icon: '3' },
  { label: 'Additional', icon: '4' },
]

const SKILL_OPTIONS = [
  { value: 'teaching', label: 'Teaching' },
  { value: 'medical_assistance', label: 'Medical Assistance' },
  { value: 'it_technical', label: 'IT / Technical Support' },
  { value: 'social_media_marketing', label: 'Social Media / Marketing' },
  { value: 'fundraising', label: 'Fundraising' },
  { value: 'field_work', label: 'Field Work' },
  { value: 'event_management', label: 'Event Management' },
  { value: 'data_entry', label: 'Data Entry' },
  { value: 'photography_videography', label: 'Photography / Videography' },
  { value: 'counseling', label: 'Counseling' },
  { value: 'driving', label: 'Driving' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'translation', label: 'Translation' },
  { value: 'other', label: 'Other' },
]

const INTEREST_OPTIONS = [
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'food_distribution', label: 'Food Distribution' },
  { value: 'women_empowerment', label: 'Women Empowerment' },
  { value: 'disaster_relief', label: 'Disaster Relief' },
  { value: 'housing', label: 'Housing' },
  { value: 'clean_water', label: 'Clean Water' },
  { value: 'orphan_care', label: 'Orphan Care' },
  { value: 'community_development', label: 'Community Development' },
]

const AVAILABILITY_OPTIONS = [
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'emergency_only', label: 'Emergency Only' },
  { value: 'remote', label: 'Remote Volunteering' },
]

const todayDateString = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' })

const DEFAULT_FORM = {
  name: '',
  cnic: '',
  date_of_birth: todayDateString(),
  gender: 'male',
  phone: '',
  email: '',
  city: '',
  area: '',
  availability_days: [],
  hours_per_week: '',
  willing_to_travel: '',
  schedule: '',
  skills: [],
  interest_areas: [],
  motivation: '',
  source: 'website',
  agreed_to_policy: false,
  declaration_accurate: false,
}

const CheckboxGroup = ({ label, options, value, onChange, error }) => (
  <div className="volunteer-panel__field volunteer-panel__field--open">
    <span className="volunteer-panel__label-visible">{label}</span>
    <div className="volunteer-panel__chips">
      {options.map((opt) => {
        const checked = value.includes(opt.value)
        return (
          <label
            key={opt.value}
            className={`volunteer-panel__chip ${checked ? 'volunteer-panel__chip--active' : ''}`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                const next = checked
                  ? value.filter((v) => v !== opt.value)
                  : [...value, opt.value]
                onChange(next)
              }}
            />
            {opt.label}
          </label>
        )
      })}
    </div>
    {error && (
      <span className="volunteer-panel__error" role="alert">
        {error}
      </span>
    )}
  </div>
)

const VolunteerForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError('')
    if (submitStatus) setSubmitStatus(null)
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!formData.name.trim()) return 'Full name is required.'
        if (!formData.gender) return 'Gender is required.'
        if (!formData.phone.trim()) return 'Phone number is required.'
        if (!formData.email.trim()) return 'Email is required.'
        if (!validateEmail(formData.email)) return 'Please enter a valid email address.'
        if (!formData.city.trim()) return 'City is required.'
        if (!formData.area.trim()) return 'Area is required.'
        return null
      case 1:
        if (formData.availability_days.length === 0) {
          return 'Please select at least one availability option.'
        }
        return null
      case 2:
        if (formData.skills.length === 0) return 'Please select at least one skill.'
        if (formData.interest_areas.length === 0) {
          return 'Please select at least one interest area.'
        }
        return null
      case 3:
        if (!formData.agreed_to_policy) return 'You must agree to the volunteer policy.'
        if (!formData.declaration_accurate) {
          return 'You must confirm the accuracy of your information.'
        }
        return null
      default:
        return null
    }
  }

  const handleNext = () => {
    const err = validateStep(currentStep)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }

  const handleBack = () => {
    setError('')
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateStep(currentStep)
    if (err) {
      setError(err)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setError('')

    try {
      const payload = {
        ...formData,
        phone: formData.phone.trim(),
        cnic: formData.cnic?.trim() || null,
        date_of_birth: formData.date_of_birth || todayDateString(),
        source: formData.source || 'website',
        willing_to_travel:
          formData.willing_to_travel === ''
            ? null
            : formData.willing_to_travel === true ||
              formData.willing_to_travel === 'true',
        cv_url: null,
        motivation: formData.motivation?.trim() || null,
        schedule: formData.schedule?.trim() || null,
        hours_per_week: formData.hours_per_week || null,
        emergency_contact_name: null,
        emergency_contact_phone: null,
        emergency_contact_relation: null,
        comments: null,
      }

      if (payload.availability_days.length > 0) {
        payload.availability = payload.availability_days.join(', ')
      }

      const response = await axiosInstance.post('/register_volunteer', payload)

      setSubmitStatus('success')
      onSubmit?.(formData, response.data)
      setFormData({ ...DEFAULT_FORM, date_of_birth: todayDateString() })
      setCurrentStep(0)

      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (submitError) {
      console.error('Error submitting volunteer registration:', submitError)
      setSubmitStatus('error')
      setError(
        submitError.response?.data?.message ||
          'Something went wrong. Please try again later.',
      )
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h3 className="volunteer-panel__step-title">Personal Information</h3>
            <div className="volunteer-panel__grid">
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">Full Name</span>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="volunteer-panel__input"
                />
              </label>
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">CNIC / ID Number</span>
                <input
                  type="text"
                  placeholder="CNIC / ID Number (optional)"
                  value={formData.cnic}
                  onChange={(e) => handleChange('cnic', e.target.value)}
                  className="volunteer-panel__input"
                />
              </label>
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">Gender</span>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="volunteer-panel__input volunteer-panel__select"
                >
                  <option value="">Gender *</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">Phone</span>
                <input
                  type="text"
                  placeholder="Phone (WhatsApp preferred) *"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="volunteer-panel__input"
                />
              </label>
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">Email</span>
                <input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="volunteer-panel__input"
                />
              </label>
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">City</span>
                <input
                  type="text"
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="volunteer-panel__input"
                />
              </label>
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">Area</span>
                <input
                  type="text"
                  placeholder="Area *"
                  value={formData.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                  className="volunteer-panel__input"
                />
              </label>
            </div>
          </>
        )

      case 1:
        return (
          <>
            <h3 className="volunteer-panel__step-title">Availability & Commitment</h3>
            <CheckboxGroup
              label="When are you available? *"
              options={AVAILABILITY_OPTIONS}
              value={formData.availability_days}
              onChange={(val) => handleChange('availability_days', val)}
            />
            <div className="volunteer-panel__grid">
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">Hours per week</span>
                <select
                  value={formData.hours_per_week}
                  onChange={(e) => handleChange('hours_per_week', e.target.value)}
                  className="volunteer-panel__input volunteer-panel__select"
                >
                  <option value="">Hours per week</option>
                  <option value="1-5">1-5 hours</option>
                  <option value="5-10">5-10 hours</option>
                  <option value="10-20">10-20 hours</option>
                  <option value="20+">20+ hours</option>
                  <option value="flexible">Flexible</option>
                </select>
              </label>
              <label className="volunteer-panel__field">
                <span className="volunteer-panel__label">Willing to travel?</span>
                <select
                  value={
                    formData.willing_to_travel === true ||
                    formData.willing_to_travel === 'true'
                      ? 'true'
                      : formData.willing_to_travel === false ||
                          formData.willing_to_travel === 'false'
                        ? 'false'
                        : ''
                  }
                  onChange={(e) =>
                    handleChange(
                      'willing_to_travel',
                      e.target.value === '' ? '' : e.target.value === 'true',
                    )
                  }
                  className="volunteer-panel__input volunteer-panel__select"
                >
                  <option value="">Willing to travel?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>
            <label className="volunteer-panel__field">
              <span className="volunteer-panel__label">Preferred schedule</span>
              <input
                type="text"
                placeholder="Preferred schedule (e.g. Mon-Fri 9am-1pm)"
                value={formData.schedule}
                onChange={(e) => handleChange('schedule', e.target.value)}
                className="volunteer-panel__input"
              />
            </label>
          </>
        )

      case 2:
        return (
          <>
            <h3 className="volunteer-panel__step-title">Skills & Interest Areas</h3>
            <CheckboxGroup
              label="Select your skills *"
              options={SKILL_OPTIONS}
              value={formData.skills}
              onChange={(val) => handleChange('skills', val)}
            />
            <CheckboxGroup
              label="Interest areas *"
              options={INTEREST_OPTIONS}
              value={formData.interest_areas}
              onChange={(val) => handleChange('interest_areas', val)}
            />
            <label className="volunteer-panel__field volunteer-panel__field--message">
              <span className="volunteer-panel__label">Motivation</span>
              <textarea
                placeholder="Why do you want to volunteer with us?"
                rows="4"
                value={formData.motivation}
                onChange={(e) => handleChange('motivation', e.target.value)}
                className="volunteer-panel__input volunteer-panel__textarea"
              />
            </label>
          </>
        )

      case 3:
        return (
          <>
            <h3 className="volunteer-panel__step-title">Additional Information</h3>

            <div className="volunteer-panel__box volunteer-panel__box--policy">
              <h4 className="volunteer-panel__box-title">Volunteer Code of Conduct</h4>
              <ul className="volunteer-panel__policy-list">
                <li>Respect all beneficiaries and community members</li>
                <li>No political or religious campaigning during activities</li>
                <li>No media sharing without prior organizational permission</li>
                <li>Follow all organizational guidelines and safety protocols</li>
                <li>Maintain confidentiality of sensitive information</li>
              </ul>

              <label className="volunteer-panel__check">
                <input
                  type="checkbox"
                  checked={formData.agreed_to_policy}
                  onChange={(e) =>
                    handleChange('agreed_to_policy', e.target.checked)
                  }
                />
                <span>I agree to follow the volunteer policy *</span>
              </label>

              <label className="volunteer-panel__check">
                <input
                  type="checkbox"
                  checked={formData.declaration_accurate}
                  onChange={(e) =>
                    handleChange('declaration_accurate', e.target.checked)
                  }
                />
                <span>I confirm that all information provided is accurate *</span>
              </label>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <section className="volunteer-panel">
      <div className="volunteer-panel__progress" aria-label="Registration steps">
        {STEPS.map((step, idx) => (
          <div key={step.label} className="volunteer-panel__progress-item">
            <div
              className={`volunteer-panel__progress-dot ${
                idx <= currentStep ? 'volunteer-panel__progress-dot--active' : ''
              }`}
            >
              {idx < currentStep ? '✓' : step.icon}
            </div>
            <span
              className={`volunteer-panel__progress-label ${
                idx <= currentStep ? 'volunteer-panel__progress-label--active' : ''
              }`}
            >
              {step.label}
            </span>
            {idx < STEPS.length - 1 && (
              <div
                className={`volunteer-panel__progress-line ${
                  idx < currentStep ? 'volunteer-panel__progress-line--active' : ''
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form className="volunteer-panel__form" onSubmit={handleSubmit} noValidate>
        {renderStep()}

        {error && (
          <div className="volunteer-panel__message volunteer-panel__message--error" role="alert">
            {error}
          </div>
        )}

        {submitStatus === 'success' && (
          <div
            className="volunteer-panel__message volunteer-panel__message--success"
            role="alert"
          >
            Registration submitted. Our team will review your application.
          </div>
        )}

        <div className="volunteer-panel__actions">
          {currentStep > 0 && (
            <button
              type="button"
              className="volunteer-panel__secondary"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Back
            </button>
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              className="volunteer-panel__submit"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="volunteer-panel__submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          )}
        </div>

        <p className="volunteer-panel__step-count">
          Step {currentStep + 1} of {STEPS.length}
        </p>
      </form>
    </section>
  )
}

export default VolunteerForm
