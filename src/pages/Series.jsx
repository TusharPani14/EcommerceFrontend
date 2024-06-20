import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainAppContext } from "@/context/MainContext";
import {
  IoHeartCircle,
  IoStarOutline,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import parse from "html-react-parser";

const Series = () => {
  const {
    Products,
    wishlistedProducts,
    handleAddToWishlist,
    handleRemoveWishlist,
  } = useContext(MainAppContext);

  // Capture the category, subcategory, and series from URL
  const { category, subcategory, series: seriesName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);

  // Fetch all categories on component mount
  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (category && subcategory && seriesName && Products.length > 0) {
      const filtered = Products.filter(
        (product) =>
          product.mainCategory?.includes(category) &&
          product.subCategory?.includes(subcategory) &&
          product.series?.includes(seriesName)
      );
      setFilteredProducts(filtered);
    }
  }, [Products, category, subcategory, seriesName]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/admin/category`
      );
      // console.log(response.data.categories);
      findSelectedSeries(response.data?.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Find the selected series based on URL parameters
  const findSelectedSeries = (categories) => {
    for (const cat of categories) {
      if (cat.fileName === category) {
        for (const subcat of cat.subcategories) {
          if (subcat.name === subcategory) {
            for (const series of subcat.series) {
              if (series.name === seriesName) {
                setSelectedSeries(series);
                return;
              }
            }
          }
        }
      }
    }
  };

  const Stars = ({ stars }) => {
    const ratingStars = Array.from({ length: 5 }, (elem, index) => {
      return (
        <div key={index}>
          {stars >= index + 1 ? (
            <FaStar className=" dark:text-yellow-400 text-black" />
          ) : (
            <IoStarOutline className=" text-black dark:text-yellow-400 " />
          )}
        </div>
      );
    });
    return <div className=" flex items-center gap-0.5">{ratingStars}</div>;
  };

  // Utility function to convert HTML content to plain text
  const convertHtmlToText = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div>
      <div className=" px-[4%] md:px-[8%] py-1 md:py-3 bg-[#F4F5F7]  dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between ">
        {/* <h2 className="uppercase text-[17px] md:text-[24px] font-[700] plus-jakarta text-[#212121] dark:text-gray-400">
          Shop
        </h2> */}
        <div className="flex items-center font-[500] text-[#858585] raleway text-[.8461538462rem] md:text-[.8461538462rem]">
          <Link to="/">
            <span className="text-[#858585] cursor-pointer raleway">Home</span>
          </Link>
          <span className="px-1">/</span>
          <span className="capitalize">Shop</span>
          <span className="px-1">/</span>
          <span className="capitalize">{category}</span>
          <span className="px-1">/</span>
          <span className="capitalize">{subcategory}</span>
          <span className="px-1">/</span>
          <span className="capitalize">{seriesName}</span>
        </div>
      </div>

      {/* {selectedSeries && (
        <div className="p-4 text-center">
          <img
            src={selectedSeries.seriesLink}
            alt={selectedSeries.name}
            className="w-full h-auto max-w-md mx-auto"
          />
          <h3 className="text-[24px] font-bold mt-4">{selectedSeries.name}</h3>
        </div>
      )} */}

      <section className=" px-[3%] w-full mb-14 flex gap-10 mt-4 lg:mt-12 ">
        <div className=" hidden lg:block w-[40%] h-full p-2 ">
          {selectedSeries && (
            <div className="p-4 text-left">
              <img
                src={selectedSeries.seriesLink}
                alt={selectedSeries.name}
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          )}
        </div>
        <div className="w-full lg:w-[60%] h-full">
          <div className="w-full">
            {selectedSeries && (
              <div className="pb-4 text-left">
                <h3 className="text-[24px] font-bold mt-4">
                  {selectedSeries.name}
                </h3>
              </div>
            )}
          </div>
          <div className="w-full">
            {selectedSeries && (
              <div className="pb-4 text-left">
                <h3 className="text-[18px] mt-4">
                  {convertHtmlToText(selectedSeries.description)}
                </h3>
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="series_products">
              {filteredProducts.length > 0 ? (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={3}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  navigation={true}
                  className="series-slider"
                >
                  {filteredProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`relative flex flex-col items-center justify-between rounded-md p-3`}
                      >
                        {wishlistedProducts.includes(product._id) ? (
                          <IoHeart
                            onClick={() => handleRemoveWishlist(product._id)}
                            className="absolute top-4 right-4 cursor-pointer hover:text-red-500 text-[25px] text-red-500"
                          />
                        ) : (
                          <IoHeartOutline
                            onClick={() => handleAddToWishlist(product._id)}
                            className="absolute top-4 right-4 cursor-pointer hover:text-red-500 text-[25px] text-red-600"
                          />
                        )}

                        <p className=" bg-[#F9BA48] w-fit text-dark px-2 text-sm font-medium absolute top-5 left-5">
                          {product.promotional}
                        </p>
                        <Link
                          to={`/product/${product.title.replace(/\s+/g, "-")}`}
                          className="w-full h-full"
                          onClick={() => {
                            sessionStorage.setItem(
                              "productPageId",
                              JSON.stringify(product._id)
                            );
                          }}
                        >
                          <img
                            className="object-cover object-center w-full h-[200px]"
                            src={product.mainImage}
                            alt="product-img"
                          />
                        </Link>
                        <div className="flex flex-col justify-between w-full items-center">
                          <Link
                            to={`/product/${product.title.replace(
                              /\s+/g,
                              "-"
                            )}`}
                            onClick={() => {
                              sessionStorage.setItem(
                                "productPageId",
                                JSON.stringify(product._id)
                              );
                            }}
                          >
                            <p className="dark:text-dark-400 text-[#363F4D] font-[500] my-1 text-[12px] md:text-[14px] 2xl:text-[14.5px]">
                              {product.title?.slice(0, 50)}
                            </p>
                            {/* <div className="w-full flex items-center justify-center"> */}
                            {/* Assuming Stars component handles stars prop correctly */}
                            {/* <Stars
                                stars={product.avgRating ? product.avgRating : Math.floor(Math.random() * 6)}
                              />
                            </div> */}
                            <div className="flex items-center justify-center text-[13px] md:text-[14.5px] 2xl:text-[15px]">
                              <p className="font-[600] plus-jakarta dark:text-gray-400 text-[#A4A4A4]">
                                AED{" "}
                                <span className="line-through">
                                  {product.price}
                                </span>
                              </p>
                              <span className="text-[#F9BA48] font-[600] plus-jakarta ml-2">
                                AED {product.discountValue}
                              </span>
                            </div>
                          </Link>
                          {/* <Link
                            to={`/product/${product.title.replace(/\s+/g, "-")}`}
                            onClick={() => {
                              sessionStorage.setItem("productPageId", JSON.stringify(product._id));
                            }}
                            className="text-sm dark:text-black font-semibold bg-[#efefef] py-2 w-full text-center"
                          >
                            View Product
                          </Link> */}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-center">No products found in this series.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Series;
