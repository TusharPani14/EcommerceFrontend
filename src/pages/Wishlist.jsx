import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { IoTrash } from "react-icons/io5";

import axios from "axios";
import { MainAppContext } from "@/context/MainContext";

const WishlistData = [
  {
    id: 1,
    image: "/Images/pan.png",
    name: "Cillum dolore tortor nisl fermentum",
    price: "29.00",
    quantity: 1,
  },
  {
    id: 1,
    image: "/Images/pan.png",
    name: "Cillum dolore tortor nisl fermentum",
    price: "29.00",
    quantity: 1,
  },
  {
    id: 1,
    image: "/Images/pan.png",
    name: "Cillum dolore tortor nisl fermentum",
    price: "29.00",
    quantity: 1,
  },
  {
    id: 1,
    image: "/Images/pan.png",
    name: "Cillum dolore tortor nisl fermentum",
    price: "29.00",
    quantity: 1,
  },
];

const WishList = () => {
  const { currency, wishlist, setWishlist } = useContext(AppContext);
  const { handleRemoveWishlist, wishlistedProducts, setProductPageId } =
    useContext(MainAppContext);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const user = JSON.parse(localStorage.getItem("user"));
    setUserDetails(user);
    // console.log(wishlistedProducts);
    // getWishlist(user?._id);
  }, []);
  // const getWishlist = async (userId) => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_SERVER_URL}/wishlist/${
  //         userDetails?._id || userId
  //       }`
  //     );
  //     setWishlistedProducts(response?.data?.wishlist?.products);
  //     // console.log(response.data);
  //     // Handle success response, if needed
  //   } catch (error) {
  //     console.error("Error Fetching Cart", error);
  //   }
  // };

  return (
    <>
      <div className=" ">
        <div className=" px-[4%] md:px-[8%] py-1 md:py-3 bg-[#F4F5F7]  dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between ">
          {/* <h2 className=" uppercase text-[17px] md:text-[24px] font-[700] plus-jakarta text-[#212121] dark:text-gray-400 ">
            Wishlist
          </h2> */}
          <div className=" flex items-center font-[500] text-[#858585] raleway text-[.8461538462rem] md:text-[.8461538462rem] ">
            <Link to="/">
              <span className="text-[#858585] cursor-pointer raleway ">
                Home
              </span>
            </Link>
            <span className=" px-1 ">/</span>
            <span className=" capitalize">Wishlist</span>
          </div>
        </div>

        <section className="  px-[2%] xl:px-[8%] mt-4 md:mt-14 pb-10">
          {wishlistedProducts?.length !== 0 ? (
            <div className="w-full flex items-center justify-center">
              <table className=" w-full xl:w-[100%] hidden md:table table_striped">
                <thead className="w-full">
                  <tr className="w-full text-[#363F4D] font-[700] plus-jakarta text-[13px] md:text-[15px] 2xl:text-[16px] bg-[#F2F2F2]">
                    <th className="py-2" width="20%">Image</th>
                    <th className="py-2" width="60%">Product</th>
                    {/* <th className="py-2" width="10%">Price</th> */}
                    <th className="py-2" width="20%">Remove</th>
                  </tr>
                </thead>
                {/* {// console.log(wishlistedProducts)} */}
                <tbody className="w-full">
                  {wishlistedProducts?.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="flex items-center mt-1 justify-center py-4">
                          <Link
                            key={index}
                            to={`/product/${item?.productId?.title
                              ?.replace(/\//g, "")
                              .replace(/\s+/g, "-")}`}
                            onClick={() => {
                              setProductPageId(item?.productId?._id);
                            }}
                          >
                            <img
                              className="h-[70px] d:h-[90px]  2xl:w-[110px] object-cover"
                              src={`${import.meta.env.VITE_SERVER_URL
                                }/${item.productId?.mainImage.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                              alt="product-img"
                            />
                          </Link>
                        </td>
                        <td className="text-left text-[14px]">
                          <Link
                            key={index}
                            to={`/product/${item?.productId?.title
                              ?.replace(/\//g, "")
                              .replace(/\s+/g, "-")}`}
                            onClick={() => {
                              sessionStorage.setItem(
                                "productPageId",
                                JSON.stringify(item?.productId?._id)
                              );
                              setProductPageId(item?.productId?._id);
                            }}
                          >
                            {item.productId?.title}
                            <p className="text-[#F9BA48]">{item?.productId?.currency} {item?.productId?.price}</p>
                          </Link>
                        </td>
                        {/* <td className="text-center text-[14px]">

                        </td> */}
                        {/* <td className="text-center">
                          <input
                            className="text-center w-[40px] dark:bg-transparent"
                            type="number"
                            value={item?.quantity}
                          />
                        </td> */}
                        {/* <td className="text-center">
                          {parseFloat(item?.price) * item?.quantity}
                        </td> */}
                        <td
                          onClick={() => {
                            handleRemoveWishlist(item.productId?._id);
                            // const newArray = wishlistedProducts.filter(
                            //   (obj) =>
                            //     obj?.productId?.id !== item?.productId?.id
                            // );
                            // setWishlist(newArray);
                            // setWishlistedProducts(newArray);
                            // toast.error("Product Removed from Wishlist");
                          }}
                          className="text-center cursor-pointer flex items-center justify-center"
                        >
                          <IoTrash
                            className=" hover:text-red-500 text-[25px] text-red-500"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className=" flex flex-col md:hidden">
                {wishlistedProducts?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" w-[100%] grid grid-cols-4 gap-2 p-1 mb-2.5 bg-gray-300 "
                    >
                      <img
                        className=" inline-block col-span-1 h-full md:h-[90px] 2xl:w-[110px] object-cover "
                        src={item?.productId?.mainImage}
                        alt="product-img"
                      />
                      <div className=" col-span-3 flex flex-col text-[13px] ">
                        <p className=" font-semibold">
                          {item?.productId?.title}
                        </p>
                        <p className=" ">
                          {item?.productId?.description?.slice(0, 10)}
                        </p>
                        <p className=" font-bold">
                          {currency}{" "}
                          {currency === "OMR"
                            ? (item.productId.price * 0.1).toFixed(2)
                            : item.productId.price}
                        </p>
                        {/* <p className="">
                          <input
                            className=" w-[40px] "
                            type="number"
                            value={item.quantity ?i}
                            onChange={() => {}}
                          />
                        </p> */}
                        <p
                          onClick={() => {
                            handleRemoveWishlist(item?.productId?._id);
                          }}
                          className=" mt-2 cursor-pointer "
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className=" flex flex-col w-full items-center justify-center py-10">
              <p className=" text-sm font-semibold text-gray-600 ">
                No Items in Wishlist
              </p>
              <Link to="/product-category/all" className=" underline text-orange-600">
                Contine Shopping
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default WishList;
