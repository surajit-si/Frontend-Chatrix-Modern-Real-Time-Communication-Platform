import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: null,
    conversationMessages: {},
  },
  reducers: {
    setUserData: (state, action) => {
      return {
        ...state,
        userData: action.payload,
      };
    },
    setConversationMessages: (state, action) => {
      return {
        ...state,
        conversationMessages: action.payload,
      };
    },
    setWithPrevConversationMessages: (state, action) => {
      return {
        ...state,
        conversationMessages: {
          ...state.conversationMessages,
          ...action.payload,
        },
      };
    },

    addNewMessages: (state, action) => {
      const { conversationId, newMessage } = action.payload;
      return {
        ...state,
        conversationMessages: {
          ...state.conversationMessages,
          [conversationId]: [
            ...(state.conversationMessages[conversationId] || []),
            newMessage,
          ],
        },
      };
    },
  },
});

export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;
