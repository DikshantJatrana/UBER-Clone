import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CaptainLogout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const logout = async () => {
      if (hasLoggedOut.current) return;
      hasLoggedOut.current = true;

      await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      navigate("/captain-login");
    };

    logout();
  }, [token]);

  return <div>Logging out...</div>;
}

export default CaptainLogout;
