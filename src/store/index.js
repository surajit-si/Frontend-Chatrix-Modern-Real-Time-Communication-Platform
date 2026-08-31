import { configureStore } from "@reduxjs/toolkit";
import currentGroupSlice from "./currentGroupSlice.js";
import userDataSlice from "./userDataSlice.js";

const store = configureStore({
  reducer: {
    currGroup: currentGroupSlice,
    userData: userDataSlice,
  },
});

export default store;
