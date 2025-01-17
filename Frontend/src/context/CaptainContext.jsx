import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: "",
    fullname: { firstname: "", lastname: "" },
    vehicle: { color: "", plate: "", capacity: 0, vehicleType: "" },
  });
  const [captainIsLoading, setCaptainIsLoading] = useState(true);
  const [captainIsAuthenticated, setCaptainIsAuthenticated] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const captainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          { withCredentials: true, signal: controller.signal }
        );
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setCaptainIsAuthenticated(true);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
        setCaptainIsAuthenticated(false);
      } finally {
        setCaptainIsLoading(false);
      }
    };
    captainProfile();
    return () => controller.abort();
  }, []);

  const RegisterCaptain = async (credentials) => {
    try {
      setCaptainIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        credentials,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setCaptain(response.data.captain);
        setCaptainIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      setCaptainIsAuthenticated(false);
      console.error("Registration failed:", error);
      return false;
    } finally {
      setCaptainIsLoading(false);
    }
  };

  const loginCaptain = async (credentials) => {
    try {
      setCaptainIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        credentials,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCaptain(response.data.captain);
        setCaptainIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setCaptainIsLoading(false);
    }
  };

  const logoutCaptain = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCaptain({
          _id: "",
          email: "",
          fullname: { firstname: "", lastname: "" },
          vehicle: { color: "", plate: "", capacity: 0, vehicleType: "" },
        });
        setCaptainIsAuthenticated(false);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Error logging out:", error);
      return false;
    }
  };

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        captainIsAuthenticated,
        captainIsLoading,
        loginCaptain,
        RegisterCaptain,
        logoutCaptain,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
