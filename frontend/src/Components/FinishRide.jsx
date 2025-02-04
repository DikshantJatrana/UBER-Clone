import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FinishRide({ ride, setFinishRide }) {
  const navigate = useNavigate();

  const handleEndRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      navigate("/captain-Home");
    }
  };
  return (
    <div className="flex z-20 bg-white flex-col p-4">
      <div
        onClick={() => {
          setFinishRide(false);
        }}
        className="w-full text-3xl flex items-center cursor-pointer justify-center text-gray-600"
      >
        <RiArrowDownWideFill />
      </div>
      <div className="flex items-center border-2 border-yellow-400 p-3 rounded-lg justify-between">
        <div className="flex text-4xl items-center">
          <FaUserCircle />
          <div>
            <p className="font-bold ml-2 text-lg text-gray-800">
              {ride?.user?.fullName?.firstName +
                " " +
                ride?.user?.fullName?.lastName}
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold text-lg text-gray-800 flex items-center">
            {ride?.distance}
          </p>
          <p className="text-sm text-gray-500">Distance</p>
        </div>
      </div>
      <div className="w-full px-6 mt-6">
        <div className="flex items-start mb-4 border-b-2 p-2">
          <FaLocationDot className="text-xl text-black mt-1" />
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {ride?.pickup}
            </h3>
          </div>
        </div>
        <div className="flex items-start mb-4 border-b-2 p-2">
          <div className="w-4 h-4 bg-black rounded-sm mt-1"></div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {ride?.destination}
            </h3>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          handleEndRide();
        }}
        className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium"
      >
        Ride Complete
      </button>
    </div>
  );
}

export default FinishRide;
