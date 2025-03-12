import { createSlice } from "@reduxjs/toolkit";

const initialState = null; // User should be null if not authenticated

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => action.payload, // Directly set user data
    removeUser: () => null, // Ensure logout resets to null
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
