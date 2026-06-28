import { createContext, useEffect, useState } from "react";
import axios from "axios";

function UserStore({ children }) {
  const [userData, setUserData] = useState();
  const userContext = createContext();
  //get user for first time
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    //
  }, []);

  return <userContext.Provider value={{}}>{children}</userContext.Provider>;
}

export default UserStore;
