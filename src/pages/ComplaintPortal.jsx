import React, { Suspense, lazy, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import {
  ORGANIZATION_OPTIONS,
  COMPLAINANT_TYPE_OPTIONS,
  DEPARTMENT_OPTIONS,
  CATEGORY_OPTIONS,
  ASLAB_BRANCH_OPTIONS,
  UI_COPY,
  optionLabel,
  priorityForCategory,
  priorityLabel,
} from '../constants/ceoComplaintOptions'
import './ComplaintPortal.css'

const Footer = lazy(() => import('../components/footer/Footer'))

const STEPS = {
  ORG: 'org',
  BRANCH: 'branch',
  TYPE: 'type',
  CONTACT: 'contact',
  DEPARTMENT: 'department',
  CATEGORY: 'category',
  DETAILS: 'details',
  SUCCESS: 'success',
}

const EMPTY_FORM = {
  organization: '',
  branch: '',
  complainant_type: '',
  complainant_name: '',
  contact_number: '',
  department: '',
  category: '',
  details: '',
}

const ComplaintPortal = () => {
  const [lang, setLang] = useState('ur')
  const [step, setStep] = useState(STEPS.ORG)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [complaintNumber, setComplaintNumber] = useState('')

  const t = UI_COPY[lang] || UI_COPY.en
  const isUrdu = lang === 'ur'
  const inputLang = isUrdu ? 'ur' : 'en'
  const inputDir = isUrdu ? 'rtl' : 'ltr'

  const orgLabel = useMemo(() => {
    const hit = ORGANIZATION_OPTIONS.find((o) => o.value === form.organization)
    return hit ? optionLabel(hit, lang) : form.organization
  }, [form.organization, lang])

  const selectOrg = (value) => {
    setForm((prev) => ({
      ...prev,
      organization: value,
      branch: value === 'aslab' ? prev.branch : '',
    }))
    setStep(value === 'aslab' ? STEPS.BRANCH : STEPS.TYPE)
  }

  const goBack = () => {
    setSubmitError('')
    if (step === STEPS.BRANCH) setStep(STEPS.ORG)
    else if (step === STEPS.TYPE) {
      setStep(form.organization === 'aslab' ? STEPS.BRANCH : STEPS.ORG)
    } else if (step === STEPS.CONTACT) setStep(STEPS.TYPE)
    else if (step === STEPS.DEPARTMENT) setStep(STEPS.CONTACT)
    else if (step === STEPS.CATEGORY) setStep(STEPS.DEPARTMENT)
    else if (step === STEPS.DETAILS) setStep(STEPS.CATEGORY)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!form.complainant_name.trim() || !form.contact_number.trim()) {
      setSubmitError(t.errContact)
      return
    }
    if (!form.department) {
      setSubmitError(t.errDepartment)
      return
    }
    if (!form.category) {
      setSubmitError(t.errCategory)
      return
    }
    if (!form.details.trim() || form.details.trim().length < 5) {
      setSubmitError(t.errDetails)
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        organization: form.organization,
        ...(form.organization === 'aslab' ? { branch: form.branch } : {}),
        complainant_type: form.complainant_type,
        complainant_name: form.complainant_name.trim(),
        contact_number: form.contact_number.trim(),
        department: form.department,
        category: form.category,
        details: form.details.trim(),
      }
      const res = await axiosInstance.post(
        '/ceo-complaints/public/submit',
        payload,
      )
      const number = res.data?.data?.complaint_number
      if (!res.data?.success || !number) {
        throw new Error(res.data?.message || t.errSubmit)
      }
      setComplaintNumber(number)
      setStep(STEPS.SUCCESS)
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || err.message || t.errSubmit,
      )
    } finally {
      setSubmitting(false)
    }
  }

  const startOver = () => {
    setForm({ ...EMPTY_FORM })
    setComplaintNumber('')
    setSubmitError('')
    setStep(STEPS.ORG)
  }

  return (
    <>
      <div
        className={`ceo-complaint-portal ${isUrdu ? 'is-urdu' : ''}`}
        lang={lang}
        dir={isUrdu ? 'rtl' : 'ltr'}
      >
        <div className="ceo-complaint-portal__shell">
          <header className="ceo-complaint-portal__header">
            <div className="ceo-complaint-portal__header-row">
              <p className="ceo-complaint-portal__eyebrow">{t.eyebrow}</p>
              <div
                className="ceo-complaint-portal__lang"
                role="group"
                aria-label="Language"
              >
                <button
                  type="button"
                  className={`ceo-complaint-portal__lang-btn ${
                    lang === 'en' ? 'is-active' : ''
                  }`}
                  onClick={() => setLang('en')}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`ceo-complaint-portal__lang-btn ${
                    lang === 'ur' ? 'is-active' : ''
                  }`}
                  onClick={() => setLang('ur')}
                >
                  اردو
                </button>
              </div>
            </div>
            <h1>{t.title}</h1>
            <p className="ceo-complaint-portal__lead">{t.lead}</p>
          </header>

          {step === STEPS.ORG && (
            <section className="ceo-complaint-portal__card">
              <h2>{t.selectOrg}</h2>
              <div className="ceo-complaint-portal__org-grid">
                {ORGANIZATION_OPTIONS.map((org) => (
                  <button
                    key={org.value}
                    type="button"
                    className="ceo-complaint-portal__org-btn"
                    onClick={() => selectOrg(org.value)}
                  >
                    {optionLabel(org, lang)}
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === STEPS.BRANCH && (
            <section className="ceo-complaint-portal__card">
              <h2>{t.selectBranch}</h2>
              <select
                className="ceo-complaint-portal__select"
                value={form.branch}
                lang={inputLang}
                dir={inputDir}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, branch: e.target.value }))
                }
              >
                <option value="">{t.chooseBranch}</option>
                {ASLAB_BRANCH_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {optionLabel(b, lang)}
                  </option>
                ))}
              </select>
              <div className="ceo-complaint-portal__actions">
                <button
                  type="button"
                  className="ceo-complaint-portal__ghost"
                  onClick={goBack}
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  className="ceo-complaint-portal__primary"
                  disabled={!form.branch}
                  onClick={() => setStep(STEPS.TYPE)}
                >
                  {t.continue}
                </button>
              </div>
            </section>
          )}

          {step === STEPS.TYPE && (
            <section className="ceo-complaint-portal__card">
              <h2>{t.complainingAs}</h2>
              <p className="ceo-complaint-portal__hint">{orgLabel}</p>
              <div className="ceo-complaint-portal__org-grid">
                {COMPLAINANT_TYPE_OPTIONS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`ceo-complaint-portal__org-btn ${
                      form.complainant_type === item.value ? 'is-selected' : ''
                    }`}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        complainant_type: item.value,
                      }))
                    }
                  >
                    {optionLabel(item, lang)}
                  </button>
                ))}
              </div>
              <div className="ceo-complaint-portal__actions">
                <button
                  type="button"
                  className="ceo-complaint-portal__ghost"
                  onClick={goBack}
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  className="ceo-complaint-portal__primary"
                  disabled={!form.complainant_type}
                  onClick={() => setStep(STEPS.CONTACT)}
                >
                  {t.continue}
                </button>
              </div>
            </section>
          )}

          {step === STEPS.CONTACT && (
            <section className="ceo-complaint-portal__card">
              <h2>{t.contactTitle}</h2>
              <p className="ceo-complaint-portal__hint">{t.contactHint}</p>
              <label className="ceo-complaint-portal__label">
                {t.name}
                <input
                  name="complainant_name"
                  value={form.complainant_name}
                  onChange={handleChange}
                  className="ceo-complaint-portal__input"
                  placeholder={t.namePh}
                  lang={inputLang}
                  dir="auto"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="ceo-complaint-portal__label">
                {t.contact}
                <input
                  name="contact_number"
                  value={form.contact_number}
                  onChange={handleChange}
                  className="ceo-complaint-portal__input"
                  placeholder={t.contactPh}
                  lang="en"
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </label>
              <div className="ceo-complaint-portal__actions">
                <button
                  type="button"
                  className="ceo-complaint-portal__ghost"
                  onClick={goBack}
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  className="ceo-complaint-portal__primary"
                  disabled={
                    !form.complainant_name.trim() ||
                    !form.contact_number.trim()
                  }
                  onClick={() => setStep(STEPS.DEPARTMENT)}
                >
                  {t.continue}
                </button>
              </div>
            </section>
          )}

          {step === STEPS.DEPARTMENT && (
            <section className="ceo-complaint-portal__card">
              <h2>{t.selectDepartment}</h2>
              <div className="ceo-complaint-portal__org-grid ceo-complaint-portal__org-grid--dept">
                {DEPARTMENT_OPTIONS.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    className={`ceo-complaint-portal__org-btn ${
                      form.department === d.value ? 'is-selected' : ''
                    }`}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, department: d.value }))
                    }
                  >
                    {optionLabel(d, lang)}
                  </button>
                ))}
              </div>
              <div className="ceo-complaint-portal__actions">
                <button
                  type="button"
                  className="ceo-complaint-portal__ghost"
                  onClick={goBack}
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  className="ceo-complaint-portal__primary"
                  disabled={!form.department}
                  onClick={() => setStep(STEPS.CATEGORY)}
                >
                  {t.continue}
                </button>
              </div>
            </section>
          )}

          {step === STEPS.CATEGORY && (
            <section className="ceo-complaint-portal__card">
              <h2>{t.categoryTitle}</h2>
              <label className="ceo-complaint-portal__label">
                {t.selectCategory}
                <select
                  name="category"
                  className="ceo-complaint-portal__select"
                  value={form.category}
                  lang={inputLang}
                  dir={inputDir}
                  onChange={handleChange}
                >
                  <option value="">{t.selectCategory}</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {optionLabel(c, lang)}
                    </option>
                  ))}
                </select>
              </label>
              {form.category ? (
                <div className="ceo-complaint-portal__priority">
                  <span className="ceo-complaint-portal__priority-label">
                    {t.priorityLabel}
                  </span>
                  <strong>
                    {priorityLabel(priorityForCategory(form.category), lang)}
                  </strong>
                </div>
              ) : null}
              <div className="ceo-complaint-portal__actions">
                <button
                  type="button"
                  className="ceo-complaint-portal__ghost"
                  onClick={goBack}
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  className="ceo-complaint-portal__primary"
                  disabled={!form.category}
                  onClick={() => setStep(STEPS.DETAILS)}
                >
                  {t.continue}
                </button>
              </div>
            </section>
          )}

          {step === STEPS.DETAILS && (
            <section className="ceo-complaint-portal__card">
              <h2>{t.detailsTitle}</h2>
              <form onSubmit={handleSubmit}>
                <label className="ceo-complaint-portal__label">
                  {t.detailsLabel}
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    className="ceo-complaint-portal__textarea"
                    rows={6}
                    placeholder={t.detailsPh}
                    required
                    lang={inputLang}
                    dir="auto"
                  />
                </label>
                {submitError && (
                  <div className="ceo-complaint-portal__error">{submitError}</div>
                )}
                <div className="ceo-complaint-portal__actions">
                  <button
                    type="button"
                    className="ceo-complaint-portal__ghost"
                    onClick={goBack}
                  >
                    {t.back}
                  </button>
                  <button
                    type="submit"
                    className="ceo-complaint-portal__primary"
                    disabled={submitting}
                  >
                    {submitting ? t.submitting : t.submit}
                  </button>
                </div>
              </form>
            </section>
          )}

          {step === STEPS.SUCCESS && (
            <section className="ceo-complaint-portal__card ceo-complaint-portal__card--success">
              <h2>{t.successTitle}</h2>
              <p className="ceo-complaint-portal__hint">{t.successHint}</p>
              <div className="ceo-complaint-portal__number" dir="ltr">
                {complaintNumber}
              </div>
              <div className="ceo-complaint-portal__actions">
                <button
                  type="button"
                  className="ceo-complaint-portal__primary"
                  onClick={startOver}
                >
                  {t.submitAnother}
                </button>
                <Link to="/" className="ceo-complaint-portal__ghost">
                  {t.backHome}
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default ComplaintPortal
