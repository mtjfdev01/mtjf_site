import { Link } from 'react-router-dom'
import './Blogs.css'
import blog1 from '../../assets/img/causes/Rectangle 34625787.png'
import blog2 from '../../assets/img/causes/Rectangle 34625788.png'

const FEATURED_BLOG = {
  id: 'qurbani-meaning',
  category: 'Qurbani',
  title: 'Understanding Qurbani: Its Meaning, Rules, and Significance in Islam',
  excerpt:
    'Every year, as the sacred days of Dhul Hijjah draw near, Muslims around the world prepare to honour the powerful legacy of Prophet Ibrahim (AS) through the act of Qurbani.',
  image: blog2,
  link: '/blogs/qurbani-meaning'
}

const BLOG_LIST = [
  {
    id: 'waqf-qurbani',
    category: 'Food',
    badge: '96% of people in Gaza are facing high levels of food insecurity',
    title: 'What Waqf Qurbani Means with MTJ Foundation',
    excerpt:
      'As the sacred days of Dhul al-Hijjah approach, we’re reminded of the story that lies at the heart of Qurbani — a story of unwavering faith and sacrifice.',
    image: blog1,
    link: '/blogs/waqf-qurbani'
  }
]

const Blogs = () => {
  return (
    <section className="blogs-section container py-64">
      <div className="blogs-header text-center mb-40">
        <h1 className="heading-secondary mb-16">Blogs</h1>
        <h2 className="h2 mb-24">
          Poor people are at high risk of severe malnutrition and no education.
        </h2>
        <Link to="/blogs" className="btn blogs-cta">
          Explore More
        </Link>
      </div>

      <div className="blogs-grid grid grid-12 gap-24">
        <div className="blogs-list col-12 lg-4 flex flex-col gap-24">
          {BLOG_LIST.map((blog) => (
            <Link
              key={blog.id}
              to={blog.link}
              className="blog-card card overflow-hidden text-left"
            >
              <div className="blog-card-image">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-card-content">
                {/* <p className="blog-badge text-sm bold mb-12">{blog.badge}</p> */}
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
            to={FEATURED_BLOG.link}
            className="featured-blog-card simple-featured-blog"
            style={{ backgroundImage: `url(${FEATURED_BLOG.image})` }}
          >
            <div className="featured-blog-content flex flex-col h-100 justify-end">
              <div className="blog-category heading-secondary mb-12">
                {FEATURED_BLOG.category}
              </div>
              <h3 className="h2 mb-16">{FEATURED_BLOG.title}</h3>
              <p className="text-sm">{FEATURED_BLOG.excerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blogs

