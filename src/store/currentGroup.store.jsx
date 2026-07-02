import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const selectedGroupContext = createContext();

function SelectedGroup({ children }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <selectedGroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </selectedGroupContext.Provider>
  );
}

export default SelectedGroup;
