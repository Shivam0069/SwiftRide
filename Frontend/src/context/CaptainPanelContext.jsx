import React, { createContext, useState } from "react";

export const CaptainPanelDataContext = createContext();
const CaptainPanelContext = ({ children }) => {
  const [ridePopup, setRidePopup] = useState(true);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [finishRidePopup, setFinishRidePopup] = useState(false);
  return (
    <CaptainPanelDataContext.Provider
      value={{
        ridePopup,
        setRidePopup,
        confirmRidePopup,
        setConfirmRidePopup,
        finishRidePopup,
        setFinishRidePopup,
      }}
    >
      {children}
    </CaptainPanelDataContext.Provider>
  );
};

export default CaptainPanelContext;
