import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { HiCash } from "react-icons/hi";

const DriverFound = ({ setDriverFound }) => {
  return (
    <div className="flex flex-col items-center rounded-t-xl bg-white w-full py-6">
      <div className="w-full px-6 mt-4">
        <p className="text-center font-semibold text-lg text-gray-800 mb-4">
          Meet at the pickup point
        </p>
        <div className="flex items-center px-5 justify-between">
          <img
            src="/img/car.webp"
            alt="Driver"
            className="w-24 h-16 rounded-full mr-4"
          />
          <div className="flex items-center">
            <div className="text-right">
              <p className="font-bold text-gray-800">SANTH</p>
              <p className="text-lg font-semibold -my-1  text-gray-900">
                KA15AK00
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-yellow-500">★</span> 4.9
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-6 mt-6">
        <div className="flex items-start mb-4 border-b-2 p-2">
          <FaLocationDot className="text-xl text-black mt-1" />
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-900">562/11-A</h3>
            <p className="text-sm text-gray-500">
              Kaikondrahalli, Bengaluru, Karnataka
            </p>
          </div>
        </div>
        <div className="flex items-start mb-4 border-b-2 p-2">
          <div className="w-4 h-4 bg-black rounded-sm mt-1"></div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Third Wave Coffee
            </h3>
            <p className="text-sm text-gray-500">
              17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru,
              Karnataka
            </p>
          </div>
        </div>
        <div className="flex items-start mt-4 border-b-2 p-2">
          <HiCash className="text-xl text-black mt-1" />
          <div className="ml-4">
            <p className="text-sm text-gray-900 font-bold">₹193.20</p>
            <p className="text-sm text-gray-500">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverFound;
