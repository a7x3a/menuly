import React, { useEffect } from "react";
import { useState } from "react";
import { readData, readImage } from "../DB/Firebase";
import { CustomScroll } from "react-custom-scroll";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdFeaturedPlayList } from "react-icons/md";
import { TbHelpCircleFilled } from "react-icons/tb";
import { RiDiscountPercentFill } from "react-icons/ri";
import NoIcon from "../Assets/no-image.png";
const Menu = () => {
  const { itemsImage, loadingImage, errorImage } = readImage("items/");
  const { items, loading, error } = readData();
  const [data, setData] = useState([]);
  const [fullError, setFullError] = useState(null);
  const [basket, setBasket] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState(null);
  const [categoriesSelectedItems, setCategoriesSelectedItems] = useState(null);
  const setCategory = (item) => {
    if (item && item !== categoriesSelected) {
      const list = data.filter(
        (i) => i.category.toLowerCase() === item.toLowerCase()
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
  }, [items, itemsImage, loading, loadingImage, error, errorImage, basket]);
  const categoriesSet = new Set(data.map((item) => item.category));
  const categoriesArray = Array.from(categoriesSet);
  return (
    <div className="min-w-full min-h-[100dvh] h-fit flex flex-col gap-6 bg-orange-300 pb-16 px-16 pt-7">
      <div className="w-full  h-[120px] carousel space-x-4 py-5 px-2 ">
        {categoriesArray.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCategory(item);
              }}
              className={`card ${
                item == categoriesSelected && "opacity-30"
              } active:scale-90 bg-white carousel-item  p-5 rounded-[15px] transition-all duration-300 w-1/6 aspect-square `}
            >
              <div className="flex  gap-4 justify-center items-center h-full">
                <p className="text-sm font-bold opacity-75 uppercase tracking-wider">
                  {item}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full min-h-fit max-h-fit border-none grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1   gap-5 ">
        {categoriesSelected
          ? categoriesSelectedItems.map((item) => {
              return (
                <div key={item.id}>
                  <div
                    onClick={() => document.getElementById(item.id).showModal()}
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
                      <p className="text-lg pl-2 ">{item.name}</p>
                      <p className="text-sm font-light pl-2 capitalize">
                        {item.category}
                      </p>
                      <div className="bg-[#e3fff9] py-3 px-4 opacity-90 rounded-2xl mt-3 w-full flex justify-start items-center text-sm">
                        <p className="span">{item.price} IQD</p>
                      </div>
                    </div>
                  </div>
                  <dialog id={item.id} className="modal">
                    <CustomScroll
                      heightRelativeToParent="calc(80% - 40px)"
                      handleClass="m-5"
                      className="sm:w-1/3 w-3/4  h-full rounded-xl top-0 absolute bg-white p-7 mt-20 "
                    >
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost bg-orange-400 text-white hover:opacity-75 hover:bg-orange-400  absolute right-7  top-7  ">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-light tracking-widest uppercase  text-2xl ">
                        {item.name}
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
                            {item.description}
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
                            className="py-4 btn w-full bg-green-400 flex items-center justify-center gap-3 text-white rounded-2xl px-5 mt-3"
                          >
                            Add To Basket
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
                    onClick={() => document.getElementById(item.id).showModal()}
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
                      <p className="text-lg pl-2 ">{item.name}</p>
                      <p className="text-sm font-light pl-2 capitalize">
                        {item.category}
                      </p>
                      <div className="bg-[#e3fff9] py-3 px-4 opacity-90 rounded-2xl mt-3 w-full flex justify-start items-center text-sm">
                        <p className="span">{item.price} IQD</p>
                      </div>
                    </div>
                  </div>
                  <dialog id={item.id} className="modal">
                    <CustomScroll
                      heightRelativeToParent="calc(80% - 40px)"
                      handleClass="m-5"
                      className="sm:w-1/3 w-3/4  h-full rounded-xl top-0 absolute bg-white p-7 mt-20 "
                    >
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost bg-orange-400 text-white hover:opacity-75 hover:bg-orange-400  absolute right-7  top-7  ">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-light tracking-widest uppercase  text-2xl ">
                        {item.name}
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
                            {item.description}
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
                            className="py-4 btn w-full bg-green-400 flex items-center justify-center gap-3 text-white rounded-2xl px-5 mt-3"
                          >
                            Add To Basket
                          </button>
                        </div>
                      </div>
                    </CustomScroll>
                  </dialog>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Menu;