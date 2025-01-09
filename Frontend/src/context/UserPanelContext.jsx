import React, { createContext, useState } from "react";

const UserPanelDataContext = createContext();
const UserPanelContext = ({ children }) => {
  const [route, setRoute] = useState({
    pickup: "",
    destination: "",
  });
  const [selectedRide, setSelectedRide] = useState({});

  const [panel, setPanel] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [lookingForRidderPanelOpen, setLookingForRidderPanelOpen] =
    useState(false);
  const [waitingForRidderPanelOpen, setWaitingForRidderPanelOpen] =
    useState(false);

  const values = {
    route,
    setRoute,
    selectedRide,
    setSelectedRide,
    panel,
    setPanel,
    vehiclePanelOpen,
    setVehiclePanelOpen,
    confirmRidePanelOpen,
    setConfirmRidePanelOpen,
    lookingForRidderPanelOpen,
    setLookingForRidderPanelOpen,
    waitingForRidderPanelOpen,
    setWaitingForRidderPanelOpen,
  };
  return (
    <UserPanelDataContext.Provider value={values}>
      {children}
    </UserPanelDataContext.Provider>
  );
};

export default UserPanelContext;
export { UserPanelDataContext };
