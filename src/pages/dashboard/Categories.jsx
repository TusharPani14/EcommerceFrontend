import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MainAppContext } from "@/context/MainContext";
import { IoClose, IoPencil, IoStar, IoStarOutline } from "react-icons/io5";
import { BsPlusCircle } from "react-icons/bs";
import ReactQuill from "react-quill";
import CategoryEditModal from "@/components/CategoryModals/CategoryEditModal";
import SubCategoryEditModal from "@/components/CategoryModals/SubCategoryEditModal";
import SeriesEditModal from "@/components/CategoryModals/SeriesEditModal";
import { FaMinus, FaPlus } from "react-icons/fa";

const Categories = () => {
  const [CategoriesName, setCategoriesName] = useState("");
  const [CategoriesSlug, setCategoriesSlug] = useState("");
  const [staticMainCategories, setStaticMainCategories] = useState([""]);
  const [CategoriesMetaTitle, setCategoriesMetaTitle] = useState("");
  const [CategoriesMetaDescription, setCategoriesMetaDescription] =
    useState("");
  const [CategoriesImageFile, setCategoriesImageFile] = useState(null);
  const [CategoriesLogoFile, setCategoriesLogoFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isCategory, setIsCategory] = useState(true);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategorySlug, setSubcategorySlug] = useState("");
  const [subcategoryMetaTitle, setSubcategoryMetaTitle] = useState("");
  const [subcategoryMetaDescription, setSubcategoryMetaDescription] =
    useState("");
  const [subCategoryLogoFile, setSubCategoryLogoFile] = useState(null);
  const [seriesName, setSeriesName] = useState("");
  const [seriesSlug, setSeriesSlug] = useState("");
  const [seriesDescription, setSeriesDescription] = useState("");
  const [seriesLogoFile, setSeriesLogoFile] = useState(null);
  const [seriesMetaTitle, setSeriesMetaTitle] = useState("");
  const [seriesMetaDescription, setSeriesMetaDescription] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editCategory, setEditCategory] = useState();
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState();
  const [openEditSeries, setOpenEditSeries] = useState(false);
  const [editSeries, setEditSeries] = useState();
  const { user } = useContext(MainAppContext);
  const navigate = useNavigate();

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "clean",
  ];

  const handleCategoriesUpload = async () => {
    const formData = new FormData();
    formData.append("categoryImage", CategoriesImageFile);
    formData.append("categoryLogo", CategoriesLogoFile);
    formData.append("fileName", CategoriesName);
    formData.append("staticMainCategory", JSON.stringify(staticMainCategories));
    formData.append("slug", CategoriesSlug);
    formData.append("metaTitle", CategoriesMetaTitle);
    formData.append("metaDescription", CategoriesMetaDescription);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      getCategoriesData();
    } catch (error) {
      console.error("Error uploading Categories:", error);
      toast.error("Error uploading Categories");
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/category`
      );
      console.log(response.data);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddSubcategory = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryId", selectedCategory);
      formData.append("name", subcategoryName);
      formData.append("slug", subcategorySlug);
      formData.append("subcategoryLogo", subCategoryLogoFile);
      formData.append("metaTitle", subcategoryMetaTitle);
      formData.append("metaDescription", subcategoryMetaDescription);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/category/subcategory`,
        formData
      );
      toast.success("Subcategory added successfully");
      setSubcategoryName("");
      setSubcategorySlug("");
      getCategoriesData();
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.error("Error adding subcategory");
    }
  };

  const handleAddSeries = async () => {
    try {
      const formData = new FormData();
      formData.append("subcategoryId", selectedSubcategory);
      formData.append("name", seriesName);
      formData.append("slug", seriesSlug);
      formData.append("description", seriesDescription);
      formData.append("seriesLogo", seriesLogoFile);
      formData.append("metaTitle", seriesMetaTitle);
      formData.append("metaDescription", seriesMetaDescription);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/category/subcategory/series`,
        formData
      );
      toast.success("Series added successfully");
      setSeriesName("");
      setSeriesSlug("");
      setSeriesLogoFile(null);
      getCategoriesData();
    } catch (error) {
      console.error("Error adding series:", error);
      toast.error("Error adding series");
    }
  };

  const convertHtmlToText = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const user1 = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "admin" && user1?.role !== "admin") {
      navigate("/login");
    }
    getCategoriesData();
  }, []);

  const handleDeleteCategory = async (category) => {
    const categoryId = category._id;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/category/${categoryId}`
      );
      console.log("Category deleted successfully:", response.data);
      toast.success("Category deleted successfully");
      getCategoriesData();
    } catch (error) {
      console.error("Error deleting category:", error.response.data);
      toast.error("Error deleting category");
    }
  };

  const handleDeleteSubCategory = async (categoryId, subcategoryId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/category/${categoryId}/subcategory/${subcategoryId}`
      );
      console.log("Subcategory deleted successfully:", response.data);
      toast.success("Subcategory deleted successfully");
      getCategoriesData();
    } catch (error) {
      console.error("Error deleting subcategory:", error.response.data);
      toast.error("Error deleting subcategory");
    }
  };

  const handleDeleteSeries = async (subcategoryId, seriesId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/category/subcategory/${subcategoryId}/series/${seriesId}`
      );
      console.log("Series deleted successfully:", response.data);
      toast.success("Series deleted successfully");
      getCategoriesData();
    } catch (error) {
      console.error("Error deleting series:", error.response.data);
      toast.error("Error deleting series");
    }
  };

  const handleCategoryCheckboxChange = async (field, value, categoryId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/category/categorySelect`,
        {
          categoryId: categoryId,
          [field]: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      console.log("Category updated successfully:", response.data);
      getCategoriesData();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category status");
    }
  };

  const handleSubcategoryCheckboxChange = async (
    field,
    value,
    subcategoryId
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/category/subcategorySelect`,
        {
          subcategoryId: subcategoryId,
          [field]: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      console.log("Subcategory updated successfully:", response.data);
      getCategoriesData();
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast.error("Error updating subcategory status");
    }
  };

  const handleSeriesCheckboxChange = async (field, value, seriesId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/category/seriesSelect`,
        {
          seriesId: seriesId,
          [field]: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      console.log("Series updated successfully:", response.data);
      getCategoriesData();
    } catch (error) {
      console.error("Error updating series:", error);
      toast.error("Error updating series status");
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...staticMainCategories];
    values[index] = event.target.value;
    setStaticMainCategories(values);
  };

  const handleAddField = () => {
    setStaticMainCategories([...staticMainCategories, ""]);
  };

  const handleRemoveField = (index) => {
    const values = [...staticMainCategories];
    values.splice(index, 1);
    setStaticMainCategories(values);
  };

  return (
    <div className="w-full min-h-[100vh] h-fit bg-[#F8F9FA] dark:bg-black rounded-lg px-[2%] py-4 md:py-10 overflow-x-hidden">
      <div className="flex items-center justify-between">
        <p className="dark:text-gray-400 text-[#363F4D] font-bold plus-jakarta text-[17px] md:text-[23px] 2xl:text-[25px] ">
          {isCategory ? "Categories" : "Add Sub Categories"}
        </p>
        <p
          onClick={() => {
            setIsCategory((prev) => !prev);
          }}
          className="dark:text-gray-400 flex items-center gap-1 text-[#363F4D] font-bold plus-jakarta cursor-pointer text-[12px] md:text-[15px] 2xl:text-[17px]"
        >
          <BsPlusCircle /> {!isCategory ? "Add Category" : "Add Sub-Categories"}
        </p>
      </div>
      {isCategory ? (
        <>
          <div className="flex flex-col items-center mt-3 md:mt-7 rounded-md dark:bg-white/10 bg-white p-3 md:p-5">
            <div className="md:w-[55%] flex-col flex gap-1 md:gap-3 pb-8 border-b border-gray-400">
              <label
                className="text-xs md:text-sm mt-3"
                htmlFor="CategoriesName"
              >
                Categories Name
              </label>
              <input
                id="newCategory"
                name="newCategory"
                type="text"
                placeholder="Add New Category"
                value={CategoriesName}
                onChange={(e) => {
                  setCategoriesName(e.target.value);
                }}
                className="bg-gray-200 w-[90%] md:w-full text-black placeholder:text-gray-600 rounded-sm p-3"
              />

              <label
                className="text-xs md:text-sm mt-3"
                htmlFor="CategoriesName"
              >
                Categories Slug
              </label>
              <input
                id="newCategory"
                name="newCategory"
                type="text"
                placeholder="Add Category Slug"
                value={CategoriesSlug}
                onChange={(e) => {
                  setCategoriesSlug(e.target.value);
                }}
                className="bg-gray-200 w-[90%] md:w-full text-black placeholder:text-gray-600 rounded-sm p-3"
              />

              <label
                className="text-xs md:text-sm mt-3"
                htmlFor="CategoriesName"
              >
                Static Main Category
              </label>
              {staticMainCategories.map((category, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    id={`staticMainCategory-${index}`}
                    name={`staticMainCategory-${index}`}
                    type="text"
                    placeholder="Add Static Main Category"
                    value={category}
                    onChange={(e) => handleInputChange(index, e)}
                    className="bg-gray-200 w-[90%] md:w-full text-black placeholder:text-gray-600 rounded-sm p-3 mr-2"
                  />
                  {staticMainCategories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="text-red-500"
                    >
                      <FaMinus />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="text-green-500 ml-2"
                  >
                    <FaPlus />
                  </button>
                </div>
              ))}

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
                className="bg-gray-200 w-[90%] md:w-full text-black placeholder:text-gray-600 rounded-sm p-3"
              />

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
                className="bg-gray-200 w-[90%] md:w-full text-black placeholder:text-gray-600 rounded-sm p-3"
              />

              <label
                className="capitalize text-left text-xs md:text-sm"
                htmlFor="Categories1"
              >
                Add Image
              </label>
              <input
                name="categoryImage"
                id="CategoriesImage"
                type="file"
                className="bg-gray-200 text-xs md:text-sm w-[90%] md:w-full text-black placeholder:text-gray-600 rounded-sm p-3"
                onChange={(e) => setCategoriesImageFile(e.target.files[0])}
              />
              <label
                className="capitalize text-xs md:text-sm"
                htmlFor="Categories1"
              >
                Add Logo
              </label>
              <input
                name="categoryLogo"
                id="CategoriesLogo"
                type="file"
                className="bg-gray-200 text-xs md:text-sm w-[90%] md:w-full text-black placeholder:text-gray-600 rounded-sm p-3"
                onChange={(e) => setCategoriesLogoFile(e.target.files[0])}
              />
            </div>
            <button
              className="bg-orange-400 mt-4 w-full md:w-[55%] text-black hover:bg-orange-500 font-semibold text-xs md:text-sm py-3"
              onClick={handleCategoriesUpload}
            >
              Add Categories
            </button>
          </div>
          <p className="pb-10 dark:text-gray-400 text-[#363F4D] mt-3 font-bold plus-jakarta text-[17px] md:text-[23px] 2xl:text-[25px]">
            All Categories
          </p>

          <table width="100%">
            <thead>
              <tr>
                <th width="10%">Icon</th>
                <th width="15%">Category Image</th>
                <th width="10%">Collection</th>
                <th width="10%">Dialog</th>
                <th width="15%">Category Name</th>
                <th width="15%">Meta Title</th>
                <th width="25%">Meta Description</th>
                <th width="15%">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td align="center" className="py-5">
                    <img
                      className="object-cover w-[50px]"
                      src={category.logoLink}
                      alt="Category Logo"
                    />
                  </td>
                  <td align="center">
                    <img
                      className="object-cover w-[50px] w-[50%] mt-1"
                      src={category.imageLink}
                      alt="Category Image"
                    />
                  </td>
                  <td align="center" className="py-5">
                    <input
                      checked={category.collectionSelected}
                      id="checked-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) =>
                        handleCategoryCheckboxChange(
                          "collectionSelected",
                          e.target.checked,
                          category._id
                        )
                      }
                    />
                  </td>
                  <td align="center">
                    <input
                      checked={category.dialogSelected}
                      id="checked-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) =>
                        handleCategoryCheckboxChange(
                          "dialogSelected",
                          e.target.checked,
                          category._id
                        )
                      }
                    />
                  </td>
                  <td align="center">{category.fileName}</td>
                  <td align="center">{category.metaTitle}</td>
                  <td align="center">{category.metaDescription}</td>
                  <td align="center" className="flex flex-row">
                    <IoClose
                      className="cursor-pointer"
                      onClick={() => handleDeleteCategory(category)}
                    />
                    <IoPencil
                      className="cursor-pointer"
                      onClick={() => {
                        setEditCategory(category);
                        setOpenEditCategory(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="dark:text-gray-400 text-[#363F4D] mt-3 font-bold plus-jakarta text-[17px] md:text-[23px] 2xl:text-[25px] pt-10 pb-5">
            All Sub Categories
          </p>
          <table width="100%">
            <thead>
              <tr>
                <th width="10%">Icon</th>
                <th width="10%">Collection</th>
                <th width="10%">Dialog</th>
                <th width="15%">Parent Category</th>
                <th width="15%">Sub Category</th>
                <th width="15%">Meta Title</th>
                <th width="25%">Meta Description</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <>
                  {category.subcategories.map((subcategory) => (
                    <tr key={subcategory.name}>
                      <td align="center" className="py-5">
                        <img
                          className="object-cover h-[75px] w-[75px]"
                          src={subcategory.subLogoLink}
                          alt="Subcategory Logo"
                        />
                      </td>
                      <td align="center" className="py-5">
                        <input
                          checked={subcategory.collectionSelected}
                          id="checked-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) =>
                            handleSubcategoryCheckboxChange(
                              "collectionSelected",
                              e.target.checked,
                              subcategory._id
                            )
                          }
                        />
                      </td>
                      <td align="center">
                        <input
                          checked={subcategory.dialogSelected}
                          id="checked-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) =>
                            handleSubcategoryCheckboxChange(
                              "dialogSelected",
                              e.target.checked,
                              subcategory._id
                            )
                          }
                        />
                      </td>
                      <td align="center">{category.fileName}</td>
                      <td align="center">{subcategory.name}</td>
                      <td align="center">{subcategory.metaTitle}</td>
                      <td align="center">{subcategory.metaDescription}</td>
                      <td align="center">
                        <IoClose
                          className="cursor-pointer"
                          onClick={() =>
                            handleDeleteSubCategory(
                              category._id,
                              subcategory._id
                            )
                          }
                        />
                        <IoPencil
                          className="cursor-pointer"
                          onClick={() => {
                            setEditSubCategory(subcategory);
                            setOpenEditSubCategory(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>

          <p className="dark:text-gray-400 text-[#363F4D] mt-3 font-bold plus-jakarta text-[17px] md:text-[23px] 2xl:text-[25px] pt-10 pb-5">
            All Series
          </p>
          <table width="100%">
            <thead>
              <tr>
                <th width="10%">Image</th>
                <th width="10%">Collection</th>
                <th width="10%">Dialog</th>
                <th width="15%">Category</th>
                <th width="15%">Sub-Category</th>
                <th width="15%">Series</th>
                <th width="15%">Description</th>
                <th width="15%">Meta Title</th>
                <th width="20%">Meta Description</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <>
                  {category.subcategories.map((subcategory) => (
                    <>
                      {subcategory.series.map((seriesItem, seriesIndex) => (
                        <tr key={seriesIndex}>
                          <td align="center" className="py-5">
                            <img
                              className="object-cover h-[150px] w-full mt-1"
                              src={seriesItem.seriesLink}
                              alt="Series Image"
                            />
                          </td>
                          <td align="center" className="py-5">
                            <input
                              checked={seriesItem.collectionSelected}
                              id="checked-checkbox"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={(e) =>
                                handleSeriesCheckboxChange(
                                  "collectionSelected",
                                  e.target.checked,
                                  seriesItem._id
                                )
                              }
                            />
                          </td>
                          <td align="center">
                            <input
                              checked={seriesItem.dialogSelected}
                              id="checked-checkbox"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={(e) =>
                                handleSeriesCheckboxChange(
                                  "dialogSelected",
                                  e.target.checked,
                                  seriesItem._id
                                )
                              }
                            />
                          </td>
                          <td align="center">{category.fileName}</td>
                          <td align="center">{subcategory.name}</td>
                          <td align="center">{seriesItem.name}</td>
                          <td align="center">
                            {convertHtmlToText(seriesItem.description)}
                          </td>
                          <td align="center">
                            {seriesItem.metaTitle && (
                              <>{seriesItem.metaTitle}</>
                            )}
                          </td>
                          <td align="center">
                            {seriesItem.metaDescription && (
                              <>{seriesItem.metaDescription}</>
                            )}
                          </td>
                          <td align="center">
                            <IoClose
                              className="cursor-pointer"
                              onClick={() =>
                                handleDeleteSeries(
                                  subcategory._id,
                                  seriesItem._id
                                )
                              }
                            />
                            <IoPencil
                              className="cursor-pointer"
                              onClick={() => {
                                setEditSeries(seriesItem);
                                setOpenEditSeries(true);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>

          {/* <div className="grid gap-4 grid-cols-1 mt-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="relative flex flex-col bg-white shadow-md shadow-black/30 p-4 rounded-md"
              >
                <div className="flex items-center justify-end text-[19px] gap-1">
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => handleDeleteCategory(category)}
                  />
                  <IoPencil
                    className="cursor-pointer"
                    onClick={() => {
                      setEditCategory(category);
                      setOpenEditCategory(true);
                    }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 justify-between">
                    <div className="flex flex-col font-semibold text-[13px] md:text-sm">
                      <p>Category Name: {category.fileName}</p>
                      {category.metaTitle && (
                        <p>Meta Title: {category.metaTitle}</p>
                      )}
                      {category.metaDescription && (
                        <p>Meta Description: {category.metaDescription}</p>
                      )}
                    </div>
                    <img
                      className="object-cover h-[50px] w-[50px]"
                      src={category.logoLink}
                      alt="Category Logo"
                    />
                  </div>
                </div>
                <img
                  className="object-cover h-[250px] w-full mt-1"
                  src={category.imageLink}
                  alt="Category Image"
                />

                <div className="mt-3">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.name}
                      className="relative flex flex-col bg-gray-100 p-3 rounded-md"
                    >
                      <div className="flex items-center justify-end text-[19px] gap-1 absolute right-2 top-2">
                        <IoClose
                          className="cursor-pointer"
                          onClick={() =>
                            handleDeleteSubCategory(
                              category._id,
                              subcategory._id
                            )
                          }
                        />
                        <IoPencil
                          className="cursor-pointer"
                          onClick={() => {
                            setEditSubCategory(subcategory);
                            setOpenEditSubCategory(true);
                          }}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="font-semibold text-[12px] md:text-sm">
                            Subcategory Name: {subcategory.name}
                          </p>
                          {subcategory.metaTitle && (
                            <p className="font-semibold text-[12px] md:text-sm">
                              Meta Title: {subcategory.metaTitle}
                            </p>
                          )}
                          {subcategory.metaDescription && (
                            <p className="text-[12px] md:text-sm">
                              Meta Description: {subcategory.metaDescription}
                            </p>
                          )}
                        </div>
                        <img
                          className="object-cover h-[75px] w-[75px]"
                          src={subcategory.subLogoLink}
                          alt="Subcategory Logo"
                        />
                      </div>

                      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mt-2">
                        {subcategory.series.map((seriesItem, seriesIndex) => (
                          <div
                            key={seriesIndex}
                            className="relative flex flex-col bg-white p-2 rounded-md shadow-sm"
                          >
                            <div className="flex items-center justify-end text-[19px] gap-1 absolute right-2 top-2">
                              <IoClose
                                className="cursor-pointer"
                                onClick={() =>
                                  handleDeleteSeries(
                                    subcategory._id,
                                    seriesItem._id
                                  )
                                }
                              />
                              <IoPencil
                                className="cursor-pointer"
                                onClick={() => {
                                  setEditSeries(seriesItem);
                                  setOpenEditSeries(true);
                                }}
                              />
                            </div>
                            <p className="font-semibold text-[12px] md:text-sm">
                              Series Name: {seriesItem.name}
                            </p>
                            <p className="text-[12px] md:text-sm">
                              {convertHtmlToText(seriesItem.description)}
                            </p>
                            <img
                              className="object-cover h-[150px] w-full mt-1"
                              src={seriesItem.seriesLink}
                              alt="Series Image"
                            />
                            {seriesItem.metaTitle && (
                              <p className="font-semibold text-[12px] md:text-sm">
                                Meta Title: {seriesItem.metaTitle}
                              </p>
                            )}
                            {seriesItem.metaDescription && (
                              <p className="text-[12px] md:text-sm">
                                Meta Description: {seriesItem.metaDescription}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
        </>
      ) : (
        <div className="md:m-0 mt-4 flex flex-col items-center justify-center======== py-5 bg-white dark:bg-white/5 rounded-md col-span-5">
          <div className="w-full flex flex-col items-center justify-center mb-1.5">
            <select
              name="mainCategory"
              id="main-Category"
              type="number"
              className="w-[50%] p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
            >
              <option className="text-black">Select a Category</option>
              {categories.map((category, index) => (
                <option
                  className="text-black text-xs"
                  key={category._id}
                  value={category._id}
                >
                  {category.fileName}
                </option>
              ))}
            </select>
          </div>
          <input
            name={`subcategoryname`}
            placeholder="Subcategory Name"
            type="text"
            className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
            value={subcategoryName}
            onChange={(e) => {
              setSubcategoryName(e.target.value);
            }}
          />
          <input
            name={`subcategoryslug`}
            placeholder="Subcategory Slug"
            type="text"
            className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
            value={subcategorySlug}
            onChange={(e) => {
              setSubcategorySlug(e.target.value);
            }}
          />
          <input
            id="subcategoryMetaTitle"
            name="subcategoryMetaTitle"
            type="text"
            placeholder="Subcategory Meta Title"
            value={subcategoryMetaTitle}
            onChange={(e) => setSubcategoryMetaTitle(e.target.value)}
            className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
          />
          <input
            id="subcategoryMetaDescription"
            name="subcategoryMetaDescription"
            type="text"
            placeholder="Subcategory Meta Description"
            value={subcategoryMetaDescription}
            onChange={(e) => setSubcategoryMetaDescription(e.target.value)}
            className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
          />
          <label className="text-xs md:text-sm w-[50%] text-left mt-2">
            Add Subcategory Logo
          </label>
          <input
            name={`subcategoryLogo`}
            placeholder="Subcategory Logo"
            type="file"
            className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
            onChange={(e) => setSubCategoryLogoFile(e.target.files[0])}
          />
          <button
            className="bg-orange-300 py-2 w-[50%] mt-5 rounded-md text-xs md:text-sm font-semibold px-5"
            onClick={handleAddSubcategory}
          >
            Add Subcategory
          </button>
          <div className="w-full flex flex-col items-center justify-center mb-1.5 mt-3">
            <div className="w-full flex flex-col items-center justify-center mb-1.5">
              <select
                name="mainCategory"
                id="main-Category"
                className="w-[50%] p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <option className="text-black">Select a Category</option>
                {categories.map((category, index) => (
                  <option
                    className="text-black text-xs"
                    key={category._id}
                    value={category._id}
                  >
                    {category.fileName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col space-y-2 items-center justify-center mb-1.5">
              <select
                name="subCategory"
                id="sub-Category"
                className="w-[50%] p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
                value={selectedSubcategory}
                onChange={(e) => {
                  setSelectedSubcategory(e.target.value);
                }}
              >
                <option className="text-black">Select a Subcategory</option>
                {categories
                  .find((category) => category._id === selectedCategory)
                  ?.subcategories.map((subcategory, index) => (
                    <option
                      className="text-black text-xs"
                      key={index}
                      value={subcategory._id}
                    >
                      {subcategory.name}
                    </option>
                  ))}
              </select>
            </div>
            <input
              name={`seriesName`}
              placeholder="Series Name"
              type="text"
              className="w-[50%] p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
              value={seriesName}
              onChange={(e) => {
                setSeriesName(e.target.value);
              }}
            />
            <input
              name={`seriesSlug`}
              placeholder="Series Slug"
              type="text"
              className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
              value={seriesSlug}
              onChange={(e) => {
                setSeriesSlug(e.target.value);
              }}
            />
            <input
              id="seriesMetaTitle"
              name="seriesMetaTitle"
              type="text"
              placeholder="Series Meta Title"
              value={seriesMetaTitle}
              onChange={(e) => setSeriesMetaTitle(e.target.value)}
              className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
            />
            <input
              id="seriesMetaDescription"
              name="seriesMetaDescription"
              type="text"
              placeholder="Series Meta Description"
              value={seriesMetaDescription}
              onChange={(e) => setSeriesMetaDescription(e.target.value)}
              className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
            />
            <ReactQuill
              className="w-[50%] dark:text-gray-400 text-[#4F5D77] text-[14.4px] dark:bg-white/10 mt-2"
              theme="snow"
              value={seriesDescription}
              formats={formats}
              onChange={(textValue) => setSeriesDescription(textValue)}
              style={{ height: "150px" }}
            />
            <label className="text-xs md:text-sm w-[50%] text-left mt-12">
              Add Series Logo
            </label>
            <input
              name={`seriesLogo`}
              placeholder="Series Logo"
              type="file"
              className="w-[50%] mt-1 p-2 dark:text-gray-400 text-[#4F5D77] bg-[#f2f2f2] text-[14.4px] dark:bg-white/10"
              onChange={(e) => setSeriesLogoFile(e.target.files[0])}
            />
            <button
              className="bg-orange-300 py-2 w-[50%] mt-5 rounded-md text-xs md:text-sm font-semibold px-5"
              onClick={handleAddSeries}
            >
              Add Series
            </button>
          </div>
        </div>
      )}
      <CategoryEditModal
        openEditCategory={openEditCategory}
        setOpenEditCategory={setOpenEditCategory}
        editCategory={editCategory}
      />
      <SubCategoryEditModal
        openEditSubCategory={openEditSubCategory}
        setOpenEditSubCategory={setOpenEditSubCategory}
        editSubCategory={editSubCategory}
      />
      <SeriesEditModal
        openEditSeries={openEditSeries}
        setOpenEditSeries={setOpenEditSeries}
        editSeries={editSeries}
      />
    </div>
  );
};

export default Categories;
