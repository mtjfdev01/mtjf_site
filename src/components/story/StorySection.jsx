import StoryForm from './StoryForm'
import './StorySection.css'
import image1 from '../../assets/img/404.webp'
import image2 from '../../assets/img/404.webp'

const StorySection = ({ 
  title = 'Have a Story to Share?',
  description = 'Discover how the Molana Tariq Jamil Foundation is transforming lives across Pakistan and beyond. From impactful initiatives to personal success stories, our blog is your window into the heart of our mission. If you\'ve been touched by the MTJ Foundation or want to contribute your own story, we\'d love to hear from you.',
  onSubmit 
}) => {
  return (
    <section className="story-section">
      <div className="story-container container">
        {/* Title and Description at Top */}
        <div className="story-header">
          <h2 className="story-title">{title}</h2>
          <p className="story-description">{description}</p>
        </div>

        {/* Form and Images Layout */}
        <div className="story-content">
          {/* Form on Left */}
          <div className="story-form-wrapper">
            <StoryForm onSubmit={onSubmit} />
          </div>
          
          {/* Images on Right */}
          <div className="story-images">
            {image1 && (
              <div className="story-image story-image--large">
                <img src={image1} alt="Story testimonial" />
              </div>
            )}
            {image2 && (
              <div className="story-image story-image--small">
                <img src={image2} alt="Story testimonial" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection

