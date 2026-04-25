import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from '../components/footer/Footer'
import axiosInstance from '../utils/axios'
import './DonorLogin.css'

const DEFAULT_FORM = {
  email: '',
  password: '',
  remember: true
}

const DonorLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(null)

  const videoSrc = useMemo(() => process.env.REACT_APP_DONOR_LOGIN_VIDEO_URL || '', [])

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        await axiosInstance.get('/donor-auth/me')
        if (alive) navigate('/donor/donations')
      } catch {
        // Not logged in (expected)
      }
    })()
    return () => {
      alive = false
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      await axiosInstance.post('/donor-auth/login', {
        email: form.email,
        password: form.password
      })
      navigate('/donor/donations')
    } catch (error) {
      setMessage({
        type: 'info',
        text: error?.response?.data?.message || error?.message || 'Login failed. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="donor-login">
        <section className="donor-login__layout">
          <aside className="donor-login__media" aria-label="Donor login video">
            {videoSrc ? (
              <video
                className="donor-login__video"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <div className="donor-login__videoFallback" />
            )}
            <div className="donor-login__mediaOverlay" />
            <div className="donor-login__mediaContent">
              <div className="donor-login__brand">MTJ FOUNDATION</div>
              <h1 className="donor-login__headline">Donor Portal</h1>
              <p className="donor-login__subhead">
                Sign in to view your donation history, receipts, and profile details.
              </p>
              {!videoSrc && (
                <p className="donor-login__hint">
                  Set <code>REACT_APP_DONOR_LOGIN_VIDEO_URL</code> to show a video here.
                </p>
              )}
            </div>
          </aside>

          <section className="donor-login__panel" aria-label="Donor login form">
            <div className="donor-login__panelHeader">
              <h2 className="donor-login__title">Sign in</h2>
              <p className="donor-login__panelSubtitle">
                Enter your donor credentials to continue.
              </p>
            </div>

            <form className="donor-login__form" onSubmit={handleSubmit}>
              <label className="donor-login__field">
                <span className="donor-login__label">Email Address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="donor-login__input"
                  autoComplete="email"
                />
              </label>

              <label className="donor-login__field donor-login__field--password">
                <span className="donor-login__label">Password</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="donor-login__input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="donor-login__toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </label>

              <div className="donor-login__row">
                <label className="donor-login__remember">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <a className="donor-login__link" href="/donor-login">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="donor-login__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>

              {message?.text && (
                <div className={`donor-login__message donor-login__message--${message.type}`}>
                  {message.text}
                </div>
              )}
            </form>
          </section>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default DonorLogin

