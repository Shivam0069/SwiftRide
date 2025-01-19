import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    email: "",
    fullname: {
      firstname: "",

      lastname: "",
    },
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const userProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          { withCredentials: true, signal: controller.signal }
        );
        if (response.status === 200) {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error(error);
        }
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    userProfile();
    return () => controller.abort();
  }, []);

  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        credentials,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const RegisterUser = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        credentials,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      }
      setIsAuthenticated(false);
      return false;
    } catch (error) {
      setIsAuthenticated(false);

      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser({
          _id: "",
          email: "",
          fullname: {
            firstname: "",

            lastname: "",
          },
        });
        setIsAuthenticated(false);
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
      <UserDataContext.Provider
        value={{
          user,

          isAuthenticated,
          isLoading,

          loginUser,
          RegisterUser,
          logoutUser,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export const useUser = () => useContext(UserDataContext);

export default UserContext;
