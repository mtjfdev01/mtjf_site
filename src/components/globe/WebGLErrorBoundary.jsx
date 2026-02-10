import React, { Component } from "react";

/**
 * Error boundary that catches WebGL / Three.js rendering errors
 * and shows a friendly fallback instead of a blank screen.
 */
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message || "Unknown error" };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WebGL Error Boundary caught:", error, errorInfo);
  }

  /**
   * Quick check: can the browser create a WebGL context?
   */
  static isWebGLAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  }

  render() {
    if (this.state.hasError || !WebGLErrorBoundary.isWebGLAvailable()) {
      return (
        <div className="webgl-error-fallback">
          <div className="webgl-error-content">
            <span className="webgl-error-icon" role="img" aria-label="globe">
              🌍
            </span>
            <h3>3D Globe Unavailable</h3>
            <p>
              Your browser or device does not support WebGL, which is required to
              render the interactive 3D globe.
            </p>
            <p className="webgl-error-hint">
              Try using the latest version of Chrome, Firefox, or Edge.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
