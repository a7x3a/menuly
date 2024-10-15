import React, { useEffect } from "react";
import { useState } from "react";
import { readData, readImage } from "../DB/Firebase";
import { CustomScroll } from "react-custom-scroll";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdFeaturedPlayList } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import NoIcon from "../Assets/no-image.png";
import { LanguageContext } from "../Context/LanguageContext";
import { useContext } from "react";
import { lineWobble } from "ldrs";
lineWobble.register();
const Menu = () => {
  const { itemsImage, loadingImage, errorImage } = readImage("items/");
  const { items, loading, error } = readData();
  const [data, setData] = useState([]);
  const [fullError, setFullError] = useState(null);
  const [basket, setBasket] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState(null);
  const [categoriesSelectedItems, setCategoriesSelectedItems] = useState(null);
  const { lang } = useContext(LanguageContext); // Destructure lang and setLanguage
  const setCategory = (item) => {
    if (item && item !== categoriesSelected) {
      const list = data.filter(
        (i) => i.category_en.toLowerCase() === item.toLowerCase()
      );
      setCategoriesSelected(item);
      setCategoriesSelectedItems(list);
    } else {
      setCategoriesSelectedItems([]);
      setCategoriesSelected(null);
    }
  };

  //create a id post with image uploader with the same name of the id of the post make the id
  //update&delete&write = auth
  //read = no auth + auth
  //if error happen display fulll error and no working menu.
  useEffect(() => {
    if (loading || loadingImage) {
      console.log("Loading..."); // Handle loading state
      return;
    }
    if (error) {
      console.log("Error loading data:", error); // Handle data loading error
      setFullError("Something wrong happens!");
      return;
    }
    if (errorImage) {
      console.log("Error loading images:", errorImage); // Handle image loading error
      setFullError("Something wrong happens!");
      return;
    }
    if (items && itemsImage) {
      const [itemsObject] = items;
      const flattenedData = Object.values(itemsObject);
      const mergedData = flattenedData.map((item) => {
        const correspondingImage = itemsImage.find((image) => {
          const imageNameWithoutExtension = image.name
            .split(".")
            .slice(0, -1)
            .join(".");
          return imageNameWithoutExtension === item.id;
        });
        return {
          ...item,
          imageUrl: correspondingImage ? correspondingImage.url : null,
        };
      });
      setData(mergedData);
    }
  }, [
    items,
    itemsImage,
    loading,
    loadingImage,
    error,
    errorImage,
    basket,
    lang,
  ]);
  // Use the 'en' field as the key to ensure uniqueness.
  const categoriesMap = new Map();
  data.forEach((item) => {
    if (!categoriesMap.has(item.category_en)) {
      categoriesMap.set(item.category_en, {
        en: item.category_en,
        ar: item.category_ar,
        kr: item.category_kr,
      });
    }
  });
  const categoriesArray = Array.from(categoriesMap.values());
  return (
    <div className="min-w-full min-h-[100dvh] h-fit flex flex-col gap-6 text-black tracking-wider bg-orange-300 pb-16 px-16 pt-7">
      {loading ? (
        <div className="w-full h-fit flex justify-center items-center">
          <l-line-wobble
            size="300"
            stroke="5"
            bg-opacity="0.1"
            speed="1.75"
            color="white"
          ></l-line-wobble>
        </div>
      ) : (
        <>
          <div className="w-full  h-[120px] carousel space-x-4 py-5 px-2 ">
            {categoriesArray.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCategory(item.en);
                  }}
                  className={`card ${
                    item.en == categoriesSelected && "opacity-30"
                  } active:scale-90 bg-white carousel-item  p-5 rounded-[15px] transition-all duration-300 w-1/6 aspect-square `}
                >
                  <div className="flex  gap-4 justify-center items-center h-full">
                    <p className="text-sm font-bold opacity-75 uppercase tracking-wider">
                      {lang == "en" && item.en}
                      {lang == "ar" && item.ar}
                      {lang == "kr" && item.kr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full min-h-fit max-h-fit border-none grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1   gap-5 ">
            {categoriesSelected
              ? categoriesSelectedItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <div
                        onClick={() =>
                          document.getElementById(item.id).showModal()
                        }
                        className="card active:scale-90 bg-white rounded-[30px] transition-all duration-300 !w-full !h-full aspect-square"
                      >
                        <div className="w-full h-full rounded-t-3xl overflow-hidden">
                          <img
                            className="object-cover object-center h-full w-full"
                            src={NoIcon}
                            alt="Item Image"
                          />
                        </div>
                        <div className="flex flex-col justify-around p-4">
                          <p className="text-lg pl-2 ">
                            {lang == "en" && item.name_en}
                            {lang == "ar" && item.name_ar}
                            {lang == "kr" && item.name_kr}
                          </p>
                          <p className="text-sm  pl-3 py-1 text-transparent/40 font-light capitalize">
                            {lang == "en" && item.category_en}
                            {lang == "ar" && item.category_ar}
                            {lang == "kr" && item.category_kr}
                          </p>
                          <div className="bg-[#e3fff9] py-3 px-4 opacity-90 rounded-2xl mt-3 w-full flex justify-start items-center text-sm">
                            <p className="span text-transparent/70">
                              {item.price} IQD
                            </p>
                          </div>
                        </div>
                      </div>
                      <dialog id={item.id} className="modal">
                        <CustomScroll
                          heightRelativeToParent="calc(80% - 40px)"
                          handleClass="m-5"
                          className="lg:w-1/3 md:3/4 sm:w-3/2  w-3/4  h-full rounded-xl top-0 absolute bg-white p-7 mt-20 "
                        >
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost bg-orange-400 text-white hover:opacity-75 hover:bg-orange-400  absolute right-7  top-7  ">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-semibold text-transparent/60 tracking-wider uppercase text-2xl">
                            {lang == "en" && item.name_en}
                            {lang == "ar" && item.name_ar}
                            {lang == "kr" && item.name_kr}
                          </h3>
                          <div className="w-full px-2 py-6 pb-10 rounded-3xl h-full ">
                            <div className="rounded-3xl w-full overflow-hidden flex justify-center items-center">
                              <img
                                src={NoIcon}
                                alt="Item Image"
                                className="object-cover"
                              />
                            </div>
                            <div className="pb-4 rounded-2xl p-1">
                              <span className="py-4 bg-orange-400 flex flex-wrap items-center  gap-3 text-white rounded-2xl px-5 mt-3">
                                <MdFeaturedPlayList size={25} />
                                {lang == "en" && item.description_en}
                                {lang == "ar" && item.description_ar}
                                {lang == "kr" && item.description_kr}
                              </span>

                              <span
                                className={`${
                                  item.discount && "opacity-30"
                                }  py-4 bg-orange-400 text-white rounded-2xl px-5 mt-3 flex justify-between items-center `}
                              >
                                <BiSolidDollarCircle size={25} />
                                {item.discount ? (
                                  <span className="line-through">
                                    {item.price} IQD
                                  </span>
                                ) : (
                                  item.price + " IQD"
                                )}
                              </span>
                              {item.discount && (
                                <>
                                  <p className="capitalize pt-3 text-center">
                                    {item.discount}% discount
                                  </p>
                                  <span className="py-4 bg-green-500 text-white rounded-2xl px-5 mt-3 flex justify-between items-center ">
                                    <RiDiscountPercentFill size={25} />
                                    <span>
                                      {item.price -
                                        item.price * (item.discount / 100)}
                                      IQD
                                    </span>
                                  </span>
                                </>
                              )}

                              <button
                                onClick={() => {
                                  basket.push(item);
                                }}
                                className="py-4 btn w-full bg-green-400 border-none flex items-center justify-center gap-3 text-white rounded-2xl px-5 mt-3"
                              >
                                {lang == "en" && "Add To Baket"}
                                {lang == "ar" && "زد الی القائمە"}
                                {lang == "kr" && "زیادکردن بۆ لیست"}
                              </button>
                            </div>
                          </div>
                        </CustomScroll>
                      </dialog>
                    </div>
                  );
                })
              : data.map((item) => {
                  return (
                    <div key={item.id}>
                      <div
                        onClick={() =>
                          document.getElementById(item.id).showModal()
                        }
                        className="card active:scale-90 bg-white rounded-[30px] transition-all duration-300 !w-full !h-full aspect-square"
                      >
                        <div className="w-full h-full rounded-t-3xl overflow-hidden">
                          <img
                            className="object-cover object-center h-full w-full"
                            src={NoIcon}
                            alt="Item Image"
                          />
                        </div>
                        <div className="flex flex-col justify-around p-4">
                          <p className="text-lg pl-2 ">
                            {lang == "en" && item.name_en}
                            {lang == "ar" && item.name_ar}
                            {lang == "kr" && item.name_kr}
                          </p>
                          <p className="text-sm text-transparent/40 font-light pl-3 py-1 capitalize">
                            {lang == "en" && item.category_en}
                            {lang == "ar" && item.category_ar}
                            {lang == "kr" && item.category_kr}
                          </p>
                          <div className="bg-[#e3fff9] py-3 px-4 opacity-90 rounded-2xl mt-3 w-full flex justify-start items-center text-sm">
                            <p className="span text-black/60">
                              {item.price} IQD
                            </p>
                          </div>
                        </div>
                      </div>
                      <dialog id={item.id} className="modal">
                        <CustomScroll
                          heightRelativeToParent="calc(80% - 40px)"
                          handleClass="m-5"
                          className="lg:w-1/3 md:3/4 sm:w-3/2  w-3/4  h-full rounded-xl top-0 absolute bg-white p-7 mt-20 "
                        >
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost bg-orange-400 text-white hover:opacity-75 hover:bg-orange-400  absolute right-7  top-7  ">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-light text-transparent/60 tracking-widest uppercase  text-2xl ">
                            {lang == "en" && item.name_en}
                            {lang == "ar" && item.name_ar}
                            {lang == "kr" && item.name_kr}
                          </h3>
                          <div className="w-full px-2 py-6 pb-10 rounded-3xl h-full">
                            <div className="rounded-3xl w-full overflow-hidden flex justify-center items-center">
                              <img
                                src={NoIcon}
                                alt="Item Image"
                                className="object-cover"
                              />
                            </div>
                            <div className="pb-4 rounded-2xl p-1">
                              <span className="py-4 bg-orange-400 flex flex-wrap items-center  gap-3 text-white rounded-2xl px-5 mt-3">
                                <MdFeaturedPlayList size={25} />
                                {lang == "en" && item.description_en}
                                {lang == "ar" && item.description_ar}
                                {lang == "kr" && item.description_kr}
                              </span>
                              <span
                                className={`${
                                  item.discount && "opacity-30"
                                }  py-4 bg-orange-400 text-white rounded-2xl px-5 mt-3 flex justify-between items-center `}
                              >
                                <BiSolidDollarCircle size={25} />
                                {item.discount ? (
                                  <span className="line-through">
                                    {item.price} IQD
                                  </span>
                                ) : (
                                  item.price + " IQD"
                                )}
                              </span>
                              {item.discount && (
                                <>
                                  <p className="capitalize pt-3 text-center">
                                    {item.discount}% discount
                                  </p>
                                  <span className="py-4 bg-green-500  text-white rounded-2xl px-5 mt-3 flex justify-between items-center ">
                                    <RiDiscountPercentFill size={25} />
                                    <span>
                                      {item.price -
                                        item.price * (item.discount / 100)}{" "}
                                      IQD
                                    </span>
                                  </span>
                                </>
                              )}

                              <button
                                onClick={() => {
                                  basket.push(item);
                                }}
                                className="py-4 btn border-none w-full bg-green-400 flex items-center justify-center gap-3 text-white rounded-2xl px-5 mt-3"
                              >
                                {lang == "en" && "Add To Baket"}
                                {lang == "ar" && "زد الی القائمە"}
                                {lang == "kr" && "زیادکردن بۆ لیست"}
                              </button>
                            </div>
                          </div>
                        </CustomScroll>
                      </dialog>
                    </div>
                  );
                })}
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
