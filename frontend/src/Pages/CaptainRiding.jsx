import React, { useRef, useState } from "react";
import FinishRide from "../Components/FinishRide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function CaptainRiding() {
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
      <div className="fixed w-full bottom-0 p-6 bg-white translate-y-0">
        <h2 className="text-center font-bold text-xl w-full mb-4">4 Km away</h2>
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
        className="fixed w-full bottom-0 p-6 bg-white translate-y-full"
      >
        <FinishRide setFinishRide={setFinishRide} />
      </div>
    </div>
  );
}

export default CaptainRiding;
