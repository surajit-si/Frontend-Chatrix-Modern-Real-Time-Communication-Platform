import { configureStore } from "@reduxjs/toolkit";
import currentGroupSlice from "./currentGroupSlice";

const store = configureStore({
  reducer: {
    currGroup: currentGroupSlice,
  },
});

export default store;
