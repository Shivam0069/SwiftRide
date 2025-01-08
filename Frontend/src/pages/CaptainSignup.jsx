import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CaptainDataContext } from "../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainSignup = () => {
  const [captainData, setCaptainData] = useState({
    email: "",
    password: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      vehicleType: "",
    },
  });
  const [isVerified, setIsVerified] = useState(false);
  const [enterOTP, setEnterOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { RegisterCaptain } = useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    const success = await RegisterCaptain(captainData);
    if (success) {
      toast.success("Register Success");
      navigate("/captain-home");
    } else {
      toast.error("Register Failed");
    }

    setCaptainData({
      email: "",
      password: "",
      fullname: {
        firstname: "",
        lastname: "",
      },
      vehicle: {
        color: "",
        plate: "",
        capacity: 0,
        vehicleType: "",
      },
    });
  };

  const sendVerificationEmail = () => {
    setEnterOTP(true);
  };
  const verifyOtp = () => {};
  return (
    <div className="p-4 pt-24 flex flex-col bg-[#191919] text-white justify-between min-h-screen ">
      <div>
        {/* <Link to="/">
          <img className="w-24 mb-5 rounded" src={swiftRideLogo} />
        </Link> */}

        <div className="w-full text-center text-2xl font-semibold mb-5 bg-custom-gradient bg-clip-text text-transparent">
          Captain Signup
        </div>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-2">
                First Name <span className="text-xs"> + MiddleName</span>
              </h3>
              <input
                value={captainData.fullname.firstname}
                onChange={(e) =>
                  setCaptainData({
                    ...captainData,
                    fullname: {
                      ...captainData.fullname,
                      firstname: e.target.value,
                    },
                  })
                }
                className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
                required
                type="text"
                placeholder="First Name"
              />
            </div>

            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-2">Last Name</h3>
              <input
                value={captainData.fullname.lastname}
                onChange={(e) =>
                  setCaptainData({
                    ...captainData,
                    fullname: {
                      ...captainData.fullname,
                      lastname: e.target.value,
                    },
                  })
                }
                className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
                required
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>

          <h3 className=" text-lg font-medium  mb-2">Email</h3>
          <div className="relative">
            <input
              value={captainData.email}
              onChange={(e) =>
                setCaptainData({ ...captainData, email: e.target.value })
              }
              className="bg-[#111] mb-5 rounded px-4 py-2 pr-20 border w-full text-base placeholder:text-base"
              required
              type="email"
              placeholder="email@example.com"
              aria-label="Email"
            />
            <button
              onClick={sendVerificationEmail}
              className={`absolute right-2 top-[8px] transform  border px-2 rounded text-white ${
                isVerified ? "bg-custom-gradient" : "bg-gray-400"
              }`}
            >
              {isVerified ? "Verified" : "Verify"}
            </button>
          </div>
          <h3 className="text-lg font-medium  mb-2">Password</h3>
          <div className="relative">
            <input
              value={captainData.password}
              onChange={(e) =>
                setCaptainData({ ...captainData, password: e.target.value })
              }
              className="bg-[#111]  mb-5 rounded px-4 py-2 pr-10 border w-full text-base placeholder:text-base"
              required
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
            {captainData.password.length > 0 &&
              (showPassword ? (
                <IoEyeOutline
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-4 scale-150 text-gray-500"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-4 scale-150 text-gray-500"
                />
              ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <h3 className="text-lg font-medium  mb-2">Vehicle Color</h3>
              <input
                value={captainData.vehicle.color}
                onChange={(e) =>
                  setCaptainData({
                    ...captainData,
                    vehicle: { ...captainData.vehicle, color: e.target.value },
                  })
                }
                className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
                required
                type="text"
                placeholder="Vehicle Color"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium  mb-2">Vehicle Plate</h3>
              <input
                value={captainData.vehicle.plate}
                onChange={(e) =>
                  setCaptainData({
                    ...captainData,
                    vehicle: { ...captainData.vehicle, plate: e.target.value },
                  })
                }
                className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
                required
                type="text"
                placeholder="Vehicle Plate"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <h3 className="text-lg font-medium  mb-2">Vehicle Capacity</h3>
              <input
                value={captainData.vehicle.capacity}
                onChange={(e) =>
                  setCaptainData({
                    ...captainData,
                    vehicle: {
                      ...captainData.vehicle,
                      capacity: e.target.value,
                    },
                  })
                }
                className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
                required
                type="number"
                placeholder="Vehicle Capacity"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium  mb-2">Vehicle Type</h3>
              <select
                value={captainData.vehicle.type}
                onChange={(e) =>
                  setCaptainData({
                    ...captainData,
                    vehicle: {
                      ...captainData.vehicle,
                      vehicleType: e.target.value,
                    },
                  })
                }
                className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
                required
                type="text"
              >
                <option selected value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button className="bg-custom-gradient font-semibold text-white mb-3 rounded px-4 py-2  w-full text-base placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-left">
          Already a Captain?&nbsp;
          <Link
            className="bg-custom-gradient bg-clip-text text-transparent font-semibold"
            to="/captain-login"
          >
            Log In
          </Link>
        </p>
      </div>
      <div className="mb-2">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
