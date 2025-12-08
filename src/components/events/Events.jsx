import { Link } from 'react-router-dom'
import './Events.css'
import event1 from '../../assets/img/causes/Rectangle 34625787.png'
import event2 from '../../assets/img/causes/Rectangle 34625788.png'
import event3 from '../../assets/img/causes/Rectangle 34625789.png'
import featuredImg from '../../assets/img/causes/marriage_gift.webp' 

const EVENTS_DATA = [
  {
    id: 'waqf',
    title: 'A Sacrifice That Lasts: What Waqf ...',
    description: 'As part of their commendable efforts, the foundation successfully reconstructed over 600 houses belonging to the flood victims.',
    image: event1,
    link: '/events/waqf'
  },
  {
    id: 'nutrition',
    title: 'Nutritious Foods & Clean Water ...',
    description: 'As part of their commendable efforts, the foundation successfully reconstructed over 600 houses belonging to the flood victims.',
    image: event2,
    link: '/events/nutrition'
  },
  {
    id: 'key-distribution',
    title: 'Key Distribution Ceremony of Houses',
    description: 'As part of their commendable efforts, the foundation successfully reconstructed over 600 houses belonging to the flood victims.',
    image: event3,
    link: '/events/key-distribution'
  }
]

const FEATURED_EVENT = {
  id: 'marriage-gift',
  category: 'Marriage',
  title: 'Marriage Gift Program',
  description: 'In numerous parts of the world, financial constraints can pose significant hurdles to marriage, depriving families, especially young girls, of the joyous occasion. For impoverished girls, this predicament',
  image: featuredImg,
  link: '/events/marriage-gift'
}

const Events = () => {

  return (
    <section className="events-section container py-64">
      <div className="events-header mb-48">
        <h2 className="heading-secondary events-kicker mb-16">News & Events</h2>
      </div>

      <div className="events-grid grid grid-12 gap-24">
        {/* Left Column - Event Cards */}
        <div className="events-list col-12 lg-6">
          <div className="events-cards flex flex-col gap-24">
            {EVENTS_DATA.map((event) => (
              <Link
                key={event.id}
                to={event.link}
                className="event-card card flex gap-24 overflow-hidden"
              >
                <div className="event-image-wrapper">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                  />
                </div>
                <div className="event-content flex flex-col flex-1">
                  <h5 className="h4 mb-0">{event.title}</h5>
                  <p className="text-sm muted mb-16 flex-1">
                    {event.description}
                  </p>
                  <button
                    className="btn btn-join"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = event.link
                    }}
                  >
                    Join With Us
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column - Featured Card */}
        <div className="featured-event col-12 lg-6">
          <div className="featured-events-rows flex flex-col gap-24">
            {/* First Row - Facebook Page Embed */}
            <div className="featured-card-row facebook-embed-wrapper">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffoundation.mtj&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="500"
                style={{ border: 'none', overflow: 'hidden', width: '100%', display: 'block' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="MTJ Foundation Facebook Page"
              ></iframe>
            </div>

            {/* Second Row */}
            <Link
              to={FEATURED_EVENT.link}
              className="featured-card-row simple-featured"
            >
              <img 
                src={FEATURED_EVENT.image} 
                alt={FEATURED_EVENT.title}
                className="featured-background-image"
              />
              <div className="featured-content flex flex-col h-100">
                <h2 className="featured-category heading-primary mb-16">
                  {FEATURED_EVENT.category}
                </h2>

                <h3 className="mb-16">{FEATURED_EVENT.title}</h3>

                <p className="text-sm mb-24 flex-1">
                  {FEATURED_EVENT.description}
                </p>

                <button
                  className="btn btn-join"
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = FEATURED_EVENT.link
                  }}
                >
                  Join With Us
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events

