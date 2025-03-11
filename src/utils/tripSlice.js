import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "",
    days: "",
    budget: "Standard",
    group: "Solo",
    preferences: [],
    customRequest: ""
};

const tripSlice = createSlice({
    name: "trip",
    initialState,
    reducers: {
        setTripPreferences: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setTripPreferences } = tripSlice.actions;
export default tripSlice.reducer;
