import { createContext, useContext, useState } from "react";

const SocketContext = createContext(null);

import { io } from "socket.io-client";
import { DEFAULT_URL } from "../constants.js";
const SOCKET_URL = DEFAULT_URL.replace(/\/api\/v1\/?$/, "");
const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 20,
});

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);
