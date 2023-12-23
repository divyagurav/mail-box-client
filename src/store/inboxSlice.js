import { createSlice } from "@reduxjs/toolkit";

const initialInboxState = {
  messages: [],
  read: localStorage.getItem("read") === "true",
};
const inboxSlice = createSlice({
  name: "inbox",
  initialState: initialInboxState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    setRead: (state) => {
      state.read = false;
      localStorage.setItem("read", false);
    },
    setUnread: (state) => {
      state.read = true;
      localStorage.setItem("read", true);
    },
    reciveMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice;
