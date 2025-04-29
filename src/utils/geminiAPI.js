export const getAIItinerary = async (tripData) => {
  try {
    const locationText =
      tripData.location?.label || tripData.location || "a popular destination";
    const groupType = tripData.group || "traveler";
    const preferencesText =
      tripData.preferences?.join(", ") || "general sightseeing";
    const budgetText = tripData.budget?.toLowerCase() || "standard";

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
You are a professional AI travel planner.

Generate a ${tripData.days}-day itinerary for a trip to **${locationText}** based on the user's preferences.

**User Info:**
- Group: ${groupType}
- Preferences: ${preferencesText}
- Budget: ${budgetText}

Each day should follow this clean markdown structure with line breaks between each section:

**Day X**

**Morning:**  
(Morning activity details here. Be specific, include food spots or experiences.)

**Afternoon:**  
(Afternoon visit ideas, historical places, lunch ideas.)

**Evening:**  
(Evening events, food, or relaxation plans.)

**Recommended Hotel:**  
(1 hotel name or area recommendation)

**Nearby Restaurants:**  
(1–2 restaurant names with cuisine type)

**Nearby Attractions:**  
(1–2 major places to visit in ${locationText})

**Local Tips:**  
(Tips about clothing, safety, weather, or transport)

Use **double new lines** between each section. Format the response in **markdown** so it renders with proper spacing on websites. Keep it helpful, readable, and personalized.
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
    return (
      generatedText?.split("\n\n").filter(Boolean) || [
        "No itinerary generated.",
      ]
    );
  } catch (error) {
    console.error("❌ Error fetching AI itinerary:", error);
    return ["Error generating itinerary. Try again later."];
  }
};
