import { createContext, useContext, useState } from "react";

const captainContext = createContext();

export const useCaptainContext = () => {
  return useContext(captainContext);
};

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    phone: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      type: "",
    },
  });

  return (
    <captainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </captainContext.Provider>
  );
};
