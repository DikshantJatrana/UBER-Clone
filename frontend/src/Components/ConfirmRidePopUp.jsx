import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ConfirmRidePopUp({ setRidePopUP, SetConfirmRidePopUP }) {
  const navigate = useNavigate("");
  const [otp, setOtp] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
            <p className="font-bold ml-2 text-lg text-gray-800">Harsh Patel</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-lg text-gray-800 flex items-center">
            2.2 KM
          </p>
          <p className="text-sm text-gray-500">Distance</p>
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
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500"
          />
          <div className="flex gap-3">
            <button
              onClick={() => {
                setRidePopUP(false);
                SetConfirmRidePopUP(false);
              }}
              className="w-full bg-red-600 text-white py-3 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                navigate("/captain-riding");
              }}
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
