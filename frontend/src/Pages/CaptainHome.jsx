import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUp from "../Components/RidePopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";

function CaptainHome() {
  const [RidePopUP, setRidePopUP] = useState(true);
  const [ConfirmRidePopUP, SetConfirmRidePopUP] = useState(false);

  const RidePopRef = useRef();
  const ConfirmRidePopRef = useRef();

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
    <div className="h-screen w-full relative">
      <div className="fixed z-10 flex p-2 top-1 w-full items-center justify-between">
        <img className="w-[20%] z-10 left-3" src="/img/uber.png" alt="uber" />
        <Link
          to={"/captain/logout"}
          className="w-10 text-black z-10 text-xl bg-white hover:bg-gray-50 cursor-pointer h-10 rounded-full flex items-center justify-center"
        >
          <HiOutlineLogout />
        </Link>
      </div>
      <div className="w-full h-screen overflow-hidden">
        <img
          className="w-full scale-150 h-full object-cover object-center"
          src="https://lh3.googleusercontent.com/T1GrZUsdVEeZhUu9cCHivhEBh536MDTvFsJi_0ZDdjpBeRjt3YX-EmMqG4x_Ms4L2rBxKEUilGx5Lu_0c5i4rNDwvqzs9MJdTG6Cs1I=rw-e365-w2048"
          alt="maps"
        />
      </div>
      <div className="fixed bottom-0 w-full">
        <CaptainDetails />
      </div>
      <div
        ref={RidePopRef}
        className="w-full z-10 translate-y-0 fixed bottom-0"
      >
        <RidePopUp
          setRidePopUP={setRidePopUP}
          SetConfirmRidePopUP={SetConfirmRidePopUP}
        />
      </div>
      <div
        ref={ConfirmRidePopRef}
        className="w-full h-screen z-20 translate-y-full fixed bottom-0"
      >
        <ConfirmRidePopUp
          setRidePopUP={setRidePopUP}
          SetConfirmRidePopUP={SetConfirmRidePopUP}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
