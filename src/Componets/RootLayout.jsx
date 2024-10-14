import React from "react";
import Navbar from "./Navbar";
import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import LanguageSeterLoader from "./LanguageSeterLoader";
const RootLayout = ({ children }) => {
  const {loader} = useContext(LanguageContext)
  return (
    <div className="layout min-w-full h-fit font-Noto">
      {loader ? <LanguageSeterLoader/> : (
        <>
          <Navbar />
          <main className="content h-fit">{children}</main>
        </>
      )}
    </div>
  );
};

export default  RootLayout;
