import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-reducer";

const store = configureStore({
  reducer: authSlice.reducer,
});

export default store;
