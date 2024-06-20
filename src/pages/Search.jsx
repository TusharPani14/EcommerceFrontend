import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { IoHeart, IoStarOutline, IoHeartOutline, IoSearch } from "react-icons/io5";
import { AppContext } from "@/context/AppContext";
import { MainAppContext } from "@/context/MainContext";
import { FaStar } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const SearchPage = ({ }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isCard, setIsCard] = useState(true);
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const {
    SetIsMobileFilterOpen,
    currency,
    cart,
    setCart,
    wishlist,
    setWishlist,
  } = useContext(AppContext);
  const {
    Products,
    user,
    buyNow,
    setBuyNow,
    handleAddToWishlist,
    handleRemoveWishlist,
    setProductPageId,
  } = useContext(MainAppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWishlistedProducts(wishlist);
  }, []);

  const handleAddToCart = (productId) => {
    if (userLoggedIn) {
      addToCart(user?._id, productId, 1);
    } else {
      toast.error("You are not logged in");
    }
  };

  const addToCart = async (userId, productId, quantity) => {
    if (userLoggedIn) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/cart/addProduct`,
          {
            userId: userId || user?._id,
            productId: productId,
            quantity: quantity,
          }
        );
        toast.success("Product Added to Cart");
        // Handle success response, if needed
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error("Failed to add product to cart");
        // Handle error
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
    <div className=" w-full min-h-screen dark:bg-black flex flex-col  pb-10  ">
      <div className=" px-[4%] md:px-[8%] py-1 md:py-3 bg-[#F4F5F7]  dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between ">
        {/* <h2 className=" uppercase text-[17px] md:text-[24px] font-[700] plus-jakarta text-[#212121] dark:text-gray-400 ">
          Search
        </h2> */}
        <div className=" flex items-center font-[500] text-[#858585] raleway text-[.8461538462rem] md:text-[.8461538462rem] ">
          <Link to="/">
            <span className=" text-[#858585] cursor-pointer raleway ">
              Home
            </span>
          </Link>
          <span className=" px-1 ">/</span>
          <span className=" capitalize">Search</span>
        </div>
      </div>
      <div className=" w-full pt-2  px-[4%] md:px-[8%] xl:px-[10%]">
        <div className=" w-full sticky top-0 left-0 z-50 pt-3">
          <div className="relative pb-5">
            <input
              className="py-2.5 w-full text-black border-gray rounded-sm mb-5 px-4 pr-10" // Adjusted class to include space for icon
              type="text"
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              autoComplete="off"
              id="search"
              placeholder="Search your favourite products"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <IoSearch
                className="absolute top-2 right-3 cursor-pointer hover:text-red-500 text-[25px] text-red-500"
              />
            </div>
          </div>

        </div>
        <div className=" w-full h-full ">
          {loading ? (
            <div className=" w-full flex items-center justify-center py-3">
              <img
                src="/Images/loader.svg"
                alt="loading..."
                className=" object-contain w-[60px] h-[60px]"
              />
            </div>
          ) : (
            <div className=" w-full h-full grid-cols-2 sm:grid-cols-3 grid lg:grid-cols-5 gap-5 ">
              {Products.filter((e) => {
                return (
                  e?.approved &&
                  (
                    e.title.toLowerCase() ||
                    i.mainCategory.toLowerCase() ||
                    i.sku.toLowerCase() ||
                    i.superCategory.toLowerCase()
                  ).includes(search.toLowerCase())
                );
              }).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={` relative ${isCard
                      ? "flex flex-col items-center justify-between pb-5"
                      : " col-span-2 gap-3 flex border border-gray-300 dark:border-gray-700 rounded-md p-3 "
                      }  `}
                  >
                    {wishlistedProducts.find(
                      (i) => i?.productId?._id === item._id
                    ) ? (
                      <IoHeart
                        onClick={() => handleRemoveWishlist(item?._id)}
                        className="absolute top-3 right-3 cursor-pointer hover:text-red-500 text-[25px] text-red-500"
                      />
                    ) : (
                      <IoHeartOutline
                        onClick={() => handleAddToWishlist(item?._id)}
                        className="absolute top-3 right-3 cursor-pointer hover:text-red-500 text-[25px] text-red-600"
                      />
                    )}
                    <p className=" bg-[#F9BA48] w-fit text-dark px-2 text-sm font-medium absolute top-3 left-3">
                      {item.promotional}
                    </p>
                    <Link
                      to={`/product/${item?.title
                        ?.replace(/\//g, "")
                        .replace(/\s+/g, "-")}`}
                      onClick={() => {
                        sessionStorage.setItem(
                          "productPageId",
                          JSON.stringify(item?._id)
                        );
                        setProductPageId(item?._id);
                      }}
                    >
                      <img
                        className={` object-cover object-center w-full ${isCard
                          ? "w-full "
                          : " row-span-2 col-span-1"
                          } object-cover `}
                        src={item.mainImage}
                        // src={"/Images/armchair.png"}
                        alt="product-img"
                      />

                    </Link>
                    <div className={` w-full ${isCard ? "text-center" : ""} `}>
                      <Link
                        to={`/product/${item?.title
                          ?.replace(/\//g, "")
                          .replace(/\s+/g, "-")}`}
                        onClick={() => {
                          sessionStorage.setItem(
                            "productPageId",
                            JSON.stringify(item?._id)
                          );
                          setitemductPageId(item?._id);
                        }}
                        item
                      >
                        <p
                          className={`dark:text-gray-400 text-[#363F4D] ${isCard
                            ? "font-[500] plus-jakarta my-2 text-[12px] md:text-[14px] 2xl:text-[14.5px]"
                            : "font-[500] plus-jakarta my-2 text-[13px] md:text-[19px] 2xl:text-[16px]"
                            }`}
                        >
                          {item.title?.slice(0, 50)}
                        </p>
                        {/* <div className="w-full flex items-center justify-center">
                          <Stars
                            stars={
                              item?.avgRating
                                ? item?.avgRating
                                : Math.floor(Math.random() * 6)
                            }
                          />
                        </div> */}
                        <div
                          className={` flex items-center  ${isCard ? "justify-center" : ""
                            } text-[13px] md:text[15px] 2xl:text-[16px] `}
                        >
                          <p className=" font-[600] plus-jakarta dark:text-gray-400 text-[#A4A4A4]  ">
                            {currency}{" "}
                            <span className=" line-through">
                              {currency === "OMR"
                                ? (item.price * 0.1).toFixed(2)
                                : item.price}
                            </span>
                            <span className="text-[#F9BA48] font-[600] plus-jakarta ml-2 ">
                              {currency === "OMR"
                                ? (item.discountValue * 0.1).toFixed(2)
                                : item.discountValue}
                            </span>
                          </p>
                        </div>
                      </Link>
                      {/* <Link
                        to={`/product/${item?.title
                          ?.replace(/\//g, "")
                          .replace(/\s+/g, "-")}`}
                        onClick={() => {
                          sessionStorage.setItem(
                            "productPageId",
                            JSON.stringify(item?._id)
                          );
                          setProductPageId(item?._id);
                        }}
                      >
                        <button
                          className={` text-sm dark:text-black font-semibold bg-[#efefef]  ${isCard ? "py-2 w-full" : " h-fit py-2 px-6"
                            }`}
                        >
                          View Product
                        </button>
                      </Link> */}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
