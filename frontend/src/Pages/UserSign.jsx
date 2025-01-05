import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Context/UserContext";

function UserSign() {
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const { user, setUser } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      currentUser
    );
    if (response.status == 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen max-w-md bg-white flex flex-col justify-between rounded-lg p-8">
        <div>
          <img className="w-[30%] mt-3 mb-2" src="/img/uber.png" alt="uber" />
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
            <button
              type="submit"
              className="bg-black mt-[3%] text-xl font-bold rounded w-full py-3 text-white mb-3 relative"
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              login to account
            </Link>
          </div>
        </div>
        <p className="text-[8px] text-center text-gray-700">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
}

export default UserSign;
