import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TripDurationSelector = ({
  startDate,
  endDate,
  days,
  setStartDate,
  setEndDate,
  setDays,
}) => {
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

  return (
    <div>
      <label className="text-white/90 font-medium">Trip Duration:</label>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            minDate={new Date()}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none text-black"
            placeholderText="Start Date"
          />
        </div>
        <div className="flex-1">
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            minDate={startDate || new Date()}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none text-black"
            placeholderText="End Date"
          />
        </div>
      </div>
      {days > 0 && (
        <p className="text-white-700 text-sm mt-2">🗖️ Selected Duration: {days} days</p>
      )}
    </div>
  );
};

export default TripDurationSelector;
