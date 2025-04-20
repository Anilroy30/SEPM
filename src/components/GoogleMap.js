import React, { useEffect, useRef, useState } from "react";

const GoogleMap = ({ tripData, itinerary, userLocation }) => {
  const mapRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("googleMaps");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.id = "googleMaps";
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded || !window.google || !tripData?.location) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: userLocation || { lat: 20.5937, lng: 78.9629 },
    });

    const geocoder = new window.google.maps.Geocoder();

    // Marker style
    const defaultIcon = {
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: new window.google.maps.Size(40, 40),
    };

    const liveIcon = {
      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      scaledSize: new window.google.maps.Size(40, 40),
    };

    // Show manual location
    geocoder.geocode({ address: tripData.location }, (results, status) => {
      if (status === "OK" && results[0]) {
        map.setCenter(results[0].geometry.location);
        new window.google.maps.Marker({
          position: results[0].geometry.location,
          map,
          title: "📍 Destination: " + tripData.location,
          icon: defaultIcon,
        });
      }
    });

    // Show itinerary locations
    itinerary?.forEach((day) => {
      const place = day.split(":")[1]?.trim();
      if (place) {
        geocoder.geocode({ address: `${place}, ${tripData.location}` }, (results, status) => {
          if (status === "OK" && results[0]) {
            new window.google.maps.Marker({
              position: results[0].geometry.location,
              map,
              title: place,
              icon: defaultIcon,
            });
          }
        });
      }
    });

    // Show live location
    if (userLocation) {
      new window.google.maps.Marker({
        position: userLocation,
        map,
        title: "🧍 Your Current Location",
        icon: liveIcon,
      });
    }
  }, [loaded, tripData, itinerary, userLocation]);

  return (
    <div className="w-full h-[500px] mt-10">
      <div ref={mapRef} className="w-full h-full rounded-xl shadow-md overflow-hidden" />
    </div>
  );
};

export default GoogleMap;
