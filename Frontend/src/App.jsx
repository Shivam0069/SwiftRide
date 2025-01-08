import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { UserDataContext } from "./context/UserContext";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import UserProtectWrapper from "./components/UserProtectWrapper";
export default function App() {
  return (
    <div>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}
