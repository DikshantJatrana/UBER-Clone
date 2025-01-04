import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CaptainSign() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      phone: phone,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        type: type,
      },
    };
    setUser(currentUser);
    console.log(user);
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setPhone("");
    setColor("");
    setPlate("");
    setCapacity("");
    setType("");
  };

  const Navigate = useNavigate();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen max-w-md bg-white flex flex-col justify-between rounded-lg p-8">
        <div>
          <img className="w-[30%] mt-3 mb-2" src="/img/uber.png" alt="uber" />
          <span className="text-2xl">
            <FaArrowRight />
          </span>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Whats your Name
              </label>
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  required
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  placeholder="first name"
                  className="mt-1 block w-full px-4 text-lg placeholder:text-base py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
                />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  placeholder="last name"
                  className="mt-1 block w-full px-4 text-lg placeholder:text-base py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Whats your email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="email@example.com"
                className="mt-1 block w-full px-4 text-lg placeholder:text-base py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Enter Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                className="mt-1 block w-full text-lg placeholder:text-base px-4 py-2 bg-[#eeeeee] rounded-md shadow-sm "
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Whats your Phone Number
              </label>
              <input
                required
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Phone Number"
                className="mt-1 block w-full px-4 text-lg placeholder:text-base py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Whats your vehicle details
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  id="color"
                  name="color"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                  placeholder="color"
                  className="mt-1 block w-full px-4 text-lg placeholder:text-base py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
                />
                <input
                  required
                  type="text"
                  id="plate"
                  name="plate"
                  value={plate}
                  onChange={(e) => {
                    setPlate(e.target.value);
                  }}
                  placeholder="Plate Number"
                  className="mt-1 block w-full px-4 text-lg placeholder:text-base py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
                />
                <input
                  required
                  type="Number"
                  id="capacity"
                  name="capacity"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                  placeholder="Capacity"
                  className="mt-1 block w-full px-4 text-lg placeholder:text-base py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
                />
                <select
                  id="type"
                  name="type"
                  required
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  className="mt-1 block w-full px-4 text-lg py-2 bg-[#eeeeee] rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">vehicle type</option>
                  <option value="auto">Auto</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-black mt-[3%] text-xl font-bold rounded w-full py-3 text-white mb-3 relative"
            >
              Register as Captain
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an captain account?{" "}
            <Link
              to={"/captain/login"}
              className="text-blue-500 hover:underline"
            >
              login as Captain
            </Link>
          </div>
        </div>
        <p className="text-[10px] mt-5 text-center text-gray-700">
          This site is protected by reCAPTCHA and the{" "}
          <span className="text-black cursor-pointer underline">
            Google Privacy
          </span>{" "}
          Policy and{" "}
          <span className="underline cursor-pointer text-black">
            Terms of Service
          </span>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}

export default CaptainSign;
