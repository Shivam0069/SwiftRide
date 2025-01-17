import React, { useContext } from "react";
import LocationCard from "./LocationCard";
import { UserPanelDataContext } from "../context/UserPanelContext";

const LocationSearchPanel = () => {
  const { activeField, pickupSuggestion, destinationSuggestion } =
    useContext(UserPanelDataContext);
  const suggestion =
    activeField === "pickup" ? pickupSuggestion : destinationSuggestion;
  return (
    <div className="text-gray-200 mt-4 bg-[#191919] px-4 space-y-2  w-full overflow-y-auto overflow-hidden ">
      <div className="flex flex-col space-y-2">
        {suggestion?.map((i, idx) => (
          <LocationCard
            key={idx}
            title={i.structured_formatting.main_text}
            location={i.description}
            complete={i}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
