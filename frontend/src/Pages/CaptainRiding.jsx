import React, { useRef, useState } from "react";
import FinishRide from "../Components/FinishRide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import LiveTracking from "../Components/LiveTracking";

function CaptainRiding() {
  const location = useLocation();
  const { ride } = location.state || {};
  const [finishRide, setFinishRide] = useState(false);
  const FinishRideRef = useRef();

  useGSAP(() => {
    if (FinishRideRef.current) {
      if (finishRide) {
        gsap.to(FinishRideRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
        });
      } else {
        gsap.to(FinishRideRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    }
  }, [finishRide]);

  return (
    <div className="h-screen w-full flex flex-col relative">
      <img
        className="w-[20%] absolute top-3 z-50 left-3"
        src="/img/uber.png"
        alt="uber"
      />
      <div className="w-full z-0 h-screen overflow-hidden">
        <LiveTracking />
      </div>
      <div className="fixed w-full bottom-0 z-10 p-6 bg-white translate-y-0">
        <h2 className="text-center font-bold text-xl w-full mb-4">
          {ride ? `${ride.distance} Km away` : "Loading..."}
        </h2>
        <button
          onClick={() => {
            setFinishRide(true);
          }}
          className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium"
        >
          Complete Ride
        </button>
      </div>
      <div
        ref={FinishRideRef}
        className="fixed w-full z-20 bottom-0 p-6 bg-white translate-y-full"
      >
        <FinishRide ride={ride} setFinishRide={setFinishRide} />
      </div>
    </div>
  );
}

export default CaptainRiding;
