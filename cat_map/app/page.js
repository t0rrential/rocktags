"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// SVG data URL for a simple cat face icon
const catIcon = {
  url: "data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='20' cy='20' r='18' fill='%23FBBF24' stroke='%23333333' stroke-width='2'/><ellipse cx='13' cy='18' rx='2' ry='3' fill='%23333333'/><ellipse cx='27' cy='18' rx='2' ry='3' fill='%23333333'/><path d='M15 27c2 2 8 2 10 0' stroke='%23333333' stroke-width='2' stroke-linecap='round'/><path d='M7 10l5 5M33 10l-5 5' stroke='%23333333' stroke-width='2' stroke-linecap='round'/></svg>",
  scaledSize: { width: 40, height: 40 },
};

const libraries = ["places"];

export default function Home() {
  const [pins, setPins] = useState([]);
  const [activePin, setActivePin] = useState(null);

  // List of popular UTA locations
  const popularLocations = [
    { name: "Central Library", lat: 32.7312, lng: -97.1147 },
    { name: "College Park Center", lat: 32.7316, lng: -97.1081 },
    { name: "Engineering Research Building", lat: 32.7327, lng: -97.1116 },
    { name: "Nedderman Hall", lat: 32.7322, lng: -97.1131 },
    { name: "Maverick Stadium", lat: 32.7351, lng: -97.1202 },
    { name: "University Center", lat: 32.7315, lng: -97.1100 },
    { name: "Science Hall", lat: 32.7297, lng: -97.1137 },
    { name: "Fine Arts Building", lat: 32.7307, lng: -97.1162 },
    { name: "Business Building", lat: 32.7302, lng: -97.1122 },
    { name: "Arlington Hall", lat: 32.7287, lng: -97.1107 },
  ];

  // Haversine formula to calculate distance between two lat/lng points in meters
  function getDistance(lat1, lng1, lat2, lng2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371000; // meters
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function getClosestLocation(lat, lng) {
    let minDist = Infinity;
    let closest = null;
    for (const loc of popularLocations) {
      const dist = getDistance(lat, lng, loc.lat, loc.lng);
      if (dist < minDist) {
        minDist = dist;
        closest = loc;
      }
    }
    return closest;
  }

  const mapContainerStyle = {
    width: "90vw",
    maxWidth: "1200px",
    height: "70vh",
    margin: "40px auto",
    borderRadius: "1rem",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)",
    overflow: "hidden",
  };

  // Centered on UT Arlington
  const center = { lat: 32.7318, lng: -97.1106 };
  const defaultZoom = 15;

  return (
    <div className="flex flex-col items-center min-h-screen bg-pink-50 bg-[url('/paw-bg.png')] bg-repeat">
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-pink-700/90 to-pink-400/80 py-4 shadow-lg relative">
        <span className="absolute left-8 top-1/2 -translate-y-1/2">
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f431.png" alt="cat" className="w-12 h-12" />
        </span>
        <h1 className="text-white text-3xl font-bold tracking-wide drop-shadow-lg font-[Pacifico]">CatMap @ UTA</h1>
        <span className="absolute right-8 top-1/2 -translate-y-1/2">
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f63b.png" alt="cat heart" className="w-12 h-12" />
        </span>
      </div>
      <div className="flex justify-center items-center w-full mt-8">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={defaultZoom}
            onClick={e => {
              const newPin = { lat: e.latLng.lat(), lng: e.latLng.lng() };
              setPins(prev => {
                const updated = [...prev, newPin];
                setActivePin(updated.length - 1);
                return updated;
              });
            }}
          >
            {pins.map((pin, idx) => {
              const closest = getClosestLocation(pin.lat, pin.lng);
              return (
                <Marker
                  key={idx}
                  position={pin}
                  icon={catIcon}
                  onClick={() => setActivePin(idx)}
                  onDblClick={() => setPins(pins.filter((_, i) => i !== idx))}
                >
                  {activePin === idx && closest && (
                    <InfoWindow
                      position={{ lat: pin.lat + 0.0006, lng: pin.lng }}
                      onCloseClick={() => setActivePin(null)}
                    >
                      <div className="text-xs font-[Pacifico]">
                        <div className="font-bold text-pink-700 mb-1">Closest Cat Spot</div>
                        <div>{closest.name}</div>
                        <div className="mt-1 text-pink-400">🐾 Meow!</div>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="mt-4 text-pink-700 text-base font-[Pacifico]">
        Click to add a cat paw, double-click a paw to remove it. Catify your campus!
      </div>
    </div>
  );
}