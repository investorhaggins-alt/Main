import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function GlobeView({ cityPoints, onCityClick, pickMode, pickedPoint, onPick }) {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 500 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 30, lng: -90, altitude: 2.2 }, 0);
    }
  }, []);

  const points = pickMode && pickedPoint
    ? [...cityPoints, { ...pickedPoint, color: "#ffcc00", label: "New chapter location", size: 1.2, isPicked: true }]
    : cityPoints;

  return (
    <div ref={containerRef} className="globe-container">
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        globeImageUrl="/globe/earth-night.jpg"
        bumpImageUrl="/globe/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={(p) => p.color || "#7dd3fc"}
        pointAltitude={(p) => (p.isPicked ? 0.02 : 0.01)}
        pointRadius={(p) => p.size || 0.6}
        pointLabel={(p) => p.label}
        onPointClick={(p) => {
          if (!pickMode && !p.isPicked) onCityClick?.(p);
        }}
        onGlobeClick={({ lat, lng }) => {
          if (pickMode) onPick?.({ lat, lng });
        }}
      />
      {pickMode && (
        <div className="globe-hint">Click anywhere on the globe to set this chapter's city location</div>
      )}
    </div>
  );
}
