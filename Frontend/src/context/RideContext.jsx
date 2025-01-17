import React, { createContext, useState } from "react";
import axios from "axios";
export const RideDataContext = createContext();

const RideContext = ({ children }) => {
  const [rideData, setRideData] = useState({});
  const createRide = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        data,
        { withCredentials: true }
      );
      console.log(response, "createRide Rewspone");
      if (response.status === 201) {
        setRideData(response.data.ride);

        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return (
    <RideDataContext.Provider value={{ createRide, rideData }}>
      {children}
    </RideDataContext.Provider>
  );
};

export default RideContext;
