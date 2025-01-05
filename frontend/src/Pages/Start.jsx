import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Start() {
  const Navigation = useNavigate();
  return (
    <div className="w-full bg-cover bg-center bg-[url('/img/home1.avif')] h-screen relative flex flex-col justify-between">
      <img className="w-[30%] mt-7 ml-5" src="/img/uber.png" alt="uber" />
      <div className="bg-white px-4 py-3 text-3xl font-bold md:px-8">
        <h2 className="mb-3">Get Started with uber</h2>
        <button
          onClick={() => {
            Navigation("/login");
          }}
          className="bg-black font-semibold rounded-lg w-full py-3 text-white mb-3 relative"
        >
          Continue{" "}
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <FaArrowRightLong />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Start;
