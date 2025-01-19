import React from "react";
import { FaSquare } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import mapImg from "../assets/mapImg.png";
import UberGo from "../assets/UberGo.png";
import { useRide } from "../context/RideContext";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { useUserPanel } from "../context/UserPanelContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const { rideData, setRideData } = useRide();
  const { setRoute } = useUserPanel();
  const { receiveMessage } = useSocket();
  const navigate = useNavigate();
  receiveMessage("ride-ended", (ride) => {
    setRideData(ride);
    setRoute({});
    navigate("/home");
  });
  return (
    <div className="h-screen">
      <div className="h-1/2">
        {/* <img src={mapImg} className="h-full w-full object-cover" /> */}
        <LiveTracking />
      </div>
      <div className="bg-[#191919] text-white p-4 h-1/2">
        <div className="flex items-center justify-between border-b pb-2 px-4 ">
          <img
            src={UberGo}
            alt="Selected Vehicle"
            className="w-20 h-20 object-contain"
          />
          <div className="text-right">
            <div className="text-lg font-medium text-gray-400">
              {rideData?.captain?.fullname?.firstname}{" "}
              {rideData?.captain?.fullname?.lastname}
            </div>
            <div className="text-2xl font-semibold -my-1">
              {rideData?.captain?.vehicle?.plate}
            </div>
            {/* <div className="text-base font-normal text-gray-400">
              Maruti Suzuki Alto
            </div> */}
          </div>
        </div>
        <div className="pl-6 pt-6 space-y-2">
          <div className="flex items-center gap-4">
            <div className="ml-1">
              <FaSquare className="w-6 h-6" />
            </div>
            <div className="text-gray-300 space-y-1 w-full border-b pb-2">
              <div className="font-semibold text-gray-50 text-lg">562/11-A</div>
              <div className="font-medium">{rideData?.destination}</div>
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
        <div className="w-full flex mt-4">
          <button className="px-6 py-2 bg-custom-gradient text-lg font-semibold rounded mx-auto active:scale-105">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
