import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const SubCategoryEditModal = ({
  openEditSubCategory,
  setOpenEditSubCategory,
  editSubCategory,
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryMetaTitle, setSubCategoryMetaTitle] = useState("");
  const [subCategoryMetaDescription, setSubCategoryMetaDescription] =
    useState("");
  const [subCategoryImageFile, setSubCategoryImageFile] = useState(null);
  const [subCategoryLogoFile, setSubCategoryLogoFile] = useState(null);

  useEffect(() => {
    if (openEditSubCategory && editSubCategory) {
      setSubCategoryName(editSubCategory?.name || "");
      setSubCategoryMetaTitle(editSubCategory?.metaTitle || "");
      setSubCategoryMetaDescription(editSubCategory?.metaDescription || "");
    }
  }, [openEditSubCategory, editSubCategory]);

  const handleEditSubCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", subCategoryName);
      formData.append("metaTitle", subCategoryMetaTitle);
      formData.append("metaDescription", subCategoryMetaDescription);
      if (subCategoryImageFile)
        formData.append("subcategoryImage", subCategoryImageFile);
      if (subCategoryLogoFile)
        formData.append("subcategoryLogo", subCategoryLogoFile);

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/category/subcategory/${editSubCategory?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Subcategory updated successfully");
        toast.success("Subcategory updated successfully");
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast.error("Error updating subcategory");
    } finally {
      setOpenEditSubCategory(false);
    }
  };

  if (!openEditSubCategory) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-[90%] md:max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenEditSubCategory(false)}
        >
          <IoClose className="text-2xl" />
        </button>
        <h2 className="text-lg font-bold mb-4">Edit Subcategory</h2>

        <div className="mb-4">
          <label className="text-xs md:text-sm mt-3" htmlFor="subCategoryName">
            Subcategory Name
          </label>
          <input
            id="subCategoryName"
            name="subCategoryName"
            type="text"
            placeholder="Add New Subcategory"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-xs md:text-sm mt-3"
            htmlFor="subCategoryMetaTitle"
          >
            Meta Title
          </label>
          <input
            id="subCategoryMetaTitle"
            name="subCategoryMetaTitle"
            type="text"
            placeholder="Add Meta Title"
            value={subCategoryMetaTitle}
            onChange={(e) => setSubCategoryMetaTitle(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-xs md:text-sm mt-3"
            htmlFor="subCategoryMetaDescription"
          >
            Meta Description
          </label>
          <input
            id="subCategoryMetaDescription"
            name="subCategoryMetaDescription"
            type="text"
            placeholder="Add Meta Description"
            value={subCategoryMetaDescription}
            onChange={(e) => setSubCategoryMetaDescription(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="capitalize text-left text-xs md:text-sm"
            htmlFor="subCategoryImage"
          >
            Add Image
          </label>
          <input
            name="subCategoryImage"
            id="subCategoryImage"
            type="file"
            className="bg-gray-200 text-xs md:text-sm w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
            onChange={(e) => setSubCategoryImageFile(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label
            className="capitalize text-xs md:text-sm"
            htmlFor="subCategoryLogo"
          >
            Add Logo
          </label>
          <input
            name="subCategoryLogo"
            id="subCategoryLogo"
            type="file"
            className="bg-gray-200 text-xs md:text-sm w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
            onChange={(e) => setSubCategoryLogoFile(e.target.files[0])}
          />
        </div>

        <button
          className="bg-orange-400 mt-4 w-full md:w-[55%] text-black hover:bg-orange-500 font-semibold text-xs md:text-sm py-3"
          onClick={handleEditSubCategory}
        >
          Edit Subcategory
        </button>
      </div>
    </div>
  );
};

export default SubCategoryEditModal;
