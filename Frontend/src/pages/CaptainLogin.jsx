import React, { useContext, useState } from "react";
import swiftRideLogo from "../assets/swiftRideLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CaptainDataContext } from "../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainLogin = () => {
  const [captainData, setCaptainData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginCaptain } = useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    const success = await loginCaptain(captainData);

    if (success) {
      toast.success("Login Success");
      navigate("/captain-home");
    } else {
      toast.error("Login Failed");
    }

    setCaptainData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="p-4 pt-24 flex flex-col bg-[#191919] text-white justify-between h-screen ">
      <div>
        {/* <Link to="/">
          <img className="w-24 mb-5 rounded" src={swiftRideLogo} />
        </Link> */}

        <div className="w-full text-center text-2xl font-semibold mb-5 bg-custom-gradient bg-clip-text text-transparent">
          Captain Login
        </div>
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className=" text-lg font-medium  mb-2">Email</h3>
          <input
            value={captainData.email}
            onChange={(e) =>
              setCaptainData({ ...captainData, email: e.target.value })
            }
            className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
            aria-label="Email"
          />
          <h3 className="text-lg font-medium  mb-2">Password</h3>
          <div className="relative">
            <input
              value={captainData.password}
              onChange={(e) =>
                setCaptainData({ ...captainData, password: e.target.value })
              }
              className="bg-[#111] mb-5 rounded px-4 py-2 pr-10 border w-full text-base placeholder:text-base"
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
          <button className="bg-custom-gradient font-semibold text-white mb-3 rounded px-4 py-2  w-full text-base placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-left">
          Looking to join as a Captain?&nbsp;
          <Link
            className="bg-custom-gradient bg-clip-text text-transparent font-semibold"
            to="/captain-signup"
          >
            Register Now
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-custom-gradient flex justify-center items-center font-semibold text-white mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
