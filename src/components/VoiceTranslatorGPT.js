// VoiceTranslatorGPT.js (Final Functional with Mic Working)
import React, { useState } from "react";
import { useSpeechRecognition } from "../utils/useSpeechRecognition";
import { useGeminiTranslation } from "../utils/useGeminiTranslation";
import MicButton from "./MicButton";
import TranscriptSection from "./VoiceTranslatorParts/TranscriptSection";
import LanguageSelectorSection from "./VoiceTranslatorParts/LanguageSelectorSection";
import TranslatedOutputSection from "./VoiceTranslatorParts/TranslatedOutputSection";

const VoiceTranslatorGPT = ({ onTranslated }) => {
  const {
    isRecording,
    transcript,
    toggleRecording,
    setTranscript,
  } = useSpeechRecognition();

  const {
    translated,
    translate,
    loading,
    setTranslated,
  } = useGeminiTranslation();

  const [language, setLanguage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const languageList = [
    "Arabic", "Bengali", "Chinese", "Dutch", "English", "French", "German", "Greek", "Gujarati", "Hindi",
    "Italian", "Japanese", "Kannada", "Korean", "Malayalam", "Marathi", "Persian", "Portuguese", "Punjabi",
    "Russian", "Spanish", "Tamil", "Telugu", "Thai", "Turkish", "Urdu", "Vietnamese"
  ].sort();

  const handleMic = () => {
    setTranslated("");
    setTranscript("");
    setLanguage("");
    setShowPrompt(false);
    toggleRecording();
  };

  const handleTranslate = () => {
    if (!language) {
      setShowPrompt(true);
      return;
    }
    setShowPrompt(false);
    translate(transcript, language);
  };

  const handleAddToRight = () => {
    if (onTranslated) onTranslated(translated);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl p-6 w-full text-white transition-all duration-300">
      <h2 className="text-xl font-extrabold text-center mb-6 text-white drop-shadow tracking-wide">
        🎙️ Smart Voice Translation
      </h2>

      <div className="mb-6">
        <MicButton isRecording={isRecording} onClick={handleMic} />
      </div>

      <TranscriptSection transcript={transcript} />

      {transcript && (
        <LanguageSelectorSection
          language={language}
          setLanguage={setLanguage}
          handleTranslate={handleTranslate}
          showPrompt={showPrompt}
          languageList={languageList}
        />
      )}

      <TranslatedOutputSection
        translated={translated}
        handleAddToRight={handleAddToRight}
      />
    </div>
  );
};

export default VoiceTranslatorGPT;
