import React, { useState } from "react";
import { database, storage } from "../../DB/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as RefDB, set } from "firebase/database";
import { useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import { ItemsContext } from "../../Context/ItemsContext";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidDollarCircle } from "react-icons/bi";
import imageCompression from "browser-image-compression";
const UpdateModal = ({item}) => {
  const { lang } = useContext(LanguageContext);
  const { data, setData } = useContext(ItemsContext);
  const [formData, setFormData] = useState({
    name_en: item.name_en,
    name_ar: item.name_ar,
    name_kr: item.name_kr,
    category_en: item.category_en,
    category_ar: item.category_ar,
    category_kr: item.category_kr,
    description_en: item.description_en,
    description_ar: item.description_ar,
    description_kr: item.description_kr,
    price: item.price,
    discount: item.discount,
    imageUrl: item.imageUrl,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setImageFile(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Error compressing image. Please try again.");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const itemId = item.id; // Use the existing item's ID
      let imageUrl = item.imageUrl; // Default to the existing image URL
  
      if (imageFile) {
        // Upload the new image to Firebase Storage
        const storageRef = ref(storage, `items/${itemId}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
  
        // Force browser to fetch the latest image (cache-busting)
        imageUrl = `${imageUrl}?alt=media&t=${new Date().getTime()}`;
      }
  
      // Create the updated item
      const updatedItem = {
        id: item.id,
        name_en: formData.name_en,
        name_ar: formData.name_ar,
        name_kr: formData.name_kr,
        category_en: formData.category_en,
        category_ar: formData.category_ar,
        category_kr: formData.category_kr,
        description_en: formData.description_en,
        description_ar: formData.description_ar,
        description_kr: formData.description_kr,
        price: Number(formData.price),
        discount: Number(formData.discount || 0),
        imageUrl: imageUrl,
      };
  
      // Update the item in Firebase
      const itemRef = RefDB(database, `items/${itemId}`);
      await set(itemRef, updatedItem);
  
      // Update local state to trigger re-render
      setData((prevData) =>
        prevData.map((existingItem) =>
          existingItem.id === item.id ? updatedItem : existingItem
        )
      );
  
      // Reset the image file
      setImageFile(null);
  
      // Close the modal
      document.getElementById(`${item.id}update`).close();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
                     <dialog id={item.id + 'update'} className="modal dark:text-white/60">
                                <form method="dialog">
                                </form>
                                <form onSubmit={handleSubmit} className="modal-box  grid gap-5">
                                         <h3 className="text-lg font-bold">Update Item</h3>
                                         {/* Image Upload */}
                                         <label className="block text-sm font-medium">
                                           Upload The Item Image
                                         </label>
                                         <input
                                           type="file"
                                           accept="image/*"
                                           onChange={handleImageUpload}
                                           className="file-input file-input-bordered w-full"
                                         />
                                         {(item.imageUrl || imageFile) && (
                                           <img
                                             src={imageFile ? URL.createObjectURL(imageFile) : item.imageUrl}
                                             alt="Preview"
                                             className="w-full h-40 object-cover rounded-lg"
                                           />
                                         )}
                                         {/* Input Fields */}
                                         <input
                                           type="text"
                                           name="name_en"
                                           placeholder={
                                             lang === "en"
                                               ? "English Name"
                                               : lang === "ar"
                                                 ? "الاسم بالإنجليزية"
                                                 : "ناوی بە ئینگلیزی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.name_en || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="name_ar"
                                           placeholder={
                                             lang === "en"
                                               ? "Arabic Name"
                                               : lang === "ar"
                                                 ? "الاسم بالعربية"
                                                 : "ناوی بە عەرەبی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.name_ar || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="name_kr"
                                           placeholder={
                                             lang === "en"
                                               ? "Kurdish Name"
                                               : lang === "ar"
                                                 ? "الاسم بالكردية"
                                                 : "ناوی بە کوردی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.name_kr || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="category_en"
                                           placeholder={
                                             lang === "en"
                                               ? "English Category"
                                               : lang === "ar"
                                                 ? "الفئة بالإنجليزية"
                                                 : "هاوپۆلەکان بە ئینگلیزی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.category_en || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="category_ar"
                                           placeholder={
                                             lang === "en"
                                               ? "Arabic Category"
                                               : lang === "ar"
                                                 ? "الفئة بالعربية"
                                                 : "هاوپۆلەکان بە عەرەبی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.category_ar || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="category_kr"
                                           placeholder={
                                             lang === "en"
                                               ? "Kurdish Category"
                                               : lang === "ar"
                                                 ? "الفئة بالكردية"
                                                 : "هاوپۆلەکان بە کوردی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.category_kr || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="description_en"
                                           placeholder={
                                             lang === "en"
                                               ? "English Description"
                                               : lang === "ar"
                                                 ? "الوصف بالإنجليزية"
                                                 : "وەسف بە ئینگلیزی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.description_en || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="description_ar"
                                           placeholder={
                                             lang === "en"
                                               ? "Arabic Description"
                                               : lang === "ar"
                                                 ? "الوصف بالعربية"
                                                 : "وەسف بە عەرەبی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.description_ar || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <input
                                           type="text"
                                           name="description_kr"
                                           placeholder={
                                             lang === "en"
                                               ? "Kurdish Description"
                                               : lang === "ar"
                                                 ? "الوصف بالكردية"
                                                 : "وەسف بە کوردی"
                                           }
                                           className="input input-bordered w-full"
                                           value={formData.description_kr || ''}
                                           onChange={handleInputChange}
                                           required
                                         />
                                         <label htmlFor="price" className="flex justify-end items-center">
                                           <input
                                             type="number"
                                             name="price"
                                             placeholder={
                                               lang === "en" ? "Price" : lang === "ar" ? "السعر" : "نرخ"
                                             }
                                             className="input input-bordered w-full steps-none"
                                             value={formData.price || ''}
                                             onChange={handleInputChange}
                                             onInput={(e) => {
                                               const value = e.target.value;
                                               if (value < 0) {
                                                 e.target.value = "";
                                               }
                                               if (value.startsWith("0") && value.length > 1) {
                                                 e.target.value = value.slice(1);
                                               }
                                             }}
                                             required
                                             min="0"
                                             step="1"
                                           />
                                           <BiSolidDollarCircle className="absolute mr-4" size={24} />
                                         </label>
                                         <label
                                           htmlFor="discount"
                                           className="relative flex justify-end items-center"
                                         >
                                           <input
                                             type="number"
                                             name="discount"
                                             placeholder={
                                               lang === "en" ? "Discount" : lang === "ar" ? "خصم" : "داشکاندن"
                                             }
                                             className="input input-bordered w-full"
                                             value={formData.discount || ''}
                                             onChange={handleInputChange}
                                             onInput={(e) => {
                                               const value = e.target.value;
                                               if (value < 0) {
                                                 e.target.value = "";
                                               }
                                               if (value.startsWith("0") && value.length > 1) {
                                                 e.target.value = value.slice(1);
                                               }
                                             }}
                                             min="0"
                                             step="1"
                                           />
                                           <RiDiscountPercentFill className="absolute mr-4" size={24} />
                                         </label>
                                         {/* Modal Actions */}
                                         <div className="modal-action">
                                           <button
                                             type="submit"
                                             className={`btn ${loading ? "loading" : ""}`}
                                             disabled={loading}
                                           >
                                             {loading ? "Updating..." : "Update Item"}
                                           </button>
                                           <button
                                             type="button"
                                             className="btn btn-ghost"
                                             onClick={() => document.getElementById(`${item.id}update`).close()}
                                           >
                                             Cancel
                                           </button>
                                         </div>
                                       </form>
                            </dialog>
  )
}

export default UpdateModal
