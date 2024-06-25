import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { MainAppContext } from "@/context/MainContext";

export default function CategorySlider({ data }) {
  const [screenSize, setScreenSize] = useState(6);
  const { isDarkMode } = useContext(MainAppContext);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 600) {
        setScreenSize(3);
      } else if (width >= 600 && width < 1024) {
        setScreenSize(4);
      } else if (width >= 1024 && width < 1180) {
        setScreenSize(5);
      } else {
        setScreenSize(6);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Swiper
        loop={true}
        slidesPerView={screenSize}
        spaceBetween={30}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[100px] my-4 md:h-[230px] 2xl:h-[280px] px-[15%] md:px-[8%]"
      >
        {data.map((item, index) => (
          <SwiperSlide key={`category-${index}`}>
            <Link
              to={`/product-category/${item.fileName.replace(/\s+/g, '-')}`}
            >
              <div
                className={`relative flex items-end justify-center w-[70px] h-[70px] md:w-[150px] md:h-[150px] ${
                  isDarkMode ? "dark" : ""
                } rotateCircle cursor-pointer`}
              >
                <img
                  className="w-full h-full dark:invert scale-[0.7] md:scale-[0.5] object-contain"
                  src={item.logoLink}
                  alt={item.fileName}
                />
                <span className="absolute text-[6px] md:text-xs mb-1.5 md:mb-4 font-medium">
                  {item.fileName}
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        {data.flatMap((item) =>
          item.subcategories.map((subcategory, subIndex) => (
            <SwiperSlide key={`subcategory-${item.fileName}-${subIndex}`}>
              <Link
                to={`/product-category/${item.fileName.replace(/\s+/g, '-')}/${subcategory.name.replace(
                  /\s+/g,
                  '-'
                )}`}
              >
                <div
                  className={`relative flex items-end justify-center w-[70px] h-[70px] md:w-[150px] md:h-[150px] ${
                    isDarkMode ? "dark" : ""
                  } rotateCircle cursor-pointer`}
                >
                  <img
                    className="w-full h-full dark:invert scale-[0.7] md:scale-[0.5] object-contain"
                    src={subcategory.subLogoLink}
                    alt={subcategory.name}
                  />
                  <span className="absolute text-[6px] md:text-xs mb-1.5 md:mb-4 font-medium">
                    {subcategory.name}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}
