import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome";
import UserProtectWrapper from "./components/UserProtectWrapper";
import CaptainProtectWrapper from "./components/CaptainProtectWrapper";
import LoginSignupProtectWrapper from "./components/LoginSignupProtectWrapper";

export default function App() {
  return (
    <div className="select-none">
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/login"
          element={
            <LoginSignupProtectWrapper>
              <UserLogin />
            </LoginSignupProtectWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <LoginSignupProtectWrapper>
              <UserSignup />
            </LoginSignupProtectWrapper>
          }
        />
        <Route
          path="/captain-login"
          element={
            <LoginSignupProtectWrapper>
              <CaptainLogin />
            </LoginSignupProtectWrapper>
          }
        />
        <Route
          path="/captain-signup"
          element={
            <LoginSignupProtectWrapper>
              <CaptainSignup />
            </LoginSignupProtectWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}
