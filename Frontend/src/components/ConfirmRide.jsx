import React, { useContext } from "react";
import { RiMapPinRangeFill } from "react-icons/ri";
import { FaSquare } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { UserPanelDataContext } from "../context/UserPanelContext";
const ConfirmRide = () => {
  const {
    confirmRidePanelOpen,
    selectedRide,
    setConfirmRidePanelOpen,
    setLookingForRidderPanelOpen,
  } = useContext(UserPanelDataContext);
  return (
    <div
      className={`${
        confirmRidePanelOpen ? "translate-y-0" : "translate-y-full"
      } select-none fixed transition-transform  duration-500 bottom-0 w-full pt-4 pb-6 rounded-xl bg-[#191919] z-50 text-white`}
    >
      <div className="font-bold text-2xl text-white px-4 mb-5 ">
        Confirm your{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          Ride
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
            <div className="font-semibold text-gray-50 text-lg">562/11-A</div>
            <div className="font-medium">
              Kaikondrahalli, Bengaluru, Karnataka
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="ml-1">
            <FaSquare className="w-6 h-6" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg">562/11-A</div>
            <div className="font-medium">
              Kaikondrahalli, Bengaluru, Karnataka
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="ml-1">
            <FaCreditCard className="w-6 h-6" />
          </div>
          <div className="text-gray-300 space-y-1 w-full border-b pb-2">
            <div className="font-semibold text-gray-50 text-lg">
              &#8377;{selectedRide?.fair}
            </div>
            <div className="font-medium">Cash Cash</div>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-4">
        <button
          onClick={() => {
            setLookingForRidderPanelOpen(true);
            setConfirmRidePanelOpen(false);
          }}
          className="px-6 py-2 bg-custom-gradient text-lg font-semibold rounded mx-auto active:scale-105"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
