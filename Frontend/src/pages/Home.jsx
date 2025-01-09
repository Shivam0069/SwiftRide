import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import mapImg from "../assets/mapImg.png";
import LocationSearchPanel from "../components/LocationSearchPanel";

import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForRidder from "../components/LookingForRidder";
import WaitingForRidder from "../components/WaitingForRidder";
import { UserPanelDataContext } from "../context/UserPanelContext";
const Home = () => {
  const {
    panel,
    setPanel,
    setVehiclePanelOpen,
    setConfirmRidePanelOpen,
    setLookingForRidderPanelOpen,
    route,
    setRoute,
  } = useContext(UserPanelDataContext);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#191919] h-screen w-full relative overflow-hidden">
      <div
        onClick={() => {
          setPanel(false);
          setVehiclePanelOpen(false);
          setConfirmRidePanelOpen(false);
          setLookingForRidderPanelOpen(false);
        }}
      >
        <img src={mapImg} className="h-screen w-full object-cover" />
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
                onChange={(e) => setRoute({ ...route, pickup: e.target.value })}
                onClick={() => setPanel(true)}
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
                onChange={(e) =>
                  setRoute({ ...route, destination: e.target.value })
                }
                onClick={() => setPanel(true)}
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
