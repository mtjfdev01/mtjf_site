import React, { useState } from 'react';
import SupportHero from '../../assets/img/apnaGhar/support-hero.jpg';

import './About.css';
import './Hero.css';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/As6ihUvuXjM?autoplay=1&mute=1&si=idq0LVtePlsvVS1E";

  return (
    <>
      <section className="hero" id="home" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow-row">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L21 10V21H3V10L12 3Z" stroke="#009A44" strokeWidth="1.8" />
                </svg>
                <span className="eyebrow">A Shelter of Dignity for Widows, Abandoned Women &amp; Orphans</span>
              </div>
              <h1>
                Support a Mother,<br />
                Strengthen <span className="accent">Generations</span>
              </h1>
              <blockquote className="hadith">
                <p>The Prophet ﷺ said: &ldquo;The best house is the one that treats orphans well.&rdquo;</p>
                <cite>Jami at-Tirmidhi 1917</cite>
                <p>More than shelter — a community raised the way the Ansar raised theirs: with open hearts and open homes.</p>
              </blockquote>
              <div className="hero-ctas">
                <a href="#donate" className="btn btn-gold">Donate Now</a>
                
                {/* Play Button Triggering Lightbox Modal */}
                <button 
                  type="button" 
                  className="play-circle" 
                  aria-label="Play video"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="#009A44">
                    <path d="M3 2l11 6-11 6V2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side Image Art Container */}
            <div className="hero-art">
              <img 
                src={SupportHero }
                alt="APNA GHAR Project Support for Widows and Orphans" 
                loading="eager"
              />
            </div>
          </div>

          <div className="stat-strip">
            <div className="wrap" style={{ padding: 0 }}>
              <div className="stat-grid">
                <div className="stat-item">
                  <div className="num">44 Kanals</div>
                  <div className="label">Donated Land</div>
                </div>
                <div className="stat-item">
                  <div className="num">102</div>
                  <div className="label">Residential Units</div>
                </div>
                <div className="stat-item">
                  <div className="num">500 KVA</div>
                  <div className="label">Solar Power System</div>
                </div>
                <div className="stat-item">
                  <div className="num">PKR 327.4M</div>
                  <div className="label">Total Project Budget</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal Popup */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="video-modal-close" 
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="video-responsive">
              <iframe
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}