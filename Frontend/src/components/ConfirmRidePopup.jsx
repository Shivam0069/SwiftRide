import React, { useContext, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { CaptainPanelDataContext } from "../context/CaptainPanelContext";
import { Link, useNavigate } from "react-router-dom";
import { useRide } from "../context/RideContext";
import axios from "axios";
const ConfirmRidePopup = () => {
  const { ridePopup, setRidePopup, confirmRidePopup, setConfirmRidePopup } =
    useContext(CaptainPanelDataContext);
  const { rideData, setRideData } = useRide();
  const navigate = useNavigate();
  console.log("cptainRdie", rideData);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // To store OTP digits
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus(); // Focus the next input
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus(); // Focus the previous input
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const combinedOtp = otp.join("");
    const rideId = rideData._id;
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId,
          otp: combinedOtp,
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setRideData(response.data);
      setConfirmRidePopup(false);
      navigate("/captain-riding");
    }
  };

  return (
    <div
      className={`fixed bottom-0 z-20    transition-all w-full duration-500 bg-[#191919] text-white px-4 pt-8  ${
        confirmRidePopup ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="text-2xl font-bold animate-pulse">
        Confirm Ride{" "}
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
            {rideData?.user?.fullname?.firstname +
              " " +
              rideData?.user?.fullname?.lastname}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">&#8377; {rideData?.fare}</div>
          <div className="">2.2KM</div>
        </div>
      </div>
      <div className=" w-full space-y-4 mt-3">
        <div className="border-b pt-3 pb-4">
          <div className="uppercase text-sm font-medium text-gray-300">
            pick up
          </div>
          <div className="text-lg font-semibold">{rideData?.pickup}</div>
        </div>
        <div className="border-b pt-3 pb-4">
          <div className="uppercase text-sm font-medium text-gray-300">
            drop off
          </div>
          <div className="text-lg font-semibold">{rideData?.destination}</div>
        </div>
        <div className="border-b pt-3 pb-4">
          <div className="uppercase text-sm font-medium text-gray-300">
            Noted
          </div>
          <div className="text-lg font-semibold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reprehenderit ipsa facilis accusantium eius!{" "}
          </div>
        </div>
        <div className=" w-full ">
          <form className="space-y-2" onSubmit={(e) => submitHandler(e)}>
            <div className="flex items-center space-x-2 my-4 justify-evenly">
              <div className="text-xl font-bold">Enter OTP</div>

              <div className="space-x-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength={1}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 py-2 text-center text-black border rounded"
                  />
                ))}
              </div>
            </div>
            <button
              onClick={(e) => submitHandler(e)}
              className="w-full flex justify-center bg-custom-gradient py-2  rounded"
            >
              <span className="text-xl font-bold">Confirm</span>
            </button>
            <button
              onClick={() => setConfirmRidePopup(false)}
              className="rounded w-full py-2 bg-red-600"
            >
              <span className="text-xl font-bold">Cancel</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
