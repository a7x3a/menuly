import React, { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();
const ThemeContextProvider = (props) => {
  const [lang, setLang] = useState(() => {
    //AR EN KR
    //Only Handle Pressing the Languages
    const savedLang = localStorage.getItem("lang");
    return savedLang ? JSON.parse(savedLang) : "en";//Deafult English
  });
  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang));
  }, [lang]);
  const setLanguage = (language) => {
    localStorage.setItem("lang", JSON.stringify(language));
    setLang(lang);
  };
  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default ThemeContextProvider;
