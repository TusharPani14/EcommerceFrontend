import React, { useContext, useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import NewsSlider from "../components/NewsSlider";
import CategorySlider from "../components/CategorySlider";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IoHeartCircle, IoStarOutline } from "react-icons/io5";
import axios from "axios";
import { MainAppContext } from "@/context/MainContext";
import Featured from "@/components/Featured";
import { TiTick, TiWorld } from "react-icons/ti";
import { BsBellFill, BsClock } from "react-icons/bs";
import Featured2 from "@/components/Featured2";
import { Helmet } from "react-helmet";
import PopupModal from "@/components/PopupModal";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import parse from "html-react-parser";
import { FaStar } from "react-icons/fa";

const box = [
  {
    icon: "/ship.png",
    text: "FREE SHIPPING",
    describe: "Order Above 1500",
  },
  { icon: "/free.png", text: "FREE ASSEMBLY", describe: "On all orders" },
  { icon: "/bell.png", text: "WARRANTY", describe: "one year Warranty" },
  {
    icon: "/secure.png",
    text: "SECUREE PAYMENTS",
    describe: "Safe, Fast & Secure",
  },
];
// const categories = [
//   { icon: "/main/hm1.svg", text: "Living Room", param: "livingroom" },
//   { icon: "/main/hm2.svg", text: "Bed Room", param: "bedroom" },
//   { icon: "/main/hm3.svg", text: "Dinnining Room", param: "dinningroom" },
//   { icon: "/main/hm4.svg", text: "Office", param: "office" },
//   { icon: "/main/hm5.svg", text: "hospitality", param: "hospitality" },
//   { icon: "/main/hm6.svg", text: "Outdoor", param: "outdoor" },
// ];
const feature = [
  {
    icon: <TiWorld className=" text-[19px] " />,
    text: "FREE SHIPPING",
    describe: "Order Above AED 1500",
  },
  {
    icon: <TiTick className=" text-[19px] " />,
    text: "FREE ASSEMBLY",
    describe: "On all orders",
  },
  {
    icon: <BsBellFill className=" text-[20px] " />,
    text: "WARRANTY",
    describe: "one year Warranty",
  },
  {
    icon: <BsClock className=" text-[19px] " />,
    text: "SECURE PAYMENTS",
    describe: "Safe, Fast & Secure",
  },
];
const news = [
  {
    icon: "/Images/news.png",
    text: "Interior design is the art.",
    date: "16 March",
    button: "Read More",
    describe: "Lorem ipsum dolor sit amet, consectetur adipi elit, sed.",
  },
  {
    icon: "/Images/news.png",
    text: "Interior design is the art.",
    date: "16 March",
    button: "Read More",
    describe: "do eiusmod tempor incididu ut labore et dolore magna",
  },
  {
    icon: "/Images/news.png",
    text: "Interior design is the art.",
    date: "16 March",
    button: "Read More",
    describe: "do eiusmod tempor incididu ut labore et dolore magna.",
  },
];

