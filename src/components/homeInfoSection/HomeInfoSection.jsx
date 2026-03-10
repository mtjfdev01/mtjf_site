import React from 'react';
import LatestNewsCard from './LatestNewsCard';
import EventsCard from './EventsCard';
import SocialStreamCard from './SocialStreamCard';
import './HomeInfoSection.css';

const HomeInfoSection = () => {
  return (
    <section className="home-info-section">
      <div className="container">
        <div className="home-info-grid">
          <LatestNewsCard />
          <EventsCard />
          <SocialStreamCard />
        </div>
      </div>
    </section>
  );
};

export default HomeInfoSection;
