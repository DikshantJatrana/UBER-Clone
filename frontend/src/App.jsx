import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import UserSign from "./Pages/UserSign";
import UserLogin from "./Pages/UserLogin";
import CaptainSign from "./Pages/CaptainSign";
import CaptainLogin from "./Pages/CaptainLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/register" element={<UserSign />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/captain/register" element={<CaptainSign />} />
      <Route path="/captain/login" element={<CaptainLogin />} />
    </Routes>
  );
}

export default App;
