import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDownWideFill } from "react-icons/ri";
import { HiCash } from "react-icons/hi";

const ConfirmedVehicle = ({ setOpenvehicle, setConfirmPanel }) => {
  return (
    <div className="flex flex-col rounded-t-lg items-center bg-white w-full py-6">
      <div className="w-full text-3xl flex items-center cursor-pointer justify-center text-gray-600">
        <RiArrowDownWideFill
          onClick={() => {
            setOpenvehicle(true);
            setConfirmPanel(false);
          }}
        />
      </div>
      <div className="text-xl font-semibold text-gray-800 mb-4">
        Looking for nearby drivers
      </div>
      <div className="animate-pulse">
        <img src="/img/car.webp" alt="Car searching" className="h-28" />
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

export default ConfirmedVehicle;
