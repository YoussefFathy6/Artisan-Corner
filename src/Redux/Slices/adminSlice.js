/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    loginAdmin: (state, action) => {
      state.isAdmin = true;
    },
    logoutAdmin: (state, action) => {
      state.isAdmin = false;
    },
  },
});
export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
