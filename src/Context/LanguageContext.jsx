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

  const [loader, setLoader] = useState();

  const setLanguage = (language) => {
    setLoader(true);
    setLang(language); // Update the state with the new language
    setTimeout(() => {
      setLoader(false); // Stop loader after 3 seconds
    }, 1500);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, loader, setLoader }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

// 3. Export the provider component
export default LanguageContextProvider;
