import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTripPreferences } from "../utils/tripSlice";
import VoiceTranslatorGPT from "./VoiceTranslatorGPT";
import LocationSelector from "./BrowseParts/LocationSelector";
import TripDurationSelector from "./BrowseParts/TripDurationSelector";
import BudgetSelector from "./BrowseParts/BudgetSelector";
import GroupSelector from "./BrowseParts/GroupSelector";
import PreferencesSelector from "./BrowseParts/PreferencesSelector";
import OtherRequestsInput from "./BrowseParts/OtherRequestsInput";
import SubmitButton from "./BrowseParts/SubmitButton";

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalLocation = manualLocationInput;
if (useGPS && location.includes("Lat:") && location.includes("Lng:")) {
  const match = location.match(/Lat: ([0-9.-]+), Lng: ([0-9.-]+)/);
  if (match) {
    finalLocation = { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }
}

    const tripData = {
      location: finalLocation,
      startDate,
      endDate,
      days,
      budget,
      group,
      preferences,
      customRequest,
    };
    dispatch(setTripPreferences(tripData));
    navigate("/recommendations");
  };

  const handleTranslatedAddition = (translatedText) => {
    if (!translatedText) return;
    setCustomRequest((prev) =>
      prev.trim() ? prev.trim() + "\n" + translatedText.trim() : translatedText.trim()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-20 overflow-x-hidden">
      {/* Voice Translator Card */}
      <div className="w-full md:w-1/2 max-w-md animate-fadeInUp">
        <VoiceTranslatorGPT onTranslated={handleTranslatedAddition} />
      </div>

      {/* Plan Trip Card */}
      <div className="w-full md:w-1/2 max-w-md animate-fadeInUp bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold text-center text-white drop-shadow mb-6">
          🌍 Plan Your Trip
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <LocationSelector {...{ useGPS, setUseGPS, manualLocation, setManualLocation, location, setLocation, manualLocationInput, setManualLocationInput }} />
          <TripDurationSelector {...{ startDate, endDate, days, setStartDate, setEndDate, setDays }} />
          <BudgetSelector {...{ budget, setBudget }} />
          <GroupSelector {...{ group, setGroup }} />
          <PreferencesSelector {...{ preferences, setPreferences }} />
          <OtherRequestsInput {...{ customRequest, setCustomRequest }} />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default Browse;
