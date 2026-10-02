import { useState } from 'react'
import axiosInstance from '../../utils/axios'
import './JobApplyPanel.css'

const APPLY_SUB_TABS = [
  { id: 'profile', label: 'Profile Info' },
  { id: 'education', label: 'Education & Experience' },
  { id: 'contact', label: 'Contact Info' },
]

const DEFAULT_PROFILE = {
  firstName: '',
  lastName: '',
  fatherName: '',
  cnic: '',
  disability: 'not_applicable',
  gender: 'male',
  maritalStatus: 'single',
  husbandName: '',
}

const DEFAULT_CONTACT = {
  email: '',
  country: '',
  state: '',
  city: '',
  postalCode: '',
  mobile: '',
  officePhone: '',
  residencePhone: '',
  currentAddress: '',
  permanentAddress: '',
}

const DEFAULT_EDUCATION_ROW = {
  type: '',
  program: '',
  specialization: '',
  yearOfCompletion: '',
  resultStatus: '',
}

const DEFAULT_EXPERIENCE_ROW = {
  company: '',
  jobTitle: '',
  description: '',
  location: '',
  totalExperience: '',
}

const DEFAULT_DISCLOSURE = {
  dismissed: 'no',
  serviceBond: 'no',
  criminalCharges: 'no',
  relativeWorking: 'no',
  approachEmployer: 'no',
}

const DISCLOSURE_QUESTIONS = [
  { key: 'dismissed', label: 'Were you ever dismissed or asked to leave a job?' },
  { key: 'serviceBond', label: 'Are you under any service bond with your employer?' },
  { key: 'criminalCharges', label: 'Have any criminal charges been brought against you?' },
  { key: 'relativeWorking', label: 'Is any of your relative working at MTJ Foundation?' },
  { key: 'approachEmployer', label: 'Can we approach your present employer?' },
]

const emptyEducationRow = () => ({ ...DEFAULT_EDUCATION_ROW, id: `${Date.now()}-${Math.random()}` })
const emptyExperienceRow = () => ({ ...DEFAULT_EXPERIENCE_ROW, id: `${Date.now()}-${Math.random()}` })

