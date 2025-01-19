import React, { useContext, useEffect } from "react";
import mapImg from "../assets/mapImg.png";

import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import CaptainDetail from "../components/CaptainDetail";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import RideRequestPopUp from "../components/RideRequestPopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { CaptainPanelDataContext } from "../context/CaptainPanelContext";
import { useSocket } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
const CaptainHome = () => {
  const { logoutCaptain, captain } = useContext(CaptainDataContext);
  const { ridePopup, setRidePopup } = useContext(CaptainPanelDataContext);
  const { sendMessage, socket } = useSocket();
  console.log(captain, "captainDta");
  useEffect(() => {
    if (captain) {
      sendMessage("join", { userType: "captain", userId: captain._id });

      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            sendMessage("update-location-captain", {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          });
        }
      };
      const locationInterval = setInterval(updateLocation, 10000);
      updateLocation();

      return () => clearInterval(locationInterval);
    }
  }, [captain]);
  // socket.on("new-ride", (data) => {
  //   console.log(data);
  // });

  const navigate = useNavigate();

  const logoutHandler = async () => {
    const success = await logoutCaptain();
    if (success) {
      toast.success("Logged Out!!");
      navigate("/captain-login");
    } else {
      toast.error("Failed to Logout!!");
    }
  };

  return (
    <div className="h-screen relative">
      <div
        onClick={logoutHandler}
        className="z-10 absolute top-6  right-4 p-1 bg-gray-200 rounded-full  "
      >
        <IoIosLogOut className="h-8 w-8" />
      </div>
      <div
        onClick={() => {
          setRidePopup(false);
        }}
        className="h-full w-full"
      >
        {/* <img src={mapImg} className="h-full w-full object-cover" /> */}
        <LiveTracking />
      </div>
      <CaptainDetail />
      <RideRequestPopUp />
      <ConfirmRidePopup />
    </div>
  );
};

export default CaptainHome;
