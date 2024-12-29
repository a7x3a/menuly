import React, { useState, useEffect, useContext } from "react";
import { auth } from "../DB/Config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RiLogoutCircleLine } from "react-icons/ri";
import { deleteItem, readData, readImage } from "../DB/Firebase";
import { CustomScroll } from "react-custom-scroll";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdFeaturedPlayList } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { LanguageContext } from "../Context/LanguageContext";
import { ItemsContext } from "../Context/ItemsContext";
import AddItemModal from "./Modals/AddItemModal";
const Admin = () => {
  //Menu JSX
  const { loading, error } = readData("/items");
  const { data, setData } = useContext(ItemsContext);
  const [fullError, setFullError] = useState(null);
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

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      console.error("Error loading data:", error); // Handle data loading error
      setFullError("Something wrong happens!");
      return;
    }
  }, [data, loading, error, lang]);
  // Use the 'en' field as the key to ensure uniqueness.
  const categoriesMap = new Map();
  data?.forEach((item) => {
    if (!categoriesMap.has(item.category_en)) {
      categoriesMap.set(item.category_en, {
        en: item.category_en,
        ar: item.category_ar,
        kr: item.category_kr,
      });
    }
  });
  const categoriesArray = Array.from(categoriesMap.values());
  //Admin JSX
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect to login if no user is authenticated
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  //Clear Cookies and Logout
  const handleLogout = () => {
    Cookies.remove("userToken");
    auth.signOut();
    navigate("/login");
  };

  return (
    <div
      className={`w-full ${data ? "h-fit" : "h-[80dvh]"
        }  bg-orange-300 flex flex-col items-center p-6`}
    >
      {user ? (
        <div className="w-full flex flex-col gap-3">
          {/**Admin Header */}
          <div className="w-full text-black/70 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-bold capitalize tracking-widest text-center ">
              {lang === "en" && " Admin Dashboard"}
              {lang === "ar" && " ادارە بیانات"}
              {lang === "kr" && "ئادمین"}
            </h1>
            <div className="divider"></div>
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-lg font-semibold capitalize ">
                {lang === "en" && `Welcome - ${user.email}`}
                {lang === "ar" && `مرحبا - ${user.email}`}
                {lang === "kr" && `بەخێربێیت - ${user.email}`}
              </h2>
              <button
                className="btn btn-error w-fit hover:scale-[97%] text-white hover:bg-red-500"
                onClick={handleLogout}
              >
                <RiLogoutCircleLine size={20} />
              </button>
            </div>
          </div>
          {/**Add Items */}
          <AddItemModal />

          {/**Card Reveals */}
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
              {/*Categories*/}
              <div className="w-full text-black  h-[120px] carousel space-x-4 py-5 px-2 ">
                {categoriesArray?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setCategory(item.en);
                      }}
                      className={`card ${item.en == categoriesSelected && "opacity-30"
                        } active:scale-90 bg-white carousel-item  p-5 rounded-[15px] transition-all duration-300 w-1/6 aspect-square `}
                    >
                      <div className="flex gap-4 justify-center items-center h-full">
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
              {/*Categories Selection*/}
              <div className="w-full text-black min-h-fit max-h-fit border-none grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1   gap-5 ">
                {categoriesSelected
                  ? categoriesSelectedItems.map((item) => {
                    return (
                      <div key={item.id}>
                        <div

                          className="card  bg-white rounded-[30px] transition-all duration-300 !w-full !h-full aspect-square"
                        >
                          <div className="w-full h-full rounded-t-3xl overflow-hidden">
                            <img
                              className="object-cover object-center h-full w-full"
                              src={item.imageUrl}
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
                              {item?.discount > 0 ? (
                                <div className="flex items-center gap-1 p-1 h-full text-transparent/70 ">
                                  <RiDiscountPercentFill size={22} />
                                  <span className="mr-2 line-through">
                                    {item.price}
                                    <span className="text-transparent/40">
                                      IQD
                                    </span>
                                  </span>
                                  <span>
                                    {item.price -
                                      item.price * (item.discount / 100)}
                                    <span className="text-transparent/40">
                                      IQD
                                    </span>
                                  </span>
                                </div>
                              ) : (
                                <p className="text-transparent/70">
                                  {item.price} IQD
                                </p>
                              )}
                            </div>
                            <div className="w-full  flex flex-col gap-3 pt-3 justify-between">
                              <button href="#" onClick={() =>
                                document.getElementById(item.id + 'delete').showModal()
                              } className="w-full btn btn-error !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Delete'}
                                {lang == "ar" && 'حذف'}
                                {lang == "kr" && 'سڕینەوە'}
                              </button>
                              <button href="#" onClick={() =>
                                document.getElementById(item.id + 'update').showModal()
                              } className="w-full btn btn-warning !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Update'}
                                {lang == "ar" && 'تحديث'}
                                {lang == "kr" && 'نوێکردنەوە'}
                              </button>
                            </div>

                          </div>
                        </div>
                        {/**Delete Modal */}
                        <dialog id={item.id + 'delete'} className="modal">
                          <CustomScroll
                            handleClass="m-5"
                            className="lg:w-1/3 md:3/4 sm:w-3/2  w-3/4  h-fit rounded-xl top-0 absolute bg-white p-7 mt-20 "
                          >
                            <form method="dialog">
                              <button className="btn btn-sm  flex justify-center items-center btn-circle btn-ghost bg-orange-400 text-white hover:opacity-75 hover:bg-orange-400  absolute right-7  top-7  ">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-semibold text-transparent/60 tracking-wider uppercase text-2xl">
                              {lang == "en" && item.name_en}
                              {lang == "ar" && item.name_ar}
                              {lang == "kr" && item.name_kr}
                            </h3>

                            <div className="flex flex-col gap-3 p-5">
                              <span className="text-black text-xl text-center">
                                {lang == "en" && 'Are you sure you want to delete?'}
                                {lang == "ar" && 'هل أنت متأكد أنك تريد حذف؟'}
                                {lang == "kr" && 'دڵنیایت کە دەتەوێت بسڕیتەوە؟'}
                              </span>
                              <button href="#" onClick={() => {
                                deleteItem(item.id, setData, setCategoriesSelectedItems)
                                setCategoriesSelected(null)
                                document.getElementById(item.id + 'delete').close()
                              }
                              } className="w-full btn btn-error !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Delete'}
                                {lang == "ar" && 'حذف'}
                                {lang == "kr" && 'سڕینەوە'}
                              </button>
                              <button href="#" onClick={() =>
                                document.getElementById(item.id + 'delete').close()
                              } className="w-full btn btn-success opacity-60 !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Cancel'}
                                {lang == "ar" && 'إلغاء'}
                                {lang == "kr" && 'پاشگەزبوونەوە'}
                              </button>
                            </div>
                          </CustomScroll>
                        </dialog>
                        {/**Update Modal */}
                        <dialog id={item.id + 'update'} className="modal">
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
                              Update Modal
                              {lang == "en" && item.name_en}
                              {lang == "ar" && item.name_ar}
                              {lang == "kr" && item.name_kr}
                            </h3>
                            <div className="w-full px-2 py-6 pb-10 rounded-3xl h-full ">
                              <div className="rounded-3xl w-full overflow-hidden flex justify-center items-center">
                                <img
                                  src={item.imageUrl}
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
                                  className={`${item.discount && "opacity-30"
                                    }  py-4 bg-orange-400 text-white rounded-2xl px-5 mt-3 flex justify-between items-center `}
                                >
                                  <BiSolidDollarCircle size={25} />
                                  {item?.discount > 0 ? (
                                    <span className="line-through">
                                      {item.price} IQD
                                    </span>
                                  ) : (
                                    item.price + " IQD"
                                  )}
                                </span>
                                {item?.discount > 0 && (
                                  <>
                                    <p className="capitalize pt-3 text-center">
                                      {item.discount}%
                                      {lang == "en" && "discount"}
                                      {lang == "ar" && "خصم"}
                                      {lang == "kr" && "داشکاندن"}
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
                              </div>
                            </div>
                          </CustomScroll>
                        </dialog>
                      </div>
                    );
                  })
                  : data?.map((item) => {
                    return (
                      <div key={item.id}>
                        <div
                          className="card active:scale-90 bg-white rounded-[30px] transition-all duration-300 !w-full !h-full aspect-square"
                        >
                          <div className="w-full h-full rounded-t-3xl overflow-hidden">
                            <img
                              className="object-cover object-center h-full w-full"
                              src={item.imageUrl}
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
                              {item?.discount > 0 ? (
                                <div className="flex items-center gap-1 p-1 h-full text-transparent/70 ">
                                  <RiDiscountPercentFill size={22} />
                                  <span className="mr-2 line-through">
                                    {item.price}
                                    <span className="text-transparent/40">
                                      IQD
                                    </span>
                                  </span>
                                  <span>
                                    {item.price -
                                      item.price * (item.discount / 100)}
                                    <span className="text-transparent/40">
                                      IQD
                                    </span>
                                  </span>
                                </div>
                              ) : (
                                <p className="text-transparent/70">
                                  {item.price} IQD
                                </p>
                              )}
                            </div>
                            <div className="w-full  flex flex-col gap-3 pt-3 justify-between">
                              <button href="#" onClick={() =>
                                document.getElementById(item.id + 'delete').showModal()
                              } className="w-full btn btn-error !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Delete'}
                                {lang == "ar" && 'حذف'}
                                {lang == "kr" && 'سڕینەوە'}
                              </button>
                              <button href="#" onClick={() =>
                                document.getElementById(item.id + 'update').showModal()
                              } className="w-full btn btn-warning !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Update'}
                                {lang == "ar" && 'تحديث'}
                                {lang == "kr" && 'نوێکردنەوە'}
                              </button>
                            </div>
                          </div>
                        </div>
                        {/**Delete Modal */}
                        <dialog id={item.id + 'delete'} className="modal">
                          <CustomScroll
                            handleClass="m-5"
                            className="lg:w-1/3 md:3/4 sm:w-3/2  w-3/4  h-fit rounded-xl top-0 absolute bg-white p-7 mt-20 "
                          >
                            <form method="dialog">
                              <button className="btn btn-sm  flex justify-center items-center btn-circle btn-ghost bg-orange-400 text-white hover:opacity-75 hover:bg-orange-400  absolute right-7  top-7  ">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-semibold text-transparent/60 tracking-wider uppercase text-2xl">
                              {lang == "en" && item.name_en}
                              {lang == "ar" && item.name_ar}
                              {lang == "kr" && item.name_kr}
                            </h3>

                            <div className="flex flex-col gap-3 p-5">
                              <span className="text-black text-xl text-center">
                                {lang == "en" && 'Are you sure you want to delete?'}
                                {lang == "ar" && 'هل أنت متأكد أنك تريد حذف؟'}
                                {lang == "kr" && 'دڵنیایت کە دەتەوێت بسڕیتەوە؟'}
                              </span>
                              <button href="#" onClick={() => {
                                deleteItem(item.id, setData, null)
                                setCategoriesSelected(null)
                                document.getElementById(item.id + 'delete').close()
                              }
                              } className="w-full btn btn-error !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Delete'}
                                {lang == "ar" && 'حذف'}
                                {lang == "kr" && 'سڕینەوە'}
                              </button>
                              <button href="#" onClick={() =>
                                document.getElementById(item.id + 'delete').close()
                              } className="w-full btn btn-success opacity-60 !text-white font-semibold tracking-widest rounded-xl">
                                {lang == "en" && 'Cancel'}
                                {lang == "ar" && 'إلغاء'}
                                {lang == "kr" && 'پاشگەزبوونەوە'}
                              </button>
                            </div>
                          </CustomScroll>
                        </dialog>
                        {/**Update Modal */}
                        <dialog id={item.id + 'update'} className="modal">
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
                              Update Modal
                              {lang == "en" && item.name_en}
                              {lang == "ar" && item.name_ar}
                              {lang == "kr" && item.name_kr}
                            </h3>
                            <div className="w-full px-2 py-6 pb-10 rounded-3xl h-full ">
                              <div className="rounded-3xl w-full overflow-hidden flex justify-center items-center">
                                <img
                                  src={item.imageUrl}
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
                                  className={`${item.discount && "opacity-30"
                                    }  py-4 bg-orange-400 text-white rounded-2xl px-5 mt-3 flex justify-between items-center `}
                                >
                                  <BiSolidDollarCircle size={25} />
                                  {item?.discount > 0 ? (
                                    <span className="line-through">
                                      {item.price} IQD
                                    </span>
                                  ) : (
                                    item.price + " IQD"
                                  )}
                                </span>
                                {item?.discount > 0 && (
                                  <>
                                    <p className="capitalize pt-3 text-center">
                                      {item.discount}%
                                      {lang == "en" && "discount"}
                                      {lang == "ar" && "خصم"}
                                      {lang == "kr" && "داشکاندن"}
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
      ) : (
        <div className="w-full h-fit flex justify-center items-center">
          <l-line-wobble
            size="300"
            stroke="5"
            bg-opacity="0.1"
            speed="1.75"
            color="white"
          ></l-line-wobble>
        </div>
      )}
    </div>
  );
};

export default Admin;
