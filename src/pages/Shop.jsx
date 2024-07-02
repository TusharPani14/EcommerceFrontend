import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MultiRangeSlider from "multi-range-slider-react";
import { AiOutlineBars } from "react-icons/ai";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { AppContext } from "../context/AppContext";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import axios from "axios";
import { MainAppContext } from "@/context/MainContext";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const sortMethods = [
  {
    id: 1,
    name: "Sort By Popularity",
    parameter: "rating",
  },
  {
    id: 2,
    name: "Price(Low to High)",
    parameter: "price",
  },
  {
    id: 3,
    name: "Price(High to Low)",
    parameter: "price",
  },
  {
    id: 4,
    name: "A to Z",
    parameter: "name",
  },
  {
    id: 5,
    name: "Z to A",
    parameter: "name",
  },
];

const Shop = () => {
  const { filterCategories, setFilterCategories, filterColor, setFilterColor } =
    useContext(AppContext);

  const {
    wishlistedProducts,
    setWishlistedProducts,
    handleAddToWishlist,
    setCartCount,
    minValue,
    set_minValue,
    maxValue,
    set_maxValue,
    maxPrice,
    setMaxPrice,
    Products,
    handleRemoveWishlist,
    setProductPageId,
  } = useContext(MainAppContext);
  const [isCard, setIsCard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState(1);
  const [banners, setBanners] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  // const [Products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const [itemsPerPage, setItemsPerPage] = useState(12);
  let { category } = useParams();
  category = category.replace(/-/g, " ");

  const { SetIsMobileFilterOpen, currency, wishlist } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [openStaticCategory, setOpenStaticCategory] = useState(null);
  const [groupedCategories, setGroupedCategories] = useState({});
  const staticMainCategories = [
    "Office",
    "Living Room",
    "BedRoom",
    "Kids Room Furniture",
    "Outdoor",
    "Hospitality",
    "University Furniture",
    "Study And Home Office",
    "Washroom Furniture",
  ];

  // Handler to toggle main dropdown visibility
  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Handler to toggle subcategory dropdown visibility
  const handleSubcategoryToggle = (index) => {
    setOpenSubcategory(openSubcategory === index ? null : index);
  };
  const handleInput = (e) => {
    set_minValue(Number(e.minValue));
    set_maxValue(Number(e.maxValue));
  };
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/category`
      );
      // console.log(response.data.categories);
      setCategories(response.data?.categories);
      // // // console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCategories();
    getAllBanners();
    const user = JSON.parse(localStorage.getItem("user"));
    setUserDetails(user);
    setSortedArray(Products);
    const maxPrice = Products.reduce((max, product) => {
      return product.price > max ? product.price : max;
    }, 0);
    setMaxPrice(Number(maxPrice));
    set_maxValue(Number(maxPrice));

    setFilterCategories(category ? category.toLowerCase() : "all");
    setWishlistedProducts(wishlist);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [category, Products]);

  useEffect(() => {
    setFilterCategories(category ? category.toLowerCase() : "all");
  }, [category]);

  const sortProducts = (method) => {
    switch (method) {
      case "2":
        return [...Products].sort((a, b) => a.price - b.price);
      case "3":
        return [...Products].sort((a, b) => b.price - a.price);
      case "4":
        return [...Products].sort((a, b) => a.title.localeCompare(b.title));
      case "5":
        return [...Products].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return [...Products].sort(
          (a, b) => Number(b.avgRating) - Number(a.avgRating)
        );
    }
  };

  useEffect(() => {
    setSortedArray(sortProducts(sortMethod));
  }, [Products, sortMethod]);

  // const Stars = ({ stars }) => {
  //   const ratingStars = Array.from({ length: 5 }, (elem, index) => {
  //     return (
  //       <div key={index}>
  //         {stars >= index + 1 ? (
  //           <FaStar className=" dark:text-yellow-400 text-black" />
  //         ) : (
  //           <IoStarOutline className=" text-black dark:text-yellow-400 " />
  //         )}
  //       </div>
  //     );
  //   });
  //   return <div className=" flex items-center gap-0.5">{ratingStars}</div>;
  // };

  const getAllBanners = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/banner`
      );
      setBanners(response.data?.banners);
      // // // // console.log(response.data.banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      const grouped = groupCategoriesByStaticMainCategory(categories);
      setGroupedCategories(grouped);
    }
  }, [categories]);

  const groupCategoriesByStaticMainCategory = (categories) => {
    const groupedCategories = {};

    categories?.forEach((category) => {
      const { staticMainCategory } = category;

      // Check if staticMainCategory exists and is an array
      if (Array.isArray(staticMainCategory)) {
        staticMainCategory.forEach((staticCategory) => {
          if (!groupedCategories[staticCategory]) {
            groupedCategories[staticCategory] = [];
          }

          groupedCategories[staticCategory].push(category);
        });
      } else {
        console.warn(
          `Category ${category} does not have a valid staticMainCategory.`
        );
        // Handle or log the situation where staticMainCategory is not an array
      }
    });

    return groupedCategories;
  };

  return (
    <>
      <div className=" ">
        <div className=" px-[4%] md:px-[8%] py-1 md:py-3 bg-[#F4F5F7]  dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between ">
          {/* <h2 className=" uppercase text-[17px] md:text-[24px] font-[700] plus-jakarta text-[#212121] dark:text-gray-400 ">
            Shop
          </h2> */}
          <div className="flex items-center font-[500] text-[#858585] raleway text-[.8461538462rem] md:text-[.8461538462rem]">
            <Link to="/">
              <span className="text-[#858585] cursor-pointer raleway">
                Home
              </span>
            </Link>
            <span className=" px-1 ">/</span>
            <span className="capitalize">Shop</span>
          </div>
        </div>
        {loading ? (
          <div className=" w-full flex items-center justify-center py-3">
            <img
              src="/Images/loader.svg"
              alt="loading..."
              className=" object-contain w-[60px] h-[60px]"
            />
          </div>
        ) : (
          <section className=" px-[3%] w-full mb-14 flex gap-10 mt-4 lg:mt-12 ">
            <div className=" hidden lg:block w-[18%] h-full px-2.5 pb-2.5 ">
              <p className=" pb-2.5 dark:text-gray-400 text-[#363F4D] font-[700] plus-jakarta text-[13px] md:text-[14.5px] 2xl:text-[16px] ">
                CATEGORIES
              </p>

              {staticMainCategories.map((staticCategory, staticIndex) => (
                <div key={staticIndex} className="w-full relative">
                  <Menu>
                    <Menu.Button
                      className="w-full flex items-center justify-between capitalize py-2.5 dark:text-dark-500 text-dark-500 font-[500] plus-jakarta text-[13px] md:text-[13px] 2xl:text-[14px]"
                      onClick={() =>
                        setOpenStaticCategory(
                          openStaticCategory === staticIndex
                            ? null
                            : staticIndex
                        )
                      }
                    >
                      {staticCategory}
                      <ChevronDownIcon className="w-[15px]" />
                    </Menu.Button>
                    <Transition
                      show={openStaticCategory === staticIndex}
                      as={React.Fragment}
                      enter="transition ease-out duration-100 transform"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75 transform"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="flex flex-col text-[13px] md:text-[13px] 2xl:text-[14px] dark:text-dark-600 pl-2 gap-2 w-full">
                        {groupedCategories[staticCategory]
                          ?.filter((category) => category.collectionSelected)
                          .map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                              <Menu>
                                <Menu.Button
                                  className="w-full flex items-center justify-between capitalize py-2.5"
                                  onClick={() =>
                                    setOpenCategory(
                                      openCategory === categoryIndex
                                        ? null
                                        : categoryIndex
                                    )
                                  }
                                >
                                  <Link
                                    to={`/product-category/${category.slug}`}
                                    onClick={() => {
                                      setOpenStaticCategory(null);
                                      setOpenCategory(null);
                                    }}
                                  >
                                    {category.fileName}
                                  </Link>
                                  <ChevronDownIcon
                                    className="w-[15px]"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenCategory(
                                        openCategory === categoryIndex
                                          ? null
                                          : categoryIndex
                                      );
                                    }}
                                  />
                                </Menu.Button>
                                <Transition
                                  show={openCategory === categoryIndex}
                                  as={React.Fragment}
                                  enter="transition ease-out duration-100 transform"
                                  enterFrom="opacity-0 scale-95"
                                  enterTo="opacity-100 scale-100"
                                  leave="transition ease-in duration-75 transform"
                                  leaveFrom="opacity-100 scale-100"
                                  leaveTo="opacity-0 scale-95"
                                >
                                  <Menu.Items className="flex flex-col text-[13px] md:text-[13px] 2xl:text-[14px] dark:text-dark-600 bg-white pl-2 gap-2 w-full">
                                    {category.subcategories
                                      .filter(
                                        (subcategory) =>
                                          subcategory.collectionSelected
                                      )
                                      .map((subcategory, subIndex) => (
                                        <Menu key={subIndex}>
                                          <Menu.Button
                                            className="w-full flex items-center justify-between capitalize py-2.5"
                                            onClick={() =>
                                              setOpenSubcategory(
                                                openSubcategory === subIndex
                                                  ? null
                                                  : subIndex
                                              )
                                            }
                                          >
                                            <Link
                                              to={`/product-category/${category.slug}/${subcategory.slug}`}
                                              onClick={() => {
                                                setOpenStaticCategory(null);
                                                setOpenCategory(null);
                                                setOpenSubcategory(null);
                                              }}
                                            >
                                              {subcategory.name}
                                            </Link>
                                            <ChevronDownIcon
                                              className="w-[15px]"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenSubcategory(
                                                  openSubcategory === subIndex
                                                    ? null
                                                    : subIndex
                                                );
                                              }}
                                            />
                                          </Menu.Button>
                                          <Transition
                                            show={openSubcategory === subIndex}
                                            as={React.Fragment}
                                            enter="transition ease-out duration-100 transform"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="transition ease-in duration-75 transform"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                          >
                                            <Menu.Items className="flex flex-col text-[13px] md:text-[13px] 2xl:text-[14px] dark:text-dark-600 bg-white pl-2 gap-2 w-full">
                                              {subcategory.series
                                                .filter(
                                                  (seriesItem) =>
                                                    seriesItem.dialogSelected
                                                )
                                                .map(
                                                  (seriesItem, seriesIndex) => (
                                                    <Link
                                                      key={seriesIndex}
                                                      to={`/product-category/${encodeURIComponent(
                                                        category.slug
                                                      )}/${encodeURIComponent(
                                                        subcategory.slug
                                                      )}/${encodeURIComponent(
                                                        seriesItem.slug
                                                      )}`}
                                                      onClick={() => {
                                                        setCategories(
                                                          category.fileName.toLowerCase()
                                                        );
                                                        setOpenStaticCategory(
                                                          null
                                                        );
                                                        setOpenCategory(null);
                                                        setOpenSubcategory(
                                                          null
                                                        );
                                                      }}
                                                    >
                                                      <p className="py-2.5 capitalize">
                                                        {seriesItem.name}
                                                      </p>
                                                    </Link>
                                                  )
                                                )}
                                            </Menu.Items>
                                          </Transition>
                                        </Menu>
                                      ))}
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ))}
              <div className=" py-5">
                <p className="  border-b-[1px] pt-2.5 border-[#E5E5E5] text-[#363F4D] font-[700] plus-jakarta text-[13px] md:text-[14.5px] 2xl:text-[16px] ">
                  FILTER BY PRICE
                </p>
                <MultiRangeSlider
                  min={0}
                  max={maxPrice}
                  step={5}
                  label="false"
                  ruler="false"
                  style={{ border: "none", outline: "none", boxShadow: "none" }}
                  barInnerColor="#ff9800"
                  barRightColor="#cccccc"
                  barLeftColor="#cccccc"
                  thumbLeftColor="#ff9800"
                  thumbRightColor="#ff9800"
                  minValue={minValue}
                  maxValue={maxValue}
                  onInput={(e) => {
                    handleInput(e);
                  }}
                />
                <p className="  border-b-[1px] border-[#E5E5E5] text-[#363F4D] font-[700] plus-jakarta text-[12.5px] md:text-[14px] 2xl:text-[15px] ">
                  Price: {currency}{" "}
                  {currency === "OMR" ? minValue * 0.1 : minValue} - {currency}{" "}
                  {currency === "OMR" ? maxValue * 0.1 : maxValue}
                </p>
              </div>

              <button
                onClick={() => {
                  setFilterColor("");
                  setFilterCategories("");
                  set_minValue(0);
                  set_maxValue(maxPrice);
                }}
                className=" my-2 bg-gray-600 text-white text-sm px-4 py-2 "
              >
                {" "}
                Clear Filters
              </button>
            </div>
            <div className="w-full lg:w-[82%] h-full">
              <div className="max-w-screen-lg mx-auto h-[150px] relative">
                <div className="relative w-full flex justify-center items-center">
                  <img
                    className="h-full w-full object-contain mx-auto"
                    src={
                      banners.find((banner) => banner.fileName === "Banner2")
                        ?.filePath
                        ? banners.find(
                            (banner) => banner.fileName === "Banner2"
                          ).filePath
                        : "/Images/shop-banner.png"
                    }
                    alt="product-img"
                  />
                  {banners.find((banner) => banner.fileName === "Banner2") && (
                    <div className="absolute bottom-1 left-0 right-0 p-4 flex justify-between items-end w-full">
                      <div className="p-2">
                        {banners.find((banner) => banner.fileName === "Banner2")
                          .title && (
                          <h2 className="text-xl md:text-2xl font-bold text-black">
                            {
                              banners.find(
                                (banner) => banner.fileName === "Banner2"
                              ).title
                            }
                          </h2>
                        )}
                        {banners.find((banner) => banner.fileName === "Banner2")
                          .description && (
                          <p className="text-sm md:text-base text-black">
                            {
                              banners.find(
                                (banner) => banner.fileName === "Banner2"
                              ).description
                            }
                          </p>
                        )}
                      </div>
                      {banners.find((banner) => banner.fileName === "Banner2")
                        .buttonContent && (
                        <a
                          href={
                            banners
                              .find((banner) => banner.fileName === "Banner2")
                              .redirectUrl.startsWith("http")
                              ? banners.find(
                                  (banner) => banner.fileName === "Banner2"
                                ).redirectUrl
                              : `${
                                  banners.find(
                                    (banner) => banner.fileName === "Banner2"
                                  ).redirectUrl
                                }`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-3 py-1 rounded shadow-md hover:bg-blue-700 transition duration-300"
                        >
                          {
                            banners.find(
                              (banner) => banner.fileName === "Banner2"
                            ).buttonContent
                          }
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className=" w-full flex lg:grid grid-cols-2 gap-2 items-center justify-between py-4">
                <div className=" w-full hidden lg:flex gap-2 items-center">
                  <HiMiniSquares2X2
                    onClick={() => {
                      setIsCard(true);
                    }}
                    className={` text-[19px] cursor-pointer ${
                      isCard && "text-[#F9BA48]"
                    } `}
                  />
                  <AiOutlineBars
                    onClick={() => {
                      setIsCard(false);
                    }}
                    className={` text-[19px] cursor-pointer pointer ${
                      !isCard && "text-[#F9BA48]"
                    } `}
                  />
                </div>
                <div className=" flex items-center justify-end pr-3 py-2.5 text-[#7A7A7A] font-[400] text-[12px] md:text-[13.5px] 2xl:text-[14px] ">
                  <label htmlFor="sort-method">Sort By: </label>
                  <select
                    name="sort-method"
                    id="sort-method"
                    className="text-[14px] p-1 dark:bg-transparent dark:border dark:border-gray-700   "
                    value={sortMethod}
                    onChange={(e) => {
                      setSortMethod(e.target.value);
                    }}
                  >
                    {sortMethods.map((e, index) => {
                      return (
                        <option
                          className=" p-2 dark:bg-black "
                          key={index}
                          value={e.id}
                        >
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p
                  onClick={() => {
                    SetIsMobileFilterOpen(true);
                  }}
                  className=" lg:hidden underline text-sm cursor-pointer "
                >
                  Filters
                </p>
              </div>
              {loading ? (
                <div className=" w-full flex items-center justify-center py-3">
                  <img
                    src="/Images/loader.svg"
                    alt="loading..."
                    className=" object-contain w-[60px] h-[60px]"
                  />
                </div>
              ) : (
                <>
                  <div className="w-full grid-cols-2 sm:grid-cols-3 grid lg:grid-cols-4 gap-5">
                    {sortedArray
                      .filter((product) => {
                        const isPriceInRange =
                          Number(product.price) > minValue &&
                          Number(product.price) < maxValue;
                        const matchesCategory =
                          filterCategories === "all" ||
                          product?.mainCategory?.some(
                            (cat) =>
                              cat.toLowerCase() ===
                              filterCategories.toLowerCase()
                          );

                        return (
                          product?.approved && isPriceInRange && matchesCategory
                        );
                      })
                      ?.slice(0, itemsPerPage)
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`relative ${
                            isCard
                              ? "flex flex-col items-center justify-between"
                              : "col-span-2 gap-3 flex border border-gray-300 dark:border-gray-700 rounded-md p-3"
                          } pb-7`}
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
                          <Link
                            to={`/product/${item?.title.replace(/\s+/g, "-")}`}
                            onClick={() => {
                              sessionStorage.setItem(
                                "productPageId",
                                JSON.stringify(item?._id)
                              );
                              setProductPageId(item?._id);
                            }}
                            className="w-full h-full"
                          >
                            <img
                              className={`object-cover object-center w-full ${
                                isCard
                                  ? "w-full h-[200px]"
                                  : "h-[150px] row-span-2 col-span-1"
                              }`}
                              src={item.mainImage}
                              alt="product-img"
                            />
                          </Link>
                          <div
                            className={`w-full ${
                              isCard
                                ? "text-center"
                                : "flex flex-col justify-between"
                            }`}
                          >
                            <Link
                              to={`/product/${item?.title.replace(
                                /\s+/g,
                                "-"
                              )}`}
                              onClick={() => {
                                sessionStorage.setItem(
                                  "productPageId",
                                  JSON.stringify(item?._id)
                                );
                                setProductPageId(item._id);
                              }}
                            >
                              <p
                                className={`dark:text-gray-400 text-[#363F4D] ${
                                  isCard
                                    ? "font-[500] plus-jakarta my-2 text-[12px] md:text-[14px] 2xl:text-[14.5px]"
                                    : "font-[500] plus-jakarta my-2 text-[13px] md:text-[19px] 2xl:text-[16px]"
                                }`}
                              >
                                {item.title?.slice(0, 50)}
                              </p>
                              {/* <div
                                className={`w-full flex ${isCard ? "items-center justify-center" : ""
                                  }`}
                              >
                                <Stars
                                  stars={
                                    item?.avgRating
                                      ? item?.avgRating
                                      : Math.floor(Math.random() * 6)
                                  }
                                />
                              </div> */}
                              <div
                                className={`flex items-center ${
                                  isCard ? "justify-center" : ""
                                } text-[13px] md:text-[14.5px] 2xl:text-[15px] my-2`}
                              >
                                <p className="font-[500] plus-jakarta dark:text-gray-400 text-[#A4A4A4]">
                                  {currency}{" "}
                                  <span className="line-through">
                                    {currency === "OMR"
                                      ? (item.price * 0.1).toFixed(2)
                                      : item.price}
                                  </span>
                                </p>
                                <span className="text-[#F9BA48] font-[600] plus-jakarta ml-2">
                                  {currency === "OMR"
                                    ? (item.discountValue * 0.1).toFixed(2)
                                    : item.discountValue}
                                </span>

                                <p className=" bg-[#F9BA48] w-fit text-dark px-2 text-sm font-medium absolute top-3 left-3">
                                  {item.promotional}
                                </p>
                              </div>
                            </Link>
                            <Link
                              to={`/product/${item?.title.replace(
                                /\s+/g,
                                "-"
                              )}`}
                              onClick={() => {
                                sessionStorage.setItem(
                                  "productPageId",
                                  JSON.stringify(item?._id)
                                );
                                setProductPageId(item?._id);
                              }}
                            >
                              {/* <button
                                className={`text-sm dark:text-black font-semibold bg-[#efefef] ${isCard
                                  ? "py-2 w-full"
                                  : "h-fit py-2 w-full px-6"
                                  }`}
                              >
                                View Product
                              </button> */}
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                  {sortedArray?.filter((e) => {
                    const isPriceInRange =
                      Number(e.price) > minValue && Number(e.price) < maxValue;
                    const matchesCategory =
                      filterCategories === "all" ||
                      e?.mainCategory?.some(
                        (cat) =>
                          cat.toLowerCase() === filterCategories.toLowerCase()
                      );

                    return e?.approved && isPriceInRange && matchesCategory;
                  })?.length > itemsPerPage ? (
                    <div
                      onClick={() => setItemsPerPage((prev) => prev + 8)}
                      className="p-3 cursor-pointer border-t bg-gray-200 text-gray-700 font-semibold border-b border-gray-300 my-2 flex items-center justify-center gap-3"
                    >
                      See More
                    </div>
                  ) : (
                    <p className="mt-10 text-center">
                      No More Products Available
                    </p>
                  )}
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Shop;
