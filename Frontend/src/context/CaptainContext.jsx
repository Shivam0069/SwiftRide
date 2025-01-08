import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: "",

    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      vehicleType: "",
    },
  });
  const [captainIsLoading, setCaptainIsLoading] = useState(true);
  const [captainIsAuthenticated, setCaptainIsAuthenticated] = useState(false);
  useEffect(() => {
    const captainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          { withCredentials: true }
        );
        console.log("profile response", response);

        if (response.status === 200) {
          setCaptain(response.data);
          setCaptainIsAuthenticated(true);
        }
      } catch (error) {
        setCaptainIsAuthenticated(false);
        console.log(error);
      } finally {
        setCaptainIsLoading(false);
      }
    };
    captainProfile();
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
      setCaptainIsAuthenticated(false);
      return false;
    } catch (error) {
      setCaptainIsAuthenticated(false);
      console.error("Login failed:", error);
      return false;
    } finally {
      setCaptainIsLoading(false);
    }
  };

  const loginCaptain = async (credentials) => {
    try {
      setCaptainIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
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
        setCaptain(null);
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
    <div>
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
    </div>
  );
};

export default CaptainContext;
