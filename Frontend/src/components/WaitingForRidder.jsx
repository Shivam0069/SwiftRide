import React, { useContext } from "react";
import { RiMapPinRangeFill } from "react-icons/ri";
import { FaSquare } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import UberGo from "../assets/UberGo.png";
import { UserPanelDataContext } from "../context/UserPanelContext";
import { useRide } from "../context/RideContext";

const WaitingForRidder = () => {
  const { waitingForRidderPanelOpen } = useContext(UserPanelDataContext);
  const { rideData } = useRide();
  return (
    <div
      className={`${
        waitingForRidderPanelOpen ? "translate-y-0" : "translate-y-full"
      } select-none fixed transition-transform  duration-500 bottom-0 w-full pt-4 pb-6 rounded-xl bg-[#191919] z-50 text-white`}
    >
      <div className="font-bold text-2xl text-white px-4 mb-5  ">
        Waiting for{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          Ridder
        </span>
      </div>
      <div className="flex items-center justify-between border-b pb-2 px-4 ">
        <img
          src={UberGo}
          alt="Selected Vehicle"
          className="w-20 h-20 object-contain"
        />
        <div className="text-right">
          <div className="text-lg font-medium text-gray-400">
            {rideData?.captain?.fullname?.firstname}
          </div>
          <div className="text-2xl font-semibold -my-1">
            {rideData?.captain?.vehicle?.plate}
          </div>
          {/* <div className="text-base font-normal text-gray-400">
            {rideData?.captain?.vehicle?.vehicleType}
          </div> */}
          <div className="text-base font-semibold text-gray-400">
            OTP : {rideData?.otp}
          </div>
          <div></div>
        </div>
      </div>
      <div className="pl-6 pt-6 space-y-2">
        <div className="flex items-center gap-4">
          <div className="">
            <RiMapPinRangeFill className="w-8 h-8" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg line-clamp-1">
              {rideData?.pickup}
            </div>
            {/* <div className="font-medium">
              Kaikondrahalli, Bengaluru, Karnataka
            </div> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="ml-1">
            <FaSquare className="w-6 h-6" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg line-clamp-1">
              {rideData?.destination}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="ml-1">
            <FaCreditCard className="w-6 h-6" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg">
              &#8377; {rideData?.fare}
            </div>
            <div className="font-medium">Cash Cash</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForRidder;
