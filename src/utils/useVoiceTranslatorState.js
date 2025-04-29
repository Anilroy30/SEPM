import { useState } from "react";

const useVoiceTranslatorState = () => {
  const [language, setLanguage] = useState("");
  const [showLangSection, setShowLangSection] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  return {
    language,
    setLanguage,
    showLangSection,
    setShowLangSection,
    showPrompt,
    setShowPrompt,
  };
};

export default useVoiceTranslatorState;
