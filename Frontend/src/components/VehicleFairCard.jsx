import React, { useContext } from "react";
import { IoPerson } from "react-icons/io5";
import UberGo from "../assets/UberGo.png";
import { UserPanelDataContext } from "../context/UserPanelContext";
const VehicleFairCard = ({
  vehicleType = "UberGo",
  vehicleImage = UberGo,
  capacity = 4,
  fare = 198.2,
  time = 10,
  name,
}) => {
  const { setConfirmRidePanelOpen, setVehiclePanelOpen, setSelectedRide } =
    useContext(UserPanelDataContext);
  return (
    <div
      onClick={() => {
        setConfirmRidePanelOpen(true);
        setVehiclePanelOpen(false);
      }}
      className="  w-full px-4 select-none  text-white "
    >
      <div
        onClick={() => {
          setSelectedRide({
            vehicleType,
            vehicleImage,
            capacity,
            fare,
            time,
            name,
          });
        }}
        className="border-b-2 active:border-2 p-2 w-full rounded-lg border-gray-400 flex gap-1 "
      >
        <div>
          <img src={vehicleImage} className="h-20 w-24 p-1 object-cover " />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center font-semibold text-lg">
            <div className="flex items-center gap-2">
              <div>{vehicleType}</div>
              <div className="flex items-center   ">
                <IoPerson className="h-4" />
                <div className="text-sm items-end">{capacity}</div>
              </div>
            </div>
            <div>&#8377; {fare}</div>
          </div>
          <div className="font-medium"> {time} mins away</div>
          <div className="font-light text-xs">Affordable, compact rides</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFairCard;
