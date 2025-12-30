import { Link } from 'react-router-dom'
import './index.css'
import { getFeaturedBlog, getRegularBlogs } from '../../data/blogsData'

const QuickBlogs = () => {
  const featuredBlog = getFeaturedBlog()
  const regularBlogs = getRegularBlogs().slice(0, 2) // Show first 2 regular blogs

  return (
    <section className="blogs-section container py-64">
      <div className="blogs-header text-center mb-40">
        <h1 className="heading-secondary mb-16">Blogs</h1>
        <h2 className="h2 mb-24">
          Poor people are at high risk of severe malnutrition and no education.
        </h2>
        <Link to="/blogs" className="btn blogs-cta mb-16">
          Explore More
        </Link>
      </div>

      <div className="blogs-grid grid grid-12 gap-24">
        <div className="blogs-list col-12 lg-4 flex flex-col gap-24">
          {regularBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={blog.link}
              className="blog-card card overflow-hidden text-left"
            >
              <div className="blog-card-image">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-card-content">
                {blog.badge && (
                  <p className="blog-badge text-sm bold mb-12">{blog.badge}</p>
                )}
                <div className="blog-category text-sm mb-8 heading-primary"> 
                  {blog.category}
                </div>
                <h3 className="h3 mb-12">{blog.title}</h3>
                <p className="text-sm muted">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="featured-blog col-12 lg-8">
          <Link
            to={featuredBlog.link}
            className="featured-blog-card simple-featured-blog"
          >
            <img 
              src={featuredBlog.image} 
              alt={featuredBlog.title}
              className="featured-blog-background-image"
            />
            <div className="featured-blog-content flex flex-col h-100 justify-end">
              <div className="blog-category heading-secondary mb-12">
                {featuredBlog.category}
              </div>
              <h3 className="h2 mb-16">{featuredBlog.title}</h3>
              <p className="text-sm">{featuredBlog.excerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default QuickBlogs

