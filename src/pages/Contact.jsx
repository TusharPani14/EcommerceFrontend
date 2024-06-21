import React, { useEffect } from "react";
import { HiHome, HiPhone } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const FeatureList = [
  {
    id: 1,
    heading: "FAST DELIVERY",
    content:
      "We provide how all this is taken dea of denouncing pleasure and sing",
  },
  {
    id: 2,
    heading: "SECURE PAYMENT",
    content: `We provide how all this mistaken
        dea of denouncing pleasure and sing`,
  },
  {
    id: 3,
    heading: "EASY ORDER TRACKING",
    content: `We provide how all this mistaken dea of denouncing pleasure and sing`,
  },
  {
    id: 4,
    heading: "24/7 SUPPORT",
    content: `We provide how all this mistaken
       dea of denouncing pleasure and sing`,
  },
  {
    id: 5,
    heading: "QUALITY PRODUCT",
    content: `We provide how all this mistaken dea of denouncing pleasure and sing`,
  },
  {
    id: 6,
    heading: "MONEY BACK GUARNTEE",
    content: `We provide how all this mistaken
        dea of denouncing pleasure and sing`,
  },
  {
    id: 7,
    heading: "FREE RETURN",
    content: `We provide how all this mistaken
        dea of denouncing pleasure and sing`,
  },
];
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" ">
      <div className="px-[4%] md:px-[8%] py-1 md:py-3 bg-[#F4F5F7]  dark:bg-black dark:text-gray-400 dark:border-b dark:border-t dark:border-gray-600 flex items-center justify-between ">
        {/* <h2 className=" uppercase text-[17px] md:text-[24px] font-[700] plus-jakarta text-[#212121] dark:text-gray-400 ">
          Contact Us
        </h2> */}
        <div className=" flex items-center font-[500] text-[#858585] raleway text-[.8461538462rem] md:text-[.8461538462rem] ">
          <Link to="/">
            <span className=" text-[#858585] cursor-pointer raleway ">
              Home
            </span>
          </Link>
          <span className=" px-1 ">/</span>
          <span className=" capitalize">Contact Us</span>
        </div>
      </div>

      <div className=" w-full lg:mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230900.04949362183!2d55.14947876837494!3d25.276866106628052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f21c020eb25%3A0x27ce0724f8ccc720!2sCreative%20Furniture!5e0!3m2!1sen!2sae!4v1718616766869!5m2!1sen!2sae"
          className=" w-full h-[200px] lg:h-[400px]"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className=" md:px-[2%] xl:px-[8%] flex flex-col lg:items-start lg:grid grid-cols-2 md:mx-8 mb-14 ">
        <div className=" m-8 md:m-8 ">
          <div className=" flex flex-col ">
            <h4 className=" text-[18px] md:text-[27px] 2xl:text-[32px] font-[500] plus-jakarta text-[#FF7004] dark:text-gray-400 mb-4 ">
              Let's make something unique together
            </h4>

            <div className=" flex-col flex mb-4">
              <label
                className=" text-[#7A7A7A] dark:text-gray-500 font-[700] plus-jakarta text-[12px] md:text-[14px] 2xl:text-[14.4px] mb-1 "
                htmlFor="name"
              >
                Your Name<span className=" text-red-500">*</span>
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className=" w-full border-[1.4px] border-[#999999] p-2.5 text-[#7A7A7A] dark:text-gray-500 bg-transparent text-[14.4px]"
                placeholder="Your Name"
              />
            </div>
            <div className=" flex-col flex mb-4">
              <label
                className=" text-[#7A7A7A] dark:text-gray-500 font-[700] plus-jakarta text-[12px] md:text-[14px] 2xl:text-[14.4px] mb-1 "
                htmlFor="email"
              >
                Your Email<span className=" text-red-500">*</span>
              </label>
              <input
                name="email"
                id="email"
                type="text"
                className=" w-full border-[1.4px] border-[#999999] p-2.5 text-[#7A7A7A] dark:text-gray-500 bg-transparent text-[14.4px]"
                placeholder="Your Email"
              />
            </div>
            <div className=" flex-col flex mb-4">
              <label
                className=" text-[#7A7A7A] dark:text-gray-500 font-[700] plus-jakarta text-[12px] md:text-[14px] 2xl:text-[14.4px] mb-1 "
                htmlFor="subject"
              >
                Subject<span className=" text-red-500">*</span>
              </label>
              <input
                name="subject"
                id="subject"
                type="text"
                className=" w-full border-[1.4px] border-[#999999] p-2.5 text-[#7A7A7A] dark:text-gray-500 bg-transparent text-[14.4px]"
                placeholder="Subject"
              />
            </div>

            <div className=" flex-col flex mb-4">
              <label
                className=" text-[#7A7A7A] dark:text-gray-500 font-[700] plus-jakarta text-[12px] md:text-[14px] 2xl:text-[14.4px] mb-1 "
                htmlFor="message"
              >
                Your Message<span className=" text-red-500">*</span>
              </label>
              <input
                name="message"
                id="message"
                type="text"
                className=" w-full border-[1.4px] border-[#999999] p-2.5 text-[#7A7A7A] dark:text-gray-500 bg-transparent text-[14.4px]"
                placeholder="Your Message"
              />
            </div>
            <button className=" bg-[#363F4D] w-fit  border-[1.4px] border-[#363F4D] px-4 py-2.5 font-medium uppercase text-[13px] text-white mt-1">
              Send
            </button>
          </div>
        </div>

        <div className=" w-full px-[5%] lg:px-[8%] flex flex-col justify-between md:mt-10 ">
          <div className=" ">
            <div className=" flex flex-col p-5 bg-[#F2F2F2] dark:bg-white/5">
              <h4 className=" text-[18px] md:text-[26px] 2xl:text-[31px] font-[700] plus-jakarta text-[#363F4D] dark:text-gray-400 mb-2 ">
                Contact Us
              </h4>
              <p className=" text-[#7A7A7A] dark:text-gray-500 text-[12px] md:text-[13px] 2xl:text-[14px] font-[400]">
                Claritas est etiam processus dynamicus, qui sequitur mutationem
                consuetudium lectorum. Mirum est notare quam littera gothica,
                quam nunc putamus parum claram anteposuerit litterarum formas
                human.
              </p>

              <div className=" mt-3 py-1 flex flex-col font-[600] plus-jakarta text-[#222222] dark:text-gray-400  text-[15px] md:text-[19px] 2xl:text-[20px]">
                <p className=" flex items-center gap-2">
                  <HiHome className=" text-[17px]" />
                  Office Address
                </p>
                <span className="text-[#666666] dark:text-gray-500 text-[12px] md:text-[13px] 2xl:text-[14px] font-[500] plus-jakarta">
                  Al Raihan Tower - Office No J512, 5th Floor - 46th St - next to Movenpick Hotel - Deira - The Town square - Dubai - United Arab Emirates
                </span>
              </div>
              <div className=" mt-3 py-6 border-t border-gray-300 flex flex-col font-[600] plus-jakarta text-[#222222] dark:text-gray-400  text-[15px] md:text-[19px] 2xl:text-[20px]">
                <p className=" flex items-center gap-2">
                  <HiHome className=" text-[17px]" />
                  Factory Address
                </p>
                <span className="text-[#666666] dark:text-gray-500 text-[12px] md:text-[13px] 2xl:text-[14px] font-[500] plus-jakarta">
                  Creative Shelf LLC - Sharjah Branch, Interior Design Firm UAE <br /> Ware House # 17, Block D, Industrial Area-13 New National paints round about - Sharjah

                </span>
              </div>
              <div className=" mt-3 py-6 border-t border-b border-gray-300 flex flex-col font-[600] plus-jakarta text-[#222222] dark:text-gray-400 text-[15px] md:text-[19px] 2xl:text-[20px]">
                <p className=" flex items-center gap-2">
                  <HiPhone className=" text-[15px]" /> Phone
                </p>
                <span className="text-[#666666] dark:text-gray-500 text-[12px] md:text-[13px] 2xl:text-[14px] font-[500] plus-jakarta">
                  Toll Free: <a href="tel:600 505253">600 505253</a><br />
                  Mobile: <a href="tel:+971 56 673 6852">+971 56 673 6852</a>
                </span>
              </div>
              <div className=" mt-3 py-1 flex flex-col font-[600] plus-jakarta text-[#222222] dark:text-gray-400 text-[15px] md:text-[19px] 2xl:text-[20px]">
                <p className=" flex items-center gap-2">
                  <MdEmail className=" text-[17px]" /> Email
                </p>
                <span className="text-[#666666] dark:text-gray-500 text-[12px] md:text-[13px] 2xl:text-[14px] font-[500] plus-jakarta">
                  <a href="mailto:info@creativefurniture.ae">info@creativefurniture.ae</a>
                  <br />
                  <a href="mailto:support@creativefurniture.ae">support@creativefurniture.ae</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative factory_image">

        <img
          className=" w-full h-[280px] md:h-[280px]  2xl:w-[100%] object-cover"
          src="/Images/contact_us_banner.jpg"
          alt="ab1"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className=" w-full absolute top-12 right-0 md:px-[2%] xl:px-[8%] flex flex-col lg:items-start lg:grid grid-cols-2 md:mx-8 mb-14">
          <div className="justify-between p-[10%]">
            <h2 className="text-[28px] font-[600] text-white">Book your visit to our factory now</h2>
          </div>
          <div className="flex justify-end  p-[10%]">
            <Link className="btn btn-outline text-[15px] text-white border border-[#ffffff] px-8 py-3 hover:bg-[#222222] hover:border-[#222222]" to="https://maps.app.goo.gl/Do9wvxt4myf6mdBx9" target="_blank">Click Here to See Direction</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
