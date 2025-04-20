import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAIItinerary } from "../utils/geminiAPI";
import GoogleMap from "./GoogleMap";
import useUserLocation from "../utils/useUserLocation";

const Recommendations = () => {
  const tripData = useSelector((state) => state.trip);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiError, setAIError] = useState(null);
  const { location: userLocation, error: locationError } = useUserLocation();

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const result = await getAIItinerary(tripData);
        setItinerary(result);
      } catch (err) {
        setAIError("Something went wrong generating itinerary.");
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [tripData]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-[#0f0f0f] dark:to-[#181818]">
      <div className="w-full flex justify-center mb-8">
        <div className="bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">✨ Your AI-Generated Itinerary</h2>

          <div className="space-y-2 text-base md:text-lg">
            <p><strong>📍 Location:</strong> {tripData.location}</p>
            <p><strong>🗓 Trip Duration:</strong> {tripData.days} days</p>
            <p><strong>💰 Budget Type:</strong> {tripData.budget}</p>
            <p><strong>👥 Travel Group:</strong> {tripData.group}</p>
            <p><strong>🏕 Preferences:</strong> {tripData.preferences.join(", ") || "None"}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">📝 Itinerary:</h3>
            {loading ? (
              <p className="text-yellow-600 dark:text-yellow-400">Generating itinerary... ⏳</p>
            ) : aiError ? (
              <p className="text-red-500">{aiError}</p>
            ) : (
              <ul className="space-y-4">
                {itinerary.map((item, index) => (
                  <li
                    key={index}
                    className="bg-white dark:bg-[#2c2c2c] p-4 rounded-lg shadow-md text-gray-800 dark:text-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <GoogleMap tripData={tripData} itinerary={itinerary} userLocation={userLocation} />

      {locationError && (
        <p className="text-sm text-red-400 mt-4">⚠️ {locationError}</p>
      )}
    </div>
  );
};

export default Recommendations;
