import React, { useContext, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import mapImg from "../assets/mapImg.png";
import LocationSearchPanel from "../components/LocationSearchPanel";

import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import ConfirmRide from "../components/ConfirmRide";
import LookingForRidder from "../components/LookingForRidder";
import VehiclePanel from "../components/VehiclePanel";
import WaitingForRidder from "../components/WaitingForRidder";
import { UserDataContext, useUser } from "../context/UserContext";
import { UserPanelDataContext } from "../context/UserPanelContext";
import { useSocket } from "../context/SocketContext";
import { useRide } from "../context/RideContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const {
    panel,
    setPanel,
    setVehiclePanelOpen,
    setConfirmRidePanelOpen,
    setLookingForRidderPanelOpen,
    setWaitingForRidderPanelOpen,
    route,
    setRoute,
    setActiveField,
  } = useContext(UserPanelDataContext);
  const { logoutUser } = useContext(UserDataContext);
  const { user } = useUser();
  const { sendMessage, receiveMessage } = useSocket();
  const { setRideData } = useRide();
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      sendMessage("join", { userType: "user", userId: user._id });
    }
  }, [user]);
  console.log(user);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const logoutHandler = async () => {
    const success = await logoutUser();
    if (success) {
      toast.success("Logged Out!!");
      navigate("/login");
    } else {
      toast.error("Failed to Logout!!");
    }
  };

  const handlePickupChange = (e) => {
    setRoute({ ...route, pickup: e.target.value });
  };

  const handleDestinationChange = (e) => {
    setRoute({ ...route, destination: e.target.value });
  };

  receiveMessage("ride-started", (data) => {
    console.log("start-ride", data);

    setWaitingForRidderPanelOpen(false);
    setRideData(data);
    navigate("/riding");
  });

  return (
    <div className=" h-screen w-full relative overflow-hidden">
      {" "}
      <div
        onClick={logoutHandler}
        className="z-10 absolute top-6  right-4 p-1 bg-gray-200 rounded-full  "
      >
        <IoIosLogOut className="h-8 w-8" />
      </div>
      <div
        onClick={() => {
          setPanel(false);
          setVehiclePanelOpen(false);
          setConfirmRidePanelOpen(false);
          setLookingForRidderPanelOpen(false);
          setWaitingForRidderPanelOpen(false);
        }}
        className="h-full w-full"
      >
        {/* <img src={mapImg} className="h-screen w-full object-cover" /> */}
        <LiveTracking />
      </div>
      <div
        className={`h-screen w-full bg-[#191919] text-white absolute bottom-0 z-20 transition-transform duration-500 ${
          panel ? "translate-y-0 " : "translate-y-[75%] rounded-md"
        } `}
      >
        <div
          className={`  p-4 w-full relative 
          }`}
        >
          <h3
            className={`h-7  ${
              panel ? "w-fit mb-3 " : "text-lg font-semibold mb-4"
            }`}
          >
            {panel ? (
              <FaAngleDown
                onClick={() => setPanel(false)}
                className="w-fit h-6"
              />
            ) : (
              <span>
                Find a{" "}
                <span className="bg-custom-gradient bg-clip-text text-transparent">
                  trip
                </span>
              </span>
            )}
          </h3>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col gap-4 relative "
          >
            <div className="relative w-full">
              {/* <div className="absolute top-1/2 left-2 -translate-y-1/2 h-2 w-2 rounded-full border border-white"></div> */}
              <input
                type="text"
                value={route.pickup}
                className="py-2 px-4 pl-10 bg-[#111] text-gray-200 border w-full rounded"
                placeholder="Add a pick-up location"
                onChange={(e) => handlePickupChange(e)}
                onClick={() => {
                  setPanel(true);
                  setActiveField("pickup");
                }}
              />
            </div>
            <div className="absolute top-[50%] translate-y-[-50%] left-[11px] h-[44px] z-10 w-[1px] border border-white before:absolute before:-top-3 before:-left-1  before:h-2 before:w-2 before:rounded-full before:border  after:absolute after:-left-1  after:-bottom-3  after:h-2 after:w-2 after:border"></div>
            <div className="relative w-full">
              {/* <div className="absolute top-1/2 left-2 -translate-y-1/2 h-2 w-2 border border-white"></div> */}
              <input
                type="text"
                value={route.destination}
                className="py-2 px-4 pl-10 border placeholder:text-base text-gray-200 text-base bg-[#111] w-full rounded"
                placeholder="Enter your destination"
                onChange={(e) => handleDestinationChange(e)}
                onClick={() => {
                  setPanel(true);
                  setActiveField("destination");
                }}
              />
            </div>
          </form>
        </div>

        <div className={` h-[75%] w-full  ${panel ? "inline-flex" : "hidden"}`}>
          <LocationSearchPanel />
        </div>
      </div>
      <VehiclePanel />
      <ConfirmRide />
      <LookingForRidder />
      <WaitingForRidder />
    </div>
  );
};

export default Home;
