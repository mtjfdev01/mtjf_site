import { pad, useZakatCountdown } from '../navbar/zakatCountdown'
import './mobilenavbar.css'

const CountdownUnit = ({ value, label }) => (
  <div className="zakat-countdown__unit">
    <span className="zakat-countdown__value">{pad(value)}</span>
    <span className="zakat-countdown__label">{label}</span>
  </div>
)

const MobileZakatCountdownBanner = () => {
  const timeLeft = useZakatCountdown()

  return (
    <div className="zakat-countdown-banner zakat-countdown-banner--mobile md:d-none">
      <div className="zakat-countdown-banner--mobile__top">
        <div className="zakat-countdown-banner__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32 10a14 14 0 1 0 0 28 16 16 0 0 1 0-28z"
              fill="white"
              opacity="0.95"
            />
            <circle cx="36" cy="12" r="2" fill="white" />
            <circle cx="40" cy="20" r="1.5" fill="white" opacity="0.85" />
            <circle cx="33" cy="7" r="1.2" fill="white" opacity="0.75" />
          </svg>
        </div>
        <p className="zakat-countdown-banner__message">
        The Islamic Year Is Ending — Make Every Remaining Moment Count
        </p>
      </div>

      <div className="zakat-countdown-banner--mobile__bottom">
        <div className="zakat-countdown" aria-label="Time remaining until Islamic year ends">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <span className="zakat-countdown__sep">:</span>
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <span className="zakat-countdown__sep">:</span>
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <span className="zakat-countdown__sep">:</span>
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </div>
  )
}

export default MobileZakatCountdownBanner
