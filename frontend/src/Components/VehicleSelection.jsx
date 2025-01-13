import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiArrowDownWideFill } from "react-icons/ri";
import axios from "axios";

const VehicleSelection = ({
  setOpenvehicle,
  setOpenPanel,
  setConfirmPanel,
  fare,
  pickup,
  destination,
  selectVehicle,
  setVehicle,
}) => {
  const handleSelect = (value) => {
    setVehicle(value);
  };
  const CreateRide = async (selectVehicle, pickup, destination) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/create`,
      {
        pickup,
        destination,
        vehicleType: selectVehicle,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data) {
      setConfirmPanel(true), setOpenvehicle(false);
      console.log(response.data);
    }
  };

  return (
    <div className="bg-white rounded-xl px-4 py-6">
      <div className="w-full text-3xl flex items-center cursor-pointer justify-center text-gray-600">
        <RiArrowDownWideFill
          onClick={() => {
            setOpenvehicle(false);
            setOpenPanel(true);
          }}
        />
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Select Vehicle
      </h2>
      <div className="grid grid-rows-3 gap-3">
        <div
          onClick={() => {
            handleSelect("car");
          }}
          className={`flex py-1 border-2 ${
            selectVehicle === "car" ? "border-black" : "border-[#eee]"
          } rounded-lg items-center cursor-pointer justify-between shadow-sm px-4`}
        >
          <img
            src="/img/car.webp"
            alt="Car"
            className="w-16 h-16 object-center object-cover mb-2 rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold items-center flex text-gray-900">
              Uber Car{"  "}
              <span className="text-sm ml-2 flex items-center">
                <FaUserAlt />4
              </span>
            </h3>
            <h5 className="text-xs">2 min away</h5>
            <p className="text-xs text-gray-500">Affordable and comfy</p>
          </div>
          <div className="text-xl flex items-start font-bold ">
            ₹ {fare?.fares?.car}
          </div>
        </div>
        <div
          onClick={() => {
            handleSelect("auto");
          }}
          className={`flex py-1 border-2 ${
            selectVehicle === "auto" ? "border-black" : "border-[#eee]"
          } shadow-md rounded-lg cursor-pointer items-center justify-between  px-4`}
        >
          <img
            src="/img/auto.avif"
            alt="Car"
            className="w-16 h-16 object-center object-cover mb-2 rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold items-center flex text-gray-900">
              Uber Auto{"  "}
              <span className="text-sm ml-2 flex items-center">
                <FaUserAlt />3
              </span>
            </h3>
            <h5 className="text-xs">2 min away</h5>
            <p className="text-xs text-gray-500">Comfy Auto Rides</p>
          </div>
          <div className="text-xl flex items-start font-bold ">
            ₹ {fare?.fares?.auto}
          </div>
        </div>
        <div
          onClick={() => {
            handleSelect("bike");
          }}
          className={`flex py-1  border-2 ${
            selectVehicle === "bike" ? "border-black" : "border-[#eee]"
          } rounded-lg items-center cursor-pointer justify-between shadow-md px-4`}
        >
          <img
            src="/img/moto.webp"
            alt="Car"
            className="w-16 h-16 object-center object-cover mb-2 rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold items-center flex text-gray-900">
              Uber Moto{"  "}
              <span className="text-sm ml-2 flex items-center">
                <FaUserAlt />1
              </span>
            </h3>
            <h5 className="text-xs">1 min away</h5>
            <p className="text-xs text-gray-500">Cheap Motobike Rides</p>
          </div>
          <div className="text-xl flex items-start font-bold ">
            ₹ {fare?.fares?.bike}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => {
            if (!selectVehicle) {
              alert("Please select a vehicle type.");
              return;
            }
            CreateRide(selectVehicle, pickup, destination);
          }}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default VehicleSelection;
