// src/components/MapUtils.js
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// POI Categories
export const categoryMap = {
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

// Emoji Icons
export const iconMap = {
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

// POI Icon
export const getIcon = (label) =>
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

// 🧍 User Marker Icon
export const getUserIcon = () =>
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

// Haversine Distance
export const getDistanceKm = (loc1, loc2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// Zoom to bounds helper
export const FitToBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
};
