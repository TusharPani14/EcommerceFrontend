import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  RiCloseCircleFill,
  RiFacebookFill,
  RiGoogleFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";
import { CurrencyList } from "../utilities/Currency";
import { AppContext } from "../context/AppContext";
import { MainAppContext } from "@/context/MainContext";
import { useAuth } from "@/context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";

export default function DialogBar() {
  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    isMenuOpen,
    SetIsMenuOpen,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { isDarkMode } = useContext(MainAppContext);
  const [userDetails, setUserDetails] = useState({});
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [openStaticCategory, setOpenStaticCategory] = useState(null);
  const [groupedCategories, setGroupedCategories] = useState({});
  const staticMainCategories = [
    "Office",
    "Living Room",
    "BedRoom",
    "Dining Room",
    "Kids Room Furniture",
    "Outdoor",
    "Hospitality",
    "University Furniture",
    "Study And Home Office",
    "Washroom Furniture"
  ];

  useEffect(() => {
    // Function to fetch the menu from the backend
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/menu`
        );
        // console.log(response.data.items);
        setMenu(response.data.items);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    const getCategoriesData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/category`
        );
        console.log(response.data.categories);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Call the fetchMenu function when the component mounts
    fetchMenu();
    getCategoriesData();
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    // // console.log(user.name);
    setUserDetails(user);
    setUserLoggedIn(user ? true : false);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserLoggedIn(false);
    toast.success("Successfully logged out");
    navigate("/");
  };
  const [social, setSocial] = useState({});
  useEffect(() => {
    const getSocialMedia = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/social`
        );
        // console.log("Social media profile:", response.data.socialMedia);
        setSocial(response.data.socialMedia);
        // Handle the social media profile data as needed
      } catch (error) {
        console.error("Error getting social media profile:", error);
        // Handle error
      }
    };
    getSocialMedia();
  }, []);

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
    <Transition.Root show={isMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`${isDarkMode ? "dark" : ""} relative dark z-50`}
        onClose={SetIsMenuOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md custom_width22">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className=" relative flex items-start justify-between pt-5">
                        <RiCloseCircleFill
                          onClick={() => {
                            SetIsMenuOpen(false);
                          }}
                          className=" z-30 absolute -top-4 right-0 cursor-pointer text-[30px] text-[#FF7004] bg-white"
                        />
                      </div>
                      <div className=" relative h-full flex flex-col">
                        <div className=" w-full relative ">
                          <Link
                            to={`/`}
                            onClick={() => {
                              SetIsMenuOpen(false);
                            }}
                            style={{ outline: "none" }}
                          >
                            <p className=" outline-none border-t-[0px] py-2.5 border-[#efefef] text-dark-500 dark:text-dark-500 font-[500] plus-jakarta text-[13px] md:text-[13px] 2xl:text-[14px]">
                              Home
                            </p>
                          </Link>
                        </div>
                        <div className=" w-full relative ">
                          <Link
                            to={`/about`}
                            onClick={() => {
                              SetIsMenuOpen(false);
                            }}
                            style={{ outline: "none" }}
                          >
                            <p className=" outline-none border-t-[0px] py-2.5 border-[#efefef] text-dark-500 dark:text-dark-500 font-[500] plus-jakarta text-[13px] md:text-[13px] 2xl:text-[14px]">
                              About Us
                            </p>
                          </Link>
                        </div>
                        <div className=" w-full relative ">
                          <Link
                            to={`/gallery`}
                            onClick={() => {
                              SetIsMenuOpen(false);
                            }}
                            style={{ outline: "none" }}
                          >
                            <p className=" outline-none border-t-[0px] py-2.5 border-[#efefef] text-dark-500 dark:text-dark-500 font-[500] plus-jakarta text-[13px] md:text-[13px] 2xl:text-[14px]">
                              Gallery
                            </p>
                          </Link>
                        </div>
                        <div className=" w-full relative ">
                          <Link
                            to={`/product-category/all`}
                            onClick={() => {
                              SetIsMenuOpen(false);
                            }}
                            style={{ outline: "none" }}
                          >
                            <p className=" outline-none border-t-[0px] py-2.5 border-[#efefef] text-dark-500 dark:text-dark-500 font-[500] plus-jakarta text-[13px] md:text-[13px] 2xl:text-[14px]">
                              Collection
                            </p>
                          </Link>
                        </div>

                        {staticMainCategories.map(
                          (staticCategory, staticIndex) => (
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
                                  <Menu.Items className="flex flex-col text-[13px] md:text-[13px] 2xl:text-[14px] dark:text-dark-600 bg-white pl-2 gap-2 w-full">
                                    {groupedCategories[staticCategory]
                                      ?.filter((item) => item.dialogSelected)
                                      .map((item, index) => (
                                        <div key={index}>
                                          <Menu>
                                            <Menu.Button
                                              className="w-full flex items-center justify-between capitalize py-2.5"
                                              onClick={() =>
                                                setOpenCategory(
                                                  openCategory === index
                                                    ? null
                                                    : index
                                                )
                                              }
                                            >
                                              <Link
                                                to={`/product-category/${item.slug}`}
                                                onClick={() => {
                                                  setOpenCategory(null);
                                                  setOpenStaticCategory(null);
                                                }}
                                              >
                                                {item.fileName}
                                              </Link>
                                              <ChevronDownIcon
                                                className="w-[15px]"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setOpenCategory(
                                                    openCategory === index
                                                      ? null
                                                      : index
                                                  );
                                                }}
                                              />
                                            </Menu.Button>
                                            <Transition
                                              show={openCategory === index}
                                              as={React.Fragment}
                                              enter="transition ease-out duration-100 transform"
                                              enterFrom="opacity-0 scale-95"
                                              enterTo="opacity-100 scale-100"
                                              leave="transition ease-in duration-75 transform"
                                              leaveFrom="opacity-100 scale-100"
                                              leaveTo="opacity-0 scale-95"
                                            >
                                              <Menu.Items className="flex flex-col text-[13px] md:text-[13px] 2xl:text-[14px] dark:text-dark-600 bg-white pl-2 gap-2 w-full">
                                                {item.subcategories
                                                  .filter(
                                                    (subcategory) =>
                                                      subcategory.dialogSelected
                                                  )
                                                  .map(
                                                    (subcategory, subIndex) => (
                                                      <div key={subIndex}>
                                                        <Menu>
                                                          <Menu.Button
                                                            className="w-full flex items-center justify-between capitalize py-2.5"
                                                            onClick={() =>
                                                              setOpenSubcategory(
                                                                openSubcategory ===
                                                                  subIndex
                                                                  ? null
                                                                  : subIndex
                                                              )
                                                            }
                                                          >
                                                            <Link
                                                              to={`/product-category/${item.slug}/${subcategory.slug}`}
                                                              onClick={() => {
                                                                setOpenCategory(
                                                                  null
                                                                );
                                                                setOpenStaticCategory(
                                                                  null
                                                                );
                                                              }}
                                                            >
                                                              {subcategory.name}
                                                            </Link>
                                                            <ChevronDownIcon
                                                              className="w-[15px]"
                                                              onClick={(e) => {
                                                                e.stopPropagation(); // Prevent parent menu from closing
                                                                setOpenSubcategory(
                                                                  openSubcategory ===
                                                                    subIndex
                                                                    ? null
                                                                    : subIndex
                                                                );
                                                              }}
                                                            />
                                                          </Menu.Button>
                                                          <Transition
                                                            show={
                                                              openSubcategory ===
                                                              subIndex
                                                            }
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
                                                                  (
                                                                    seriesItem
                                                                  ) =>
                                                                    seriesItem.dialogSelected
                                                                )
                                                                .map(
                                                                  (
                                                                    seriesItem,
                                                                    seriesIndex
                                                                  ) => (
                                                                    <Link
                                                                      key={
                                                                        seriesIndex
                                                                      }
                                                                      to={`/product-category/${encodeURIComponent(
                                                                        item.slug
                                                                      )}/${encodeURIComponent(
                                                                        subcategory.slug
                                                                      )}/${encodeURIComponent(
                                                                        seriesItem.slug
                                                                      )}`}
                                                                      onClick={() => {
                                                                        setCategories(
                                                                          item.fileName.toLowerCase()
                                                                        );
                                                                        SetIsMenuOpen(
                                                                          false
                                                                        );
                                                                        setOpenStaticCategory(
                                                                          null
                                                                        );
                                                                      }}
                                                                    >
                                                                      <p className="py-2.5 capitalize">
                                                                        {
                                                                          seriesItem.name
                                                                        }
                                                                      </p>
                                                                    </Link>
                                                                  )
                                                                )}
                                                            </Menu.Items>
                                                          </Transition>
                                                        </Menu>
                                                      </div>
                                                    )
                                                  )}
                                              </Menu.Items>
                                            </Transition>
                                          </Menu>
                                        </div>
                                      ))}
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          )
                        )}

                        <div className=" flex flex-col text-gray-800 font-[600] plus-jakarta text-[13px] md:text-[13px] 2xl:text-[16px] ">
                          {/* <select
                            value={language}
                            onChange={(e) => {
                              setLanguage(e.target.value);
                            }}
                            className=" border-t-[1px] py-2.5 dark:border-gray-700 border-[#EEEEEE] dark:text-gray-600  bg-transparent "
                          >
                            <option value="ENG">(ENG)</option>
                            <option value="SPN">(SPN)</option>
                          </select> */}
                          <select
                            value={currency}
                            onChange={(e) => {
                              setCurrency(e.target.value);
                            }}
                            autoFocus="off"
                            className="  py-2.5  dark:text-dark-500  bg-transparent "
                          >
                            <option
                              className=" text-black  text-[13px] md:text-[13px] 2xl:text-[16px] "
                              value={"AED"}
                            >
                              AED
                            </option>
                            <option
                              className=" text-black  text-[13px] md:text-[13px] 2xl:text-[16px] "
                              value={"OMR"}
                            >
                              OMR
                            </option>
                          </select>
                        </div>
                        {!userLoggedIn ? (
                          <Link autoFocus="off" to="/login">
                            <button
                              onClick={() => {
                                SetIsMenuOpen(false);
                              }}
                              className=" w-full text-dark  text-sm font-semibold py-1.5 rounded-sm px-0  mt-2"
                            >
                              Login
                            </button>
                          </Link>
                        ) : (
                          <div
                            onClick={() => {
                              SetIsMenuOpen(false);
                              handleLogout();
                            }}
                            className={`flex items-center gap-2  text-dark  cursor-pointer 
                        font-[600] plus-jakarta p-3 px-0 text-[13px] md:text-[15px] 2xl:text-[15px] `}
                          >
                            <IoIosLogOut />
                            Log Out
                          </div>
                        )}
                        {/* <div className=" w-full flex items-center justify-between px-[3%]">
                          <Link to={social?.facebook ? social?.facebook : "/"}>
                            {" "}
                            <RiFacebookFill className=" text-[25px] p-1 rounded-full bg-[#FF7004] text-white " />
                          </Link>
                          <Link to={social?.twitter ? social?.twitter : "/"}>
                            {" "}
                            <RiTwitterFill className=" text-[25px] p-1 rounded-full bg-[#FF7004] text-white " />
                          </Link>
                          <Link to={social?.linkedin ? social?.linkedin : "/"}>
                            {" "}
                            <RiLinkedinFill className=" text-[25px] p-1 rounded-full bg-[#FF7004] text-white " />
                          </Link>
                          <Link to={social?.youtube ? social?.youtube : "/"}>
                            {" "}
                            <RiYoutubeFill className=" text-[25px] p-1 rounded-full bg-[#FF7004] text-white " />
                          </Link>
                          <Link
                            to={social?.instagram ? social?.instagram : "/"}
                          >
                            {" "}
                            <RiInstagramFill className=" text-[25px] p-1 rounded-full bg-[#FF7004] text-white " />
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
