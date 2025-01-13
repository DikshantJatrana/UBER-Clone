const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./Config/database");
const userRouter = require("./Router/userRouter");
const captainRouter = require("./Router/captainRoutes");
const mapsRoutes = require("./Router/mapsRoutes");
const rideRoutes = require("./Router/rideRoutes");
const app = express();
connectToDatabase();

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);
app.use("/captain", captainRouter);
app.use("/maps", mapsRoutes);
app.use("/ride", rideRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
