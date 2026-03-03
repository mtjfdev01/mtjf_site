import "./index.css"
import { Link } from "react-router-dom"

const NewsCard = ({ item }) => {
  return (
    <article className="news-card">
      <Link to={item.link} className="news-link">
        <div className="news-image-wrapper">
          <img src={item.image} alt={item.title} className="news-image" />
          {item.date && <span className="news-date">{item.date}</span>}
        </div>
        <div className="news-content">
          <p className="news-category">{item.category}</p>
          <h3 className="news-title">{item.title}</h3>
          <button className="news-read-more">Learn More</button>
        </div>
      </Link>
    </article>
  )
}

export default NewsCard
