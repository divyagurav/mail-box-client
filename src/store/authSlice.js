import { createSlice } from "@reduxjs/toolkit";

const intitialAuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};
const authSlice = createSlice({
  name: "auth",
  initialState: intitialAuthState,

  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", false);
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
