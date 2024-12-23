import React, { useEffect, useState } from "react";
import { readImage } from "../DB/Firebase";
import English from "../Assets/en.png";
import Arabic from "../Assets/ar.png";
import Kurdish from "../Assets/kr.png";
import Nav from '../Assets/nav.png';
import TranslationIcon from "../Assets/language.png";
import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
const Navbar = () => {
  const { itemsImage, loadingImage, errorImage } = readImage("profile/");
  const [navImageUrl, setNavImageUrl] = useState(null);
  const { lang, setLanguage,loader } = useContext(LanguageContext); // Destructure lang and setLanguage
  useEffect(() => {
    if (loadingImage) {
      console.log("Profile Image Loading...");
    }
    if (itemsImage) {
      itemsImage.map((item) => {
        if (item.name === "nav.png") {
          setNavImageUrl(item.url);
          console.log(navImageUrl);
        }
      });
    }
    if (errorImage) {
      console.log("Error Image Profiler.");
    }
  }, [itemsImage]);
  const setModes = (lang) =>{
    setLanguage(lang);
  }
  return (
    <div className="min-h-[90px] h-fit min-w-full font-popins bg-orange-400 flex justify-between  px-5 py-4 items-center gap-4 !font-elmessiri ">
      <div className="flex btn items-center h-fit justify-center btn-ghost  hover:bg-transparent active:!bg-orange-300 active:!text-white rounded-xl border-none p-3 ">
        <img className="object-contain px-1 w-16 " src={Nav} alt="Logo Image" />
        <span className="font-popins tracking-widest flex  flex-col text-white font-bold text-xl ">
          <span className="text-2xl ">MENULY</span>
          <span className="text-xs text-amber-800">
            <span className="">FAST</span>FOOD
          </span>
        </span>
      </div>

      <div className="dropdown !bg-transparent">
        <div
          tabIndex={0}
          role="button"
          className="bg-white hover:bg-white/40 btn m-2 border-none "
        >
          <img src={TranslationIcon} alt="UK Flag" className="w-10" />
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu  gap-1 bg-white/20 rounded-xl z-[1] w-full p-2 shadow mt-2"
        >
          <div
            tabIndex={0}
            onClick={() => {
              lang != "en" && setModes("en");
            }}
            role="button"
            className="bg-white hover:bg-white/40 btn border-none "
          >
            <img src={English} alt="UK Flag" className="w-8" />
          </div>

          <div
            onClick={() => {
              lang != "ar" && setModes("ar");
            }}
            className="btn hover:bg-white/40 bg-white border-none"
          >
            <img src={Arabic} alt="UAE Flag" className="w-8" />
          </div>
          <div
            onClick={() => {
              lang != "kr" && setModes("kr");
            }}
            className="btn hover:bg-white/40 bg-white border-none"
          >
            <img src={Kurdish} alt="KR Flag" className="w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
