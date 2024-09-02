/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const homeSlice = createSlice({
  name: "profileid",
  initialState: {
    flag: false,
  },
  reducers: {
    toggleFlag: (state, action) => {
      state.flag = !state.flag;
      console.log("HI");
    },
  },
});
export const { toggleFlag } = homeSlice.actions;
export default homeSlice.reducer;
