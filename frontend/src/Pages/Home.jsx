import React, { useRef, useState } from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LocationList from "../Components/LocationSelection";
import VehicleSelection from "../Components/VehicleSelection";
import ConfirmedVehicle from "../Components/ConfirmedVehicle";
import DriverFound from "../Components/DriverFound";

function Home() {
  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState();
  const [openPanel, setOpenPanel] = useState(false);
  const [openVehicle, setOpenvehicle] = useState(false);
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const panelRef = useRef();
  const buttonRef = useRef();
  const vehicleRef = useRef();
  const confirmRef = useRef();
  const driverFoundRef = useRef();

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

  return (
    <div className="h-screen w-full flex flex-col relative">
      <img
        className="w-[20%] absolute top-3 z-10 left-3"
        src="/img/uber.png"
        alt="uber"
      />
      <div className="w-full h-screen overflow-hidden">
        <img
          className="w-full scale-150 h-full object-cover object-center"
          src="https://lh3.googleusercontent.com/T1GrZUsdVEeZhUu9cCHivhEBh536MDTvFsJi_0ZDdjpBeRjt3YX-EmMqG4x_Ms4L2rBxKEUilGx5Lu_0c5i4rNDwvqzs9MJdTG6Cs1I=rw-e365-w2048"
          alt="maps"
        />
      </div>
      <div className="w-full h-screen flex flex-col justify-end absolute">
        <div className="w-full min-h-56 rounded-t-lg relative h-[30%] overflow-y-auto bg-white px-4 py-6 shadow">
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
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
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
                }}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                type="text"
                placeholder="Enter your destination"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500"
              />
            </div>
            <div className="line h-12 w-2 border-l-2 border-dashed border-gray-700 absolute top-[26%] left-[2%] rounded-full"></div>
          </form>
        </div>
        <div ref={panelRef} className="w-full h-0 bg-rose-600">
          <LocationList
            setOpenvehicle={setOpenvehicle}
            setOpenPanel={setOpenPanel}
          />
        </div>
      </div>
      <div
        ref={vehicleRef}
        className="w-full z-10 fixed translate-y-full bottom-0"
      >
        <VehicleSelection
          setOpenvehicle={setOpenvehicle}
          setOpenPanel={setOpenPanel}
          setConfirmPanel={setConfirmPanel}
        />
      </div>
      <div
        ref={confirmRef}
        className="w-full z-10 fixed translate-y-full bottom-0"
      >
        <ConfirmedVehicle
          setOpenvehicle={setOpenvehicle}
          setConfirmPanel={setConfirmPanel}
        />
      </div>
      <div className="w-full z-10 fixed translate-y-full bottom-0">
        <DriverFound setDriverFound={setDriverFound} />
      </div>
    </div>
  );
}

export default Home;
