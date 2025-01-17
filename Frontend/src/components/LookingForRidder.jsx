import React, { useContext } from "react";
import { RiMapPinRangeFill } from "react-icons/ri";
import { FaSquare } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { UserPanelDataContext } from "../context/UserPanelContext";

const LookingForRidder = () => {
  const { lookingForRidderPanelOpen, selectedRide, completeRoute } =
    useContext(UserPanelDataContext);
  return (
    <div
      className={`${
        lookingForRidderPanelOpen ? "translate-y-0" : "translate-y-full"
      } select-none fixed transition-transform  duration-500 bottom-0 w-full pt-4 pb-6 rounded-xl bg-[#191919] z-50 text-white`}
    >
      <div className="font-bold text-2xl text-white px-4 mb-5 animate-pulse ">
        Looking for{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          Ridder
        </span>
      </div>
      <div className="flex items-center justify-center border-b ">
        <img
          src={selectedRide?.vehicleImage}
          alt={selectedRide?.vehicleType || "Selected Vehicle"}
          className="w-40 h-40 object-contain"
        />
      </div>
      <div className="pl-6 pt-6 space-y-2">
        <div className="flex items-center gap-4">
          <div className="">
            <RiMapPinRangeFill className="w-8 h-8" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg line-clamp-1">
              {completeRoute.pickup?.structured_formatting?.main_text}
            </div>
            <div className="font-medium line-clamp-2">
              {completeRoute.pickup?.structured_formatting?.secondary_text}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="ml-1">
            <FaSquare className="w-6 h-6" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg line-clamp-1">
              {completeRoute.destination?.structured_formatting?.main_text}
            </div>
            <div className="font-medium line-clamp-2">
              {completeRoute.destination?.structured_formatting?.secondary_text}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="ml-1">
            <FaCreditCard className="w-6 h-6" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg">
              &#8377; {selectedRide?.fare}
            </div>
            <div className="font-medium">Cash Cash</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForRidder;
