import React, { useState } from "react";
import swiftRideLogo from "../assets/swiftRideLogo.png";
import { Link } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const UserLogin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userData);

    setUserData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="p-4 pt-24 flex flex-col text-white bg-[#191919] justify-between h-screen ">
      <div>
        {/* <Link to="/">
          <img className="w-24 mb-5 rounded " src={swiftRideLogo} />
        </Link> */}
        <div className="w-full text-center text-2xl font-semibold mb-5 bg-custom-gradient bg-clip-text text-transparent">
          User Login
        </div>
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className=" text-lg font-medium  mb-2">Email</h3>
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="bg-[#111] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium  mb-2">Password</h3>
          <div className="relative">
            <input
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="bg-[#111] mb-5 rounded px-4 py-2 pr-10 border w-full text-base placeholder:text-base"
              required
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
            {userData.password.length > 0 &&
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
          Don&apos;t have an account?&nbsp;
          <Link
            className="bg-custom-gradient bg-clip-text text-transparent font-semibold"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-custom-gradient flex justify-center items-center font-semibold text-white mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
