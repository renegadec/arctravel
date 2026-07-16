"use client";

import { useEffect, useRef } from "react";

const cities = [
  { lat: -17.825, lng: 31.033, label: "Harare" },
  { lat: -20.148, lng: 28.587, label: "Bulawayo" },
  { lat: -17.924, lng: 25.857, label: "Victoria Falls" },
  { lat: -26.204, lng: 28.047, label: "Johannesburg" },
  { lat: -33.925, lng: 18.424, label: "Cape Town" },
  { lat: -1.292, lng: 36.822, label: "Nairobi" },
  { lat: 25.205, lng: 55.271, label: "Dubai" },
  { lat: 51.507, lng: -0.128, label: "London" },
  { lat: 40.713, lng: -74.006, label: "New York" },
  { lat: 39.904, lng: 116.407, label: "Beijing" },
  { lat: -20.348, lng: 57.552, label: "Mauritius" },
  { lat: 41.008, lng: 28.978, label: "Istanbul" },
  { lat: 9.032, lng: 38.747, label: "Addis Ababa" },
  { lat: 6.524, lng: 3.379, label: "Lagos" },
  { lat: -24.628, lng: 25.923, label: "Gaborone" },
  { lat: -15.388, lng: 28.323, label: "Lusaka" },
  { lat: -25.969, lng: 32.573, label: "Maputo" },
];

const arcs = [
  { startLat: -17.825, startLng: 31.033, endLat: -26.204, endLng: 28.047 },
  { startLat: -17.825, startLng: 31.033, endLat: 25.205, endLng: 55.271 },
  { startLat: -17.825, startLng: 31.033, endLat: 51.507, endLng: -0.128 },
  { startLat: -17.825, startLng: 31.033, endLat: -1.292, endLng: 36.822 },
  { startLat: -17.825, startLng: 31.033, endLat: -17.924, endLng: 25.857 },
  { startLat: -26.204, startLng: 28.047, endLat: 40.713, endLng: -74.006 },
  { startLat: -1.292, startLng: 36.822, endLat: 25.205, endLng: 55.271 },
  { startLat: 51.507, startLng: -0.128, endLat: 39.904, endLng: 116.407 },
  { startLat: -33.925, startLng: 18.424, endLat: -20.348, endLng: 57.552 },
];

const OPACITY = 0.3;

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let globeInstance: any = null;

    async function init() {
      const Globe = (await import("globe.gl")).default;
      const el = containerRef.current!;
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      globeInstance = new Globe(el)
        .globeImageUrl(
          "//unpkg.com/three-globe/example/img/earth-night.jpg"
        )
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(false)
        .width(width)
        .height(height)
        .pointOfView({ lat: 0, lng: 20, altitude: 2.5 })
        .pointsData(cities)
        .pointLat("lat")
        .pointLng("lng")
        .pointColor(() => "#ff8912")
        .pointAltitude(0.02)
        .pointRadius(0.15)
        .pointResolution(12)
        .pointsMerge(true)
        .arcsData(arcs)
        .arcStartLat("startLat")
        .arcStartLng("startLng")
        .arcEndLat("endLat")
        .arcEndLng("endLng")
        .arcColor(() => [
          `rgba(255, 137, 18, ${OPACITY})`,
          `rgba(255, 170, 68, ${OPACITY})`,
        ])
        .arcAltitudeAutoScale(0.5)
        .arcStroke(1.5)
        .arcDashLength(0.25)
        .arcDashGap(1)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(4000)
        .arcsTransitionDuration(0);

      globeRef.current = globeInstance;
    }

    init();

    return () => {
      if (globeInstance && globeInstance._destructor) {
        globeInstance._destructor();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ minHeight: "400px", minWidth: "300px" }}
    />
  );
}
