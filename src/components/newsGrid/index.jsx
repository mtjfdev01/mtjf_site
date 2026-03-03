import "./index.css"
import NewsCard from "../newsCard"
import { newsList } from "../../data/newsData"

const NewsGrid = () => {
  return (
    <section className="news-section">
      <div className="news-grid">
        {newsList.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default NewsGrid
