import "./index.css";
import { Link } from "react-router-dom";
import { blogs } from "../../data/blogsData";

const BlogsGrid = () => {
  return (
    <section className="blogs-section">
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <article key={blog.id} className="blog-card">
            <Link to={blog.link || `/blogs/${blog.id}`} className="blog-link">
              <div className="blog-image-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <span className="blog-date">{blog.date}</span>
              </div>

              <div className="blog-content">
                <p className="blog-category">{blog.category}</p>
                <h3 className="blog-title">{blog.title}</h3>
                <button className="blog-read-more">Read More</button>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogsGrid;
