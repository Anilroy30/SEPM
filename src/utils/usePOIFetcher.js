// src/hooks/usePOIFetcher.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getDistanceKm } from '../components/MapUtils';

const usePOIFetcher = (center, preferences, userLocation, categoryMap) => {
  const [pois, setPOIs] = useState({});
  const [allMarkers, setAllMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [...new Set(['Hotel', 'Restaurant', ...preferences])];

  useEffect(() => {
    const fetchPOIs = async () => {
      const newPOIs = {};
      const markers = [];

      for (const label of categories) {
        const category = categoryMap[label];
        if (!category) continue;

        const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${center.lng},${center.lat},3000&limit=10&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`;
        try {
          const res = await axios.get(url);
          newPOIs[label] = res.data.features || [];
          markers.push(...(res.data.features || []).map(poi => [
            poi.geometry.coordinates[1],
            poi.geometry.coordinates[0]
          ]));
        } catch {
          newPOIs[label] = [];
        }
      }

      if (userLocation?.lat && userLocation?.lng) {
        const distance = getDistanceKm(center, userLocation);
        if (distance < 1000) {
          markers.push([userLocation.lat, userLocation.lng]);
        }
      }

      setPOIs(newPOIs);
      setAllMarkers(markers);
      setLoading(false);
    };

    if (center?.lat && center?.lng) {
      setLoading(true);
      fetchPOIs();
    }
  }, [center, preferences]);

  return { pois, allMarkers, loading, categories };
};

export default usePOIFetcher;
