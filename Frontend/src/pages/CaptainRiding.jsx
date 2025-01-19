import React, { useContext } from "react";
import mapImg from "../assets/mapImg.png";
import { IoIosArrowUp } from "react-icons/io";
import { CaptainPanelDataContext } from "../context/CaptainPanelContext";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const { finishRidePopup, setFinishRidePopup } = useContext(
    CaptainPanelDataContext
  );
  return (
    <div className="bg-[#191919] h-screen w-screen  text-white relative ">
      <div
        onClick={() => {
          setFinishRidePopup(false);
        }}
        className="h-4/5 w-full"
      >
        {/* <img src={mapImg} className="h-full w-full object-cover" /> */}
        <LiveTracking />
      </div>
      <div
        onClick={() => setFinishRidePopup(true)}
        className="h-1/5 flex relative items-center justify-between px-6 w-full bg-[#191919]  "
      >
        <div className="absolute top-2 left-[50%] translate-x-[-50%]">
          <IoIosArrowUp className="h-6 w-6" />
        </div>
        <h4 className="text-xl font-semibold ">4 KM away</h4>
        <button className="px-6 py-2 bg-custom-gradient rounded">
          Complete Ride
        </button>
      </div>
      <FinishRide />
    </div>
  );
};

export default CaptainRiding;
