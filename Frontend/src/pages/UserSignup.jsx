import React, { useContext, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import toast from "react-hot-toast";

const UserSignup = () => {
  const [userData, setUserData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const [enterOTP, setEnterOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { RegisterUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const success = await RegisterUser(userData);
    if (success) {
      toast.success("Register Success");
      navigate("/home");
    } else {
      toast.error("Register Failed");
    }
    // Reset form fields
    setUserData({
      fullname: {
        firstname: "",
        lastname: "",
      },
      email: "",
      password: "",
    });
  };

  const sendVerificationEmail = () => {
    setEnterOTP(true);
  };
  const verifyOtp = () => {};
  return (
    <div className="p-4 pt-24 flex flex-col text-white bg-[#191919] justify-between min-h-screen ">
      <div>
        {/* <Link to="/">
          <img className="w-24 mb-5 rounded " src={swiftRideLogo} />
        </Link> */}
        <div className="w-full text-center text-2xl font-semibold mb-5 bg-custom-gradient bg-clip-text text-transparent">
          User Signup
        </div>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-2">
                First Name <span className="text-xs"> + MiddleName</span>
                {/* <span className="text-[8px]">( firstname + middlename )</span> */}
              </h3>
              <input
                value={userData.fullname.firstname}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    fullname: {
                      ...userData.fullname,
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
                value={userData.fullname.lastname}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    fullname: {
                      ...userData.fullname,
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

          <h3 className="  text-lg font-medium  mb-2">Email</h3>
          <div className="relative">
            <input
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="bg-[#111] mb-5 rounded px-4 py-2 pr-24 border w-full text-base placeholder:text-base"
              required
              type="email"
              placeholder="email@example.com"
            />

            <button
              type="button"
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
          <button
            type="submit"
            className="bg-custom-gradient font-semibold text-white mb-3 rounded px-4 py-2  w-full text-base placeholder:text-base"
          >
            Create account
          </button>
        </form>
        <p className="text-left">
          Already have an account?&nbsp;
          <Link
            className="bg-custom-gradient bg-clip-text text-transparent font-semibold"
            to="/login"
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

export default UserSignup;
