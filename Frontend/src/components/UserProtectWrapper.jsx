import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserProtectWrapper = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, navigate to the login page
    if (!isLoading && !isAuthenticated) {
      toast.error("UnAuthenticated! Login");
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isLoading]); // Ensure useEffect runs when authentication status changes

  // While the authentication status is being checked, you can optionally show a loading state
  if (isLoading && !isAuthenticated) {
    return (
      <div className="h-screen bg-black text-white w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <div>{children}</div>;
};

export default UserProtectWrapper;
