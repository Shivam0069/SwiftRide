import React from "react";
import { GoClock } from "react-icons/go";
import { SlSpeedometer } from "react-icons/sl";
import { CiViewList } from "react-icons/ci";
import UberGo from "../assets/UberGo.png";

const CaptainDetail = () => {
  return (
    <div
      className={`bg-[#191919] text-white p-4 transition-all duration-500 pb-8 z-10 absolute bottom-0 left-0 w-full rounded-t-xl
  `}
    >
      <div className="flex items-center justify-between border-b pb-2 px-4 ">
        <div className="flex gap-4 items-center">
          <img
            src={UberGo}
            alt="Selected Vehicle"
            className="w-16 h-16 object-contain"
          />
          <div className="text-lg font-medium text-gray-400">Shivam Singh</div>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold">&#8377;300.00</div>
          <div className="uppercase text-xs text-gray-300">earned</div>
        </div>
      </div>
      <div className="flex gap-10 mt-4 px-4 py-2  justify-center items-center ">
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <GoClock className="h-6 w-6" />
          </div>
          <div className="text-lg font-semibold">10.2</div>
          <div className="uppercase text-xs font-medium">Hours Online</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <SlSpeedometer className="h-6 w-6" />
          </div>
          <div className="text-lg font-semibold">30 KM</div>
          <div className="uppercase text-xs font-medium">total distance</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <CiViewList className="h-6 w-6" />
          </div>
          <div className="text-lg font-semibold">20</div>
          <div className="uppercase text-xs font-medium">Total jobs</div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetail;
