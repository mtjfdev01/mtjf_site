import React, { useMemo } from 'react';
import './FeaturedIn.css';

// Import your actual logo images here
import logo1 from '../../assets/img/sgds/logo1.png'
import logo3 from '../../assets/img/sgds/logo3.png'
import logo4 from '../../assets/img/sgds/logo4.png'
import logo6 from '../../assets/img/sgds/logo6.png'
import logo10 from '../../assets/img/sgds/logo10.png'
import logo14 from '../../assets/img/sgds/logo14.png'

const featuredData = [
  {
    image: logo1,
    link: 'https://www.brecorder.com/',
    alt: 'Business Recorder',
  },
  {
    image: logo14,
    link: 'https://propakistani.pk/',
    alt: 'ProPakistani',
  },
  {
    image: logo3,
    link: 'https://www.khaleejtimes.com/',
    alt: 'Khaleej Times',
  },
  {
    image: logo4,
    link: 'https://tribune.com.pk/',
    alt: 'The Express Tribune',
  },
  {
    image: logo10,
    link: 'https://pakobserver.net/',
    alt: 'Pakistan Observer',
  },
  {
    image: logo6,
    link: 'https://www.24newshd.tv/',
    alt: '24 News HD',
  },
];

const FeaturedIn = ({
  className = '',
  variant = '',
  brands,
  title = 'Featured in',
  itemWidth,
  mobWidth,
  speed = 40,
}) => {
  const data = brands && brands.length > 0 ? brands : featuredData;

  // Duplicate 4 times for seamless infinite loop (same as BrandArea)
  const marqueeItems = useMemo(() => [...data, ...data, ...data, ...data], [data]);

  const durationSec = Math.max(1, Number(speed) || 40);

  const variantClass = variant ? `featured-area-${variant}` : '';

  return (
    <section
      className={`featured-section ${variantClass} ${className}`.trim()}
      style={{
        ['--duration']: `${durationSec}s`,
        ...(itemWidth ? { ['--item-width']: `${itemWidth}px` } : {}),
        ...(mobWidth ? { ['--item-mob-width']: `${mobWidth}px` } : {}),
      }}
    >
      <div className="featured-container">
        {/* Header */}
        {title && (
          <div className="featured-header">
            <h2 className="heading-secondary">{title}</h2>
          </div>
        )}

        {/* Full width marquee (same as BrandArea) */}
        <div className="featured-marquee">
          <div
            className="featured-track"
            style={{ animation: `featured-scroll ${durationSec}s linear infinite` }}
          >
            {marqueeItems.map((brand, i) => (
              <div className="featured-item" key={`featured-${i}`}>
                {brand.link ? (
                  <a
                    href={brand.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={brand.alt}
                  >
                    <img
                      src={brand.image}
                      alt={brand.alt}
                      width="150"
                      height="150"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <img
                    src={brand.image}
                    alt={brand.alt}
                    width="150"
                    height="150"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;