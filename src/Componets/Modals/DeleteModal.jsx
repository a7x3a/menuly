import React from 'react'
import { deleteItem } from '../../DB/Firebase'
import { CustomScroll } from "react-custom-scroll";
const DeleteModal = ({item,setCategoriesSelected,lang,setData}) => {
  return (
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
  )
}

export default DeleteModal
