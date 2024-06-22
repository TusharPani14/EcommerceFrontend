import React, { useContext, useEffect, useState } from "react";
import { DashboardAppContext } from "../../context/DashboardContext";
import { sortProducts } from "../../utilities/SortMethod";
import { IoClose, IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RiStarFill } from "react-icons/ri";
import { MdDelete, MdStarOutline } from "react-icons/md";
import { MainAppContext } from "@/context/MainContext";
import EditProduct from "./EditProduct";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { saveAs } from "file-saver";

const VendorDetailsDialog = ({ userData, close }) => {
  return (
    <div className="  fixed inset-0 w-full h-[100vh] flex items-center justify-center bg-black/30 overflow-hidden overflow-y-auto  z-50 ">
      <div className=" relative w-[95%] h-[80%] md:w-[50%] md:h-[60%] overflow-y-auto   dark:text-black bg-white p-10 capitalize">
        <IoClose
          onClick={() => {
            close();
          }}
          className=" absolute -top-0 cursor-pointer right-0 bg-red-500 p-1 text-[29px]"
        />
        <div className=" grid grid-cols-2">
          <div>
            <h2 className=" font-bold plus-jakarta plus-jakarta plus-jakarta text-xl mb-3">
              Product Details
            </h2>
            <p>
              <span className=" text-md font-semibold mr-1">Id:</span>
              {userData?._id}
            </p>
            <p>
              <span className=" text-md font-semibold mr-1">name:</span>
              {userData?.title}
            </p>
            <p>
              <span className=" text-md font-semibold mr-1">email:</span>
              {userData?.email}
            </p>
            {userData?.city && userData?.state && userData?.zipCode && (
              <p>
                <span className=" text-md font-semibold mr-1">Address:</span>
                {userData?.city}
                {userData?.state}
                {userData?.zipCode}
              </p>
            )}
            <p>
              <span className=" text-md font-semibold mr-1">Available:</span>
              {userData?.available}{" "}
            </p>

            <p>
              <span className=" text-md font-semibold mr-1">createdAt:</span>
              {userData?.createdAt}
            </p>

            <p>
              <span className=" text-md font-semibold mr-1">description:</span>
              {userData?.description}
            </p>

            <p>
              <span className=" text-md font-semibold mr-1">
                discountValue:
              </span>
              {userData?.discountValue}
            </p>

            {/* <p> */}
            {/* <span className=" text-md font-semibold mr-1">editorContent:</span>{userData?.}</p> */}

            <p>
              <span className=" text-md font-semibold mr-1">height:</span>
              {userData?.height}
            </p>

            <p>
              <span className=" text-md font-semibold mr-1">width:</span>
              {userData?.width}
            </p>

            <p>
              <span className=" text-md font-semibold mr-1">mainCategory:</span>
              {userData?.mainCategory}
            </p>
            <p>
              <span className=" text-md font-semibold mr-1">pieces:</span>
              {userData?.pieces}
            </p>
            <p>
              <span className=" text-md font-semibold mr-1">price:</span>AED{" "}
              {userData?.price}
            </p>
            <p>
              <span className=" text-md font-semibold mr-1">promotional:</span>
              {userData?.promortional}
            </p>
            <p>
              <span className=" text-md font-semibold mr-1">sku:</span>
              {userData?.sku}
            </p>

            <p>
              <span className=" text-md font-semibold mr-1">VendorId:</span>
              {userData?.vendorId}
            </p>

            <div>
              <span className=" text-md font-semibold mr-1">status:</span>
              {userData?.status ? "Approved" : "Unapproved"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Products = () => {
  const [sortMethod1, setSortMethod1] = useState(2);
  const [sortMethod2, setSortMethod2] = useState(2);
  const [filterMethod1, setFilterMethod1] = useState("");
  const [filterMethod2, setFilterMethod2] = useState("");
  const [sortedArray1, setSortedArray1] = useState([]);
  const [sortedArray2, setSortedArray2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [editProductInfo, setEditProductInfo] = useState(false);
  const [processingTab, setProcessingTab] = useState("");
  const [activeUserData, setActiveUserData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  // const [loading, setLoading] = useState(false);
  const { user } = useContext(MainAppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const user1 = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "admin" && user1?.role !== "admin") {
      navigate("/login");
    }
  }, []);
  const closeModal = () => {
    setDialog(false);
  };
  const [dialog, setDialog] = useState(false);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/product/all`
      );
      setProducts(response.data);
      // console.log(response.data);
      setSortedArray1(response.data);
      setSortedArray2(response.data);
      // // console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const getCategoriesData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/admin/category`
      );
      console.log(response.data.categories);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const approveProduct = async (product) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/approveProduct`,
        { product }
      );
      // console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error approving Product:", error);
      toast.error("Error approving Product");
    }
    setLoading(false);
  };

  const markFeatured = async (product) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/markFeatured`,
        { productId: product._id, featured: !product.featured }
      );
      toast.success(response.data.message);
      getAllProducts();
    } catch (error) {
      console.error("Error marking product as featured:", error);
      toast.error("Error marking product as featured");
    }
  };

  const handleChangeStockStatus = async (item) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/product/stockStatus`,
        {
          productId: item._id,
          isStock: !item.isStock,
        }
      );
      // console.log(response.data);
      toast.success(response.data.message);
      getAllProducts();
    } catch (error) {
      console.error("Error changing stock status:", error);
      toast.error("Error changing stock status");
    }
  };

  useEffect(() => {
    getAllProducts();
    getCategoriesData();
  }, []);

  // const approveVendor = async (user) => {
  //   // console.log(user);
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_SERVER_URL}/admin/approveVendor`,
  //       { user }
  //     );
  //     getAllProducts();
  //     // console.log(response.data);
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     console.error("Error approving vendor:", error);
  //     toast.error("Error approving vendor");
  //   }
  //   setLoading(false);
  // };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/product/delete/${productId}`
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        getAllProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const totalPages = Math.ceil(
    sortedArray1.filter((i) => {
      if (filterMethod1 !== "") {
        return (
          i.status.toLowerCase() === filterMethod1.toLowerCase() &&
          i.approved !== true
        );
      } else {
        return i.approved !== true;
      }
    }).length / pageSize
  );

  // Function to handle changing the page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [currentPage2, setCurrentPage2] = useState(1);
  const pageSize2 = 10; // Number of items per page

  // Calculate the start index and end index for the current page
  const startIndex2 = (currentPage2 - 1) * pageSize2;
  const endIndex2 = startIndex2 + pageSize2;

  const totalPages2 = Math.ceil(
    sortedArray2.filter((i) => {
      if (filterMethod2 !== "") {
        return (
          i.status.toLowerCase() === filterMethod2.toLowerCase() &&
          i.approved === true
        );
      } else {
        return i.approved === true;
      }
    }).length / pageSize2
  );

  // Function to handle changing the page
  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  };

  const exportCSV = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/product/exportCSV`,
        {
          responseType: "blob",
        }
      );
      let filename = "products.csv";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        filename = contentDisposition.split("filename=")[1] || "export.csv";
      }
      saveAs(response.data, filename);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const exportSelectedProducts = async () => {
    try {
      const [categoryName, subcategoryName, seriesName] = selectedOption.split('-');
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/exportSelectedCSV`, {
        responseType: "blob",
        params: {
          category: categoryName,
          subcategory: subcategoryName,
          series: seriesName
        }
      });
  
      let filename = "products.csv";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        filename = contentDisposition.split("filename=")[1] || "export.csv";
      }
      saveAs(response.data, filename);
    } catch (error) {
      console.error("Error exporting products:", error);
    }
  };  

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className=" w-full min-h-[100vh] h-fit bg-[#F8F9FA] dark:bg-black rounded-lg px-[2%] py-4 md:py-10">
      <div className="flex justify-between items-center">
        <p className="dark:text-gray-400 text-[#363F4D] font-bold plus-jakarta text-[17px] md:text-[23px] 2xl:text-[25px]">
          {isEditProduct ? "Edit Product" : "Products"}
        </p>
        <button
          className="bg-[#FF7004] px-4 py-2.5 my-1 w-[100px] sm:w-[150px] font-medium text-[11.2px] md:text-[13px] text-white flex items-center"
          onClick={exportCSV}
          disabled={!selectedOption}
        >
          <FileUploadIcon className="mr-2" />
          Export All
        </button>
        <div className="flex flex-col">
          <label className="py-2">Export By:</label>
          <select
            className="bg-gray-200 border border-gray-300 rounded px-2 py-1 mb-4"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Select an option
            </option>
            {categories.map((category) =>
              category.subcategories.map((subcategory) =>
                subcategory.series.map((series) => (
                  <option
                    key={`${category.id}-${subcategory.id}-${series.id}`}
                    value={`${category.fileName}-${subcategory.name}-${series.name}`}
                  >
                    {category.fileName}-{subcategory.name}-{series.name}
                  </option>
                ))
              )
            )}
          </select>
          <button
            className="bg-[#FF7004] px-4 py-2.5 my-1 w-[100px] sm:w-[150px] font-medium text-[11.2px] md:text-[13px] text-white flex items-center"
            onClick={exportSelectedProducts}
            disabled={!selectedOption}
          >
            <FileUploadIcon className="mr-2" />
            Export
          </button>
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
          {isEditProduct ? (
            <EditProduct
              product={editProductInfo}
              setIsEditProduct={setIsEditProduct}
            />
          ) : (
            <>
              <div className=" flex flex-col mt-3 md:mt-7 overflow-x-auto rounded-md dark:bg-white/5 bg-white p-3 md:p-5 ">
                <p className=" dark:text-gray-400 text-[#363F4D] font-bold plus-jakarta plus-jakarta plus-jakarta text-[15px] md:text-[21px] 2xl:text-[23px] ">
                  Unapproved Products
                </p>
                <div className="overflow-x-auto">
                  <div className=" flex flex-col md:flex-row md:items-center justify-between">
                    <div className=" flex flex-col md:flex-row md:items-center gap-3 py-2"></div>
                  </div>
                  <table className="w-full border-collapse">
                    <thead className="">
                      <tr className="text-[#363F4D] font-[700] plus-jakarta text-[13px] md:text-[15px] 2xl:text-[16px] bg-[#e5e5e5]">
                        <th className="py-2 px-4">#ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                        <th className="py-2 px-4">Mail</th>
                        <th className="py-2 px-4">Approve</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {sortedArray1
                        .filter((i) => {
                          if (filterMethod1 !== "") {
                            return (
                              i.status.toLowerCase() ===
                                filterMethod1.toLowerCase() &&
                              i.approved !== true
                            );
                          } else {
                            return i.approved !== true;
                          }
                        })
                        .slice(startIndex, endIndex)
                        .map((item, index) => {
                          return (
                            <tr key={index} className="">
                              <td className="text-center py-2 px-4 text-[13px] md:text-[15px] 2xl:text-[16px] my-2 dark:text-gray-400 text-[#495058] font-[600] plus-jakarta">
                                #{item._id.slice(-6)}
                              </td>
                              {dialog && (
                                <VendorDetailsDialog
                                  userData={activeUserData}
                                  close={closeModal}
                                />
                              )}
                              <td className="text-center py-2 px-4 text-[13px] md:text-[15px] 2xl:text-[16px] my-2  dark:text-gray-400 text-[#495058]  font-[600] plus-jakarta">
                                {item.title}
                              </td>
                              <td className="text-center py-2 px-4 text-[13px] md:text-[15px] 2xl:text-[16px] my-2  text-[#FF7004] font-[600] plus-jakarta">
                                AED {item.price}
                              </td>
                              <td className="text-center py-2 px-4 dark:text-gray-400 text-[#495058] my-1 text-[13px] md:text-[15px] 2xl:text-[16px]">
                                {item?.status}
                              </td>
                              <td className="  items-center gap-2 py-2 px-4">
                                <button
                                  onClick={() => {
                                    setActiveUserData(item);
                                    setDialog(true);
                                  }}
                                  className="bg-[#FF7004] px-4 py-2.5 my-1 w-[100px] sm:w-[150px] lg:w-full mx-auto font-medium text-[11.2px] md:text-[13px] text-white"
                                >
                                  View
                                </button>
                              </td>
                              <td className="  items-center gap-2 py-2 px-4">
                                <Link to="/admindashboard/newsletter">
                                  <button className=" px-4 py-2.5 my-1 text-[22px] mx-auto font-medium  text-black  dark:text-white">
                                    <IoMail />
                                  </button>
                                </Link>
                              </td>
                              <td className="  items-center gap-2 py-2 px-4">
                                {loading && processingTab === item?._id ? (
                                  <img
                                    src="/Images/loader.svg"
                                    alt="loading..."
                                    className=" object-contain w-[40px] h-[40px]"
                                  />
                                ) : (
                                  <button
                                    onClick={() => {
                                      approveProduct(item);
                                    }}
                                    title="send email"
                                    className="bg-[#FF7004] px-4 py-2.5 my-1 w-[100px] sm:w-[150px] lg:w-full mx-auto font-medium text-[11.2px] md:text-[13px] text-white"
                                  >
                                    Approve
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-end gap-8">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                      Page{" "}
                      <strong className="text-gray-900">{currentPage}</strong>{" "}
                      of
                      <strong className="text-gray-900">{totalPages}</strong>
                    </p>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* approvend Products list -------------------------------------------------------------- */}
              <div className=" flex flex-col mt-3 md:mt-7 overflow-x-auto rounded-md dark:bg-white/5 bg-white p-3 md:p-5 ">
                <p className=" dark:text-gray-400 text-[#363F4D] font-bold plus-jakarta plus-jakarta text-[15px] md:text-[21px] 2xl:text-[23px] ">
                  Approved Products
                </p>
                <div className="overflow-x-auto">
                  <div className=" flex flex-col md:flex-row md:items-center justify-between">
                    <div className=" flex flex-col md:flex-row md:items-center gap-3 py-2"></div>
                  </div>
                  <table className="w-full border-collapse">
                    <thead className="">
                      <tr className="text-[#363F4D] font-[700] plus-jakarta text-[13px] md:text-[15px] 2xl:text-[16px] bg-[#e5e5e5]">
                        <th className="py-2 px-4">#ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Featured </th>
                        <th className="py-2 px-4">Stock </th>
                        <th className="py-2 px-4">Action</th>
                        <th className="py-2 px-4">Mail</th>
                        <th className="py-2 px-4">Edit</th>
                        <th className="py-2 px-4">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {sortedArray2
                        .filter((i) => {
                          if (filterMethod2 !== "") {
                            return (
                              i.status.toLowerCase() ===
                                filterMethod2.toLowerCase() &&
                              i.approved === true
                            );
                          } else {
                            return i.approved === true;
                          }
                        })
                        .slice(startIndex2, endIndex2)
                        .map((item, index) => {
                          return (
                            <tr key={index} className="">
                              <td className="text-center py-2 px-4 text-[13px] md:text-[15px] 2xl:text-[16px] my-2 dark:text-gray-400 text-[#495058] font-[600] plus-jakarta">
                                #{item._id.slice(-6)}
                              </td>
                              {dialog && (
                                <VendorDetailsDialog
                                  userData={activeUserData}
                                  close={closeModal}
                                />
                              )}
                              <td className="text-center py-2 px-4 text-[13px] md:text-[15px] 2xl:text-[16px] my-2  dark:text-gray-400 text-[#495058]  font-[600] plus-jakarta">
                                {item.title}
                              </td>
                              <td className="text-center py-2 px-4 text-[13px] md:text-[15px] 2xl:text-[16px] my-2  text-[#FF7004] font-[600] plus-jakarta">
                                {item.price}
                              </td>
                              <td className="text-center py-2 px-4 dark:text-gray-400 text-[#495058] my-1 text-[13px] md:text-[15px] 2xl:text-[16px]">
                                {item?.status}
                              </td>
                              <td className="text-center py-2 px-4 dark:text-gray-400 text-[#495058] my-1 text-[13px] md:text-[15px] 2xl:text-[16px]">
                                <div className=" flex items-center justify-center">
                                  {item?.featured ? (
                                    <RiStarFill
                                      onClick={() => {
                                        markFeatured(item);
                                      }}
                                      className=" text-[22px] cursor-pointer text-yellow-400"
                                    />
                                  ) : (
                                    <MdStarOutline
                                      onClick={() => {
                                        markFeatured(item);
                                      }}
                                      className=" text-[22px] cursor-pointer"
                                    />
                                  )}
                                </div>
                              </td>
                              <td className="text-center py-2 px-4 dark:text-gray-400 text-[#495058] my-1 text-[13px] md:text-[15px] 2xl:text-[16px]">
                                <input
                                  type="checkbox"
                                  checked={item?.isStock}
                                  onChange={() => handleChangeStockStatus(item)}
                                />
                              </td>
                              <td className="  items-center gap-2 py-2 px-4">
                                <button
                                  onClick={() => {
                                    setActiveUserData(item);
                                    setDialog(true);
                                  }}
                                  className="bg-[#FF7004] px-4 py-2.5 my-1 w-[100px] sm:w-[150px] lg:w-full mx-auto font-medium text-[11.2px] md:text-[13px] text-white"
                                >
                                  View
                                </button>
                              </td>
                              <td className="  items-center gap-2 py-2 px-4">
                                <Link to="/admindashboard/newsletter">
                                  <button className=" px-4 py-2.5 my-1 text-[22px] mx-auto font-medium  text-black  dark:text-white">
                                    <IoMail />
                                  </button>
                                </Link>
                              </td>
                              <td className="  items-center gap-2 py-2 px-4">
                                <button
                                  onClick={() => {
                                    setEditProductInfo(item);
                                    setIsEditProduct(true);
                                  }}
                                  // to={`/admindashboard/add-product`}
                                  className="bg-[#FF7004] px-4 py-2.5 my-1 w-[100px] sm:w-[150px] lg:w-full mx-auto font-medium text-[11.2px] md:text-[13px] text-white"
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="  items-center gap-2 py-2 px-4">
                                <button
                                  className=" px-4 py-2.5 my-1 text-[22px] mx-auto font-medium  text-black  dark:text-white"
                                  onClick={() => handleDeleteProduct(item._id)}
                                >
                                  <MdDelete />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-end gap-8">
                    <button
                      disabled={currentPage2 === 1}
                      onClick={() => handlePageChange2(currentPage2 - 1)}
                      className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                      Page{" "}
                      <strong className="text-gray-900">{currentPage2}</strong>{" "}
                      of
                      <strong className="text-gray-900">{totalPages2}</strong>
                    </p>

                    <button
                      disabled={currentPage2 === totalPages2}
                      onClick={() => handlePageChange2(currentPage2 + 1)}
                      className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
