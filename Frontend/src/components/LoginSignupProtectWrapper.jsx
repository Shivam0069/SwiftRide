import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const LoginSignupProtectWrapper = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(UserDataContext);
  const { captainIsAuthenticated, captainIsLoading } =
    useContext(CaptainDataContext);

  const navigate = useNavigate();

  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (!isLoading && !captainIsLoading && isRedirecting) {
      if (isAuthenticated && !captainIsAuthenticated) {
        navigate("/home");
      } else if (captainIsAuthenticated && !isAuthenticated) {
        navigate("/captain-home");
      } else if (!isAuthenticated && !captainIsAuthenticated) {
        setIsRedirecting(false);
      }
    }
  }, [
    isAuthenticated,
    captainIsAuthenticated,
    isLoading,
    captainIsLoading,
    navigate,
  ]);

  if (isRedirecting || isLoading || captainIsLoading) {
    return (
      <div className="h-screen bg-[#191919] text-white w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <div>{children}</div>;
};

export default LoginSignupProtectWrapper;
