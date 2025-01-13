import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import UserSign from "./Pages/UserSign";
import UserLogin from "./Pages/UserLogin";
import CaptainSign from "./Pages/CaptainSign";
import CaptainLogin from "./Pages/CaptainLogin";
import Start from "./Pages/Start";
import UserWrapper from "./Components/UserWrapper";
import UserLogout from "./Pages/UserLogout";
import CaptainLogout from "./Pages/CaptainLogout";
import CaptainHome from "./Pages/CaptainHome";
import CaptainWrapper from "./Components/CaptainWrapper";
import Riding from "./Pages/Riding";
import CaptainRiding from "./Pages/CaptainRiding";
import React from "react";
import { SocketProvider } from "./Context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <UserWrapper>
              <Home />
            </UserWrapper>
          }
        />
        <Route path="/riding" element={<Riding />} />
        <Route path="/register" element={<UserSign />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-register" element={<CaptainSign />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route
          path="/user/logout"
          element={
            <UserWrapper>
              <UserLogout />
            </UserWrapper>
          }
        />
        <Route path="/captain/logout" element={<CaptainLogout />} />
        <Route
          path="/captain-Home"
          element={
            <CaptainWrapper>
              <CaptainHome />
            </CaptainWrapper>
          }
        />
        <Route path="/captain-riding" element={<CaptainRiding />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
