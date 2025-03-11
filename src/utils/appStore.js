import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tripReducer from "./tripSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        trip: tripReducer, // New trip preferences store
    }
});

export default appStore;
