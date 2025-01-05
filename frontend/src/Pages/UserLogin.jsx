import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Context/UserContext";

function UserLogin() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
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
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen max-w-md bg-white flex flex-col justify-between rounded-lg p-8">
        <div>
          <img className="w-[30%] mt-3 mb-2" src="/img/uber.png" alt="uber" />
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <Link to={"/register"} className="text-blue-500 hover:underline">
              Create new Account
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            navigate("/captain-login");
          }}
          className="bg-[#3B864E] text-xl font-bold rounded w-full py-3 text-white mb-3 relative"
        >
          Login as Captain
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
