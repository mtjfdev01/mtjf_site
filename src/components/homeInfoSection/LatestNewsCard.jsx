import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../../data/blogsData';
import { MEDIA_COVERAGE_DATA } from '../../data/media_coverage_data';

const LatestNewsCard = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const navigate = useNavigate();

  // Data per tab
  const latestBlogs = blogs.slice(0, 4);
  const coverageItems = MEDIA_COVERAGE_DATA
    .filter((item) => item.title && item.image) // skip entries with empty title
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      image: item.image,
      date: item.subtitle,    // subtitle holds the date string
      title: item.title,
      link: item.donationUrl, // external URL
      openInNewTab: item.openInNewTab,
      isExternal: true,
    }));

  // Active dataset
  const activeItems = activeTab === 'latest' ? latestBlogs : coverageItems;

  const handleItemClick = (item) => {
    if (item.isExternal) {
      navigate('/media/coverage');
    } else {
      navigate(`/blogs/${item.id}`);
    }
  };

  return (
    <div className="info-card">
      {/* Tabs Header */}
      <div className="info-card-tabs">
        <button
          className={`tab-btn ${activeTab === 'latest' ? 'active' : ''}`}
          onClick={() => setActiveTab('latest')}
          type="button"
        >
          Latest News
        </button>
        <button
          className={`tab-btn ${activeTab === 'opinion' ? 'active' : ''}`}
          onClick={() => setActiveTab('opinion')}
          type="button"
        >
          Media Coverage
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="info-card-content scrollable">
        <div className="blog-list">
          {activeItems.map((item) => (
            <article key={item.id} className="blog-list-item">
              <div className="blog-list-image">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="blog-list-body">
                {item.date && (
                  <span className="blog-list-date">{item.date}</span>
                )}
                <h4 className="blog-list-title">{item.title}</h4>
                <button
                  className="read-more-link"
                  onClick={() => handleItemClick(item)}
                  type="button"
                >
                  Learn More <span className="arrow">›</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNewsCard;
