import { createContext, useState } from "react";
//socket
import { io } from "socket.io-client";
import { DEFAULT_URL } from "../constants";
const SOCKET_URL = DEFAULT_URL.replace(/\/api\/v1\/?$/, "");
const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 20,
});

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

function UserStore({ children }) {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData, socket }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserStore;
