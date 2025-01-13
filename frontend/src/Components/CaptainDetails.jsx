import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaClock, FaRupeeSign } from "react-icons/fa";
import { useCaptainContext } from "../Context/CaptainContext";

function CaptainDetails() {
  const { captain, setCaptain } = useCaptainContext();
  return (
    <div className="flex bg-white flex-col p-6">
      <div className="flex items-center justify-between">
        <div className="flex text-3xl items-center">
          <FaUserCircle />
          <div>
            <p className="font-bold ml-2 text-lg capitalize text-gray-800">
              {captain?.fullName?.firstName +
                " " +
                captain?.fullName?.lastName || "Captain"}
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl text-gray-800 flex items-center">
            <FaRupeeSign className="mr-1" /> 295.20
          </p>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 mb-5 text-center bg-gray-100 p-4 rounded-lg shadow-md">
        <div>
          <FaClock className="text-2xl text-gray-600 mx-auto" />
          <p className="font-bold text-lg text-gray-800 mt-1">10.2</p>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div>
          <FaClock className="text-2xl text-gray-600 mx-auto" />
          <p className="font-bold text-lg text-gray-800 mt-1">10.2</p>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div>
          <FaClock className="text-2xl text-gray-600 mx-auto" />
          <p className="font-bold text-lg text-gray-800 mt-1">10.2</p>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
