import { useState, useRef, useEffect } from 'react'
import './ApplyForm.css'

const DEFAULT_FORM = {
  fullName: '',
  email: '',
  phone: '',
  coverLetter: '',
  cvResume: null,
  consent: false
}

const ApplyForm = ({ jobTitle, onClose, isVisible }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [fileName, setFileName] = useState('No file chosen')
  const formRef = useRef(null)
  const firstInputRef = useRef(null)

  useEffect(() => {
    // Focus on the form when it becomes visible
    if (isVisible && formRef.current) {
      // Scroll to form
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Focus on first input after scroll animation
      const focusTimer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus()
        } else {
          // Fallback: find first text input
          const firstInput = formRef.current?.querySelector('input[type="text"]')
          if (firstInput) {
            firstInput.focus()
          }
        }
      }, 400)
      
      return () => clearTimeout(focusTimer)
    }
  }, [isVisible])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    if (type === 'file') {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [name]: file }))
      setFileName(file ? file.name : 'No file chosen')
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Application submitted:', {
      ...formData,
      jobTitle
    })
    // Reset form
    setFormData(DEFAULT_FORM)
    setFileName('No file chosen')
    // You can add success message or redirect here
  }

  return (
    <section className="apply-form" ref={formRef}>
      <div className="apply-form-header">
        <h2 className="apply-form-title">Apply for this position</h2>
        {onClose && (
          <button 
            type="button" 
            className="apply-form-close"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
        )}
      </div>
      <form className="apply-form__form" onSubmit={handleSubmit}>
        <div className="apply-form__grid">
          <label className="apply-form__field">
            <span className="apply-form__label">Full Name <span className="required">*</span></span>
            <input
              ref={firstInputRef}
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="apply-form__input"
            />
          </label>

          <label className="apply-form__field">
            <span className="apply-form__label">Email <span className="required">*</span></span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="apply-form__input"
            />
          </label>
        </div>

        <label className="apply-form__field">
          <span className="apply-form__label">Phone <span className="required">*</span></span>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="apply-form__input"
          />
        </label>

        <label className="apply-form__field apply-form__field--message">
          <span className="apply-form__label">Cover Letter <span className="required">*</span></span>
          <textarea
            name="coverLetter"
            placeholder="Cover Letter"
            rows="6"
            value={formData.coverLetter}
            onChange={handleChange}
            required
            className="apply-form__input apply-form__textarea"
          />
        </label>

        <label className="apply-form__field apply-form__field--file">
          <span className="apply-form__label">Upload CV/Resume <span className="required">*</span></span>
          <div className="apply-form__file-wrapper">
            <input
              type="file"
              name="cvResume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="apply-form__file-input"
              id="cv-resume-input"
            />
            <label htmlFor="cv-resume-input" className="apply-form__file-button">
              Choose file
            </label>
            <span className="apply-form__file-name">{fileName}</span>
          </div>
          <p className="apply-form__file-hint">Allowed Type(s): .pdf, .doc, .docx</p>
        </label>

        <label className="apply-form__field apply-form__field--checkbox">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            className="apply-form__checkbox"
          />
          <span className="apply-form__checkbox-label">
            By using this form you agree with the storage and handling of your data by this website. <span className="required">*</span>
          </span>
        </label>

        <button type="submit" className="apply-form__submit">
          Submit
        </button>
      </form>
    </section>
  )
}

export default ApplyForm

