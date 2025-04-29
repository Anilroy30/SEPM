// src/hooks/useDistance.js
const toRad = (deg) => (deg * Math.PI) / 180;

const useDistance = () => {
  const getDistanceKm = (loc1, loc2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.lat)) *
        Math.cos(toRad(loc2.lat)) *
        Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  return { getDistanceKm };
};

export default useDistance;
