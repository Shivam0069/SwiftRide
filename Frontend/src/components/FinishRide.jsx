import React, { useContext } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { CaptainPanelDataContext } from "../context/CaptainPanelContext";
import { Link } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";

const FinishRide = () => {
  const { finishRidePopup, setFinishRidePopup } = useContext(
    CaptainPanelDataContext
  );
  return (
    <div
      className={`fixed bottom-0 z-20    transition-all w-full duration-500 bg-[#191919] text-white px-4 py-8  ${
        finishRidePopup ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        onClick={() => setFinishRidePopup(false)}
        className="absolute top-2 left-[50%] -translate-x-[50%]"
      >
        <IoIosArrowUp className="rotate-180 h-6 w-6" />
      </div>
      <div className="text-2xl font-bold animate-pulse">
        Finish this{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          Ride
        </span>
      </div>
      <div className="flex items-center justify-between border-b  py-4">
        <div className="flex items-center gap-4">
          <div>
            <FaRegCircleUser className="h-9 w-9" />
          </div>
          <div className="text-xl font-semibold"> Shivam Singh</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">&#8377;85.00</div>
          <div className="">2.2KM</div>
        </div>
      </div>
      <div className=" w-full flex flex-col gap-3  ">
        <div className="border-b py-3">
          <div className="uppercase text-sm font-medium text-gray-300">
            pick up
          </div>
          <div className="text-lg font-semibold">7958 Swift Village</div>
        </div>
        <div className="border-b py-3">
          <div className="uppercase text-sm font-medium text-gray-300">
            drop off
          </div>
          <div className="text-lg font-semibold">7958 Swift Village</div>
        </div>
        <div className="border-b py-3">
          <div className="uppercase text-sm font-medium text-gray-300">
            Noted
          </div>
          <div className="text-lg font-semibold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reprehenderit ipsa facilis accusantium eius!{" "}
          </div>
        </div>
        <div className="mt-10 w-full ">
          <Link
            to="/captain-home"
            className="w-full flex justify-center bg-custom-gradient py-2  rounded"
          >
            <span className="text-xl font-bold">Finish Ride</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
