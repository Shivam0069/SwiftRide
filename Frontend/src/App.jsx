import React, { useEffect, useState } from "react";
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
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   if (/(Windows|Macintosh|Linux)/i.test(userAgent)) {
  //     alert("Access is only granted through mobile devices.");
  //     window.location.href = "https://www.google.com/";
  //     return;
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);
  // if (isLoading) {
  //   return (
  //     <div className="bg-black h-screen w-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

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
          path="/riding"
          element={
            <UserProtectWrapper>
              <Riding />
            </UserProtectWrapper>
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
        <Route
          path="/captain-riding"
          element={
            <CaptainProtectWrapper>
              <CaptainRiding />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}
