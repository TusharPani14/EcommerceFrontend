import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainAppContext } from "@/context/MainContext";
import { IoHeartCircle, IoStarOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import axios from "axios";

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

  return (
    <div>
      <div className="px-[4%] md:px-[8%] py-3.5 md:py-7 bg-[#F4F5F7] dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between">
        <h2 className="uppercase text-[17px] md:text-[24px] font-[700] plus-jakarta text-[#212121] dark:text-gray-400">
          Series
        </h2>
        <div className="flex items-center font-[500] plus-jakarta text-[12px] md:text-[13.6px]">
          <Link to="/">
            <span className="uppercase text-[#FF7004] cursor-pointer">
              Home
            </span>
          </Link>
          <span className="px-1">/</span>
          <span className="uppercase">Series</span>
        </div>
      </div>

      {selectedSeries && (
        <div className="p-4 text-center">
          <img
            src={selectedSeries.seriesLink}
            alt={selectedSeries.name}
            className="w-full h-auto max-w-md mx-auto"
          />
          <h3 className="text-[24px] font-bold mt-4">{selectedSeries.name}</h3>
        </div>
      )}

      <div className="p-4">
        {filteredProducts.length > 0 ? (
          <div className="w-full grid-cols-2 sm:grid-cols-3 grid lg:grid-cols-4 gap-5">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-between border-gray-300 dark:border-gray-700 rounded-md p-3 shadow shadow-black/30`}
              >
                {wishlistedProducts.includes(product._id) ? (
                  <IoHeartCircle
                    onClick={() => handleRemoveWishlist(product._id)}
                    className="absolute top-3 right-3 cursor-pointer text-[25px] text-red-500"
                  />
                ) : (
                  <IoHeartCircle
                    onClick={() => handleAddToWishlist(product._id)}
                    className="absolute top-3 right-3 cursor-pointer text-[25px] text-gray-600"
                  />
                )}
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
                    to={`/product/${product.title.replace(/\s+/g, "-")}`}
                    onClick={() => {
                      sessionStorage.setItem("productPageId", product._id);
                    }}
                  >
                    <p className="dark:text-gray-400 text-[#363F4D] font-[600] my-1 text-[12px] md:text-[14px] 2xl:text-[14.5px]">
                      {product.title?.slice(0, 50)}
                    </p>
                    <div className="w-full flex items-center justify-center">
                      <Stars
                        stars={
                          product.avgRating
                            ? product.avgRating
                            : Math.floor(Math.random() * 6)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-center text-[13px] md:text-[14.5px] 2xl:text-[15px]">
                      <p className="font-[600] plus-jakarta dark:text-gray-400 text-[#A4A4A4]">
                        AED{" "}
                        <span className="line-through">{product.price}</span>
                      </p>
                      <span className="text-[#F9BA48] font-[600] plus-jakarta ml-2">
                        AED {product.discountValue}
                      </span>
                    </div>
                  </Link>
                  <Link
                    to={`/product/${product.title.replace(/\s+/g, "-")}`}
                    onClick={() => {
                      sessionStorage.setItem("productPageId", product._id);
                    }}
                    className="text-sm dark:text-black font-semibold bg-[#efefef] py-2 w-full text-center"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products found in this series.</p>
        )}
      </div>
    </div>
  );
};

export default Series;
