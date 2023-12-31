import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import inboxSlice from "./inboxSlice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, inbox: inboxSlice.reducer },
});

export default store;
