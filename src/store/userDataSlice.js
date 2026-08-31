import { createSlice } from "@reduxjs/toolkit";


import { io } from "socket.io-client";

const DEFAULT_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = DEFAULT_URL.replace(/\/api\/v1\/?$/, "");
const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 20,
});

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: null,
    socket,
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
