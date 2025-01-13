import React, { useRef, useState, useEffect } from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LocationList from "../Components/LocationSelection";
import VehicleSelection from "../Components/VehicleSelection";
import ConfirmedVehicle from "../Components/ConfirmedVehicle";
import DriverFound from "../Components/DriverFound";
import axios from "axios";
import { useSocket } from "../Context/SocketContext";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../Components/LiveTracking";

function Home() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { sendMessage, receiveMessage } = useSocket();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [openPanel, setOpenPanel] = useState(false);
  const [openVehicle, setOpenvehicle] = useState(false);
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [selectVehicle, setVehicle] = useState();
  const [fare, setFare] = useState({});
  const [query, setQuery] = useState("");
  const [isPickup, setIsPickup] = useState(true);
  const [ride, setRide] = useState(null);
  const panelRef = useRef();
  const buttonRef = useRef();
  const vehicleRef = useRef();
  const confirmRef = useRef();
  const driverFoundRef = useRef();

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });
  }, [user]);

  useEffect(() => {
    receiveMessage("rideConfirmed", (data) => {
      console.log("rideConfirmed", data);
      setRide(data);
      setDriverFound(true);
      setConfirmPanel(false);
    });
  }, [setRide, receiveMessage]);

  receiveMessage("rideStarted", (data) => {
    navigate("/riding", { state: { ride: data } });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (openPanel) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
      gsap.to(buttonRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    } else {
      gsap.to(panelRef.current, {
        height: "0",
      });
      gsap.to(buttonRef.current, { opacity: 0, duration: 0.3, delay: 0.1 });
    }
  }, [openPanel]);

  useGSAP(() => {
    if (openVehicle) {
      gsap.to(vehicleRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [openVehicle]);

  useGSAP(() => {
    if (confirmPanel) {
      gsap.to(confirmRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmPanel]);

  useGSAP(() => {
    if (driverFound) {
      gsap.to(driverFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(driverFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [driverFound]);

  const handleFindTrip = async () => {
    setOpenPanel(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/calFare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data) {
      console.log(response.data);
      setFare(response.data);
      setOpenvehicle(true);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col relative">
      <img
        className="w-[20%] absolute top-3 z-50 left-3"
        src="/img/uber.png"
        alt="uber"
      />
      {/* Map Component */}
      <div className="w-full h-screen absolute z-0">
        <LiveTracking />
      </div>

      {/* Panels */}
      <div className="w-full h-screen flex flex-col justify-end absolute z-10">
        <div className="w-full min-h-56 rounded-t-lg relative h-[39%] overflow-y-auto bg-white px-4 py-6 shadow">
          <span
            ref={buttonRef}
            onClick={() => {
              setOpenPanel(false);
            }}
            className="h-15 top-5 cursor-pointer right-3 w-15 absolute flex items-center justify-normal rounded-full hover:bg-gray-50 p-1"
          >
            <RiArrowDownWideFill className="text-2xl" />
          </span>
          <h2 className="text-lg font-semibold mt-5 text-black">Find a trip</h2>
          <form className="relative" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-4 h-4 rounded-full border-2 border-black"></div>
              <input
                onClick={() => {
                  setOpenPanel(true);
                  setIsPickup(true);
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  setQuery(e.target.value);
                }}
                type="text"
                placeholder="Add a pick-up location"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500"
              />
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-4 h-4 rounded-sm border-2 border-black"></div>
              <input
                value={destination}
                onClick={() => {
                  setOpenPanel(true);
                  setIsPickup(false);
                }}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setQuery(e.target.value);
                }}
                type="text"
                placeholder="Enter your destination"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleFindTrip}
              className="w-full text-white bg-black font-semibold py-2 mt-4 text-lg rounded-md"
            >
              Find Trip
            </button>
            <div className="line h-12 w-2 border-l-2 border-dashed border-gray-700 absolute top-[26%] left-[2%] rounded-full"></div>
          </form>
        </div>
        <div ref={panelRef} className="w-full h-0 bg-rose-600">
          <LocationList
            setOpenvehicle={setOpenvehicle}
            setOpenPanel={setOpenPanel}
            setPickup={setPickup}
            setDestination={setDestination}
            query={query}
            isPickup={isPickup}
          />
        </div>
      </div>

      {/* Vehicle Selection */}
      <div
        ref={vehicleRef}
        className="w-full z-20 fixed translate-y-full bottom-0"
      >
        <VehicleSelection
          setOpenvehicle={setOpenvehicle}
          setOpenPanel={setOpenPanel}
          setConfirmPanel={setConfirmPanel}
          fare={fare}
          pickup={pickup}
          destination={destination}
          selectVehicle={selectVehicle}
          setVehicle={setVehicle}
        />
      </div>

      {/* Confirmed Vehicle */}
      <div
        ref={confirmRef}
        className="w-full z-20 fixed translate-y-full bottom-0"
      >
        <ConfirmedVehicle
          fare={fare}
          pickup={pickup}
          destination={destination}
          setOpenvehicle={setOpenvehicle}
          setConfirmPanel={setConfirmPanel}
          selectVehicle={selectVehicle}
        />
      </div>

      {/* Driver Found */}
      <div
        ref={driverFoundRef}
        className="w-full z-30 fixed translate-y-full bottom-0"
      >
        <DriverFound ride={ride} setDriverFound={setDriverFound} />
      </div>
    </div>
  );
}

export default Home;
