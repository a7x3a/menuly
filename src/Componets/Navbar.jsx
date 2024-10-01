import React, { useEffect, useState } from "react";
import { readImage } from "../DB/Firebase";
import English from "../Assets/en.png";
import Arabic from "../Assets/ar.png";
import Kurdish from "../Assets/kr.png";
import Nav from '../Assets/nav.png';
const Navbar = () => {
  const { itemsImage, loadingImage, errorImage } = readImage("profile/");
  const [navImageUrl, setNavImageUrl] = useState(null);
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
  return (
    <div className="min-h-[90px] h-fit min-w-full font-popins bg-orange-400 flex justify-between  px-5 py-4 items-center gap-4 ">
      <div className="flex btn items-center h-fit justify-center btn-ghost  hover:bg-transparent active:!bg-orange-300 active:!text-white rounded-xl border-none p-3 ">
        <img className="object-contain px-1 w-16 " src={Nav} alt="Logo Image" />
        <span className="font-popins tracking-widest flex  flex-col text-white font-bold text-xl ">
          <span className="text-2xl ">D A N Y A S</span>
          <span className="text-xs text-amber-800">
            <span className="">FAST</span>FOOD
          </span>
        </span>
      </div>

      <div className="dropdown !bg-transparent">
        <div
          tabIndex={0}
          role="button"
          className="bg-white btn m-2 border-none "
        >
          <img src={English} alt="UK Flag" className="w-8" />
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu  gap-1 bg-white/20 rounded-xl z-[1] w-full p-2 shadow mt-2"
        >
          <div className="btn bg-white border-none">
            <img src={Arabic} alt="UK Flag" className="w-8" />
          </div>
          <div className="btn bg-white border-none">
            <img src={Kurdish} alt="UK Flag" className="w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
