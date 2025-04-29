import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZ2VvZ2VuaXVzIiwiYSI6ImNsam53dGJjOTAzOWwzcG82bzN2bm5qOGoifQ.tCFOybsXyJry-SbgKi0OAA";
 // replace with your own token if needed

const MapWithPOIs = ({ center, preferences }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!center?.lat || !center?.lng || !mapContainer.current) return;

    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: 14,
    });

    // Add navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Fetch POIs from Overpass
    const categories = [];

    if (preferences.includes("Food")) categories.push('node["amenity"="restaurant"]');
    if (preferences.includes("Nature") || preferences.includes("Adventure") || preferences.includes("Relaxation")) categories.push('node["leisure"="park"]');
    if (preferences.includes("Culture")) categories.push('node["tourism"="museum"]');
    if (preferences.includes("Nightlife")) categories.push('node["amenity"="nightclub"]');
    categories.push('node["tourism"="hotel"]'); // Always show hotels

    const overpassQuery = `
      [out:json];
      (
        ${categories.map(q => `${q}(around:1500,${center.lat},${center.lng});`).join("\n")}
      );
      out body;
    `;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
    })
      .then(res => res.json())
      .then(data => {
        console.log("📦 Fetched POIs from Overpass:", data?.elements); // 🔍 Log here
      
        if (!data?.elements || data.elements.length === 0) {
          console.warn("⚠️ No POIs returned by Overpass.");
        }
      
        data?.elements?.forEach((place) => {
          new mapboxgl.Marker()
            .setLngLat([place.lon, place.lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <strong>${place.tags.name || "Unnamed Place"}</strong><br/>
                <em>${place.tags.tourism || place.tags.amenity || place.tags.leisure || "POI"}</em>
              `)
            )
            .addTo(mapRef.current);
        });
      });      

    return () => mapRef.current?.remove();
  }, [center, preferences]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapWithPOIs;
