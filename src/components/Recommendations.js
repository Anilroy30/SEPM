import React from "react";
import { useSelector } from "react-redux";

const Recommendations = () => {
    const tripData = useSelector((state) => state.trip);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    ✨ Your Recommended Trip Plan
                </h2>

                {/* Trip Summary */}
                <div className="space-y-4">
                    <p className="text-lg"><strong>📍 Location:</strong> {tripData.location}</p>
                    <p className="text-lg"><strong>🗓 Trip Duration:</strong> {tripData.days} days</p>
                    <p className="text-lg"><strong>💰 Budget Type:</strong> {tripData.budget}</p>
                    <p className="text-lg"><strong>👥 Travel Group:</strong> {tripData.group}</p>
                    <p className="text-lg"><strong>🏕 Preferences:</strong> {tripData.preferences.join(", ") || "None"}</p>
                    <p className="text-lg"><strong>📝 Other Requests:</strong> {tripData.customRequest || "None"}</p>
                </div>

                {/* Call to Action */}
                <div className="mt-6 text-center">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        🔍 Explore Destinations
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
