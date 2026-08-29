import { Link, useNavigate } from 'react-router-dom'
import VerticalDonationFormReplica from '../donationForm/VerticalDonationFormReplica'
import './PageHeaderReplica.css'

const PageHeaderReplica = ({
  title,
  image,
  imageMob,
  url,
  onClick,
  showDonationForm = true,
  donationFormProps = {},
  showProgressBar = true,
  progress = 78,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, Number(progress) || 0))
  const navigate = useNavigate()

  const handleDonationSubmit =
    donationFormProps.onSubmit ||
    ((formData) => {
      const projectId = formData.projectId || formData.initiativeId || 'general'
      navigate(`/donate/${projectId}`, { state: { ...formData } })
    })

  const desktopImg = (
    <img
      src={image}
      alt={title}
      className="page-header-replica-image page-header-replica-image--desktop"
    />
  )
  const mobileImg = (
    <img
      src={imageMob || image}
      alt={title}
      className="page-header-replica-image page-header-replica-image--mobile"
    />
  )

  const images = (
    <>
      {desktopImg}
      {mobileImg}
    </>
  )

  return (
    <section className="page-header-replica">
      <div className="page-header-replica-container">
        <div
          className="page-header-replica-image-wrapper"
          onClick={onClick}
          style={onClick ? { cursor: 'pointer' } : undefined}
        >
          {url ? <Link to={url}>{images}</Link> : images}
        </div>

        {showProgressBar && (
          <div className="page-header-replica-progress">
            <div
              className="page-header-replica-progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={clampedProgress}
              aria-label="Fundraising progress"
            >
              <div
                className="page-header-replica-progress-fill"
                style={{ width: `${clampedProgress}%` }}
              >
                <span className="page-header-replica-progress-shine" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}

        {showDonationForm && (
          <div className="page-header-replica-form">
            <VerticalDonationFormReplica
              formId="page-header-replica-donation-form"
              showProjectSelect
              {...donationFormProps}
              onSubmit={handleDonationSubmit}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default PageHeaderReplica
