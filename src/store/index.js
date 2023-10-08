import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth";
import inboxReducer from "./inboxSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    inbox: inboxReducer,
  },
});

export default store;
