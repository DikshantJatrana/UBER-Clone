import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDownWideFill } from "react-icons/ri";
import { HiCash } from "react-icons/hi";

const ConfirmedVehicle = ({
  setOpenvehicle,
  setConfirmPanel,
  fare,
  pickup,
  destination,
  selectVehicle,
}) => {
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
        {!selectVehicle && (
          <div className="h-28 flex items-center justify-center text-gray-500">
            Select a vehicle to see the image
          </div>
        )}
        {selectVehicle === "auto" && (
          <img src="/img/auto.avif" alt="Auto" className="h-28" />
        )}
        {selectVehicle === "bike" && (
          <img src="/img/moto.webp" alt="Bike" className="h-28" />
        )}
        {selectVehicle === "car" && (
          <img src="/img/car.webp" alt="Car" className="h-28" />
        )}
      </div>
      <div className="w-full px-6 mt-6">
        <div className="flex items-start mb-4 border-b-2 p-2">
          <FaLocationDot className="text-xl text-black mt-1" />
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-900">{pickup}</h3>
          </div>
        </div>
        <div className="flex items-start mb-4 border-b-2 p-2">
          <div className="w-4 h-4 bg-black rounded-sm mt-1"></div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {destination}
            </h3>
          </div>
        </div>
        <div className="flex items-start mt-4 border-b-2 p-2">
          <HiCash className="text-xl text-black mt-1" />
          <div className="ml-4">
            <p className="text-sm text-gray-900 font-bold">
              ₹ {fare?.fares?.[selectVehicle]}
            </p>
            <p className="text-sm text-gray-500">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedVehicle;
