// src/components/Recommendations.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAIItinerary } from "../utils/geminiAPI";
import useUserLocation from "../utils/useUserLocation";
import useTripLocation from "../utils/useTripLocation";
import MapWithPOIs from "./MapWithPOIs";
import SignOut from "./Signout";

const Recommendations = () => {
  const navigate = useNavigate();
  const trip = useSelector((state) => state.trip);
  const { location, preferences, group, days, budget } = trip;
  const rawLocation = location?.label || location;

  const { location: userLocation, error: locationError } = useUserLocation();
  const mapCenter = useTripLocation(location, userLocation);

  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiError, setAIError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const result = await getAIItinerary({ location: rawLocation, preferences, group });
        setItinerary(result);
      } catch (err) {
        setAIError("Something went wrong generating itinerary.");
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [rawLocation, preferences, group]);

  const renderLocationText = () => {
    if (typeof rawLocation === "string") return rawLocation;
    if (userLocation?.lat && userLocation?.lng) {
      return `Lat: ${userLocation.lat}, Lng: ${userLocation.lng}`;
    }
    return "Not specified";
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {mapCenter && <MapWithPOIs center={mapCenter} preferences={preferences} />}
      </div>

      <div className="absolute top-6 right-6 z-20">
        <SignOut />
      </div>

      <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
        <div className="bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white rounded-xl shadow-xl p-8 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-70">
          <h2 className="text-3xl font-bold text-center mb-6">✨ Your AI-Generated Itinerary</h2>

          <div className="space-y-2 text-base md:text-lg">
            <p><strong>📍 Location:</strong> {renderLocationText()}</p>
            <p><strong>🗓 Trip Duration:</strong> {days} days</p>
            <p><strong>💰 Budget Type:</strong> {budget}</p>
            <p><strong>👥 Travel Group:</strong> {group}</p>
            <p><strong>🏕 Preferences:</strong> {preferences.join(", ") || "None"}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">📝 Itinerary:</h3>
            {loading ? (
              <p className="text-yellow-600 dark:text-yellow-400">Generating itinerary... ⏳</p>
            ) : aiError ? (
              <p className="text-red-500">{aiError}</p>
            ) : (
              <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {itinerary.map((item, index) => (
                  <li key={index} className="bg-white dark:bg-[#2c2c2c] p-4 rounded-lg shadow-md text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {locationError && (
        <div className="absolute bottom-4 left-4 z-20 text-sm text-red-400">
          ⚠️ {locationError}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
