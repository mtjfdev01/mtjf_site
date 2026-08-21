import { Link } from 'react-router-dom'
import './PageHeader.css'

const PageHeader = ({ title, image, imageMob, url, onClick }) => {
  const desktopImg = (
    <img
      src={image}
      alt={title}
      className="page-header-image page-header-image--desktop"
    />
  )
  const mobileImg = (
    <img
      src={imageMob || image}
      alt={title}
      className="page-header-image page-header-image--mobile"
    />
  )

  const images = (
    <>
      {desktopImg}
      {mobileImg}
    </>
  )

  return (
    <section className="page-header">
      <div className="page-header-container">
        <div
          className="page-header-image-wrapper"
          onClick={onClick}
          style={onClick ? { cursor: 'pointer' } : undefined}
        >
          {url ? <Link to={url}>{images}</Link> : images}
        </div>
      </div>
    </section>
  )
}

export default PageHeader

