import React from "react";
import Navbar from "./Navbar";
import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import LanguageSeterLoader from "./LanguageSeterLoader";
import Footer from "./Footer";

const RootLayout = ({ children }) => {
  const { loader } = useContext(LanguageContext);
  const { lang } = useContext(LanguageContext);
  return (
    <div
      className={`layout min-w-full h-fit ${
        lang === "en" ? "font-elmessiri" : "font-nrt"
      }`}
    >
      {loader ? (
        <LanguageSeterLoader />
      ) : (
        <>
          <Navbar />
          <main className="content h-fit">{children}</main>
          <Footer/>
        </>
      )}
    </div>
  );
};

export default RootLayout;
