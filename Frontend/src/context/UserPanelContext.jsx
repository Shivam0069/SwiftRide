import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserPanelDataContext = createContext();
const UserPanelContext = ({ children }) => {
  const [route, setRoute] = useState({
    pickup: "",
    destination: "",
  });
  const [completeRoute, setCompleteRoute] = useState({
    pickup: {},
    destination: {},
  });
  const [selectedRide, setSelectedRide] = useState({});

  const [panel, setPanel] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [lookingForRidderPanelOpen, setLookingForRidderPanelOpen] =
    useState(false);
  const [waitingForRidderPanelOpen, setWaitingForRidderPanelOpen] =
    useState(false);
  const [activeField, setActiveField] = useState("");

  const [pickupSuggestion, setPickupSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [fare, setFare] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const fetchPickupSuggestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${
            route.pickup
          }`,
          { withCredentials: true, signal: controller.signal }
        );
        setPickupSuggestion(response.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };

    if (route.pickup && route.pickup.length >= 3) {
      fetchPickupSuggestions();
    }

    return () => {
      controller.abort();
    };
  }, [route.pickup]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchDestinationSuggestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${
            route.destination
          }`,
          { withCredentials: true, signal: controller.signal }
        );
        setDestinationSuggestion(response.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };

    if (route.destination && route.destination.length >= 3) {
      fetchDestinationSuggestions();
    }

    return () => {
      controller.abort();
    };
  }, [route.destination]);

  async function getFare() {
    if (
      !route.pickup ||
      !route.destination ||
      route.pickup.length < 3 ||
      route.destination.length < 3
    ) {
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup: route.pickup,
            destination: route.destination,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setFare(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    activeField,
    setActiveField,
    pickupSuggestion,
    destinationSuggestion,
    getFare,
    fare,
    completeRoute,
    setCompleteRoute,
  };
  return (
    <UserPanelDataContext.Provider value={values}>
      {children}
    </UserPanelDataContext.Provider>
  );
};

export const useUserPanel = () => useContext(UserPanelDataContext);

export default UserPanelContext;
export { UserPanelDataContext };
