import React from 'react'
import { CustomScroll } from "react-custom-scroll";
import { RiDiscountPercentFill } from 'react-icons/ri';
import { BiSolidDollarCircle } from 'react-icons/bi';
import { MdFeaturedPlayList } from 'react-icons/md';
const UpdateModal = ({item,setCategoriesSelected,lang,setData}) => {
  return (
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
  )
}

export default UpdateModal
