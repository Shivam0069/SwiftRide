import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CaptainProtectWrapper = ({ children }) => {
  const { captainIsAuthenticated, captainIsLoading } =
    useContext(CaptainDataContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!captainIsLoading && !captainIsAuthenticated) {
      toast.error("UnAuthenticated! Login");
      navigate("/captain-login");
    }
  }, [captainIsAuthenticated, captainIsLoading, navigate]);

  if (captainIsLoading) {
    return (
      <div className="h-screen bg-[#191919] text-white w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
