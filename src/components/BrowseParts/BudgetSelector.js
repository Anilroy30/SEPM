import React from "react";

const BudgetSelector = ({ budget, setBudget }) => (
  <div>
    <label className="text-white/90 font-medium">Budget Type:</label>
    <select
      value={budget}
      onChange={(e) => setBudget(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none text-black"
    >
      <option value="Luxury">Luxury 💷</option>
      <option value="Standard">Standard 🏨</option>
      <option value="Budget">Budget 💰</option>
    </select>
  </div>
);

export default BudgetSelector;