import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryEditModal = ({
  openEditCategory,
  setOpenEditCategory,
  editCategory,
}) => {
  const [CategoriesName, setCategoriesName] = useState("");
  const [CategoriesMetaTitle, setCategoriesMetaTitle] = useState("");
  const [CategoriesMetaDescription, setCategoriesMetaDescription] =
    useState("");
  const [CategoriesImageFile, setCategoriesImageFile] = useState(null);
  const [CategoriesLogoFile, setCategoriesLogoFile] = useState(null);

  useEffect(() => {
    if (openEditCategory && editCategory) {
      setCategoriesName(editCategory?.fileName || "");
      setCategoriesMetaTitle(editCategory?.metaTitle || "");
      setCategoriesMetaDescription(editCategory?.metaDescription || "");
    }
  }, [openEditCategory, editCategory]);

  const handleEditCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("fileName", CategoriesName);
      formData.append("metaTitle", CategoriesMetaTitle);
      formData.append("metaDescription", CategoriesMetaDescription);
      if (CategoriesImageFile)
        formData.append("categoryImage", CategoriesImageFile);
      if (CategoriesLogoFile)
        formData.append("categoryLogo", CategoriesLogoFile);

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/category/${editCategory?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Category updated successfully");
        toast.success("Category updated successfully");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category");
    } finally {
      setOpenEditCategory(false);
    }
  };

  if (!openEditCategory) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-[90%] md:max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenEditCategory(false)}
        >
          <IoClose className="text-2xl" />
        </button>
        <h2 className="text-lg font-bold mb-4">Edit Category</h2>

        <div className="mb-4">
          <label className="text-xs md:text-sm mt-3" htmlFor="CategoriesName">
            Categories Name
          </label>
          <input
            id="CategoriesName"
            name="CategoriesName"
            type="text"
            placeholder="Add New Category"
            value={CategoriesName}
            onChange={(e) => setCategoriesName(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-xs md:text-sm mt-3"
            htmlFor="CategoriesMetaTitle"
          >
            Meta Title
          </label>
          <input
            id="CategoriesMetaTitle"
            name="CategoriesMetaTitle"
            type="text"
            placeholder="Add Meta Title"
            value={CategoriesMetaTitle}
            onChange={(e) => setCategoriesMetaTitle(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-xs md:text-sm mt-3"
            htmlFor="CategoriesMetaDescription"
          >
            Meta Description
          </label>
          <input
            id="CategoriesMetaDescription"
            name="CategoriesMetaDescription"
            type="text"
            placeholder="Add Meta Description"
            value={CategoriesMetaDescription}
            onChange={(e) => setCategoriesMetaDescription(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="capitalize text-left text-xs md:text-sm"
            htmlFor="CategoriesImage"
          >
            Add Image
          </label>
          <input
            name="categoryImage"
            id="CategoriesImage"
            type="file"
            className="bg-gray-200 text-xs md:text-sm w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
            onChange={(e) => setCategoriesImageFile(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label
            className="capitalize text-xs md:text-sm"
            htmlFor="CategoriesLogo"
          >
            Add Logo
          </label>
          <input
            name="categoryLogo"
            id="CategoriesLogo"
            type="file"
            className="bg-gray-200 text-xs md:text-sm w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
            onChange={(e) => setCategoriesLogoFile(e.target.files[0])}
          />
        </div>

        <button
          className="bg-orange-400 mt-4 w-full md:w-[55%] text-black hover:bg-orange-500 font-semibold text-xs md:text-sm py-3"
          onClick={handleEditCategory}
        >
          Edit Category
        </button>
      </div>
    </div>
  );
};

export default CategoryEditModal;
