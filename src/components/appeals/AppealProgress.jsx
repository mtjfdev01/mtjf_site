import './AppealProgress.css'

const AppealProgress = ({ percent = 0, size = 'md', showLabel = false }) => {
  const clamped = Math.min(100, Math.max(0, Number(percent) || 0))

  if (size === 'ring') {
    const radius = 42
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (clamped / 100) * circumference

    return (
      <div className="appeal-progress-ring" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="appeal-progress-ring__svg">
          <circle cx="50" cy="50" r={radius} className="appeal-progress-ring__track" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="appeal-progress-ring__fill"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="appeal-progress-ring__label">{Math.round(clamped)}%</span>
      </div>
    )
  }

  return (
    <div className={`appeal-progress appeal-progress--${size}`}>
      <div className="appeal-progress__track">
        <div className="appeal-progress__fill" style={{ width: `${clamped}%` }} />
      </div>
      {showLabel && <span className="appeal-progress__text">{Math.round(clamped)}% funded</span>}
    </div>
  )
}

export default AppealProgress
