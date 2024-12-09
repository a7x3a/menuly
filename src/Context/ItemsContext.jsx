import React, { createContext, useState } from "react";
export const ItemsContext = createContext();
export const ItemsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  return (
    <ItemsContext.Provider value={{ data, setData }}>
      {children}
    </ItemsContext.Provider>
  );
};
