import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EVENTS_DATA } from '../../data/eventsData';

const EventsCard = () => {
  const navigate = useNavigate();

  // Show first 2 events in the homepage card
  const featuredEvents = EVENTS_DATA.slice(0, 2);

  return (
    <div className="info-card">
      {/* Card Header */}
      <div className="info-card-header">
        <h3>Events</h3>
      </div>

      {/* Scrollable Content */}
      <div className="info-card-content scrollable">
        {featuredEvents.map((event) => (
          <div key={event.id} className="event-item featured">
            <div className="event-image">
              <img src={event.image} alt={event.title} loading="lazy" />
            </div>
            <div className="event-details">
              <div className="event-meta">
                {/* <span className="event-status">Coming Soon</span> */}
                <span className="event-date">{event.subtitle.split('|')[0]}</span>
                {/* <span className="event-time">{event.subtitle.split('|')[1]}</span> */}
              </div>
              <h4 className="event-title">{event.title}</h4>
            </div>
          </div>
        ))}

        {/* View All Events link */}
        <button
          className="events-view-all-btn"
          type="button"
          onClick={() => navigate('/events')}
        >
          View All Events &rarr;
        </button>
      </div>
    </div>
  );
};

export default EventsCard;
