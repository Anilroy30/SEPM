import React from "react";

const TranslatedOutputSection = ({ translated, handleAddToRight }) =>
  translated ? (
    <div className="mt-4 w-full transition-all duration-300">
      <p className="text-sm !font-bold !text-white mb-1">🌐 Translated:</p>
      <div className="p-3 bg-green-100 text-black rounded-md border text-sm">
        {translated}
      </div>
      <button
        onClick={handleAddToRight}
        className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-md shadow-md font-semibold transition duration-300 active:scale-95"
      >
        ➕ Add to Other Requests
      </button>
    </div>
  ) : null;

export default TranslatedOutputSection;