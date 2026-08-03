import React, { useState } from 'react';
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

            {/* Right Side SVG Art */}
            <div className="hero-art">
              <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="400" fill="#004D40" />
                <g stroke="#EAAA00" strokeWidth="1.6" opacity="0.85">
                  <rect x="40" y="60" width="80" height="46" fill="none" />
                  <rect x="140" y="60" width="80" height="46" fill="none" />
                  <rect x="240" y="60" width="80" height="46" fill="none" />
                  <rect x="40" y="126" width="80" height="46" fill="none" />
                  <rect x="140" y="126" width="80" height="46" fill="none" />
                  <rect x="240" y="126" width="80" height="46" fill="none" />
                  <rect x="90" y="192" width="80" height="46" fill="none" />
                  <rect x="190" y="192" width="80" height="46" fill="none" />
                  <rect x="40" y="258" width="80" height="46" fill="none" />
                  <rect x="140" y="258" width="80" height="46" fill="none" />
                  <rect x="240" y="258" width="80" height="46" fill="none" />
                  <rect x="90" y="324" width="80" height="40" fill="none" />
                  <rect x="190" y="324" width="80" height="40" fill="none" />
                </g>
                <g opacity="0.6" stroke="#009A44" strokeWidth="1.5">
                  <line x1="0" y1="30" x2="400" y2="30" />
                  <line x1="0" y1="380" x2="400" y2="380" />
                </g>
              </svg>
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