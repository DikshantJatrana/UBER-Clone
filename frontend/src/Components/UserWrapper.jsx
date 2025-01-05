import React, { useEffect } from "react";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function UserWrapper({ children }) {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return <>{children}</>;
}

export default UserWrapper;
