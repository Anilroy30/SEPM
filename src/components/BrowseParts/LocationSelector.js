import React from "react";

const LocationSelector = ({
  useGPS,
  setUseGPS,
  manualLocation,
  setManualLocation,
  location,
  setLocation,
  manualLocationInput,
  setManualLocationInput,
}) => {
  const handleUseCurrentLocation = () => {
    setUseGPS(true);
    setManualLocation(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
        },
        () => {
          setLocation("Location access denied ❌");
          setUseGPS(false);
        }
      );
    }
  };

  const handleManualLocation = () => {
    setManualLocation(true);
    setUseGPS(false);
    setLocation("");
  };

  return (
    <div>
      <label className="text-white/90 font-medium mb-2">Select Location:</label>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className={`flex-1 min-w-[160px] px-4 py-3 rounded-lg text-white text-sm transition-all ${
            useGPS ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          📍 Use My Current Location
        </button>
        <button
          type="button"
          onClick={handleManualLocation}
          className={`flex-1 min-w-[160px] px-4 py-3 rounded-lg text-white text-sm transition-all ${
            manualLocation ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          🔎 Enter Location Manually
        </button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out mt-4 ${
          useGPS || manualLocation ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        {useGPS ? (
          <input
            type="text"
            value={location}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-200 cursor-not-allowed shadow-md text-black"
          />
        ) : (
          <input
            type="text"
            value={manualLocationInput}
            onChange={(e) => setManualLocationInput(e.target.value)}
            placeholder="Enter a city, country, or place..."
            className="w-full px-3 py-2 border rounded-lg shadow-md text-black"
          />
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
