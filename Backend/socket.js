const { Server } = require("socket.io");
const userModel = require("./Models/userModel");
const CaptainModel = require("./Models/captainModel");
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(`User ${userId} joined as ${userType}`);
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
      socket.on("updateLocation-captain", async (data) => {
        const { userId, location } = data;
        if (!location || !location.lat || !location.lng) {
          return socket.emit("error", "Invalid location");
        }
        await CaptainModel.findByIdAndUpdate(userId, {
          location: [location.lng, location.lat],
        });
      });
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  });
};

const sendMessageToSocketId = (socketId, messageobject) => {
  if (io) {
    io.to(socketId).emit(messageobject.event, messageobject.data);
  } else {
    console.error("Socket.io is not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
