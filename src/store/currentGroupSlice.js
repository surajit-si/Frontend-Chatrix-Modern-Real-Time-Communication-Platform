import { createSlice } from "@reduxjs/toolkit";

const currentGroupSlice = createSlice({
  name: "currentGroup",
  initialState: null,
  reducers: {
    setCurrGroup: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
  },
});

export const currGroupActions = currentGroupSlice.actions;
export default currentGroupSlice;
