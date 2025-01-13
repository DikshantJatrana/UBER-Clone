import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ConfirmRidePopUp({ ride, setRidePopUP, SetConfirmRidePopUP }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
        {
          params: {
            rideId: ride._id,
            otp: String(otp), // Convert OTP to string explicitly
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        navigate("/captain-riding", { state: { ride } });
      }
    } catch (error) {
      console.error(
        "Error in handleSubmit:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex z-20 h-screen bg-white flex-col gap-6 p-6">
      <div
        onClick={() => {
          setRidePopUP(false);
          SetConfirmRidePopUP(false);
        }}
        className="w-full text-3xl flex items-center cursor-pointer justify-center text-gray-600"
      >
        <RiArrowDownWideFill />
      </div>
      <div className="flex items-center bg-yellow-400 p-3 rounded-lg justify-between">
        <div className="flex text-4xl items-center">
          <FaUserCircle />
          <div>
            <p className="font-bold ml-2 text-lg text-gray-800">
              {ride?.user?.fullName.firstName +
                " " +
                ride?.user?.fullName.lastName}
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
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setRidePopUP(false);
                SetConfirmRidePopUP(false);
              }}
              className="w-full bg-red-600 text-white py-3 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmRidePopUp;
