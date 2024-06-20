import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainAppContext } from "@/context/MainContext";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Subcategory = () => {
  const {
    Products,
    wishlistedProducts,
    handleAddToWishlist,
    handleRemoveWishlist,
  } = useContext(MainAppContext);

  // Capture the category, subcategory from URL
  const { category, subcategory } = useParams();
  const [seriesList, setSeriesList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({});

  // Fetch series for the subcategory on component mount
  useEffect(() => {
    fetchSeriesForSubcategory();
  }, [category, subcategory]);

  useEffect(() => {
    if (Products.length > 0 && seriesList.length > 0) {
      const seriesProducts = seriesList.reduce((acc, series) => {
        const filtered = Products.filter(
          (product) =>
            product.mainCategory?.includes(category) &&
            product.subCategory?.includes(subcategory) &&
            product.series?.includes(series.name)
        );
        acc[series.name] = filtered;
        return acc;
      }, {});
      setFilteredProducts(seriesProducts);
    }
  }, [Products, category, subcategory, seriesList]);

  const fetchSeriesForSubcategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/admin/category`
      );
      const categories = response.data.categories;
      findSeries(categories);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  const findSeries = (categories) => {
    for (const cat of categories) {
      if (cat.fileName === category) {
        for (const subcat of cat.subcategories) {
          if (subcat.name === subcategory) {
            setSeriesList(subcat.series);
            break;
          }
        }
      }
    }
  };

  const convertHtmlToText = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div>
      <div className=" px-[4%] md:px-[8%] py-1 md:py-3 bg-[#F4F5F7]  dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between ">
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
        </div>
      </div>

      {seriesList.map((series) => (
        <section
          key={series.name}
          className=" px-[3%] w-full mb-14 flex gap-10 mt-4 lg:mt-12 "
        >
          <div className=" hidden lg:block w-[40%] h-full p-2 ">
            <div className="p-4 pr-0 pt-0 text-left">
              <img
                src={series.seriesLink}
                alt={series.name}
                className="w-full h-auto mx-auto"
              />
            </div>
          </div>
          <div className="w-full lg:w-[60%] h-full">
            <div className="w-full">
              <div className="pb-4 text-left">
                <Link
                  to={`/shop/${category}/${subcategory}/${series.name}`}
                  className="text-[34px] text-[#484848] raleway font-bold mt-4 cursor-pointer"
                >
                  {series.name}
                </Link>
                <h3 className="text-[17px] w-[100%] raleway font-[400] mt-4">
                  {convertHtmlToText(series.description)}
                </h3>
              </div>
            </div>
            <div className="w-full">
              <div className="series_products">
                {filteredProducts[series.name]?.length > 0 ? (
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
                    {filteredProducts[series.name].map((product, index) => (
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

                          <p className=" bg-[#F9BA48] w-fit text-dark px-2 raleway text-[13px] font-medium absolute top-5 left-5">
                            {product.promotional}
                          </p>
                          <Link
                            to={`/product/${product.title.replace(
                              /\s+/g,
                              "-"
                            )}`}
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
                              <p className="dark:text-dark-400 text-[#363F4D] font-[500] raleway my-1 text-[12px] md:text-[14px] 2xl:text-[14.5px]">
                                {product.title?.slice(0, 50)}
                              </p>
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
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-center">
                    No products found in this series.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Subcategory;
