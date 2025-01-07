import React, { useEffect, useState } from "react";
import swiftRideLogo from "../assets/swiftRideLogo.png";
import carImg from "../assets/carImg.png";
import motorcycleImg from "../assets/motorcycle.webp";
import autoImg from "../assets/auto.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const images = [carImg, motorcycleImg, autoImg];
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen pt-24  bg-[#191919] flex  flex-col ">
      {/* <Header /> */}
      {/* <img className="w-[152px] p-7 rounded" src={swiftRideLogo} /> */}
      <div className="text-white flex flex-col  mt-10  px-4">
        <h1 className="text-4xl font-bold">
          You are just a{" "}
          <span className="bg-custom-gradient bg-clip-text text-transparent">
            couple
          </span>{" "}
          of steps away!
        </h1>
        <p className="mt-4">Your Swift Ride journey is just moments away.</p>
        <p className="mt-4">
          Whether you’re a rider or a captain, SwiftRide brings the perfect ride
          for you.
        </p>
        <div className="slider-container mt-16 relative w-full max-w-xl overflow-hidden">
          <div
            className="slider flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className="w-full flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white mt-auto mb-4 mx-3 px-4 py-4 rounded shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold sm:font-bold ">
          Get Started with{" "}
          <span className="bg-custom-gradient bg-clip-text text-transparent">
            Swift Ride
          </span>
        </h2>
        <Link
          to="/login"
          className=" w-full flex justify-between items-center bg-custom-gradient text-white py-3 mt-5 rounded text-xl "
        >
          <h3 className="w-full text-center ">Continue</h3>
          <FaArrowRightLong className=" w-8    animate-move" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
