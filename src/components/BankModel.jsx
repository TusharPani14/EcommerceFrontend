import React from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const BankModal = ({
  bankModel,
  setBankModel,
  productsModified,
  customerId,
  total,
}) => {
  const handleConfirmPayment = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/order/bank-checkout`, {
        customerId,
        chargetotal: total,
        products: productsModified,
      });
      toast.success("Order Placed!");
      console.log(response.data);
      setBankModel(false)
    } catch (error) {
      console.error("There was an error confirming the payment!", error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!bankModel}
      className={`${
        bankModel ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bank Transfer Details
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setBankModel(false)}
            >
              <FaTimes className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Please use the following details to complete your bank transfer:
            </p>
            <ul className="text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-2">
              <li>
                <strong>Bank Name:</strong> Example Bank
              </li>
              <li>
                <strong>Account Number:</strong> 123456789
              </li>
              <li>
                <strong>IBAN:</strong> EX12345678901234567890
              </li>
              <li>
                <strong>BIC:</strong> EXAMPBIC123
              </li>
              <li>
                <strong>Account Holder:</strong> John Doe
              </li>
              <li>
                <strong>Bank Address:</strong> 123 Bank Street, Finance City
              </li>
            </ul>
          </div>
          {/* Modal footer */}
          <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankModal;
