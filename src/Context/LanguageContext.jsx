import React, { createContext, useEffect, useState } from "react";

// 1. Create LanguageContext
export const LanguageContext = createContext();

// 2. Rename the provider component to avoid naming conflict
const LanguageContextProvider = (props) => {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("lang");
    return savedLang ? JSON.parse(savedLang) : "en"; // Default to English
  });

  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang));
  }, [lang]);

  const setLanguage = (language) => {
    setLang(language); // Update the state with the new language
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

// 3. Export the provider component
export default LanguageContextProvider;
