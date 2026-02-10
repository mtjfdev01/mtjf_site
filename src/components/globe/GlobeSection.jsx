import React from "react";
import WorldCitiesGlobe from "./WorldCitiesGlobe";
import WebGLErrorBoundary from "./WebGLErrorBoundary";
import "./Globe.css";

const GlobeSection = () => {
  return (
    <section className="globe-section">
      {/* Header */}
      <div className="globe-section-header">
        <h2 className="globe-section-title">Our Global Presence</h2>
        <p className="globe-section-subtitle">
          Explore where MTJ Foundation is making a difference across the world
        </p>
      </div>

      {/* Globe */}
      <WebGLErrorBoundary>
        <div className="globe-canvas-wrapper">
          <WorldCitiesGlobe />
        </div>
      </WebGLErrorBoundary>

      <p className="globe-hint">
        Drag to rotate. Scroll to zoom. Hover a city for details.
      </p>
    </section>
  );
};

export default GlobeSection;
