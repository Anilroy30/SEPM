import React from "react";
import { Mic, X } from "lucide-react"; // make sure lucide-react is installed

const MicButton = ({ isRecording, onClick }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Mic Button */}
      <button
        onClick={onClick}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isRecording
            ? "bg-blue-500 shadow-2xl scale-110"
            : "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-105"
        }`}
      >
        <Mic size={36} className="text-white z-10" />

        {/* Pulsing Dots */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-75 animate-ping" />
        )}
      </button>

      {/* Listening text */}
      {isRecording && (
        <p className="mt-2 text-red-500 font-medium animate-pulse">Listening...</p>
      )}

      {/* Close (X) Button */}
      {isRecording && (
        <button
          className="absolute top-[-8px] right-[-8px] w-6 h-6 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center text-xs shadow z-20"
          onClick={onClick}
          title="Stop Recording"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

export default MicButton;
