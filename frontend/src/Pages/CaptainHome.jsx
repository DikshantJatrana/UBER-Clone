import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUp from "../Components/RidePopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import { useCaptainContext } from "../Context/CaptainContext";
import axios from "axios";
import { useSocket } from "../Context/SocketContext";
import LiveTracking from "../Components/LiveTracking";

function CaptainHome() {
  const { sendMessage, receiveMessage } = useSocket();
  const { captain, setCaptain } = useCaptainContext();
  const [ride, setRide] = useState(null);
  const [RidePopUP, setRidePopUP] = useState(false);
  const [ConfirmRidePopUP, SetConfirmRidePopUP] = useState(false);
  const RidePopRef = useRef();
  const ConfirmRidePopRef = useRef();

  async function confirmRide() {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/confirmRide`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    SetConfirmRidePopUP(true);
    setRidePopUP(false);
  }

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        sendMessage("updateLocation-captain", {
          userId: captain._id,
          location: { lat: latitude, lng: longitude },
        });
      });
    };

    const intervalId = setInterval(updateLocation, 10000);

    return () => clearInterval(intervalId);
  }, [captain]);

  useEffect(() => {
    receiveMessage("newRide", (data) => {
      console.log("New ride received:", data);
      setRide(data);
      setRidePopUP(true);
    });
  });

  useGSAP(() => {
    if (RidePopUP) {
      gsap.to(RidePopRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(RidePopRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [RidePopUP]);

  useGSAP(() => {
    if (ConfirmRidePopUP) {
      gsap.to(ConfirmRidePopRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmRidePopRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePopUP]);

  return (
    <div className="h-screen w-full flex flex-col relative">
      <div className="fixed z-10 flex p-2 top-1 w-full items-center justify-between">
        <img className="w-[20%] z-50 left-3" src="/img/uber.png" alt="uber" />
        <Link
          to={"/captain/logout"}
          className="w-10 text-black z-50 text-xl bg-white hover:bg-gray-50 cursor-pointer h-10 rounded-full flex items-center justify-center"
        >
          <HiOutlineLogout />
        </Link>
      </div>
      <div className="w-full z-0 h-screen overflow-hidden">
        <LiveTracking />
      </div>
      <div className="fixed bottom-0 w-full">
        <CaptainDetails />
      </div>
      <div
        ref={RidePopRef}
        className="w-full z-10 translate-y-full fixed bottom-0"
      >
        <RidePopUp
          confirmRide={confirmRide}
          ride={ride}
          setRidePopUP={setRidePopUP}
          SetConfirmRidePopUP={SetConfirmRidePopUP}
        />
      </div>
      <div
        ref={ConfirmRidePopRef}
        className="w-full h-screen z-20 translate-y-full fixed bottom-0"
      >
        <ConfirmRidePopUp
          ride={ride}
          setRidePopUP={setRidePopUP}
          SetConfirmRidePopUP={SetConfirmRidePopUP}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
