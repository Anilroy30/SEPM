import React from "react";

const LanguageSelectorSection = ({
  language,
  setLanguage,
  handleTranslate,
  showPrompt,
  languageList,
}) => (
  <div className="mb-4">
    <label className="block text-sm !font-bold !text-white mb-1">
      🌍 Translate To:
    </label>
    <div className="flex gap-2">
      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
        className="w-full p-2 border rounded-md shadow-sm bg-white text-black"
      >
        <option value="">-- Select Language --</option>
        {languageList.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <button
        onClick={handleTranslate}
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-md font-semibold shadow-md transition duration-300 active:scale-95"
      >
        🔁 Translate
      </button>
    </div>
    {showPrompt && (
      <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md border border-yellow-300 text-sm">
        ⚠️ Please select a language before translating.
      </div>
    )}
  </div>
);

export default LanguageSelectorSection;