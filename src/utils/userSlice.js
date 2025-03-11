import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
    },
    reducers: {
        addUser: (state, action) => {
            return { ...action.payload };
        },
        removeUser: () => {
            return { uid: null, email: null, displayName: null, photoURL: null };
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;