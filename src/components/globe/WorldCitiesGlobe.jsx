import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Globe from "react-globe.gl";

const PLACES_GEOJSON_URL =
  "https://unpkg.com/globe.gl@2.18.2/example/datasets/ne_110m_populated_places_simple.geojson";

export default function WorldCitiesGlobe() {
  const globeRef = useRef();
  const containerRef = useRef();
  const [places, setPlaces] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Fetch GeoJSON city data
  useEffect(() => {
    let cancelled = false;

    fetch(PLACES_GEOJSON_URL)
      .then((res) => res.json())
      .then((geojson) => {
        if (cancelled) return;
        setPlaces(geojson.features || []);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-rotate controls
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
    }
  }, []);

  // Handle resize so the WebGL canvas always fills its container
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
  }, []);

  useEffect(() => {
    updateDimensions(); // initial size

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Optional filter (keep all by default)
  const filteredPlaces = useMemo(() => {
    return places;
    // Example: filter cities with pop >= 1M
    // return places.filter((f) => (f?.properties?.pop_max ?? 0) >= 1_000_000);
  }, [places]);

  return (
    <div ref={containerRef} className="world-cities-globe-container">
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          // Globe appearance
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          // Labels layer
          labelsData={filteredPlaces}
          labelLat={(d) => d.properties.latitude}
          labelLng={(d) => d.properties.longitude}
          labelText={(d) => d.properties.name}
          // Sizing logic (same as demo)
          labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
          labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
          labelColor={() => "rgba(255, 165, 0, 0.75)"}
          labelResolution={2}
          // Tooltip on hover
          labelLabel={(d) =>
            `<div style="font-size:12px; background:rgba(0,0,0,0.7); padding:6px 10px; border-radius:4px; color:#fff;">
               <b>${d.properties.name}</b><br/>
               Pop: ${Number(d.properties.pop_max || 0).toLocaleString()}
             </div>`
          }
        />
      )}
    </div>
  );
}
