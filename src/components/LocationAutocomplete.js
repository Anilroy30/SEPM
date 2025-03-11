import React, { useState, useEffect } from "react";

const LocationAutocomplete = ({ onSelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (query.length > 2) {
            const fetchPlaces = async () => {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=YOUR_GOOGLE_MAPS_API_KEY`
                );
                const data = await response.json();
                if (data.predictions) {
                    setSuggestions(data.predictions);
                }
            };
            fetchPlaces();
        } else {
            setSuggestions([]);
        }
    }, [query]);

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Enter city or destination"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                    {suggestions.map((place) => (
                        <li
                            key={place.place_id}
                            onMouseDown={() => onSelect(place.description)}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                        >
                            {place.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationAutocomplete;
