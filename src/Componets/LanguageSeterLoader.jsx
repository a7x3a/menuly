import React from "react";
import { squircle } from "ldrs";
import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
squircle.register();
const LanguageSeterLoader = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="min-w-full h-[100dvh] bg-orange-400 flex flex-col justify-center items-center gap-5">
      <span className="font-ibm font-bold text-2xl text-white uppercase">
        {lang === "en" && "Swithing To English"}
        {lang === "ar" && "یتیم تغیر الغە"}
        {lang === "kr" && "گۆڕینی زمان بۆ کوردی"}
      </span>
      <l-squircle
        size="70"
        stroke="5"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="0.9"
        color="white"
      ></l-squircle>
    </div>
  );
};

export default LanguageSeterLoader;
