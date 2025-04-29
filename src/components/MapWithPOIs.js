import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import useUserLocation from '../utils/useUserLocation';
import usePOIFetcher from '../utils/usePOIFetcher';
import {
  categoryMap,
  iconMap,
  getIcon,
  getUserIcon,
  FitToBounds,
} from './MapUtils';

import 'leaflet/dist/leaflet.css';

const MapWithPOIs = ({ center, preferences = [] }) => {
  const { location: userLocation } = useUserLocation();
  const {
    pois,
    allMarkers,
    loading,
    categories: allCategories,
  } = usePOIFetcher(center, preferences, userLocation, categoryMap);

  const [legendVisible, setLegendVisible] = useState(true);
  const [visibleCategories, setVisibleCategories] = useState({});

  useEffect(() => {
    setVisibleCategories(
      Object.fromEntries(allCategories.map((cat) => [cat, true]))
    );
  }, [allCategories]);

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

        <FitToBounds bounds={allMarkers} />

        <MarkerClusterGroup>
          {userLocation?.lat && userLocation?.lng && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={getUserIcon()}>
              <Popup>Your Live Location</Popup>
            </Marker>
          )}

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

      {/* Legend Box */}
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

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-[9999] flex items-center justify-center">
          <div className="text-white text-xl animate-pulse">Loading POIs...</div>
        </div>
      )}
    </>
  );
};

export default MapWithPOIs;
