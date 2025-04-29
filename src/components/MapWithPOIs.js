import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import axios from 'axios';
import useUserLocation from '../utils/useUserLocation';
import 'leaflet/dist/leaflet.css';

// POI Categories
const categoryMap = {
  Hotel: 'accommodation.hotel',
  Restaurant: 'catering.restaurant',
  Nature: 'natural',
  Adventure: 'sport',
  Relaxation: 'leisure.spa',
  Culture: 'entertainment.culture',
  Nightlife: 'entertainment.nightclub',
  Event: 'entertainment.events',
  Shopping: 'commercial.shopping_mall',
  'Health & Safety': 'healthcare.hospital',
};

// POI Icons
const iconMap = {
  Hotel: '🏨',
  Restaurant: '🍽️',
  Nature: '🌳',
  Adventure: '⛷️',
  Relaxation: '💆',
  Culture: '🏛️',
  Nightlife: '🎉',
  Event: '📅',
  Shopping: '🛍️',
  'Health & Safety': '🏥',
};

// POI Icon Component
const getIcon = (label) =>
  L.divIcon({
    html: `<div style="
      background: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: 0 0 6px rgba(0,0,0,0.5);
    ">${iconMap[label] || '📍'}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

// 🧍 Live User Marker Icon
const getUserIcon = () =>
  L.divIcon({
    html: `<div style="
      background: #3b82f6;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 30px;
      box-shadow: 0 0 12px rgba(0,0,0,0.6);
    ">🧍</div>`,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60],
  });

// Optional helper to adjust map bounds to fit all markers
const FitToBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
};

const MapWithPOIs = ({ center, preferences = [] }) => {
  const { location: userLocation } = useUserLocation();
  const [pois, setPOIs] = useState({});
  const [legendVisible, setLegendVisible] = useState(true);
  const [visibleCategories, setVisibleCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const allCategories = [...new Set(['Hotel', 'Restaurant', ...preferences])];

  const [allMarkers, setAllMarkers] = useState([]);

  const getDistanceKm = (loc1, loc2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.lat)) *
        Math.cos(toRad(loc2.lat)) *
        Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };
  

  useEffect(() => {
    setLoading(true);
    const fetchPOIs = async () => {
      const newPOIs = {};
      const markers = [];

      for (const label of allCategories) {
        const category = categoryMap[label];
        if (!category) continue;
        const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${center.lng},${center.lat},3000&limit=10&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`;
        try {
          const res = await axios.get(url);
          newPOIs[label] = res.data.features || [];
          markers.push(
            ...(res.data.features || []).map((poi) => [
              poi.geometry.coordinates[1],
              poi.geometry.coordinates[0],
            ])
          );
        } catch {
          newPOIs[label] = [];
        }
      }

      setPOIs(newPOIs);
      setVisibleCategories(Object.fromEntries(allCategories.map((c) => [c, true])));
      // Add live location only if it's nearby
if (userLocation?.lat && userLocation?.lng) {
  const distanceKm = getDistanceKm(center, userLocation);
  if (distanceKm < 1000) {
    markers.push([userLocation.lat, userLocation.lng]);
  }
}
      setAllMarkers(markers);
      setLoading(false);
    };

    if (center?.lat && center?.lng) fetchPOIs();
  }, [center, preferences]);

  const toggleCategory = (category) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Zoom to fit markers (optional) */}
        <FitToBounds bounds={allMarkers} />

        <MarkerClusterGroup>
          {/* User marker */}
          {userLocation?.lat && userLocation?.lng && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={getUserIcon()}>
              <Popup>Your Live Location</Popup>
            </Marker>
          )}

          {/* POI markers */}
          {Object.entries(pois).flatMap(([label, places]) =>
            visibleCategories[label]
              ? places.map((poi, idx) => (
                  <Marker
                    key={`${label}-${idx}`}
                    position={[poi.geometry.coordinates[1], poi.geometry.coordinates[0]]}
                    icon={getIcon(label)}
                  >
                    <Popup>
                      <strong>{poi.properties.name || 'Unnamed'}</strong>
                      <br />
                      {poi.properties.address_line1 || ''}
                      <br />
                      {poi.properties.address_line2 || ''}
                    </Popup>
                  </Marker>
                ))
              : []
          )}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Legend */}
      <div className="absolute top-24 left-4 bg-white text-black rounded-lg shadow-lg p-3 z-[999] text-sm w-48">
        <button
          onClick={() => setLegendVisible(!legendVisible)}
          className="text-xs font-bold mb-1"
        >
          {legendVisible ? 'Hide Legend' : 'Show Legend'}
        </button>

        {legendVisible && (
          <ul className="space-y-1 max-h-[200px] overflow-y-auto">
            {allCategories.map((cat) => (
              <li key={cat}>
                <label className="cursor-pointer flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={visibleCategories[cat] ?? true}
                    onChange={() => toggleCategory(cat)}
                    className="mr-1"
                  />
                  <span>{iconMap[cat] || '📍'} {cat}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-[9999] flex items-center justify-center">
          <div className="text-white text-xl animate-pulse">Loading POIs...</div>
        </div>
      )}
    </>
  );
};

export default MapWithPOIs;