const Home = () => {
  const { currency, wishlist, setWishlist } = useContext(AppContext);

  const [filteredCategory, setFilteredCategory] = useState("New Arrivals");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [catalogueImage, setCatalogueImage] = useState(null);
  const [catalogueLinks, setCatalogueLinks] = useState(["", "", ""]);
  const [slider, setSlider] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { wishlistedProducts, handleAddToWishlist, handleRemoveWishlist } =
    useContext(MainAppContext);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/product/all`
      );
      // console.log(response.data);
      setFilteredProducts(response.data);
      const chunkedArray = [];
      for (let i = 0; i < response?.data?.length; i += 10) {
        chunkedArray.push(response?.data?.slice(i, i + 10));
      }
      // console.log(chunkedArray);
      setNewProducts(chunkedArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };
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

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/admin/blogs`
      );
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCatalogue = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/catalogue`
      );
      console.log(response.data.catalogue);
      setCatalogueImage(response.data.catalogue.image);
      setCatalogueLinks(response.data.catalogue.links);
    } catch (error) {
      console.error("Error fetching catalogue:", error);
    }
  };

  const getSlider = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/slider`
      );
      console.log(response.data);
      setSlider(response.data);
    } catch (error) {
      console.error("Error fetching catalogue:", error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/testimonial`
      );
      console.log(response.data);
      if (response.data) {
        setTestimonialsData(response.data);
      } else {
        console.error("API response does not contain a valid testimonial data");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const truncateContent = (htmlContent, wordLimit) => {
    const textContent = htmlContent.replace(/<[^>]+>/g, "");
    const words = textContent.split(/\s+/);
    if (words.length <= wordLimit) {
      return htmlContent;
    }
    const truncatedText = words.slice(0, wordLimit).join(" ") + "...";
    return parse(truncatedText);
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/review`
      );
      console.log(response.data);
      const allReviews = response.data.reviews;
      const filteredReviews = allReviews.filter((review) => review.rating >= 4);
      console.log(filteredReviews);
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProducts();
    getAllBanners();
    getAllCategories();
    getAllBlogs();
    getCatalogue();
    getSlider();
    fetchTestimonials();
    getReviews();
    // setWishlistedProducts(wishlist);
  }, []);

  const Stars = ({ stars }) => {
    const ratingStars = Array.from({ length: 5 }, (elem, index) => {
      return (
        <div key={index}>
          {stars >= index + 1 ? (
            <FaStar className="dark:text-yellow-400 text-yellow-500" />
          ) : (
            <IoStarOutline className="text-gray-400 dark:text-yellow-400" />
          )}
        </div>
      );
    });
    return <div className="flex items-center gap-0.5">{ratingStars}</div>;
  };

  return (
    <section className=" w-full dark:bg-black dark:text-white">
      <Helmet>
        <title>{"Creative Furniture"} </title>
        <meta name="description" />
        <meta name="description" content={"Creative Furniture"} />
        {/* <meta name="keywords" content={} /> */}
        <meta name="author" content={"Creative Furniture"} />
        {/* Add more meta tags as needed */}
      </Helmet>
      {showModal && <div className="modal-overlay" />}
      {showModal && <PopupModal onClose={() => setShowModal(false)} />}
      <HeroSlider slider={slider} />
      <CategorySlider data={categories} />
      <div className="w-full grid gap-3 grid-cols-2 md:grid-cols-3 px-[2%] mb-10">
        {categories
          ?.filter((i) => {
            return i?.selected === true;
          })
          .slice(0, 6)
          ?.map((item, index) => {
            return (
              <Link to={`/product-category/${item?.fileName.replace(/\s+/g, '-')}`} key={index}>
                <div className=" pl-2 md:pl-2 pb-2 md:pb-2">
                  <div className=" relative shade_image">
                    <p
                      style={{ writingMode: "vertical-rl" }}
                      className="text-[#353535] absolute -left-0 md:-left-0 top-4 rotate-180 plus-jakarta font-[600] text-[10px] md:text-2xl capitalize flex items-center justify-center"
                    >
                      {item?.fileName}
                    </p>
                    <img
                      className=" object-cover object-center h-[116px] lg:h-[302px] "
                      src={item?.imageLink}
                      alt={item.param}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      <div className=" dark:text-gray-400 flex flex-col items-center lg:grid xl:grid-cols-4 gap-6 px-[4%] xl:px-[8%] py-4 mt-5 ">
        <div className=" flex flex-col items-center col-span-4">
          <p className=" text-[24px] md:text-[28px] 2xl:text-[32px] plus-jakarta font-[700] text-[#212121] dark:text-gray-400 ">
            Our Products
          </p>
          <h4 className=" text-[#353535] plus-jakarta font-bold text-center text-[15px] md:text-[16px] 2xl:text-[16px] dark:text-gray-600 "> We Don't Make Designs we make Designs Better</h4>
          <p className=" text-[#474747] text-center text-[13px] md:text-[14px] 2xl:text-[14px] mb-10 dark:text-gray-400 mt-1 ">
            Creative Furniture team of artisans works to meet consumer needs and stay on top of trends in order to present the finest of contemporary life.
          </p>
          <div className="plus-jakarta flex items-center flex-wrap justify-center gap-2 md:gap-6 font-[600] text-[#474747] dark:text-gray-400 text-[13px] md:text-[17px] ">
            <span
              className={`cursor-pointer ${filteredCategory === "New Arrivals" && "text-[#FF7004]"
                }`}
              onClick={() => {
                setFilteredCategory("New Arrivals");
              }}
            >
              New Arrivals
            </span>
            <span
              className={`cursor-pointer ${filteredCategory === "Featured" && "text-[#FF7004]"
                }`}
              onClick={() => {
                setFilteredCategory("Featured");
              }}
            >
              Featured
            </span>
            <span
              className={`cursor-pointer ${filteredCategory === "Best Sellers" && "text-[#FF7004]"
                }`}
              onClick={() => {
                setFilteredCategory("Best Sellers");
              }}
            >
              Best Sellers
            </span>
            <span
              className={`cursor-pointer ${filteredCategory === "Sale Items" && "text-[#FF7004]"
                } `}
              onClick={() => {
                setFilteredCategory("Sale Items");
              }}
            >
              Sale Items
            </span>
            <span
              className={`${filteredCategory === "On Sales" && "text-[#FF7004]"
                } cursor-pointer`}
              onClick={() => {
                setFilteredCategory("On Sales");
              }}
            >
              On Sales
            </span>
          </div>
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
        <>
          <div className="w-full col-span-4">
            {/* {// console.log(filteredProducts)} */}
            <Featured2
              products={
                filteredCategory === "New Arrivals"
                  ? [...filteredProducts].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  : filteredProducts
              }
              newProducts={newProducts}
              filteredCategory={filteredCategory}
              wishlistedProducts={wishlistedProducts}
            />
          </div>
        </>
      )}
      {/* <div className=" dark:text-gray-400 flex flex-col items-center lg:grid xl:grid-cols-4 gap-6 px-[4%] xl:px-[8%] py-4 mt-2 ">
        <div className=" flex flex-col items-center py-10 col-span-4">
          <p className=" text-[24px] plus-jakarta md:text-[28px] 2xl:text-[35px] font-[700] text-[#212121] dark:text-gray-400 ">
            The Process
          </p>
          <p className=" text-[#474747] text-center text-[13px] md:text-[14px] 2xl:text-[15px] md:w-[40%] mb-4 dark:text-gray-400 ">
            Torem ipsum dolor sit amet, consectetur adipisicing elitsed do
            eiusmo tempor incididunt ut labore
          </p>
          <div className=" grid grid-cols-1 gap-5 md:grid-cols-3">
            {Process.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" text-gray-700 relative flex flex-col items-center  gap-3 p-2 px-3"
                >
                  <p className="  text-[30px] plus-jakarta md:text-[59px] font-bold plus-jakarta text-[#212121] dark:text-gray-400  capitalize ">
                    {item.number}
                  </p>
                  <p className="  font-semibold plus-jakarta  text-[15.6px] md:h-[60px] text-center md:text-[17.5px] text-[#212121] dark:text-gray-400 capitalize ">
                    {item.text}
                  </p>
                  <p className="  text-[12.4px] md:text-[13.4px] font-medium text-[#474747] dark:text-gray-400 text-center capitalize ">
                    {item.describe}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}

      <div className="dark:text-gray-400 flex flex-col items-center">
        <p className=" text-[24px] plus-jakarta py-10 md:text-[28px] 2xl:text-[35px] font-[700] text-[#212121] dark:text-gray-400 ">
          Testimonial
        </p>
        <div className="testimonial-slider w-full px-[12%] pb-10 overflow-hidden">
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="testimonial-slider w-full px-[0%] pb-10"
          >
            {testimonialsData?.testimonials?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="w-50 bg-white rounded-lg">
                  <div className="text-dark text-center p-4 bg-opacity-50 rounded-md mx-10">
                    <p className="px-4">{item}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* <div className="flex space-x-16 px-[4%] xl:px-[8%] py-4 mt-2 relative">
          {testimonialsData?.description && (
            <div className="flex flex-col w-50">
              <p className="text-[#363F4D] font-bold plus-jakarta text-[20px] md:text-[30px] 2xl:text-[32px] mb-4">
                {testimonialsData.title}
              </p>
              Use truncateContent function to truncate description
              {truncateContent(testimonialsData?.description, 50)}
            </div>
          )}
          <div className="flex">
            <div className="flex items-center justify-center">

            </div>
            {testimonialsData.imagePath && (
              <img
                src={testimonialsData.imagePath}
                alt="Testimonial Image"
                className="rounded-md w-full h-full object-cover"
              />
            )}
          </div>
        </div> */}
      </div>

      <div className=" relative text-white overflow-x-hidden w-full h-[300px] md:h-[530px] flex flex-col items-center justify-center ">
        <img
          className=" w-full h-full object-cover"
          src={`${catalogueImage}`}
          // src="/main/mainBanner2.svg"
          alt="slide-Image"
        />

        <div className="absolute left-[15%] z-10">
          <p className="playball text-white text-[15px] md:text-[15px] 2xl-text-[30px] pb-[15%] scale-[1.5] 2xl:scale-[3] uppercase text-left ">
            Discover Our
          </p>
          <p className="pl-[10px] uppercase poppins text-white text-[20px] md:text-[27px] font-semibold plus-jakarta 2xl-text-[500px] scale-[2] 2xl:scale-[3.5] ">
            CATALOGUE
          </p>
        </div>

        <div className=" absolute flex flex-col items-center justify-center gap-20 bg-black/50 w-full h-full top-0 left-0">
          <div className=" w-full flex items-center absolute left-[48.5%] top-[65%] ">
            {/* <Link target="_blank"
              className="font-semibold plus-jakarta underline w-fit px-4 py-2 uppercase text-[11px] md:text-xl"
              onClick={() => (window.location.href = catalogueLinks[0], '_blank')}
            >
              View Catalogue 1
            </Link> */}
            <a
              href={catalogueLinks[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold  text-center plus-jakarta w-fit px-4 py-2 text-[11px] md:text-[14px] pr-[7%] pl-[2.3%]"
            >
              Download
            </a>
            <a
              href={catalogueLinks[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-center plus-jakarta w-fit px-4 py-2 text-[11px] md:text-[14px]  pr-[7%]"
            >
              Download
            </a>
            <a
              href={catalogueLinks[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold  text-center plus-jakarta w-fit px-4 py-2 text-[11px] md:text-[14px]"
            >
              Download
            </a>

            {/* <Link target="_blank"
              className="font-semibold plus-jakarta underline w-fit px-4 py-2 uppercase text-[11px] md:text-xl"
              onClick={() => (window.location.href = catalogueLinks[2], '_blank')}
            >
              View Catalogue 3
            </Link> */}
          </div>
        </div>
      </div>
      <div className="dark:text-gray-400 flex flex-col items-center col-span-4 mt-10 mb-5">
        <p className=" text-[24px] md:text-[28px] 2xl:text-[32px] plus-jakarta font-[700] text-[#212121] dark:text-gray-400">
          Reviews
        </p>
        {reviews.length === 0 ? (
          <p>No reviews with rating 4 or higher found.</p>
        ) : (
          <div className="w-full max-w-2xl">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-5"
              >
                <h3 className="font-bold text-xl text-[#212121] dark:text-gray-300">
                  {review.userId.name}
                </h3>
                <h3 className="font-bold text-base text-[#212121] dark:text-gray-300">
                  {review.title}
                </h3>
                <Stars stars={review.rating} />
                <p className="text-[#212121] dark:text-gray-400">
                  {review.comment}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  By User {review.userId.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="dark:text-gray-400 flex flex-col items-center col-span-4 mt-10 mb-5">
        <p className=" text-[24px] md:text-[28px] 2xl:text-[32px] plus-jakarta font-[700] text-[#212121] dark:text-gray-400">
          Latest News
        </p>
        <p className=" dark:text-gray-400 text-[#474747] w-[90%] md:w-[50%] text-center text-[13px] md:text-[14px] 2xl:text-[14px] mb-4 ">
          Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
          tempor incididunt ut labore eiusmo tempor incididunt ut labore
        </p>
      </div>
      <NewsSlider blogs={blogs} />
      <div className="w-full flex px-[8%] mx-auto relative mt-8">
        {banners.find((banner) => banner.fileName === "Banner1") && (
          <div className="relative w-full flex justify-center items-center shade_image">
            <img
              className="h-full object-contain"
              src={
                banners.find((banner) => banner.fileName === "Banner1")
                  ?.filePath
                  ? banners.find((banner) => banner.fileName === "Banner1")
                    .filePath
                  : "/main/discount_banner.jpg"
              }
              alt="slide-Image"
            />
            <div className="absolute bottom-30 left-0 right-0 p-4 flex justify-between items-end w-full">
              <div className="p-2 rounded">
                <h2 className="text-xl md:text-2xl font-bold text-black">
                  {
                    banners.find((banner) => banner.fileName === "Banner1")
                      .title
                  }
                </h2>
                <p className="text-sm md:text-base text-black pb-3">
                  {
                    banners.find((banner) => banner.fileName === "Banner1")
                      .description
                  }
                </p>
                <a
                  href={
                    banners
                      .find((banner) => banner.fileName === "Banner1")
                      .redirectUrl.startsWith("http")
                      ? banners.find((banner) => banner.fileName === "Banner1")
                        .redirectUrl
                      : `${banners.find(
                        (banner) => banner.fileName === "Banner1"
                      ).redirectUrl
                      }`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 text-white px-4 py-2 rounded shadow-md hover:bg-orange-700 transition duration-300"
                >
                  {
                    banners.find((banner) => banner.fileName === "Banner1")
                      .buttonContent
                  }
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full bg-[#F6F6F6] flex items-center flex-wrap justify-center px-[4%] mt-10 pb-[20px] pt-[45px]">
        {feature.map((item, index) => {
          return (
            <div
              key={index}
              className=" text-gray-700 relative flex items-center  w-[300px] gap-3 border border-gray-500 p-2 px-3"
            >
              <div className=" border border-gray-700 rounded-full p-1.5">
                {item.icon}
              </div>
              <div className=" flex flex-col">
                <p className="  font-semibold text-xs md:text-[13px]  capitalize ">
                  {item.text}
                </p>
                <p className="  text-[12.5px]  capitalize ">{item.describe}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
