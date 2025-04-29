import React from "react";

const OtherRequestsInput = ({ customRequest, setCustomRequest }) => (
  <div>
    <label className="text-white/90 font-medium">Other Requests:</label>
    <textarea
      value={customRequest}
      onChange={(e) => setCustomRequest(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none text-black"
      placeholder="Special requirements..."
    />
  </div>
);

export default OtherRequestsInput;
