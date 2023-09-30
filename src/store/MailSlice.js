import { createSlice } from "@reduxjs/toolkit";
const initialval = {
  sendMail: false,
  getMail: false,
  items: [],
  count: 0,
  unread: 0,
};

const MailSlice = createSlice({
  name: "mail",
  initialState: initialval,
  reducers: {
    setSentData(state, action) {
      state.sendMail = !state.sendMail;
      state.count = state.count + 1;
      console.log("success");
    },
    setGetMail(state, action) {
      console.log("getmail", state.unread);
    },
    addItem(state, action) {
      state.items = action.payload;
      let Unreadmessage = 0;
      state.items.map((item) => {
        if (!item.readreceipt === true) {
          Unreadmessage++;
        }
        return item;
      });
      state.unread = Unreadmessage;
      console.log(state.unread);
    },
    updataItems(state, action) {
      state.count = state.count + 1;
      // const newItem = action.payload;
      // const exisitingItem = state.items.find((item) => item.id === newItem.id);
      // if (!exisitingItem.readreceipt) {
      //   exisitingItem.readreceipt = true;
      //   state.count = state.count + 1;
      // }
    },
    DeleteItem(state, action) {
      state.count = state.count + 1;
      console.log("deleted");
    },
  },
});
export const MailSliceAction = MailSlice.actions;
export default MailSlice;