import React from "react";
import LocationCard from "./LocationCard";

const LocationSearchPanel = () => {
  const locationData = [
    {
      title: "Home",
      location: "123 Main Street, Springfield, USA",
    },
    {
      title: "Work",
      location: "456 Corporate Avenue, Metropolis, USA",
    },
    {
      title: "Favorite Cafe",
      location: "789 Coffee Lane, Brewtown, USA",
    },
    {
      title: "Park",
      location: "Central Park, Downtown, USA",
    },
    {
      title: "Gym",
      location: "101 Fitness Blvd, Healthy City, USA",
    },
  ];

  return (
    <div className="text-gray-200 mt-4 bg-[#191919] px-4 space-y-2  w-full overflow-y-auto overflow-hidden ">
      <div className="flex flex-col space-y-2">
        {locationData.map((i, idx) => (
          <LocationCard key={idx} title={i.title} location={i.location} />
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
