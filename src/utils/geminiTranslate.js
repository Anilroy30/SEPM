export const translateWithGemini = async (inputText, targetLanguage) => {
    const prompt = `
  You are a professional translator.
  
  Translate the following sentence into "${targetLanguage}".
  Return only the translated sentence without any explanation or formatting.
  
  "${inputText}"
  `;
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      console.log("🌐 Gemini Translate Response:", data);
  
      const translatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return translatedText?.trim() || "Translation failed.";
    } catch (error) {
      console.error("❌ Gemini translation error:", error);
      return "Translation failed.";
    }
  };
  