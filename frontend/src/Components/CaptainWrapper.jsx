import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCaptainContext } from "../Context/CaptainContext";

function CaptainWrapper({ children }) {
  const { setCaptain } = useCaptainContext();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCaptain(res.data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          navigate("/captain-login");
        }
      });
  }, [token, navigate, setCaptain]);

  return <>{children}</>;
}

export default CaptainWrapper;
