import React, { useMemo } from 'react';
import './index.css'; // <-- import the global CSS

// import logo20 from '../../assets/img/sgds/logo20.png'
import logo1 from '../../assets/img/sgds/logo1.png'
import logo3 from '../../assets/img/sgds/logo3.png'
import logo4 from '../../assets/img/sgds/logo4.png'
// import logo5 from '../../assets/img/sgds/logo5.png'
import logo6 from '../../assets/img/sgds/logo6.png'
// import logo7 from '../../assets/img/sgds/logo7.png'
// import logo8 from '../../assets/img/sgds/logo8.png'
// import logo9 from '../../assets/img/sgds/logo9.png'
import logo10 from '../../assets/img/sgds/logo10.png'
// import logo11 from '../../assets/img/sgds/logo11.png'
// import logo12 from '../../assets/img/sgds/logo12.png'
// import logo13 from '../../assets/img/sgds/logo13.png'
import logo14 from '../../assets/img/sgds/logo14.png'
// import logo15 from '../../assets/img/sgds/logo15.png'
// import logo16 from '../../assets/img/sgds/logo16.png'

const brandsData = [
    // {
    //     image:  logo20,
    //     link: 'https://sdgs.un.org/goals',
    //     alt: 'SDG Logo'
    // },
    {
        image:  logo1,
        link: 'https://sdgs.un.org/goals',
        alt: 'SDG Logo'
    },
    // {
    //     image:  logo2,
    //     link: 'https://sdgs.un.org/goals',
    //     alt: 'SDG Logo'
    // },
    // {
    //     image:  logo2,
    //     link: 'https://sdgs.un.org/goals',
    //     alt: 'SDG Logo'
    // },
    { 
        image:  logo3,
        link: 'https://sdgs.un.org/goals',
        alt: 'SDG Logo'
    },
    {
        image:  logo4,
        link: 'https://sdgs.un.org/goals',
        alt: 'SDG Logo'
    },
    // {
    //     image:  logo5,
    //     link: 'https://sdgs.un.org/goals',
    //     alt: 'SDG Logo'
    // },
    {
        image:  logo6,
        link: 'https://sdgs.un.org/goals',
        alt: 'SDG Logo'
    },
    // {
    //     image:  logo7,
    //     link: 'https://sdgs.un.org/goals',
    //     alt: 'SDG Logo'
    // },
    // {
    //     image:  logo8,
    //     link: 'https://sdgs.un.org/goals',
    //     alt: 'SDG Logo'
    // },
    // {
    //     image:  logo9,
    //     link: 'https://sdgs.un.org/goals',
    //     alt: 'SDG Logo'
    // },
    {
            image:  logo10,
        link: 'https://sdgs.un.org/goals',
        alt: 'SDG Logo'
    },

    {
        image:  logo14,
        link: 'https://sdgs.un.org/goals',
        alt: 'SDG Logo'
    },

];


const BrandArea = ({ className = '', speed = 70, brands, title = 'Commitment to Global Goals', itemWidth, mobWidth }) => {
  const data = brands && brands.length > 0 ? brands : brandsData;

  // Duplicate once for seamless loop
  const marqueeItems = useMemo(() => [...data, ...data], [data]);

  // Ensure a sensible duration (don’t let 500s look “frozen”)
  const durationSec = Math.max(1, Number(speed) || 20);

  return (
    <section
      className={`brands-section ${className}`}
      // drive the CSS var that the animation uses
      style={{ ['--duration']: `${durationSec}s`, ...(itemWidth ? { ['--item-width']: `${itemWidth}px` } : {}), ...(mobWidth ? { ['--item-mob-width']: `${mobWidth}px` } : {}) }}
    >
      <div className="brands-container">
        {title && (
          <div className="brands-header mx-auto">
            <h2 className="heading-secondary">{title}</h2> 
          </div>
        )}
        <div className="brands-marquee" aria-label="Partner brands scrolling list">
          <div
            className="brands-track"
            role="list"
            aria-live="off"
            // hard fallback in case var is ignored/overridden
            style={{ animation: `brands-scroll ${durationSec}s linear infinite` }}
          >
            {marqueeItems.map((brand, i) => (
              <div className="brand-item" role="listitem" key={`brand-${i}`}>
                {brand.link ? (
                  <a href={brand.link} target="_blank" rel="noopener noreferrer" title={brand.alt}>
                    <img src={brand.image} alt={brand.alt} width="120" height="60" loading="lazy" />
                  </a>
                ) : (
                  <img src={brand.image} alt={brand.alt} width="120" height="60" loading="lazy" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandArea;
