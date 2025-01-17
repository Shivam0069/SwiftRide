import React, { useContext } from "react";
import UberGo from "../assets/UberGo.png";
import UberAuto from "../assets/auto.webp";
import Moto from "../assets/motorcycle.webp";
import { UserPanelDataContext } from "../context/UserPanelContext";
import VehicleFairCard from "./VehicleFairCard";
const VehiclePanel = () => {
  const { vehiclePanelOpen, fare } = useContext(UserPanelDataContext);
  const vehicles = [
    {
      vehicleType: "UberGo",
      vehicleImage: UberGo,
      capacity: 4,
      fare: fare.car || "...",
      time: 10,
      name: "car",
    },
    {
      vehicleType: "UberAuto",
      vehicleImage: UberAuto,
      capacity: 3,
      fare: fare.auto || "...",
      name: "auto",
      time: 5,
    },
    {
      vehicleType: "Moto",
      vehicleImage: Moto,
      capacity: 1,
      fare: fare.motorcycle || "...",
      name: "motorcycle",
      time: 3,
    },
  ];
  return (
    <div
      className={`${
        vehiclePanelOpen ? "translate-y-0" : "translate-y-full"
      } select-none fixed transition-transform duration-500 bottom-0 w-full pt-4 pb-6 rounded-xl bg-[#191919] z-50`}
    >
      <div className="font-bold text-2xl text-white px-4 mb-5 ">
        Choose your{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          vehicle
        </span>
      </div>
      <div className="space-y-6">
        {vehicles.map((vehicle, index) => (
          <VehicleFairCard
            key={index}
            vehicleType={vehicle.vehicleType}
            vehicleImage={vehicle.vehicleImage}
            capacity={vehicle.capacity}
            fare={vehicle.fare}
            time={vehicle.time}
            name={vehicle.name}
          />
        ))}
      </div>
    </div>
  );
};

export default VehiclePanel;
