import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const SeriesEditModal = ({ openEditSeries, setOpenEditSeries, editSeries }) => {
  const [seriesName, setSeriesName] = useState("");
  const [seriesSlug, setSeriesSlug] = useState("");
  const [seriesDescription, setSeriesDescription] = useState("");
  const [seriesMetaTitle, setSeriesMetaTitle] = useState("");
  const [seriesMetaDescription, setSeriesMetaDescription] = useState("");
  const [seriesFile, setSeriesFile] = useState(null);

  useEffect(() => {
    if (openEditSeries && editSeries) {
      setSeriesName(editSeries?.name || "");
      setSeriesDescription(editSeries?.description || "");
      setSeriesMetaTitle(editSeries?.metaTitle || "");
      setSeriesMetaDescription(editSeries?.metaDescription || "");
      setSeriesSlug(editSeries?.slug || "");
    }
  }, [openEditSeries, editSeries]);

  const handleEditSeries = async () => {
    try {
      const formData = new FormData();
      formData.append("name", seriesName);
      formData.append("slug", seriesSlug);
      formData.append("description", seriesDescription);
      formData.append("metaTitle", seriesMetaTitle);
      formData.append("metaDescription", seriesMetaDescription);
      if (seriesFile) formData.append("seriesFile", seriesFile);

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/category/subcategory/series/${editSeries?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Series updated successfully");
        toast.success("Series updated successfully");
      }
    } catch (error) {
      console.error("Error updating series:", error);
      toast.error("Error updating series");
    } finally {
      setOpenEditSeries(false);
    }
  };

  if (!openEditSeries) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-[90%] md:max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenEditSeries(false)}
        >
          <IoClose className="text-2xl" />
        </button>
        <h2 className="text-lg font-bold mb-4">Edit Series</h2>

        <div className="mb-4">
          <label className="text-xs md:text-sm mt-3" htmlFor="seriesName">
            Series Name
          </label>
          <input
            id="seriesName"
            name="seriesName"
            type="text"
            placeholder="Add New Series"
            value={seriesName}
            onChange={(e) => setSeriesName(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs md:text-sm mt-3" htmlFor="seriesSlug">
            Series Slug
          </label>
          <input
            id="seriesSlug"
            name="seriesSlug"
            type="text"
            placeholder="Add New Series"
            value={seriesSlug}
            onChange={(e) => setSeriesSlug(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-xs md:text-sm mt-3"
            htmlFor="seriesDescription"
          >
            Description
          </label>
          <input
            id="seriesDescription"
            name="seriesDescription"
            type="text"
            placeholder="Add Series Description"
            value={seriesDescription}
            onChange={(e) => setSeriesDescription(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs md:text-sm mt-3" htmlFor="seriesMetaTitle">
            Meta Title
          </label>
          <input
            id="seriesMetaTitle"
            name="seriesMetaTitle"
            type="text"
            placeholder="Add Meta Title"
            value={seriesMetaTitle}
            onChange={(e) => setSeriesMetaTitle(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-xs md:text-sm mt-3"
            htmlFor="seriesMetaDescription"
          >
            Meta Description
          </label>
          <input
            id="seriesMetaDescription"
            name="seriesMetaDescription"
            type="text"
            placeholder="Add Meta Description"
            value={seriesMetaDescription}
            onChange={(e) => setSeriesMetaDescription(e.target.value)}
            className="bg-gray-200 w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label
            className="capitalize text-left text-xs md:text-sm"
            htmlFor="seriesFile"
          >
            Upload Series File
          </label>
          <input
            name="seriesFile"
            id="seriesFile"
            type="file"
            className="bg-gray-200 text-xs md:text-sm w-[90%] md:w-full text-black placeholder-text-gray-600 rounded-sm p-3"
            onChange={(e) => setSeriesFile(e.target.files[0])}
          />
        </div>

        <button
          className="bg-orange-400 mt-4 w-full md:w-[55%] text-black hover:bg-orange-500 font-semibold text-xs md:text-sm py-3"
          onClick={handleEditSeries}
        >
          Edit Series
        </button>
      </div>
    </div>
  );
};

export default SeriesEditModal;
