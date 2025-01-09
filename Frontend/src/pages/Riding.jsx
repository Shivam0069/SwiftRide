import React from "react";
import mapImg from "../assets/mapImg.png";
import { RiMapPinRangeFill } from "react-icons/ri";
import { FaSquare } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import UberGo from "../assets/UberGo.png";
const Riding = () => {
  return (
    <div className="h-screen">
      <div className="h-1/2">
        <img src={mapImg} className="h-full w-full object-cover" />
      </div>
      <div className="bg-[#191919] text-white p-4 h-1/2">
        <div className="flex items-center justify-between border-b pb-2 px-4 ">
          <img
            src={UberGo}
            alt="Selected Vehicle"
            className="w-20 h-20 object-contain"
          />
          <div className="text-right">
            <div className="text-lg font-medium text-gray-400">Shivam</div>
            <div className="text-2xl font-semibold -my-1">MP04 AB 1234</div>
            <div className="text-base font-normal text-gray-400">
              Maruti Suzuki Alto
            </div>
            <div></div>
          </div>
        </div>
        <div className="pl-6 pt-6 space-y-2">
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
                &#8377;192.50
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
