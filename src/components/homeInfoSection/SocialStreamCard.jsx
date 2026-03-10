import React from 'react';

const SocialStreamCard = () => {
  return (
    <div className="info-card">
      {/* Card Header */}
      <div className="info-card-header">
        <h3>Social Stream</h3>
      </div>

      {/* Scrollable Content */}
      <div className="info-card-content scrollable">
        <div className="social-embed">
          {/* Facebook Page Plugin */}
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffoundation.mtj&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="100%"
            height="500"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="MTJ Foundation Facebook Page"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialStreamCard;
