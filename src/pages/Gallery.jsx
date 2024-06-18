import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { IoClose } from "react-icons/io5";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [viewMainImg, setViewMainImg] = useState(false);

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

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const buffer = 1;

    if (
      scrollTop + clientHeight >= scrollHeight - buffer &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      {viewMainImg && (
        <div className="fixed w-full h-[100vh] flex items-center justify-center top-0 left-0 z-50 bg-black/70">
          <div className="relative w-[70%] md:w-[50%] h-[80vh]">
            <IoClose
              onClick={() => setViewMainImg(false)}
              className="absolute text-[24px] bg-orange-400 cursor-pointer top-4 right-4 z-50"
            />
            <img
              src={activeImage}
              alt="Active"
              className="w-full h-full object-cover border border-white"
            />
          </div>
        </div>
      )}
      <div className="px-[4%] md:px-[8%] py-3.5 md:py-7 bg-[#F4F5F7] dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between">
        <h2 className="uppercase text-[17px] md:text-[24px] font-[700] plus-jakarta text-[#212121] dark:text-gray-400">
          Gallery
        </h2>
        <div className="flex items-center font-[500] plus-jakarta text-[12px] md:text-[13.6px]">
          <Link to="/">
            <span className="uppercase text-[#FF7004] cursor-pointer">
              Home
            </span>
          </Link>
          <span className="px-1">/</span>
          <span className="uppercase">Gallery</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image._id} className="relative">
              <img
                src={image.imageLink}
                alt="Gallery"
                className="w-full h-auto rounded shadow-md cursor-pointer"
                onClick={() => {
                  setActiveImage(image.imageLink);
                  setViewMainImg(true);
                }}
              />
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <ThreeDots color="#00BFFF" height={80} width={80} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
