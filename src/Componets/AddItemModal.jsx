import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { database, storage } from "../DB/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as RefDB, set } from "firebase/database";
import { IoMdAddCircle } from "react-icons/io";
import { useContext } from "react";
import { CustomScroll } from "react-custom-scroll";
import { LanguageContext } from "../Context/LanguageContext";
import NoIcon from "../Assets/no-image.jpg";

function AddItemModal() {
  const { lang } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    name_kr: "",
    category_en: "",
    category_ar: "",
    category_kr: "",
    description_en: "",
    description_ar: "",
    description_kr: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image!");
      return;
    }

    setLoading(true);

    try {
      const itemId = uuidv4();

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `items/${itemId}`);
      await uploadBytes(storageRef, imageFile);

      const imageUrl = await getDownloadURL(storageRef);

      // Reference Firestore collection
      const itemCollectionRef = RefDB(database, `items/${itemId}`);

      // Add document to Firestore
      await set(itemCollectionRef, {
        id: itemId,
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
      });

      alert("Item added successfully!");
      setFormData({
        /* reset form fields */
      });
      setImageFile(null);
      document.getElementById("addModal").close();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {/* Modal Trigger */}
      <button
        className="btn btn-success w-full text-white"
        onClick={() => document.getElementById("addModal").showModal()}
      >
        <IoMdAddCircle size={20} /> Add Item
      </button>

      {/* Modal */}
      <dialog
        id="addModal"
        className="modal"
        onClick={(e) => e.target.id === "addModal" && e.target.close()}
      >
        <form onSubmit={handleSubmit} className="modal-box grid gap-5">
          <h3 className="text-lg font-bold">Add New Item</h3>

          {/* Image Upload */}
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
            required
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
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
            value={formData.name_en}
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
            value={formData.name_ar}
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
            value={formData.name_kr}
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
            value={formData.category_en}
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
            value={formData.category_ar}
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
            value={formData.category_kr}
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
            value={formData.description_en}
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
            value={formData.description_ar}
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
            value={formData.description_kr}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder={
              lang === "en" ? "Price" : lang === "ar" ? "السعر" : "نرخ"
            }
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />

          {/* Modal Actions */}
          <div className="modal-action">
            <button
              type="submit"
              className={`btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Item"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => document.getElementById("addModal").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default AddItemModal;
