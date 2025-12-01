import './PageHeader.css'
const PageHeader = ({ title, image}) => {
  return (
    <section className="page-header">
      <div className="page-header-container">
        <div className="page-header-image-wrapper">
          <img
            src={image}
            alt={title}
            className="page-header-image"
          />
        </div>
        <div className="page-header-overlay">
          <h3 className="page-header-title">{title}</h3>
        </div>
      </div>
    </section>
  )
}

export default PageHeader

