import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileid";
import homeReducer from "./Slices/homeSlice";
export const Store = configureStore({
  reducer: {
    profileReducer,
    homeReducer,
  },
});
export default Store;
