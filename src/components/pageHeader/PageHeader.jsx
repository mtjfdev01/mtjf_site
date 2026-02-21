import { Link } from 'react-router-dom'
import './PageHeader.css'

const PageHeader = ({ title, image, url, onClick }) => {
  const img = (
    <img
      src={image}
      alt={title}
      className="page-header-image"
    />
  )

  return (
    <section className="page-header">
      <div className="page-header-container">
        <div
          className="page-header-image-wrapper"
          onClick={onClick}
          style={onClick ? { cursor: 'pointer' } : undefined}
        >
          {url ? <Link to={url}>{img}</Link> : img}
        </div>
      </div>
    </section>
  )
}

export default PageHeader