const JobApplyPanel = ({ jobId, jobTitle }) => {
  const [subTab, setSubTab] = useState('profile')
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [contact, setContact] = useState(DEFAULT_CONTACT)
  const [educationRows, setEducationRows] = useState([])
  const [hasWorkExperience, setHasWorkExperience] = useState('')
  const [experienceRows, setExperienceRows] = useState([])
  const [disclosure, setDisclosure] = useState(DEFAULT_DISCLOSURE)
  const [profileErrors, setProfileErrors] = useState({})
  const [contactErrors, setContactErrors] = useState({})
  const [educationErrors, setEducationErrors] = useState({})
  const [profileSaved, setProfileSaved] = useState(false)
  const [educationSaved, setEducationSaved] = useState(false)
  const [contactSaved, setContactSaved] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeFileName, setResumeFileName] = useState('No file chosen')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const showHusbandName =
    profile.gender === 'female' &&
    (profile.maritalStatus === 'married' || profile.maritalStatus === 'widow')

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    setProfileSaved(false)
    if (profileErrors[field]) {
      setProfileErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const updateContact = (field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }))
    setContactSaved(false)
    if (contactErrors[field]) {
      setContactErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const updateEducationRow = (id, field, value) => {
    setEducationRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    )
    setEducationSaved(false)
  }

  const updateExperienceRow = (id, field, value) => {
    setExperienceRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    )
    setEducationSaved(false)
  }

  const updateDisclosure = (field, value) => {
    setDisclosure((prev) => ({ ...prev, [field]: value }))
    setEducationSaved(false)
    if (educationErrors[field]) {
      setEducationErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateProfile = () => {
    const errors = {}
    if (!profile.firstName.trim()) errors.firstName = 'First name is required'
    if (!profile.lastName.trim()) errors.lastName = 'Last name is required'
    if (!profile.fatherName.trim()) errors.fatherName = 'Father name is required'
    if (!profile.cnic.trim()) errors.cnic = 'CNIC is required'
    else if (!/^\d{5}-\d{7}-\d{1}$|^\d{13}$/.test(profile.cnic.trim())) {
      errors.cnic = 'Enter a valid CNIC (xxxxx-xxxxxxx-x or 13 digits)'
    }
    if (!profile.disability) errors.disability = 'Please select an option'
    if (!profile.gender) errors.gender = 'Please select gender'
    if (!profile.maritalStatus) errors.maritalStatus = 'Please select marital status'
    if (showHusbandName && !profile.husbandName.trim()) {
      errors.husbandName = 'Husband name is required'
    }
    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateContact = () => {
    const errors = {}
    if (!contact.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      errors.email = 'Enter a valid email address'
    }
    if (!contact.country.trim()) errors.country = 'Country is required'
    if (!contact.state.trim()) errors.state = 'State is required'
    if (!contact.city.trim()) errors.city = 'City is required'
    if (!contact.postalCode.trim()) errors.postalCode = 'Postal code is required'
    if (!contact.mobile.trim()) errors.mobile = 'Mobile is required'
    if (!contact.currentAddress.trim()) errors.currentAddress = 'Current address is required'
    if (!contact.permanentAddress.trim()) errors.permanentAddress = 'Permanent address is required'
    if (!resumeFile) {
      errors.resume = 'CV/Resume is required'
    }
    setContactErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null
    setContactSaved(false)

    if (!file) {
      setResumeFile(null)
      setResumeFileName('No file chosen')
      return
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    const maxSize = 5 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      setContactErrors((prev) => ({
        ...prev,
        resume: 'File must be PDF, DOC, or DOCX format',
      }))
      setResumeFile(null)
      setResumeFileName('No file chosen')
      event.target.value = ''
      return
    }

    if (file.size > maxSize) {
      setContactErrors((prev) => ({
        ...prev,
        resume: 'File size must be less than 5MB',
      }))
      setResumeFile(null)
      setResumeFileName('No file chosen')
      event.target.value = ''
      return
    }

    setResumeFile(file)
    setResumeFileName(file.name)
    setContactErrors((prev) => ({ ...prev, resume: '' }))
  }

  const validateEducation = () => {
    const errors = {}
    if (!hasWorkExperience) {
      errors.hasWorkExperience = 'Please select Yes or No'
    }
    if (hasWorkExperience === 'yes' && experienceRows.length === 0) {
      errors.experience = 'Please add at least one work experience'
    }
    DISCLOSURE_QUESTIONS.forEach((question) => {
      if (!disclosure[question.key]) {
        errors[question.key] = 'Please select Yes or No'
      }
    })
    setEducationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveProfile = (event) => {
    event.preventDefault()
    if (!validateProfile()) return
    setProfileSaved(true)
    setSubTab('education')
  }

  const handleSaveEducation = (event) => {
    event.preventDefault()
    if (!validateEducation()) return
    setEducationSaved(true)
    setSubTab('contact')
  }

  const handleSaveContact = async (event) => {
    event.preventDefault()
    if (!validateContact()) return
    if (!validateProfile() || !validateEducation()) {
      setSubmitError('Please complete Profile and Education steps before submitting.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setContactSaved(false)

    try {
      const formData = new FormData()
      formData.append('first_name', profile.firstName.trim())
      formData.append('last_name', profile.lastName.trim())
      formData.append(
        'applicant_name',
        `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim(),
      )
      formData.append('father_name', profile.fatherName.trim())
      formData.append('cnic', profile.cnic.trim())
      formData.append('disability', profile.disability)
      formData.append('gender', profile.gender)
      formData.append('marital_status', profile.maritalStatus)
      if (showHusbandName) {
        formData.append('husband_name', profile.husbandName.trim())
      }
      formData.append('email', contact.email.trim().toLowerCase())
      formData.append('phone_number', contact.mobile.trim())
      formData.append('mobile', contact.mobile.trim())
      if (contact.officePhone.trim()) {
        formData.append('office_phone', contact.officePhone.trim())
      }
      if (contact.residencePhone.trim()) {
        formData.append('residence_phone', contact.residencePhone.trim())
      }
      formData.append('country', contact.country.trim())
      formData.append('state', contact.state.trim())
      formData.append('city', contact.city.trim())
      formData.append('postal_code', contact.postalCode.trim())
      formData.append('current_address', contact.currentAddress.trim())
      formData.append('permanent_address', contact.permanentAddress.trim())
      formData.append(
        'education',
        JSON.stringify(educationRows.map(({ id, ...row }) => row)),
      )
      formData.append(
        'has_work_experience',
        hasWorkExperience === 'yes' ? 'true' : 'false',
      )
      formData.append(
        'experience',
        JSON.stringify(
          hasWorkExperience === 'yes'
            ? experienceRows.map(({ id, ...row }) => row)
            : [],
        ),
      )
      formData.append('disclosure', JSON.stringify(disclosure))
      if (jobId) formData.append('job_id', String(jobId))
      formData.append('cvResume', resumeFile)

      await axiosInstance.post('/job_applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setContactSaved(true)
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to submit application. Please try again.'
      setSubmitError(Array.isArray(message) ? message.join(', ') : message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="job-apply-panel" data-job-id={jobId || ''} data-job-title={jobTitle || ''}>
      <div className="job-apply-subtabs" role="tablist" aria-label="Application steps">
        {APPLY_SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={subTab === tab.id}
            className={`job-apply-subtab ${subTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === 'profile' && (
        <form className="job-apply-form" onSubmit={handleSaveProfile} noValidate>
          <h3 className="job-apply-form__heading">Profile Information</h3>

          <div className="job-apply-form__grid">
            <label className="job-apply-field">
              <span className="job-apply-label">
                First Name <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => updateProfile('firstName', e.target.value)}
                className={profileErrors.firstName ? 'has-error' : ''}
              />
              {profileErrors.firstName && (
                <span className="job-apply-error">{profileErrors.firstName}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                Last Name <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => updateProfile('lastName', e.target.value)}
                className={profileErrors.lastName ? 'has-error' : ''}
              />
              {profileErrors.lastName && (
                <span className="job-apply-error">{profileErrors.lastName}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                Father Name <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={profile.fatherName}
                onChange={(e) => updateProfile('fatherName', e.target.value)}
                className={profileErrors.fatherName ? 'has-error' : ''}
              />
              {profileErrors.fatherName && (
                <span className="job-apply-error">{profileErrors.fatherName}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                CNIC <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="xxxxx-xxxxxxx-x"
                value={profile.cnic}
                onChange={(e) => updateProfile('cnic', e.target.value)}
                className={profileErrors.cnic ? 'has-error' : ''}
              />
              {profileErrors.cnic && (
                <span className="job-apply-error">{profileErrors.cnic}</span>
              )}
            </label>
          </div>

          <fieldset className="job-apply-fieldset">
            <legend className="job-apply-label">
              Any Disability? <span className="job-apply-required">*</span>
            </legend>
            <div className="job-apply-radios">
              {[
                { value: 'mentally_impaired', label: 'Mentally Impaired' },
                { value: 'physically_impaired', label: 'Physically Impaired' },
                { value: 'both', label: 'Both' },
                { value: 'not_applicable', label: 'Not Applicable' },
              ].map((option) => (
                <label key={option.value} className="job-apply-radio">
                  <input
                    type="radio"
                    name="disability"
                    value={option.value}
                    checked={profile.disability === option.value}
                    onChange={() => updateProfile('disability', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="job-apply-fieldset">
            <legend className="job-apply-label">
              Gender <span className="job-apply-required">*</span>
            </legend>
            <div className="job-apply-radios">
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'neuter', label: 'Neuter' },
              ].map((option) => (
                <label key={option.value} className="job-apply-radio">
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={profile.gender === option.value}
                    onChange={() => updateProfile('gender', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="job-apply-fieldset">
            <legend className="job-apply-label">
              Marital Status <span className="job-apply-required">*</span>
            </legend>
            <div className="job-apply-radios">
              {[
                { value: 'married', label: 'Married' },
                { value: 'single', label: 'Single' },
                { value: 'widow', label: 'Widow' },
              ].map((option) => (
                <label key={option.value} className="job-apply-radio">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={option.value}
                    checked={profile.maritalStatus === option.value}
                    onChange={() => updateProfile('maritalStatus', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {showHusbandName && (
            <label className="job-apply-field job-apply-field--full">
              <span className="job-apply-label">
                Husband Name <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={profile.husbandName}
                onChange={(e) => updateProfile('husbandName', e.target.value)}
                className={profileErrors.husbandName ? 'has-error' : ''}
              />
              {profileErrors.husbandName && (
                <span className="job-apply-error">{profileErrors.husbandName}</span>
              )}
            </label>
          )}

          {profileSaved && (
            <p className="job-apply-success">Profile information saved. Continue to the next step.</p>
          )}

          <button type="submit" className="job-apply-save">
            Next
          </button>
        </form>
      )}

      {subTab === 'education' && (
        <form className="job-apply-form" onSubmit={handleSaveEducation} noValidate>
          <div className="job-apply-block">
            <div className="job-apply-block__header">
              <h3 className="job-apply-form__heading job-apply-form__heading--inline">Education</h3>
              <button
                type="button"
                className="job-apply-add-btn"
                onClick={() => setEducationRows((prev) => [...prev, emptyEducationRow()])}
              >
                + Add Education
              </button>
            </div>
            <p className="job-apply-hint">Please enter in reverse chronological order.</p>

            <div className="job-apply-table-wrap">
              <table className="job-apply-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Program</th>
                    <th>Specialization</th>
                    <th>Year of Completion</th>
                    <th>Percentage/Result Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {educationRows.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="job-apply-table__empty">
                        No Record Found
                      </td>
                    </tr>
                  ) : (
                    educationRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="text"
                            value={row.type}
                            onChange={(e) => updateEducationRow(row.id, 'type', e.target.value)}
                            placeholder="e.g. Bachelor"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.program}
                            onChange={(e) => updateEducationRow(row.id, 'program', e.target.value)}
                            placeholder="Program"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.specialization}
                            onChange={(e) =>
                              updateEducationRow(row.id, 'specialization', e.target.value)
                            }
                            placeholder="Specialization"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.yearOfCompletion}
                            onChange={(e) =>
                              updateEducationRow(row.id, 'yearOfCompletion', e.target.value)
                            }
                            placeholder="YYYY"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.resultStatus}
                            onChange={(e) =>
                              updateEducationRow(row.id, 'resultStatus', e.target.value)
                            }
                            placeholder="Result"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="job-apply-row-remove"
                            onClick={() =>
                              setEducationRows((prev) => prev.filter((item) => item.id !== row.id))
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="job-apply-block">
            <div className="job-apply-block__header">
              <h3 className="job-apply-form__heading job-apply-form__heading--inline">
                Working Experience
              </h3>
              <button
                type="button"
                className="job-apply-add-btn"
                onClick={() => {
                  setHasWorkExperience('yes')
                  setExperienceRows((prev) => [...prev, emptyExperienceRow()])
                }}
              >
                + Add Experience
              </button>
            </div>

            <fieldset className="job-apply-fieldset">
              <legend className="job-apply-label">
                Do you have any work experience or current employment?
              </legend>
              <div className="job-apply-radios">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ].map((option) => (
                  <label key={option.value} className="job-apply-radio">
                    <input
                      type="radio"
                      name="hasWorkExperience"
                      value={option.value}
                      checked={hasWorkExperience === option.value}
                      onChange={() => {
                        setHasWorkExperience(option.value)
                        setEducationSaved(false)
                        if (option.value === 'no') setExperienceRows([])
                        if (educationErrors.hasWorkExperience) {
                          setEducationErrors((prev) => ({ ...prev, hasWorkExperience: '' }))
                        }
                      }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {educationErrors.hasWorkExperience && (
                <span className="job-apply-error">{educationErrors.hasWorkExperience}</span>
              )}
            </fieldset>

            <div className="job-apply-table-wrap">
              <table className="job-apply-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Total Experience</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceRows.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="job-apply-table__empty">
                        No Record Found
                      </td>
                    </tr>
                  ) : (
                    experienceRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="text"
                            value={row.company}
                            onChange={(e) => updateExperienceRow(row.id, 'company', e.target.value)}
                            placeholder="Company"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.jobTitle}
                            onChange={(e) => updateExperienceRow(row.id, 'jobTitle', e.target.value)}
                            placeholder="Job title"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) =>
                              updateExperienceRow(row.id, 'description', e.target.value)
                            }
                            placeholder="Description"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.location}
                            onChange={(e) => updateExperienceRow(row.id, 'location', e.target.value)}
                            placeholder="Location"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.totalExperience}
                            onChange={(e) =>
                              updateExperienceRow(row.id, 'totalExperience', e.target.value)
                            }
                            placeholder="e.g. 2 years"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="job-apply-row-remove"
                            onClick={() =>
                              setExperienceRows((prev) => prev.filter((item) => item.id !== row.id))
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {educationErrors.experience && (
              <span className="job-apply-error">{educationErrors.experience}</span>
            )}
          </div>

          <div className="job-apply-block">
            <h3 className="job-apply-form__heading">Disclosure of Information</h3>
            <div className="job-apply-disclosure-list">
              {DISCLOSURE_QUESTIONS.map((question) => (
                <fieldset key={question.key} className="job-apply-fieldset job-apply-disclosure">
                  <legend className="job-apply-label">{question.label}</legend>
                  <div className="job-apply-radios">
                    {[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ].map((option) => (
                      <label key={option.value} className="job-apply-radio">
                        <input
                          type="radio"
                          name={question.key}
                          value={option.value}
                          checked={disclosure[question.key] === option.value}
                          onChange={() => updateDisclosure(question.key, option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {educationErrors[question.key] && (
                    <span className="job-apply-error">{educationErrors[question.key]}</span>
                  )}
                </fieldset>
              ))}
            </div>
          </div>

          {educationSaved && (
            <p className="job-apply-success">Education & experience details saved. Continue to the next step.</p>
          )}

          <div className="job-apply-actions">
            <button type="submit" className="job-apply-save">
              Next
            </button>
          </div>
        </form>
      )}

      {subTab === 'contact' && (
        <form className="job-apply-form" onSubmit={handleSaveContact} noValidate>
          <h3 className="job-apply-form__heading">Contact Information</h3>

          <div className="job-apply-form__grid">
            <label className="job-apply-field">
              <span className="job-apply-label">
                Email <span className="job-apply-required">*</span>
              </span>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => updateContact('email', e.target.value)}
                className={contactErrors.email ? 'has-error' : ''}
              />
              {contactErrors.email && (
                <span className="job-apply-error">{contactErrors.email}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                Country <span className="job-apply-required">*</span>
              </span>
              <select
                value={contact.country}
                onChange={(e) => updateContact('country', e.target.value)}
                className={contactErrors.country ? 'has-error' : ''}
              >
                <option value="">Select Country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Other">Other</option>
              </select>
              {contactErrors.country && (
                <span className="job-apply-error">{contactErrors.country}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                State <span className="job-apply-required">*</span>
              </span>
              <select
                value={contact.state}
                onChange={(e) => updateContact('state', e.target.value)}
                className={contactErrors.state ? 'has-error' : ''}
              >
                <option value="">Select a state</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="ICT">Islamabad Capital Territory</option>
                <option value="AJK">Azad Jammu & Kashmir</option>
                <option value="GB">Gilgit-Baltistan</option>
              </select>
              {contactErrors.state && (
                <span className="job-apply-error">{contactErrors.state}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                City <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={contact.city}
                onChange={(e) => updateContact('city', e.target.value)}
                className={contactErrors.city ? 'has-error' : ''}
                placeholder="Select a City"
              />
              {contactErrors.city && (
                <span className="job-apply-error">{contactErrors.city}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                Postal Code <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={contact.postalCode}
                onChange={(e) => updateContact('postalCode', e.target.value)}
                className={contactErrors.postalCode ? 'has-error' : ''}
              />
              {contactErrors.postalCode && (
                <span className="job-apply-error">{contactErrors.postalCode}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">
                Mobile <span className="job-apply-required">*</span>
              </span>
              <input
                type="tel"
                value={contact.mobile}
                onChange={(e) => updateContact('mobile', e.target.value)}
                className={contactErrors.mobile ? 'has-error' : ''}
              />
              {contactErrors.mobile && (
                <span className="job-apply-error">{contactErrors.mobile}</span>
              )}
            </label>

            <label className="job-apply-field">
              <span className="job-apply-label">Office#</span>
              <input
                type="tel"
                value={contact.officePhone}
                onChange={(e) => updateContact('officePhone', e.target.value)}
              />
            </label>

            <label className="job-apply-field job-apply-field--full">
              <span className="job-apply-label">Residence#</span>
              <input
                type="tel"
                value={contact.residencePhone}
                onChange={(e) => updateContact('residencePhone', e.target.value)}
              />
            </label>

            <label className="job-apply-field job-apply-field--full">
              <span className="job-apply-label">
                Current Address <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={contact.currentAddress}
                onChange={(e) => updateContact('currentAddress', e.target.value)}
                className={contactErrors.currentAddress ? 'has-error' : ''}
              />
              {contactErrors.currentAddress && (
                <span className="job-apply-error">{contactErrors.currentAddress}</span>
              )}
            </label>

            <label className="job-apply-field job-apply-field--full">
              <span className="job-apply-label">
                Permanent Address <span className="job-apply-required">*</span>
              </span>
              <input
                type="text"
                value={contact.permanentAddress}
                onChange={(e) => updateContact('permanentAddress', e.target.value)}
                className={contactErrors.permanentAddress ? 'has-error' : ''}
              />
              {contactErrors.permanentAddress && (
                <span className="job-apply-error">{contactErrors.permanentAddress}</span>
              )}
            </label>

            <div className="job-apply-field job-apply-field--full">
              <span className="job-apply-label">
                Upload CV/Resume <span className="job-apply-required">*</span>
              </span>
              <div className="job-apply-file">
                <input
                  type="file"
                  id="job-apply-resume"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleResumeChange}
                  className="job-apply-file__input"
                />
                <label htmlFor="job-apply-resume" className="job-apply-file__button">
                  Choose file
                </label>
                <span className="job-apply-file__name">{resumeFileName}</span>
              </div>
              {contactErrors.resume && (
                <span className="job-apply-error">{contactErrors.resume}</span>
              )}
              <p className="job-apply-hint">Allowed types: .pdf, .doc, .docx (Max size: 5MB)</p>
            </div>
          </div>

          {submitError && (
            <p className="job-apply-error" style={{ marginTop: 12 }}>
              {submitError}
            </p>
          )}

          {contactSaved && (
            <p className="job-apply-success">Application submitted successfully.</p>
          )}

          <button
            type="submit"
            className="job-apply-save"
            disabled={isSubmitting || contactSaved}
          >
            {isSubmitting
              ? 'Submitting...'
              : contactSaved
                ? 'Submitted'
                : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  )
}

export default JobApplyPanel
