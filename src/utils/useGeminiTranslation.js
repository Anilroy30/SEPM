import { useState } from "react";
import { translateWithGemini } from "./geminiTranslate";

export const useGeminiTranslation = () => {
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const translate = async (text, language) => {
    setLoading(true);
    const result = await translateWithGemini(text, language);
    setTranslated(result);
    setLoading(false);
  };

  return { translated, translate, loading, setTranslated };
};
