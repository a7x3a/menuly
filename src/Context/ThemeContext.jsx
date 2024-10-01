import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
const ThemeContextProvider = (props) => {
   const [theme, setTheme] = useState(() => {
     const savedTheme = localStorage.getItem("theme");
     return savedTheme ? JSON.parse(savedTheme) : "light";
   });
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  const toggleTheme = () => {
    const updatedTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", JSON.stringify(updatedTheme));
    setTheme(updatedTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme  ,  toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
