export const getAIItinerary = async (tripData) => {
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
                parts: [
                  {
                    text: `
  You are a helpful travel planner AI.
  
  Generate a detailed ${tripData.days}-day itinerary for a trip to ${tripData.location}.
  The user is traveling as a ${tripData.group}, prefers ${tripData.preferences.join(", ") || "general sightseeing"} activities, and has a ${tripData.budget.toLowerCase()} budget.
  
  Each day should include:
  1. Morning plan
  2. Afternoon plan
  3. Evening recommendation (sightseeing, food, culture)
  4. Hotel/area suggestion for stay
  5. Any safety or local tips
  
  Format your response as:
  Day 1:
  - Morning: ...
  - Afternoon: ...
  - Evening: ...
  - Stay: ...
  - Tips: ...
  
  Continue like this for each day.
                    `,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
  
      console.log("🧠 Gemini Response:", data);
  
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
      return generatedText?.split("\n\n").filter(Boolean) || [
        "No itinerary generated.",
      ];
    } catch (error) {
      console.error("❌ Error fetching AI itinerary:", error);
      return ["Error generating itinerary. Try again later."];
    }
  };
  