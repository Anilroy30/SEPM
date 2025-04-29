// src/hooks/useTripLocation.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useTripLocation = (tripLocation, userLocation) => {
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const loc = tripLocation?.label || tripLocation;

      // If coordinates like "Lat: ..., Lng: ..."
      if (typeof loc === 'string' && loc.startsWith('Lat:')) {
        const parts = loc.match(/Lat:\s*(-?\d+\.?\d*),\s*Lng:\s*(-?\d+\.?\d*)/);
        if (parts) {
          const [, lat, lng] = parts;
          setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
          return;
        }
      }

      // Use Geoapify for geocoding
      if (typeof loc === 'string' && loc.trim()) {
        try {
          const res = await axios.get(
            `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(loc)}&limit=1&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
          );
          const coords = res?.data?.features?.[0]?.geometry?.coordinates;
          if (coords) {
            setMapCenter({ lat: coords[1], lng: coords[0] });
            return;
          }
        } catch (err) {
          console.error('Geoapify failed:', err);
        }
      }

      // Fallback to live location or default
      if (userLocation?.lat && userLocation?.lng) {
        setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
      } else {
        setMapCenter({ lat: 12.812423, lng: 80.0423041 });
      }
    };

    fetchCoordinates();
  }, [tripLocation, userLocation]);

  return mapCenter;
};

export default useTripLocation;
