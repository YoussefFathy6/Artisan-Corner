import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileid";
import homeReducer from "./Slices/homeSlice";
import adminReducer from "./Slices/adminSlice";
export const Store = configureStore({
  reducer: {
    profileReducer,
    homeReducer,
    adminReducer,
  },
});
export default Store;
