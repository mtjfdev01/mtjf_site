import { useEffect, useRef, useState } from 'react';
import {
  FiMail,
  FiMapPin,
  FiPhoneCall,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import './ContactOffices.css';

const OfficeSection = ({ badge, title, description, offices }) => {
  const sliderRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollByDirection = (direction) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    });
    // re-evaluate after the scroll animation kicks in
    window.requestAnimationFrame(updateScrollState);
  };

  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 8);
  };

  useEffect(() => {
    updateScrollState();
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    return () => {
      slider.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offices.length]);

  return (
    <section className="office-section">
      <div className="container">
        <div className="office-section__intro">
          {badge && <span className="office-section__badge">{badge}</span>}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div className="office-section__slider-wrapper">
          <button
            type="button"
            className="office-section__arrow office-section__arrow--left"
            aria-label="Scroll offices left"
            onClick={() => scrollByDirection(-1)}
            disabled={!canScrollPrev}
          >
            <FiChevronLeft />
          </button>
          <div className="office-section__grid" ref={sliderRef}>
            {offices.map((office) => (
              <article key={office.id} className="office-card">
                <div className="office-card__inner">
                  <div className="office-card__image-wrapper">
                    <img src={office.image} alt={office.name} loading="lazy" />
                  </div>
                  <div className="office-card__content">
                    <div>
                      <h3>{office.name}</h3>
                    </div>
                    <ul className="office-card__details">
                      <li>
                        <FiPhoneCall />
                        <span>{office.phone}</span>
                      </li>
                      {office.hotline && (
                        <li>
                          <FiPhoneCall />
                          <span>{office.hotline}</span>
                        </li>
                      )}
                      {/* <li>
                        <FiMail />
                        <span>{office.email}</span>
                      </li> */}
                      <li>
                        <FiMapPin />
                        <span>{office.address}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button
            type="button"
            className="office-section__arrow office-section__arrow--right"
            aria-label="Scroll offices right"
            onClick={() => scrollByDirection(1)}
            disabled={!canScrollNext}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfficeSection;

