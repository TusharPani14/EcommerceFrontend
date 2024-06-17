import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";
import { ThreeDots } from "react-loader-spinner"; // Import the ThreeDots spinner from react-loader-spinner
import throttle from "lodash.throttle"; // Use lodash throttle for throttling

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileTypes = ["JPEG", "JPG", "PNG"];

  const fetchImages = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/gallery`,
        {
          params: { page },
        }
      );
      if (response.data.length < 8) {
        setHasMore(false);
      }
      setImages((prevImages) => {
        const newImages = response.data.filter(
          (newImage) => !prevImages.some((image) => image._id === newImage._id)
        );
        return [...prevImages, ...newImages];
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/gallery/${id}`);
      toast.success("Image Removed successfully");
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const handleFileChange = (files) => {
    setSelectedFiles(files);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("galleryImages", file);
    }

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/gallery`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Images uploaded successfully");
      setPage(1);
      setImages([]);
      setHasMore(true);
      fetchImages(1);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    }
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Gallery
      </h2>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col items-center text-sm justify-center relative w-1/2 border-2 border-sky-500 py-36 rounded-lg shadow-md bg-white">
          <FileUploader
            handleChange={handleFileChange}
            types={fileTypes}
            multiple
            hoverTitle="Drop Your Product Images here"
          />
          <p className="mt-1 text-gray-700">
            {selectedFiles.length
              ? `File name: ${selectedFiles[0].name}`
              : "No files uploaded yet"}
          </p>
          <p className="text-gray-700">Maximum upload size: 256 MB</p>
        </div>
        <button
          onClick={handleFileUpload}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Images
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image._id} className="relative h-full">
            <img
              src={image.imageLink}
              alt="Gallery"
              className="w-full h-auto rounded"
            />
            <button
              onClick={() => handleDeleteImage(image._id)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-600 hover:text-red-800"
            >
              <AiFillDelete size={24} />
            </button>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
