import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTripPreferences } from "../utils/tripSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import LocationAutocomplete from "./LocationAutocomplete";

const Browse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form State
    const [useGPS, setUseGPS] = useState(false);
    const [location, setLocation] = useState("");
    const [manualLocation, setManualLocation] = useState(false);
    const [manualLocationInput, setManualLocationInput] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("Standard");
    const [group, setGroup] = useState("Solo");
    const [preferences, setPreferences] = useState([]);
    const [customRequest, setCustomRequest] = useState("");

    // Preference options
    const preferenceOptions = [
        "Adventure 🏞️",
        "Relaxation 🏖️",
        "Culture & History 🏛️",
        "Nature & Wildlife 🌿",
        "Nightlife 🎉",
    ];

    // Toggle GPS Location
    const handleUseCurrentLocation = () => {
        setUseGPS(!useGPS);
        setManualLocation(false);

        if (!useGPS && navigator.geolocation) {
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

    // Toggle Manual Location
    const handleManualLocation = () => {
        setManualLocation(!manualLocation);
        setUseGPS(false);
    };

    // Handle Date Selection
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setEndDate(null);
        setDays("");
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate) {
            const dayDiff = Math.ceil((date - startDate) / (1000 * 60 * 60 * 24));
            setDays(dayDiff);
        }
    };

    // Handle Preference Selection
    const handlePreferenceChange = (event) => {
        const value = event.target.value;
        setPreferences((prev) =>
            prev.includes(value) ? prev.filter((pref) => pref !== value) : [...prev, value]
        );
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const finalLocation = useGPS ? location : manualLocationInput;
        const tripData = { location: finalLocation, startDate, endDate, days, budget, group, preferences, customRequest };
        dispatch(setTripPreferences(tripData));
        navigate("/recommendations");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🌍 Plan Your Trip</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Location Selection */}
                    
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">Select Location:</label>
                      
                      <div className="flex space-x-2">
                          <button 
                              type="button" 
                              onClick={handleUseCurrentLocation}
                              className={`px-4 py-2 rounded-lg text-white transition-all ${
                                  useGPS ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                              }`}
                          >
                              📍 Use My Current Location
                          </button>
                          <button 
                              type="button" 
                              onClick={handleManualLocation}
                              className={`px-4 py-2 rounded-lg transition-all text-white ${
                                  manualLocation ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 hover:bg-gray-600"
                              }`}
                          >
                              🔎 Enter Location Manually
                          </button>
                      </div>

                      {/* Smooth Toggle Effect */}
                      <div className={`transition-all duration-300 ease-in-out mt-4 ${useGPS || manualLocation ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}>
                          {/* {useGPS ? (
                              <input
                                  type="text"
                                  value={location}
                                  readOnly
                                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 cursor-not-allowed shadow-md"
                              />
                          ) : (
                              <LocationAutocomplete onSelect={(location) => setManualLocationInput(location)} />
                          )} */}


                                <input
                                  type="text"
                                  value={location}
                                  readOnly
                                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 cursor-not-allowed shadow-md"
                              />
                      </div>
                    </div>

                    {/* Trip Duration with Separate Start & End Date Inputs */}
                    <div>
                        <label className="block text-gray-600">Trip Duration:</label>
                        <div className="flex items-center space-x-4">
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                minDate={new Date()} 
                                className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                                placeholderText="Start Date"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                minDate={startDate || new Date()} 
                                className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                                placeholderText="End Date"
                            />
                        </div>
                        {days > 0 && (
                            <p className="text-gray-700 text-sm mt-2">📆 Selected Duration: {days} days</p>
                        )}
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-gray-600">Budget Type:</label>
                        <select 
                            value={budget} 
                            onChange={(e) => setBudget(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        >
                            <option value="Luxury">Luxury 💎</option>
                            <option value="Standard">Standard 🏨</option>
                            <option value="Budget">Budget 💰</option>
                        </select>
                    </div>

                    {/* Travel Group */}
                    <div>
                        <label className="block text-gray-600">Who are you traveling with?</label>
                        <select 
                            value={group} 
                            onChange={(e) => setGroup(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        >
                            <option value="Solo">Solo 🧑‍🎒</option>
                            <option value="Couple">Couple 💑</option>
                            <option value="Family">Family 👨‍👩‍👧‍👦</option>
                            <option value="Friends">Friends 👫</option>
                        </select>
                    </div>

                    {/* Preferences Checkboxes */}
                    <div>
                      <label className="block text-gray-600">Additional Preferences:</label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                          {["Adventure", "Relaxation", "Food", "Culture"].map((pref) => (
                              <label key={pref} className="flex items-center space-x-2">
                                  <input
                                      type="checkbox"
                                      value={pref}
                                      onChange={(e) => {
                                          if (e.target.checked) {
                                              setPreferences([...preferences, e.target.value]);
                                          } else {
                                              setPreferences(preferences.filter((p) => p !== e.target.value));
                                          }
                                      }}
                                      className="h-5 w-5 text-blue-500"
                                  />
                                    <span>{pref}</span>
                              </label>
                          ))}
                      </div>
                    </div>

                    {/* Additional Preferences Input */}
                    <div>
                      <label className="block text-gray-600">Other Requests:</label>
                      <textarea
                          value={customRequest}
                          onChange={(e) => setCustomRequest(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                          placeholder="Special requirements..."
                      />
                    </div>

                    {/* Submit Button */}

                    <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        ✈️ Find My Trip
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Browse;
