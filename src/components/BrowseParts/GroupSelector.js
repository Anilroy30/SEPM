import React from "react";

const GroupSelector = ({ group, setGroup }) => (
  <div>
    <label className="text-white/90 font-medium">Who are you traveling with?</label>
    <select
      value={group}
      onChange={(e) => setGroup(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none text-black"
    >
      <option value="Solo">Solo 🣝‍</option>
      <option value="Couple">Couple 💑</option>
      <option value="Family">Family 👨‍👩‍👧</option>
      <option value="Friends">Friends 👫</option>
    </select>
  </div>
);

export default GroupSelector;