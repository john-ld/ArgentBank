import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initializeAuth } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
store.dispatch(initializeAuth());
export default store;
