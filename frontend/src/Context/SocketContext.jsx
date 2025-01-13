import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const newSocket = io(import.meta.env.VITE_BASE_URL);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    newSocket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
    });

    setSocket(newSocket);
  }, []);

  const sendMessage = (eventName, message) => {
    if (socket) {
      socket.emit(eventName, message);
    }
  };

  const receiveMessage = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
