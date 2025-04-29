import React from "react";

const PreferencesSelector = ({ preferences, setPreferences }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setPreferences((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const preferenceList = [
    "Adventure",
    "Relaxation",
    "Food",
    "Culture",
    "Nature",
    "Nightlife",
  ];

  return (
    <div>
      <label className="text-white/90 font-medium">Additional Preferences:</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
        {preferenceList.map((pref) => (
          <label
            key={pref}
            className="w-[120px] h-[45px] bg-white text-black rounded-md px-3 py-2 flex items-center gap-2 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <input
              type="checkbox"
              value={pref}
              onChange={handleChange}
              checked={preferences.includes(pref)}
              className="h-4 w-4 accent-blue-500"
            />
            <span className="text-sm font-medium">{pref}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PreferencesSelector;
