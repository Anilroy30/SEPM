import React from "react";

const TranscriptSection = ({ transcript }) =>
  transcript ? (
    <div className="mt-2 w-full">
      <p className="text-sm font-bold text-white mb-1">🎧 Original:</p>
      <div className="p-3 bg-white/70 text-black rounded-md mb-4 border text-sm">
        {transcript}
      </div>
    </div>
  ) : null;

export default TranscriptSection;
