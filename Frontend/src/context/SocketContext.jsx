import React, { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`);
const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  const sendMessage = (eventName, message) => {
    if (message.userId) {
      socket.emit(eventName, message);
    }
  };

  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
