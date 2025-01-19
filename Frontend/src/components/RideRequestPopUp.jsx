import React, { useContext, useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { CaptainPanelDataContext } from "../context/CaptainPanelContext";
import { useSocket } from "../context/SocketContext";
import { useRide } from "../context/RideContext";
import axios from "axios";
const RideRequestPopUp = () => {
  const { ridePopup, setRidePopup, setConfirmRidePopup } = useContext(
    CaptainPanelDataContext
  );
  const { socket } = useSocket();
  const { setRideData, confirmRide } = useRide();
  const [ride, setRide] = useState({});

  socket.on("new-ride", (data) => {
    console.log("reached");

    console.log(data);

    setRide(data);
    setRideData(data);
    setRidePopup(true);

    setTimeout(() => {
      setRidePopup(false);
    }, 5000);
  });

  const RideAcceptHandler = async () => {
    try {
      const response = confirmRide();
      if (response) {
        console.log("Accepted");
        setConfirmRidePopup(true);
        setRidePopup(false);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed bottom-0 z-20 rounded-t-xl transition-all w-full duration-500 bg-[#191919] text-white px-4 pt-4 pb-6 ${
        ridePopup ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="text-2xl font-bold animate-pulse">
        New Ride{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          Request
        </span>
      </div>
      <div className="flex items-center justify-between border-b  py-4">
        <div className="flex items-center gap-4">
          <div>
            <FaRegCircleUser className="h-9 w-9" />
          </div>
          <div className="text-xl font-semibold">
            {ride?.user?.fullname?.firstname +
              " " +
              ride?.user?.fullname?.lastname}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">&#8377; {ride?.fare}</div>
          <div className="">2.2KM</div>
        </div>
      </div>
      <div className=" space-y-4">
        <div className="border-b py-2">
          <div className="uppercase text-sm font-medium text-gray-300">
            pick up
          </div>
          <div className="text-lg font-semibold line-clamp-1">
            {ride?.pickup}
          </div>
        </div>
        <div className="border-b py-2">
          <div className="uppercase text-sm font-medium text-gray-300">
            drop off
          </div>
          <div className="text-lg font-semibold line-clamp-1">
            {ride?.destination}
          </div>
        </div>
        <div className="flex justify-end w-full gap-2">
          {/* <button className="border rounded px-6 py-2 bg-gray-400">
            Ignore
          </button> */}
          <button
            onClick={RideAcceptHandler}
            className={`${ridePopup && "acceptButton"}`}
          >
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideRequestPopUp;
