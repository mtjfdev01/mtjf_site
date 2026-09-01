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
  progress = 15,
}) => {
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

        {showDonationForm && (
          <div className="page-header-replica-form">
            <VerticalDonationFormReplica
              formId="page-header-replica-donation-form"
              showProjectSelect
              showProgressBar={showProgressBar}
              progress={progress}
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
