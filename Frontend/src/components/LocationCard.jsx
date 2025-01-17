import React, { useContext } from "react";
import { MdLocationOn } from "react-icons/md";
import { UserPanelDataContext } from "../context/UserPanelContext";

const LocationCard = ({ title, location, complete }) => {
  const {
    setVehiclePanelOpen,
    setPanel,
    setRoute,
    route,
    activeField,
    getFare,
    setCompleteRoute,
  } = useContext(UserPanelDataContext);

  const handleSelection = async () => {
    if (activeField === "pickup") {
      setRoute({ ...route, pickup: location });
      setCompleteRoute((prev) => ({ ...prev, pickup: complete }));
    } else if (activeField === "destination") {
      setRoute({ ...route, destination: location });
      setCompleteRoute((prev) => ({ ...prev, destination: complete }));
      setPanel(false);
      await getFare();
      setVehiclePanelOpen(true);
    }
  };
  return (
    <div
      onClick={handleSelection}
      className="flex border-2 border-[#191919] active:border-white  items-center gap-4 select-none  w-full px-2 rounded-xl py-2"
    >
      <div className="rounded-full p-2 bg-gray-300 flex items-center justify-center">
        <MdLocationOn fill="black" className="h-7 w-7" />
      </div>
      <div>
        <div className="text-base font-semibold line-clamp-1">{title}</div>
        <div className="text-sm text-gray-200 font-normal line-clamp-2">
          {location}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
